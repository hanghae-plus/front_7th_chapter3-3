import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui";
import { useModal } from "../../../shared/modal/ModalContext";
import PostCreateModal from "../../../features/post/ui/PostCreateModal";
import Pagination from "../../../shared/ui/Pagination";
import PostTable from "../../../features/post/ui/PostTable";
import PostsFilters from "../../../features/post-filter/ui/PostsFilters";
import { usePostTableDataQuery } from "../../../features/post/hooks/use-post-table-data-query";
import { usePostsUrlQuery } from "../../../shared/url-query";

const PostsManager = () => {
  const { queryParams, setQueryParams } = usePostsUrlQuery();

  // Modal
  const { openModal } = useModal();

  // 상태 관리
  const [skip, setSkip] = useState(queryParams.skip || 0);
  const [limit, setLimit] = useState(queryParams.limit || 10);

  // Data Query
  const { loading, data: postsData } = usePostTableDataQuery({
    urlQueryParams: queryParams,
  });

  useEffect(() => {
    setQueryParams({ limit, skip });
  }, [limit, skip]);

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
          <PostsFilters />

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={postsData?.posts || []}
              searchQuery={queryParams.search || ""}
              selectedTag={queryParams.tag || ""}
              onTagClick={(tag) => setQueryParams({ tag, search: null, sortBy: null, sortOrder: null })}
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
