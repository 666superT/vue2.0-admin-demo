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

/**
 * 删除用户
 */
function delUser(data) {
  return request({ url: `/user/del?integers:${data}`, method: 'post' })
}

/**
 * 新增用户
 */
function addUser(data) {
  return request({ url: '/user/add', method: 'post', data })
}

/**
 * 编辑用户
 */
function updataUser(data) {
  return request({ url: 'user/update', method: 'put', data })
}
/**
 * 请求单个用户
 */
function getOneUser(id) {
  return request({ url: `/user/userInfo/${id}`, method: 'get' })
}

/**
 * 请求角色列表
 */
function getRoleList() {
  return request({ url: '/role/list?current=1&size=50', method: 'get' })
}

/**
 * 更改提交角色
 */
function handleRole(userId, data) {
  return request({ url: `/user/assign/${userId}`, method: 'post', data })
}
export {
  getCaptcha,
  login,
  getUserInfo,
  getNavList,
  getUserList,
  delUser,
  addUser,
  updataUser,
  getOneUser,
  getRoleList,
  handleRole
}
