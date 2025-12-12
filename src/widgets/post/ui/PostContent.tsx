import { useEffect, useState } from "react"

import { Search } from "lucide-react"
import { Input, Button } from "../../../shared/ui"
import { Select } from "../../../shared/ui"

import useTagQuery from "../../../entities/tag/model/useTagQuery"

import usePostParams from "../../../features/post/model/usePostParams"
import usePostWithParams from "../../../features/post/model/usePostWithParams"

import PostTable from "../ui/PostTable"

const PostContent = () => {
  const { data: tags = [] } = useTagQuery()
  const { data: posts, isLoading } = usePostWithParams()
  const { params: postParams, updateParams: updatePostParams } = usePostParams()

  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setSearchQuery(postParams.searchQuery)
  }, [postParams.searchQuery])

  return (
    <div className="flex flex-col gap-4">
      {/* 검색 및 필터 컨트롤 */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="게시물 검색..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && updatePostParams({ searchQuery: searchQuery })}
            />
          </div>
        </div>
        <Select
          value={postParams.selectedTag}
          onValueChange={(value) => {
            updatePostParams({ selectedTag: value })
          }}
        >
          <Select.Trigger className="w-[180px]">
            <Select.Value placeholder="태그 선택" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">모든 태그</Select.Item>
            {tags.map((tag) => (
              <Select.Item key={tag.url} value={tag.slug}>
                {tag.slug}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>

        <Select value={postParams.sortBy} onValueChange={(value) => updatePostParams({ sortBy: value })}>
          <Select.Trigger className="w-[180px]">
            <Select.Value placeholder="정렬 기준" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="none">없음</Select.Item>
            <Select.Item value="id">ID</Select.Item>
            <Select.Item value="title">제목</Select.Item>
            <Select.Item value="reactions">반응</Select.Item>
          </Select.Content>
        </Select>

        <Select value={postParams.sortOrder} onValueChange={(value) => updatePostParams({ sortOrder: value })}>
          <Select.Trigger className="w-[180px]">
            <Select.Value placeholder="정렬 순서" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="asc">오름차순</Select.Item>
            <Select.Item value="desc">내림차순</Select.Item>
          </Select.Content>
        </Select>
      </div>

      {/* 게시물 테이블 */}
      {isLoading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable posts={posts.posts} />}

      {/* 페이지네이션 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>표시</span>
          <Select
            value={postParams.limit.toString()}
            onValueChange={(value) => updatePostParams({ limit: Number(value) })}
          >
            <Select.Trigger className="w-[180px]">
              <Select.Value placeholder="10" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="10">10</Select.Item>
              <Select.Item value="20">20</Select.Item>
              <Select.Item value="30">30</Select.Item>
            </Select.Content>
          </Select>
          <span>항목</span>
        </div>{" "}
        <div className="flex gap-2">
          <Button
            disabled={postParams.skip === 0}
            onClick={() => updatePostParams({ skip: Math.max(0, postParams.skip - postParams.limit) })}
          >
            이전
          </Button>
          <Button
            disabled={postParams.skip + postParams.limit >= posts.total}
            onClick={() => updatePostParams({ skip: postParams.skip + postParams.limit })}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PostContent
