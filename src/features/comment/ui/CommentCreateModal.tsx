import { BaseModalProps } from "../../../shared/modal/types";
import ModalComponent from "../../../shared/modal/ModalComponent";
import { CommentFormData } from "../model/types";
import { useState } from "react";
import { Button, Textarea } from "../../../shared/ui";
import {
  CommentListApiResponse,
  commentKeys,
  useCommentAddMutate,
} from "../../../entities/comment";
import { useQueryClient } from "@tanstack/react-query";

interface CommentCreateModalProps extends BaseModalProps {
  onClose: () => void;
  postId: number;
}

export default function CommentCreateModal({ onClose, postId }: CommentCreateModalProps) {
  const queryClient = useQueryClient();
  const [commentForm, setCommentForm] = useState<CommentFormData>({
    body: "",
    postId,
    userId: 1,
  });

  const { mutateAsync: addCommentMutation } = useCommentAddMutate({
    invalidateQueries: false,
    onSuccess: (data) => {
      queryClient.setQueryData(commentKeys.list(data.postId), (old: CommentListApiResponse) => ({
        ...old,
        comments: [data, ...(old.comments || [])],
      }));
      onClose();
    },
  });

  return (
    <ModalComponent title="댓글 추가" onClose={onClose}>
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={commentForm.body}
          onChange={(e) => setCommentForm({ ...commentForm, body: e.target.value })}
        />
        <Button onClick={() => addCommentMutation({ postId, commentDto: commentForm })}>댓글 추가</Button>
      </div>
    </ModalComponent>
  );
}
