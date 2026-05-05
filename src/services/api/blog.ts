import { api } from "./index";

export interface BlogImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
}

export interface BlogEntry {
  id: number;
  documentId: string;
  title: string;
  slug: string | null;
  shortDescription: string;
  longDescription: string;
  date: string;
  image: BlogImage;
}

export interface BlogResponse {
  data: BlogEntry[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface SingleBlogResponse {
  data: BlogEntry;
}

const BLOGS_ENDPOINT = "https://lovely-power-898b5204db.strapiapp.com/api/blogs";

export function getBlogs() {
  return api.get<BlogResponse>(`${BLOGS_ENDPOINT}?populate=*`);
}

export function getBlogByDocumentId(documentId: string) {
  return api.get<SingleBlogResponse>(`${BLOGS_ENDPOINT}/${documentId}?populate=*`);
}
