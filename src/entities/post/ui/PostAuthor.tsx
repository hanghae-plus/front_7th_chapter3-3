import type { PostAuthor as PostAuthorType } from '../model/types'

interface PostAuthorProps {
  author: PostAuthorType
  onClick?: () => void
}

/**
 * 게시물 작성자 아바타 컴포넌트
 * 게시물 작성자의 이미지와 이름을 표시합니다.
 */
export const PostAuthor = ({ author, onClick }: PostAuthorProps) => {
  return (
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={author.image}
        alt={author.username}
        className="w-8 h-8 rounded-full"
      />
      <span>{author.username}</span>
    </div>
  )
}

