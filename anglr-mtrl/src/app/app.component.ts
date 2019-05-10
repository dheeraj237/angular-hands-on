import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'anglr-mtrl';

  tasks: string[] = [
    "Python",
    "Djnago",
    "Nodejs",
    "SQL",
    "Nodejs",
    "SQL",
    "Nodejs",
    "SQL",
    "Nodejs",
    "SQL",  
    "Angular"
  ]

  sidenavEvent(str) {
    console.log(str)
  }
}
