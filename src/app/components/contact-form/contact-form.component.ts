import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      const success = await this.emailService.sendEmail(this.contactForm.value);
      if (success) {
        alert('Mesaj trimis cu succes!');
        this.contactForm.reset(); // Reset form fields
      } else {
        alert('A apărut o eroare la trimiterea mesajului. Te rugăm să încerci din nou.');
      }
    } else {
      this.contactForm.markAllAsTouched()
    }

  }
}
