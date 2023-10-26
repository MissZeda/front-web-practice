import { RouterView } from 'vue-router'


const manageRouter = { // 管理端
  path: '/manage',
  name: '管理',
  component: () => import('../layout/AppLayout.vue'),
  children:[
    {path: 'home', name: '主目录', component:()=>import('../manager/Home/Home.vue'),meta:{title:'主目录',icon:'House',breadcrumb:"主目录"},

    },
    {path: '/user', name: '用户中心', component:  RouterView,meta:{icon:'User',breadcrumb:"用户中心"},
      children:[
        {path:'userManage',name:'用户管理',component:()=>import('../manager/UserManage/UserManage.vue'),meta:{breadcrumb:"用户管理"}},
      ]
    },
    {path: '/device', name: '设备中心', component:  RouterView,meta:{icon:'Iphone',breadcrumb:"设备中心"},
      children:[
        {path:'deviceManage',name:'设备管理',component:()=>import('../manager/DeviceManage/DeviceManage.vue'),meta: {breadcrumb:"设备管理"}},
      ]
    },
    {path: '/data', name: '数据看板', component:  RouterView,meta:{icon:'DataAnalysis',breadcrumb:"数据看板"},
      children:[
        {path:'dataCenter',name:'传感器数据',component:()=>import('../manager/DataCenter/DataCenter.vue'),meta: {breadcrumb:"传感器数据"}},
      ]
    },
    {path: '/ControlManage', name: '控制', component:  RouterView,meta:{icon:'Cpu',breadcrumb:"控制"},
      children: [
        {path:'controlCenter',name:'控制中心',component:()=>import('../manager/ControlManage/ControlCenter.vue'),meta: {breadcrumb:"控制中心"}},
      ]
    },
    {path: '/UserCenter', name: '个人', component:  RouterView,meta:{icon:'Promotion',breadcrumb:"个人"},
      children: [
        {path:'userIndex',name:'个人中心',component:()=>import('../manager/UserCenter/UserIndex.vue'),meta: {breadcrumb:"个人中心"}},
      ]
    },
  ]
}
export default manageRouter
