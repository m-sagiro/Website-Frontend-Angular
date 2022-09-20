import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Blog, BlogService} from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public error: string;
  public isError: boolean;
  public blogSet: Blog[];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
      this.isError = false;
      this.blogService.getAllBlogs().subscribe(
          (data) => {
              for (const blog of data) {
                  blog.blogUrl = '/blog/' + blog.id;
              }
              this.blogSet = data;
              },
              error => {
              this.isError = true;
              this.error = error['error'];
          }
          );
  }
}
