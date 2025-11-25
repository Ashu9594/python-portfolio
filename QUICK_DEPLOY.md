# ⚡ Quick Deployment Commands

## 🎯 Step-by-Step Commands

### 1. Create Repository on GitHub First
- Go to https://github.com/new
- Name: `python-portfolio`
- Make it **Public**
- Click "Create repository"

### 2. Run These Commands (Replace YOUR_USERNAME)

```bash
# Navigate to project
cd "C:\Users\AshutoshAagawane\Desktop\ashutosh website\python-portfolio"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/python-portfolio.git

# Rename branch to main (if on master)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to: `https://github.com/YOUR_USERNAME/python-portfolio/settings/pages`
2. Source: Branch `main` → `/ (root)`
3. Click Save

### 4. Your Site Will Be Live At:
```
https://YOUR_USERNAME.github.io/python-portfolio/
```

---

## 🔑 GitHub Authentication

If asked for password, use a **Personal Access Token**:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Portfolio Deployment"
4. Select scope: `repo` (check all repo permissions)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

---

## ✅ Done!

Your portfolio is now live! 🎉

