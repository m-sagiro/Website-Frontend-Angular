import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus: any;
  focus1: any;
  loginFailed: boolean;
  error: string;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const loginData = new FormData();
    loginData.append('username', this.loginForm.value.username);
    loginData.append('password', this.loginForm.value.password);
    this.authenticationService.login(loginData).subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.loginFailed = true;
          this.error = error['error']['error'];
          this.changeDetector.detectChanges();
        }
    );
  }

}
