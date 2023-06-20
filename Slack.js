function toslack(name,担当講師){
  const sheet_log = SpreadsheetApp.openById("1LczWX1DSXEQBLqOwOCWivIzNjl4rqnOCy-IkmlMSCBA").getSheetByName("LINElog");
  let last_row_log = sheet_log.getLastRow();


  let id = sheet_log.getRange( last_row_log, 1, 1, 1).getValue();


  if(sheet_log.getRange( last_row_log, 4, 1, 1).getValue()){
    var text = sheet_log.getRange( last_row_log, 4, 1, 1).getValue();



    var message = slack_mention(担当講師) + "\n" + "========================\nメッセージID: " + id + "\n" + name + "さんからのメッセージ\n========================\n" + text;
    var postUrl = "https://hooks.slack.com/services/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";

    notifyslack(message,postUrl);

  }

  if(sheet_log.getRange( last_row_log, 7, 1, 1).getValue()){
    var text = sheet_log.getRange( last_row_log, 7, 1, 1).getValue();
    Logger.log(text);

    var postUrl = "https://hooks.slack.com/services/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";
    var userName = "Myself Official LINE";
    var message = slack_mention(担当講師) + "\n" + "========================\nメッセージID: " + id + "\n" + name + "さんからのメッセージ\n========================\n";

    var payloadObj = {
    username : userName,
    text : message,
    attachments : [{
    /*
    fields: [
      {
        title: "画像タイトル",
        value: "ここは画像の説明を記述できます。",
      }
    ],
    */
    image_url : text
    }]
  }

  var payloadJson = JSON.stringify(payloadObj);
  var option = {
    method:"post",
    contentType:"application/json",
    payload:payloadJson

  }
  
  UrlFetchApp.fetch(postUrl, option);

  }
  


}

function notifyslack(message, postUrl){
  //var postUrl = "https://hooks.slack.com/services/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";
  var userName = "Myself Official LINE";
  //var message = "test";

  var payloadObj = {
    username : userName,
    text : message
  }

  var payloadJson = JSON.stringify(payloadObj);
  var option = {
    method:"post",
    contentType:"application/json",
    payload:payloadJson

  }
  
  UrlFetchApp.fetch(postUrl, option);

};




function get_Slack_username(name_teature){
  const sheet_teatures_master = SpreadsheetApp.openById("1LczWX1DSXEQBLqOwOCWivIzNjl4rqnOCy-IkmlMSCBA").getSheetByName("講師マスタ");
  var 講師名マスタ = sheet_teatures_master.getRange(2, 1, sheet_teatures_master.getLastRow(), 1).getValues();
  var Slackユーザー名マスタ = sheet_teatures_master.getRange(2, 3, sheet_teatures_master.getLastRow(), 1).getValues();
  var Slack_username = '';
  
  for (var i = 0; i < sheet_teatures_master.getLastRow(); i++){
    var flag = 講師名マスタ[i].includes(name_teature);
    
    if( flag == true ){
      Slack_username = Slackユーザー名マスタ[i];
      return Slack_username;
    }

  }
  return Slack_username;

}


function slack_mention(input){
  var 担当講師SlackIDs = [];
//メンション最大数を設定
  for(var i = 0; i < input.length; i++){
    担当講師SlackIDs[i] = "<@" + get_Slack_username(input[i]) + ">";
  }
  
  var mention_str =  担当講師SlackIDs.join(" ");
  return mention_str;
}
