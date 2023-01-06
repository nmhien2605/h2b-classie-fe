import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/socket',
    component: lazy(() => import('../../views/TestSocket'))
  },
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/group',
    component: lazy(() => import('../../views/groups/Group'))
  },
  {
    path: '/account-settings',
    component: lazy(() => import('../../views/account-settings'))
  },
  {
    path: '/verify-email',
    component: lazy(() => import('../../views/VerifyEmailBasic')),
    layout: 'BlankLayout',
  },
  {
    path: '/verify/:id',
    component: lazy(() => import('../../views/Success')),
    layout: 'BlankLayout',
  },
  {
    path: '/reset-password/:id',
    component: lazy(() => import('../../views/ResetPasswordBasic')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/my-slides',
    component: lazy(() => import('../../views/slides'))
  },
  {
    path: '/create-slide',
    component: lazy(() => import('../../views/createSlide/CreateSlide'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/getinfo',
    component: lazy(() => import('../../views/UserInfo')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
