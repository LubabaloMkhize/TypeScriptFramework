// utils/helpers.ts
export async function waitAndClick(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
}