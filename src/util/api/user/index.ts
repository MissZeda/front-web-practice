import request from '../../request';

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
  }
}
