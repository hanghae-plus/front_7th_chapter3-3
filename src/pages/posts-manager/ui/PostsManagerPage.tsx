import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, CardTitle } from "../../../components";
import { useModal } from "../../../shared/modal/ModalContext";
import UserModal from "../../../features/user/ui/UserModal";
import PostCreateModal from "../../../features/post/ui/PostCreateModal";
import PostEditModal from "../../../features/post/ui/PostEditModal";
import PostDetailModal from "../../../features/post/ui/PostDetailModal";
import CommentCreateModal from "../../../features/comment/ui/CommentCreateModal";
import { PostFormData } from "../../../features/post/model/types";
import { PostModel } from "../../../entities/post/model/types";
import { CommentFormData, UpdateCommentFormData } from "../../../features/comment/model/types";
import CommentEditModal from "../../../features/comment/ui/CommentEditModal";
import Pagination from "../../../shared/ui/Pagination";
import { UserModel } from "../../../entities/user/model/types";
import PostTable from "../../../features/post/ui/PostTable";
import CommentList from "../../../features/comment/ui/CommentList";
import { CommentModel } from "../../../entities/comment/model/types";
import { getUserApi } from "../../../entities/user/api/user-api";
import { addPostApi, deletePostApi, updatePostApi } from "../../../entities/post/api/post-api";
import {
  addCommentApi,
  deleteCommentApi,
  getCommentsApi,
  likeCommentApi,
  updateCommentApi,
} from "../../../entities/comment/api/comment-api";
import PostsFilters from "../../../features/post-filter/ui/PostsFilters";
import { useUrlSearchParams } from "../../../shared/hooks/use-url-search-params";
import { usePostFilters } from "../../../features/post-filter/providers/PostFiltersContext";
import { usePostTableDataQuery } from "../../../features/post/hooks/use-post-table-data-query";

const PostsManager = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const { queryParams: urlQueryParams } = useUrlSearchParams();
  const { searchQuery, sortBy, sortOrder, selectedTag, setSelectedTag } = usePostFilters();

  // Modal
  const { openModal } = useModal();

  // 상태 관리
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [skip, setSkip] = useState(parseInt(urlQueryParams.get("skip") || "0"));
  const [limit, setLimit] = useState(parseInt(urlQueryParams.get("limit") || "10"));

  const [comments, setComments] = useState<Record<string, CommentModel[]>>({});

  // 게시물 추가
  const addPost = async (postForm: PostFormData) => {
    const postData = await addPostApi(postForm);
    setPosts([postData, ...posts]);
  };

  // 게시물 업데이트
  const updatePost = async (postId: number, postForm: PostFormData) => {
    const postData = await updatePostApi(postId, postForm);
    setPosts(posts.map((post) => (post.id === postData.id ? postData : post)));
  };

  // 게시물 삭제
  const deletePost = async (postId: number) => {
    await deletePostApi(postId);
    setPosts(posts.filter((post) => post.id !== postId));
  };

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    const commentsData = await getCommentsApi(postId);
    setComments((prev) => ({ ...prev, [postId]: commentsData.comments }));
  };

  // 댓글 추가
  const addComment = async (commentForm: CommentFormData) => {
    const commentData = await addCommentApi(commentForm);
    setComments((prev) => ({
      ...prev,
      [commentForm.postId]: [...(prev[commentForm.postId] || []), commentData],
    }));
  };

  // 댓글 업데이트
  const updateComment = async (commentId: number, commentForm: UpdateCommentFormData) => {
    const commentData = await updateCommentApi(commentId, commentForm);
    setComments((prev) => ({
      ...prev,
      [commentData.postId]: prev[commentData.postId].map((comment) =>
        comment.id === commentId ? commentData : comment,
      ),
    }));
  };

  // 댓글 삭제
  const deleteComment = async (commentId: number, postId: number) => {
    await deleteCommentApi(commentId);
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((comment) => comment.id !== commentId),
    }));
  };

  // 댓글 좋아요
  const likeComment = async (commentId: number, postId: number) => {
    const comment = comments[postId].find((c) => c.id === commentId);
    if (!comment) {
      console.error("댓글을 찾을 수 없습니다.");
      return;
    }
    const commentData = await likeCommentApi(commentId, comment.likes + 1);
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].map((comment) => (comment.id === commentData.id ? commentData : comment)),
    }));
  };

  // 게시물 상세 보기
  const openPostDetail = (post: PostModel) => {
    fetchComments(post.id);
    openModal((close) => (
      <PostDetailModal
        onClose={close}
        post={post}
        searchQuery={searchQuery}
        comment={
          <CommentList
            comments={comments?.[post.id] || []}
            searchQuery={searchQuery}
            onClickLikeAction={(comment) => likeComment(comment.id, post.id)}
            onClickEditAction={(comment) => {
              openModal((close) => (
                <CommentEditModal onClose={close} updateComment={updateComment} selectedComment={comment} />
              ));
            }}
            onClickDeleteAction={(comment) => deleteComment(comment.id, post.id)}
            onClickAddAction={() => {
              openModal((close) => <CommentCreateModal onClose={close} addComment={addComment} postId={post.id} />);
            }}
          />
        }
      />
    ));
  };

  // 사용자 모달 열기
  const openUserModal = async (user: UserModel) => {
    const userData = await getUserApi(user.id);
    openModal((close) => <UserModal user={userData} onClose={close} />);
  };

  const { loading, data: postsData } = usePostTableDataQuery({
    skip,
    limit,
    sortBy,
    sortOrder,
    selectedTag,
    searchQuery,
  });

  useEffect(() => {
    // const params = new URLSearchParams(location.search);
    setSkip(parseInt(urlQueryParams.get("skip") || "0"));
    setLimit(parseInt(urlQueryParams.get("limit") || "10"));
    // setSearchQuery(params.get("search") || "");
    // setSortBy(params.get("sortBy") || "");
    // setSortOrder(params.get("sortOrder") || "asc");
    // setSelectedTag(params.get("tag") || "");
  }, [location.search]);

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => openModal((close) => <PostCreateModal onClose={close} addPost={addPost} />)}>
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
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              onClickTagAction={(_tag: string) => setSelectedTag(_tag)}
              onClickAuthorAction={(_user: UserModel) => openUserModal(_user)}
              onClickDetailAction={(_post: PostModel) => openPostDetail(_post)}
              onClickEditAction={(_post: PostModel) =>
                openModal((close) => <PostEditModal onClose={close} selectedPost={_post} updatePost={updatePost} />)
              }
              onClickDeleteAction={(_post: PostModel) => deletePost(_post.id)}
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
