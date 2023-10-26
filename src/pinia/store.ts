import { defineStore } from 'pinia'
import {reactive, ref} from "vue";

export const useUserStore = defineStore('userStore', ()=>{
  const user = ref<user>({})
return {
    user
  }
})
