# 🏰 Orlando Trip Planner

A real-time expense tracking app for your Orlando vacation, syncing automatically with Google Sheets. Works on both phones simultaneously!

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## ✨ Features

- 🔄 **Auto-sync with Google Sheets** - Add expenses, instantly saved
- 📱 **Multi-device support** - Both you and your travel partner can add expenses
- 💰 **Real-time budget tracking** - See total expenses update live
- 📡 **Offline support** - Works without internet, syncs when back online
- 🎯 **Simple & fast** - Tap, fill, done!
- 💯 **100% Free** - No monthly costs, no app store needed

## 🎬 Demo

**Live App:** [Your Netlify URL here]

**What it does:**
1. Add expenses on the go (🍕 lunch, 🎢 tickets, 🏨 hotels)
2. Automatically saves to Google Sheets
3. Both phones see updates in real-time
4. Track your total budget throughout the trip

## 📋 Prerequisites

- Google Account
- Google Sheet with your trip data
- Netlify account (free) or any static hosting

## 🚀 Quick Start

### 1. Clone this repo

```bash
git clone https://github.com/YOUR_USERNAME/orlando-trip.git
cd orlando-trip
```

### 2. Set up Google Apps Script

1. Open your Google Sheet
2. Click **Extensions → Apps Script**
3. Copy the code from `google-apps-script.js`
4. Paste into Apps Script editor
5. Save as "Orlando Trip API"
6. Deploy as Web App (see detailed instructions below)
7. Copy the Web App URL

### 3. Configure the app

Edit `index.html`:

```javascript
// Line ~414
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
// Replace with your Apps Script URL

// Line ~413
const SHEET_CSV_URL = 'YOUR_GOOGLE_SHEETS_CSV_URL';
// Replace with your published CSV URL
```

### 4. Deploy

**Option A: Netlify Drop (Easiest)**
1. Go to https://app.netlify.com/drop
2. Drag `index.html`
3. Get instant URL!

**Option B: GitHub Pages**
1. Push to GitHub
2. Settings → Pages
3. Enable Pages with main branch
4. Your site: `https://YOUR_USERNAME.github.io/orlando-trip/`

**Option C: Vercel, Cloudflare Pages, etc.**
- Just upload `index.html`
- All static hosting works!

## 📖 Detailed Setup

### Google Apps Script Deployment

1. **Open Apps Script**
   - In your Google Sheet: Extensions → Apps Script

2. **Paste the code**
   - Copy from `google-apps-script.js`
   - Paste into the editor
   - Save (Ctrl+S / Cmd+S)

3. **Deploy as Web App**
   - Click "Deploy" → "New deployment"
   - Type: Web app
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click "Deploy"

4. **Authorize**
   - Click "Authorize access"
   - Choose your account
   - Click "Advanced" → "Go to Orlando Trip API (unsafe)"
   - Click "Allow"

5. **Copy the URL**
   - Copy the Web App URL (ends with `/exec`)
   - Save it for the next step

### Google Sheet Setup

Your Google Sheet should have these columns:

| DayNumber | DayTitle | ActivityName | ActivityDetails | Cost | Note | Link |
|-----------|----------|--------------|-----------------|------|------|------|
| 30 | Arrival Day | ✈️ Flight | Panama → Orlando | 1600.00 | Flight CM867 | |
| 30 | Arrival Day | 🚗 Rental Car | Alamo Terminal C | 270.68 | Confirmation 123 | |

**To publish the sheet:**
1. File → Share → Publish to web
2. Select your sheet tab
3. Choose "Comma-separated values (.csv)"
4. Click "Publish"
5. Copy the CSV URL

## 📱 Mobile Usage

### Add to Home Screen

**iPhone:**
1. Open site in Safari
2. Tap Share button
3. "Add to Home Screen"
4. Name it "Orlando Trip"

**Android:**
1. Open in Chrome
2. Menu (⋮) → "Add to Home screen"

### Adding Expenses

1. Tap **➕** button
2. Fill in:
   - Day number (3, 4, 5)
   - Activity (🍕 Pizza, 🎢 Fast Pass)
   - Cost (25.50)
   - Details and notes (optional)
3. Tap "Add & Sync"
4. Done! Automatically saved to Google Sheets

