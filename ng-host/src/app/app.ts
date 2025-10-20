// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { NxWelcome } from './nx-welcome';

// @Component({
//   imports: [NxWelcome, RouterModule],
//   selector: 'app-root',
//   templateUrl: './app.html',
//   styleUrl: './app.css',
// })
// export class App {
//   protected title = 'ng-host';
// }
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    document.addEventListener('taskSelected', (e: any) => {
      console.log('Angular caught task from React:', e.detail);
    });
  }
}
