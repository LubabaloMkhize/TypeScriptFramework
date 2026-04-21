// utils/helpers.ts
export async function waitAndClick(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
}

export async function clickElement(locator: Locator) {
    console.log(`Clicking on element: ${locator}`);
    await locator.click();
}

export async function enterText(locator: Locator, text: string) {
    console.log(`Entering text: "${text}" into element: ${locator}`);
    await locator.fill(text);
}

export async function verifyElementVisible(locator: Locator) {
    console.log(`Verifying element is visible: ${locator}`);
    await expect(locator).toBeVisible();
}