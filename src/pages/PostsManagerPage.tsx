import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, CardTitle } from "../components";
import { useModal } from "../shared/modal/ModalContext";
import UserModal from "../features/user/ui/UserModal";
import PostCreateModal from "../features/post/ui/PostCreateModal";
import PostEditModal from "../features/post/ui/PostEditModal";
import PostDetailModal from "../features/post/ui/PostDetailModal";
import CommentCreateModal from "../features/comment/ui/CommentCreateModal";
import { PostFormData } from "../features/post/model/types";
import { PostModel } from "../entities/post/model/types";
import { CommentFormData, UpdateCommentFormData } from "../features/comment/model/types";
import CommentEditModal from "../features/comment/ui/CommentEditModal";
import Pagination from "../shared/ui/Pagination";
import { UserModel } from "../entities/user/model/types";
import PostTable from "../features/post/ui/PostTable";
import CommentList from "../features/comment/ui/CommentList";
import { CommentModel } from "../entities/comment/model/types";
import { getUserApi, getUsersApi } from "../entities/user/api/user-api";
import {
  addPostApi,
  deletePostApi,
  getPostsApi,
  getPostsBySearchApi,
  getPostsByTagApi,
  getPostTagsApi,
  updatePostApi,
} from "../entities/post/api/post-api";
import {
  addCommentApi,
  deleteCommentApi,
  getCommentsApi,
  likeCommentApi,
  updateCommentApi,
} from "../entities/comment/api/comment-api";
import SelectDropdown from "../shared/ui/SelectDropdown";
import PostsSearchBar from "../features/post-filter/ui/PostsSearchBar";

const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Modal
  const { openModal } = useModal();

  // 상태 관리
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"));
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"));
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "");
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "");
  const [comments, setComments] = useState<Record<string, CommentModel[]>>({});

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams();
    if (skip) params.set("skip", skip.toString());
    if (limit) params.set("limit", limit.toString());
    if (searchQuery) params.set("search", searchQuery);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    if (selectedTag) params.set("tag", selectedTag);
    navigate(`?${params.toString()}`);
  };

  // 게시물 가져오기
  const fetchPosts = async () => {
    setLoading(true);
    const postsData = await getPostsApi({ limit: limit.toString(), skip: skip.toString() });
    const usersData = await getUsersApi({ limit: "0", select: "username,image" });

    const postsWithUsers = postsData.posts.map((post: PostModel) => ({
      ...post,
      author: usersData.users.find((user: UserModel) => user.id === post.userId),
    }));
    setPosts(postsWithUsers);
    setTotal(postsData.total);
    setLoading(false);
  };

  // 태그 가져오기
  const fetchTags = async () => {
    const tagsData = await getPostTagsApi();
    setTags(tagsData);
  };

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts();
      return;
    }
    setLoading(true);
    const postsData = await getPostsBySearchApi(searchQuery);
    setPosts(postsData.posts);
    setTotal(postsData.total);
    setLoading(false);
  };

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag?: string) => {
    if (!tag || tag === "all") {
      fetchPosts();
      return;
    }
    setLoading(true);
    const postsData = await getPostsByTagApi(tag);
    const usersData = await getUsersApi({ limit: "0", select: "username,image" });
    const postsWithUsers = postsData.posts.map((post) => ({
      ...post,
      author: usersData.users.find((user) => user.id === post.userId),
    }));
    setPosts(postsWithUsers);
    setTotal(postsData.total);
    setLoading(false);
  };

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

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      fetchPosts();
    }
    updateURL();
  }, [skip, limit, sortBy, sortOrder, selectedTag]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get("skip") || "0"));
    setLimit(parseInt(params.get("limit") || "10"));
    setSearchQuery(params.get("search") || "");
    setSortBy(params.get("sortBy") || "");
    setSortOrder(params.get("sortOrder") || "asc");
    setSelectedTag(params.get("tag") || "");
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
          <div className="flex gap-4">
            <PostsSearchBar searchQuery={searchQuery} onChange={setSearchQuery} onEnter={searchPosts} />
            <SelectDropdown
              options={tags.map((tag) => ({ label: tag.slug, value: tag.slug, key: tag.url }))}
              value={selectedTag}
              onChange={(value) => {
                setSelectedTag(value);
                fetchPostsByTag(value);
                updateURL();
              }}
              placeholder="태그 선택"
            />
            <SelectDropdown
              options={[
                { label: "없음", value: "none" },
                { label: "ID", value: "id" },
                { label: "제목", value: "title" },
                { label: "반응", value: "reactions" },
              ]}
              value={sortBy}
              onChange={setSortBy}
              placeholder="정렬 기준"
            />
            <SelectDropdown
              options={[
                { label: "오름차순", value: "asc" },
                { label: "내림차순", value: "desc" },
              ]}
              value={sortOrder}
              onChange={setSortOrder}
              placeholder="정렬 순서"
            />
          </div>

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              onClickTagAction={(_tag: string) => {
                setSelectedTag(_tag);
                updateURL();
              }}
              onClickAuthorAction={(_user: UserModel) => openUserModal(_user)}
              onClickDetailAction={(_post: PostModel) => openPostDetail(_post)}
              onClickEditAction={(_post: PostModel) =>
                openModal((close) => <PostEditModal onClose={close} selectedPost={_post} updatePost={updatePost} />)
              }
              onClickDeleteAction={(_post: PostModel) => deletePost(_post.id)}
            />
          )}

          {/* 페이지네이션 */}
          <Pagination limit={limit} setLimit={setLimit} skip={skip} setSkip={setSkip} total={total} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PostsManager;
