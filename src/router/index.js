import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '../pages/auth/AuthLayout'
import AppLayout from '../components/admin/AppLayout'
import VueSession from 'vue-session'

Vue.use(Router)
Vue.use(VueSession)
const EmptyParentComponent = {
  template: '<router-view></router-view>',
}

const demoRoutes = []

export const serverBus = new Vue()

export default new Router({
  mode: 'history',
  routes: [
    ...demoRoutes,
    {
      path: '*',
      redirect: { name: 'login' },
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: () => import('../components/auth/login/Login.vue'),
        },
        {
          path: '',
          redirect: { name: 'login' },
        },
      ],
    },
    {
      path: '/404',
      component: EmptyParentComponent,
      children: [
        {
          name: 'not-found-advanced',
          path: 'not-found-advanced',
          component: () => import('../components/pages/404-pages/VaPageNotFoundSearch.vue'),
        },
        {
          name: 'not-found-simple',
          path: 'not-found-simple',
          component: () => import('../components/pages/404-pages/VaPageNotFoundSimple.vue'),
        },
        {
          name: 'not-found-custom',
          path: 'not-found-custom',
          component: () => import('../components/pages/404-pages/VaPageNotFoundCustom.vue'),
        },
        {
          name: 'not-found-large-text',
          path: '/pages/not-found-large-text',
          component: () => import('../components/pages/404-pages/VaPageNotFoundLargeText.vue'),
        },
      ],
    },
    {
      name: 'Admin',
      path: '/admin',
      component: AppLayout,
      children: [
        {
          name: 'dashboardAdmin',
          path: 'dashboard',
          component: () => import('@/pages/dashboard/DashboardAdmin.vue'),
          default: true,
        },
        {
          name: 'Administration',
          path: 'Administration',
          component: EmptyParentComponent,
          children: [
            {
              name: 'Role Management',
              path: 'RoleManagement',
              component: () => import('../pages/master/MasterRole.vue'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Charts',
              },
            },
            {
              name: 'User Management',
              path: 'UserManagement',
              component: () => import('../pages/master/MasterUser.vue'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
              },
            },
            {
              name: 'Resp Management',
              path: 'RespManagement',
              component: () => import('../pages/master/MasterResponsibility.vue'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
              },
            },
            {
              name: 'Branch Management',
              path: 'BranchManagement',
              component: () => import('../pages/master/MasterBranch.vue'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
              },
            },
            {
              name: 'User Management',
              path: 'UserManagement',
              component: () => import('../pages/master/MasterUser.vue'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
              },
            },
            {
              name: 'Company Management',
              path: 'CompanyManagement',
              component: () => import('../pages/master/MasterCompany.vue'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
              },
            },
            {
              name: 'Menu Management',
              path: 'MenuManagement',
              component: () => import('../pages/master/MasterMenu.vue'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'User',
      path: '/user',
      component: AppLayout,
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('../components/dashboard/Dashboard.vue'),
          default: true,
        },
        {
          name: 'Transaction',
          path: 'Transaction',
          component: EmptyParentComponent,
          children: [
            {
              name: 'P3AT Inquiry',
              path: 'P3ATInquiry',
              component: () => import('../pages/P3AT/Inquiry_p3at.vue'),
              // component: () => import('../pages/P3AT/transaction/Inquiry_p3at.vue'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
              },
            },
            {
              name: 'P3AT Approval',
              path: 'P3ATApproval',
              component: () => import('../pages/P3AT/Approval_p3at.vue'),
              // component: () => import('../pages/P3AT/transaction/Approval_p3at.vue'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
              },
            },

          ],
        },
      ],
    },
  ],
})
