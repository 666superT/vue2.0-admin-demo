<template>
  <div class="base_table">
    <slot name="search"></slot>

    <el-table :data="tableData" border style="width: 100%" row-key="id">
      <template v-if="index">
        <el-table-column type="index" label="序号" />
      </template>

      <template v-for="v in tableClum">
        <template v-if="!v.type">
          <el-table-column v-bind="v" :key="v.prop"> </el-table-column>
        </template>

        <template v-if="v.type === 'img'">
          <el-table-column v-bind="v" :key="v.prop">
            <template slot-scope="scope">
              <el-avatar :size="35" :src="scope.row.avatar"></el-avatar>
            </template>
          </el-table-column>
        </template>

        <template v-if="v.type === 'tag'">
          <el-table-column v-bind="v" :key="v.prop">
            <template slot-scope="scope">
              <el-tag v-for="j in scope.row.roles" :key="j.id">{{
                j.name
              }}</el-tag>
            </template>
          </el-table-column>
        </template>

        <template v-if="v.type === 'tags'">
          <el-table-column v-bind="v" :key="v.prop">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.type === 0
                    ? 'success'
                    : scope.row.type === 1
                    ? 'primary'
                    : 'danger'
                "
                >{{
                  scope.row.type === 0
                    ? '目录'
                    : scope.row.type === 1
                    ? '菜单'
                    : '按钮'
                }}</el-tag
              >
            </template>
          </el-table-column>
        </template>

        <template v-if="v.type === 'switch'">
          <el-table-column v-bind="v" :key="v.prop">
            <template slot-scope="scope">
              <el-switch
                :value="scope.row.status === 1 ? true : false"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
        </template>

        <template v-if="v.type === 'btn'">
          <el-table-column v-bind="v" :key="v.prop">
            <template slot-scope="scope">
              <template v-for="(j, k) in v.btns">
                <el-button
                  v-if="j.type !== 'danger'"
                  v-bind="j"
                  @click="handleTagEvent(j.method, scope.row)"
                  :key="k"
                  plain
                  >{{ j.name }}</el-button
                >
              </template>

              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @confirm="handleDelEvent(scope.row)"
              >
                <el-button
                  v-for="(j, k) in v.btns"
                  v-bind="j"
                  @click="handleTagEvent(j.method, scope.row)"
                  :key="k"
                  plain
                  >{{ j.name }}</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>

    <div class="page">
      <span></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableClum: {
      type: Array,
      default: () => []
    },
    index: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
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
    // 表格事件
    handleTagEvent(method, row) {
      this.$emit('handleTableEvent', method, row)
    },
    // 表格删除事件
    handleDelEvent(row) {
      // console.log(row)
      this.$emit('handleDelEvent', row)
    },

    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
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
.base_table {
  padding: 20px;
}
.page {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.el-table {
  margin-top: 20px;
}
.el-button--warning {
  margin-right: 10px;
}
</style>
