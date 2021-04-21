import './HomeView.js';
import './LoginView.js';
import './UserView.js';
import './AppbarView.js';
import './RegistrationView.js';
import './AdminView.js';
import './MessageView.js';

import {Router} from './lib/vaadin-router.js';

const outlet = document.getElementById('view');
const router = new Router(outlet);
router.setRoutes([
  {path: '/',     component: 'home-view'},
  {path: '/login',  component: 'login-view'},
  {path: '/user',  component: 'user-view'},
  {path: '/admin',  component: 'admin-view'},
  {path: '/registration',  component: 'registration-view'}
]);