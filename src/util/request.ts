import axios from 'axios'
import {ElNotification} from "element-plus";

const baseUrl: string = "http://127.0.0.1:8088";

const request = axios.create({
  baseURL: baseUrl,
  timeout: 10000
})

request.interceptors.request.use(config => {
  // 请求拦截器,sessionStorage中有token则添加到请求头中
  if (window.sessionStorage.getItem("token")) {
    config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
  }
  return config
}, error => {
  console.log("Something Wrong With The Request ==>  ", error);
})

request.interceptors.response.use(res => {
  if(res.data.code===50001){
    ElNotification.error(res.data.msg)
    return Promise.reject(res.data.msg);
  }
    return res.data;
},error => {
  console.log("Something Wrong With The Response ==>  ", error);
  ElNotification.error(error.message)
  return Promise.reject(error.message);
})

export default{
  post(url,data){
    return new Promise((resolve,reject)=>{
      request({
        method:'POST',
        data:data,
        url:url
      }

      ).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  get(url,data){
    return new Promise((resolve,reject)=>{
      request({
        method:'GET',
        params:data,
        url:url
      }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  delete(url,data){
    return new Promise((resolve,reject)=>{
      request({
        method:'DELETE',
        data:data,
        url:url
      }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  put(url,data){
    return new Promise((resolve,reject)=>{
      request({
        method:'PUT',
        data:data,
        url:url
      }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}
