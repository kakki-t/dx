
function Autoreply(text) {

  var sheet = SpreadsheetApp.openById("1LczWX1DSXEQBLqOwOCWivIzNjl4rqnOCy-IkmlMSCBA").getSheetByName("自動返信wordlist");

   //シートの最終行を取得する
  var lastRow = sheet.getLastRow();
   
  //シートの全受信語句と返信語句を二次元配列で取得する
  var wordList = sheet.getRange(1,1,lastRow,2).getValues();
   
  
  //LINEで受信した語句がシートの受信語句と同じ場合、返信語句
  for(var i = 1; i < wordList.length; i++) {
    if(wordList[i][0] == text) {
    　var replyText = wordList[i][1];
    }
  }
  

  //LINEで受信した語句がシートの受信語句と一致しない場合、関数を終了する
  if(replyText == null) {
    return false;
  }else{
    return(replyText);
  }

}
