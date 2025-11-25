# 🚀 GitHub Pages Deployment Guide

Follow these steps to deploy your portfolio to GitHub Pages:

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Repository name: `python-portfolio` (or any name you prefer)
5. Description: "Modern Python Developer Portfolio Website"
6. Set visibility to **Public** (required for free GitHub Pages)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click **"Create repository"**

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Navigate to your project folder
cd "C:\Users\AshutoshAagawane\Desktop\ashutosh website\python-portfolio"

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/python-portfolio.git

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Note**: If you're asked for credentials:
- Use a **Personal Access Token** instead of password
- Create one at: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Give it `repo` permissions

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** (top menu)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
5. Click **"Save"**
6. Wait 1-2 minutes for GitHub to build your site

## Step 4: Access Your Live Site

Your portfolio will be live at:
```
https://YOUR_USERNAME.github.io/python-portfolio/
```

**Example**: If your username is `Ashu9594`, your site will be:
```
https://Ashu9594.github.io/python-portfolio/
```

## Step 5: Update README with Live URL

After deployment, update the README.md file with your actual live URL:

1. Edit `README.md`
2. Replace `[Your GitHub Pages URL will appear here after deployment]` with your actual URL
3. Commit and push:
```bash
git add README.md
git commit -m "Update README with live URL"
git push
```

## 🔄 Future Updates

To update your live site:

```bash
# Make your changes
# Then commit and push
git add .
git commit -m "Your update message"
git push
```

GitHub Pages will automatically rebuild your site (usually takes 1-2 minutes).

## ✅ Verification Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled in Settings
- [ ] Site is accessible at `https://YOUR_USERNAME.github.io/python-portfolio/`
- [ ] All images and assets load correctly
- [ ] Contact form works (if you add backend)
- [ ] Mobile responsive design works

## 🐛 Troubleshooting

### Site not loading?
- Wait 2-3 minutes after enabling Pages
- Check repository is **Public**
- Verify branch name matches (main/master)
- Check Settings → Pages for any error messages

### Images not showing?
- Ensure image paths are relative (e.g., `ashu.jpg` not `C:/...`)
- Check file names match exactly (case-sensitive)

### Styling not working?
- Clear browser cache
- Check browser console for errors
- Verify all CSS/JS files are in the repository

## 📝 Notes

- GitHub Pages serves static files only (HTML, CSS, JS)
- No server-side code (PHP, Python, etc.) will work
- Contact form will need a service like Formspree or EmailJS for backend
- Free GitHub Pages has some limitations (100GB bandwidth/month)

---

Need help? Check [GitHub Pages Documentation](https://docs.github.com/en/pages)

