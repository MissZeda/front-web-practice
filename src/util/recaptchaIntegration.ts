import axios from "axios";
const request = axios.create({
  baseURL:"",
  timeout:30000
})


export default {
  get(url,data){
    return new Promise((resolve,reject)=>{
      request({
        url: url,
        params: data,
        method:'GET'
      }).then(res =>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}





