import Vue from 'vue';
import Router from 'vue-router';
import Hello from 'components/Hello';
import UEditor from 'components/ueditor/ueditor';

Vue.use(Router);

export default new Router({
  routes: [
		{
			path: '/',
			name: 'Home',
			component: Hello
		},
		{
			path: '/ueditor',
			name: 'UEditor',
			component: UEditor
		}
  ]
});
