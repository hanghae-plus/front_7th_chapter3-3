import { UserGetQueryParams, UserListApiResponse } from "./dto";

export const getUserApi = async (id: number) => {
  try {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error);
    throw error;
  }
};

export const getUsersApi = async (query?: UserGetQueryParams): Promise<UserListApiResponse> => {
  try {
    const response = await fetch(`/api/users?${new URLSearchParams(query).toString()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error);
    throw error;
  }
};
