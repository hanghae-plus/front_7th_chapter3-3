import { BaseModalProps } from "../../../shared/modal/types";
import ModalComponent from "../../../shared/modal/ModalComponent";
import { CommentFormData } from "../model/types";
import { useState } from "react";
import { Button, Textarea } from "../../../components";
import { CommentModel } from "../../../entities/comment/model/types";
import { useCommentEditMutate } from "../../../entities/comment/hooks/use-comment-edit-mutate";
import { useQueryClient } from "@tanstack/react-query";
import { commentKeys } from "../../../entities/comment/api/comment-keys";
import { CommentListApiResponse } from "../../../entities/comment/api/dto";
interface CommentEditModalProps extends BaseModalProps {
  onClose: () => void;
  selectedComment: CommentModel;
}

export default function CommentEditModal({ onClose, selectedComment }: CommentEditModalProps) {
  const queryClient = useQueryClient();
  const [commentForm, setCommentForm] = useState<CommentFormData>({
    body: selectedComment?.body || "",
    postId: selectedComment?.postId || 0,
    userId: selectedComment?.user?.id || 1,
  });

  const { mutateAsync: updateCommentMutation } = useCommentEditMutate({
    invalidateQueries: false,
    onSuccess: (data) => {
      queryClient.setQueryData(commentKeys.list(data.postId), (old: CommentListApiResponse) => ({
        ...old,
        comments: (old.comments || []).map((comment) => (comment.id === data.id ? data : comment)),
      }));
      onClose();
    },
  });

  return (
    <ModalComponent title="댓글 수정" onClose={onClose}>
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={commentForm.body}
          onChange={(e) => setCommentForm({ ...commentForm, body: e.target.value })}
        />
        <Button
          onClick={() =>
            updateCommentMutation({
              postId: selectedComment.postId,
              commentId: selectedComment.id,
              commentDto: { ...selectedComment, body: commentForm.body },
            })
          }
        >
          댓글 업데이트
        </Button>
      </div>
    </ModalComponent>
  );
}
