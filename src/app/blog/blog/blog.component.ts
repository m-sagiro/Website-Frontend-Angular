import {Component, Injectable, OnInit} from '@angular/core';
import {Blog, BlogService} from '../blog.service';
import {AuthenticationService} from '../../authentication/authentication.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {BlogNewComponent} from '../blog-new/blog-new.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
@Injectable({ providedIn: 'root' })
export class BlogComponent implements OnInit {
    public error: string;
    public isError: boolean;
    public blogSet: Blog[];

    constructor(private blogService: BlogService,
                public auth: AuthenticationService,
                private modalService: NgbModal,
                config: NgbModalConfig) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit(): void {
        this.getAllBlogs();
    }

    public getAllBlogs() {
        this.isError = false;
        this.blogService.getAllBlogs().subscribe(
            (data) => {
                this.blogSet = data;
            },
            error => {
                this.isError = true;
                this.error = error['error'];
            });
    }

    open() {
        const modalRef = this.modalService.open(BlogNewComponent);
    }
}
