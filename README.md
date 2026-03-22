# Playwright TypeScript Framework for VetRec

This repo is a minimal Playwright + TypeScript test framework configured to automate **https://app.vetrec.io/**.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set your credentials as environment variables (recommended):

- `VETREC_USER`
- `VETREC_PASS`

Example (PowerShell):

```powershell
$env:VETREC_USER = "your_username"
$env:VETREC_PASS = "your_password"
```

## Running tests

Run all tests:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run a single test file:

```bash
npx playwright test tests/vetrec.spec.ts
```

## What is included

- Login flow (username/password)
- Granting microphone permission
- Uploading a `.webm` file
- Selecting an option from a list
- Clicking buttons
- Reading text from the page
- Assertion that the URL contains `/history?session_id=<session_id>`
- Assertion of current date
- Assertion of status 'IN PROGRESS/COMPLETED'


