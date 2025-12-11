export function TagBadge({
  tag,
  isSelected,
  onTagClick,
}: {
  tag: string
  isSelected: boolean
  onTagClick: (tag: string) => void
}) {
  return (
    <span
      key={tag}
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
        isSelected ? "text-white bg-blue-500 hover:bg-blue-600" : "text-blue-800 bg-blue-100 hover:bg-blue-200"
      }`}
      onClick={() => onTagClick(tag)}
    >
      {tag}
    </span>
  )
}
