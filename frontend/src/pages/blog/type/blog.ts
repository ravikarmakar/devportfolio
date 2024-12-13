export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  coverImage: string;
  publishedAt: string;
  readTime: number;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  icon: string;
  type: "video" | "article" | "course" | "tool";
}
