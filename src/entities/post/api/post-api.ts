import { PostModel, PostTagModel } from "../model/types";
import {
  AddPostDto,
  PostsListQueryParams,
  PostListApiResponse,
  PostsSearchQueryParams,
  PostsTagQueryParams,
  UpdatePostDto,
} from "./dto";

export const addPostApi = async (postDto: AddPostDto): Promise<PostModel> => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postDto),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("게시물 추가 오류:", error);
    throw error;
  }
};

export const updatePostApi = async (postId: number, postDto: UpdatePostDto): Promise<PostModel> => {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postDto),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("게시물 업데이트 오류:", error);
    throw error;
  }
};

export const deletePostApi = async (postId: number): Promise<void> => {
  try {
    await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("게시물 삭제 오류:", error);
    throw error;
  }
};

export const getPostsApi = async (query?: PostsListQueryParams): Promise<PostListApiResponse> => {
  try {
    const response = await fetch(`/api/posts?${new URLSearchParams(query).toString()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("게시물 가져오기 오류:", error);
    throw error;
  }
};

export const getPostsBySearchApi = async (params?: PostsSearchQueryParams): Promise<PostListApiResponse> => {
  try {
    const response = await fetch(`/api/posts/search?${new URLSearchParams(params).toString()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("게시물 검색 오류:", error);
    throw error;
  }
};

export const getPostsByTagApi = async (tag: string, params?: PostsTagQueryParams): Promise<PostListApiResponse> => {
  try {
    const response = await fetch(`/api/posts/tag/${tag}?${new URLSearchParams(params).toString()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("태그별 게시물 가져오기 오류:", error);
    throw error;
  }
};

export const getPostTagsApi = async (): Promise<PostTagModel[]> => {
  try {
    const response = await fetch("/api/posts/tags");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("태그 가져오기 오류:", error);
    throw error;
  }
};
