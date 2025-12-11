import { CommentModel } from "../model/types";
import { AddCommentDto, UpdateCommentDto } from "./dto";

export const addCommentApi = async (commentDto: AddCommentDto): Promise<CommentModel> => {
  try {
    const response = await fetch("/api/comments/add", {
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
    const response = await fetch(`/api/comments/${commentId}`, {
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
    await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("댓글 삭제 오류:", error);
    throw error;
  }
};

export const likeCommentApi = async (commentId: number, likes: number): Promise<CommentModel> => {
  try {
    const response = await fetch(`/api/comments/${commentId}`, {
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
