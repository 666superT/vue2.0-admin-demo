import request from '@/utils/request'

function getRoleLise(data) {
  return request({
    url: `/role/list?current=${data.current}&size=${data.size}&name=${data.name}`,
    method: 'get'
  })
}

export { getRoleLise }
