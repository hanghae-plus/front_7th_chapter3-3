import { BaseModalProps } from "../../../shared/modal/types";
import ModalComponent from "../../../shared/modal/ModalComponent";
import { CommentFormData, UpdateCommentFormData } from "../model/types";
import { useState } from "react";
import { Button, Textarea } from "../../../components";
import { CommentModel } from "../../../entities/comment/model/types";

interface CommentEditModalProps extends BaseModalProps {
  onClose: () => void;
  updateComment: (commentId: number, commentForm: UpdateCommentFormData) => void;
  selectedComment: CommentModel;
}

export default function CommentEditModal({ onClose, updateComment, selectedComment }: CommentEditModalProps) {
  const [commentForm, setCommentForm] = useState<CommentFormData>({
    body: selectedComment?.body || "",
    postId: selectedComment?.postId || 0,
    userId: selectedComment?.user?.id || 1,
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
          onClick={() => {
            updateComment(selectedComment.id, commentForm);
            onClose();
          }}
        >
          댓글 업데이트
        </Button>
      </div>
    </ModalComponent>
  );
}
