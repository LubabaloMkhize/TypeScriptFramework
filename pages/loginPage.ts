// pages/loginPage.ts
import { Page, expect } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    // Locators
    emailInput = this.page.locator('#login-email');
    loginButton = this.page.getByRole('button', { name: 'Login' });

    // Actions
    async navigate() {
        await this.page.goto('https://ndosisimplifiedautomation.vercel.app/');
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async enterEmail(email: string) {
        await this.emailInput.fill(email);
    }
}