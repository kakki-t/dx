function 報告書発送(){

  //var date = "2023/05"; //発送する月を入力

  var todaydate = new Date();

  var date = Browser.inputBox("発送する年/月を入力（例：2023/04）", Browser.Buttons.OK_CANCEL);
  


  const sheet_students_master = SpreadsheetApp.openById("1LczWX1DSXEQBLqOwOCWivIzNjl4rqnOCy-IkmlMSCBA").getSheetByName("生徒マスタ");
  var 生徒名リスト = sheet_students_master.getRange(2, 3, sheet_students_master.getLastRow(), 1).getValues();
  var 生徒IDリスト = sheet_students_master.getRange(2, 4, sheet_students_master.getLastRow(), 1).getValues();
  var 保護者メアドリスト = sheet_students_master.getRange(2, 12, sheet_students_master.getLastRow(), 1).getValues();
  var 保護者IDリスト = sheet_students_master.getRange(2, 5, sheet_students_master.getLastRow(), 1).getValues();


  var masterSheet = SpreadsheetApp.openById('1_duAyzhKkGTwJPsQfBNfEyutSFuPhCGcmuc_ai7cKhE').getSheetByName("カルテIDマスタ");
  var data = masterSheet.getDataRange().getValues();
  var カルテssIDリスト = masterSheet.getRange(2,4,masterSheet.getLastRow()-1, 1).getValues();
  var カルテ生徒名リスト = masterSheet.getRange(2,3,masterSheet.getLastRow()-1, 1).getValues();
  var カルテ出力TF = masterSheet.getRange(2,1,masterSheet.getLastRow()-1, 1).getValues();
  var 報告書発送TF = masterSheet.getRange(2,2,masterSheet.getLastRow()-1, 1).getValues();


 for (var i = 0; i < masterSheet.getLastRow()-1; i++) {
    

    if(報告書発送TF[i][0] == true){

      var マスター一行目 = masterSheet.getRange(1,1,1,masterSheet.getLastColumn()).getDisplayValues().flat();
      //Logger.log(マスター一行目);
      var URL出力先列 = マスター一行目.indexOf(date) + 1;
      //Logger.log(URL出力先列);
      var 報告書URL = masterSheet.getRange(i+2,URL出力先列).getValue();
      var 教科名 = masterSheet.getRange(i+2,4).getValue();
      var 生徒名 = カルテ生徒名リスト[i][0];

      for( var j = 0; j < sheet_students_master.getLastRow(); j++){
        //Logger.log(生徒名リスト[j]);
        var frag = 生徒名リスト[j].includes(生徒名);
        if( frag == true ){
          var 保護者メアドフロムマスタ = 保護者メアドリスト[j];
          var 保護者LINEID = 保護者IDリスト[j];
          var 生徒LINEID = 生徒IDリスト[j];
          break;
        }
      }
      Logger.log(保護者LINEID);

      Logger.log(報告書URL);

      if(報告書URL == ''){
        masterSheet.getRange(i+2,URL出力先列+1).setValue("未 " + Utilities.formatDate( todaydate, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss') + " (報告書pdfが存在しません)");
        continue;
      }

      var title = `【${生徒名} 様】${date}＜${教科名}＞ 授業報告書`;
      var body = `${生徒名} 様

いつもお世話になっております。
イーズMyself事務局です。
${date} 【${教科名}】 の授業報告書を送付いたします。
以下のURLよりご覧ください。

${報告書URL}

※複数科目受講の生徒には科目毎に配信しております。お手数をおかけしますが、ご確認をよろしくお願いいたします。
ご不明な点がございましたら遠慮なくお申し付けください。

数理進学予備校E'z Myself`;


  const options = {name: '数理進学予備校E\'z Myself'} ;

  
  if(保護者LINEID[0] != '' ){
    sendLineMessagebyId(保護者LINEID[0] , body);
    masterSheet.getRange(i+2,URL出力先列+1).setValue("済 " + Utilities.formatDate( todaydate, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss') + " (LINE)");
  }else{
    if(保護者メアドフロムマスタ[0] != ''){
      GmailApp.sendEmail(保護者メアドフロムマスタ[0], title, body, options);
      masterSheet.getRange(i+2,URL出力先列+1).setValue("済 " + Utilities.formatDate( todaydate, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss') + " (mail)");
    }else{
      masterSheet.getRange(i+2,URL出力先列+1).setValue("未 " + Utilities.formatDate( todaydate, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss') + " (送信失敗)");
      }

    }


      
      

      //masterSheet.getRange(i+2,1).setValue(false);

    }

  }


}