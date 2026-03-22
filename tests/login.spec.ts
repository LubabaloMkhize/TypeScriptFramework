// tests/login.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test('Login test', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.clickLogin();
    await login.enterEmail('test@gmail.com');
});

//await login.enterEmail(users.validUser.email);


//import { test } from '../fixtures/baseTest';

//test('Login test', async ({ loginPage }) => {
  //  await loginPage.navigate();
    //await loginPage.clickLogin();
    //await loginPage.enterEmail('test@gmail.com');
//
//});