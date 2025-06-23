
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Cookies from 'js-cookie'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ingredientes',
      name: 'ingredientes',
      component: () => import('../views/TodosIngredientesView.vue')
    },
    // {
    //   path: '/ingredientes/tipo',
    //   name: 'tipos',
    //   component: () => import('../views/PorTipoView.vue')
    // },
    {
      path: '/ingredientes/panel',
      name: 'panel',
      component: () => import('../views/PanelIngredientesView.vue')
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import('../views/RegistroUsuarioView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginUsuarioView.vue')
    },
    
    {
      path: '/recetas',
      name: 'recetas',
      component: () => import('../views/RecetasUsuarioView.vue')
    },
    {
      path: '/listadelacompra',
      name: 'compra',
      component: () => import('../views/ListaCompraView.vue')
    },
    {
      path: '/me',
      name: 'usuario',
      component: () => import('../views/PaginaUsuarioView.vue'),
      redirect: { name: 'datosUsuario' },
      children: [
        {
          path: 'datos',
          name: 'datosUsuario',
          component: () => import('../views/usuarioLogeado/DatosLogeadoView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'recetas',
          name: 'recetasUsuario',
          component: () => import('../views/usuarioLogeado/RecetasLogeadoView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'panel',
          name: 'panelUsuario',
          component: () => import('../views/usuarioLogeado/PanelLogeadoView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'listacompra',
          name: 'compraUsuario',
          component: () => import('../views/usuarioLogeado/CompraLogeadoView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'logout',
          name: 'logout',
          component: () => import('../views/usuarioLogeado/LogoutUsuarioView.vue'),
          meta: { requiresAuth: true },
        },
      ]
    }
  ]

})

router.beforeEach((to, from, next) => {
  const authToken = Cookies.get('auth_token');

  if (to.meta.requiresAuth && !authToken) {
    next({ name: 'login' });
  } else {
    next();
  }
})

export default router
