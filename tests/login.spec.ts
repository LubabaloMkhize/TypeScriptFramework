import { test } from '../fixtures/baseTest';
import { users } from '../utils/testData';

test('Login test validuser', async ({ page, loginPage }) => {
    await loginPage.navigate();
    await loginPage.clickLogin();
    await loginPage.enterEmail(users.validUser.email);
    await loginPage.enterPassword(users.validUser.password);
    await loginPage.clickLoginSubmitButton();
    await loginPage.verifyPageHeading();
});