import { MessageSquare } from "lucide-react"
import { Button } from "@/shared/ui"
import { Post } from "@/entities/post"

interface ViewPostDetailButtonProps {
  post: Post
  onClick: (post: Post) => void
}

export const ViewPostDetailButton = ({ post, onClick }: ViewPostDetailButtonProps) => {
  return (
    <Button variant="ghost" size="sm" onClick={() => onClick(post)}>
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}
