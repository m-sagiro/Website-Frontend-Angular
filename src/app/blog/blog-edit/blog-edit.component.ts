import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Blog, BlogService} from '../blog.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe, formatDate} from '@angular/common';


@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  focus: any;
  focus1: any;
  isError: boolean;
  error: string;
  @Input() blog: Blog;

  blogForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    subTitle: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    postDate: new FormControl('', [Validators.required])
  });

  constructor(public activeModal: NgbActiveModal,
              private blogService: BlogService) { }

  ngOnInit(): void {
    this.isError = false;
    this.blogForm.setValue({
      title: this.blog.title,
      subTitle: this.blog.subTitle,
      text: this.blog.text,
      postDate: this.convertDate(this.blog.postDate)}
    );
  }

  onSubmit() {
    const blogData = {
      'id': this.blog.id,
      'title': this.blogForm.value.title,
      'subTitle': this.blogForm.value.subTitle,
      'text': this.blogForm.value.text,
      'postDate': new DatePipe('en-US').transform(this.blogForm.value.postDate, 'dd.MM.yyyy'),
    };
    this.blogService.updateBlog(blogData).subscribe(
        data => {
          this.activeModal.close();
          location.reload();
        },
        error => {
          this.isError = true;
          this.error = error['error']['error'];
        });
  }

  convertDate(date: string) {
    const [day, month, year] = date.split('.');
    return year + '-' + month + '-' + day;
  }

}
