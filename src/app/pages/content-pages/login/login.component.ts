import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {shareReplay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus: any;
  focus1: any;
  existingError: boolean;
  error: string;
  submitAttempt: boolean;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    this.submitAttempt = false;
    this.existingError = false;
    if (this.location.getState()['error']) {
      this.existingError = true;
      this.error = this.location.getState()['error'];
    }
  }

  onSubmit() {
    const loginData = new FormData();
    loginData.append('username', this.loginForm.value.username);
    loginData.append('password', this.loginForm.value.password);

    this.submitAttempt = true;

    this.authenticationService.login(loginData).subscribe(
        data => {
          this.authenticationService.setSession(data);
          this.router.navigate(['/home']);
        },
        error => {
          this.submitAttempt = false;
          this.existingError = true;
          this.error = error['error']['error'];
        }
    );
  }

}
