## 🤝 Collaboration & Git Workflow

To keep our Playwright framework clean and maintainable, please follow this Git workflow.

---

### 🔹 1. Clone the Repository
```bash
git clone <repo-url>
cd <repo-name>

🔹 2. Sync with main

Always start from the latest version of main:

git checkout main
git pull origin main

🔹 3. Create a New Branch

Create your own branch for every feature or fix:

git checkout -b feature/<your-name>-<feature>

Examples:

feature/john-login-tests
bugfix/mary-timeout-issue
🔹 4. Make Changes & Commit
git add .
git commit -m "Add login test cases"
🔹 5. Push Your Branch
git push -u origin feature/<your-branch-name>
🔹 6. Keep Your Branch Updated

Before opening a Pull Request, sync with main:

git checkout main
git pull origin main

git checkout feature/<your-branch-name>
git merge main

Resolve any conflicts, then:

git add .
git commit -m "Resolve merge conflicts"
🔹 7. Open a Pull Request (PR)
Go to the repository on GitHub
Click "Compare & pull request"
Add a clear description of your changes
Request a review
🔹 8. After Merge Cleanup
git checkout main
git pull origin main

git branch -d feature/<your-branch-name>
git push origin --delete feature/<your-branch-name>
🔁 Daily Workflow (Quick Guide)
git checkout main
git pull origin main
git checkout feature/<your-branch>
git merge main

# do your work
git add .
git commit -m "your message"
git push
⚠️ Team Guidelines
❌ Do NOT commit directly to main
✅ Always work in branches
✅ Keep commits small and meaningful
✅ Pull latest changes from main frequently
✅ Use clear branch naming:
feature/...
bugfix/...
hotfix/...
💡 Optional: Rebase Instead of Merge

For a cleaner commit history:

git checkout feature/<your-branch>
git fetch origin
git rebase origin/main