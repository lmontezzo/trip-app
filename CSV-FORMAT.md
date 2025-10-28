# CSV Data Format

## File: `trip-data.csv`

This file contains your Orlando trip itinerary with proper date-based sorting.

## Column Structure

| Column | Name | Format | Example | Required |
|--------|------|--------|---------|----------|
| 1 | Date | YYYY-MM-DD | 2025-10-30 | Yes |
| 2 | DayNumber | Number or range | 30, 1, 1-2, 6-9 | Yes |
| 3 | DayTitle | Text | Arrival Day - October 30 | Yes |
| 4 | ActivityName | Text with emoji | ✈️ Flight: Panama → Orlando | No |
| 5 | ActivityDetails | Text | Alamo - Level 4 Terminal C MCO | No |
| 6 | Cost | Number | 1600, 270.68, 45 | No |
| 7 | Note | Text | Confirmation #123456 | No |
| 8 | Link | URL | https://... | No |

## Important Notes

### Date Format (Column 1)
- **Must be in YYYY-MM-DD format** (e.g., `2025-10-30`)
- This ensures proper chronological sorting
- The app uses this to:
  - Sort days correctly (Oct 30, Oct 31, Nov 1, Nov 2...)
  - Identify which day is "today"
  - Auto-expand today's activities

### Day Number (Column 2)
- Display number shown in the app's day badge
- Can be a single number (`30`, `1`, `2`) or range (`1-2`, `6-9`)
- Used for display purposes only, sorting is done by Date

### Cost Format
- Plain numbers only: `1600`, `270.68`, `45.00`
- No currency symbols or commas
- Empty cells are allowed (for activities with no cost)

### Empty Values
- Leave cells empty (no spaces) if there's no data
- The app will handle empty values gracefully

## Example Rows

```csv
Date,DayNumber,DayTitle,ActivityName,ActivityDetails,Cost,Note,Link
2025-10-30,30,Arrival Day - October 30,✈️ Flight: Panama → Orlando,,1600,Voo CM867 - 9:40am ✈️ 2:09pm,
2025-10-30,30,Arrival Day - October 30,🚗 Pick up Rental Car,Alamo - Level 4 Terminal C MCO,270.68,Confirmation: 1489879806,
2025-11-01,1,Kennedy Space Center & Beach - Oct 31/Nov 1,🏖️ Cocoa Beach,Relaxation time,,,
```

## Publishing to Google Sheets

1. Open your Google Sheet
2. Paste the CSV data starting at cell A1
3. **File → Share → Publish to web**
4. Select your sheet tab
5. Choose **"Comma-separated values (.csv)"**
6. Click **"Publish"**
7. Copy the CSV URL
8. Update `SHEET_CSV_URL` in `index.html`

## Adding New Entries

### Via App
When you add an expense through the app, it automatically:
- Converts your selected date to YYYY-MM-DD format
- Extracts the day number
- Saves to Google Sheets with all required columns

### Manually in Google Sheets
1. Add a new row
2. Fill in the Date (YYYY-MM-DD format)
3. Fill in the DayNumber (for display)
4. Fill in the DayTitle
5. Add your activity details
6. The app will pick it up on next refresh!

## Trip Dates

- **Start**: October 30, 2025 (2025-10-30)
- **End**: November 9, 2025 (2025-11-09)
- **Duration**: 11 days

## Expected Total Budget

Based on current data: **$11,389.00**

If you see a different number, check:
- Cost column has only numbers (no symbols)
- No duplicate entries
- All costs are reasonable values

---

**Last Updated**: October 27, 2025

