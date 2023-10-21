import request from '../../request';

export default {
  login(data){
    return request.post("/login",data);
  },
  hello(){
    return request.get("/app/api/hello");
  },
  register(data){
    data.email = data.email.concat("@qq.com")
    return request.post("/app/api/register",data)
  },
  getUserInfo(){

  },
  getMailCode(param){
    return request.get("/app/api/code/"+param)
  }
}
