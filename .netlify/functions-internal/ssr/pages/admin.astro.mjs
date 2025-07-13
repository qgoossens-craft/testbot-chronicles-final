/* empty css                                  */
import { a as createComponent, e as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_pONdjIwT.mjs';
import 'kleur/colors';
import { g as getCollection } from '../chunks/_astro_content_DvneMNkp.mjs';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_BUH0XstR.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getCollection("blog");
  const publishedPosts = allPosts.filter((post) => !post.data.draft);
  const draftPosts = allPosts.filter((post) => post.data.draft);
  function formatDate(date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  const allTags = [...new Set(allPosts.flatMap((post) => post.data.tags || []))];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="mb-8"> <h1 class="text-3xl font-bold text-gray-900 mb-4">Blog Dashboard</h1> <div class="grid grid-cols-1 md:grid-cols-4 gap-6"> <div class="admin-card"> <div class="text-2xl font-bold text-blue-600">${publishedPosts.length}</div> <div class="text-sm text-gray-600">Published Posts</div> </div> <div class="admin-card"> <div class="text-2xl font-bold text-yellow-600">${draftPosts.length}</div> <div class="text-sm text-gray-600">Draft Posts</div> </div> <div class="admin-card"> <div class="text-2xl font-bold text-green-600">${allTags.length}</div> <div class="text-sm text-gray-600">Total Tags</div> </div> <div class="admin-card"> <div class="text-2xl font-bold text-purple-600">${allPosts.length}</div> <div class="text-sm text-gray-600">Total Posts</div> </div> </div> </div>  <div class="mb-8"> <div class="flex flex-wrap gap-4"> <a href="/admin/new-post" class="admin-button admin-button-primary"> <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
New Post
</a> <button onclick="toggleSection('drafts')" class="admin-button admin-button-secondary"> <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path> </svg>
View Drafts
</button> <a href="/admin/tags" class="admin-button admin-button-secondary"> <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path> </svg>
Manage Tags
</a> </div> </div>  <div class="mb-8"> <h2 class="text-2xl font-bold text-gray-900 mb-4">Published Posts</h2> <div class="admin-card"> ${publishedPosts.length === 0 ? renderTemplate`<div class="text-center py-8 text-gray-500"> <p>No published posts yet.</p> <a href="/admin/new-post" class="text-blue-600 hover:text-blue-700 font-medium">Create your first post</a> </div>` : renderTemplate`<div class="overflow-x-auto"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-gray-50"> <tr> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th> <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> </tr> </thead> <tbody class="bg-white divide-y divide-gray-200"> ${publishedPosts.map((post) => renderTemplate`<tr class="hover:bg-gray-50"> <td class="px-6 py-4"> <div class="text-sm font-medium text-gray-900">${post.data.title}</div> <div class="text-sm text-gray-500 truncate max-w-xs">${post.data.description}</div> </td> <td class="px-6 py-4"> <div class="flex flex-wrap gap-1"> ${post.data.tags?.slice(0, 3).map((tag) => renderTemplate`<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"> ${tag} </span>`)} ${post.data.tags && post.data.tags.length > 3 && renderTemplate`<span class="text-xs text-gray-500">+${post.data.tags.length - 3}</span>`} </div> </td> <td class="px-6 py-4 text-sm text-gray-500"> ${formatDate(post.data.pubDate)} </td> <td class="px-6 py-4 text-sm font-medium space-x-2"> <a${addAttribute(`/blog/${post.slug}`, "href")} class="text-blue-600 hover:text-blue-900">View</a> <a${addAttribute(`/admin/edit/${post.slug}`, "href")} class="text-green-600 hover:text-green-900">Edit</a> <button${addAttribute(`deletePost('${post.slug}')`, "onclick")} class="text-red-600 hover:text-red-900">Delete</button> </td> </tr>`)} </tbody> </table> </div>`} </div> </div>  <div id="drafts-section" style="display: none;" class="mb-8"> <h2 class="text-2xl font-bold text-gray-900 mb-4">Draft Posts</h2> <div class="admin-card"> ${draftPosts.length === 0 ? renderTemplate`<div class="text-center py-8 text-gray-500"> <p>No draft posts.</p> </div>` : renderTemplate`<div class="space-y-4"> ${draftPosts.map((post) => renderTemplate`<div class="border border-yellow-200 bg-yellow-50 rounded-lg p-4"> <div class="flex justify-between items-start"> <div> <h3 class="font-medium text-gray-900">${post.data.title}</h3> <p class="text-sm text-gray-600 mt-1">${post.data.description}</p> <div class="flex items-center mt-2 space-x-4"> <span class="text-xs text-gray-500">Created: ${formatDate(post.data.pubDate)}</span> ${post.data.tags && post.data.tags.length > 0 && renderTemplate`<div class="flex gap-1"> ${post.data.tags.slice(0, 3).map((tag) => renderTemplate`<span class="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">${tag}</span>`)} </div>`} </div> </div> <div class="flex space-x-2"> <a${addAttribute(`/admin/edit/${post.slug}`, "href")} class="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
Edit
</a> <button${addAttribute(`publishPost('${post.slug}')`, "onclick")} class="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
Publish
</button> </div> </div> </div>`)} </div>`} </div> </div>  <div class="mb-8"> <h2 class="text-2xl font-bold text-gray-900 mb-4">Popular Tags</h2> <div class="admin-card"> <div class="flex flex-wrap gap-2"> ${allTags.map((tag) => {
    const count = allPosts.filter((post) => post.data.tags?.includes(tag)).length;
    return renderTemplate`<span class="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"> ${tag} (${count})
</span>`;
  })} </div> </div> </div> ` })} `;
}, "C:/Users/qgoos/Desktop/TestBot-Chronicles/testbot-chronicles/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/qgoos/Desktop/TestBot-Chronicles/testbot-chronicles/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
