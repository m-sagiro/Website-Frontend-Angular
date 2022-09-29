import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

export interface Mail {
  name: String;
  text: string;
  email: String;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendMail(mail: Mail, token: string) {
    const params = new HttpParams().set('g-recaptcha-response', token);
    return this.http.post('/api/email/send', mail, {'params': params});
  }
}
