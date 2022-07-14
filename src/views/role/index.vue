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
          @handleTableEvent="handleTableEvent"
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

        <!-- 权限分配模态窗 -->
        <el-dialog
          :title="permissionTitle"
          :visible.sync="dialogPermission"
          center
        >
          <el-tree
            :data="menus"
            :props="defaultProps"
            default-expand-all
            :default-checked-keys="treeChecked"
            node-key="id"
            show-checkbox
          >
          </el-tree>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogPermission = false">取 消</el-button>
            <el-button type="success" @click="dialogTree">确 定</el-button>
          </div>
        </el-dialog>
      </template>
    </my-body>
  </div>
</template>

<script>
import MyBody from '../../components/MyBody.vue'
import BreadCrumb from '../../components/BreadCrumb.vue'
import BaseTable from '../../components/BaseTable.vue'
import BaseDialog from '../../components/BaseDialog.vue'

import { getRoleLise, addRole, upRole, getRolePermission } from '../../api/role'
import { getNavList } from '../../api/user'
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
      treeChecked: [],
      defaultProps: {
        label: 'label',
        children: 'children'
      },
      dialogPermission: false,
      permissionTitle: '',
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
              method: 'permission'
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
      dialogClum: [
        {
          prop: 'name',
          label: '角色'
        },
        {
          prop: 'code',
          label: '编码'
        },
        {
          type: 'text',
          label: '描述',
          prop: 'remark'
        },
        {
          type: 'radio',
          label: '状态',
          prop: 'status',
          data: [
            {
              label: '启用',
              value: 1
            },
            {
              label: '禁用',
              value: 2
            }
          ]
        }
      ],
      addForm: {
        name: '',
        code: '',
        remark: '',
        status: 1
      },
      title: '',
      editId: '',
      row: {},
      menus: []
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
      // console.log(res)
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
      this.editId = ''
      this.addForm = {
        name: '',
        code: '',
        remark: '',
        status: 1
      }
      this.title = '新增角色'
      this.dialog = true
    },
    // 提交
    handleSubmit() {
      if (!this.editId) this.addRoles()
      if (this.editId) this.upDataOk()
    },
    // 新增角色确定
    async addRoles() {
      const res = await addRole(this.addForm)
      // console.log(res)
      if (res) {
        this.render()
        this.dialog = false
      }
      this.$message.success('添加成功')
    },
    // 表格事件
    handleTableEvent(method, row) {
      if (method === 'edit') this.updataRole(row)
      if (method === 'permission') this.upPermission(row)
    },
    // 编辑模态窗打开
    updataRole(row) {
      // console.log(row)
      this.editId = row.id
      this.row = row
      this.addForm = row
      this.title = '编辑角色'
      this.dialog = true
    },
    // 编辑确定
    async upDataOk() {
      const res = await upRole(this.row)
      // console.log(res)
      if (res) {
        this.render()
        this.dialog = false
      }
      this.$message.success('修改成功')
    },
    // 分配权限
    async upPermission(row) {
      this.treeChecked = []
      // 请求权限列表
      const { name, menuIds } = await getRolePermission(row.id)
      const res = await getNavList()
      // 拿到所有的菜单
      this.permissionTitle = `给"${name}"分配权限`
      // 给树状图赋值
      this.menus = res.menus
      // 给选中的复选框赋值
      menuIds.forEach((v) => {
        this.treeChecked.push(v)
      })
      // this.treeChecked = menuIds
      console.log(menuIds)
      console.log(res.menus)
      this.dialogPermission = true
    },
    // 树状图确定
    dialogTree() {
      this.$message.success('分配权限成功')
      this.dialogPermission = false
    }
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
