import { Button, Input, Textarea } from "../../../components";
import ModalComponent from "../../../shared/modal/ModalComponent";
import { BaseModalProps } from "../../../shared/modal/types";
import { useState } from "react";
import { PostFormData } from "../model/types";
import { PostModel } from "../../../entities/post/model/types";
interface PostEditModalProps extends BaseModalProps {
  onClose: () => void;
  updatePost: (postForm: PostFormData) => void;
  selectedPost: PostModel;
}

export default function PostEditModal({ onClose, updatePost, selectedPost }: PostEditModalProps) {
  const [postForm, setPostForm] = useState<PostFormData>({
    title: selectedPost?.title || "",
    body: selectedPost?.body || "",
    userId: selectedPost?.userId || 1,
  });

  return (
    <ModalComponent title="게시물 수정" onClose={onClose}>
      <div className="space-y-4">
        <Input
          placeholder="제목"
          value={postForm?.title || ""}
          onChange={(e) => setPostForm({ ...selectedPost, title: e.target.value })}
        />
        <Textarea
          rows={15}
          placeholder="내용"
          value={postForm?.body || ""}
          onChange={(e) => setPostForm({ ...selectedPost, body: e.target.value })}
        />
        <Button
          onClick={() => {
            updatePost(postForm);
            onClose();
          }}
        >
          게시물 업데이트
        </Button>
      </div>
    </ModalComponent>
  );
}
