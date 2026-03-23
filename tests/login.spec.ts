import { test } from '../fixtures/baseTest';
import { users } from '../utils/testData';
import { allure } from 'allure-playwright';

test('Login test validuser', async ({ page, loginPage }) => {
    await allure.step('Navigate to login page', async () => {
    await page.goto('/');
    });

    await allure.step('Click login Button', async () => {
    await loginPage.clickLogin();
    });

    await allure.attachment('Login Page',await page.screenshot(),'image/png');

    await allure.step('Enter credentials', async () => {
    await loginPage.enterEmail(users.validUser.email);
    await loginPage.enterPassword(users.validUser.password);
    });

    await allure.step('Click login', async () => {
    await loginPage.clickLoginSubmitButton();
    });

    await allure.step('Verify landing page heading', async () => {
    await loginPage.verifyPageHeading();
    await allure.attachment('Landing Page',await page.screenshot(),'image/png');
    });

    
});

test('Login test invaliduser', async ({ page, loginPage }) => {
    await allure.step('Navigate to login page', async () => {
    await page.goto('/');
    });

    await allure.step('Click login Button from homepage', async () => {
    await loginPage.clickLogin();
    await allure.attachment('Login Page',await page.screenshot(),'image/png');
    });

    

    await allure.step('Enter credentials', async () => {
    await loginPage.enterEmail(users.invalidUser.email);
    await loginPage.enterPassword(users.invalidUser.password);
    });

    await allure.step('Click login submit button', async () => {
    await loginPage.clickLoginSubmitButton();
    });

    await allure.step('Verify landing page heading', async () => {
    //await loginPage.verifyPageHeading();
    await allure.attachment('Login Page Error',await page.screenshot(),'image/png');
    });

    
});