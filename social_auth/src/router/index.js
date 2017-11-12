import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/components/Login'
import HomePage from '@/components/HomePage'
import PageNotFound from '@/components/PageNotFound'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    meta: {authRequires: true}
  },
  {
    path: '*',
    name: 'page-not-found',
    component: PageNotFound
  }
]


const router = new VueRouter({routes,mode:'history'})

router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem('auth')
  if(to.meta.authRequires && !auth) {
    next({name:'login'})
  } else if (!to.meta.authRequires && auth && to.name === 'login') {
    next({name:'home'})
  } else {
    next()
  }
})


export default router;
