import { Component, OnInit } from '@angular/core';
import {ContactService, Mail} from '../contact.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  focus: any;
  focus1: any;
  formSubmitAttempt: boolean;
  formSubmitted: boolean;
  formValidAttempt: boolean;
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required, Validators.minLength(1)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    recaptcha: new FormControl(null, [Validators.required])
  });

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.formSubmitAttempt = false;
    this.formSubmitted = false;
    this.formValidAttempt = false;
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.contactForm.valid) {
      this.formValidAttempt = true;
      const mail: Mail = {
        'name': this.contactForm.value.name,
        'text': this.contactForm.value.text,
        'email': this.contactForm.value.email
      };
      this.contactService.sendMail(mail, this.contactForm.value.recaptcha).subscribe(
          data => {
            this.formSubmitted = true;
          }, error => {
            this.contactForm.setErrors({'error': 'Server error'});
            this.formValidAttempt = false;
          });
    }
  }


  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get text() {
    return this.contactForm.get('text');
  }

  get recaptcha() {
    return this.contactForm.get('recaptcha');
  }

}
