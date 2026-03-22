import { test, expect } from '@playwright/test';
import { VetRecPage } from './helpers/vetrecPage';

const USERNAME = 'cefit.pablo@gmail.com'
//process.env.VETREC_USER ?? 'your_username';
const PASSWORD = 'VetRecQA!'
//process.env.VETREC_PASS ?? 'your_password';

// Path to a .webm file used for upload.
const SAMPLE_WEBM = 'tests\\fixtures\\InputSound.webm'

//Ability to manage page
let vetRec: VetRecPage;
test.beforeEach(async ({ page }) => {
    
      vetRec = new VetRecPage(page);

      await vetRec.goto();
      // Login with provided credentials.
      await vetRec.login(USERNAME, PASSWORD);
});


test.describe('VetRec app', () => {
  test('Can login and grant microphone', async ({ page }) => {
    
    // Grant microphone permission for this test run.
    await vetRec.grantMicrophonePermission();
    });
    
  test('Can upload file, and validate history URL', async ({ page }) => {
    const nameOfPet = 'Joey';
    await vetRec.uploadWebmFile('#dropzone-file', SAMPLE_WEBM, nameOfPet);
    const sessionId = await vetRec.getSessionId();
    

    // Assertion that the URL includes the session history path.
    await expect(page).toHaveURL(new RegExp(`/history\\?session_id=${sessionId}&tab=notes`));

    // Assertion that the date is correctly and status IN PROGRESS
    const taskItem = page.locator('li').filter({ hasText: nameOfPet }).first();
    const statusElement = taskItem.locator('span.inline-flex.items-center.rounded-full');
    const statusText = await statusElement.textContent();
    const dateElement = 'p.text-xs.whitespace-nowrap.text-gray-600';
    const isValid = await vetRec.validateDate(dateElement);
    
    expect(isValid).toBe(true);
    expect(statusText?.toUpperCase()).toBe('IN PROGRESS');

    //Move to Transcipt
    const  selectorToList = '//*[@id="headlessui-listbox-button-:r2b:"]';
    
    await vetRec.switchToTranscript(selectorToList);

    //Assercion is completed
    await expect(statusElement).toHaveText('COMPLETED', { timeout: 30000 });
    expect(statusText?.toUpperCase()).toBe('COMPLETED');

  });
});
