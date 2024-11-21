import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoPipe } from '@jsverse/transloco';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EmailService } from '../../../services/email.service';


@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [
    TranslocoPipe,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    FloatLabelModule,
  ],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss',
})
export class ContactMeComponent {
  public form = signal<FormGroup | undefined>(undefined);

  constructor(private _fb: FormBuilder, private _emailService: EmailService) {
    this.form.set(this._buildForm());
  }

  private _buildForm() {
    return this._fb.group({
      name: [null, Validators.required],
      // email: [null, [Validators.email, Validators.required]],
      body: [null, Validators.required],
    });
  }
  public onSubmit() {
    if (this.form()?.valid) {
      const formData = this.form()?.getRawValue();
      //TODO DA RIVEDERE LA COSTRUZIONE
      // this._emailService.sendEmail(
      //   formData.name,
      //   formData.body
      // );

      const email = 'lorisparata@gmail.com';
      const subject = 'LRS_Design - Messaggio da ' + formData.name;

      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formData.body)}`;

      // Apri il link per inviare l'email
      window.location.href = mailtoLink;
    }
  }
}
