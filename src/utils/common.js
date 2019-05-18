function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')
  return `${t1} ${t2}`
}
// 封装Ajax
export function Ajax (opts, cb = function () { }) {
  wx.showLoading({ title: '请求中...', mask: true })
  const { url, method = 'GET', data = {} } = opts
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header: { 'content-type': 'application/json' },
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      },
      complete (res) {
        setTimeout(() => {
          wx.hideLoading()
          cb && cb(res)
        }, 1000)
      }
    })
  })
}
// 打开新窗口
export function openWin (url) {
  wx.navigateTo({ url: url })
}
// 关闭当前页面，跳转到应用内的某个页面
export function redirectTo (url) {
  wx.redirectTo({ url: url })
}
// 返回上一级窗口
export function backBeaforWin () {
  wx.navigateBack({ delta: 1 })
}

export function promisify (method, options = {}) {
  return new Promise((resolve, reject) => {
    // 将options对象赋值 然后再传给下面调用的方法中
    options.success = resolve
    options.fail = err => {
      reject(err)
    }
    wx[method](options)
  })
}
export function shuffle (arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = Math.floor(Math.random() * (i - 0 + 1) + 0)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
export function dateformate (mdate) {
  var date = new Date(mdate)
  var result = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  return result
}
