import { Search } from "@/features/post-filter/ui/Search"
import { ByTag } from "@/features/post-filter/ui/ByTag"
import { BySort } from "@/features/post-filter/ui/BySort"
import { ByOrder } from "@/features/post-filter/ui/ByOrder"

export const PostFilter = () => {
  return (
    <div className="flex gap-4">
      <PostFilter.Search />
      <PostFilter.ByTag />
      <PostFilter.BySort />
      <PostFilter.ByOrder />
    </div>
  )
}

PostFilter.Search = Search
PostFilter.ByTag = ByTag
PostFilter.BySort = BySort
PostFilter.ByOrder = ByOrder
