import type { Locator, Page } from '@playwright/test';

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
    await  this.page.getByRole('button', { name: 'Acupuncture SOAP Medical' }).click();
    await this.page.getByRole('button', { name: 'Phone Call - Summary 3/17/26' }).click();
    await this.page.getByRole('button', { name: 'Select language' }).click();
    await this.page.getByRole('menuitem', { name: 'English (UK)' }).click();
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
 async validateDate(dateSelector: string | Locator): Promise<boolean> {
    let DateOfText: string | null = null;
    
    if (typeof dateSelector === 'string') {
        const dateElement = this.page.locator(dateSelector);
        const count = await dateElement.count();
        if (count === 0) {
            console.log('Cant find the date element with selector:', dateSelector);
            return false;
        }
        DateOfText = await dateElement.first().textContent();
    } else {
        // TypeScript ahora sabe que dateSelector es Locator
        const isVisible = await dateSelector.isVisible().catch(() => false);
        if (!isVisible) {
            console.log('Cant view the date element:', dateSelector);
            return false;
        }
        DateOfText = await dateSelector.textContent();
    }
    
    console.log('Date of element:', DateOfText);
    
    if (!DateOfText) {
        return false;
    }
    
    const fechaExtraida = DateOfText.split(',')[0];
    const today = new Date();
    const fechaHoy = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    
    return fechaExtraida === fechaHoy;
}

async switchToTranscript(Selector: string) {

  //await this.page.getByRole('tab', { name: 'Transcript' }).click();
  await this.page.locator('div').filter({ hasText: /^Transcript$/ }).click();
  //await this.page.getByRole('button', { name: /Transcript/i }).click();
  //await this.chooseOptionFromList(Selector, 'Completed');
  await this.page.getByRole('button', { name: 'In Progress' }).click();
  await this.page.getByLabel('In Progress').getByText('Completed').click();
   

  }

}