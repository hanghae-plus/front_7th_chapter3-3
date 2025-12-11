import { Button, Input, Textarea } from "../../../components";
import ModalComponent from "../../../shared/modal/ModalComponent";
import { BaseModalProps } from "../../../shared/modal/types";
import { useState } from "react";
import { PostFormData } from "../model/types";

interface PostCreateModalProps extends BaseModalProps {
  onClose: () => void;
  addPost: (postForm: PostFormData) => void;
}

export default function PostCreateModal({ onClose, addPost }: PostCreateModalProps) {
  const [postForm, setPostForm] = useState<PostFormData>({
    title: "",
    body: "",
    userId: 1,
  });

  return (
    <ModalComponent title="게시물 추가" onClose={onClose}>
      <div className="space-y-4">
        <Input
          placeholder="제목"
          value={postForm.title}
          onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
        />
        <Textarea
          rows={30}
          placeholder="내용"
          value={postForm.body}
          onChange={(e) => setPostForm({ ...postForm, body: e.target.value })}
        />
        <Input
          type="number"
          placeholder="사용자 ID"
          value={postForm.userId}
          onChange={(e) => setPostForm({ ...postForm, userId: Number(e.target.value) })}
        />
        <Button
          onClick={() => {
            addPost(postForm);
            onClose();
          }}
        >
          게시물 추가
        </Button>
      </div>
    </ModalComponent>
  );
}
