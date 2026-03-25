// pages/signUpPage.ts
import { Page, expect } from '@playwright/test';
import { waitAndClick } from '../utils/helpers';

export class SignUpPage {
    
    constructor(private page: Page) {}

    // Locators
    signUpPageHeading = this.page.getByRole('heading', { name: /Create your account/ });
    firstNameInput = this.page.locator('#register-firstName');
    lastNameInput = this.page.locator('#register-lastName');
    emailInput = this.page.locator('#register-email')
    passwordInput = this.page.locator('#register-password');
    confirmPasswordInput = this.page.locator('#register-confirmPassword');
    registerGroupDdl = this.page.locator('#register-group');
    registerSubmitButton = this.page.locator('#register-submit')

    // Actions

    async verifyPageHeading(){
        await expect(this.signUpPageHeading).toBeVisible();
    }

    async enterFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }   

    async enterLastName(lastName: string) {         
        await this.lastNameInput.fill(lastName);    

    }   

    async enterEmail(email: string) {
        await this.emailInput.fill(email);
    }   

    async enterPassword(password: string){
        await this.passwordInput.fill(password);
    }

    async enterConfirmPassword(confirmPassword: string){
        await this.confirmPasswordInput.fill(confirmPassword);
    }   

    async selectGroup(group: string){
        await this.registerGroupDdl.selectOption(group);
    } 

    async fillSignUpForm(data: {firstName: string;lastName: string;email: string;password: string;confirmpPassword: string;group: string;}) {
         await this.enterFirstName(data.firstName);
         await this.enterLastName(data.lastName);
         await this.enterEmail(data.email);
         await this.enterPassword(data.password);
         await this.enterConfirmPassword(data.confirmpPassword);
         await this.selectGroup(data.group);
    }



    async clickCreateAccountButton(){
        await waitAndClick(this.registerSubmitButton);
        //await this.registerSubmitButton.click();
    }
}