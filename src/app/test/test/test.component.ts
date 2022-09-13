import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TestService} from '../test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private testService: TestService) { }

  ngOnInit(): void {
  }

  getUsers() {
    this.testService.getAllUsers().subscribe(
        data => {
          console.log(data);
        }
    );
  }

}
