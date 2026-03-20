import type { Page } from '@playwright/test';

export class VetRecPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the base application URL.
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Perform username/password login.
   *
   * Update selectors to match the real login form.
   */
  async login(username: string, password: string) {
    
    await this.page.getByPlaceholder('Enter your email address').fill('cefit.pablo@gmail.com');
    await this.page.getByRole('button', { name: /continue/i }).click();
    await this.page.getByPlaceholder('Enter your password').fill('VetRecQA!');
    await this.page.getByRole('button', { name: /continue/i }).click();


    /*await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
    **/
  }


  /**
   * Grant microphone permission for the current context.
   */
  /**async grantMicrophonePermission() {
     debugger;
    await this.page.context().grantPermissions(['microphone'], { origin: this.page.url() });
  }
    */

  /**
   * Upload a .webm file using an <input type="file"> element.
   */
  async uploadWebmFile(fileInputSelector: string, filePath: string) {

    await this.page.getByRole('tab', { name: 'Upload' }).click();
    await this.page.setInputFiles('#dropzone-file', 'tests\fixtures\InputSound.webm');
    await this.page.getByRole('button', { name: /Upload/i }).click();


    await this.page.setInputFiles(fileInputSelector, filePath);
  }

  /**
   * Choose an option from a list/dropdown.
   *
   * @param listSelector Selector for the list container (e.g. a <select> or custom dropdown trigger).
   * @param optionText Visible text of the option to choose.
   */
  async chooseOptionFromList(listSelector: string, optionText: string) {
    await this.page.click(listSelector);
    await this.page.click(`text=${optionText}`);
  }

  /**
   * Click a button by selector.
   */
  async clickButton(selector: string) {
    await this.page.click(selector);
  }

  /**
   * Get visible text from a selector.
   */
  async getText(selector: string) {
    return await this.page.textContent(selector);
  }
}
