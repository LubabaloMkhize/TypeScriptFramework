import { test, expect } from '@playwright/test';

test("Verify page title",async ({page}) => {
    await page.goto("https://ndosisimplifiedautomation.vercel.app/");

    let title:string=await page.title();
    console.log("Title : ",title);

    await expect(page).toHaveTitle(/Ndosi Test Automation/);
})

test("Verify page Url",async ({page}) => {
    await page.goto("https://ndosisimplifiedautomation.vercel.app/");

    let url:string=await page.url();
    console.log("Site Url : ",url);

    await expect(page).toHaveURL(/ndosisimplifiedautomation/);
})



test("Successful login", async ({ page }) => {
    await page.goto("https://ndosisimplifiedautomation.vercel.app/");

    await page.getByRole('button', { name: 'Login' }).click();

    const loginHeading = await page.getByRole('heading', { name: 'Login to Access Learning Materials'}).isVisible();

    console.log("Login Heading Visible : ", loginHeading);

    await page.locator('#login-email').fill('Tatalo.Mkhize@example.com');

    await page.locator('#login-password').fill('England@123456');


    await page.locator('#login-submit').click();

    await expect(page.getByRole('heading', { name: /Welcome back/ })).toBeVisible();
});