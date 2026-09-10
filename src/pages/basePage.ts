import {Page,Locator, expect} from '@playwright/test';

export class BasePage {

    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        console.log(`Navigating to ${url}`);
        await this.page.goto(url);
    }

    async clickElement(locator: Locator) {
        console.log(`Clicking on element: ${locator}`);
        await locator.click();
    }

    async enterText(locator: Locator, text: string) {
        console.log(`Entering text: "${text}" into element: ${locator}`);
        await locator.fill(text);
    }

    async verifyElementVisible(locator: Locator) {
        console.log(`Verifying element is visible: ${locator}`);
        await expect(locator).toBeVisible();
    }

    async  waitAndClick(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    async verifyText(actual: string, expected: string) {
    expect(actual).toBe(expected);
    }

    async verifyContains(actual: string, expected: string) {
        expect(actual).toContain(expected);
    }

    async verifyLocatorText(locator: Locator, text: string) {
        await expect(locator).toHaveText(text);
    }

}