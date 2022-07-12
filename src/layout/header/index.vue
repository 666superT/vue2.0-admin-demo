<template>
  <div class="header">
    <div class="left">
      <i class="el-icon-s-fold"></i>
      <div class="tag">
        <tags-view></tags-view>
      </div>
    </div>
    <div class="right">
      <div class="icon">
        <el-tooltip
          class="item"
          effect="dark"
          content="全屏"
          placement="bottom"
        >
          <i class="el-icon-rank"></i>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="关闭全部标签"
          placement="bottom"
        >
          <i class="el-icon-circle-close" @click="delAllTag"></i>
        </el-tooltip>
      </div>

      <el-avatar :size="35" :src="userInfo.avatar" />
      <el-dropdown :hide-on-click="false" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userInfo.username
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="set">个人设置</el-dropdown-item>
          <el-dropdown-item command="out">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import TagsView from '../../components/TagsView'
export default {
  components: {
    TagsView
  },
  // 定义属性
  data() {
    return {}
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    delAllTag() {
      this.$store.commit('tagsView/DEL_ALL_TAG')
    },
    handleCommand(val) {
      if (val === 'set') this.handleSetUser()
      if (val === 'out') this.handleLogOut()
    },
    handleSetUser() {
      console.log('修改')
    },
    handleLogOut() {
      this.$store.commit('user/SET_TOKEN', '')
      this.$router.push('/login')
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
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .left {
    display: flex;
    align-items: center;
    height: 100%;
    i {
      color: #fff;
      font-size: 25px;
    }
    .tag {
      margin-left: 15px;
    }
  }
  .right {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      margin-right: 25px;
      i {
        font-size: 25px;
        color: #fff;
        &:nth-of-type(1) {
          transform: rotate(25deg);
          margin-right: 25px;
        }
      }
    }
  }
}
.el-dropdown-link {
  margin-left: 10px;
  cursor: pointer;
  color: #fff;
  font-size: 20px;
}
.el-icon-arrow-down {
  font-size: 20px;
  color: #fff;
}
</style>
