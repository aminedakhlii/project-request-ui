import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ProjectRequestServicesSectionComponent } from '../shared/project-request-services-section/project-request-services-section.component';
import {
  APPOINTMENT_HOURS,
  HEAR_ABOUT_US_OPTIONS,
  getDefaultServiceSelections
} from '../core/project-request-services.config';

/**
 * UI-only snapshot of the DFS project-request form.
 * Backend / Firebase / SMS / zip lookup are stubbed for design iteration.
 */
@Component({
  selector: 'app-project-request-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ProjectRequestServicesSectionComponent
  ],
  providers: [provideNativeDateAdapter()],
  host: {
    '[class.embed-root]': 'treatAsEmbedded'
  },
  template: `
<div class="form-page" [class.embed]="treatAsEmbedded">
      <div class="form-container">
        <header class="form-header" *ngIf="!treatAsEmbedded">
          <h1>Project Request</h1>
          <p>Submit your information and we'll get back to you soon.</p>
        </header>
        <div id="recaptcha-container-project-request" #recaptchaContainer class="recaptcha-container"></div>

        <div *ngIf="requestSubmitted" class="card form-card embed-success-card">
          <h2>{{ treatAsEmbedded ? 'Appointment Request Received' : 'Request Submitted' }}</h2>
          <p>
            {{
              treatAsEmbedded
                ? 'Thank you. Your project request and appointment details were submitted successfully. Our team will review everything and follow up shortly.'
                : successMessage
            }}
          </p>
          <div class="app-download">
            <p class="app-download-title">Download the app</p>
            <p class="muted-note">
              Get live project updates, messages, and appointments on your phone.
            </p>
            <div class="store-badges">
              <a
                class="store-badge-link"
                [href]="playStoreUrl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play">
                <img
                  class="store-badge"
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  width="180"
                  height="70" />
              </a>
              <a
                class="store-badge-link"
                [href]="appStoreUrl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store">
                <img
                  class="store-badge store-badge-apple"
                  src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
                  alt="Download on the App Store"
                  width="156"
                  height="52" />
              </a>
            </div>
          </div>
          <ng-container *ngIf="treatAsEmbedded; else nonEmbedActions">
            <p class="muted-note">
              You can also track your application from the platform using the secure link below.
              Please sign in with your phone number.
            </p>
            <button type="button" class="btn btn-primary" (click)="openTrackingPortal()">
              Open Platform in a New Tab
            </button>
          </ng-container>
          <ng-template #nonEmbedActions>
            <button type="button" class="btn btn-primary" (click)="goToMyProjects()">
              Go to My Projects
            </button>
          </ng-template>
        </div>

        <form *ngIf="!requestSubmitted" class="card form-card" (ngSubmit)="onSubmit()" (focusout)="onDraftFieldBlur()" (change)="onDraftFieldChange()" #f="ngForm">

          <div class="form-section location-consent-section">
            <h3>Share your location (optional)</h3>
            <p class="field-hint">
              Helps us see which areas visitors are coming from. We estimate your city from your
              IP address only if you agree — no GPS or browser location permission required.
            </p>
            <div class="form-group consent-checkbox">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  [(ngModel)]="agreeLocationShare"
                  name="agreeLocationShare"
                  (ngModelChange)="onLocationConsentChange($event)">
                <span class="consent-title">Yes, share my approximate location for this visit</span>
              </label>
              <p class="consent-disclaimer" *ngIf="locationStatus === 'pending'">Looking up approximate location…</p>
              <p class="consent-disclaimer location-ok" *ngIf="locationStatus === 'granted' && locationLabel">
                Approximate location: {{ locationLabel }}
              </p>
              <p class="consent-disclaimer location-err" *ngIf="locationStatus === 'denied'">
                Could not estimate location from your network. You can still submit the form.
              </p>
            </div>
          </div>

          <div class="form-section">
            <h3>Your Information</h3>
            <div class="form-row">
              <div class="form-group">
                <input type="text" class="form-control" [(ngModel)]="firstName" name="firstName" required placeholder="First name *">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" [(ngModel)]="lastName" name="lastName" required placeholder="Last name *">
              </div>
            </div>
            <div class="form-group">
              <input type="email" class="form-control" [(ngModel)]="email" name="email" required placeholder="Email *">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" [(ngModel)]="yourAddress.streetAddress" name="street" required placeholder="Street address *">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" [(ngModel)]="yourAddress.addressLine2" name="line2" placeholder="Address line 2">
            </div>
            <div class="form-row">
              <div class="form-group">
                <input type="text" class="form-control" [(ngModel)]="yourAddress.city" name="city" required placeholder="City *">
              </div>
              <div class="form-group">
                <select class="form-control" [(ngModel)]="yourAddress.state" name="state" required>
                  <option value="">State *</option>
                  <option *ngFor="let s of states" [value]="s">{{ s }}</option>
                </select>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" [(ngModel)]="yourAddress.zipCode" name="zipCode" required placeholder="Zip code *" (ngModelChange)="onZipOrProjectZipChange()">
              </div>
            </div>
            <label class="checkbox-single">
              <input type="checkbox" [(ngModel)]="projectAddressDifferent" name="projectAddressDifferent" (ngModelChange)="onZipOrProjectZipChange()">
              Project address different from your address
            </label>
            <div *ngIf="projectAddressDifferent" class="project-address-fields">
              <h4>Project Address</h4>
              <div class="form-group">
                <input type="text" class="form-control" [(ngModel)]="projectAddress.line1" name="projectLine1" required placeholder="Street address *">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" [(ngModel)]="projectAddress.addressLine2" name="projectLine2" placeholder="Address line 2">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <input type="text" class="form-control" [(ngModel)]="projectAddress.city" name="projectCity" required placeholder="City *">
                </div>
                <div class="form-group">
                  <select class="form-control" [(ngModel)]="projectAddress.state" name="projectState" required>
                    <option value="">State *</option>
                    <option *ngFor="let s of states" [value]="s">{{ s }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" [(ngModel)]="projectAddress.postalCode" name="projectPostalCode" required placeholder="Zip code *" (ngModelChange)="onZipOrProjectZipChange()">
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Services *</h3>
            <app-project-request-services-section [selections]="serviceSelections"></app-project-request-services-section>
          </div>

          <div class="form-section">
            <div class="form-group">
              <textarea class="form-control" [(ngModel)]="project.description" name="details" rows="4" placeholder="Additional information"></textarea>
            </div>
          </div>

          <div class="form-section">
            <div class="form-group">
              <label class="form-label">Photos of the current space (optional)</label>
              <p class="field-hint">Add pictures of the area as it looks today — this helps us prepare for your consultation.</p>
              <input #conditionPhotoInput type="file" class="visually-hidden-input" (change)="onConditionPhotosSelected($event)" multiple accept="image/*">
              <button type="button" class="btn btn-outline add-photos-btn" (click)="conditionPhotoInput.click()">
                <span class="material-icons">add_a_photo</span>
                Add photos
              </button>
              <div class="photo-previews" *ngIf="conditionPhotoPreviews.length">
                <div class="photo-preview" *ngFor="let preview of conditionPhotoPreviews; let i = index">
                  <img [src]="preview" alt="Photo of current space">
                  <button type="button" class="photo-remove" (click)="removeConditionPhoto(i)" aria-label="Remove photo">
                    <span class="material-icons">close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Book an Appointment *</h3>
            <p class="appt-calendar-hint">The earliest opening is two days from today. Dates closed by the business are not available. Each booked time blocks that hour plus the two hours before and after (within our scheduling window).</p>
            <div class="form-row appointment-row">
              <div class="form-group appointment-date-field">
                <mat-form-field appearance="outline" subscriptSizing="dynamic" class="appointment-mat-field">
                  <mat-label>Date *</mat-label>
                  <input
                    matInput
                    [matDatepicker]="apptPicker"
                    [(ngModel)]="appointmentDateValue"
                    (ngModelChange)="onAppointmentDateChange()"
                    [min]="minApptDate"
                    [matDatepickerFilter]="filterAppointmentDate"
                    name="appointmentDate"
                    required
                    autocomplete="off">
                  <mat-datepicker-toggle matIconSuffix [for]="apptPicker"></mat-datepicker-toggle>
                  <mat-datepicker #apptPicker></mat-datepicker>
                </mat-form-field>
              </div>
              <div class="form-group">
                <label class="form-label">Time *</label>
                <select class="form-control" [(ngModel)]="appointmentTime" name="appointmentTime" required>
                  <option value="">Time *</option>
                  <option *ngFor="let h of availableAppointmentHours" [value]="h.value">{{ h.label }}</option>
                </select>
              </div>
            </div>
          </div>


          <div class="form-section">
            <div class="form-group">
              <select class="form-control" [(ngModel)]="hearAboutUs" name="hearAboutUs" (ngModelChange)="onHearAboutUsChange()">
                <option value="">How did you hear about us?</option>
                <option *ngFor="let opt of hearAboutUsOptions" [value]="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="form-group referral-fields" *ngIf="hearAboutUs === 'referral'">
              <p class="step-desc">Who referred you? (optional — their contact lets us send them a gift card)</p>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Referrer full name</label>
                  <input type="text" class="form-control" [(ngModel)]="referrerName" name="referrerName" placeholder="Full name" autocomplete="name" (blur)="onDraftFieldBlur()">
                </div>
                <div class="form-group">
                  <label class="form-label">Referrer phone</label>
                  <input type="tel" class="form-control" [(ngModel)]="referrerPhone" name="referrerPhone" placeholder="Phone number" (blur)="onDraftFieldBlur()">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Referrer email</label>
                <input type="email" class="form-control" [(ngModel)]="referrerEmail" name="referrerEmail" placeholder="Email address" autocomplete="off" (blur)="onDraftFieldBlur()">
              </div>
            </div>
          </div>

          <div class="form-section consent-section">
            <h3>SMS consent (required)</h3>
            <div class="form-group consent-checkbox">
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="agreeSmsCode" name="agreeSmsCode" required>
                <span class="consent-title">Yes, I agree to receive a one-time code via SMS</span>
              </label>
              <p class="consent-disclaimer">By checking this box, I agree to receive a one-time verification code from DFS In-Home Services via SMS. Message frequency is limited to one-time code. Message and data rates may apply. Reply STOP to cancel or HELP for help.</p>
            </div>
            <div class="form-group consent-checkbox">
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="agreeSmsNotifications" name="agreeSmsNotifications" required>
                <span class="consent-title">Yes, please text me notifications</span>
              </label>
              <p class="consent-disclaimer">By checking this box, I agree to receive appointment confirmations and reminders from DFS In-Home Services via SMS. Message frequency varies by appointment. Message and data rates may apply. Reply STOP to stop or HELP for help. Terms and conditions apply.</p>
            </div>
          </div>

          <div class="form-section">
            <h3>Verify your phone</h3>
            <p class="step-desc">We'll send a verification code to your phone. You must verify before submitting.</p>
            <div class="form-group">
              <label class="form-label">Mobile number *</label>
              <input type="tel" class="form-control" [(ngModel)]="phone" name="phoneVerify" required placeholder="e.g. 5551234567 or +15551234567" [readonly]="phoneVerified || isPhoneLocked" (ngModelChange)="onPhoneInputChange()">
              <p *ngIf="isPhoneLocked" class="phone-lock-hint">You can change this number or resend the code in {{ phoneLockSecondsLeft }}s.</p>
            </div>
            <div class="form-group" *ngIf="!codeSent && !phoneVerified">
              <button type="button" class="btn btn-primary" (click)="sendCode()" [disabled]="sendingCode || isPhoneLocked || !phone?.trim() || !agreeSmsCode || !agreeSmsNotifications">
                {{ sendingCode ? 'Sending...' : 'Send verification code' }}
              </button>
            </div>
            <div class="form-group" *ngIf="codeSent && !phoneVerified && !isPhoneLocked">
              <button type="button" class="btn btn-outline" (click)="sendCode()" [disabled]="sendingCode || !phone?.trim() || !agreeSmsCode || !agreeSmsNotifications">
                {{ sendingCode ? 'Sending...' : 'Resend verification code' }}
              </button>
            </div>
            <div class="form-group" *ngIf="codeSent && !phoneVerified">
              <label class="form-label">Verification code</label>
              <input type="text" class="form-control" [(ngModel)]="verificationCode" name="verificationCode" placeholder="Enter 6-digit code" maxlength="6" inputmode="numeric">
              <button type="button" class="btn btn-primary" style="margin-top: 8px;" (click)="verifyCode()" [disabled]="verifying || !verificationCode?.trim()">
                {{ verifying ? 'Verifying...' : 'Verify' }}
              </button>
            </div>
            <p *ngIf="phoneVerified" class="success-message">Phone verified. Fill in the rest of the form and submit.</p>
          </div>

          <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="submitting || !phoneVerified || !agreeSmsCode || !agreeSmsNotifications">
              {{ submitting ? 'Submitting...' : 'Submit' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`

    :host.embed-root {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
    .form-page {
      min-height: 100vh;
      padding: 24px;
      background: var(--bg-secondary, #f5f5f5);
    }
    /* Embedded (iframe / ?embed=1): no outer gutter — only the white form card is visible */
    .form-page.embed {
      padding: 0;
      margin: 0;
      min-height: auto;
      background: transparent;
    }
    .form-container {
      max-width: 640px;
      margin: 0 auto;
    }
    .form-page.embed .form-container {
      max-width: none;
      width: 100%;
      margin: 0;
      padding: 0;
    }
    .form-header {
      margin-bottom: 24px;
      text-align: center;
    }
    .form-header h1 {
      font-size: 28px;
      margin-bottom: 8px;
    }
    .form-header p {
      color: var(--text-secondary);
    }
    .form-card {
      padding: 24px;
    }
    .form-section {
      margin-bottom: 28px;
    }
    .form-section h3 {
      font-size: 18px;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-light);
    }
    .form-section h4 {
      font-size: 14px;
      margin: 12px 0 8px;
    }
    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 16px;
    }
    .form-group {
      margin-bottom: 16px;
    }
    .form-label {
      display: block;
      font-weight: 600;
      margin-bottom: 6px;
      font-size: 14px;
    }
    .form-control {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--border-light);
      border-radius: 8px;
      font-size: 14px;
    }
    .field-hint {
      font-size: 13px;
      color: var(--text-secondary);
      margin: 0 0 10px;
    }
    .visually-hidden-input {
      display: none;
    }
    .add-photos-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border: 1px dashed var(--border-light, #ccc);
      border-radius: 8px;
      background: var(--bg-secondary, #f9f9f9);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .add-photos-btn .material-icons {
      font-size: 18px;
    }
    .photo-previews {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 12px;
    }
    .photo-preview {
      position: relative;
      width: 96px;
      height: 96px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--border-light, #ddd);
    }
    .photo-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .photo-remove {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 22px;
      height: 22px;
      border: none;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
    }
    .photo-remove .material-icons {
      font-size: 14px;
    }
    .checkbox-group {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 8px;
    }
    .checkbox-group label, .checkbox-single {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .checkbox-single {
      margin-bottom: 12px;
    }
    .project-address-fields {
      margin-top: 12px;
      padding: 16px;
      background: var(--bg-secondary, #f9f9f9);
      border-radius: 8px;
    }
    .error-message {
      color: #c62828;
      margin-bottom: 12px;
    }
    .success-message {
      color: #2e7d32;
      margin-bottom: 12px;
    }
    .form-actions {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid var(--border-light);
    }
    .btn {
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
    .btn-primary {
      background: var(--primary-color, #1976d2);
      color: white;
    }
    .btn-primary:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .step-desc {
      color: var(--text-secondary);
      font-size: 14px;
      margin: 8px 0;
    }
    .consent-section {
      border: 1px solid var(--border-light);
      border-radius: 8px;
      padding: 16px;
      background: var(--bg-secondary, #fafafa);
    }
    .consent-checkbox {
      margin-bottom: 20px;
    }
    .consent-checkbox:last-child {
      margin-bottom: 0;
    }
    .consent-checkbox .checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
    }
    .consent-checkbox .checkbox-label input {
      margin-top: 3px;
      flex-shrink: 0;
    }
    .consent-title {
      flex: 1;
    }
    .consent-disclaimer {
      margin: 8px 0 0 28px;
      font-size: 12px;
      color: var(--text-secondary);
      line-height: 1.4;
    }
    .location-consent-section {
      background: #f7f9fc;
      border: 1px solid var(--border-light, #e5e7eb);
      border-radius: 10px;
      padding: 14px 16px;
    }
    .location-ok { color: #2e7d32; }
    .location-err { color: #a4262c; }
    .recaptcha-container {
      position: absolute;
      left: -9999px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    .embed-success-card h2 {
      margin: 0 0 12px;
      font-size: 26px;
      color: var(--primary-color);
    }
    .embed-success-card p {
      margin-bottom: 12px;
      color: var(--text-secondary);
      line-height: 1.5;
    }
    .embed-success-card .muted-note {
      font-size: 13px;
    }
    .app-download {
      margin: 20px 0 8px;
      padding: 16px;
      border-radius: 12px;
      background: #f7f9fc;
      border: 1px solid var(--border-light, #e5e7eb);
      text-align: center;
    }
    .app-download-title {
      margin: 0 0 4px;
      font-size: 18px;
      font-weight: 700;
      color: var(--text-primary, #1a1a1a);
    }
    .store-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 12px;
      justify-content: center;
      align-items: center;
      margin-top: 12px;
    }
    .store-badge-link {
      display: inline-flex;
      line-height: 0;
    }
    .store-badge {
      display: block;
      height: 56px;
      width: auto;
      object-fit: contain;
    }
    .store-badge-apple {
      height: 48px;
    }
    .appt-calendar-hint {
      margin: -4px 0 12px;
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.45;
    }
    .appointment-mat-field { width: 100%; }
    .appointment-row .form-group { margin-bottom: 0; }
    .phone-lock-hint {
      margin: 6px 0 0;
      font-size: 12px;
      color: var(--text-secondary, #666);
    }
    .btn-outline {
      background: transparent;
      color: #1976d2;
      border: 1px solid #1976d2;
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-outline:disabled { opacity: 0.6; cursor: not-allowed; }
  `]
})
export class ProjectRequestFormComponent {
  treatAsEmbedded = false;
  requestSubmitted = false;
  successMessage = 'Thank you. We received your project request.';
  playStoreUrl = 'https://play.google.com/store';
  appStoreUrl = 'https://apps.apple.com/';

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  agreeLocationShare = false;
  locationStatus: 'idle' | 'pending' | 'granted' | 'denied' = 'idle';
  locationLabel = '';
  states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
    'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];
  yourAddress = { streetAddress: '', addressLine2: '', city: '', state: '', zipCode: '' };
  projectAddressDifferent = false;
  projectAddress = { line1: '', addressLine2: '', city: '', state: '', postalCode: '' };
  serviceSelections = getDefaultServiceSelections();
  project = { description: '' };
  conditionPhotoPreviews: string[] = [];
  appointmentDateValue: Date | null = null;
  appointmentTime = '';
  availableAppointmentHours = APPOINTMENT_HOURS;
  minApptDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    d.setHours(0, 0, 0, 0);
    return d;
  })();
  hearAboutUs = '';
  hearAboutUsOptions = HEAR_ABOUT_US_OPTIONS;
  referrerName = '';
  referrerPhone = '';
  referrerEmail = '';
  agreeSmsCode = false;
  agreeSmsNotifications = false;
  phoneVerified = false;
  codeSent = false;
  sendingCode = false;
  verifying = false;
  verificationCode = '';
  isPhoneLocked = false;
  phoneLockSecondsLeft = 0;
  errorMessage = '';
  submitting = false;

  filterAppointmentDate = (d: Date | null): boolean => {
    if (!d) return false;
    return d >= this.minApptDate;
  };

  onLocationConsentChange(_v: boolean): void {
    if (this.agreeLocationShare) {
      this.locationStatus = 'granted';
      this.locationLabel = 'Demo City, ST (mocked)';
    } else {
      this.locationStatus = 'idle';
      this.locationLabel = '';
    }
  }
  onZipOrProjectZipChange(): void {}
  onDraftFieldBlur(): void {}
  onDraftFieldChange(): void {}
  onAppointmentDateChange(): void {}
  onHearAboutUsChange(): void {}
  onPhoneInputChange(): void {}
  onConditionPhotosSelected(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const files = Array.from(input.files || []);
    for (const f of files) {
      const url = URL.createObjectURL(f);
      this.conditionPhotoPreviews = [...this.conditionPhotoPreviews, url];
    }
    input.value = '';
  }
  removeConditionPhoto(i: number): void {
    this.conditionPhotoPreviews = this.conditionPhotoPreviews.filter((_, idx) => idx !== i);
  }
  sendCode(): void {
    this.sendingCode = true;
    setTimeout(() => {
      this.sendingCode = false;
      this.codeSent = true;
    }, 400);
  }
  verifyCode(): void {
    this.verifying = true;
    setTimeout(() => {
      this.verifying = false;
      this.phoneVerified = true;
    }, 400);
  }
  onSubmit(): void {
    if (!this.phoneVerified) {
      this.errorMessage = 'Verify your phone first (UI demo).';
      return;
    }
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.requestSubmitted = true;
    }, 500);
  }
  openTrackingPortal(): void {}
  goToMyProjects(): void {
    this.requestSubmitted = false;
  }
}
