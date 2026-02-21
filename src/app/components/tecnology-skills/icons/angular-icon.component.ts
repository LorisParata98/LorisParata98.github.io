import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-icon',
  standalone: true,
  template: `
    <svg width="256" height="256" fill="none" viewBox="0 0 48 48">
      <title>Angular</title>
      <path
        d="M43.6,9,24.3,2.1h-.6L4.3,9c-.3.1-.3.3-.3.6S6.6,32.7,6.9,35.9a.5.5,0,0,0,.4.6l16.3,9.4c.3.1.5.2.7,0l16.4-9.4a1,1,0,0,0,.4-.5c.3-2.6,2.7-24.5,2.9-26.6C44.1,9.1,43.8,9.1,43.6,9ZM36.3,34.2H32.4a.5.5,0,0,1-.6-.4L29.7,28a.5.5,0,0,0-.6-.4H18.8c-.3,0-.4.1-.5.4l-2.1,5.7c-.2.4-.3.5-.7.5H11.2C15.5,24.7,19.7,15.3,24,5.8L36.7,34.1Z"
      />
      <path d="M27.8,23.8H20.2c1.2-3,2.5-6,3.8-9Z" />
    </svg>
  `,
})
export class AngularIconComponent {}
