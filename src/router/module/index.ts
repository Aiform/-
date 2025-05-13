import { RouteRecordRaw } from 'vue-router'

const routerModule:RouteRecordRaw[] = [
    {
        path: '/',
        component:()=> import('@/layouts/index.vue')


    }

]
export default routerModule