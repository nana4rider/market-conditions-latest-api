function doGet(e) {
  // 読み込むスプレッドシートのID
  const SPINACH_SPREAD_SHEET_ID = '14Ay5nUODAEEkPN96TDACLuBb7iY9o3sPsIXsBGcfHiY';
  const WATERMELON_SPREAD_SHEET_ID = '17Kpv0RtSzGwyXDYKM5yznJUJ7dwIag2lBJ0U5hko9uo';
  // 取得する日数制限
  const LIMIT_DAYS = 7;

  var today = Moment.moment();
  var sheetName = String(today.year());
  var values = { spinach: null, spinachGraph: null, watermelon: null, watermelonGraph: null };

  var spinachSpreadSheet = SpreadsheetApp.openById(SPINACH_SPREAD_SHEET_ID);
  var spinachSheet = spinachSpreadSheet.getSheetByName(sheetName);
  if (spinachSheet !== null) {
    var spinachData = spinachSheet.getRange(
      spinachSheet.getLastRow(), 1, 1, 5).getValues()[0];
    var spinachDate = Moment.moment(spinachData[0]);

    if (today.diff(spinachDate, 'days') <= LIMIT_DAYS) {
      values.spinach = spinachData;
      values.spinachGraph = Utilities.base64Encode(spinachSheet.getCharts()[0].getBlob().getBytes());
    }
  }

  var watermelonSpreadSheet = SpreadsheetApp.openById(WATERMELON_SPREAD_SHEET_ID);
  var watermelonSheet = watermelonSpreadSheet.getSheetByName(sheetName);
  if (watermelonSheet !== null) {
    var watermelonData = watermelonSheet.getRange(
      watermelonSheet.getLastRow(), 1, 1, 11).getValues()[0];
    var watermelonDate = Moment.moment(watermelonData[0]);

    if (today.diff(watermelonDate, 'days') <= LIMIT_DAYS) {
      values.watermelon = watermelonData;

      values.watermelonGraph = Utilities.base64Encode(watermelonSheet.getCharts()[0].getBlob().getBytes());
    }
  }

  var content = JSON.stringify(values, null, 2);

  return ContentService.createTextOutput(content)
    .setMimeType(ContentService.MimeType.JSON);
}
