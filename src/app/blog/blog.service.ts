import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

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

  constructor(private http: HttpClient,
              private router: Router) { }

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
    return this.http.delete<Blog>(`/api/blog/delete/${id}`);
  }

  updateBlog(id: number, blogData) {
    return this.http.put<Blog>(`/api/blog/update/${id}`, blogData);
  }
}
