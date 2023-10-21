<script setup lang="ts">
import {reactive, ref, toRefs} from "vue";
import userApi from '../util/api/user/index.ts'
import {ElAlert, ElMessage, ElNotification} from 'element-plus'

// 登录用户模板
interface loginUser {
  userName: String,
  password: String
}
// 注册用户模板
interface registerUser {
  userName: String,
  password: String,
  email:String,
  phonenumber:String,
  sex:number,
  code:String,
}
// 登录信息
const user = reactive<loginUser>({
  userName:"",
  password:""
})

// 注册信息
const registerUserData = reactive<registerUser>({
  userName: "",
  password: "",
  email:"",
  phonenumber:"",
  sex:undefined,
  code:""
})

// 登录接口
async function login(){
  console.log(user)
  console.log()
  console.log(registerVisible.value)
  if(user.userName=='' || user.password==''){
    ElNotification.error({
      title: '登录提示',
      message: '不能输入空数据❌',
      showClose: false,
    })
  }else{
    const res = await userApi.login(user)
    window.sessionStorage.setItem("token",res.token)
    ElNotification.success({
      title: '登录提示',
      message: '登录成功,即将为你跳转到主界面',
      showClose: false,
    })
  }
}

// 注册操作
const repeatPwd = ref<String>("");
async function register(){
  if(registerUserData.code==""){
    ElMessage.error("请输入验证码")
    return;
  }else if(repeatPwd.value!==registerUserData.password){
    ElMessage.error("两次密码不一致")
    return;
  }
  for (const key of Object.keys(registerUserData)) {
   if( registerUserData[key] == null){
     ElMessage.error("不要填入空数据")
     return;
   }
  }
  if(registerUserData.email.includes("@qq.com")){
    ElMessage.error("邮箱不需要加上后缀")
    return;
  }

  const res = await userApi.register(registerUserData);
  if(res.code===200){
    ElNotification.success("注册成功,快去登录吧")
    repeatPwd.value="";
    for (const key of Object.keys(registerUserData)) {
      // 设置属性为 null 或 undefined
      registerUserData[key] = null;
      // 或者使用 delete 操作符删除属性
      // delete obj[key];
    }
    registerVisible.value = false;
    loginVisible.value = true;
  }
}

// 检查密码
function checkPwd(){
  if(repeatPwd.value!==registerUserData.password){
    ElMessage.error("两次密码不一致")
  }
}

// 按钮样式
const counting = ref<boolean>(false)
const countdown = ref<number>(60)

function startCountdown() {
  const timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      // 倒计时结束，重置状态
      counting.value = false;
      countdown.value = 60;
      clearInterval(timer);
    }
  }, 1000);
}

const codeInputVisible = ref<boolean>(false);
// 请求验证码
async function getMailCode(){
  if(registerUserData.email==""){
    ElNotification.error("请输入邮箱！！")
    return;
  }
  const res = await userApi.getMailCode(registerUserData.email+"@qq.com")
  if(res.code===200){
    counting.value = true;
    startCountdown();
    codeInputVisible.value = true;
    ElNotification.success("验证码发送成功")
  }
}

// 界面切换
const loginVisible = ref<boolean>(true)
const registerVisible = ref<boolean>(false)
</script>

<template>
<div class="container">
<!--  登录表单样式-->
  <div>
    <transition name="el-zoom-in-top">
      <div v-show="loginVisible">
        <div class="login-form" >
          <div class="login-text">
            登录
          </div>
        </div>
        <div>
          <div class="login-input">
            <el-row :justify="'center'">
              <el-col :span="7">
                <el-input v-model="user.userName" placeholder="用户名" class="item"/>
                <el-input v-model="user.password" placeholder="密码" show-password class="item"/>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row :justify="'center'">
              <el-button type="text" style="padding-left: 430px">忘记密码?</el-button>
            </el-row>
          </div>
          <div>
            <el-row :justify="'center'">
              <el-button style="background-color: #723dbd;color: white;width: 200px" size="large" @click="login">登录</el-button>
            </el-row>
            <el-row :justify="'center'">
              <el-text style="padding-top: 20px;" type="info">你还没有账号？</el-text>
              <el-link style="padding-top: 20px;" :underline="false" type="warning" tag="b" @click="registerVisible = true;loginVisible=false">注册！</el-link>
            </el-row>
          </div>
        </div>
      </div>
    </transition>
  </div>

<!--登录表单样式end-->

  <div>
    <transition name="el-zoom-in-bottom">
     <div v-show="registerVisible">
        <div>
          <div class="login-form" >
            <div class="register-text">
              注册
            </div>
          </div>
          <div>
            <div class="login-input">
              <el-row :justify="'center'">
                <el-col :span="7">
                  <el-input v-model="registerUserData.userName" placeholder="用户名" class="item"/>
                  <el-input v-model="registerUserData.password" show-password placeholder="密码" class="item"/>
                  <el-input v-model="repeatPwd" placeholder="请再次输入密码" @blur="checkPwd" show-password class="item"/>
                  <el-input v-model="registerUserData.phonenumber" placeholder="手机号" class="item"/>
                  <el-radio-group v-model="registerUserData.sex" class="ml-4">
                    <el-radio label="0" size="large">男</el-radio>
                    <el-radio label="1" size="large">女</el-radio>
                    <el-radio label="2" size="large">保密</el-radio>
                  </el-radio-group>
                </el-col>
              </el-row>
              <el-row :justify="'center'" style="padding-left: 55px" >
                <el-col :span="6" >
                  <el-input v-model="registerUserData.email" style="width: 350px" placeholder="邮箱" class="item">
                    <template #append>@qq.com</template>
                  </el-input>
                </el-col>
                <el-col :span="2">
                  <div style="padding-left: 25px">
                    <el-button
                      type="primary"
                      style="height: 37px;"
                      :disabled="counting"
                      @click="getMailCode"> {{ counting ? `${countdown} 秒后可重发` : '发送' }}</el-button>
                  </div>
                </el-col>
              </el-row>
             <div v-show="codeInputVisible">
               <el-row :justify="'center'">
                 <el-col :span="7">
                   <el-input v-model="registerUserData.code" placeholder="请输入验证码" class="item"/>
                 </el-col>
               </el-row>
             </div>
            </div>
            <div style="padding-top: 20px">
              <el-row :justify="'center'">
                <el-button
                  style="background-color: #723dbd;color: white;width: 200px;"
                  size="large"
                  @click="register">注册</el-button>
              </el-row>
              <el-row :justify="'center'">
                <el-link :underline="false" style="padding-top: 20px;padding-left: 450px;width: 200px;font-size: medium" type="success" @click="registerVisible=false;loginVisible=true">去登录</el-link>
              </el-row>
            </div>
          </div>
        </div>
     </div>
    </transition>
  </div>
</div>
</template>

<style lang="scss" scoped>
.container{
  height: 100vh;
  background-color: #ededed;
  .login-form{
    .mail-code{
      padding-right: 20px;
    }
    .register-text{
      text-align: center;
      padding-top: 160px;
      padding-bottom: 30px;
      color: #6e6e6e;
      font-family: "苹方 常规",fangsong;
      font-size: 40px;
    }
    .login-text{
      text-align: center;
      padding-top: 200px;
      padding-bottom: 30px;
      color: #6e6e6e;
      font-family: "苹方 常规",fangsong;
      font-size: 40px;
    }
  }
  .login-input{
    .item{
      margin-bottom: 10px;
      width: 500px;
      height: 40px;
    }
  }
}
</style>
