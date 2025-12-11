import { BaseModalProps } from "../../../shared/modal/types";
import ModalComponent from "../../../shared/modal/ModalComponent";
import { CommentFormData } from "../model/types";
import { useState } from "react";
import { Button, Textarea } from "../../../components";

interface CommentCreateModalProps extends BaseModalProps {
  onClose: () => void;
  addComment: (commentForm: CommentFormData) => void;
  postId: number;
}

export default function CommentCreateModal({ onClose, addComment, postId }: CommentCreateModalProps) {
  const [commentForm, setCommentForm] = useState<CommentFormData>({
    body: "",
    postId,
    userId: 1,
  });
  return (
    <ModalComponent title="댓글 추가" onClose={onClose}>
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={commentForm.body}
          onChange={(e) => setCommentForm({ ...commentForm, body: e.target.value })}
        />
        <Button
          onClick={() => {
            addComment(commentForm);
            onClose();
          }}
        >
          댓글 추가
        </Button>
      </div>
    </ModalComponent>
  );
}
