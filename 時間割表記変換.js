function jikanConverter(フルネームインプット) {
  const 三代目契約講師一覧シート = SpreadsheetApp.openById("13BoYAn4RCQDM4ReLCt_gInWYSeY7dU3BKK2UFeKlHLI").getSheetByName("社員一覧");

  var フルマスタ = 三代目契約講師一覧シート.getRange(3,2,三代目契約講師一覧シート.getLastRow()-2, 1).getDisplayValues().flat();
  var 時間割表記マスタ = 三代目契約講師一覧シート.getRange(3,3,三代目契約講師一覧シート.getLastRow()-2, 1).getDisplayValues().flat();

  //Logger.log(フルマスタ);
  //Logger.log(時間割表記マスタ);
  
  for(var i = 0 ; i < 三代目契約講師一覧シート.getLastRow()-2; i++){
    if(フルネームインプット == フルマスタ[i]){
      var output = 時間割表記マスタ[i];
      break;
    }
  }

  return(output);
}

function a(){
  Logger.log(jikanConverter("井伊俊介"));
  
}
