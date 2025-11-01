import type { Metadata } from 'next';
import { BookOpen, Filter } from 'lucide-react';
import { getPaginatedBlogPosts, getAllCategories } from '@/lib/blog';
import { BlogCard } from '@/components/blog-card';
import { Pagination } from '@/components/pagination';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | Concrete Calculator',
  description: 'Explore our blog for tips, guides, and insights on concrete calculation, construction best practices, and industry updates.',
  keywords: ['concrete blog', 'construction tips', 'concrete calculation guide', 'building materials', 'construction industry'],
  openGraph: {
    title: 'Blog | Concrete Calculator',
    description: 'Explore our blog for tips, guides, and insights on concrete calculation, construction best practices, and industry updates.',
    type: 'website',
  },
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const category = params.category;

  // 获取分页后的博客文章
  const { posts, totalPosts, totalPages, currentPage } = getPaginatedBlogPosts(
    page,
    10,
    category
  );

  // 获取所有分类
  const categories = getAllCategories();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题 */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Explore our latest articles on concrete calculation, construction tips, and industry insights.
        </p>
      </div>

      {/* 分类过滤器 */}
      {categories.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Filter by Category</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All Posts
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 文章数量统计 */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {category ? (
            <>
              Showing {posts.length} {posts.length === 1 ? 'post' : 'posts'} in{' '}
              <span className="font-medium text-foreground">{category}</span>
            </>
          ) : (
            <>
              Showing {posts.length} of {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
            </>
          )}
        </p>
      </div>

      {/* 博客文章列表 */}
      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {/* 分页 */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
            category={category}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {category
              ? `No posts found in category "${category}".`
              : 'No blog posts available yet.'}
          </p>
        </div>
      )}
    </div>
  );
}
