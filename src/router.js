import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/register.vue'
import onwerHome from './views/onwerHome.vue'
import tenantHome from './views/tenantHome.vue'
import onwerInfo from './views/onwerInfo.vue'
import tenantInfo from './views/tenantInfo.vue'
import myTenant from './views/myTenant.vue'
import tenantCharge from './views/tenantCharge.vue'
import myCharge from './views/myCharge.vue'

Vue.use(Router)

const router = new Router({
  routes: [
	  {path: '/',
	    redirect: '/login'
	  },
    {path: '/login',
      component: Login
    },
	{path: '/register',
	  component: Register
	},
	{path: '/onwerHome',
	  component: onwerHome,
	  redirect: '/onwerInfo',
	  children: [{
				  path: '/onwerInfo',
				  name: '个人信息',
				  component: onwerInfo
				},
				{
					path: '/myTenant',
					name: '我的租户',
					component: myTenant
				},
				{
					path: '/tenantCharge',
					name: '租户用电',
					component: tenantCharge
				}]
	},
    { path: '/tenantHome',
      component: tenantHome,
      redirect: '/tenantInfo',
      children: [
				{
				  path: '/tenantInfo',
				  name: '个人信息',
				  component: tenantInfo
				},
				{
					path: '/myCharge',
					name: '用电情况',
					component: myCharge
				}
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
// 	console.log('进入')
//   if (to.path === '/login' || to.path === '/register') {
//     // 是登录页面，直接进入到 要访问的登录页面
//     return next()
//   }
// 
//   // 不是登录页面
//   const token = localStorage.getItem('token')
//   console.log("token",token)
//   if (token) {
// 	  console.log('登陆过')
//     // 登录过：
//     next()
//   } else {
// 	  console.log('未登录过')
//     // 没有登录过
//     next('/login')
//   }
// })

export default router
