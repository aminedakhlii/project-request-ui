# Project Request UI (design sandbox)

Standalone **UI-only** copy of the DFS public **Project Request** form for design iteration.

## What’s included

- Form layout, styles, appointment picker, services accordion, consents, photos, SMS verify UI
- Services section (exterior / interior categories) with static demo config
- Brand logos used in the services headers

## What’s stubbed (not real)

- No Firebase, QuickBooks, SMS, reCAPTCHA, or zip-service-area checks
- Submit / send code / verify are mocked so you can click through the flow

## Run locally

```bash
npm install
npm start
```

Opens `http://localhost:4200/`.

## Edit the UI

- Main form: `src/app/project-request-form/project-request-form.component.ts` (inline template + styles)
- Services block: `src/app/shared/project-request-services-section/`
- Theme tokens: `src/styles.css` (`--primary-color`, etc.)

Please keep changes focused on presentation (layout, typography, spacing, colors, motion). Leave mock handlers as-is unless needed for the redesign.
