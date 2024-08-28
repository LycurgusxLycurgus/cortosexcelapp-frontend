export interface Topic {
  id: number;
  content: string;
  createdAt: string;
  priority: number;
  discussed: boolean;
  archived: boolean;
  user: {
    username: string;
  };
  comments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  user: { username: string };
  createdAt: string;
}