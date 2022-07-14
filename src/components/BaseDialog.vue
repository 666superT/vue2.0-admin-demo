<template>
  <div class="dialog">
    <el-dialog
      :title="title"
      :visible="dialogFormVisible"
      :before-close="handleClose"
    >
      <el-form :model="model" label-width="80px">
        <template v-for="v in dialogClum">
          <el-form-item v-if="v.type === 'img'" :key="v.prop" v-bind="v">
            <el-input v-model="model[v.prop]" v-show="false"></el-input>
            <el-avatar :size="50" :src="v.avatar"></el-avatar>
          </el-form-item>

          <el-form-item :key="v.prop" v-bind="v" v-if="!v.type">
            <el-input v-model="model[v.prop]"></el-input>
          </el-form-item>

          <template v-if="v.type === 'password'">
            <el-form-item :key="v.prop" v-bind="v">
              <el-input v-model="model[v.prop]"></el-input>
            </el-form-item>
          </template>

          <template v-if="v.type === 'radio'">
            <slot name="radio"></slot>
          </template>
        </template>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="no">取 消</el-button>
        <el-button type="success" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    dialogClum: {
      type: Array,
      default: () => []
    },
    model: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: {},
  // 定义属性
  data() {
    return {}
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    no() {
      this.$emit('no')
    },
    handleClose() {
      this.$emit('no')
    },
    handleSubmit() {
      this.$emit('handleSubmit')
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

<style lang="scss" scoped></style>
