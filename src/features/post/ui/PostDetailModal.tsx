import ModalComponent from "../../../shared/modal/ModalComponent";
import { BaseModalProps } from "../../../shared/modal/types";
import { PostModel } from "../../../entities/post/model/types";
import { highlightText } from "../../../shared/utils/highlight";
interface PostDetailModalProps extends BaseModalProps {
  onClose: () => void;
  post: PostModel;
  searchQuery: string;
  comment: React.ReactNode;
}

export default function PostDetailModal({ onClose, post, searchQuery, comment }: PostDetailModalProps) {
  const highlightTItle = highlightText(post?.title, searchQuery);

  return (
    <ModalComponent title={highlightTItle} onClose={onClose}>
      <div className="space-y-4">
        <p>{highlightText(post?.body, searchQuery)}</p>
        {comment}
      </div>
    </ModalComponent>
  );
}
