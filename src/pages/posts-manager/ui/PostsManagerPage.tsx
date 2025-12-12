import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "../../../components";
import { useModal } from "../../../shared/modal/ModalContext";
import UserModal from "../../../features/user/ui/UserModal";
import PostCreateModal from "../../../features/post/ui/PostCreateModal";
import PostEditModal from "../../../features/post/ui/PostEditModal";
import PostDetailModal from "../../../features/post/ui/PostDetailModal";
import CommentCreateModal from "../../../features/comment/ui/CommentCreateModal";
import { PostModel } from "../../../entities/post/model/types";
import { CommentFormData, UpdateCommentFormData } from "../../../features/comment/model/types";
import CommentEditModal from "../../../features/comment/ui/CommentEditModal";
import Pagination from "../../../shared/ui/Pagination";
import { UserModel } from "../../../entities/user/model/types";
import PostTable from "../../../features/post/ui/PostTable";
import CommentList from "../../../features/comment/ui/CommentList";
import { CommentModel } from "../../../entities/comment/model/types";
import { getUserApi } from "../../../entities/user/api/user-api";
import {
  addCommentApi,
  deleteCommentApi,
  likeCommentApi,
  updateCommentApi,
} from "../../../entities/comment/api/comment-api";
import PostsFilters from "../../../features/post-filter/ui/PostsFilters";
import { usePostTableDataQuery } from "../../../features/post/hooks/use-post-table-data-query";
import { usePostsUrlQuery } from "../providers/PostsUrlQueryContext";
import { usePostDeleteMutate } from "../../../entities/post/hooks/use-post-delete-mutate";

const PostsManager = () => {
  const { queryParams, setQueryParams } = usePostsUrlQuery();

  // Modal
  const { openModal } = useModal();

  // 상태 관리
  const [skip, setSkip] = useState(queryParams.skip || 0);
  const [limit, setLimit] = useState(queryParams.limit || 10);

  const [comments, setComments] = useState<Record<string, CommentModel[]>>({});

  const { mutateAsync: deletePostMutation } = usePostDeleteMutate();

  // 댓글 가져오기
  // const fetchComments = async (postId: number) => {
  //   if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
  //   const commentsData = await getCommentsApi(postId);
  //   setComments((prev) => ({ ...prev, [postId]: commentsData.comments }));
  // };

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
    openModal((close) => (
      <PostDetailModal
        onClose={close}
        post={post}
        searchQuery={queryParams.search || ""}
        comment={
          <CommentList
            postId={post.id}
            searchQuery={queryParams.search || ""}
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
              onClickTagAction={(_tag: string) => setQueryParams({ tag: _tag })}
              onClickAuthorAction={(_user: UserModel) => openUserModal(_user)}
              onClickDetailAction={(_post: PostModel) => openPostDetail(_post)}
              onClickEditAction={(_post: PostModel) =>
                openModal((close) => <PostEditModal onClose={close} selectedPost={_post} />)
              }
              onClickDeleteAction={(_post: PostModel) => deletePostMutation({ postId: _post.id })}
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
