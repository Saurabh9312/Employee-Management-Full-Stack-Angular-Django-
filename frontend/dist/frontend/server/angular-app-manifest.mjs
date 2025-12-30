
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
    'index.csr.html': {size: 21222, hash: 'f951726710a69837f3dda40c5509a47663dbefb993ea967b7a1c8680e58a999d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17113, hash: 'fe53a6d0b15e0d172e27525b3d8f5fec42a54b359acf8e1d9d5415996d30dd52', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 110443, hash: 'bf06af219e6b015a2138a3c9e8eff160edeb79b6482e5300133dd881e0ec68d2', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 110443, hash: 'bf06af219e6b015a2138a3c9e8eff160edeb79b6482e5300133dd881e0ec68d2', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 108613, hash: 'f13687b1ebd236d57c239537f7a59cd476a43266cca0508490ccd342ebfab5aa', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'styles-LQC63UPC.css': {size: 231047, hash: 'NJUM3Jy/bbQ', text: () => import('./assets-chunks/styles-LQC63UPC_css.mjs').then(m => m.default)}
  },
};
