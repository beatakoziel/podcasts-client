import Home from "./Home.vue"
import Login from "./Login.vue"
import Register from "./Register.vue"
import ShoppingCart from "./ShoppingCart.vue"
import AdminPanel from "./AdminPanel.vue"

export const routes = [{
  path: '',
  component: Home
},
{
  path: '/home',
  component: Home
},
{
  path: '/login',
  component: Login
},
{
  path: '/register',
  component: Register
},
{
  path: '/admin-panel',
  component: AdminPanel
},
{
  path: '/cart',
  component: ShoppingCart
}
];
