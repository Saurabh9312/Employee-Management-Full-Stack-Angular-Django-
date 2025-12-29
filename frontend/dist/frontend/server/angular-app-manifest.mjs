
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
    'index.csr.html': {size: 21222, hash: '88022822387c91324c3107238a936cfbb33d76b806f8a91a0359fa4a75485fd6', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17113, hash: '45ff67b76a122ab5abce9adcaaa49d47996a3bcb5ec0d1e852e59bc0fabba3c1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 110443, hash: '49181b34315b7b1e40c1e998cc2863fd0a147d921231b388847f96edc9719f54', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 108613, hash: 'b5f4e888152a9d07a350214f77eabea56ed2a0399553ce63b97256c15cebd645', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 110443, hash: '49181b34315b7b1e40c1e998cc2863fd0a147d921231b388847f96edc9719f54', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'styles-LQC63UPC.css': {size: 231047, hash: 'NJUM3Jy/bbQ', text: () => import('./assets-chunks/styles-LQC63UPC_css.mjs').then(m => m.default)}
  },
};
