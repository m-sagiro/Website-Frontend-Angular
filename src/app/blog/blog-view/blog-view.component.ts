import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Blog, BlogService} from '../blog.service';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {
  private blogId: number;
  public error: string;
  public isError: boolean;
  public blog: Blog;

  constructor(private activatedRoute: ActivatedRoute,
              private blogService: BlogService,
              public auth: AuthenticationService) { }

  ngOnInit(): void {
      this.blogId = this.activatedRoute.snapshot.params['id'];
      this.blogService.getBlogById(this.blogId).subscribe(
          data => {
              this.isError = false;
              this.blog = data;
              },
              error => {
              this.isError = true;
              this.error = error['error'];
          });
  }
}
