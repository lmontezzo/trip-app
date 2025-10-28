# 🚀 Auto-Sync Setup Guide - Orlando Trip Planner

## 🎯 What You're Building

An app where:
- You add expense → **Automatically saves to Google Sheets** ✨
- Fernanda adds expense → **Automatically saves to Google Sheets** ✨
- Both phones auto-refresh every 2 minutes
- Works on both phones simultaneously!

---

## 📋 Setup Steps (10 minutes)

### Step 1: Set Up Google Apps Script

1. **Open your Google Sheet** (the one with your trip data)

2. **Click Extensions → Apps Script**
   - This opens a new tab with a code editor

3. **Delete any existing code** in the editor

4. **Copy and paste** the code from `google-apps-script.js`
   - Open the file I created
   - Copy ALL the code
   - Paste into Apps Script editor

5. **Save**
   - Click the disk icon or press Ctrl+S (Cmd+S on Mac)
   - Name it: "Orlando Trip API"

---

### Step 2: Deploy as Web App

1. **Click "Deploy" button** (top right) → **"New deployment"**

2. **Settings:**
   - Click the gear icon ⚙️ next to "Select type"
   - Choose **"Web app"**
   
3. **Configuration:**
   - **Description:** "Trip Planner API"
   - **Execute as:** **Me** (your email)
   - **Who has access:** **Anyone** 
     *(Don't worry - they can't access your sheet without the URL)*

4. **Click "Deploy"**

5. **Authorization required:**
   - Click **"Authorize access"**
   - Choose your Google account
   - Click **"Advanced"** (if you see a warning)
   - Click **"Go to Orlando Trip API (unsafe)"** 
     *(It's safe - it's YOUR script)*
   - Click **"Allow"**

6. **Copy the Web App URL**
   - You'll see a URL like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
   - **Copy this entire URL** - you'll need it!

---

### Step 3: Update the HTML File

1. **Open `index-auto-sync.html`** in a text editor

2. **Find line ~414** that says:
   ```javascript
   const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
   ```

3. **Replace** `YOUR_APPS_SCRIPT_URL_HERE` with your copied URL:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```

4. **Save the file**

---

### Step 4: Upload to Netlify

1. **Go to your Netlify site** (or app.netlify.com/drop)

2. **Drag and drop** `index-auto-sync.html`
   - If using Netlify Drop: rename it to `index.html` first
   - If updating existing site: it will replace the old one

3. **Wait a moment** for deployment

4. **Open your site URL**

---

### Step 5: Test It! 🧪

1. **Open the app on your phone**

2. **Tap the ➕ button**

3. **Add a test expense:**
   - Day: 3
   - Activity: 🧪 Test Expense
   - Cost: 5.00
   - Note: Testing auto-sync!

4. **Tap "Add & Sync"**

5. **Check your Google Sheet** - the new row should appear! ✨

6. **Tap 🔄 to refresh** - you should see it in the app too!

---

## 🎉 You're Done!

### Now you can:

✅ **Add expenses instantly** - tap ➕, fill in, done!  
✅ **Automatic sync** - saves directly to Google Sheets  
✅ **Both phones work** - you and Fernanda both add expenses  
✅ **Auto-refresh** - every 2 minutes, both phones sync  
✅ **Offline cache** - works even without internet (syncs when back online)

---

## 📱 Share with Fernanda

1. **Send her the Netlify URL**
2. **She adds it to her home screen** (Safari → Share → Add to Home Screen)
3. **Done!** She can add expenses and they'll sync automatically!

---

## 🐛 Troubleshooting

### "Please configure your Apps Script URL"
- You didn't replace `YOUR_APPS_SCRIPT_URL_HERE` in the HTML
- Edit the file and add your Apps Script URL

### "Failed to save"
- Check your internet connection
- Make sure the Apps Script URL is correct (should end with `/exec`)
- Try redeploying the Apps Script

### Item doesn't appear in sheet
- Wait 5 seconds and refresh the sheet
- Check you're looking at the right sheet tab (Sheet3)
- Check the Apps Script deployment is set to "Anyone" for access

### Item appears in sheet but not in app
- Tap the 🔄 refresh button
- The app auto-refreshes every 2 minutes

### Authorization issues
- In Apps Script: Run → Run function → Select `doPost`
- This will trigger authorization again
- Follow the authorization steps

---

## 🔄 How It Works

```
Your Phone                Google Sheets               Fernanda's Phone
    │                           │                            │
    ├─ Add Expense              │                            │
    ├─ Send to Apps Script ────►│                            │
    │                           ├─ Append Row                │
    │                           │                            │
    │                           │◄───── Auto-refresh ────────┤
    │                           │                            │
    ├─ Auto-refresh (2 min) ───►│                            │
    │◄─ Get updated data ────────┤                            │
    │                           │                            │
    └─ See Fernanda's expenses  │    See your expenses ──────┘
```

---

## 💡 Tips

- **Add emojis** to activity names for easy scanning (🍕 🎢 🏨)
- **Use consistent day numbers** (3, 4, 5, not "Day 3")
- **Refresh manually** with 🔄 if you want to see updates immediately
- **Works offline** - will sync when you're back online
- **Budget updates** in real-time as you add expenses

---

## 🎊 Enjoy Your Trip!

You now have a fully automatic expense tracker that works on both phones!

Add stuff as you go, and by the end of the trip you'll have a complete record of everything you spent. 🏰✨

Have an amazing time in Orlando! 🎢🎆
