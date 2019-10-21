const routes: Array<any> = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/tables', name: 'Tables' },
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/theme', exact: true, name: 'Theme' },
  { path: '/theme/colors', name: 'Colors' },
  { path: '/theme/typography', name: 'Typography' },
];

export default routes;
