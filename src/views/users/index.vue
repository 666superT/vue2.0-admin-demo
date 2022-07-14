<template>
  <div class="user">
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
                <el-form-item label="用户名">
                  <el-input
                    clearable
                    @clear="handleClearInp"
                    v-model="username"
                    placeholder="请输入用户名"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="success"
                    icon="el-icon-search"
                    @click="handleQueryUser"
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
        >
        </base-dialog>

        <!-- 分配角色模态窗 -->
        <el-dialog
          center
          width="30%"
          title="分配角色"
          :visible.sync="dialogRoleVisible"
        >
          <el-form>
            <el-form-item label="角色">
              <el-select v-model="roleList" multiple placeholder="请选择角色">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogRoleVisible = false">取 消</el-button>
            <el-button type="success" @click="submitRoles">确 定</el-button>
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
import {
  getUserList,
  addUser,
  updataUser,
  getOneUser,
  getRoleList,
  handleRole
} from '../../api/user'
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
      userInfo: '',
      title: '',
      current: 1,
      size: 5,
      username: '',
      tableClum: [
        {
          prop: 'username',
          label: '用户名',
          align: 'center'
        },
        {
          type: 'img',
          prop: 'avatar',
          label: '头像',
          align: 'center'
        },
        {
          type: 'tag',
          prop: 'roles',
          label: '角色',
          align: 'center'
        },
        {
          prop: 'email',
          label: '邮箱',
          align: 'center'
        },
        {
          prop: 'createTime',
          label: '注册时间',
          align: 'center'
        },
        {
          type: 'switch',
          prop: 'status',
          label: '状态',
          align: 'center'
        },
        {
          type: 'btn',
          label: '操作',
          align: 'center',
          width: '300px',
          callback(row) {
            return row.roles.length === 1 && row.roles[0].code === 'admin'
          },
          btns: [
            {
              type: 'success',
              name: '编辑',
              size: 'medium',
              method: 'edit'
            },
            {
              type: 'warning',
              name: '分配角色',
              size: 'medium',
              method: 'role'
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
      tableData: [],
      total: 0,
      dialog: false,
      dialogClum: [
        {
          prop: 'avatar',
          type: 'img',
          label: '头像',
          avatar:
            'https://img2.baidu.com/it/u=2744676768,2143551610&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1657818000&t=daf1f987bcc16e2c8ea80bb7c657b9b6'
        },
        {
          prop: 'username',
          label: '用户名'
        },
        {
          type: 'password',
          prop: 'password',
          label: '密码'
        },
        {
          prop: 'email',
          label: '邮箱'
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
        avatar:
          'https://img1.baidu.com/it/u=422323813,1539412709&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1657904400&t=239445a7dcfe064c765d9825831e1940',
        email: '',
        password: '',
        status: 1,
        username: ''
      },
      editId: '',
      dialogRoleVisible: false,
      roleList: [],
      options: []
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
    /**
     * 渲染
     */
    async render() {
      const res = await getUserList({
        current: this.current,
        size: this.size,
        username: this.username
      })
      // console.log(res)
      this.tableData = res.records
      this.total = res.total
    },
    /**
     * 每页条数
     */
    handleSizeChange(val) {
      this.size = val
      this.render()
    },
    /**
     * 第几页
     */
    handleCurrentChange(val) {
      this.current = val
      this.render()
    },
    /**
     * 查询
     */
    handleQueryUser() {
      this.current = 1
      this.render()
    },
    /**
     * 删除用户
     */
    async handleDelEvent(val) {
      alert('接口不通')
      // const res = await delUser(val.id)
      // console.log(res)
      // console.log(val)
    },
    // 新增用户
    handleAddUser() {
      this.editId = ''
      this.title = '新增用户'
      this.addForm = {
        avatar:
          'https://img1.baidu.com/it/u=422323813,1539412709&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1657904400&t=239445a7dcfe064c765d9825831e1940',
        email: '',
        password: '',
        status: 1,
        username: ''
      }
      this.dialog = true
    },
    no() {
      this.dialog = false
    },
    handleSubmit() {
      if (!this.editId) this.addUser()
      if (this.editId) this.updateUser()
    },
    // 实现添加用户提交
    async addUser() {
      this.dialog = false
      const res = await addUser(this.addForm)
      // console.log(res)
      if (res) {
        this.$message.success('添加成功')
        this.render()
      }
    },
    // 打开修改模态窗
    async handleUpdateUser(row) {
      this.title = '修改用户'
      const res = await getOneUser(row.id)
      this.addForm = res
      this.userInfo = res
      this.editId = row.id
      this.dialog = true
      // console.log(res)
    },
    // 实现修改用户提交
    async updateUser() {
      const res = await updataUser(this.userInfo)
      // console.log(res)
      if (res) {
        this.$message.success('修改成功')
        this.render()
      }
      this.dialog = false
    },
    // 表格事件
    handleTableEvent(method, row) {
      if (method === 'edit') this.handleUpdateUser(row)
      if (method === 'role') this.handleRoleSubmit(row)
    },
    // 分配角色模态窗
    async handleRoleSubmit(row) {
      this.roleList = []
      row.roles.forEach((v) => {
        this.roleList.push(v.id)
      })
      this.editId = row.id
      const res = await getRoleList()
      // console.log(res)
      this.options = res.records
      this.dialogRoleVisible = true
    },
    async submitRoles() {
      const res = await handleRole(this.editId, this.roleList)
      console.log(res)
      if (res) {
        this.$message.success('添加成功')
        this.render()
      }
      this.dialogRoleVisible = false
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
