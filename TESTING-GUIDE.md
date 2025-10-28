# 🧪 Complete Testing Guide - Data Flow Verification

## 🎯 Purpose
This guide helps you verify that data flows correctly from your app to Google Sheets.

---

## 📋 **Pre-Test Checklist**

Before testing, make sure:

### ✅ Google Sheets Setup
- [ ] Sheet has 10 columns: Date, DayNumber, DayTitle, ActivityName, ActivityDetails, Cost, Note, Link, Category, Location
- [ ] Header row is in Row 1
- [ ] Sheet is published as CSV
- [ ] CSV URL is in `index.html` (line ~767)

### ✅ Google Apps Script
- [ ] Code from `google-apps-script.js` is pasted
- [ ] Sheet name is correct (line 8: `'Sheet1'` or your sheet name)
- [ ] Script is deployed as Web App
- [ ] Execute as: Me
- [ ] Who has access: Anyone
- [ ] Apps Script URL is in `index.html` (line ~768)

### ✅ HTML App
- [ ] Both URLs are configured (CSV and Apps Script)
- [ ] File is saved
- [ ] Browser console is open (F12)

---

## 🧪 **Test 1: Manual Apps Script Test**

This tests Google Apps Script directly without the app.

### Steps:
1. **Open Google Apps Script Editor**
2. **Select function**: `testAddRow` (from dropdown at top)
3. **Click Run** (▶️ button)
4. **Authorize if needed**
5. **Check your Google Sheet** - A test row should appear!

### Expected Result:
New row with all 10 columns filled:
```
2025-11-08 | 8 | Test Day - November 8 | 🧪 Test Activity | Test details | 45.50 | Test note | https://test.com | Parks | Test Location, FL
```

### If It Works:
✅ Google Apps Script is working correctly!
✅ Column mapping is correct!

### If It Fails:
❌ Check sheet name in line 8
❌ Check you have edit permissions
❌ Check execution log for errors

---

## 🧪 **Test 2: Add Expense Through App**

This tests the complete flow.

### Steps:
1. **Open your `index.html` in browser**
2. **Open browser console** (F12 or Cmd+Option+I)
3. **Click ➕ button**
4. **Fill in ALL fields**:
   - Date: **2025-11-08**
   - Day Title: **Test Day - November 8**
   - Activity Name: **🧪 Test Expense**
   - Category: **Parks**
   - Details: **Testing the form**
   - Cost: **50**
   - Note: **This is a test**
   - Link: **https://test.com**
   - Location: **Test Location, Orlando, FL**
5. **Click "Add & Sync"**

### What to Check:

#### In Browser Console:
You should see detailed logs like:
```
═══════════════════════════════════════
🔍 COMPLETE DATA VALIDATION
═══════════════════════════════════════
📅 Date Input: 2025-11-08
📅 Day Number (calculated): 8
📅 Day Title (final): Test Day - November 8
───────────────────────────────────────
📤 Complete Data Object Being Sent:
   1. dateStr: 2025-11-08 string
   2. dayNumber: 8 string
   3. dayTitle: Test Day - November 8 string
   4. name: 🧪 Test Expense string
   5. details: Testing the form string
   6. cost: 50 string
   7. note: This is a test string
   8. link: https://test.com string
   9. category: Parks string
  10. location: Test Location, Orlando, FL string
═══════════════════════════════════════
```

**✅ All 10 fields should show values (not `undefined`)**

#### In the App:
- ✅ Modal closes immediately
- ✅ Green notification: "✅ Saved to Google Sheets!"
- ✅ Item appears in the list instantly
- ✅ After 5 seconds, auto-refresh happens

#### In Google Sheets:
Wait 5-10 seconds, then check:
- ✅ New row at the bottom
- ✅ ALL 10 columns filled (A through J)
- ✅ Data in correct columns

### Expected Row in Google Sheets:
| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| 2025-11-08 | 8 | Test Day - November 8 | 🧪 Test Expense | Testing the form | 50 | This is a test | https://test.com | Parks | Test Location, Orlando, FL |

---

## 🧪 **Test 3: Minimal Required Fields**

Test with only required fields.

### Steps:
1. **Click ➕**
2. **Fill in ONLY**:
   - Date: **2025-11-05**
   - Activity Name: **🍕 Quick Test**
3. Leave everything else empty
4. **Click "Add & Sync"**

