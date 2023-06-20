function sendLineMessagebyId(userId, message) {
  //var userId = 'U9cab3dc1137a29838b92ee8f751c0d57';
  //var message = 'おはようございます！';

  /* 名前からライン送る場合に考える（未実装）
  const sheet_students_master = SpreadsheetApp.openById("1LczWX1DSXEQBLqOwOCWivIzNjl4rqnOCy-IkmlMSCBA").getSheetByName("生徒マスタ");
  var 生徒名リスト = sheet_students_master.getRange(2, 3, sheet_students_master.getLastRow(), 1).getValues();
  var 生徒IDリスト = sheet_students_master.getRange(2, 4, sheet_students_master.getLastRow(), 1).getValues();
  var 保護者IDリスト = sheet_students_master.getRange(2, 5, sheet_students_master.getLastRow(), 1).getValues();
  */
  

  //Logger.log(userId);

  var url = 'https://api.line.me/v2/bot/message/push';
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + 'UDAjOddv0/LYPn/jo8l4N3vtDbwjfcU4JHoQvS4tsvoUBWVgfE4p2d4qIhN1kSet6OnidhxNkHiFy+IMY1aCgWEU5fC9IgFIF8v9CqMO8Nx8QUpGKtfXWpk9hEgh95ovYw+onpJnYCZsgisBQQdRawdB04t89/1O/w1cDnyilFU='
  };
  var postData = {
    'to': userId,
    'messages': [
      {
        'type': 'text',
        'text': message
      }
    ]
  };
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(postData)
  };

  var response = UrlFetchApp.fetch(url, options);
  //Logger.log(response.getContentText());
}

