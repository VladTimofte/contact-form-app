import { Injectable } from '@angular/core';
import { init, send } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private serviceId = ''; // Foloseste serviceId din contul tau emailjs si pune-l in acest string gol.
  private templateId = ''; // Foloseste templateId din contul tau emailjs si pune-l in acest string gol.
  private publicKey = '';// Foloseste publicKey din contul tau emailjs si pune-l in acest string gol.
  constructor() {
    // Inițializează EmailJS cu cheia publică
    init(this.publicKey);
  }

  /**
   * Trimite un email folosind EmailJS.
   * @param emailParams Obiect care conține parametrii emailului (ex: destinatari, subiect, mesaj, etc.)
   * @returns O promisiune care se rezolvă când emailul este trimis
   */
  sendEmail(emailParams: any): Promise<any> {
    return send(this.serviceId, this.templateId, emailParams)
      .then(response => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch(error => {
        console.error('Failed to send email:', error);
      });
  }
}