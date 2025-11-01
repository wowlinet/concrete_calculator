import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag, User, ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog';
import { serializeMDX } from '@/lib/mdx';
import { MDXContent } from '@/components/mdx-content';
import { ShareButton } from '@/components/share-button';
import 'highlight.js/styles/github-dark.css';

// 禁用静态生成，使用动态渲染
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// 生成元数据
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Blog | Concrete Calculator`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.imageUrl ? [{ url: post.imageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // 序列化MDX内容
  const mdxSource = await serializeMDX(post.content);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* 返回按钮 */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* 文章头部 */}
        <article>
          {/* 分类标签 */}
          <div className="mb-4">
            <Link
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {post.category}
            </Link>
          </div>

          {/* 标题 */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {post.title}
          </h1>

          {/* 摘要 */}
          <p className="text-xl text-muted-foreground mb-8">
            {post.excerpt}
          </p>

          {/* 元信息 */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="font-medium text-foreground">{post.author}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{post.publishDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* 封面图 */}
          {post.imageUrl && post.imageUrl !== '/images/default-blog.jpg' && (
            <div className="mb-8 rounded-lg overflow-hidden relative w-full h-96">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* 文章内容 */}
          <div className="prose prose-lg max-w-none mb-12">
            <MDXContent source={mdxSource} />
          </div>

          {/* 标签 */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-8 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm bg-muted text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 分享按钮 */}
          <ShareButton title={post.title} excerpt={post.excerpt} />
        </article>

        {/* 返回博客列表 */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
