import { test } from '../fixtures/baseTest';
import { signUpData } from '../utils/testData';
import { allure } from 'allure-playwright';
import { expect } from '@playwright/test'

test('SignUp test validuser', async ({ page, signUpPage, loginPage }) => {
    await allure.step('Navigate to login page', async () => {
        await page.goto('/');
    });

    await allure.step('Click login Button', async () => {
        await loginPage.clickLogin();
        await allure.attachment('Login Page', await page.screenshot(), 'image/png');
    });



    await allure.step('Click Signup Link', async () => {
        await loginPage.clickSignUpLink();
    });

    await allure.step('Fill signup form', async () => {
        await signUpPage.fillSignUpForm({
            firstName: signUpData.validSignUp.firstName,
            lastName: signUpData.validSignUp.lastName,
            email: signUpData.validSignUp.email,
            password: signUpData.validSignUp.password,
            confirmpPassword: signUpData.validSignUp.confirmPassword,
            group: signUpData.validSignUp.group
        });
    });


    let alertMessage = '';

    await allure.step('Click create account button and wait for popup', async () => {
        page.once('dialog', async dialog => {
            alertMessage = dialog.message();
            await dialog.accept();
        });

        await signUpPage.clickCreateAccountButton();
        await page.waitForTimeout(500);

        await allure.attachment(
            'Signup Popup Message',
            alertMessage,
            'text/plain'
        );


        await allure.attachment(
            'Popup Screenshot',
            await page.screenshot(),
            'image/png'
        );


        expect(['User with this email already exists', 'Registration submitted successfully. Your account is pending admin approval.']).toContain(alertMessage);
    });



});
