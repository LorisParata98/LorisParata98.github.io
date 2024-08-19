// src/app/email.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {}

  sendEmail(from: string, subject: string, body: string) {}
}
