export interface Skill {
  _id: string;
  name: string;
  level: number;
  iconName?: string;
  description?: string;
  tags?: string[];
  categoryId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SkillCategory {
  _id: string;
  title: string;
  iconName?: string;
  description?: string;
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
}
