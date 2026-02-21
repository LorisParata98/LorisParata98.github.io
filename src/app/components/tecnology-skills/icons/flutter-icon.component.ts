import { Component } from '@angular/core';

@Component({
  selector: 'app-flutter-icon',
  standalone: true,
  template: `
    <svg width="256" height="256" fill="none" viewBox="0 0 24 24">
      <title>Flutter</title>
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill-rule="nonzero"
        d="M13.503 2.001l-10 10 3.083 3.083 13.08-13.083h-6.163zm-.006 9.198L8.122 16.62 13.494 22h6.189l-5.387-5.4 5.389-5.4h-6.188z"
      />
    </svg>
  `,
})
export class FlutterIconComponent {}
