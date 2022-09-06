import { Component, OnInit } from '@angular/core';

declare function consoleText(words: string, id: string, colors: string): any;


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    consoleText('Hello, I am Müco.', 'hello', 'lightblue');
  }

}
