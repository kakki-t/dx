function 計算() {

  const 出力ログシート = SpreadsheetApp.openById("1_duAyzhKkGTwJPsQfBNfEyutSFuPhCGcmuc_ai7cKhE").getSheetByName("出力ログ");




  const 講師マスタシート = SpreadsheetApp.openById("1LczWX1DSXEQBLqOwOCWivIzNjl4rqnOCy-IkmlMSCBA").getSheetByName("講師マスタ");
  var 講師名リスト = sheet_students_master.getRange(2, 3, sheet_students_master.getLastRow()-1, 1).getValues().flat();
  var 生徒IDリスト = sheet_students_master.getRange(2, 4, sheet_students_master.getLastRow()-1, 1).getValues();
  var 保護者IDリスト = sheet_students_master.getRange(2, 5, sheet_students_master.getLastRow()-1, 1).getValues();
  var 担当者リスト = sheet_students_master.getRange(2, 6, sheet_students_master.getLastRow()-1, 5).getValues();
  if(カルテ管理マスタシート.getLastRow() == 1){
    var カルテ作成済み一覧 = [];
    var マスタ教科列 = [];
  }else{
    var カルテ作成済み一覧 = カルテ管理マスタシート.getRange(2, 3, カルテ管理マスタシート.getLastRow()-1, 1).getValues();
    var マスタ教科列 = カルテ管理マスタシート.getRange(2, 4, カルテ管理マスタシート.getLastRow()-1, 1).getValues().flat();
  }
  
  
  
  //Logger.log(カルテ作成済み一覧.flat())
  //Logger.log(生徒名リスト);
  //Logger.log(マスタ教科列);

  // コピーの実行
  for(var i = 0; i < sheet_students_master.getLastRow()-1; i++){

      var exist = カルテ作成済み一覧.flat().indexOf(生徒名リスト[i]);
      var 教科判定 = '';
      if(exist != -1){
        教科判定 = マスタ教科列[exist];
        
      }
      Logger.log('教科判定：　' + 教科判定);
      Logger.log('exist：　' + exist);
      Logger.log('生徒名：　' + 生徒名リスト[i]);


      if(exist == -1 || (exist != -1 && 教科判定 == '') ){
          var copy = file.makeCopy(生徒名リスト[i] + '_カルテ【教科を入力】' ,folder);
          console.log(生徒名リスト[i]);
          カルテ管理マスタシート.appendRow([,,生徒名リスト[i], , copy.getId(), copy.getUrl()]);

          const グラフ一覧シート = SpreadsheetApp.openById(copy.getId()).getSheetByName("グラフ一覧");
          グラフ一覧シート.getRange(1,1).setValue(生徒名リスト[i]);
          Logger.log('シート生成しました');

      }
    
  }
  
}
