import { TPost } from "@/entities/posts/model/types"

interface Props {
  post: TPost
}

export const PostCard = ({ post }: Props) => (
  <div className="post-card">
    <h2>{post.title}</h2>
    <p>{post.body}</p>
    <span>👍 {post.reactions.likes}</span>
  </div>
)
