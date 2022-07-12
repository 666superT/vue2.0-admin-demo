<template>
  <div class="login">
    <h1>智慧服务平台</h1>
    <div class="login-form">
      <h2>欢迎登录</h2>

      <el-form
        :model="loginForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" suffix-icon="el-icon-user">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            suffix-icon="el-icon-goods"
            v-model="loginForm.password"
            type="password"
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div class="inp_w">
            <el-input
              v-model="loginForm.code"
              placeholder="请输入验证码"
            ></el-input>
            <img @click.stop="captcha" :src="codeImgUrl" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            style="width: 100%"
            @click="handelLogin"
            :loading="showLoding"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCaptcha } from '../../api/user'
export default {
  components: {},
  // 定义属性
  data() {
    return {
      loginForm: {
        username: 'duck',
        password: 'admin888',
        code: '',
        token: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      codeImgUrl: '',
      showLoding: false
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    /**
     * 验证码
     */
    async captcha() {
      const { captchaImg, token } = await getCaptcha()
      this.codeImgUrl = captchaImg
      this.loginForm.token = token
    },
    async handelLogin() {
      try {
        this.showLoding = true
        const res = await this.$store.dispatch(
          'user/handleLogin',
          this.loginForm
        )
        if (!res) return
        this.$router.push('/')
        this.$notify({
          title: '提示',
          message: '登陆成功',
          type: 'success'
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.showLoding = false
        this.captcha()
        this.loginForm.code = ''
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.captcha()
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
.login {
  height: 100%;
  background: url('https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg')
    no-repeat;
  background-size: 100%;
  overflow: hidden;
  h1 {
    text-align: center;
    font-size: 42px;
    margin-top: 50px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 5px;
  }
  .login-form {
    margin: 10% auto 13%;
    width: 20%;
    h2 {
      color: #fff;
      font-size: 30px;
      margin-bottom: 30px;
    }
  }
  .inp_w {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 100px;
      height: 40px;
      border-radius: 5px;
      margin-left: 20px;
    }
  }
}
</style>
