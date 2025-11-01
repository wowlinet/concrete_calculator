import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 博客文章的元数据接口
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishDate: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  imageUrl: string;
  content: string;
}

// 博客文章的前置元数据（不包含content）
export type BlogPostMetadata = Omit<BlogPost, 'content'>;

// 博客目录路径
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * 获取所有博客文章的元数据
 */
export function getAllBlogPosts(): BlogPostMetadata[] {
  // 确保博客目录存在
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);

  const posts = files
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx?$/, '');
      const filePath = path.join(BLOG_DIR, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: data.slug || slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        category: data.category || 'Uncategorized',
        author: data.author || 'Anonymous',
        publishDate: data.publishDate || '',
        publishedAt: data.publishedAt || '',
        readTime: data.readTime || 5,
        tags: data.tags || [],
        imageUrl: data.imageUrl || '/images/default-blog.jpg',
      } as BlogPostMetadata;
    })
    .sort((a, b) => {
      // 按发布日期降序排序
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  return posts;
}

/**
 * 根据slug获取单个博客文章
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) {
    return null;
  }

  const files = fs.readdirSync(BLOG_DIR);
  const file = files.find(f => {
    const fileSlug = f.replace(/\.mdx?$/, '');
    return fileSlug.endsWith(`-${slug}`) || fileSlug === slug;
  });

  if (!file) {
    return null;
  }

  const filePath = path.join(BLOG_DIR, file);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: data.slug || slug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    category: data.category || 'Uncategorized',
    author: data.author || 'Anonymous',
    publishDate: data.publishDate || '',
    publishedAt: data.publishedAt || '',
    readTime: data.readTime || 5,
    tags: data.tags || [],
    imageUrl: data.imageUrl || '/images/default-blog.jpg',
    content,
  };
}

/**
 * 获取所有分类
 */
export function getAllCategories(): string[] {
  const posts = getAllBlogPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories).sort();
}

/**
 * 根据分类过滤博客文章
 */
export function getBlogPostsByCategory(category: string): BlogPostMetadata[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter(post => post.category === category);
}

/**
 * 获取分页后的博客文章
 */
export function getPaginatedBlogPosts(
  page: number = 1,
  pageSize: number = 10,
  category?: string
): {
  posts: BlogPostMetadata[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
} {
  let allPosts = getAllBlogPosts();

  // 如果指定了分类，则过滤
  if (category) {
    allPosts = allPosts.filter(post => post.category === category);
  }

  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPosts,
    totalPages,
    currentPage,
  };
}
