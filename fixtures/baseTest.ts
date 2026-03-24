import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import {SignUpPage} from '../pages/signUpPage';
import { allure } from 'allure-playwright';

type Fixtures = {
    loginPage: LoginPage;
    signUpPage: SignUpPage;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    signUpPage: async ({ page }, use) => {
        const signUpPage = new SignUpPage(page);
        await use(signUpPage);
    }    
});


test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
        await allure.attachment(
            'Failure Screenshot',
            await page.screenshot({ fullPage: true }),
            'image/png'
        );

        await allure.attachment(
            'Page URL',
            page.url(),
            'text/plain'
        );

        await allure.attachment(
            'Test Details',
            `Status: ${testInfo.status}\nTitle: ${testInfo.title}`,
            'text/plain'
        );
    }
});