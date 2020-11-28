import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    meta: {
      title: 'login',
      admin: false,
      requiresAuth: false
    },
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "tables" */ '../views/Login.vue')
  },
  {
    meta: {
      title: 'admin_login',
      admin: true,
      requiresAuth: false
    },
    path: '/admin/login',
    name: 'admin_login',
    component: () => import(/* webpackChunkName: "tables" */ '../views/Login.vue')
  },
  {
    meta: {
      title: 'Dashboard',
      admin: false,
      requiresAuth: true
    },
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "tables" */ '../views/Tables.vue')
  },
  {
    meta: {
      title: 'Tables',
      admin: false,
      requiresAuth: true
    },
    path: '/tables',
    name: 'tables',
    component: () => import(/* webpackChunkName: "tables" */ '../views/Tables.vue')
  },
  {
    meta: {
      title: 'Paciente',
      admin: false,
      requiresAuth: true
    },
    path: '/paciente/:id',
    name: 'paciente',
    component: () => import(/* webpackChunkName: "tables" */ '../views/Paciente.vue')
  },
  {
    meta: {
      title: 'Forms',
      admin: false,
      requiresAuth: true
    },
    path: '/forms',
    name: 'forms',
    component: () => import(/* webpackChunkName: "forms" */ '../views/Forms.vue')
  },
  {
    meta: {
      title: 'Profile',
      admin: false,
      requiresAuth: true
    },
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    meta: {
      title: 'New Client',
      admin: false,
      requiresAuth: true
    },
    path: '/client/new',
    name: 'client.new',

    component: () => import(/* webpackChunkName: "client-form" */ '../views/ClientForm.vue')
  },
  {
    meta: {
      title: 'Edit Client',
      admin: false,
      requiresAuth: true
    },
    path: '/client/:id',
    name: 'client.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/ClientForm.vue'),
    props: true
  },
  {
    meta: {
      title: 'Dashboard Admin',
      admin: true,
      requiresAuth: true
    },
    path: '/admin',
    name: 'Hospitales admin',
    component: () => import(/* webpackChunkName: "tables" */ '../views/admin/TablesHospitales.vue')
  },
  {
    meta: {
      title: 'Dashboard Admin',
      admin: true,
      requiresAuth: true
    },
    path: '/admin/doctores',
    name: 'Doctores admin',
    component: () => import(/* webpackChunkName: "tables" */ '../views/admin/TablesDoctors.vue')
  },
  {
    meta: {
      title: 'New Hospital',
      admin: true,
      requiresAuth: true
    },
    path: '/admin/hospital/new',
    name: 'hospital.new',
    component: () => import(/* webpackChunkName: "tables" */ '../views/admin/HospitalForm.vue')
  },
  {
    meta: {
      title: 'Edit Hospital',
      admin: true,
      requiresAuth: true
    },
    path: '/hospital/:id',
    name: 'hospital.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/admin/HospitalForm.vue'),
    props: true
  },
  {
    meta: {
      title: 'New Doctor',
      admin: true,
      requiresAuth: true
    },
    path: '/admin/doctor/new',
    name: 'doctor.new',
    component: () => import(/* webpackChunkName: "tables" */ '../views/admin/DoctorForm.vue')
  },
  {
    meta: {
      title: 'Edit Doctor',
      admin: true,
      requiresAuth: true
    },
    path: '/doctor/:id',
    name: 'doctor.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/admin/DoctorForm.vue'),
    props: true
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      store.dispatch('isLogged', false)
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      const admin = store.state.isAdmin
      if (to.matched.some(record => record.meta.admin)) {
        if (admin) {
          next()
        } else {
          next({ name: 'home' })
        }
      } else {
        if (admin) {
          next({ name: 'Hospitales admin' })
        } else {
          next()
        }
      }
    }
  } else {
    if (localStorage.getItem('jwt') == null) {
      store.dispatch('isLogged', false)
      next()
    } else {
      next({ name: 'home' })
    }
  }
})

export default router
