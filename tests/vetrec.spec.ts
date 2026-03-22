import { test, expect } from '@playwright/test';
import { VetRecPage } from './helpers/vetrecPage';

const USERNAME = 'cefit.pablo@gmail.com'
//process.env.VETREC_USER ?? 'your_username';
const PASSWORD = 'VetRecQA!'
//process.env.VETREC_PASS ?? 'your_password';

// Path to a .webm file used for upload. Replace with a real file for real tests.
const SAMPLE_WEBM = 'tests\\fixtures\\InputSound.webm'


test.describe('VetRec app', () => {
  test('can login, grant microphone, upload file, and validate history URL', async ({ page }) => {
    const vetRec = new VetRecPage(page);

    await vetRec.goto();

    // Login flow (update selectors as needed)
    await vetRec.login(USERNAME, PASSWORD); 

    // Grant microphone permission for this test run.
    // This is usually needed when the app prompts for microphone access.
    await vetRec.grantMicrophonePermission();

    // Upload a webm file.
    const nameOfPet = 'Joy';
    await vetRec.uploadWebmFile('#dropzone-file', SAMPLE_WEBM, nameOfPet);

    // Assertion that the URL includes the session history path.
    await expect(page).toHaveURL(/\/history\?session_id=/);

    // Assertion that the date is correctly and status IN PROGRESS
    const taskItem = page.locator('li').filter({ hasText: 'Joey' }).first();
    const statusElement = taskItem.locator('span.inline-flex.items-center.rounded-full');
    const statusText = await statusElement.textContent();
    const dateElement = 'p.text-xs.whitespace-nowrap.text-gray-600';
    const isValid = await vetRec.validateDate(dateElement);
    
    expect(isValid).toBe(true);
    expect(statusText?.toUpperCase()).toBe('IN PROGRESS');


    //Move to Transcipt
    const  selectorToList = '//*[@id="headlessui-listbox-button-:r2b:"]';
    //const StatusCompleted = page.getByText('Completed');
    //const statusTextCompleted = await statusElement.textContent();
    
    await vetRec.switchToTranscript(selectorToList);
    expect(statusText?.toUpperCase()).toBe('COMPLETED');

  });
});
