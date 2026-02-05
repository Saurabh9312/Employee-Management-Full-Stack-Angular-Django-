
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
    'index.csr.html': {size: 21359, hash: 'b17bc9b6065c8553ea3ed109efdea2a80c4f14a3a9d17cde3521e441eb88608f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17250, hash: 'ce80996f4626c263484e68dc5df46881d2fe7948e2610be7186398fd3fbc8224', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 110611, hash: 'c4dd6844be1778884a471034457fc5be38066db74dc2e6cab00567c8b7f6dbfa', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 112441, hash: '7a33fd391de629d8b8d25c1eb65b43aa7af3e56ddd96b5b35faaa493869ad122', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 112441, hash: '7a33fd391de629d8b8d25c1eb65b43aa7af3e56ddd96b5b35faaa493869ad122', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-LQC63UPC.css': {size: 231047, hash: 'NJUM3Jy/bbQ', text: () => import('./assets-chunks/styles-LQC63UPC_css.mjs').then(m => m.default)}
  },
};
