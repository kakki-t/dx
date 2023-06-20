const ACCESS_TOKEN = "UDAjOddv0/LYPn/jo8l4N3vtDbwjfcU4JHoQvS4tsvoUBWVgfE4p2d4qIhN1kSet6OnidhxNkHiFy+IMY1aCgWEU5fC9IgFIF8v9CqMO8Nx8QUpGKtfXWpk9hEgh95ovYw+onpJnYCZsgisBQQdRawdB04t89/1O/w1cDnyilFU=";
 
function doPost(e){
  let json = JSON.parse(e.postData.contents);
  let userId = json.events[0].source.userId;
  let groupId = json.events[0].source.groupId;
  //let userMessage = json.events[0].message.text;
  if(json.events[0].message.type == "text") {
    var userMessage = json.events[0].message.text;
    var autorepmessage = Autoreply(userMessage);
    if(autorepmessage){
    sendLineMessagebyId(userId , autorepmessage) ;
  }
  }
  if(json.events[0].message.type == "image") {
  //var image_original = json.events[0].message.originalContentUrl;
  //var image_preview = json.events[0].message.previewImageUrl;
  var resourceId = json.events[0].message.id;
  //var content_url = 'https://api-data.line.me/v2/bot/message/' + resourceId + '/content';
  var content = getImage(resourceId);


  var dir = DriveApp.getFolderById("1ximegPXSkKPUYD4B4frqkxhTXKQhCopQ");
  var file_id = dir.createFile(content).getId();
  var file_drive_url = 'https://drive.google.com/file/d/' + file_id;
  var file_url = 'https://drive.google.com/uc?id=' + file_id +'&.jpg';

  }
 
  const sheet =  SpreadsheetApp.openById("1LczWX1DSXEQBLqOwOCWivIzNjl4rqnOCy-IkmlMSCBA").getSheetByName("userID取得用");
  let row = sheet.getLastRow();
 
  sheet.getRange(row + 1,2).setValue(getUserName(userId));
  sheet.getRange(row + 1,3).setValue(userId);
  sheet.getRange(row + 1,4).setValue(groupId);

  //Logger.log(userMessage);
  /*
  let replyMessage = `from : ${getUserName(userId)}
${userMessage}`;

  //sendLineMessage("高橋一騎", replyMessage);
  */


  let range = sheet.getRange(6, 2, row, 3);
  range.removeDuplicates([3]);
/*
  let autorepmessage = Autoreply(userMessage);
  if(autorepmessage){
  sendLineMessagebyid(userId , autorepmessage) ;
  }
*/

  //LINEメッセージを受け取り、シート LINElog に追加
  const sheet2 = SpreadsheetApp.openById("1LczWX1DSXEQBLqOwOCWivIzNjl4rqnOCy-IkmlMSCBA").getSheetByName("LINElog");
  let row2 = sheet2.getLastRow();
 
  sheet2.getRange(row2 + 1,1).setValue(row2);
  sheet2.getRange(row2 + 1,2).setValue(getUserName(userId));
  sheet2.getRange(row2 + 1,3).setValue(userId);
  
  if(json.events[0].message.type == "text") {
  sheet2.getRange(row2 + 1,4).setValue(userMessage);
  }
  if(json.events[0].message.type == "image") {
  sheet2.getRange(row2 + 1,6).setValue(resourceId);
  sheet2.getRange(row2 + 1,7).setValue(file_url);
  sheet2.getRange(row2 + 1,8).setValue(file_drive_url);

  }


  const sheet_students_master = SpreadsheetApp.openById("1LczWX1DSXEQBLqOwOCWivIzNjl4rqnOCy-IkmlMSCBA").getSheetByName("生徒マスタ");
  var 生徒名リスト = sheet_students_master.getRange(2, 3, sheet_students_master.getLastRow(), 1).getValues();
  var 生徒IDリスト = sheet_students_master.getRange(2, 4, sheet_students_master.getLastRow(), 1).getValues();
  var 保護者IDリスト = sheet_students_master.getRange(2, 5, sheet_students_master.getLastRow(), 1).getValues();
  var 担当者リスト = sheet_students_master.getRange(2, 6, sheet_students_master.getLastRow(), 5).getValues();
  var 担当者数リスト = sheet_students_master.getRange(2, 11, sheet_students_master.getLastRow(), 1).getValues();
  var name_reply = -1;
  var 担当講師 = [];

  for (var i = 0; i < sheet_students_master.getLastRow(); i++){
    var flag1 = 生徒IDリスト[i].includes(userId);
    var flag2 = 保護者IDリスト[i].includes(userId);

    if( flag1 == true ){
      name_reply = 生徒名リスト[i] + ' ';
      for(var j = 0; j < 担当者数リスト[i]; j++){
        担当講師[j] = 担当者リスト[i][j];
        }
      var student_number =  i + 2;
      break;
    }
    if( flag2 == true ){
      name_reply = 生徒名リスト[i] + '（保護者） ';
      for(var j = 0; j < 担当者数リスト[i]; j++){
        担当講師[j] = 担当者リスト[i][j];
        }
      var student_number =  i + 2;
      break;
    }

  }

  if(name_reply == -1){
    name_reply = getUserName(userId) + ' ＜マスタ未登録＞ ';
  }

  sheet2.getRange(row2 + 1,5).setValue(name_reply);
  toslack(name_reply, 担当講師);

  

}
 
function getUserName(userId) {
  const url = "https://api.line.me/v2/bot/profile/" + userId;
  const response = UrlFetchApp.fetch(url, {
              "headers" : {
              "Authorization" : "Bearer " + ACCESS_TOKEN
              }
  });
  return JSON.parse(response.getContentText()).displayName;
}

//LINEのトーク画面にユーザーが投稿した画像を取得し、返却する関数
function getImage(id) {
  //画像取得用エンドポイント
  const url = 'https://api-data.line.me/v2/bot/message/' + id + '/content';
  const data = UrlFetchApp.fetch(url, {
    'headers': {
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'get'
  });
  //ファイル名を被らせないように、今日のDateのミリ秒をファイル名につけて保存
  //var today = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
  var today = Number(new Date());
  const img = data.getBlob().setName(today + '.jpg');

  return img;
}






