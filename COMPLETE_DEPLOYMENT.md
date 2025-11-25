# ✅ Complete Deployment Instructions

## 🎯 Quick Steps (5 minutes)

### Step 1: Create Repository (Do this first!)

I've opened a browser window for you. If it didn't open, go to:
**https://github.com/new?name=python-portfolio&description=Modern+Python+Developer+Portfolio+Website&public=true**

**Important Settings:**
- ✅ Repository name: `python-portfolio`
- ✅ Visibility: **Public** (required!)
- ❌ **DO NOT** check "Add a README file"
- ❌ **DO NOT** check "Add .gitignore"  
- ❌ **DO NOT** check "Choose a license"

Click **"Create repository"**

---

### Step 2: Create Personal Access Token

GitHub requires a token (not password):

1. Go to: **https://github.com/settings/tokens/new**
2. Note: `Portfolio Deployment`
3. Expiration: Choose 90 days or No expiration
4. **Select scopes**: Check **`repo`** (this gives all repo permissions)
5. Scroll down and click **"Generate token"**
6. **⚠️ COPY THE TOKEN IMMEDIATELY** - You won't see it again!

---

### Step 3: Push Your Code

**Option A: Use the PowerShell Script (Easiest)**
```powershell
cd "C:\Users\AshutoshAagawane\Desktop\ashutosh website\python-portfolio"
.\push-to-github.ps1
```

**Option B: Manual Commands**
```bash
cd "C:\Users\AshutoshAagawane\Desktop\ashutosh website\python-portfolio"
git push -u origin main
```

**When prompted:**
- Username: `Ashu9594`
- Password: **Paste your Personal Access Token** (the one you just created)

---

### Step 4: Enable GitHub Pages

1. Go to: **https://github.com/Ashu9594/python-portfolio/settings/pages**
2. Under "Source":
   - Branch: `main`
   - Folder: `/ (root)`
3. Click **"Save"**
4. Wait 1-2 minutes

---

### Step 5: 🎉 Your Site is Live!

Visit: **https://Ashu9594.github.io/python-portfolio/**

---

## 🔧 Troubleshooting

### "Repository not found"
→ Make sure you created the repository in Step 1

### "Authentication failed"
→ You need a Personal Access Token, not your GitHub password
→ Make sure token has `repo` scope

### "Permission denied"
→ Check your token has `repo` permissions
→ Try generating a new token

### Site not loading
→ Wait 2-3 minutes after enabling Pages
→ Check repository is Public
→ Verify branch is `main`

---

## 📝 After Deployment

To update your live site:
```bash
git add .
git commit -m "Your update message"
git push
```

GitHub Pages will automatically rebuild (takes 1-2 minutes).

---

**Need help?** Check the error message and follow the troubleshooting steps above.

