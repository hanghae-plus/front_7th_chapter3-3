interface PostTagProps {
  tag: string
  isSelected?: boolean
  onClick?: () => void
}

/**
 * 게시물 태그 컴포넌트
 * 태그를 표시하고 클릭 이벤트를 처리합니다.
 */
export const PostTag = ({ tag, isSelected = false, onClick }: PostTagProps) => {
  return (
    <span
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
        isSelected
          ? "text-white bg-blue-500 hover:bg-blue-600"
          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
      }`}
      onClick={onClick}
    >
      {tag}
    </span>
  )
}

