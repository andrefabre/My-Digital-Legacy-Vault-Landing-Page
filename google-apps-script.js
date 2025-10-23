/**
 * Google Apps Script for Digital Legacy Vault Click Tracking
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet named "Digital Legacy Vault - Click Tracking"
 * 2. Add the following headers in row 1:
 *    A: Timestamp, B: Event Type, C: Session ID, D: Tracking ID, E: Element Type
 *    F: Element Text, G: Page, H: Referrer, I: User Agent, J: Screen Size, K: Viewport Size
 * 3. Go to Extensions → Apps Script
 * 4. Paste this code
 * 5. Deploy as Web App (Execute as: Me, Access: Anyone)
 * 6. Copy the Web App URL and paste it in script.js
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Prepare row data
    var rowData = [
      data.timestamp || new Date().toISOString(),
      data.eventType || '',
      data.sessionId || '',
      data.trackingId || '',
      data.elementType || '',
      data.elementText || '',
      data.page || '',
      data.referrer || '',
      data.userAgent || '',
      data.screenSize || '',
      data.viewportSize || ''
    ];
    
    // Append data to sheet
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data recorded'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    'status': 'active',
    'message': 'Click tracking endpoint is active'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Optional: Function to clean up old data (run manually or via time-based trigger)
function cleanupOldData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 90); // Keep last 90 days
  
  var rowsToDelete = [];
  for (var i = data.length - 1; i > 0; i--) {
    var timestamp = new Date(data[i][0]);
    if (timestamp < cutoffDate) {
      rowsToDelete.push(i + 1);
    }
  }
  
  // Delete old rows
  rowsToDelete.forEach(function(row) {
    sheet.deleteRow(row);
  });
  
  Logger.log('Deleted ' + rowsToDelete.length + ' old rows');
}
