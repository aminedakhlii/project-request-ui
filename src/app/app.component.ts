import { Component } from '@angular/core';
import { ProjectRequestFormComponent } from './project-request-form/project-request-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProjectRequestFormComponent],
  template: `
    <div class="preview-shell">
      <aside class="preview-note">
        <strong>UI preview only</strong>
        <p>
          This is a design sandbox of the DFS project-request form. Forms submit to
          mock handlers — no Firebase, SMS, or zip lookup.
        </p>
      </aside>
      <app-project-request-form></app-project-request-form>
    </div>
  `,
  styles: [`
    .preview-shell { min-height: 100vh; }
    .preview-note {
      max-width: 640px;
      margin: 0 auto;
      padding: 16px 20px 0;
      color: #555;
      font-size: 14px;
      line-height: 1.45;
    }
    .preview-note p { margin: 6px 0 0; }
  `]
})
export class AppComponent {}
