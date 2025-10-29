// Google Apps Script - Paste this into your Google Sheet
// Handles both Activities (Sheet1) and Checklists tabs

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    Logger.log('RAW JSON STRING: ' + e.postData.contents);
    Logger.log('PARSED DATA: ' + JSON.stringify(data));

    // Determine which sheet based on data type
    if (data.type === 'checklist') {
      return handleChecklistAction(data);
    } else {
      return handleActivityAction(data);
    }

  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle Activity actions (add, update, delete)
function handleActivityAction(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');

  if (data.action === 'update') {
    return updateActivity(sheet, data);
  } else if (data.action === 'delete') {
    return deleteActivity(sheet, data);
  } else {
    return addActivity(sheet, data);
  }
}

// Add new activity
function addActivity(sheet, data) {
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

  Logger.log('✅ Activity added to Sheet1!');

  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Activity added successfully'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Update existing activity
function updateActivity(sheet, data) {
  var originalDateStr = data.originalDateStr || data.dateStr;  // Original date to find the row
  var oldName = data.oldName;                                   // Original name to find the row
  var newDateStr = data.dateStr;                               // New date (might be same or different)

  Logger.log('🔍 UPDATE ACTIVITY - Finding: Date="' + originalDateStr + '", Name="' + oldName + '"');
  Logger.log('🔍 New values - Date="' + newDateStr + '", Name="' + data.name + '", Cost="' + data.cost + '"');

  // Find the row
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  Logger.log('📊 Searching ' + (values.length - 1) + ' rows...');

  for (var i = 1; i < values.length; i++) {
    var rowDate = values[i][0];
    var rowName = values[i][3];

    if (rowDate === originalDateStr && rowName === oldName) {

      Logger.log('✅ FOUND at row ' + (i + 1) + '! Updating...');

      // Update all fields (use the NEW dateStr in case date was changed)
      sheet.getRange(i + 1, 1).setValue(newDateStr || '');
      sheet.getRange(i + 1, 2).setValue(data.dayNumber || '');
      sheet.getRange(i + 1, 3).setValue(data.dayTitle || '');
      sheet.getRange(i + 1, 4).setValue(data.name || '');
      sheet.getRange(i + 1, 5).setValue(data.details || '');
      sheet.getRange(i + 1, 6).setValue(data.cost || '');
      sheet.getRange(i + 1, 7).setValue(data.link || '');
      sheet.getRange(i + 1, 8).setValue(data.category || 'Others');
      sheet.getRange(i + 1, 9).setValue(data.location || '');
      sheet.getRange(i + 1, 10).setValue(data.time || '');

      Logger.log('✅ UPDATED all 10 columns at row ' + (i + 1));

      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Activity updated',
          row: i + 1
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  Logger.log('❌ Activity NOT FOUND - Date: "' + originalDateStr + '", Name: "' + oldName + '"');
  Logger.log('💡 First few rows in sheet:');
  for (var j = 1; j < Math.min(5, values.length); j++) {
    Logger.log('  Row ' + (j + 1) + ': Date="' + values[j][0] + '", Name="' + values[j][3] + '"');
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: 'Activity not found: ' + oldName
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Delete activity
function deleteActivity(sheet, data) {
  var dateStr = data.dateStr;
  var activityName = data.name;

  Logger.log('🔍 DELETE ACTIVITY - Date: "' + dateStr + '", Name: "' + activityName + '"');

  // Find the row
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  for (var i = 1; i < values.length; i++) {
    if (values[i][0] === dateStr && values[i][3] === activityName) {

      sheet.deleteRow(i + 1);

      Logger.log('✅ DELETED activity at row ' + (i + 1));

      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Activity deleted'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  Logger.log('❌ Activity not found for delete');

  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: 'Activity not found: ' + activityName
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handle Checklist Actions
function handleChecklistAction(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Checklists');

  if (data.action === 'add') {
    return addChecklistItem(sheet, data);
  } else if (data.action === 'update') {
    return updateChecklistItem(sheet, data);
  } else if (data.action === 'editItem') {
    return editChecklistItem(sheet, data);
  } else if (data.action === 'delete') {
    return deleteChecklistItem(sheet, data);
  } else if (data.action === 'deleteList') {
    return deleteChecklistList(sheet, data);
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: 'Unknown checklist action'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Add new checklist item
function addChecklistItem(sheet, data) {
  var listName = data.listName;
  var category = data.category;
  var itemName = data.itemName;
  var isDone = data.isDone || 'false';

  var rowData = [listName, category, itemName, isDone];

  var lastRow = sheet.getLastRow();
  var targetRow = lastRow + 1;

  sheet.getRange(targetRow, 1).setValue(listName);
  sheet.getRange(targetRow, 2).setValue(category);
  sheet.getRange(targetRow, 3).setValue(itemName);
  sheet.getRange(targetRow, 4).setValue(isDone);

  Logger.log('✅ Checklist item added: ' + itemName);

  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Checklist item added'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Update checklist item (toggle isDone or edit item)
function updateChecklistItem(sheet, data) {
  var listName = data.listName;
  var category = data.category;
  var itemName = data.itemName;
  var isDone = data.isDone;

  Logger.log('🔍 UPDATE REQUEST - List: "' + listName + '", Category: "' + category + '", Item: "' + itemName + '", isDone: ' + isDone);

  // Find the row
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  Logger.log('📊 Total rows in sheet: ' + values.length);

  for (var i = 1; i < values.length; i++) {
    var rowList = values[i][0];
    var rowCategory = values[i][1];
    var rowItem = values[i][2];

    if (rowList === listName &&
        rowCategory === category &&
        rowItem === itemName) {

      // Update isDone status - keep lowercase to match CSV format
      var isDoneValue = String(isDone).toLowerCase();
      sheet.getRange(i + 1, 4).setValue(isDoneValue);

      Logger.log('✅ FOUND & UPDATED at row ' + (i + 1) + ': ' + itemName + ' -> isDone: ' + isDoneValue);

      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Item updated',
          row: i + 1
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  Logger.log('❌ ITEM NOT FOUND - Searched ' + (values.length - 1) + ' rows');

  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: 'Item not found: ' + itemName
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Edit checklist item name
function editChecklistItem(sheet, data) {
  var listName = data.listName;
  var category = data.category;
  var oldItemName = data.oldItemName;
  var newItemName = data.newItemName;

  Logger.log('🔍 EDIT REQUEST - List: "' + listName + '", Category: "' + category + '", Old: "' + oldItemName + '", New: "' + newItemName + '"');

  // Find the row
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  for (var i = 1; i < values.length; i++) {
    if (values[i][0] === listName &&
        values[i][1] === category &&
        values[i][2] === oldItemName) {

      // Update item name (column C)
      sheet.getRange(i + 1, 3).setValue(newItemName);

      Logger.log('✅ UPDATED item name at row ' + (i + 1) + ': "' + oldItemName + '" -> "' + newItemName + '"');

      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Item name updated'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  Logger.log('❌ ITEM NOT FOUND for edit');

  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: 'Item not found: ' + oldItemName
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Delete checklist item
function deleteChecklistItem(sheet, data) {
  var listName = data.listName;
  var category = data.category;
  var itemName = data.itemName;

  // Find the row
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  for (var i = 1; i < values.length; i++) {
    if (values[i][0] === listName &&
        values[i][1] === category &&
        values[i][2] === itemName) {

      sheet.deleteRow(i + 1);

      Logger.log('✅ Deleted item: ' + itemName);

      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Item deleted'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: 'Item not found'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Delete entire checklist list
function deleteChecklistList(sheet, data) {
  var listName = data.listName;

  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  var deletedCount = 0;

  // Delete from bottom to top to avoid row shifting issues
  for (var i = values.length - 1; i >= 1; i--) {
    if (values[i][0] === listName) {
      sheet.deleteRow(i + 1);
      deletedCount++;
    }
  }

  Logger.log('✅ Deleted list: ' + listName + ' (' + deletedCount + ' items)');

  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'List deleted (' + deletedCount + ' items)'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'API is working!',
      message: 'Use POST to add data',
      sheets: {
        activities: {
          columns: ['Date', 'DayNumber', 'DayTitle', 'ActivityName', 'ActivityDetails', 'Cost', 'Link', 'Category', 'Location', 'Time']
        },
        checklists: {
          columns: ['ListName', 'Category', 'ItemName', 'IsDone'],
          actions: ['add', 'update', 'editItem', 'delete', 'deleteList']
        }
      }
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function - Activity
function testAddActivity() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');

  var testData = {
    dateStr: '2025-11-08',
    dayNumber: '8',
    dayTitle: 'Test Day - November 8',
    name: '🧪 Test Activity',
    details: 'Test details',
    cost: '45.50',
    link: 'https://test.com',
    category: 'Parks',
    location: 'Test Location, FL',
    time: '14:30'
  };

  var rowData = [
    testData.dateStr,
    testData.dayNumber,
    testData.dayTitle,
    testData.name,
    testData.details,
    testData.cost,
    testData.link,
    testData.category,
    testData.location,
    testData.time
  ];

  Logger.log('Test row data: ' + JSON.stringify(rowData));
  sheet.appendRow(rowData);
  Logger.log('Test activity added successfully!');
}

// Test function - Checklist
function testAddChecklistItem() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Checklists');

  var rowData = ['Mala do Luciano', '👕 Roupa', '🧪 Test Item', 'false'];

  Logger.log('Test checklist data: ' + JSON.stringify(rowData));
  sheet.appendRow(rowData);
  Logger.log('Test checklist item added successfully!');
}
