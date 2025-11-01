'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, HomeIcon, Tag, User } from 'lucide-react';
import type { BlogPostMetadata } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPostMetadata;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* 封面图 */}
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <div className="relative w-full h-48 bg-muted">
          {post.imageUrl && post.imageUrl !== '/images/default-blog.jpg' ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
              <HomeIcon className="w-16 h-16 text-muted-foreground/30" />
            </div>
          )}
        </div>
      </Link>

      {/* 内容区域 */}
      <div className="p-6">
        {/* 分类标签 */}
        <div className="flex items-center gap-2 mb-3">
          <Link
            href={`/blog?category=${encodeURIComponent(post.category)}`}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {post.category}
          </Link>
        </div>

        {/* 标题 */}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* 摘要 */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* 元信息 */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.publishDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
