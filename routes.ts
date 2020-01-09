const routes: Array<any> = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/products', name: 'Products' },
  /** Samples menu **/
  { path: '/samples/dashboard', exact: true, name: 'Dashboard' },
  { path: '/samples/forms', exact: true, name: 'Forms' },
  { path: '/samples/tables', exact: true, name: 'Tables' },
  { path: '/samples/themes', exact: true, name: 'Themes' },
  { path: '/samples/colors', exact: true, name: 'Colors' },
];

export default routes;
