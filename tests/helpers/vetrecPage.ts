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
    
    await this.page.getByPlaceholder('Enter your email address').fill(username);
    await this.page.getByRole('button', { name: /continue/i }).click();
    await this.page.getByPlaceholder('Enter your password').fill(password);
    await this.page.getByRole('button', { name: /continue/i }).click();


    /*await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
    **/
  }


  /**
   * Grant microphone permission for the current context.
   */
  async grantMicrophonePermission() {
     debugger;
    await this.page.context().grantPermissions(['microphone'], { origin: this.page.url() });
  }
    

  /**
   * Upload a .webm file using an <input type="file"> element.
   */
  async uploadWebmFile(fileInputSelector: string, filePath: string, namePet: string) {
    await this.page.getByPlaceholder('Mr. Wiggles (optional)').fill(namePet);
    await this.page.getByRole('tab', { name: 'Upload' }).click();
    await this.page.setInputFiles(fileInputSelector, filePath);
    await this.page.getByRole('button', { name: /Upload/i }).click();
    await this.page.getByRole('button', { name: /Process/i }).click();

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
   * Get date of Mapple and validate.
   */
  async validateDate(DateOfName: string): Promise<boolean> {

    const dateElement = this.page.locator(DateOfName);
    const DateText = await dateElement.textContent();
    const DateGet = DateText?.split(',')[0];
    const today = new Date();
    const DateToday = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    
    return DateGet === DateToday;
}
   /**
   * Get visible text from a selector.
   */
  async getText(selector: string) {
    return await this.page.textContent(selector);
  }

  /**
   * Upload a .webm file using an <input type="file"> element.
   */
  async switchToTranscript(Selector: string) {

    await this.page.getByRole('tab', { name: 'Transcript' }).click();
    await this.chooseOptionFromList(Selector, 'Completed');
   

  }
}
