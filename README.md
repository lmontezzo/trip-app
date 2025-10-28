# 🏰 Orlando Trip Planner

A beautiful, real-time expense tracking app for vacation planning. Track expenses, manage itinerary, and navigate with ease - all syncing automatically with Google Sheets. Built as a personal project for an Orlando vacation.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## ✨ Features

- 🔄 **Auto-sync with Google Sheets** - Add expenses, instantly saved to your spreadsheet
- 📱 **Multi-device support** - Multiple people can track expenses simultaneously
- 💰 **Real-time budget tracking** - See total expenses and category breakdown
- 📊 **Visual analytics** - Pie chart showing spending by category
- 🗺️ **Built-in navigation** - One-tap directions to activities (Google Maps/Waze)
- ⏰ **Next activity preview** - See what's coming up next
- 🎯 **Category organization** - Parks, Food, Hotels, Car, Flights, Shopping, Others
- 🌙 **Beautiful dark theme** - Purple/blue gradient design
- 📡 **Offline support** - Works without internet, syncs when back online
- 💯 **100% Free** - No monthly costs, uses Google Sheets as database

## 🎬 Live Demo

**Hosted on GitHub Pages:** [Your URL here after deployment]

## 📸 What It Looks Like

The app features:
- Dark purple/blue gradient theme
- Next activity card at the top
- Organized daily itinerary with expandable days
- Budget summary with pie chart at the bottom
- Navigation buttons for activities with locations
- Add/edit/delete functionality

## 🚀 Quick Start

### Prerequisites

- Google Account with Google Sheets access
- GitHub account (for hosting on GitHub Pages)

### 1. Set Up Google Apps Script

1. **Create or open your Google Sheet** with trip data
2. Click **Extensions → Apps Script**
3. Copy the code from `google-apps-script.js` in this repo
4. Paste into the Apps Script editor
5. Save the project (name it "Trip Planner API")
6. **Deploy as Web App:**
   - Click "Deploy" → "New deployment"
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click "Deploy"
7. **Authorize the app** when prompted
8. **Copy the Web App URL** (ends with `/exec`)

### 2. Publish Your Google Sheet as CSV

1. In your Google Sheet: **File → Share → Publish to web**
2. Select your sheet tab
3. Choose **"Comma-separated values (.csv)"**
4. Click "Publish"
5. **Copy the CSV URL**

### 3. Configure the App

Edit `index.html` and replace these two URLs (around lines 767-768):

```javascript
const SHEET_CSV_URL = 'YOUR_GOOGLE_SHEETS_CSV_URL';
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
```

Replace with your actual URLs from steps 1 and 2.

### 4. Deploy to GitHub Pages

1. **Fork or clone this repository**
2. **Commit your changes** (with the updated URLs in index.html)
3. Go to **Settings → Pages**
4. Source: **Deploy from a branch**
5. Branch: **main** / Folder: **/ (root)**
6. Click **Save**
7. Wait 1-2 minutes for deployment
8. Your app will be live at: `https://YOUR_USERNAME.github.io/trip-app/`

### 5. Add to Mobile Home Screen

**iPhone:**
1. Open in Safari
2. Tap Share button
3. "Add to Home Screen"

**Android:**
1. Open in Chrome
2. Menu (⋮) → "Add to Home screen"

## 📊 Google Sheet Structure

Your Google Sheet should have these columns (in this exact order):

| Column | Name | Format | Required | Example |
|--------|------|--------|----------|---------|
| A | Date | YYYY-MM-DD | Yes | 2025-10-30 |
| B | DayNumber | Number | Yes | 30, 1, 2 |
| C | DayTitle | Text | Yes | Arrival Day - October 30 |
| D | ActivityName | Text | Yes | ✈️ Flight: Panama → Orlando |
| E | ActivityDetails | Text | No | Alamo - Terminal C • Confirmation #123456 |
| F | Cost | Number | No | 1600, 270.68 |
| G | Link | URL | No | https://... |
| H | Category | Text | No | Parks, Food, Hotels, Car, Flights, Shopping, Others |
| I | Location | Text | No | Magic Kingdom, Orlando, FL |
| J | Time | HH:MM | No | 14:00 |

**Note:** Make sure your Apps Script sheet name matches your actual sheet tab (default is 'Sheet1' in `google-apps-script.js` line 8).

## 💡 Usage

### Adding Expenses

1. Tap the **➕** button
2. Fill in the form:
   - **Date** - When the expense occurred
   - **Day Title** - Custom day name (auto-fills from existing data)
   - **Time** - Optional, for scheduling and Next Activity
   - **Activity Name** - What you did (e.g., "🍕 Lunch at...")
   - **Category** - Select from dropdown
   - **Details** - Location, time, confirmations, notes (optional)
   - **Cost** - Amount spent
   - **Link** - Reservation/ticket URL (optional)
   - **Location** - Address for navigation (optional)
3. Click **"Add & Sync"**
4. The expense saves instantly to Google Sheets!

### Editing Expenses

1. Click **⋮** menu on any activity
2. Click **"✏️ Edit"**
3. Modify details
4. Click **"Update & Sync"**

*Note: Edits are local only and won't sync to Google Sheets*

### Deleting Expenses

