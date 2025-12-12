import { Button } from "../../../shared/ui"
import { usePageNavigate } from "../lib/usePageNavigate"

const Pagination = ({ total }: { total: number }) => {
  const { skip, limit, handleNavigate } = usePageNavigate()

  const disabled = {
    prev: skip === 0,
    next: skip + limit >= total,
  }

  return (
    <div className="flex gap-2">
      <Button disabled={disabled.prev} onClick={handleNavigate.prev}>
        이전
      </Button>
      <Button disabled={disabled.next} onClick={handleNavigate.next}>
        다음
      </Button>
    </div>
  )
}

export default Pagination
