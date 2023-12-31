import request from '../../util/request.ts';

export default {
  login(data:loginUser){
    return request.post("/login",data);
  },
  register(data:registerUser){
    data.email = data.email.concat("@qq.com")
    return request.post("/app/api/register",data)
  },
  getUserInfo(){
    return request.get("/user/api/userInfo")
  },
  getMailCode(param:string){
    return request.get("/app/api/code/"+param)
  },
  getUserList(pageInfo:pageInfo){
    return request.get("/admin/api/user/list",pageInfo)
  },
  queryUserMenu(param){
    return request.get("/user/api/queryUserMenu?id="+param)
  }
}
