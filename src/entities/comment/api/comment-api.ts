import { API_URL } from "../../../shared/config/api-config";
import { CommentModel } from "../model/types";
import { AddCommentDto, CommentListApiResponse, UpdateCommentDto } from "./dto";

export const addCommentApi = async (commentDto: AddCommentDto): Promise<CommentModel> => {
  try {
    const response = await fetch(`${API_URL}/comments/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentDto),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("댓글 추가 오류:", error);
    throw error;
  }
};

export const updateCommentApi = async (commentId: number, commentDto: UpdateCommentDto): Promise<CommentModel> => {
  try {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentDto),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("댓글 업데이트 오류:", error);
    throw error;
  }
};

export const deleteCommentApi = async (commentId: number): Promise<void> => {
  try {
    await fetch(`${API_URL}/comments/${commentId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("댓글 삭제 오류:", error);
    throw error;
  }
};

export const likeCommentApi = async (commentId: number, likes: number): Promise<CommentModel> => {
  try {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("댓글 좋아요 오류:", error);
    throw error;
  }
};

export const getCommentsApi = async (postId: number): Promise<CommentListApiResponse> => {
  try {
    const response = await fetch(`${API_URL}/comments/post/${postId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("댓글 가져오기 오류:", error);
    throw error;
  }
};
