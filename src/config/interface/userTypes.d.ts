// 登录用户模板
interface loginUser {
  userName: string,
  password: string
}
// 注册用户模板
interface registerUser {
  userName: string,
  password: string,
  email:string,
  phonenumber:string,
  sex:number,
  code:string,
}

interface user{
  accountNonExpired:boolean,
  accountNonLocked:boolean,
  authorities:Array<any>,
  avatar:string,
  createTime:string,
  credentialsNonExpired:boolean,
  delFlag:number,
  email:string,
  id:number,
  nickName:string,
  password:string,
  phonenumber:string,
  sex:number,
  status:number,
  userName:string,
  userType:number,
  username:string
}

interface  pageInfo{
  pageNum ?:string,
  pageSize ?:string
}