### Expected in Console:
```
   1. dateStr: 2025-11-05 string
   2. dayNumber: 5 string
   3. dayTitle: (auto-generated) string
   4. name: 🍕 Quick Test string
   5. details:  string (empty but defined)
   6. cost:  string (empty but defined)
   7. note:  string (empty but defined)
   8. link:  string (empty but defined)
   9. category: Others string (default)
  10. location:  string (empty but defined)
```

### Expected in Google Sheets:
| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| 2025-11-05 | 5 | Magic Kingdom - Wednesday Nov 5 (or auto-generated) | 🍕 Quick Test | (empty) | (empty) | (empty) | (empty) | Others | (empty) |

**Key**: Empty cells should be BLANK, not missing!

---

## 🧪 **Test 4: Edit Existing Activity**

### Steps:
1. **Click ⋮** on any activity
2. **Click "✏️ Edit"**
3. **Verify form is pre-filled**:
   - Date should show the date
   - Day Title should show
   - All fields populated
4. **Change something** (e.g., cost)
5. **Click "Update & Sync"**

### Expected:
- ✅ Modal closes
- ✅ Green notification: "✅ Updated!"
- ✅ Changes appear immediately
- ⚠️ Note: Won't sync to Google Sheets (local only)

---

## 🐛 **Troubleshooting**

### Issue: Date Column (A) is Empty

**Possible Causes:**
- `dateInput` is undefined → Check console log #1
- `data.dateStr` is not sent → Check console log #1
- Apps Script doesn't receive it → Check Apps Script logs

**Fix:**
1. Open console
2. Look for: `📅 Date Input:`
3. Should show: `2025-11-08` (or your selected date)
4. If empty, date picker has an issue

### Issue: DayNumber Column (B) is Empty

**Possible Causes:**
- Date parsing failed
- `dayNumber` calculation failed

**Fix:**
1. Check console log: `📅 Day Number (calculated):`
2. Should show: `8` or `30` or `5`
3. If empty, check the date parsing logic

### Issue: Columns in Wrong Order

**Possible Causes:**
- Apps Script rowData array is wrong
- Sheet has extra columns

**Fix:**
1. **Verify your sheet header**:
   ```
   Date | DayNumber | DayTitle | ActivityName | ActivityDetails | Cost | Note | Link | Category | Location
   ```
2. **No extra columns** before or between
3. Re-deploy Apps Script

### Issue: Data Shows in Console But Not in Sheets

**Possible Causes:**
- Apps Script deployment issue
- Wrong sheet name
- No permissions

**Fix:**
1. Check Apps Script logs (View → Execution log)
2. Verify sheet name matches code
3. Re-authorize if needed

---

## 📊 **Apps Script Execution Logs**

### How to View Logs:
1. **Open Apps Script Editor**
2. **Click "View" → "Executions"** (or "View" → "Logs")
3. **Add an expense** through the app
4. **Refresh the executions page**
5. **Click on the most recent execution**

### What You Should See:
```
Received data: {"dateStr":"2025-11-08","dayNumber":"8","dayTitle":"Test Day",...}
Extracted - Date: 2025-11-08, DayNumber: 8, DayTitle: Test Day
Row data to append: ["2025-11-08","8","Test Day",...]
```

### If Logs Are Empty:
- ❌ Apps Script is not being called
- ❌ Check Apps Script URL in HTML
- ❌ Check deployment is active

---

## ✅ **Success Criteria**

All three tests should pass:

1. ✅ **Manual test** adds row with all 10 columns
2. ✅ **App test** shows all fields in console
3. ✅ **Google Sheet** receives row with all 10 columns filled

---

## 🚀 **Quick Debug Command**

Open browser console and run:
```javascript
console.log('Sheet CSV URL:', SHEET_CSV_URL);
console.log('Apps Script URL:', APPS_SCRIPT_URL);
```

Both should show valid URLs (not placeholders).

---

## 📞 **Next Steps**

### After Testing:

1. **If all tests pass**: ✅ Your app is working perfectly!
2. **If Test 1 fails**: Fix Apps Script
3. **If Test 2 console shows bad data**: Fix JavaScript
4. **If Test 2 console good but Sheets bad**: Fix Apps Script or sheet structure

### Common Quick Fixes:

1. **Delete ALL test rows** from Google Sheet
2. **Re-import `trip-data.csv`** to reset structure
3. **Re-deploy Apps Script** (new version)
4. **Hard refresh app** (Ctrl+Shift+R)
5. **Try Test 2 again**

---

**Use this guide to systematically test and debug!** 🔍✨

All your files are ready - just follow the tests to verify everything works!

