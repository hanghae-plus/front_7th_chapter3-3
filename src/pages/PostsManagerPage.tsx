import { PostsManager } from "@/widgets/PostsManager"
import { PostsParamsProvider } from "@/shared/lib/posts-params"

const PostsManagerPage = () => {
  return (
    <PostsParamsProvider>
      <PostsManager />
    </PostsParamsProvider>
  )
}

export default PostsManagerPage
