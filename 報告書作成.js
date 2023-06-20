function 報告書pdf連続生成() {
  var todaydate = new Date();
  var 現在時刻 = Utilities.formatDate( todaydate, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');

  // マスターシートからデータを取得
  var masterSheet = SpreadsheetApp.openById('1_duAyzhKkGTwJPsQfBNfEyutSFuPhCGcmuc_ai7cKhE').getSheetByName("カルテIDマスタ");
  var data = masterSheet.getDataRange().getValues();
  var カルテssIDリスト = masterSheet.getRange(2,5,masterSheet.getLastRow()-1, 1).getValues();
  var カルテ生徒名リスト = masterSheet.getRange(2,3,masterSheet.getLastRow()-1, 1).getValues();
  var マスタ教科列 = masterSheet.getRange(2,4,masterSheet.getLastRow()-1, 1).getValues();

  var カルテ出力TF = masterSheet.getRange(2,1,masterSheet.getLastRow()-1, 1).getValues();
  var 報告書発送TF = masterSheet.getRange(2,2,masterSheet.getLastRow()-1, 1).getValues();
  


  

  
  // 出力先フォルダのIDを設定
  var folderId = "1g-ya8pDtN03cJ8DP6xotceikZoEjL0P-";
  //var folderId_share = "1uH3Z-LVT8YQtqF7L_wVNc1Nx1Nx3o4Z3";
  var folder = DriveApp.getFolderById(folderId);
  

  
  // データの行数だけループ
  for (var i = 0; i < masterSheet.getLastRow()-1; i++) {
    

    if(カルテ出力TF[i][0] == true){


      var グラフ一覧シート = SpreadsheetApp.openById(カルテssIDリスト[i][0]).getSheetByName("グラフ一覧");
      var 授業方針シート = SpreadsheetApp.openById(カルテssIDリスト[i][0]).getSheetByName("授業方針");
      var 月次報告シート = SpreadsheetApp.openById(カルテssIDリスト[i][0]).getSheetByName("講師からの月次報告");
      var 生徒名 = グラフ一覧シート.getRange(1,1).getValue();
      var 教科 = 授業方針シート.getRange(1,2).getValue();
      
      var 報告書作成者抽出用行番号 = 月次報告シート.getRange(2,9).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
      var 報告書作成者 = 月次報告シート.getRange(報告書作成者抽出用行番号,2).getValue();

      Logger.log(報告書作成者);
      Logger.log(生徒名);
      Logger.log(教科);
      //Logger.log(カルテ生徒名リスト[0][0])


      // テンプレートのシートを取得

      var templateSS = SpreadsheetApp.openById(カルテssIDリスト[i][0]);
      //var templateSS_id = templateSS.getId();
      var templateSheet = templateSS.getSheetByName("報告書");
      var date = templateSheet.getRange(1,10).getDisplayValue();
      Logger.log(date);
      //var templateSheet_id = templateSheet.getSheetId();
      
      // 報告書のファイル名を作成
      var fileName = カルテ生徒名リスト[i][0] + "さんの報告書" +"【"+ 教科 + "】_"+ date;

      var files = folder.getFilesByName(fileName + ".pdf");
      while (files.hasNext()) {
        var file = files.next();
        file.setTrashed(true);
      }

      var 報告書URL = createPdf(folderId,fileName,templateSS,templateSheet);
      
      var マスター一行目 = masterSheet.getRange(1,1,1,masterSheet.getLastColumn()).getDisplayValues().flat();
      //Logger.log(マスター一行目);
      var URL出力先列 = マスター一行目.indexOf(date) + 1;
      //Logger.log(URL出力先列);
      masterSheet.getRange(i+2,URL出力先列).setValue(報告書URL);
      masterSheet.getRange(i+2,URL出力先列+1).setValue( 報告書作成者 + ' 作成 ' + 現在時刻);

      var 出力ログシート = SpreadsheetApp.openById('1_duAyzhKkGTwJPsQfBNfEyutSFuPhCGcmuc_ai7cKhE').getSheetByName("出力ログ");
      出力ログシート.appendRow([現在時刻,報告書作成者,jikanConverter(報告書作成者),生徒名,教科,date,報告書URL]);


      
      

      masterSheet.getRange(i+2,1).setValue(false);

    }

  }

}