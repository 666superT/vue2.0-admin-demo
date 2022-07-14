import request from '@/utils/request'

function getMenuList(data) {
  return request({
    url: `/menu/list?current=${data.current}&size=${data.size}&name=${data.name}`,
    method: 'get'
  })
}

export { getMenuList }
