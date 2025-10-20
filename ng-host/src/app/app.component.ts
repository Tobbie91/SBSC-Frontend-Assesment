import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    document.addEventListener('taskSelected', (e: any) => {
      console.log('Angular caught task from React:', e.detail);
    });
  }
}
