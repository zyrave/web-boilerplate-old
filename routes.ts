const routes: Array<any> = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/hello', name: 'Hello' },
  { path: '/tables', name: 'Tables' },
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/theme', exact: true, name: 'Theme' },
  { path: '/theme/colors', name: 'Colors' },
  { path: '/theme/typography', name: 'Typography' },
  { path: '/forms', exact: true, name: 'Forms' },
];

export default routes;
