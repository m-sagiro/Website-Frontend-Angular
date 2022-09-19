import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BlogService, BlogSet} from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public error: string;
  public blogSet: BlogSet;

  constructor(private blogService: BlogService,
              private router: Router) { }

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe(
        (data) => {
            // this.blogSet = data;
            // alert(this.blogSet);
            // console.log(this.blogSet);
            console.log(data);
        },
        error => {
            console.log(error);
          // this.error = error['error']['error'];
          // this.router.navigate(['/entry'], {state: {'error': this.error}});
        }
    );
  }

}
