function createPdf(PDFを作成するフォルダのID,pdfのファイル名,スプレッドシート,シート){
   //pdfを作成するフォルダのIDに置き換えてください
   var folderId = PDFを作成するフォルダのID ;
   var targetFolder = DriveApp.getFolderById(folderId);

   var fileName = pdfのファイル名;

    //pdf化するスプレッドシートを取得
   //var ss = SpreadsheetApp.openById(スプレッドシートID);
   var ss = スプレッドシート;
   var sheet_id = シート.getSheetId();
   var baseUrl = "https://docs.google.com/spreadsheets/d/"
          +  ss.getId()
          + "/export?id="
          + ss.getId();
 
    var options = "&exportFormat=pdf&format=pdf"
             // + '&id=' + newSs.getId()
              + "&size=A4" //用紙サイズ (A4)
              + "&portrait=true"  //用紙の向き true: 縦向き / false: 横向き
              + "&scale=4"
              + "&fitw=true"  //ページ幅を用紙にフィットさせるか true: フィットさせる / false: 原寸大
              + "&top_margin=0.50" //上の余白
              + "&right_margin=0.50" //右の余白
              + "&bottom_margin=0.50" //下の余白
              + "&left_margin=0.50" //左の余白
              + "&horizontal_alignment=CENTER" //水平方向の位置
              + "&vertical_alignment=TOP" //垂直方向の位置
              + "&printtitle=false" //スプレッドシート名の表示有無
              + "&sheetnames=false" //シート名の表示有無
              + "&gridlines=false" //グリッドラインの表示有無
              + "&fzr=false" //固定行の表示有無
              + "&fzc=false" //固定列の表示有無
              + "&gid=" + sheet_id //固定列の表示有無;

      var url = baseUrl + options;

      var token = ScriptApp.getOAuthToken();

      var options = {
        headers: {
          'Authorization': 'Bearer ' +  token
        }
      };
 
 
      var blob = UrlFetchApp.fetch(url, options).getBlob().setName(fileName + '.pdf');
      var pdf = targetFolder.createFile(blob);
      return pdf.getUrl();

}