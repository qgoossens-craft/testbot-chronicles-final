/* empty css                                     */
import { a as createComponent, r as renderTemplate, d as defineScriptVars, e as renderComponent, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_pONdjIwT.mjs';
import 'kleur/colors';
import { g as getCollection } from '../../chunks/_astro_content_DvneMNkp.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_BUH0XstR.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const prerender = false;
const $$Tags = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getCollection("blog");
  const tagStats = /* @__PURE__ */ new Map();
  allPosts.forEach((post) => {
    (post.data.tags || []).forEach((tag) => {
      if (tagStats.has(tag)) {
        const current = tagStats.get(tag);
        tagStats.set(tag, {
          count: current.count + 1,
          posts: [...current.posts, { slug: post.slug, title: post.data.title, draft: post.data.draft }]
        });
      } else {
        tagStats.set(tag, {
          count: 1,
          posts: [{ slug: post.slug, title: post.data.title, draft: post.data.draft }]
        });
      }
    });
  });
  const sortedTags = Array.from(tagStats.entries()).sort(([, a], [, b]) => b.count - a.count);
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", "\n  function createNewTag() {\n    const input = document.getElementById('newTagInput');\n    const tagName = input.value.trim().toLowerCase().replace(/\\s+/g, '-');\n    \n    if (!tagName) {\n      alert('Please enter a tag name.');\n      return;\n    }\n    \n    if (tagData[tagName]) {\n      alert('This tag already exists.');\n      return;\n    }\n    \n    // TODO: Implement tag creation API\n    alert(`Tag \"${tagName}\" would be created.\\n\\nNote: API integration needed for actual functionality.`);\n    input.value = '';\n  }\n\n  function editTag(oldTag) {\n    const newTag = prompt(`Rename tag \"${oldTag}\" to:`, oldTag);\n    if (newTag && newTag !== oldTag) {\n      const formattedTag = newTag.trim().toLowerCase().replace(/\\s+/g, '-');\n      if (tagData[formattedTag]) {\n        alert('A tag with this name already exists.');\n        return;\n      }\n      \n      // TODO: Implement tag rename API\n      alert(`Tag \"${oldTag}\" would be renamed to \"${formattedTag}\".\\n\\nNote: API integration needed for actual functionality.`);\n    }\n  }\n\n  function deleteTag(tag) {\n    const stats = tagData[tag];\n    const confirmMessage = `Are you sure you want to delete the tag \"${tag}\"?\\n\\nThis will remove it from ${stats.count} post${stats.count !== 1 ? 's' : ''}:\\n${stats.posts.map(p => '\u2022 ' + p.title).join('\\n')}`;\n    \n    if (confirm(confirmMessage)) {\n      // TODO: Implement tag deletion API\n      alert(`Tag \"${tag}\" would be deleted from all posts.\\n\\nNote: API integration needed for actual functionality.`);\n    }\n  }\n\n  function cleanupSingleUseTags() {\n    const singleUseTags = Object.entries(tagData).filter(([,stats]) => stats.count === 1);\n    \n    if (singleUseTags.length === 0) {\n      alert('No single-use tags found.');\n      return;\n    }\n    \n    const confirmMessage = `Remove ${singleUseTags.length} single-use tags?\\n\\nTags to be removed:\\n${singleUseTags.map(([tag]) => '\u2022 ' + tag).join('\\n')}`;\n    \n    if (confirm(confirmMessage)) {\n      // TODO: Implement bulk tag cleanup API\n      alert(`${singleUseTags.length} single-use tags would be removed.\\n\\nNote: API integration needed for actual functionality.`);\n    }\n  }\n\n  function exportTags() {\n    const exportData = {\n      exportDate: new Date().toISOString(),\n      tags: Object.entries(tagData).map(([tag, stats]) => ({\n        name: tag,\n        count: stats.count,\n        posts: stats.posts.map(p => ({ slug: p.slug, title: p.title }))\n      }))\n    };\n    \n    const dataStr = JSON.stringify(exportData, null, 2);\n    const dataBlob = new Blob([dataStr], { type: 'application/json' });\n    const url = URL.createObjectURL(dataBlob);\n    \n    const link = document.createElement('a');\n    link.href = url;\n    link.download = `testbot-chronicles-tags-${new Date().toISOString().split('T')[0]}.json`;\n    document.body.appendChild(link);\n    link.click();\n    document.body.removeChild(link);\n    URL.revokeObjectURL(url);\n  }\n})();<\/script>"], ["", " <script>(function(){", "\n  function createNewTag() {\n    const input = document.getElementById('newTagInput');\n    const tagName = input.value.trim().toLowerCase().replace(/\\\\s+/g, '-');\n    \n    if (!tagName) {\n      alert('Please enter a tag name.');\n      return;\n    }\n    \n    if (tagData[tagName]) {\n      alert('This tag already exists.');\n      return;\n    }\n    \n    // TODO: Implement tag creation API\n    alert(\\`Tag \"\\${tagName}\" would be created.\\\\n\\\\nNote: API integration needed for actual functionality.\\`);\n    input.value = '';\n  }\n\n  function editTag(oldTag) {\n    const newTag = prompt(\\`Rename tag \"\\${oldTag}\" to:\\`, oldTag);\n    if (newTag && newTag !== oldTag) {\n      const formattedTag = newTag.trim().toLowerCase().replace(/\\\\s+/g, '-');\n      if (tagData[formattedTag]) {\n        alert('A tag with this name already exists.');\n        return;\n      }\n      \n      // TODO: Implement tag rename API\n      alert(\\`Tag \"\\${oldTag}\" would be renamed to \"\\${formattedTag}\".\\\\n\\\\nNote: API integration needed for actual functionality.\\`);\n    }\n  }\n\n  function deleteTag(tag) {\n    const stats = tagData[tag];\n    const confirmMessage = \\`Are you sure you want to delete the tag \"\\${tag}\"?\\\\n\\\\nThis will remove it from \\${stats.count} post\\${stats.count !== 1 ? 's' : ''}:\\\\n\\${stats.posts.map(p => '\u2022 ' + p.title).join('\\\\n')}\\`;\n    \n    if (confirm(confirmMessage)) {\n      // TODO: Implement tag deletion API\n      alert(\\`Tag \"\\${tag}\" would be deleted from all posts.\\\\n\\\\nNote: API integration needed for actual functionality.\\`);\n    }\n  }\n\n  function cleanupSingleUseTags() {\n    const singleUseTags = Object.entries(tagData).filter(([,stats]) => stats.count === 1);\n    \n    if (singleUseTags.length === 0) {\n      alert('No single-use tags found.');\n      return;\n    }\n    \n    const confirmMessage = \\`Remove \\${singleUseTags.length} single-use tags?\\\\n\\\\nTags to be removed:\\\\n\\${singleUseTags.map(([tag]) => '\u2022 ' + tag).join('\\\\n')}\\`;\n    \n    if (confirm(confirmMessage)) {\n      // TODO: Implement bulk tag cleanup API\n      alert(\\`\\${singleUseTags.length} single-use tags would be removed.\\\\n\\\\nNote: API integration needed for actual functionality.\\`);\n    }\n  }\n\n  function exportTags() {\n    const exportData = {\n      exportDate: new Date().toISOString(),\n      tags: Object.entries(tagData).map(([tag, stats]) => ({\n        name: tag,\n        count: stats.count,\n        posts: stats.posts.map(p => ({ slug: p.slug, title: p.title }))\n      }))\n    };\n    \n    const dataStr = JSON.stringify(exportData, null, 2);\n    const dataBlob = new Blob([dataStr], { type: 'application/json' });\n    const url = URL.createObjectURL(dataBlob);\n    \n    const link = document.createElement('a');\n    link.href = url;\n    link.download = \\`testbot-chronicles-tags-\\${new Date().toISOString().split('T')[0]}.json\\`;\n    document.body.appendChild(link);\n    link.click();\n    document.body.removeChild(link);\n    URL.revokeObjectURL(url);\n  }\n})();<\/script>"])), renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Tag Management" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-6"> <div class="flex items-center justify-between"> <h1 class="text-3xl font-bold text-gray-900">Tag Management</h1> <a href="/admin" class="admin-button admin-button-secondary"> <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
Back to Dashboard
</a> </div> </div>  <div class="mb-8"> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <div class="admin-card"> <div class="text-2xl font-bold text-blue-600">${sortedTags.length}</div> <div class="text-sm text-gray-600">Total Tags</div> </div> <div class="admin-card"> <div class="text-2xl font-bold text-green-600"> ${sortedTags.length > 0 ? Math.max(...sortedTags.map(([, stats]) => stats.count)) : 0} </div> <div class="text-sm text-gray-600">Most Used Tag</div> </div> <div class="admin-card"> <div class="text-2xl font-bold text-purple-600"> ${sortedTags.filter(([, stats]) => stats.count === 1).length} </div> <div class="text-sm text-gray-600">Single-Use Tags</div> </div> </div> </div>  <div class="admin-card mb-8"> <h2 class="text-xl font-semibold text-gray-900 mb-4">Create New Tag</h2> <div class="flex gap-4"> <div class="flex-1"> <input type="text" id="newTagInput" class="admin-input" placeholder="Enter new tag name..." onkeypress="if(event.key==='Enter'){createNewTag();}"> </div> <button onclick="createNewTag()" class="admin-button admin-button-primary">
Create Tag
</button> </div> <p class="text-sm text-gray-500 mt-2">
Tags will be automatically formatted (lowercase, spaces replaced with hyphens)
</p> </div>  <div class="admin-card"> <h2 class="text-xl font-semibold text-gray-900 mb-4">All Tags</h2> ${sortedTags.length === 0 ? renderTemplate`<div class="text-center py-8 text-gray-500"> <p>No tags found.</p> <p class="text-sm">Tags will appear here once you create blog posts with tags.</p> </div>` : renderTemplate`<div class="space-y-4"> ${sortedTags.map(([tag, stats]) => renderTemplate`<div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"> <div class="flex items-center justify-between mb-2"> <div class="flex items-center space-x-3"> <span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"> ${tag} </span> <span class="text-sm text-gray-500"> ${stats.count} post${stats.count !== 1 ? "s" : ""} </span> </div> <div class="flex space-x-2"> <button${addAttribute(`editTag('${tag}')`, "onclick")} class="text-sm text-blue-600 hover:text-blue-800 font-medium">
Rename
</button> <button${addAttribute(`deleteTag('${tag}')`, "onclick")} class="text-sm text-red-600 hover:text-red-800 font-medium">
Delete
</button> </div> </div> <!-- Posts using this tag --> <div class="ml-4"> <p class="text-sm font-medium text-gray-700 mb-2">Used in:</p> <div class="space-y-1"> ${stats.posts.map((post) => renderTemplate`<div class="flex items-center justify-between"> <a${addAttribute(`/blog/${post.slug}`, "href")} class="text-sm text-blue-600 hover:text-blue-800 hover:underline"> ${post.title} </a> <div class="flex items-center space-x-2"> ${post.draft && renderTemplate`<span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
Draft
</span>`} <a${addAttribute(`/admin/edit/${post.slug}`, "href")} class="text-xs text-gray-500 hover:text-gray-700">
Edit
</a> </div> </div>`)} </div> </div> </div>`)} </div>`} </div>  ${sortedTags.length > 0 && renderTemplate`<div class="admin-card mt-8"> <h2 class="text-xl font-semibold text-gray-900 mb-4">Bulk Operations</h2> <div class="space-y-4"> <div> <h3 class="font-medium text-gray-700 mb-2">Clean Up Single-Use Tags</h3> <p class="text-sm text-gray-600 mb-3">
Remove tags that are only used in one post to keep your tag system organized.
</p> <button onclick="cleanupSingleUseTags()" class="admin-button admin-button-secondary">
Remove ${sortedTags.filter(([, stats]) => stats.count === 1).length} Single-Use Tags
</button> </div> <div> <h3 class="font-medium text-gray-700 mb-2">Export Tags</h3> <p class="text-sm text-gray-600 mb-3">
Export all tags as JSON for backup or migration purposes.
</p> <button onclick="exportTags()" class="admin-button admin-button-secondary">
Export Tags as JSON
</button> </div> </div> </div>`}` }), defineScriptVars({ tagData: Object.fromEntries(tagStats) }));
}, "C:/Users/qgoos/Desktop/TestBot-Chronicles/testbot-chronicles/src/pages/admin/tags.astro", void 0);

const $$file = "C:/Users/qgoos/Desktop/TestBot-Chronicles/testbot-chronicles/src/pages/admin/tags.astro";
const $$url = "/admin/tags";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Tags,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
