import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BlogService} from '../blog.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-blog-delete',
  templateUrl: './blog-delete.component.html',
  styleUrls: ['./blog-delete.component.css']
})
export class BlogDeleteComponent implements OnInit {
  @Input() blogId;
  isError: boolean;
  error: string;

  constructor(private activatedRoute: ActivatedRoute,
              public activeModal: NgbActiveModal,
              private blogService: BlogService,
              private router: Router) { }

  ngOnInit(): void {
    this.isError = false;
  }

  deleteBlog() {
    this.blogService.deleteBlogById(this.blogId).subscribe(
        data => {
          this.activeModal.close();
          this.router.navigate(['/blog']);
        },
        error => {
          this.isError = true;
          this.error = error['error']['error'];
        });
  }

}
