<template>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/sys' }">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.title = val.meta.title
      },
      // 深度观察监听
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.bread {
  padding: 19px 19px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
</style>
