export interface Topic {
  id: number;
  content: string;
  priority: number;
  discussed: boolean;
  createdAt: string;
  createdBy: string;
  comments: Comment[];
  user: {
    username: string;
  };
  archived: boolean;
}

export interface Comment {
  id: number;
  content: string;
  user: { username: string };
  createdAt: string;
}