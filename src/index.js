import HomeView from './HomeView.js';
import LoginView from './LoginView.js';
import UserView from './UserView.js';
import AppbarView from './AppbarView.js';

import {Router} from './lib/vaadin-router.js';

const outlet = document.getElementById('view');
const router = new Router(outlet);
router.setRoutes([
  {path: '/',     component: 'home-view'},
  {path: '/login',  component: 'login-view'},
  {path: '/user',  component: 'user-view'}
]);