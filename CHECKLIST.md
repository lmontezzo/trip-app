# ✅ Quick Setup Checklist

## 📝 Before You Start
- [ ] Have your Google Sheet open
- [ ] Have a text editor ready (Notepad/TextEdit)
- [ ] Know your Netlify site URL

---

## 🚀 Setup (Do Once)

### Part 1: Google Apps Script (5 minutes)
- [ ] Open Google Sheet → Extensions → Apps Script
- [ ] Delete existing code
- [ ] Copy code from `google-apps-script.js`
- [ ] Paste into Apps Script editor
- [ ] Save (name: "Orlando Trip API")
- [ ] Deploy → New deployment → Web app
- [ ] Execute as: Me
- [ ] Who has access: Anyone
- [ ] Click Deploy
- [ ] Authorize access (follow prompts)
- [ ] **Copy the Web App URL** (save it somewhere!)

### Part 2: Update HTML (2 minutes)
- [ ] Open `index-auto-sync.html` in text editor
- [ ] Find: `const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';`
- [ ] Replace with your copied URL
- [ ] Save file

### Part 3: Upload (1 minute)
- [ ] Rename file to `index.html`
- [ ] Go to Netlify
- [ ] Drag and drop the file
- [ ] Wait for deployment

### Part 4: Test (2 minutes)
- [ ] Open site on phone
- [ ] Tap ➕
- [ ] Add test expense
- [ ] Check Google Sheet - new row appears!
- [ ] Success! 🎉

---

## 👥 Share with Fernanda

- [ ] Send her the Netlify URL
- [ ] She opens in Safari
- [ ] She taps: Share → Add to Home Screen
- [ ] Done! You both can add expenses!

---

## 📱 Daily Use

**To add an expense:**
1. Tap ➕
2. Fill in details
3. Tap "Add & Sync"
4. Done! (auto-saves to sheet)

**The app automatically:**
- ✅ Saves to Google Sheets
- ✅ Refreshes every 2 minutes
- ✅ Shows both your expenses
- ✅ Updates the budget

---

## 🔧 If Something Breaks

**Can't save?**
→ Check internet connection
→ Check Apps Script URL is correct

**Don't see new items?**
→ Tap 🔄 to refresh
→ Wait 2 minutes for auto-refresh

**Need to redeploy Apps Script?**
1. Apps Script → Deploy → Manage deployments
2. Click ✏️ edit icon
3. Version → New version
4. Update → Deploy
5. Copy new URL if changed

---

## 🎯 Remember

- Both phones add expenses independently
- Both sync to the same Google Sheet
- Both see each other's expenses
- Total budget updates automatically
- Everything is FREE forever!

---

## 🆘 Need Help?

**Test your Apps Script directly:**
1. Open Apps Script
2. Change URL to: `https://script.google.com/macros/s/YOUR_ID/exec`
3. Should see: `{"status":"API is working!","message":"Use POST to add data"}`

**Check deployment:**
- Apps Script → Deploy → Manage deployments
- Make sure it says "Active"
- "Who has access" should be "Anyone"

---

## 🎉 That's It!

Once set up, it just works. Add expenses throughout your trip and you'll have a complete record at the end!

Enjoy Orlando! 🏰✨
