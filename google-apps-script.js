// Google Apps Script - Paste this into your Google Sheet
// Tools → Script editor → Paste this code → Save → Deploy

function doPost(e) {
  try {
    // Get the active spreadsheet and sheet
    // IMPORTANT: Change 'Sheet1' to match your actual sheet tab name!
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');

    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);

    Logger.log('RAW JSON STRING: ' + e.postData.contents);
    Logger.log('PARSED DATA: ' + JSON.stringify(data));
    Logger.log('Object keys: ' + Object.keys(data).join(', '));

    // EXPLICIT extraction - check if fields exist
    var hasDateStr = data.hasOwnProperty('dateStr');
    var hasDayNumber = data.hasOwnProperty('dayNumber');

    Logger.log('Has dateStr? ' + hasDateStr + ' Value: "' + data.dateStr + '"');
    Logger.log('Has dayNumber? ' + hasDayNumber + ' Value: "' + data.dayNumber + '"');

    // Build row manually, field by field
    var col_A = data.dateStr ? String(data.dateStr) : '';
    var col_B = data.dayNumber ? String(data.dayNumber) : '';
    var col_C = data.dayTitle ? String(data.dayTitle) : '';
    var col_D = data.name ? String(data.name) : '';
    var col_E = data.details ? String(data.details) : '';
    var col_F = data.cost ? String(data.cost) : '';
    var col_G = data.link ? String(data.link) : '';
    var col_H = data.category ? String(data.category) : 'Others';
    var col_I = data.location ? String(data.location) : '';
    var col_J = data.time ? String(data.time) : '';

    Logger.log('COL A (Date): "' + col_A + '"');
    Logger.log('COL B (DayNumber): "' + col_B + '"');
    Logger.log('COL H (Category): "' + col_H + '"');
    Logger.log('COL J (Time): "' + col_J + '"');

    // Create array (10 columns now - Note column removed)
    var rowData = [col_A, col_B, col_C, col_D, col_E, col_F, col_G, col_H, col_I, col_J];

    Logger.log('FINAL ROW DATA: ' + JSON.stringify(rowData));
    Logger.log('Array length: ' + rowData.length);

    // Get the next empty row
    var lastRow = sheet.getLastRow();
    var targetRow = lastRow + 1;

    // Write to specific cells
    sheet.getRange(targetRow, 1).setValue(col_A);  // A: Date
    sheet.getRange(targetRow, 2).setValue(col_B);  // B: DayNumber
    sheet.getRange(targetRow, 3).setValue(col_C);  // C: DayTitle
    sheet.getRange(targetRow, 4).setValue(col_D);  // D: ActivityName
    sheet.getRange(targetRow, 5).setValue(col_E);  // E: ActivityDetails
    sheet.getRange(targetRow, 6).setValue(col_F);  // F: Cost
    sheet.getRange(targetRow, 7).setValue(col_G);  // G: Link
    sheet.getRange(targetRow, 8).setValue(col_H);  // H: Category
    sheet.getRange(targetRow, 9).setValue(col_I);  // I: Location
    sheet.getRange(targetRow, 10).setValue(col_J); // J: Time

    Logger.log('✅ All 10 cells written individually!');

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Item added successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'API is working!',
      message: 'Use POST to add data',
      expectedColumns: [
        'A: Date (YYYY-MM-DD)',
        'B: DayNumber',
        'C: DayTitle',
        'D: ActivityName',
        'E: ActivityDetails',
        'F: Cost',
        'G: Link',
        'H: Category',
        'I: Location',
        'J: Time'
      ]
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function - run this manually to test the mapping
function testAddRow() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');

  // Test data matching exactly what the app sends
  var testData = {
    dateStr: '2025-11-08',
    dayNumber: '8',
    dayTitle: 'Test Day - November 8',
    name: '🧪 Test Activity',
    details: 'Test details',
    cost: '45.50',
    note: 'Test note',
    link: 'https://test.com',
    category: 'Parks',
    location: 'Test Location, FL'
  };

  var rowData = [
    testData.dateStr,           // A: Date
    testData.dayNumber,         // B: DayNumber
    testData.dayTitle,          // C: DayTitle
    testData.name,              // D: ActivityName
    testData.details,           // E: ActivityDetails
    testData.cost,              // F: Cost
    testData.link,              // G: Link
    testData.category,          // H: Category
    testData.location,          // I: Location
    testData.time || '14:30'    // J: Time
  ];

  Logger.log('Test row data: ' + JSON.stringify(rowData));
  sheet.appendRow(rowData);
  Logger.log('Test row added successfully!');
}
