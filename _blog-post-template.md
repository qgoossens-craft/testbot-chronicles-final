# Blog Post Template

Copy this template when creating new blog posts manually.

## File Location
Save as: `src/content/blog/your-post-slug.md`

## Template Content

```markdown
---
title: 'Your Post Title Here'
description: 'A brief description of your post (used for SEO and previews)'
pubDate: 2024-01-30
updatedDate: 2024-01-30  # Optional - only add if you update the post
heroImage: '/images/blog/your-image.jpg'  # Optional - blog post header image
tags: ['tag1', 'tag2', 'tag3']  # Add relevant tags
draft: false  # Set to true to hide from published posts
---

# Your Post Title Here

Your introduction paragraph goes here. This should hook the reader and explain what they'll learn.

## Main Section

Your content here. You can use:

- **Bold text**
- *Italic text*
- `inline code`
- [Links](https://example.com)

### Subsection

More content...

## Code Examples

```javascript
// JavaScript code example
function testExample() {
  console.log('Hello from TestBot Chronicles!');
}
```

```bash
# Bash command examples
npm install playwright
npx playwright test
```

## Lists

### Unordered Lists
- First item
- Second item
- Third item

### Ordered Lists
1. First step
2. Second step
3. Third step

## Tables

| Feature | Tool A | Tool B |
|---------|--------|--------|
| Speed | Fast | Slow |
| Setup | Easy | Hard |

## Blockquotes

> Important insight or quote goes here.
> This is useful for highlighting key takeaways.

## Images

### Simple Images (Copy directly from Obsidian)
```markdown
![Alt text](/images/your-image.jpg)
```

### Simple Images
Just use standard markdown syntax with images in `/public/images/`:
```markdown
![Alt text](/images/your-image.jpg)
```

### Advanced Styling (Optional)
For centered or styled images, use HTML directly in your markdown:

```html
<div class="text-center my-8">
  <img src="/images/your-image.jpg" alt="Description" class="mx-auto max-w-md rounded-lg shadow-lg" />
</div>
```

**Important:** 
- Always place images in `/public/images/` folder
- Use `/images/filename.ext` format in markdown
- The conversion script handles Obsidian `![[image.png]]` syntax automatically

## Final Thoughts

Wrap up your post with key takeaways and next steps.

---

*What are your thoughts on this topic? Feel free to reach out and share your experiences!*
```

## Notes

- File name becomes the URL slug (e.g., `my-post.md` → `/blog/my-post`)
- All frontmatter fields except `title`, `description`, and `pubDate` are optional
- Tags should be lowercase with hyphens instead of spaces
- Set `draft: true` to hide posts from the public site
- Use standard Markdown syntax for content
- Code blocks support syntax highlighting