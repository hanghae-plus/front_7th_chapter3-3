export interface PostModel {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface PostTagModel {
  slug: string;
  url: string;
  name: string;
}