1. Click **⋮** menu on any activity
2. Click **"🗑️ Delete"**
3. Confirm deletion

*Note: Deletions are local only. Refresh to restore from Google Sheets*

### Navigation

1. Add a **Location** to any activity
2. A **Directions** button appears on that activity
3. Choose **Google Maps** or **Waze** in the header
4. Tap the **Directions** button to navigate

## 🛠️ Tech Stack

- **Frontend:** Pure HTML/CSS/JavaScript (no frameworks or dependencies)
- **Backend:** Google Apps Script (serverless)
- **Database:** Google Sheets (free, collaborative)
- **Hosting:** GitHub Pages (free, fast CDN)
- **Cost:** $0 - Completely free!

## 🎨 Customization

### Change Colors

Edit the CSS in `index.html` (lines ~8-700). Current theme uses purple/blue gradients:
- Background: `#1a1a2e → #16213e → #0f3460`
- Accent: `#6366f1 → #8b5cf6 → #a855f7`

### Change Auto-Refresh Interval

Default is 2 minutes. Find and edit in `index.html`:
```javascript
setInterval(() => {
    loadFromSheets();
}, 2 * 60 * 1000); // Change this value (in milliseconds)
```

### Change Sheet Name

Edit `google-apps-script.js` line 8:
```javascript
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
// Change 'Sheet1' to your actual sheet tab name
```

### Add More Categories

Edit the category dropdown in `index.html` (around line 760) and update the pie chart colors (around line 1500).

## 🐛 Troubleshooting

### "Please configure your Apps Script URL"
- You need to replace `YOUR_APPS_SCRIPT_URL_HERE` in `index.html`
- Make sure you copied the full deployment URL (ends with `/exec`)

### "Failed to save"
- Check internet connection
- Verify Apps Script URL is correct
- Ensure Apps Script deployment is active and set to "Anyone" access
- Check Apps Script logs for errors: Apps Script editor → View → Executions

### Items don't appear in Google Sheet
- Wait 5-10 seconds and refresh the sheet
- Check you're looking at the correct sheet tab
- Verify the sheet name in Apps Script matches your tab name
- Check Apps Script has permission to edit your sheet

### Items in sheet but not in app
- Tap the 🔄 refresh button
- App auto-refreshes every 2 minutes
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Check the CSV URL is correct and sheet is published

### Authorization errors in Apps Script
1. Open Apps Script editor
2. Run → Select function → `testAddRow`
3. Click Run to trigger authorization
4. Follow the authorization prompts
5. Click "Advanced" → "Go to [Project Name] (unsafe)" → "Allow"

### Columns in wrong order
- Verify your sheet header exactly matches the structure above
- Re-deploy the Apps Script with a new version
- Clear browser cache and hard refresh

## 📱 How It Works

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│  Your Phone │         │  Google Sheets   │         │ Partner's   │
│             │         │  + Apps Script   │         │   Phone     │
└─────────────┘         └──────────────────┘         └─────────────┘
      │                          │                          │
      │  1. Add Expense          │                          │
      ├─────────────────────────►│                          │
      │                          │                          │
      │  2. Apps Script          │                          │
      │     writes to sheet      │                          │
      │                          │                          │
      │                          │◄─────────────────────────┤
      │                          │  3. Auto-refresh CSV     │
      │                          │     (every 2 min)        │
      │                          │                          │
      │  4. Auto-refresh CSV     │                          │
      │     (every 2 min)        │                          │
      │◄─────────────────────────┤                          │
      │                          │                          │
      │       Both see each other's expenses!               │
```

## 📂 Project Structure

```
trip-app/
├── index.html              # Main app (frontend + JavaScript)
├── google-apps-script.js   # Backend API for Google Sheets
├── trip-data.csv          # Sample data structure
├── test-api.sh            # API testing script
├── quick-tests.txt        # Testing notes
└── README.md              # This file
```

## 🔐 Security Notes

- Apps Script is deployed with "Anyone" access but only you can edit the underlying sheet
- The Apps Script URL acts as your API key - keep it private
- Don't commit your configured `index.html` with real URLs to a public repo (use environment variables or config files)
- Consider using a separate Google Sheet copy for testing

## 🎯 Tips for Best Results

### Use Emojis
Add emojis to activity names for visual scanning:
- 🍕 for food
- 🎢 for parks
- 🏨 for hotels
- ✈️ for flights
- 🚗 for car rentals

### Specific Locations
For navigation to work well, use specific addresses:
- **Good:** "Disney's Contemporary Resort, Bay Lake Tower, FL 32830"
- **Better:** "4600 N World Dr, Orlando, FL 32830"

### Consistent Day Numbers
Use consistent formats (30, 1, 2, 3) rather than mixed formats

### Regular Sync
The app auto-refreshes every 2 minutes, but you can manually refresh with the 🔄 button

## 📝 License

MIT License - Feel free to fork and customize for your own trips!

## 🙏 Acknowledgments

Built with ❤️ for an amazing Orlando vacation using:
- Google Sheets API
- Google Apps Script
- GitHub Pages
- Pure vanilla JavaScript (no frameworks!)

---

**Made by Luciano & Fernanda for their Orlando adventure** 🏰✨

Have an amazing trip and happy tracking! 🎢🎆
