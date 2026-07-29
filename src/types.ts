export type ProjectCategory = 'UI/UX Design' | 'Design Systems' | 'Branding' | 'E-Commerce' | 'Mobile';

export type PostStatus = 'Publicado' | 'Rascunho' | 'Arquivado';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  tags: string[];
  summary: string;
  description: string;
  client: string;
  year: string;
  role: string;
  tools: string[];
  coverImage: string;
  galleryImages: string[];
  status: PostStatus;
  views: number;
  publishedAt: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
}

export interface SkillItem {
  name: string;
  level: number;
  category: string;
  iconName?: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budgetRange?: string;
}

export interface DirectImageLink {
  id: string;
  title: string;
  url: string;
  usage: string;
  aspectRatio: string;
}
