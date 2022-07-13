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
        >
          <template slot="search">
            <div class="box">
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="用户名">
                  <el-input
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
              <el-button type="primary" icon="el-icon-edit">新增</el-button>
            </div>
          </template>
        </base-table>
      </template>
    </my-body>
  </div>
</template>

<script>
import MyBody from '../../components/MyBody.vue'
import BreadCrumb from '../../components/BreadCrumb.vue'
import BaseTable from '../../components/BaseTable.vue'
import { getUserList } from '../../api/user'
export default {
  components: {
    MyBody,
    BreadCrumb,
    BaseTable
  },
  // 定义属性
  data() {
    return {
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
          type: 'swatch',
          prop: 'status',
          label: '状态',
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
              name: '分配角色',
              size: 'medium',
              method: 'allot'
            },
            {
              type: 'danger',
              name: '删除',
              size: 'medium',
              method: 'del'
            }
          ]
        }
      ],
      tableData: [],
      total: 0
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    /**
     * 渲染
     */
    async render() {
      const res = await getUserList({
        current: this.current,
        size: this.size,
        username: this.username
      })
      console.log(res)
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
