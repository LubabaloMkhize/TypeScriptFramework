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
    console.log("Title : ",url);

    await expect(page).toHaveURL(/ndosisimplifiedautomation/);
})

test("Verify page heading", async ({ page }) => {
    await page.goto("https://ndosisimplifiedautomation.vercel.app/");

    await expect(page.getByRole('heading', { name: /Master Test Automation/ }))
        .toBeVisible();
});

test("Successful login", async ({ page }) => {
    await page.goto("https://ndosisimplifiedautomation.vercel.app/");

    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('heading', { name: 'Login to Access Learning Materials'}).isVisible();

    await page.locator('#login-email').fill('Tatalo.Mkhize@example.com');

    await page.locator('#login-password').fill('England@123456');

    await page.locator('#login-submit').click();

    await expect(page.getByRole('heading', { name: /Welcome back/ })).toBeVisible();
});