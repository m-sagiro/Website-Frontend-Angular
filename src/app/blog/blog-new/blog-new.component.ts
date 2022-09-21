import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-blog-new',
  templateUrl: './blog-new.component.html',
})
export class BlogNewComponent implements OnInit {
  focus: any;
  focus1: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
