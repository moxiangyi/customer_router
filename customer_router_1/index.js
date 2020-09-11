import Router from './router';

window.router = new Router(
  'view', {
    routes: [{
        path: '/a',
        component: '<p>aaaaaa</p>',
      },
      {
        path: '/b',
        component: '<p>bbbbbb</p>',
      },
      {
        path: '/c',
        component: '<p>cccccc</p>',
      },
      {
        path: '/a',
        component: '<p>aaaaaa</p>',
      },
    ],
  },
  'hash'
); //或者history
