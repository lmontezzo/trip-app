# 🗺️ Directions Feature - Google Maps & Waze Integration

## ✨ What's New

Your Orlando Trip Planner now has **built-in navigation** with support for both **Google Maps** and **Waze**!

---

## 🎯 Features

### 1. **Navigation App Selector** (In Header)
- Choose between **Google Maps** or **Waze**
- Your preference is saved automatically
- Switch anytime with one tap
- Applies to all directions buttons

### 2. **Location Field** (In Form)
- Add addresses or locations to any activity
- Optional field - only add if you need directions
- Examples:
  - `Magic Kingdom, Orlando, FL`
  - `Disney's Contemporary Resort`
  - `1600 Seven Seas Dr, Orlando, FL 32836`
  - `Kennedy Space Center`

### 3. **Directions Button** (On Activities)
- Appears automatically when activity has a location
- Shows your chosen nav app (Google Maps 📍 or Waze 🚗)
- One tap to open directions in your preferred app
- Works on both mobile and desktop

---

## 📱 How to Use

### Setting Your Preferred Navigation App

1. **Look at the header** - You'll see navigation app selector
2. **Tap "Google Maps"** or **"Waze"**
3. **Your choice is saved** - applies to all activities
4. **Switch anytime** - just tap the other option

### Adding a Location to an Activity

#### When Adding New Expense:
1. Click **➕** button
2. Fill in activity details
3. In **"Location/Address"** field, enter:
   - Full address, or
   - Place name (like "Magic Kingdom")
4. Click **"Add & Sync"**
5. **Directions button appears** on the activity!

#### When Editing Existing Activity:
1. Click **⋮** on any activity
2. Click **"✏️ Edit"**
3. Add location to the **"Location/Address"** field
4. Click **"Update & Sync"**
5. **Directions button appears!**

### Getting Directions

1. **Find the activity** with a location
2. **Look for the blue button** that says:
   - 📍 **Directions (Google Maps)** or
   - 🚗 **Directions (Waze)**
3. **Tap the button**
4. **Your nav app opens** with the location ready!

---

## 🗺️ How It Works

### Google Maps
- Opens Google Maps website (desktop) or app (mobile)
- Shows location on map
- Ready to start navigation

**URL Format:**
```
https://www.google.com/maps/search/?api=1&query=[location]
```

### Waze
- Opens Waze website (desktop) or app (mobile)
- Automatically starts navigation mode
- Optimized for driving

**URL Format:**
```
https://waze.com/ul?q=[location]&navigate=yes
```

---

## 💡 Pro Tips

### For Best Results:

#### ✅ Use Specific Addresses
- **Good**: `Disney's Contemporary Resort, Bay Lake Tower, FL 32830`
- **Better**: `4600 N World Dr, Orlando, FL 32830`

#### ✅ Include City/State
- **Good**: `Magic Kingdom, Orlando, FL`
- **Okay**: `Magic Kingdom` (may work but less precise)

#### ✅ Use Official Names
- **Good**: `Kennedy Space Center Visitor Complex`
- **Avoid**: `Space center place` (too vague)

### Example Locations for Your Trip:

```
🏨 Hotels:
- Disney's Contemporary Resort, Orlando, FL
- Courtyard by Marriott Cocoa Beach Cape Canaveral

🎢 Parks:
- Magic Kingdom, Walt Disney World, FL
- EPCOT, Walt Disney World, FL
- Disney's Animal Kingdom, Orlando, FL

🍽️ Restaurants:
- Rainforest Cafe, Disney's Animal Kingdom
- Be Our Guest Restaurant, Magic Kingdom
- Space 220 Restaurant, EPCOT

🚀 Attractions:
- Kennedy Space Center Visitor Complex, FL

🚗 Car Rental:
- Alamo Rent A Car, Orlando International Airport, Terminal C
```

---

## 🔄 Switching Between Apps

### Why Switch?

**Google Maps** is great for:
- ✅ Walking directions
- ✅ Public transportation
- ✅ Multiple route options
- ✅ Street View

**Waze** is better for:
- ✅ Real-time traffic alerts
- ✅ Fastest driving routes
- ✅ Police/hazard warnings
- ✅ Community-driven updates

### How to Switch:
1. **Tap the other app** in the header
2. **All directions buttons** update instantly
3. **Preference saved** for next time

---

## 📋 Setup Required

### 1. Update Your CSV

The Location column is now the **10th column**:
```
Date,DayNumber,DayTitle,ActivityName,ActivityDetails,Cost,Note,Link,Category,Location
```

Your existing data doesn't need locations - it's optional!

### 2. Re-Deploy Google Apps Script

1. **Open Apps Script editor**
2. **Copy updated code** from `google-apps-script.js`
3. **Save and deploy**
4. New version handles the location field

---

## 📱 Mobile Experience

### On iOS (iPhone/iPad):
- **Google Maps**: Opens in Safari or Google Maps app
- **Waze**: Opens Waze app if installed, web otherwise

### On Android:
- **Google Maps**: Opens Google Maps app
- **Waze**: Opens Waze app if installed, web otherwise

### On Desktop:
- **Both apps**: Open in new browser tab
- **Mobile apps not available** on desktop (uses web versions)

---

## 🎨 Visual Indicators

### Navigation App Selector:
- **Active app**: Highlighted with border
- **Inactive app**: Dimmed

### Directions Button:
- **Google Maps**: Blue gradient with 📍 icon
- **Waze**: Blue gradient with 🚗 icon
- **Shows app name**: So you know which will open

---

## 🆘 Troubleshooting

### Button Not Appearing?
- **Check**: Did you add a location to the activity?
- **Empty field**: No button (it's optional!)
- **After adding location**: Refresh or re-render

### Wrong App Opens?
- **Check header**: Make sure correct app is selected
- **Try refreshing**: Page load initializes preference
- **Check**: Is the app installed on your phone?

### Directions Not Working?
- **Check address**: Make sure it's valid
- **Try full address**: More specific is better
- **Test in app**: Copy location, paste in Maps/Waze

---

## 🎯 Example Workflow

### Planning Your Day:

1. **Morning**: Check "Next Activity" card
2. **See**: "Magic Kingdom"
3. **Tap**: 📍 **Directions (Google Maps)**
4. **Navigate**: Google Maps opens
5. **Arrive**: Have fun!

### At the Park:

1. **Lunch time**: Open app
2. **Find**: "Rainforest Cafe Lunch" activity
3. **Tap**: 🚗 **Directions (Waze)**
4. **Navigate**: Waze guides you through park
5. **Arrive**: Enjoy your meal!

---

## ✨ Benefits

- **No more manual searching** for addresses
- **One tap navigation** to any activity
- **Choose your favorite** nav app
- **Works with your trip data** - everything in one place
- **Saves time** - no copying/pasting addresses

---

## 🎉 Enjoy Your Trip!

With directions built into your trip planner, getting around Orlando is now easier than ever!

- 🗺️ **Navigate with confidence**
- 🚗 **Choose your preferred app**
- 📍 **One tap to any location**
- 🎯 **Never get lost again**

**Have an amazing Orlando adventure!** 🏰✨

---

**Version**: 2.1 - Navigation Integration
**Created**: October 27, 2025

