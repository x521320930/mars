


const defaults = {
  host: '0.0.0.0',
  port: 8080,
  https: false
}


module.exports = (api, options) => {
  api.registerCommand('serve', {
    description: 'start development server',
    usage: 'jq-cli-service serve [options] [entry]',
    options: {
      '--open': `open browser on server start`,
      '--mode': `specify env mode (default: development)`,
      '--host': `specify host (default: ${defaults.host})`,
      '--port': `specify port (default: ${defaults.port})`,
      '--https': `use https (default: ${defaults.https})`
    }
  }, async (args) => {

    api.chainWebpack((config) => {
    })

    const web = api.resolveWebpackConfig()
    console.log(web)
  })
}