<template>
  <div class="">
    <my-body>
      <template slot="body">
        <bread-crumb></bread-crumb>

        <base-table
          :tableData="tableData"
          :tableClum="tableClum"
          :total="total"
          :current="current"
          :size="size"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @handleDelEvent="handleDelEvent"
        >
          <template slot="search">
            <div class="box">
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="角色">
                  <el-input
                    v-model="name"
                    placeholder="请输入角色"
                    clearable
                    @clear="handleClearInp"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="success"
                    icon="el-icon-search"
                    @click="handleQueryrole"
                    >查询</el-button
                  >
                </el-form-item>
              </el-form>
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleAddUser"
                >新增</el-button
              >
            </div>
          </template>
        </base-table>

        <base-dialog
          :dialogFormVisible="dialog"
          :dialogClum="dialogClum"
          :model="addForm"
          :title="title"
          @no="no"
          @handleSubmit="handleSubmit"
        />
      </template>
    </my-body>
  </div>
</template>

<script>
import MyBody from '../../components/MyBody.vue'
import BreadCrumb from '../../components/BreadCrumb.vue'
import BaseTable from '../../components/BaseTable.vue'
import BaseDialog from '../../components/BaseDialog.vue'

import { getRoleLise } from '../../api/role'
export default {
  components: {
    MyBody,
    BreadCrumb,
    BaseTable,
    BaseDialog
  },
  // 定义属性
  data() {
    return {
      total: 0,
      name: '',
      current: 1,
      size: 5,
      tableData: [],
      tableClum: [
        {
          prop: 'name',
          label: '角色',
          align: 'center'
        },
        {
          prop: 'code',
          label: 'admin',
          align: 'center'
        },
        {
          prop: 'remark',
          label: '描述',
          align: 'center'
        },
        {
          type: 'switch',
          prop: 'status',
          label: '状态',
          align: 'center'
        },
        {
          prop: 'createTime',
          label: '创建时间',
          align: 'center'
        },
        {
          type: 'btn',
          label: '操作',
          align: 'center',
          width: '300px',
          btns: [
            {
              type: 'success',
              name: '编辑',
              size: 'medium',
              method: 'edit'
            },
            {
              type: 'warning',
              name: '分配权限',
              size: 'medium',
              method: 'allot'
            },
            {
              type: 'danger',
              name: '删除',
              size: 'medium',
              method: 'del',
              slot: 'reference'
            }
          ]
        }
      ],
      dialog: false,
      dialogClum: [],
      addForm: {},
      title: ''
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handleClearInp() {
      this.render()
    },
    async render() {
      const res = await getRoleLise({
        current: this.current,
        size: this.size,
        name: this.name
      })
      console.log(res)
      this.tableData = res.records
      this.total = res.total
    },
    handleSizeChange(val) {
      this.size = val
      this.render()
    },
    handleCurrentChange(val) {
      this.current = val
      this.render()
    },
    handleDelEvent() {
      alert('删除')
    },
    handleQueryrole() {
      this.current = 1
      this.render()
    },
    no() {
      this.dialog = false
    },
    // 添加模态窗打开
    handleAddUser() {
      this.dialog = true
    },
    handleSubmit(val) {}
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.render()
  },
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
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
