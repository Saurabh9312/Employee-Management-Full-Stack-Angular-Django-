
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 1,
    "route": "/list"
  },
  {
    "renderMode": 1,
    "route": "/employees/add"
  },
  {
    "renderMode": 1,
    "route": "/employees/view/*"
  },
  {
    "renderMode": 1,
    "route": "/employees/edit/*"
  },
  {
    "renderMode": 1,
    "route": "/employees/delete/*"
  },
  {
    "renderMode": 2,
    "route": "/signup"
  },
  {
    "renderMode": 2,
    "route": "/login"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 21222, hash: '6e75d98dcdc76e563b93b45e18acebf19ead314fd8ad51577fd057aabf21b8f4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17113, hash: '278350affb1afc9b4b653f713cb29a0733d6a7df26e936b12a14535ea515769f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 110443, hash: 'f03f9ba0ba1b20904c367cf8eb1e8614ad764ae9f66598bc0f092c1e116bfa45', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 108613, hash: 'fd65faaf487b2905d75ed9c3a24b3f363c8d4b8413d4f1d851015b3d189542e7', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 110443, hash: 'f03f9ba0ba1b20904c367cf8eb1e8614ad764ae9f66598bc0f092c1e116bfa45', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'styles-LQC63UPC.css': {size: 231047, hash: 'NJUM3Jy/bbQ', text: () => import('./assets-chunks/styles-LQC63UPC_css.mjs').then(m => m.default)}
  },
};
