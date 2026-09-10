// pages/loginPage.ts
import {Page,Locator} from '@playwright/test';  
import { BasePage } from './basePage';


export class LoginPage extends BasePage {
    
    // Locators
    emailInput = this.page.locator('#login-email');
    passwordInput = this.page.locator('#login-password');
    loginSubmitButton = this.page.locator('#login-submit');
    loginButton = this.page.getByRole('button', { name: 'Login' });
    homePageHeading = this.page.getByRole('heading', { name: /Welcome back/ });
    signUpLink = this.page.locator('#signup-toggle')

    // Actions
    
    async clickLogin() {
        await this.waitAndClick(this.loginButton);
    }

    async enterEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password: string){
        await this.passwordInput.fill(password);
    }

    async clickLoginSubmitButton(){
        await this.waitAndClick(this.loginSubmitButton);
        //await this.loginSubmitButton.click();
    }

    async verifyPageHeading(){
        await this.verifyElementVisible(this.homePageHeading);
    }

    async clickSignUpLink(){
        await this.waitAndClick(this.signUpLink);
    }
}