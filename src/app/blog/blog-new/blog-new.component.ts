import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {BlogService} from '../blog.service';

@Component({
  selector: 'app-blog-new',
  templateUrl: './blog-new.component.html',
})
export class BlogNewComponent implements OnInit {
  focus: any;
  focus1: any;
  isError: boolean;
  error: string;
  public options: Object = {
    placeholderText: 'Be creative =D',
    charCounterCount: true,
    emoticonsUseImage: false
  };

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
  }

  onSubmit() {
    const blogData = {
      'title': this.blogForm.value.title,
      'subTitle': this.blogForm.value.subTitle,
      'text': this.blogForm.value.text,
      'postDate': new DatePipe('en-US').transform(this.blogForm.value.postDate, 'dd.MM.yyyy'),
    };
    this.blogService.saveBlog(blogData).subscribe(
        data => {
          this.activeModal.close();
          location.reload();
        },
        error => {
          this.isError = true;
          this.error = error['error']['error'];
        }
    );
  }

}
