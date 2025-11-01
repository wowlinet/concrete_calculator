'use client'

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  category?: string;
}

export function Pagination({ currentPage, totalPages, basePath, category }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  // 生成页码数组
  const getPageNumbers = () => {
    const delta = 2; // 当前页左右显示的页码数量
    const pages: (number | string)[] = [];
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    // 始终显示第一页
    pages.push(1);

    // 添加省略号或页码
    if (rangeStart > 2) {
      pages.push('...');
    }

    // 添加中间页码
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // 添加省略号或最后一页
    if (rangeEnd < totalPages - 1) {
      pages.push('...');
    }

    // 始终显示最后一页（如果总页数大于1）
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  // 构建URL
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) {
      params.set('page', page.toString());
    }
    if (category) {
      params.set('category', category);
    }
    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  const pages = getPageNumbers();

  return (
    <nav className="flex justify-center items-center gap-2 mt-12" aria-label="Pagination">
      {/* 上一页按钮 */}
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-border bg-background hover:bg-muted transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      ) : (
        <button
          disabled
          className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-border bg-background opacity-50 cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* 页码按钮 */}
      <div className="flex items-center gap-2">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="inline-flex items-center justify-center w-10 h-10 text-muted-foreground"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return isActive ? (
            <span
              key={pageNum}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground font-medium"
              aria-current="page"
            >
              {pageNum}
            </span>
          ) : (
            <Link
              key={pageNum}
              href={buildUrl(pageNum)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-border bg-background hover:bg-muted transition-colors"
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* 下一页按钮 */}
      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-border bg-background hover:bg-muted transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <button
          disabled
          className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-border bg-background opacity-50 cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </nav>
  );
}
