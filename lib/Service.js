const PluginAPI = require('./PluginAPI')
const Config = require('webpack-chain')
const merge = require('webpack-merge')
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const { resolvePkg } = require('./utils/pkg')
const defaultsDeep = require('lodash.defaultsdeep')

const { defaults } = require('./options')

module.exports = class Service {

  constructor (ctx) {
    this.ctx = ctx
    this.pkg = this.resolvePkg()
    this.commands = {}
    this.webpackChainFns = []
    this.webpackRawConfigFns = []
    this.plugins = this.resolvePlugins()
  }




  async run (name, args = {}, rawArgv = []) {
    console.log(name, args, rawArgv)

    this.init()

    const command = this.commands['serve']
    const { fn } = command
    return fn(args, rawArgv)
  }



  resolvePlugins() {
    const idToPlugin = id => ({
      id: id.replace(/^.\//, 'built-in:'),
      apply: require(id)
    })
    const builtInPlugins = [
      './commands/serve',
      './config/base',
      './config/css'
    ].map(idToPlugin)

    return builtInPlugins
  }

  init (mode) {
    
    const userOptions = this.loadUserOptions()

    this.projectOptions = defaultsDeep(userOptions, defaults())

    this.plugins.forEach(({ id, apply }) => {
      apply(new PluginAPI(id, this), this.projectOptions)
    })
   
    if (this.projectOptions.chainWebpack) {
      this.webpackChainFns.push(this.projectOptions.chainWebpack)
    }
    if (this.projectOptions.configureWebpack) {
      this.webpackRawConfigFns.push(this.projectOptions.configureWebpack)
    }
  }

  // 返回 webpack 配置
  resolveChainableWebpackConfig () {
    const chainableConfig = new Config()
    // apply chains
    this.webpackChainFns.forEach(fn => { fn(chainableConfig) })
    return chainableConfig
  }
  // 整合webpack配置
  resolveWebpackConfig (chainableConfig = this.resolveChainableWebpackConfig()) {

    let config = chainableConfig.toConfig()
    // apply raw config fns
    this.webpackRawConfigFns.forEach(fn => {
      if (typeof fn === 'function') {
        // function with optional return value
        const res = fn(config)
        if (res) config = merge(config, res)
      } else if (fn) {
        // merge literal values
        config = merge(config, fn)
      }
    })
    return config
  }

  // 取资源文件
  loadUserOptions () {
    // config.js
    let fileConfig, resolved, resolvedFrom
    const configPath = path.resolve(this.ctx, 'jq.config.js')
    if (fs.existsSync(configPath)) {
      try {
        fileConfig = require(configPath)

        if (typeof fileConfig === 'function') {
          fileConfig = fileConfig()
        }
        if (!fileConfig || typeof fileConfig !== 'object') {
          console.error(`Error loading ${chalk.bold('jq.config.js')}: should export an object or a function that returns object.`)
          fileConfig = null
        }
      } catch (e) {
        console.error(`Error loading ${chalk.bold('jq.config.js')}`)
        throw e
      }
    }

    if (fileConfig) {
      resolved = fileConfig
      resolvedFrom = 'jq.config.js'
    }

    ensureSlash(resolved, 'publicPath')
    if (typeof resolved.publicPath === 'string') {
      resolved.publicPath = resolved.publicPath.replace(/^\.\//, '')
    }
    removeSlash(resolved, 'outputDir')

    return resolved
  }

  resolvePkg (context = this.ctx) {
    const pkg = resolvePkg(context)
    return pkg
  }
}

function ensureSlash (config, key) {
  const val = config[key]
  if (typeof val === 'string') {
    config[key] = val.replace(/([^/])$/, '$1/')
  }
}

function removeSlash (config, key) {
  if (typeof config[key] === 'string') {
    config[key] = config[key].replace(/\/$/g, '')
  }
}