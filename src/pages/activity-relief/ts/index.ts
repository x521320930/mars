
import $ from 'jquery'

export default class ActivityRelief {
  public init () {
    $(() => {
      console.log(11)
    })
  }

  public async run () {
    const data = await this.test()
    console.log(data)
  }

  test (): Promise<number> {
    return new Promise((resolve, reject) => {
      resolve(1)
    })
  }
}
