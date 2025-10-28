# 🔄 Complete Data Flow Mapping

## CSV → Google Sheets Column Structure

| Column | Name | Type | Required | Example |
|--------|------|------|----------|---------|
| **A** | Date | YYYY-MM-DD | ✅ | 2025-10-30 |
| **B** | DayNumber | Number/Range | ✅ | 30, 1, 1-2 |
| **C** | DayTitle | Text | ✅ | Arrival Day - October 30 |
| **D** | ActivityName | Text | ✅ | ✈️ Flight: Panama → Orlando |
| **E** | ActivityDetails | Text | ❌ | Alamo - Level 4 Terminal C |
| **F** | Cost | Number | ❌ | 1600, 270.68 |
| **G** | Note | Text | ❌ | Voo CM867 - 9:40am |
| **H** | Link | URL | ❌ | https://... |
| **I** | Category | Text | ❌ | Parks, Food, Hotels, Car, Flights, Shopping, Others |
| **J** | Location | Text | ❌ | Magic Kingdom Park, Walt Disney World, FL |

---

## HTML Form → Form Field IDs

| Form Label | Field ID | Input Type | Maps To CSV Column |
|------------|----------|------------|-------------------|
| Date | `addDate` | date | **A** - Date |
| Day Title | `addDayTitle` | text | **C** - DayTitle |
| Activity Name | `addName` | text | **D** - ActivityName |
| Category | `addCategory` | select | **I** - Category |
| Details (optional) | `addDetails` | textarea | **E** - ActivityDetails |
| Cost | `addCost` | text | **F** - Cost |
| Note (optional) | `addNote` | textarea | **G** - Note |
| Link (optional) | `addLink` | text | **H** - Link |
| Location/Address | `addLocation` | text | **J** - Location |

**Missing from Form**: DayNumber (Column B) - Generated from Date!

---

## JavaScript Data Object → Google Apps Script

### JavaScript Creates:
```javascript
const data = {
    dateStr: dateInput,           // From form: addDate
    dayNumber: day.toString(),    // CALCULATED from dateInput
    dayTitle: finalDayTitle,      // From form: addDayTitle OR auto-generated
    name: name,                   // From form: addName
    category: category,           // From form: addCategory
    details: details,             // From form: addDetails
    cost: cost,                   // From form: addCost
    note: note,                   // From form: addNote
    link: link,                   // From form: addLink
    location: location,           // From form: addLocation
    dateObj: dateObj,             // Date object (not sent to Sheets)
    timestamp: timestamp          // ISO timestamp (not sent to Sheets)
};
```

### Sent to Google Apps Script:
All fields above (except `dateObj` is converted to string in JSON)

---

## Google Apps Script → Google Sheets Row

### Apps Script Receives:
```javascript
{
    dateStr: "2025-10-30",
    dayNumber: "30",
    dayTitle: "Arrival Day - October 30",
    name: "Activity Name",
    category: "Parks",
    details: "Some details",
    cost: "45.00",
    note: "Some note",
    link: "https://...",
    location: "Magic Kingdom, FL",
    timestamp: "2025-10-27T..."
}
```

### Apps Script Creates Row Array:
```javascript
rowData = [
    data.dateStr,           // Column A: Date
    data.dayNumber,         // Column B: DayNumber
    data.dayTitle,          // Column C: DayTitle
    data.name,              // Column D: ActivityName
    data.details,           // Column E: ActivityDetails
    data.cost,              // Column F: Cost
    data.note,              // Column G: Note
    data.link,              // Column H: Link
    data.category,          // Column I: Category
    data.location           // Column J: Location
];
```

### Final Result in Google Sheets:
| A (Date) | B (DayNumber) | C (DayTitle) | D (ActivityName) | E (Details) | F (Cost) | G (Note) | H (Link) | I (Category) | J (Location) |
|----------|---------------|--------------|------------------|-------------|----------|----------|----------|--------------|--------------|
| 2025-10-30 | 30 | Arrival Day | Activity | Details | 45.00 | Note | https://... | Parks | Location |

---

## 🔍 Current Issue Analysis

### What Should Happen:
1. User selects **Date: 2025-11-08**
2. JavaScript extracts **dayNumber: "8"** from the date
3. JavaScript creates **dayTitle** from form or auto-generates
4. All 10 fields sent to Google Sheets
5. Row appears with ALL columns filled

### What's Happening (Bug):
- Date column (A) is **empty**
- DayNumber column (B) is **empty** or wrong
- Other columns might be shifted

### Possible Causes:
1. ❌ `data.dateStr` is not being sent correctly
2. ❌ `data.dayNumber` is not being calculated
3. ❌ Apps Script is receiving `undefined` for some fields
4. ❌ Column order mismatch

---

## 🐛 Debugging Steps

### Step 1: Check Browser Console
When adding an activity, check console for:
```
📤 Sending to Google Sheets: {
  dateStr: "2025-11-08",      ← Should have value
  dayNumber: "8",              ← Should have value
  dayTitle: "...",             ← Should have value
  ...
}
```

### Step 2: Check Apps Script Logs
1. Open Apps Script Editor
2. View → Execution log (or View → Logs)
3. Add an activity
4. Check logs for:
```
Received data: {"dateStr":"2025-11-08","dayNumber":"8",...}
Extracted - Date: 2025-11-08, DayNumber: 8, DayTitle: ...
Row data to append: ["2025-11-08","8","..."...]
```

### Step 3: Verify Column Count
- CSV header: 10 columns
- Form inputs: 9 fields (DayNumber is calculated)
- Data object: 10 fields sent to Sheets
- Apps Script rowData: 10 elements
- Google Sheets: Should have 10 columns (A-J)

---

## ✅ Expected Complete Row Example

When you add:
- **Date**: 2025-11-08
- **Day Title**: "Test Day"
- **Activity Name**: "Test Activity"
- **Category**: "Parks"
- **Details**: "Test details"
- **Cost**: "45"
- **Note**: "Test note"
- **Link**: "https://test.com"
- **Location**: "Test Location, FL"

**Should create in Google Sheets:**
```
2025-11-08 | 8 | Test Day | Test Activity | Test details | 45 | Test note | https://test.com | Parks | Test Location, FL
```

All 10 columns filled in exact order!

---

**Created**: October 28, 2025

