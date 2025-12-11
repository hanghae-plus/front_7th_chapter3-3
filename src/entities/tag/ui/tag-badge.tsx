import type { Tag } from "../model/types"

interface TagBadgeProps {
  tag: Tag | string
  isSelected?: boolean
  onClick?: (tag: string) => void
}

/**
 * Tag를 배지로 렌더링합니다.
 * 클릭 시 태그 필터링을 할 수 있습니다.
 *
 * @component
 * @example
 * <TagBadge
 *   tag={tag}
 *   isSelected={selectedTag === tag.name}
 *   onClick={handleTagClick}
 * />
 */
export const TagBadge = ({ tag, isSelected = false, onClick }: TagBadgeProps) => {
  const tagName = typeof tag === "string" ? tag : tag.name
  const tagId = typeof tag === "string" ? tag : tag.id

  const handleClick = () => {
    onClick?.(tagName)
  }

  return (
    <span
      key={tagId}
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer transition-colors ${
        isSelected
          ? "text-white bg-blue-500 hover:bg-blue-600"
          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
      }`}
      onClick={handleClick}
    >
      {tagName}
    </span>
  )
}

