<template>
  <div class="tags">
    <div
      @click="$router.push('/sys/home')"
      :class="{ active: $route.path === '/sys/home' }"
    >
      控制台
    </div>
    <div
      class="last"
      v-for="(v, i) in getTagsList"
      :key="i"
      @click="go(v.path)"
      :class="{ active: $route.path === v.path }"
    >
      {{ v.title }} <span @click.stop="delTag(i)">x</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  // 定义属性
  data() {
    return {}
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    getTagsList() {
      return this.$store.getters.tagsViewList
    }
  },
  // 监控data中的数据变化
  watch: {
    $route(to, from) {
      // console.log(to)
      const obj = {
        path: to.path,
        title: to.meta.title
      }
      this.$store.commit('tagsView/SET_TAGS', obj)
    }
  },
  // 方法集合
  methods: {
    delTag(i) {
      this.$store.commit('tagsView/DEL_TAG', i)
    },
    go(path) {
      this.$router.push(path)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 生命周期 - 创建之前
  beforeCreate() {},
  // 生命周期 - 挂载之前
  beforeMount() {},
  // 生命周期 - 更新之前
  beforeUpdate() {},
  // 生命周期 - 更新之后
  updated() {},
  // 生命周期 - 销毁之前
  beforeDestroy() {},
  // 生命周期 - 销毁完成
  destroyed() {},
  // 如果页面有keep-alive缓存功能，这个函数会触发
  activated() {}
}
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  div {
    background-color: #fff;
    border-color: #e6a23c;
    color: #e6a23c;
    cursor: pointer;
    font-size: 12px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    padding: 10px;
  }
  .last {
    margin-left: 15px;
    span {
      display: inline-block;
      margin-left: 10px;
      width: 12px;
      height: 12px;
      text-align: center;
      line-height: 12px;
      border-radius: 50px;
      &:hover {
        background: #eb9008;
        color: #fff;
      }
    }
  }
}
.active {
  background: #e6a23c !important;
  color: #fff !important;
}
</style>
