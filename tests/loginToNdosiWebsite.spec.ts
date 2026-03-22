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