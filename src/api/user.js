import request from '@/utils/request'

/**
 * 获取图形验证码
 * @returns
 */
const getCaptcha = () => {
  return request({ url: '/captcha', method: 'get' })
}

/**
 * 登录
 * @param {*} data
 * @returns
 */
function login(data) {
  return request({
    url: `/login?username=${data.username}&password=${data.password}&code=${data.code}&token=${data.token}`,
    method: 'post'
  })
}

/**
 * 获取用户信息
 * @returns
 */
function getUserInfo() {
  return request({ url: '/user/info', method: 'get' })
}

/**
 * 获取导航栏信息
 * @returns
 */
function getNavList() {
  return request({ url: '/menu/nav', method: 'get' })
}

/**
 * 渲染用户列表
 */
function getUserList(data) {
  return request({ url: '/user/list', method: 'get', data })
}

export { getCaptcha, login, getUserInfo, getNavList, getUserList }
