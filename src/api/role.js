import request from '@/utils/request'

function getRoleLise(data) {
  return request({
    url: `/role/list?current=${data.current}&size=${data.size}&name=${data.name}`,
    method: 'get'
  })
}

// 添加角色
function addRole(data) {
  return request({ url: '/role/add', method: 'post', data })
}

// 编辑角色
function upRole(data) {
  return request({ url: '/role/update', method: 'put', data })
}

/**
 * 单个角色权限
 */
function getRolePermission(roleId) {
  return request({ url: `/role/info/${roleId}`, method: 'get' })
}
export { getRoleLise, addRole, upRole, getRolePermission }
