import { CommentModel } from "../../../entities/comment/model/types";
import { Button } from "../../../shared/ui";
import { Plus, ThumbsUp, Edit2, Trash2 } from "lucide-react";
import { highlightText } from "../../../shared/utils/highlight";
import { useCommentsQuery } from "../../../entities/comment/hooks/use-comments-query";
import { useModal } from "../../../shared/modal/ModalContext";
import CommentEditModal from "./CommentEditModal";
import CommentCreateModal from "./CommentCreateModal";
import { useCommentDeleteMutate } from "../../../entities/comment/hooks/use-comment-delete-mutate";
import { useQueryClient } from "@tanstack/react-query";
import { commentKeys } from "../../../entities/comment/api/comment-keys";
import { useCommentEditMutate } from "../../../entities/comment/hooks/use-comment-edit-mutate";
import { CommentListApiResponse } from "../../../entities/comment/api/dto";

interface CommentListProps {
  postId: number;
  searchQuery: string;
}

export default function CommentList({ postId, searchQuery }: CommentListProps) {
  const queryClient = useQueryClient();

  const { openModal } = useModal();
  const { data: commentsData } = useCommentsQuery({ postId, enabled: !!postId });
  const comments = commentsData?.comments || [];

  const { mutateAsync: deleteCommentMutation } = useCommentDeleteMutate({
    invalidateQueries: false,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(commentKeys.list(variables.postId), (old: CommentListApiResponse) => ({
        ...old,
        comments: (old.comments || []).filter((comment) => comment.id !== variables.commentId),
      }));
    },
  });

  const { mutateAsync: editCommentMutation } = useCommentEditMutate({
    invalidateQueries: false,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(commentKeys.list(variables.postId), (old: CommentListApiResponse) => ({
        ...old,
        comments: (old.comments || []).map((comment) =>
          comment.id === variables.commentId ? variables.commentDto : comment,
        ),
      }));
    },
  });

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={() => openModal((close) => <CommentCreateModal onClose={close} postId={postId} />)}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editCommentMutation({
                    postId,
                    commentId: comment.id,
                    commentDto: { ...comment, likes: comment.likes + 1 },
                  })
                }
              >
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openModal((close) => <CommentEditModal onClose={close} selectedComment={comment} />)}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteCommentMutation({ postId, commentId: comment.id })}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
