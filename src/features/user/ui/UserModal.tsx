import ModalComponent from "../../../shared/modal/ModalComponent";
import { BaseModalProps } from "../../../shared/modal/types";
import { useUserQuery } from "../../../entities/user/hooks/use-user-query";

interface UserModalProps extends BaseModalProps {
  onClose: () => void;
  userId?: number;
}

export default function UserModal({ onClose, userId }: UserModalProps) {
  const { data: userData } = useUserQuery({ userId: userId ?? 0, enabled: !!userId });
  return (
    <ModalComponent title="사용자 정보" onClose={onClose}>
      <div className="space-y-4">
        <img src={userData?.image} alt={userData?.username} className="w-24 h-24 rounded-full mx-auto" />
        <h3 className="text-xl font-semibold text-center">{userData?.username}</h3>
        <div className="space-y-2">
          <p>
            <strong>이름:</strong> {userData?.firstName} {userData?.lastName}
          </p>
          <p>
            <strong>나이:</strong> {userData?.age}
          </p>
          <p>
            <strong>이메일:</strong> {userData?.email}
          </p>
          <p>
            <strong>전화번호:</strong> {userData?.phone}
          </p>
          <p>
            <strong>주소:</strong> {userData?.address?.address}, {userData?.address?.city}, {userData?.address?.state}
          </p>
          <p>
            <strong>직장:</strong> {userData?.company?.name} - {userData?.company?.title}
          </p>
        </div>
      </div>
    </ModalComponent>
  );
}
