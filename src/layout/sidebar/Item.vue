<template>
  <div class="item">
    <template v-if="item && item.component !== null">
      <el-menu-item :index="item.path === '/' ? '/sys/home' : item.path">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
    </template>

    <template v-if="item && item.component === null"
      ><el-submenu :index="item.perms">
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span>{{ item.label }}</span>
        </template>
        <Item v-for="(j, k) in item.children" :key="k" :item="j"></Item>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.el-submenu__title:hover,
.el-submenu__title:focus {
  background: rgb(27, 36, 40) !important;
}
.el-menu-item:hover {
  background: rgb(27, 36, 40) !important;
}
</style>
