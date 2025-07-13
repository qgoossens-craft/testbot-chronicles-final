import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_B_gk8Sd9.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/edit/_slug_.astro.mjs');
const _page2 = () => import('./pages/admin/login.astro.mjs');
const _page3 = () => import('./pages/admin/new-post.astro.mjs');
const _page4 = () => import('./pages/admin/tags.astro.mjs');
const _page5 = () => import('./pages/admin.astro.mjs');
const _page6 = () => import('./pages/api/admin/login.astro.mjs');
const _page7 = () => import('./pages/api/admin/logout.astro.mjs');
const _page8 = () => import('./pages/blog.astro.mjs');
const _page9 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/edit/[slug].astro", _page1],
    ["src/pages/admin/login.astro", _page2],
    ["src/pages/admin/new-post.astro", _page3],
    ["src/pages/admin/tags.astro", _page4],
    ["src/pages/admin/index.astro", _page5],
    ["src/pages/api/admin/login.ts", _page6],
    ["src/pages/api/admin/logout.ts", _page7],
    ["src/pages/blog/index.astro", _page8],
    ["src/pages/blog/[...slug].astro", _page9],
    ["src/pages/index.astro", _page10]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "4ef2bd3e-3e7c-421c-9885-423b8498351e"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
