import storage from '@/utils/storage'
// import router from '@/router'
export default {
  namespaced: true,
  state: {
    tagsViewList: storage.getItem('tagsViewList') || []
  },
  mutations: {
    SET_TAGS(state, obj) {
      let flag = false
      state.tagsViewList.forEach((v) => {
        if (v.path === obj.path) {
          flag = true
        }
      })
      if (obj.path === '/sys/home') {
        flag = true
      }
      if (!flag) {
        state.tagsViewList.push(obj)
        storage.setItem('tagsViewList', state.tagsViewList)
      }
    },
    DEL_TAG(state, i) {
      state.tagsViewList.splice(i, 1)
      // router.push(state.tagsViewList[i - 1].path)
      storage.setItem('tagsViewList', state.tagsViewList)
    },
    DEL_ALL_TAG(state) {
      state.tagsViewList = []
      storage.setItem('tagsViewList', state.tagsViewList)
    }
  }
}
