import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Blog {
  id: number;
  title: string;
  subTitle: string;
  text: string;
  postDate: any;
}

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient) { }

  getAllBlogs() {
    return this.http.get<Blog[]>('/api/blogs');
  }

  getBlogById(id: number) {
    return this.http.get<Blog>(`/api/blog/get/${id}`);
  }

  saveBlog(blogData) {
    return this.http.post<Blog>('/api/blog/save', blogData);
  }

  deleteBlogById(id: number) {
    return this.http.delete(`/api/blog/delete/${id}`);
  }

  updateBlog(blogData) {
    return this.http.put<Blog>(`/api/blog/update`, blogData);
  }
}
