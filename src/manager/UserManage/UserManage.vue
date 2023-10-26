<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {Brush, CirclePlus, Delete, Refresh, Remove, Search} from "@element-plus/icons-vue";
import userApi from '../../api/user/index.ts'
import moment from "moment";
const userDataForm = reactive({});

async function onSubmit(){

}

async function addNewUser(){

}

const refreshTable = ()=>{

}

async function checkDetail (index:number,row){
  const res = await userApi.queryUserMenu(row.id);
  console.log(res)
}
const userData = ref([])
const pageInfo = reactive<pageInfo>({
  pageNum:1,
  pageSize:10
})
async function getUserList(){
  const res = await userApi.getUserList(pageInfo);
  console.log(res)
  for (let i = 0; i < res.data.users.length; i++) {
    res.data.users[i].createTime = moment(res.data.users[i].createTime).format("YYYY-MM-DD hh:mm:ss")
  }
  userDataTotal.value = res.data.total
  userData.value = res.data.users
}

const userDataTotal = ref<number>(0);
const handleSizeChange = (val:number)=>{
  pageInfo.pageSize = val
  getUserList()
}

const handleCurrentChange = (val:number)=>{
  pageInfo.pageNum = val
  getUserList()
}
onMounted(()=>{
  getUserList()
})
</script>

<template>
  <div>
    <div>
      <el-row>
        <el-col>
          <div>
            <el-form :inline="true" :model="userDataForm" class="demo-form-inline">
              <el-form-item label="用户ID">
                <el-input v-model="userDataForm.id" placeholder="用户ID" clearable style="width: 270px" />
              </el-form-item>
              <el-form-item label="用户名">
                <el-input v-model="userDataForm.userName" placeholder="用户名" clearable style="width: 270px"  />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" :icon="Search">查询</el-button>
                <el-button type="warning" @click="onSubmit" :icon="Brush">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-row :justify="'end'" :gutter="2">
        <el-col :span="1" >
          <el-button :icon="Delete" size="default" type="danger" circle disabled></el-button>
        </el-col>
        <el-col  :span="1" >
          <el-button :icon="CirclePlus" size="default" type="primary" circle @click="addNewUser"></el-button>
        </el-col>
        <el-col  :span="1" >
          <el-button :icon="Refresh" size="default" circle @click="refreshTable"></el-button>
        </el-col>
      </el-row>
    </div>
    <div>

      <el-table :data="userData" style="width: 100%">
        <el-table-column prop="id" label="用户ID" width="80" />
        <el-table-column prop="userName" label="昵称" width="200" />
        <el-table-column prop="phonenumber" label="手机号" width="170" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="sex" label="性别" width="80" >
        </el-table-column>
        <el-table-column prop="userType" label="权限" width="80" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="avatar" label="头像" width="80" />
        <el-table-column prop="delFlag" label="是否删除" width="80" />
        <el-table-column prop="status" label="是否可用" width="80" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button disabled size="small" @click="checkDetail(scope.$index, scope.row)"
            >查看详情</el-button
            >
            <el-button
              size="small"
              type="danger"
              disabled
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
el-input{
  width: 1000px;
}
</style>
