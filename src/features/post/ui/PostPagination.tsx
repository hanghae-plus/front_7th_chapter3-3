import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/ui'
import { usePostStore } from '../../../entities/post'
import { usePostFilters } from '../model/usePostFilters'
import { usePostPagination } from '../model/usePostPagination'

/**
 * 게시물 페이지네이션 컴포넌트
 * 페이지 이동과 항목 수 변경을 처리합니다.
 */
export const PostPagination = () => {
  const { total } = usePostStore()
  const { skip, limit, setSkip, setLimit, syncURL } = usePostFilters()
  const { handleLimitChange, handlePrevPage, handleNextPage, canGoPrev, canGoNext, limitOptions } = usePostPagination(
    skip,
    limit,
    total,
    setSkip,
    setLimit,
    syncURL
  )

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => handleLimitChange(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            {limitOptions.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={!canGoPrev} onClick={handlePrevPage}>
          이전
        </Button>
        <Button disabled={!canGoNext} onClick={handleNextPage}>
          다음
        </Button>
      </div>
    </div>
  )
}

