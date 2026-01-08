/**
 * Post Pagination Feature UI
 * 
 * 게시물 페이지네이션 컴포넌트
 */

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { usePostPagination } from "../model/use-post-pagination"

interface PostPaginationProps {
  className?: string
}

/**
 * 게시물 페이지네이션 컴포넌트
 */
export function PostPagination({ className }: PostPaginationProps) {
  const { skip, limit, total, handleNextPage, handlePrevPage, handleLimitChange } = usePostPagination()

  const currentPage = Math.floor(skip / limit) + 1
  const totalPages = Math.ceil(total / limit)

  return (
    <div className={`flex items-center justify-between ${className || ""}`}>
      <div className="flex items-center gap-2">
        <Button onClick={handlePrevPage} disabled={skip === 0}>
          이전
        </Button>
        <span className="text-sm">
          {currentPage} / {totalPages} 페이지
        </span>
        <Button onClick={handleNextPage} disabled={skip + limit >= total}>
          다음
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">페이지 크기:</span>
        <Select value={limit.toString()} onValueChange={(value) => handleLimitChange(Number(value))}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

