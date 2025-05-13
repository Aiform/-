import { createRouter, createWebHashHistory } from 'vue-router'
import { readFromLocalStorage } from '../utils/storage'
import interfaceRouter from './module/index'
const router = createRouter({
    history: createWebHashHistory(),
    routes: interfaceRouter
})
export default router
