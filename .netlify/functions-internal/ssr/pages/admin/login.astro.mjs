/* empty css                                     */
import { c as createAstro, a as createComponent, f as renderHead, b as addAttribute, r as renderTemplate } from '../../chunks/astro/server_pONdjIwT.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://titusconsulting.be");
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const authCookie = Astro2.cookies.get("admin_auth");
  const isAuthenticated = authCookie?.value === "authenticated";
  return renderTemplate`<html lang="en" data-astro-cid-rf56lckb> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin Login | TestBot Chronicles</title><link rel="icon" type="image/png" href="/favicon.png">${renderHead()}</head> <body class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"${addAttribute(isAuthenticated, "data-is-authenticated")} data-astro-cid-rf56lckb> <!-- Grid pattern background --> <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\" 60\" height="\&quot;60\&quot;" xmlns="\&quot;http://www.w3.org/2000/svg\&quot;%3E%3Cdefs%3E%3Cpattern" id="\&quot;grid\&quot;" width="\&quot;60\&quot;" height="\&quot;60\&quot;" patternUnits="\&quot;userSpaceOnUse\&quot;%3E%3Cpath" d="\&quot;M" 60 0 L 0 0 0 60\" fill="\&quot;none\&quot;" stroke="\&quot;rgba(255,255,255,0.03)\&quot;" stroke-width="\&quot;1\&quot;/%3E%3C/pattern%3E%3C/defs%3E%3Crect" width="\&quot;100%25\&quot;" height="\&quot;100%25\&quot;" fill="\&quot;url(%23grid)\&quot;/%3E%3C/svg%3E')]&quot;" data-astro-cid-rf56lckb></div> <div class="relative z-10 w-full max-w-md" data-astro-cid-rf56lckb> <!-- Login Card --> <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20" data-astro-cid-rf56lckb> <!-- Header --> <div class="text-center mb-8" data-astro-cid-rf56lckb> <div class="flex justify-center mb-4" data-astro-cid-rf56lckb> <img src="/images/brand/titusLogo.png" alt="TestBot Chronicles" class="h-16 w-auto" data-astro-cid-rf56lckb> </div> <h1 class="text-2xl font-bold text-gray-900 mb-2" data-astro-cid-rf56lckb>Admin Access</h1> <p class="text-gray-600" data-astro-cid-rf56lckb>TestBot Chronicles Administration Panel</p> </div> <!-- Error Message --> <div id="error-message" class="hidden mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm" data-astro-cid-rf56lckb>
Invalid credentials. Please try again.
</div> <!-- Login Form --> <form id="login-form" class="space-y-6" data-astro-cid-rf56lckb> <div data-astro-cid-rf56lckb> <label for="username" class="block text-sm font-medium text-gray-700 mb-2" data-astro-cid-rf56lckb>
Username
</label> <input type="text" id="username" name="username" required autocomplete="username" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white" placeholder="Enter your username" data-astro-cid-rf56lckb> </div> <div data-astro-cid-rf56lckb> <label for="password" class="block text-sm font-medium text-gray-700 mb-2" data-astro-cid-rf56lckb>
Password
</label> <input type="password" id="password" name="password" required autocomplete="current-password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white" placeholder="Enter your password" data-astro-cid-rf56lckb> </div> <button type="submit" id="login-button" class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition font-medium" data-astro-cid-rf56lckb> <span id="login-text" data-astro-cid-rf56lckb>Sign In</span> <span id="login-loading" class="hidden" data-astro-cid-rf56lckb> <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-astro-cid-rf56lckb> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-astro-cid-rf56lckb></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-astro-cid-rf56lckb></path> </svg>
Signing in...
</span> </button> </form> <!-- Footer --> <div class="mt-8 text-center" data-astro-cid-rf56lckb> <a href="/" class="text-sm text-gray-500 hover:text-gray-700 transition" data-astro-cid-rf56lckb>
← Back to website
</a> </div> </div> <!-- Security Notice --> <div class="mt-6 text-center" data-astro-cid-rf56lckb> <p class="text-white/70 text-sm" data-astro-cid-rf56lckb>
🔒 This area is restricted to authorized users only
</p> </div> </div>   </body></html>`;
}, "C:/Users/qgoos/Desktop/TestBot-Chronicles/testbot-chronicles/src/pages/admin/login.astro", void 0);

const $$file = "C:/Users/qgoos/Desktop/TestBot-Chronicles/testbot-chronicles/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
