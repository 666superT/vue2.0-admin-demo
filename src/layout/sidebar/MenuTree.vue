<template>
  <div class="menu">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="rgb(34, 45, 50)"
      text-color="#fff"
      active-text-color="rgb(255, 208, 75)"
      style="border: none"
      collapse-transition
      :collapse="isCollapse"
      router
    >
      <Item v-for="(v, i) in getMenuList" :key="i" :item="v"></Item>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {
    Item: () => import('./Item.vue')
  },
  computed: {
    getMenuList() {
      return this.$store.getters.navList.menus
    }
  },
  data() {
    return {
      isCollapse: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
