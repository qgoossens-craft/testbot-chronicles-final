/* empty css                                        */
import { c as createAstro, a as createComponent, r as renderTemplate, d as defineScriptVars, e as renderComponent, m as maybeRenderHead, b as addAttribute } from '../../../chunks/astro/server_pONdjIwT.mjs';
import 'kleur/colors';
import { g as getCollection } from '../../../chunks/_astro_content_DvneMNkp.mjs';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_BUH0XstR.mjs';
import fs from 'fs';
import path from 'path';
/* empty css                                        */
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://titusconsulting.be");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const allPosts = await getCollection("blog");
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) {
    return Astro2.redirect("/admin?error=post-not-found");
  }
  const existingTags = [...new Set(allPosts.flatMap((p) => p.data.tags || []))];
  const contentPath = path.join(process.cwd(), "src", "content", "blog", `${post.slug}.md`);
  let rawContent = "";
  try {
    const fileContent = fs.readFileSync(contentPath, "utf-8");
    const parts = fileContent.split("---");
    if (parts.length >= 3) {
      rawContent = parts.slice(2).join("---").trim();
    }
  } catch (error) {
    console.error("Error reading file:", error);
  }
  function formatDateForInput(date) {
    return date.toISOString().split("T")[0];
  }
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", `
  // Initialize editor state
  let selectedTags = [...postTags];
  let currentContent = '';
  let autoSaveEnabled = true;
  let saveTimeout;
  let undoHistory = [];
  let redoHistory = [];

  // Initialize when page loads
  document.addEventListener('DOMContentLoaded', function() {
    initializeEditor();
    updateTagsDisplay();
    updatePreview();
    updateStatistics();
    setupAutoSave();
    setupKeyboardShortcuts();
  });

  function initializeEditor() {
    const contentTextarea = document.getElementById('content');
    const splitTextarea = document.getElementById('split-content');
    
    // Initialize line numbers
    updateLineNumbers();
    
    // Sync content between main and split view
    contentTextarea.addEventListener('input', function() {
      splitTextarea.value = this.value;
      updatePreview();
      updateStatistics();
      updateLineNumbers();
      triggerAutoSave();
    });
    
    splitTextarea.addEventListener('input', function() {
      contentTextarea.value = this.value;
      updatePreview();
      updateStatistics();
      updateLineNumbers();
      triggerAutoSave();
    });

    // Update line numbers on scroll
    contentTextarea.addEventListener('scroll', syncLineNumbersScroll);
    splitTextarea.addEventListener('scroll', syncSplitLineNumbersScroll);

    // Title auto-save
    document.getElementById('title').addEventListener('input', function() {
      triggerAutoSave();
    });

    // Description character counter
    document.getElementById('description').addEventListener('input', function() {
      document.getElementById('desc-count').textContent = this.value.length;
      triggerAutoSave();
    });
  }

  function updateLineNumbers() {
    const content = document.getElementById('content').value;
    const lines = content.split('\\n').length;
    const lineNumbersContainer = document.getElementById('line-numbers');
    const splitLineNumbersContainer = document.getElementById('split-line-numbers');
    
    let lineNumbersHTML = '';
    for (let i = 1; i <= Math.max(lines, 20); i++) {
      lineNumbersHTML += \`<div class="leading-7">\${i}</div>\`;
    }
    
    if (lineNumbersContainer) lineNumbersContainer.innerHTML = lineNumbersHTML;
    if (splitLineNumbersContainer) splitLineNumbersContainer.innerHTML = lineNumbersHTML;
  }

  function syncLineNumbersScroll() {
    const textarea = document.getElementById('content');
    const lineNumbers = document.getElementById('line-numbers');
    if (lineNumbers) {
      lineNumbers.scrollTop = textarea.scrollTop;
    }
  }

  function syncSplitLineNumbersScroll() {
    const textarea = document.getElementById('split-content');
    const lineNumbers = document.getElementById('split-line-numbers');
    if (lineNumbers) {
      lineNumbers.scrollTop = textarea.scrollTop;
    }
  }

  // Editor mode switching
  function switchMode(mode) {
    // Update tabs
    document.querySelectorAll('.editor-tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(mode + '-tab').classList.add('active');
    
    // Update content areas
    document.querySelectorAll('.editor-mode').forEach(area => area.classList.add('hidden'));
    document.getElementById(mode + '-mode').classList.remove('hidden');
    
    if (mode === 'split') {
      // Sync content to split view
      const content = document.getElementById('content').value;
      document.getElementById('split-content').value = content;
      updateSplitPreview();
    }
  }

  // Setup event listeners for tabs
  document.getElementById('write-tab').addEventListener('click', () => switchMode('write'));
  document.getElementById('preview-tab').addEventListener('click', () => switchMode('preview'));
  document.getElementById('split-tab').addEventListener('click', () => switchMode('split'));

  // Toolbar actions
  document.querySelectorAll('.toolbar-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const action = this.dataset.action;
      handleToolbarAction(action);
    });
  });

  function handleToolbarAction(action) {
    const textarea = document.getElementById('content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let replacement = '';

    switch(action) {
      case 'bold':
        replacement = \`**\${selectedText || 'bold text'}**\`;
        break;
      case 'italic':
        replacement = \`*\${selectedText || 'italic text'}*\`;
        break;
      case 'heading':
        replacement = \`## \${selectedText || 'Heading'}\`;
        break;
      case 'link':
        replacement = \`[\${selectedText || 'link text'}](url)\`;
        break;
      case 'code':
        if (selectedText.includes('\\n')) {
          replacement = \`\\\`\\\`\\\`\\n\${selectedText}\\n\\\`\\\`\\\`\`;
        } else {
          replacement = \`\\\`\${selectedText || 'code'}\\\`\`;
        }
        break;
      case 'quote':
        replacement = \`> \${selectedText || 'quote'}\`;
        break;
    }

    if (replacement) {
      insertText(textarea, replacement, start, end);
      updatePreview();
      updateStatistics();
    }
  }

  function insertText(textarea, text, start, end) {
    const before = textarea.value.substring(0, start);
    const after = textarea.value.substring(end);
    textarea.value = before + text + after;
    
    // Set cursor position
    const newPos = start + text.length;
    textarea.setSelectionRange(newPos, newPos);
    textarea.focus();
  }

  // Preview update functions
  function updatePreview() {
    const content = document.getElementById('content').value;
    const preview = document.getElementById('preview-content');
    
    if (content.trim() === '') {
      preview.innerHTML = '<p class="text-gray-500">Start writing to see preview...</p>';
      return;
    }

    preview.innerHTML = convertMarkdownToHTML(content);
  }

  function updateSplitPreview() {
    const content = document.getElementById('split-content').value;
    const preview = document.getElementById('split-preview');
    
    if (content.trim() === '') {
      preview.innerHTML = '<p class="text-gray-500">Start writing to see preview...</p>';
      return;
    }

    preview.innerHTML = convertMarkdownToHTML(content);
  }

  function convertMarkdownToHTML(markdown) {
    if (!markdown.trim()) {
      return '<div class="text-center py-8"><p class="text-gray-400">Start typing to see your preview...</p></div>';
    }

    // Enhanced markdown to HTML conversion with better styling
    let html = markdown
      // Headers with better styling
      .replace(/^##### (.*$)/gm, '<h5 class="text-sm font-bold text-gray-700 mt-4 mb-2">$1</h5>')
      .replace(/^#### (.*$)/gm, '<h4 class="text-base font-bold text-gray-800 mt-4 mb-2">$1</h4>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-gray-900 mt-6 mb-3 border-b border-gray-200 pb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-blue-200 pb-2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-gray-900 mt-8 mb-6 border-b-2 border-blue-300 pb-3">$1</h1>')
      
      // Lists with better spacing
      .replace(/^\\* (.*$)/gm, '<li class="ml-4 mb-1">\u2022 $1</li>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">\u2022 $1</li>')
      .replace(/^\\+ (.*$)/gm, '<li class="ml-4 mb-1">\u2022 $1</li>')
      .replace(/^\\d+\\. (.*$)/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
      
      // Enhanced text formatting
      .replace(/\\*\\*\\*(.*?)\\*\\*\\*/g, '<strong class="font-bold"><em class="italic">$1</em></strong>')
      .replace(/\\*\\*(.*?)\\*\\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/\\*(.*?)\\*/g, '<em class="italic text-gray-700">$1</em>')
      .replace(/__(.*?)__/g, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/_(.*?)_/g, '<em class="italic text-gray-700">$1</em>')
      
      // Code blocks with syntax highlighting
      .replace(/\`\`\`(\\w+)?\\n([\\s\\S]*?)\`\`\`/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 border border-gray-700"><code class="text-sm font-mono">$2</code></pre>')
      
      // Inline code with better styling
      .replace(/\`(.*?)\`/g, '<code class="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono border">$1</code>')
      
      // Links with hover effects
      .replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline underline-offset-2 hover:bg-blue-50 px-1 rounded transition-colors">$1</a>')
      
      // Enhanced blockquotes
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-400 bg-blue-50 pl-4 py-2 my-4 italic text-gray-700 rounded-r">$1</blockquote>')
      
      // Horizontal rules
      .replace(/^---$/gm, '<hr class="border-t-2 border-gray-300 my-6">')
      .replace(/^\\*\\*\\*$/gm, '<hr class="border-t-2 border-gray-300 my-6">')
      
      // Tables (basic support)
      .replace(/\\|(.+)\\|/g, (match, content) => {
        const cells = content.split('|').map(cell => \`<td class="border border-gray-300 px-2 py-1">\${cell.trim()}</td>\`).join('');
        return \`<tr>\${cells}</tr>\`;
      })
      
      // Strikethrough
      .replace(/~~(.*?)~~/g, '<del class="line-through text-gray-500">$1</del>')
      
      // Paragraphs and line breaks
      .replace(/\\n\\n/g, '</p><p class="mb-4">')
      .replace(/\\n/g, '<br>');
    
    // Wrap in paragraphs and add base styling
    html = '<div class="prose-content">' + '<p class="mb-4">' + html + '</p>' + '</div>';
    
    // Clean up empty paragraphs
    html = html.replace(/<p class="mb-4"><\\/p>/g, '');
    
    return html;
  }

  // Statistics
  function updateStatistics() {
    const content = document.getElementById('content').value;
    const words = content.trim() ? content.trim().split(/\\s+/).length : 0;
    const chars = content.length;
    const readingTime = Math.ceil(words / 200); // Average reading speed

    document.getElementById('word-count').textContent = words + ' words';
    document.getElementById('char-count').textContent = chars + ' chars';
    document.getElementById('stats-words').textContent = words;
    document.getElementById('stats-chars').textContent = chars;
    document.getElementById('reading-time').textContent = readingTime + ' min';
  }

  // Tag management
  function addTag(tagName = null) {
    const input = document.getElementById('tag-input');
    const tag = tagName || input.value.trim().toLowerCase().replace(/\\s+/g, '-');
    
    if (tag && !selectedTags.includes(tag)) {
      selectedTags.push(tag);
      updateTagsDisplay();
      if (!tagName) input.value = '';
      triggerAutoSave();
    }
  }

  function removeTag(tag) {
    selectedTags = selectedTags.filter(t => t !== tag);
    updateTagsDisplay();
    triggerAutoSave();
  }

  function updateTagsDisplay() {
    const container = document.getElementById('selected-tags');
    
    if (selectedTags.length === 0) {
      container.innerHTML = '<span class="text-xs text-gray-400">No tags selected</span>';
    } else {
      container.innerHTML = selectedTags.map(tag => 
        \`<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">
          \${tag}
          <button onclick="removeTag('\${tag}')" class="ml-1 text-blue-600 hover:text-blue-800">\xD7</button>
        </span>\`
      ).join('');
    }
  }

  // Auto-save functionality
  function setupAutoSave() {
    document.getElementById('auto-save').addEventListener('change', function() {
      autoSaveEnabled = this.checked;
      updateSaveStatus(autoSaveEnabled ? 'Auto-save enabled' : 'Auto-save disabled', 'info');
    });
  }

  function triggerAutoSave() {
    if (!autoSaveEnabled) return;
    
    clearTimeout(saveTimeout);
    updateSaveStatus('Saving...', 'saving');
    
    saveTimeout = setTimeout(() => {
      savePost('draft');
    }, 2000);
  }

  function updateSaveStatus(message, type = 'default') {
    const statusText = document.getElementById('status-text');
    const statusIcon = document.getElementById('status-icon');
    
    statusText.textContent = message;
    
    // Update icon and color based on type
    statusText.className = \`text-\${type === 'success' ? 'green' : type === 'error' ? 'red' : type === 'saving' ? 'blue' : 'gray'}-600\`;
    
    if (type === 'success') {
      setTimeout(() => updateSaveStatus('Saved'), 2000);
    }
  }

  // Keyboard shortcuts
  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case 'b':
            e.preventDefault();
            handleToolbarAction('bold');
            break;
          case 'i':
            e.preventDefault();
            handleToolbarAction('italic');
            break;
          case 'k':
            e.preventDefault();
            handleToolbarAction('link');
            break;
          case 's':
            e.preventDefault();
            savePost('draft');
            break;
        }
      }
    });
  }

  // Save functions
  function savePost(action = 'draft') {
    const formData = {
      originalSlug: '{slug}',
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      content: document.getElementById('content').value,
      pubDate: document.getElementById('publish-date').value,
      updatedDate: new Date().toISOString(),
      heroImage: document.getElementById('hero-image').value,
      tags: selectedTags,
      draft: action === 'draft'
    };

    updateSaveStatus('Saving...', 'saving');
    
    // TODO: Send to API endpoint
    console.log('Saving post:', formData);
    
    // Simulate save
    setTimeout(() => {
      updateSaveStatus('Saved successfully', 'success');
      
      if (action === 'publish') {
        document.getElementById('current-status').textContent = 'Published';
        document.getElementById('current-status').className = 'text-sm font-medium text-green-600';
      }
    }, 1000);
  }

  // Button event listeners
  document.getElementById('save-draft-btn').addEventListener('click', () => savePost('draft'));
  document.getElementById('publish-btn').addEventListener('click', () => savePost('publish'));
  document.getElementById('preview-btn').addEventListener('click', () => {
    const slug = '{slug}';
    window.open(\`/blog/\${slug}\`, '_blank');
  });

  // Make functions global for onclick handlers
  window.addTag = addTag;
  window.removeTag = removeTag;
})();<\/script> `], ["", " <script>(function(){", `
  // Initialize editor state
  let selectedTags = [...postTags];
  let currentContent = '';
  let autoSaveEnabled = true;
  let saveTimeout;
  let undoHistory = [];
  let redoHistory = [];

  // Initialize when page loads
  document.addEventListener('DOMContentLoaded', function() {
    initializeEditor();
    updateTagsDisplay();
    updatePreview();
    updateStatistics();
    setupAutoSave();
    setupKeyboardShortcuts();
  });

  function initializeEditor() {
    const contentTextarea = document.getElementById('content');
    const splitTextarea = document.getElementById('split-content');
    
    // Initialize line numbers
    updateLineNumbers();
    
    // Sync content between main and split view
    contentTextarea.addEventListener('input', function() {
      splitTextarea.value = this.value;
      updatePreview();
      updateStatistics();
      updateLineNumbers();
      triggerAutoSave();
    });
    
    splitTextarea.addEventListener('input', function() {
      contentTextarea.value = this.value;
      updatePreview();
      updateStatistics();
      updateLineNumbers();
      triggerAutoSave();
    });

    // Update line numbers on scroll
    contentTextarea.addEventListener('scroll', syncLineNumbersScroll);
    splitTextarea.addEventListener('scroll', syncSplitLineNumbersScroll);

    // Title auto-save
    document.getElementById('title').addEventListener('input', function() {
      triggerAutoSave();
    });

    // Description character counter
    document.getElementById('description').addEventListener('input', function() {
      document.getElementById('desc-count').textContent = this.value.length;
      triggerAutoSave();
    });
  }

  function updateLineNumbers() {
    const content = document.getElementById('content').value;
    const lines = content.split('\\\\n').length;
    const lineNumbersContainer = document.getElementById('line-numbers');
    const splitLineNumbersContainer = document.getElementById('split-line-numbers');
    
    let lineNumbersHTML = '';
    for (let i = 1; i <= Math.max(lines, 20); i++) {
      lineNumbersHTML += \\\`<div class="leading-7">\\\${i}</div>\\\`;
    }
    
    if (lineNumbersContainer) lineNumbersContainer.innerHTML = lineNumbersHTML;
    if (splitLineNumbersContainer) splitLineNumbersContainer.innerHTML = lineNumbersHTML;
  }

  function syncLineNumbersScroll() {
    const textarea = document.getElementById('content');
    const lineNumbers = document.getElementById('line-numbers');
    if (lineNumbers) {
      lineNumbers.scrollTop = textarea.scrollTop;
    }
  }

  function syncSplitLineNumbersScroll() {
    const textarea = document.getElementById('split-content');
    const lineNumbers = document.getElementById('split-line-numbers');
    if (lineNumbers) {
      lineNumbers.scrollTop = textarea.scrollTop;
    }
  }

  // Editor mode switching
  function switchMode(mode) {
    // Update tabs
    document.querySelectorAll('.editor-tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(mode + '-tab').classList.add('active');
    
    // Update content areas
    document.querySelectorAll('.editor-mode').forEach(area => area.classList.add('hidden'));
    document.getElementById(mode + '-mode').classList.remove('hidden');
    
    if (mode === 'split') {
      // Sync content to split view
      const content = document.getElementById('content').value;
      document.getElementById('split-content').value = content;
      updateSplitPreview();
    }
  }

  // Setup event listeners for tabs
  document.getElementById('write-tab').addEventListener('click', () => switchMode('write'));
  document.getElementById('preview-tab').addEventListener('click', () => switchMode('preview'));
  document.getElementById('split-tab').addEventListener('click', () => switchMode('split'));

  // Toolbar actions
  document.querySelectorAll('.toolbar-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const action = this.dataset.action;
      handleToolbarAction(action);
    });
  });

  function handleToolbarAction(action) {
    const textarea = document.getElementById('content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let replacement = '';

    switch(action) {
      case 'bold':
        replacement = \\\`**\\\${selectedText || 'bold text'}**\\\`;
        break;
      case 'italic':
        replacement = \\\`*\\\${selectedText || 'italic text'}*\\\`;
        break;
      case 'heading':
        replacement = \\\`## \\\${selectedText || 'Heading'}\\\`;
        break;
      case 'link':
        replacement = \\\`[\\\${selectedText || 'link text'}](url)\\\`;
        break;
      case 'code':
        if (selectedText.includes('\\\\n')) {
          replacement = \\\`\\\\\\\`\\\\\\\`\\\\\\\`\\\\n\\\${selectedText}\\\\n\\\\\\\`\\\\\\\`\\\\\\\`\\\`;
        } else {
          replacement = \\\`\\\\\\\`\\\${selectedText || 'code'}\\\\\\\`\\\`;
        }
        break;
      case 'quote':
        replacement = \\\`> \\\${selectedText || 'quote'}\\\`;
        break;
    }

    if (replacement) {
      insertText(textarea, replacement, start, end);
      updatePreview();
      updateStatistics();
    }
  }

  function insertText(textarea, text, start, end) {
    const before = textarea.value.substring(0, start);
    const after = textarea.value.substring(end);
    textarea.value = before + text + after;
    
    // Set cursor position
    const newPos = start + text.length;
    textarea.setSelectionRange(newPos, newPos);
    textarea.focus();
  }

  // Preview update functions
  function updatePreview() {
    const content = document.getElementById('content').value;
    const preview = document.getElementById('preview-content');
    
    if (content.trim() === '') {
      preview.innerHTML = '<p class="text-gray-500">Start writing to see preview...</p>';
      return;
    }

    preview.innerHTML = convertMarkdownToHTML(content);
  }

  function updateSplitPreview() {
    const content = document.getElementById('split-content').value;
    const preview = document.getElementById('split-preview');
    
    if (content.trim() === '') {
      preview.innerHTML = '<p class="text-gray-500">Start writing to see preview...</p>';
      return;
    }

    preview.innerHTML = convertMarkdownToHTML(content);
  }

  function convertMarkdownToHTML(markdown) {
    if (!markdown.trim()) {
      return '<div class="text-center py-8"><p class="text-gray-400">Start typing to see your preview...</p></div>';
    }

    // Enhanced markdown to HTML conversion with better styling
    let html = markdown
      // Headers with better styling
      .replace(/^##### (.*$)/gm, '<h5 class="text-sm font-bold text-gray-700 mt-4 mb-2">$1</h5>')
      .replace(/^#### (.*$)/gm, '<h4 class="text-base font-bold text-gray-800 mt-4 mb-2">$1</h4>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-gray-900 mt-6 mb-3 border-b border-gray-200 pb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-blue-200 pb-2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-gray-900 mt-8 mb-6 border-b-2 border-blue-300 pb-3">$1</h1>')
      
      // Lists with better spacing
      .replace(/^\\\\* (.*$)/gm, '<li class="ml-4 mb-1">\u2022 $1</li>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">\u2022 $1</li>')
      .replace(/^\\\\+ (.*$)/gm, '<li class="ml-4 mb-1">\u2022 $1</li>')
      .replace(/^\\\\d+\\\\. (.*$)/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
      
      // Enhanced text formatting
      .replace(/\\\\*\\\\*\\\\*(.*?)\\\\*\\\\*\\\\*/g, '<strong class="font-bold"><em class="italic">$1</em></strong>')
      .replace(/\\\\*\\\\*(.*?)\\\\*\\\\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/\\\\*(.*?)\\\\*/g, '<em class="italic text-gray-700">$1</em>')
      .replace(/__(.*?)__/g, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/_(.*?)_/g, '<em class="italic text-gray-700">$1</em>')
      
      // Code blocks with syntax highlighting
      .replace(/\\\`\\\`\\\`(\\\\w+)?\\\\n([\\\\s\\\\S]*?)\\\`\\\`\\\`/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 border border-gray-700"><code class="text-sm font-mono">$2</code></pre>')
      
      // Inline code with better styling
      .replace(/\\\`(.*?)\\\`/g, '<code class="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono border">$1</code>')
      
      // Links with hover effects
      .replace(/\\\\[([^\\\\]]+)\\\\]\\\\(([^)]+)\\\\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline underline-offset-2 hover:bg-blue-50 px-1 rounded transition-colors">$1</a>')
      
      // Enhanced blockquotes
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-400 bg-blue-50 pl-4 py-2 my-4 italic text-gray-700 rounded-r">$1</blockquote>')
      
      // Horizontal rules
      .replace(/^---$/gm, '<hr class="border-t-2 border-gray-300 my-6">')
      .replace(/^\\\\*\\\\*\\\\*$/gm, '<hr class="border-t-2 border-gray-300 my-6">')
      
      // Tables (basic support)
      .replace(/\\\\|(.+)\\\\|/g, (match, content) => {
        const cells = content.split('|').map(cell => \\\`<td class="border border-gray-300 px-2 py-1">\\\${cell.trim()}</td>\\\`).join('');
        return \\\`<tr>\\\${cells}</tr>\\\`;
      })
      
      // Strikethrough
      .replace(/~~(.*?)~~/g, '<del class="line-through text-gray-500">$1</del>')
      
      // Paragraphs and line breaks
      .replace(/\\\\n\\\\n/g, '</p><p class="mb-4">')
      .replace(/\\\\n/g, '<br>');
    
    // Wrap in paragraphs and add base styling
    html = '<div class="prose-content">' + '<p class="mb-4">' + html + '</p>' + '</div>';
    
    // Clean up empty paragraphs
    html = html.replace(/<p class="mb-4"><\\\\/p>/g, '');
    
    return html;
  }

  // Statistics
  function updateStatistics() {
    const content = document.getElementById('content').value;
    const words = content.trim() ? content.trim().split(/\\\\s+/).length : 0;
    const chars = content.length;
    const readingTime = Math.ceil(words / 200); // Average reading speed

    document.getElementById('word-count').textContent = words + ' words';
    document.getElementById('char-count').textContent = chars + ' chars';
    document.getElementById('stats-words').textContent = words;
    document.getElementById('stats-chars').textContent = chars;
    document.getElementById('reading-time').textContent = readingTime + ' min';
  }

  // Tag management
  function addTag(tagName = null) {
    const input = document.getElementById('tag-input');
    const tag = tagName || input.value.trim().toLowerCase().replace(/\\\\s+/g, '-');
    
    if (tag && !selectedTags.includes(tag)) {
      selectedTags.push(tag);
      updateTagsDisplay();
      if (!tagName) input.value = '';
      triggerAutoSave();
    }
  }

  function removeTag(tag) {
    selectedTags = selectedTags.filter(t => t !== tag);
    updateTagsDisplay();
    triggerAutoSave();
  }

  function updateTagsDisplay() {
    const container = document.getElementById('selected-tags');
    
    if (selectedTags.length === 0) {
      container.innerHTML = '<span class="text-xs text-gray-400">No tags selected</span>';
    } else {
      container.innerHTML = selectedTags.map(tag => 
        \\\`<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">
          \\\${tag}
          <button onclick="removeTag('\\\${tag}')" class="ml-1 text-blue-600 hover:text-blue-800">\xD7</button>
        </span>\\\`
      ).join('');
    }
  }

  // Auto-save functionality
  function setupAutoSave() {
    document.getElementById('auto-save').addEventListener('change', function() {
      autoSaveEnabled = this.checked;
      updateSaveStatus(autoSaveEnabled ? 'Auto-save enabled' : 'Auto-save disabled', 'info');
    });
  }

  function triggerAutoSave() {
    if (!autoSaveEnabled) return;
    
    clearTimeout(saveTimeout);
    updateSaveStatus('Saving...', 'saving');
    
    saveTimeout = setTimeout(() => {
      savePost('draft');
    }, 2000);
  }

  function updateSaveStatus(message, type = 'default') {
    const statusText = document.getElementById('status-text');
    const statusIcon = document.getElementById('status-icon');
    
    statusText.textContent = message;
    
    // Update icon and color based on type
    statusText.className = \\\`text-\\\${type === 'success' ? 'green' : type === 'error' ? 'red' : type === 'saving' ? 'blue' : 'gray'}-600\\\`;
    
    if (type === 'success') {
      setTimeout(() => updateSaveStatus('Saved'), 2000);
    }
  }

  // Keyboard shortcuts
  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case 'b':
            e.preventDefault();
            handleToolbarAction('bold');
            break;
          case 'i':
            e.preventDefault();
            handleToolbarAction('italic');
            break;
          case 'k':
            e.preventDefault();
            handleToolbarAction('link');
            break;
          case 's':
            e.preventDefault();
            savePost('draft');
            break;
        }
      }
    });
  }

  // Save functions
  function savePost(action = 'draft') {
    const formData = {
      originalSlug: '{slug}',
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      content: document.getElementById('content').value,
      pubDate: document.getElementById('publish-date').value,
      updatedDate: new Date().toISOString(),
      heroImage: document.getElementById('hero-image').value,
      tags: selectedTags,
      draft: action === 'draft'
    };

    updateSaveStatus('Saving...', 'saving');
    
    // TODO: Send to API endpoint
    console.log('Saving post:', formData);
    
    // Simulate save
    setTimeout(() => {
      updateSaveStatus('Saved successfully', 'success');
      
      if (action === 'publish') {
        document.getElementById('current-status').textContent = 'Published';
        document.getElementById('current-status').className = 'text-sm font-medium text-green-600';
      }
    }, 1000);
  }

  // Button event listeners
  document.getElementById('save-draft-btn').addEventListener('click', () => savePost('draft'));
  document.getElementById('publish-btn').addEventListener('click', () => savePost('publish'));
  document.getElementById('preview-btn').addEventListener('click', () => {
    const slug = '{slug}';
    window.open(\\\`/blog/\\\${slug}\\\`, '_blank');
  });

  // Make functions global for onclick handlers
  window.addTag = addTag;
  window.removeTag = removeTag;
})();<\/script> `])), renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Edit: ${post.data.title}`, "data-astro-cid-nqj3w74m": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="sticky top-16 z-40 bg-white border-b-2 border-gray-300 shadow-md mb-8 -mx-8 px-8 py-4" data-astro-cid-nqj3w74m> <div class="flex items-center justify-between" data-astro-cid-nqj3w74m> <div class="flex items-center space-x-4" data-astro-cid-nqj3w74m> <a href="/admin" class="text-gray-600 hover:text-blue-600 text-sm flex items-center font-medium border border-gray-300 px-3 py-2 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all" data-astro-cid-nqj3w74m> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-astro-cid-nqj3w74m></path> </svg>
Back to Dashboard
</a> <div class="h-6 w-px bg-gray-300" data-astro-cid-nqj3w74m></div> <div class="flex items-center space-x-2" data-astro-cid-nqj3w74m> <div id="save-status" class="flex items-center text-sm bg-gray-100 px-3 py-2 rounded-lg border border-gray-300" data-astro-cid-nqj3w74m> <span id="status-text" class="text-gray-700 font-medium" data-astro-cid-nqj3w74m>Editing</span> <svg id="status-icon" class="w-4 h-4 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-astro-cid-nqj3w74m></path> </svg> </div> </div> </div> <div class="flex items-center space-x-3" data-astro-cid-nqj3w74m> <!-- Auto-save toggle --> <label class="flex items-center text-sm bg-gray-100 px-3 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50" data-astro-cid-nqj3w74m> <input type="checkbox" id="auto-save" checked class="rounded border-gray-400 text-blue-600 focus:ring-blue-500 mr-2" data-astro-cid-nqj3w74m> <span class="font-medium text-gray-700" data-astro-cid-nqj3w74m>Auto-save</span> </label> <!-- Quick actions --> <button id="preview-btn" class="text-gray-600 hover:text-blue-600 text-sm flex items-center font-medium border border-gray-300 px-3 py-2 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all" data-astro-cid-nqj3w74m> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-nqj3w74m></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-astro-cid-nqj3w74m></path> </svg>
Preview
</button> <button id="save-draft-btn" class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm font-medium shadow-md border-2 border-gray-600 hover:border-gray-700" data-astro-cid-nqj3w74m>
Save Draft
</button> <button id="publish-btn" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium shadow-md border-2 border-blue-600 hover:border-blue-700" data-astro-cid-nqj3w74m> ${post.data.draft ? "Publish Post" : "Update Post"} </button> </div> </div> </div>  <div class="grid grid-cols-1 xl:grid-cols-4 gap-8" data-astro-cid-nqj3w74m> <!-- Main Content Area --> <div class="xl:col-span-3 space-y-6" data-astro-cid-nqj3w74m> <!-- Post Title --> <div class="bg-white rounded-xl border-2 border-gray-300 shadow-lg p-6 hover:border-blue-300 transition-colors" data-astro-cid-nqj3w74m> <label class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-nqj3w74m>Post Title</label> <input type="text" id="title" name="title"${addAttribute(post.data.title, "value")} class="w-full text-3xl font-bold border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-400" placeholder="Enter your post title..." data-auto-save="title" data-astro-cid-nqj3w74m> </div> <!-- Content Editor with Tabs --> <div class="bg-white rounded-xl border-2 border-gray-300 shadow-lg overflow-hidden" data-astro-cid-nqj3w74m> <!-- Editor Tabs --> <div class="border-b-2 border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100" data-astro-cid-nqj3w74m> <nav class="flex space-x-1 px-6 py-3" aria-label="Tabs" data-astro-cid-nqj3w74m> <button id="write-tab" class="editor-tab active" data-astro-cid-nqj3w74m> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-astro-cid-nqj3w74m></path> </svg>
Write
</button> <button id="preview-tab" class="editor-tab" data-astro-cid-nqj3w74m> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-nqj3w74m></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-astro-cid-nqj3w74m></path> </svg>
Preview
</button> <button id="split-tab" class="editor-tab" data-astro-cid-nqj3w74m> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" data-astro-cid-nqj3w74m></path> </svg>
Split View
</button> </nav> </div> <!-- Editor Content --> <div class="relative" data-astro-cid-nqj3w74m> <!-- Write Mode --> <div id="write-mode" class="editor-mode active" data-astro-cid-nqj3w74m> <div class="relative" data-astro-cid-nqj3w74m> <!-- Editor Toolbar --> <div class="border-b-2 border-gray-300 px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-50" data-astro-cid-nqj3w74m> <div class="flex items-center justify-between" data-astro-cid-nqj3w74m> <div class="flex items-center space-x-2" data-astro-cid-nqj3w74m> <div class="flex items-center space-x-1 bg-white rounded-lg border border-gray-300 p-1 shadow-sm" data-astro-cid-nqj3w74m> <button class="toolbar-btn" data-action="bold" title="Bold (Ctrl+B)" data-astro-cid-nqj3w74m> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" data-astro-cid-nqj3w74m></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" data-astro-cid-nqj3w74m></path> </svg> </button> <button class="toolbar-btn" data-action="italic" title="Italic (Ctrl+I)" data-astro-cid-nqj3w74m> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 4l-2 14m4-14l-2 14" data-astro-cid-nqj3w74m></path> </svg> </button> <button class="toolbar-btn" data-action="link" title="Link (Ctrl+K)" data-astro-cid-nqj3w74m> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" data-astro-cid-nqj3w74m></path> </svg> </button> </div> <div class="flex items-center space-x-1 bg-white rounded-lg border border-gray-300 p-1 shadow-sm" data-astro-cid-nqj3w74m> <button class="toolbar-btn" data-action="heading" title="Heading" data-astro-cid-nqj3w74m> <span class="font-bold text-sm" data-astro-cid-nqj3w74m>H</span> </button> <button class="toolbar-btn" data-action="code" title="Code Block" data-astro-cid-nqj3w74m> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" data-astro-cid-nqj3w74m></path> </svg> </button> <button class="toolbar-btn" data-action="quote" title="Quote" data-astro-cid-nqj3w74m> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" data-astro-cid-nqj3w74m></path> </svg> </button> </div> <div class="flex items-center space-x-1 bg-white rounded-lg border border-gray-300 p-1 shadow-sm" data-astro-cid-nqj3w74m> <button class="toolbar-btn" data-action="undo" title="Undo (Ctrl+Z)" data-astro-cid-nqj3w74m> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" data-astro-cid-nqj3w74m></path> </svg> </button> <button class="toolbar-btn" data-action="redo" title="Redo (Ctrl+Y)" data-astro-cid-nqj3w74m> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" data-astro-cid-nqj3w74m></path> </svg> </button> </div> </div> <div class="bg-white px-3 py-2 rounded-lg border border-gray-300 shadow-sm" data-astro-cid-nqj3w74m> <div class="text-xs font-medium text-gray-600" data-astro-cid-nqj3w74m> <span id="word-count" data-astro-cid-nqj3w74m>0 words</span> • <span id="char-count" data-astro-cid-nqj3w74m>0 chars</span> </div> </div> </div> </div> <!-- Text Editor --> <div class="relative" data-astro-cid-nqj3w74m> <textarea id="content" name="content" class="w-full h-96 pl-16 pr-6 py-6 border-2 border-gray-200 border-t-0 outline-none resize-none font-mono text-base leading-7 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all bg-gradient-to-br from-white to-gray-50 text-gray-800" placeholder="# Your Amazing Post Title

Start writing your markdown content here...

## Tips for great content:
- Use **bold** and *italic* text for emphasis
- Add [links](https://example.com) to external resources
- Include \`code snippets\` for technical content
- Create > blockquotes for important notes

Happy writing! 🚀" data-auto-save="content" spellcheck="true" data-astro-cid-nqj3w74m>${rawContent}</textarea> <!-- Line numbers overlay --> <div id="line-numbers" class="absolute left-0 top-0 w-12 h-96 bg-gray-100 border-r-2 border-gray-300 text-xs text-gray-500 font-mono pt-6 pl-2 pointer-events-none select-none overflow-hidden" data-astro-cid-nqj3w74m> <!-- Line numbers will be generated by JavaScript --> </div> </div> </div> </div> <!-- Preview Mode --> <div id="preview-mode" class="editor-mode hidden" data-astro-cid-nqj3w74m> <div class="relative" data-astro-cid-nqj3w74m> <!-- Preview Header --> <div class="border-b-2 border-gray-300 px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50" data-astro-cid-nqj3w74m> <div class="flex items-center justify-between" data-astro-cid-nqj3w74m> <div class="flex items-center" data-astro-cid-nqj3w74m> <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-nqj3w74m></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-astro-cid-nqj3w74m></path> </svg> <span class="font-bold text-green-700" data-astro-cid-nqj3w74m>Live Preview</span> </div> <div class="bg-white px-3 py-1 rounded-lg border-2 border-green-200 shadow-sm" data-astro-cid-nqj3w74m> <span class="text-xs font-medium text-green-700" data-astro-cid-nqj3w74m>Real-time rendering</span> </div> </div> </div> <!-- Preview Content --> <div id="preview-content" class="p-8 prose prose-lg max-w-none min-h-96 border-2 border-gray-200 border-t-0 bg-gradient-to-br from-white via-gray-50 to-white" data-astro-cid-nqj3w74m> <div class="text-center py-16" data-astro-cid-nqj3w74m> <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-nqj3w74m></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-astro-cid-nqj3w74m></path> </svg> <p class="text-xl text-gray-400 font-medium" data-astro-cid-nqj3w74m>Your preview will appear here</p> <p class="text-gray-400 mt-2" data-astro-cid-nqj3w74m>Start typing in the editor to see live markdown rendering</p> </div> </div> </div> </div> <!-- Split Mode --> <div id="split-mode" class="editor-mode hidden" data-astro-cid-nqj3w74m> <div class="grid grid-cols-2 divide-x-2 divide-gray-400 border-2 border-gray-200 border-t-0 min-h-96" data-astro-cid-nqj3w74m> <!-- Editor Side --> <div class="relative bg-gradient-to-br from-slate-50 to-blue-50" data-astro-cid-nqj3w74m> <div class="border-b-2 border-gray-300 px-4 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 sticky top-0 z-10" data-astro-cid-nqj3w74m> <div class="flex items-center justify-between" data-astro-cid-nqj3w74m> <div class="flex items-center" data-astro-cid-nqj3w74m> <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-astro-cid-nqj3w74m></path> </svg> <span class="font-bold text-blue-700" data-astro-cid-nqj3w74m>Markdown Editor</span> </div> <div class="bg-white px-2 py-1 rounded border border-blue-200 shadow-sm" data-astro-cid-nqj3w74m> <span class="text-xs font-medium text-blue-600" data-astro-cid-nqj3w74m>Raw Text</span> </div> </div> </div> <div class="relative" data-astro-cid-nqj3w74m> <textarea id="split-content" class="w-full h-96 pl-16 pr-4 py-4 border-none outline-none resize-none font-mono text-sm leading-6 focus:ring-4 focus:ring-blue-100 transition-all bg-transparent text-gray-800" placeholder="Start typing your markdown here...

# Heading 1
## Heading 2

**Bold text** and *italic text*

- List item 1
- List item 2

> Blockquote for important notes

\`\`\`javascript
// Code block example
console.log('Hello World!');
\`\`\`" data-auto-save="content" spellcheck="true" data-astro-cid-nqj3w74m>${rawContent}</textarea> <!-- Line numbers for split view --> <div id="split-line-numbers" class="absolute left-0 top-0 w-14 h-96 bg-blue-100 border-r border-blue-200 text-xs text-blue-600 font-mono pt-4 pl-2 pointer-events-none select-none overflow-hidden" data-astro-cid-nqj3w74m> <!-- Line numbers will be generated by JavaScript --> </div> </div> </div> <!-- Preview Side --> <div class="relative bg-gradient-to-br from-white to-emerald-50" data-astro-cid-nqj3w74m> <div class="border-b-2 border-gray-300 px-4 py-3 bg-gradient-to-r from-emerald-100 to-green-100 sticky top-0 z-10" data-astro-cid-nqj3w74m> <div class="flex items-center justify-between" data-astro-cid-nqj3w74m> <div class="flex items-center" data-astro-cid-nqj3w74m> <svg class="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-nqj3w74m></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-astro-cid-nqj3w74m></path> </svg> <span class="font-bold text-emerald-700" data-astro-cid-nqj3w74m>Live Preview</span> </div> <div class="bg-white px-2 py-1 rounded border border-emerald-200 shadow-sm" data-astro-cid-nqj3w74m> <span class="text-xs font-medium text-emerald-600" data-astro-cid-nqj3w74m>Rendered</span> </div> </div> </div> <div id="split-preview" class="p-6 prose prose-sm max-w-none h-96 overflow-y-auto bg-white/80 backdrop-blur-sm" data-astro-cid-nqj3w74m> <div class="text-center py-8" data-astro-cid-nqj3w74m> <svg class="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-nqj3w74m></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-astro-cid-nqj3w74m></path> </svg> <p class="text-gray-400 font-medium" data-astro-cid-nqj3w74m>Preview appears here</p> <p class="text-xs text-gray-400 mt-1" data-astro-cid-nqj3w74m>Real-time markdown rendering</p> </div> </div> </div> </div> </div> </div> </div> </div> <!-- Sidebar --> <div class="xl:col-span-1 space-y-6" data-astro-cid-nqj3w74m> <!-- Publish Status --> <div class="bg-white rounded-xl border-2 border-gray-300 shadow-lg p-6 hover:border-green-300 transition-colors" data-astro-cid-nqj3w74m> <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center border-b-2 border-gray-200 pb-2" data-astro-cid-nqj3w74m> <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-nqj3w74m></path> </svg>
Publish Status
</h3> <div class="space-y-4" data-astro-cid-nqj3w74m> <div class="bg-gray-50 p-3 rounded-lg border border-gray-200" data-astro-cid-nqj3w74m> <div class="flex items-center justify-between" data-astro-cid-nqj3w74m> <span class="text-sm font-medium text-gray-700" data-astro-cid-nqj3w74m>Status:</span> <span id="current-status"${addAttribute(`text-sm font-bold px-2 py-1 rounded ${post.data.draft ? "text-yellow-700 bg-yellow-100" : "text-green-700 bg-green-100"}`, "class")} data-astro-cid-nqj3w74m> ${post.data.draft ? "Draft" : "Published"} </span> </div> </div> <div class="bg-gray-50 p-3 rounded-lg border border-gray-200" data-astro-cid-nqj3w74m> <div class="flex items-center justify-between" data-astro-cid-nqj3w74m> <span class="text-sm font-medium text-gray-700" data-astro-cid-nqj3w74m>Visibility:</span> <select id="visibility" class="text-sm border-2 border-gray-300 rounded-lg px-2 py-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" data-astro-cid-nqj3w74m> <option value="public" data-astro-cid-nqj3w74m>Public</option> <option value="private" data-astro-cid-nqj3w74m>Private</option> </select> </div> </div> <div class="bg-gray-50 p-3 rounded-lg border border-gray-200" data-astro-cid-nqj3w74m> <label class="block text-sm font-medium text-gray-700 mb-2" data-astro-cid-nqj3w74m>Publish Date:</label> <input type="datetime-local" id="publish-date"${addAttribute(post.data.pubDate.toISOString().slice(0, 16), "value")} class="w-full text-sm border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" data-auto-save="pubDate" data-astro-cid-nqj3w74m> </div> ${post.data.updatedDate && renderTemplate`<div class="bg-gray-50 p-3 rounded-lg border border-gray-200" data-astro-cid-nqj3w74m> <label class="block text-sm font-medium text-gray-700 mb-2" data-astro-cid-nqj3w74m>Last Updated:</label> <input type="datetime-local" id="updated-date"${addAttribute(post.data.updatedDate.toISOString().slice(0, 16), "value")} class="w-full text-sm border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" data-auto-save="updatedDate" data-astro-cid-nqj3w74m> </div>`} </div> </div> <!-- SEO & Meta --> <div class="bg-white rounded-xl border-2 border-gray-300 shadow-lg p-6 hover:border-purple-300 transition-colors" data-astro-cid-nqj3w74m> <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center border-b-2 border-gray-200 pb-2" data-astro-cid-nqj3w74m> <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-astro-cid-nqj3w74m></path> </svg>
SEO & Meta
</h3> <div class="space-y-4" data-astro-cid-nqj3w74m> <div class="bg-gray-50 p-4 rounded-lg border border-gray-200" data-astro-cid-nqj3w74m> <label class="block text-sm font-medium text-gray-700 mb-2" data-astro-cid-nqj3w74m>Meta Description:</label> <textarea id="description" rows="3" maxlength="160" class="w-full text-sm border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none" placeholder="Brief description for search engines..." data-auto-save="description" data-astro-cid-nqj3w74m>${post.data.description}</textarea> <div class="text-xs font-medium text-gray-500 mt-2 flex justify-between" data-astro-cid-nqj3w74m> <span data-astro-cid-nqj3w74m>Search engines will use this in results</span> <span id="desc-count" class="bg-white px-2 py-1 rounded border" data-astro-cid-nqj3w74m>${post.data.description?.length || 0}/160</span> </div> </div> <div class="bg-gray-50 p-4 rounded-lg border border-gray-200" data-astro-cid-nqj3w74m> <label class="block text-sm font-medium text-gray-700 mb-2" data-astro-cid-nqj3w74m>Featured Image URL:</label> <input type="url" id="hero-image"${addAttribute(post.data.heroImage || "", "value")} class="w-full text-sm border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200" placeholder="https://example.com/image.jpg" data-auto-save="heroImage" data-astro-cid-nqj3w74m> <div class="text-xs text-gray-500 mt-1" data-astro-cid-nqj3w74m>Used for social media previews and blog listing</div> </div> </div> </div> <!-- Tags --> <div class="bg-white rounded-xl border-2 border-gray-300 shadow-lg p-6 hover:border-blue-300 transition-colors" data-astro-cid-nqj3w74m> <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center border-b-2 border-gray-200 pb-2" data-astro-cid-nqj3w74m> <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" data-astro-cid-nqj3w74m></path> </svg>
Tags
</h3> <div class="space-y-4" data-astro-cid-nqj3w74m> <!-- Tag Input --> <div class="bg-gray-50 p-4 rounded-lg border border-gray-200" data-astro-cid-nqj3w74m> <div class="flex" data-astro-cid-nqj3w74m> <input type="text" id="tag-input" class="flex-1 text-sm border-2 border-gray-300 rounded-l-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Add a tag..." onkeypress="if(event.key==='Enter'){event.preventDefault();addTag();}" data-astro-cid-nqj3w74m> <button onclick="addTag()" class="bg-blue-600 text-white px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-blue-700 border-2 border-blue-600 hover:border-blue-700 transition-all" data-astro-cid-nqj3w74m>
Add
</button> </div> </div> <!-- Popular Tags --> ${existingTags.length > 0 && renderTemplate`<div class="bg-gray-50 p-4 rounded-lg border border-gray-200" data-astro-cid-nqj3w74m> <div class="text-sm font-medium text-gray-700 mb-3 flex items-center" data-astro-cid-nqj3w74m> <svg class="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-astro-cid-nqj3w74m></path> </svg>
Popular tags:
</div> <div class="flex flex-wrap gap-2" data-astro-cid-nqj3w74m> ${existingTags.slice(0, 10).map((tag) => renderTemplate`<button${addAttribute(`addTag('${tag}')`, "onclick")} class="text-xs bg-white border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-3 py-1 rounded-lg transition-all font-medium shadow-sm" data-astro-cid-nqj3w74m>
#${tag} </button>`)} </div> </div>`} <!-- Selected Tags --> <div class="bg-gray-50 p-4 rounded-lg border border-gray-200" data-astro-cid-nqj3w74m> <div class="text-sm font-medium text-gray-700 mb-3" data-astro-cid-nqj3w74m>Selected tags:</div> <div id="selected-tags" class="min-h-12 border-2 border-gray-300 rounded-lg p-3 bg-white" data-astro-cid-nqj3w74m> <span class="text-sm text-gray-400" data-astro-cid-nqj3w74m>No tags selected</span> </div> </div> </div> </div> <!-- Post Statistics --> <div class="bg-white rounded-xl border-2 border-gray-300 shadow-lg p-6 hover:border-orange-300 transition-colors" data-astro-cid-nqj3w74m> <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center border-b-2 border-gray-200 pb-2" data-astro-cid-nqj3w74m> <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nqj3w74m> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-astro-cid-nqj3w74m></path> </svg>
Statistics
</h3> <div class="grid grid-cols-2 gap-3 text-sm" data-astro-cid-nqj3w74m> <div class="bg-gray-50 p-3 rounded-lg border border-gray-200" data-astro-cid-nqj3w74m> <div class="text-gray-600 text-xs font-medium mb-1" data-astro-cid-nqj3w74m>Words</div> <div id="stats-words" class="text-lg font-bold text-gray-900" data-astro-cid-nqj3w74m>0</div> </div> <div class="bg-gray-50 p-3 rounded-lg border border-gray-200" data-astro-cid-nqj3w74m> <div class="text-gray-600 text-xs font-medium mb-1" data-astro-cid-nqj3w74m>Characters</div> <div id="stats-chars" class="text-lg font-bold text-gray-900" data-astro-cid-nqj3w74m>0</div> </div> <div class="bg-gray-50 p-3 rounded-lg border border-gray-200" data-astro-cid-nqj3w74m> <div class="text-gray-600 text-xs font-medium mb-1" data-astro-cid-nqj3w74m>Reading time</div> <div id="reading-time" class="text-lg font-bold text-orange-600" data-astro-cid-nqj3w74m>0 min</div> </div> <div class="bg-gray-50 p-3 rounded-lg border border-gray-200" data-astro-cid-nqj3w74m> <div class="text-gray-600 text-xs font-medium mb-1" data-astro-cid-nqj3w74m>Created</div> <div class="text-sm font-bold text-gray-900" data-astro-cid-nqj3w74m>${formatDateForInput(post.data.pubDate)}</div> </div> </div> </div> </div> </div> ` }), defineScriptVars({ postTags: post.data.tags || [] }));
}, "C:/Users/qgoos/Desktop/TestBot-Chronicles/testbot-chronicles/src/pages/admin/edit/[slug].astro", void 0);

const $$file = "C:/Users/qgoos/Desktop/TestBot-Chronicles/testbot-chronicles/src/pages/admin/edit/[slug].astro";
const $$url = "/admin/edit/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
