import { test } from '../fixtures/baseTest';
import { signUpData } from '../utils/testData';
import { allure } from 'allure-playwright';

test('SignUp test validuser', async ({ page, signUpPage,loginPage }) => {
    await allure.step('Navigate to login page', async () => {
    await page.goto('/');
    });

    await allure.step('Click login Button', async () => {
    await loginPage.clickLogin();
    await allure.attachment('Login Page',await page.screenshot(),'image/png');
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


    await allure.step('Click create account button', async () => {
    await signUpPage.clickCreateAccountButton();
    await allure.attachment('Account Created',await page.screenshot(),'image/png');
    });

    
});
