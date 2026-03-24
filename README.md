# TypeScript Playwright Automation Framework

[![Node.js Version](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org)
[![Playwright](https://img.shields.io/badge/Playwright-Latest-blue)](https://playwright.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow)](#license)

A lightweight and maintainable Playwright framework for web UI automation with TypeScript.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Troubleshooting](#troubleshooting)
- [Collaboration & Git Workflow](#collaboration--git-workflow)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18 or higher ([Download](https://nodejs.org))
- **npm**: v9 or higher (included with Node.js)
- **Git**: Latest version
- **Browsers**: Automatically installed via Playwright (Chrome, Firefox, Safari)

Verify installation:
```bash
node --version
npm --version
```

## Project Overview

- Playwright-based end-to-end testing in TypeScript
- Allure reporting integrated (`allure-results`)
- Recommended workflow: feature branches + PRs + CI execution

## Folder Structure

- `tests/` - test suites and test files
- `pages/` - page object models
- `fixtures/` - test fixtures (e.g., `baseTest.ts`)
- `utils/` - utility helpers (shared functions, data handling)
- `playwright-report/` - generated HTML reports
- `test-results/` - raw test output for CI
- `allure-results/` - Allure test artifacts (json/attachments)
- `package.json` - dependencies + scripts
- `playwright.config.ts` - Playwright runner configuration

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd TypeScriptFramework
```

2. Install dependencies:
```bash
npm install
```

3. Install browsers (if not already installed):
```bash
npx playwright install
```

### Running Your First Test

```bash
npx playwright test
```

## Configuration

### Playwright Configuration

Edit `playwright.config.ts` to customize:
- **browsers**: Chrome, Firefox, Safari, Edge
- **headless mode**: Run tests without GUI
- **timeout**: Global test timeout (default: 30s per test)
- **retries**: Auto-retry failed tests
- **parallelization**: Number of workers

Example configuration snippet:
```typescript
// playwright.config.ts
const config: PlaywrightTestConfig = {
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30 * 1000,
};
```

### Base Test Fixtures

Use `fixtures/baseTest.ts` to set up common test utilities:
```typescript
import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

export const baseTest = test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});
```

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test tests/login.spec.ts
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests with UI Mode (Visual Debugging)
```bash
npx playwright test --ui
```

### Generate and Open Playwright Report
```bash
npx playwright test --reporter=html
npx playwright show-report
```

### Generate Allure Report
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **Playwright binaries not found** | Run `npx playwright install` |
| **Tests timing out** | Increase `timeout` in `playwright.config.ts` or use `test.setTimeout()` |
| **Browser crashes** | Update Playwright: `npm install -D @playwright/test@latest` |
| **Element not found errors** | Use `--debug` mode to inspect selectors in real-time |
| **Allure report not generating** | Verify `allure-results/` folder exists; reinstall Allure CLI if needed |

### Debug Techniques

1. **Pause Tests**: Add `await page.pause()` to stop execution
2. **Screenshots**: `await page.screenshot({ path: 'debug.png' })` 
3. **Video Recording**: Enable in `playwright.config.ts`:
   ```typescript
   use: {
     video: 'retain-on-failure'
   }
   ```
4. **Traces**: Capture full execution trace for inspection
   ```typescript
   await context.tracing.start({ screenshots: true, snapshots: true });
   ```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run tests:
```bash
npx playwright test
```

3. Generate allure report (if configured):
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

4. Run specific tests:
```bash
npx playwright test tests/<your-test-file>.ts
```

---

## Collaboration & Git Workflow

To keep our Playwright framework clean and maintainable, please follow this Git workflow.

### Step-by-Step Workflow

#### 1. Clone the Repository
```bash
git clone <repo-url>
cd TypeScriptFramework
```

#### 2. Sync with main

Always start from the latest version of main:

```bash
git checkout main
git pull origin main
```

#### 3. Create a New Branch

Create your own branch for every feature or fix:

```bash
git checkout -b feature/<your-name>-<feature>
```

Examples:
- `feature/john-login-tests`
- `bugfix/mary-timeout-issue`
- `hotfix/critical-selector-fix`

#### 4. Make Changes & Commit

```bash
git add .
git commit -m "Add login test cases"
```

#### 5. Push Your Branch

```bash
git push -u origin feature/<your-branch-name>
```

#### 6. Keep Your Branch Updated

Before opening a Pull Request, sync with main:

```bash
git checkout main
git pull origin main
git checkout feature/<your-branch-name>
git merge main
```

Resolve any conflicts, then:

```bash
git add .
git commit -m "Resolve merge conflicts"
```

#### 7. Open a Pull Request (PR)

- Go to the repository on GitHub
- Click "Compare & pull request"
- Add a clear description of your changes
- Request a review

#### 8. After Merge Cleanup

```bash
git checkout main
git pull origin main
git branch -d feature/<your-branch-name>
git push origin --delete feature/<your-branch-name>
```

### Daily Workflow (Quick Reference)

```bash
git checkout main
git pull origin main
git checkout feature/<your-branch>
git merge main
# do your work
git add .
git commit -m "your message"
git push
```

### Team Guidelines

❌ **Do NOT:**
- Commit directly to main
- Force push to main
- Commit sensitive data (credentials, API keys)

✅ **DO:**
- Always work in branches
- Keep commits small and meaningful
- Pull latest changes from main frequently
- Use clear branch naming: `feature/...`, `bugfix/...`, `hotfix/...`
- Request code review before merging

### Optional: Rebase Instead of Merge

For a cleaner commit history:

```bash
git checkout feature/<your-branch>
git fetch origin
git rebase origin/main
```

## Contributing

### Code Quality Standards

1. **Write clear test descriptions**:
   ```typescript
   test('should validate user login with correct credentials', async ({ page }) => {
     // test implementation
   });
   ```

2. **Use page objects** for maintainability:
   ```typescript
   // pages/loginPage.ts
   export class LoginPage {
     constructor(private page: Page) {}
     async login(email: string, password: string) {
       // implementation
     }
   }
   ```

3. **Follow TypeScript best practices**:
   - Use strict null checks
   - Define proper types (avoid `any`)
   - Use meaningful variable names

4. **Add comments for complex logic**:
   ```typescript
   // Retry login up to 3 times due to occasional timeout
   ```

5. **Test locally before pushing**:
   ```bash
   npm run test
   npm run lint  # if configured
   ```

### Pull Request Checklist

- [ ] Tests pass locally (`npx playwright test`)
- [ ] No console errors/warnings
- [ ] Code follows team standards
- [ ] Meaningful commit messages
- [ ] PR description explains changes
- [ ] Related issues linked

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support & Maintainers

For questions or issues, please:
- Open an issue on GitHub
- Contact the automation team
- Review existing documentation in this README