### Sharing with Travel Partner

1. Send them the app URL
2. They add to home screen
3. Give them Edit access to your Google Sheet (optional, for manual editing)
4. Both phones sync automatically!

## 🔧 Development

### Project Structure

```
orlando-trip/
├── index.html              # Main app file (auto-sync version)
├── google-apps-script.js   # Backend API for Google Sheets
├── README.md               # This file
├── SETUP-GUIDE.md          # Detailed setup instructions
├── CHECKLIST.md            # Quick setup checklist
└── LICENSE                 # MIT License
```

### Local Development

Since it's a static HTML file with external API calls:

1. Open `index.html` in a browser
2. Use browser DevTools for debugging
3. Test with your configured Apps Script URL

**Note:** Due to CORS, you must host it online to test fully. Use Netlify Drop for quick testing.

### Customization

**Change colors:**
Edit CSS in `index.html` (lines ~15-300)

**Change sync interval:**
```javascript
// Line ~560 - default is 2 minutes
setInterval(() => {
    loadFromSheets();
}, 2 * 60 * 1000); // Change this number
```

**Add more fields:**
Edit the modal forms (lines ~370-430) and update Apps Script accordingly

## 🐛 Troubleshooting

### "Please configure your Apps Script URL"
- You need to replace `YOUR_APPS_SCRIPT_URL_HERE` in `index.html`
- Make sure you copied the full URL from Apps Script deployment

### "Failed to save"
- Check internet connection
- Verify Apps Script URL is correct (should end with `/exec`)
- Check Apps Script deployment is active

### Items don't appear in Google Sheet
- Wait 5-10 seconds and refresh the sheet
- Check you're looking at the correct sheet tab
- Verify Apps Script has permission to edit your sheet

### Items in sheet but not in app
- Tap the 🔄 refresh button
- App auto-refreshes every 2 minutes
- Check the CSV URL is correct

### Authorization errors in Apps Script
1. Open Apps Script
2. Run → Run function → doPost
3. This will trigger authorization again
4. Follow the prompts

## 🛠️ Tech Stack

- **Frontend:** Pure HTML/CSS/JavaScript (no frameworks)
- **Backend:** Google Apps Script (serverless)
- **Database:** Google Sheets
- **Hosting:** Netlify / GitHub Pages / Any static hosting
- **Cost:** $0 (completely free!)

## 📊 How It Works

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│  Your Phone │         │  Google Sheets   │         │ Partner's   │
│             │         │    + Apps Script │         │    Phone    │
└─────────────┘         └──────────────────┘         └─────────────┘
      │                          │                          │
      │  1. Add Expense          │                          │
      ├─────────────────────────►│                          │
      │                          │                          │
      │  2. Apps Script          │                          │
      │     writes to sheet      │                          │
      │                          │                          │
      │                          │◄─────────────────────────┤
      │                          │  3. Auto-refresh         │
      │                          │     (every 2 min)        │
      │                          │                          │
      │  4. Auto-refresh         │                          │
      │     (every 2 min)        │                          │
      │◄─────────────────────────┤                          │
      │                          │                          │
      │  Both see each other's expenses!                    │
      │                          │                          │
```

## 🤝 Contributing

This is a personal trip planner, but feel free to fork and customize for your own trips!

Ideas for improvements:
- [ ] Add photo uploads
- [ ] Categories/tags for expenses
- [ ] Export to PDF
- [ ] Currency conversion
- [ ] Split expenses calculator
- [ ] Trip timeline view

## 📝 License

MIT License - feel free to use for your own trips!

## 🙏 Acknowledgments

- Built with ❤️ for an amazing Orlando vacation
- Powered by Google Sheets API
- Hosted for free on Netlify

## 📞 Support

Having issues? Check:
1. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Detailed instructions
2. [CHECKLIST.md](CHECKLIST.md) - Quick reference
3. Open an issue on GitHub

## 🎉 Enjoy Your Trip!

Have an amazing time in Orlando! 🏰✨

Don't forget to:
- 🎢 Ride all the rollercoasters
- 🍕 Try the butterbeer
- 📸 Take lots of photos
- 💰 Track your expenses with this app!

---

**Made with 🎯 by Luciano & Fernanda for their Orlando adventure**
