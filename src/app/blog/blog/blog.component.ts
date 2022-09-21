import { Component, OnInit } from '@angular/core';
import {Blog, BlogService} from '../blog.service';
import {AuthenticationService} from '../../authentication/authentication.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BlogNewComponent} from '../blog-new/blog-new.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
    public error: string;
    public isError: boolean;
    public blogSet: Blog[];

    constructor(private blogService: BlogService,
              public auth: AuthenticationService,
              private modalService: NgbModal) { }

    ngOnInit(): void {
      this.isError = false;
      this.blogService.getAllBlogs().subscribe(
          (data) => {
              this.blogSet = data;
              },
              error => {
              this.isError = true;
              this.error = error['error'];
          }
          );
    }

    open() {
        const modalRef = this.modalService.open(BlogNewComponent);
        // modalRef.componentInstance.name = 'World';
    }
}
