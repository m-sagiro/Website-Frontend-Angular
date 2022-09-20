import { Component, OnInit } from '@angular/core';
import {TestService} from '../test.service';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private testService: TestService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  getUsers() {
    // this.testService.getAllUsers().subscribe(
    //     data => {
    //       console.log(data);
    //     }
    // );
    this.authenticationService.refreshToken(localStorage.getItem('refresh_token')).subscribe(
        data => {
          console.log(data);
        }
    );
  }

  getGet() {
    this.authenticationService.refreshToken(localStorage.getItem('refresh_token')).subscribe(
        data => {
          console.log('click');
          console.log(data);
        }
    );
  }

}
