import { defineStore } from 'pinia'
import {reactive} from "vue";

export const useUserStore = defineStore('userStore', ()=>{
  const user = reactive({

  })
return {
    user
  }
})
