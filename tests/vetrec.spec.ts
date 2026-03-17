import { test, expect } from '@playwright/test';
import { VetRecPage } from './helpers/vetrecPage';

const USERNAME = process.env.VETREC_USER ?? 'your_username';
const PASSWORD = process.env.VETREC_PASS ?? 'your_password';

// Path to a .webm file used for upload. Replace with a real file for real tests.
const SAMPLE_WEBM = 'tests/fixtures/sample.webm';

test.describe('VetRec app', () => {
  test('can login, grant microphone, upload file, and validate history URL', async ({ page }) => {
    const vetRec = new VetRecPage(page);

    await vetRec.goto();

    // Login flow (update selectors as needed)
    await vetRec.login(USERNAME, PASSWORD);

    // Grant microphone permission for this test run.
    // This is usually needed when the app prompts for microphone access.
    await vetRec.grantMicrophonePermission();

    // Example: upload a webm file.
    await vetRec.uploadWebmFile('input[type="file"]', SAMPLE_WEBM);

    // Example: choose option from a list.
    await vetRec.chooseOptionFromList('css=select', 'Option 1');

    // Example: click a button.
    await vetRec.clickButton('button:has-text("Continue")');

    // Example: read some text from the page.
    const bannerText = await vetRec.getText('h1');
    console.log('Page banner text:', bannerText);

    // Assertion that the URL includes the session history path.
    await expect(page).toHaveURL(/\/history\?session_id=/);
  });
});
