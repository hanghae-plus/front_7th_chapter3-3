import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle, Pagination } from "../../../shared/ui";
import { useModal } from "../../../shared/modal/ModalContext";
import { PostCreateModal, PostTable } from "../../../features/post";
import { PostsFilters } from "../../../features/post-filter";
import { UserModal } from "../../../features/user";
import { CommentList } from "../../../features/comment";
import { usePostsUrlQuery } from "../model";
import { usePostTableDataQuery } from "../hooks/use-post-table-data-query";

const PostsManager = () => {
  const { queryParams, setQueryParams } = usePostsUrlQuery();

  // Modal
  const { openModal } = useModal();

  // 상태 관리
  const [skip, setSkip] = useState(queryParams.skip || 0);
  const [limit, setLimit] = useState(queryParams.limit || 10);

  const pagination = { skip, limit };
  const filter = {
    sortBy: queryParams.sortBy,
    sortOrder: queryParams.sortOrder,
    tag: queryParams.tag,
    search: queryParams.search,
  };

  // Data Query
  const { loading, data: postsData } = usePostTableDataQuery({
    pagination,
    filter,
  });

  useEffect(() => {
    setQueryParams({ limit, skip });
  }, [limit, skip]);

  const handleUserClick = (userId?: number) => {
    if (userId) {
      openModal((close) => <UserModal userId={userId} onClose={close} />);
    }
  };

  const renderComments = (postId: number) => {
    return <CommentList postId={postId} searchQuery={queryParams.search || ""} />;
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => openModal((close) => <PostCreateModal onClose={close} />)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostsFilters filter={filter} onFilterChange={(f) => setQueryParams({ ...f })} />

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={postsData?.posts || []}
              searchQuery={queryParams.search || ""}
              selectedTag={queryParams.tag || ""}
              onTagClick={(tag) => setQueryParams({ tag, search: null, sortBy: null, sortOrder: null })}
              onUserClick={handleUserClick}
              renderComments={renderComments}
            />
          )}

          {/* 페이지네이션 */}
          <Pagination limit={limit} setLimit={setLimit} skip={skip} setSkip={setSkip} total={postsData?.total || 0} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PostsManager;
