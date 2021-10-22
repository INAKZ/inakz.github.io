//"use strict";

//ドライブのURL変換
function url_convert(){
	let urlInput, urlOutput, urlTmp, target;
	urlInput = Function("return document.url_form.url_in.value;")();
	//function urlInput(){return document.url_form.url_in.value;}
	
	target = document.getElementById("url_converted");
	target.href = "";
	
	urlTmp = urlInput.split('/');
	if(urlTmp[5] != undefined && urlTmp[2] == "drive.google.com"){
		urlOutput = "https://drive.google.com/uc?id=" + urlTmp[5] + "&export=download";
		target.href = (urlOutput);
	} else if(urlTmp[5] == undefined){
		urlOutput = "";
	} else {
		urlOutput = "Error:URLがGoogleDriveのものではないか、仕様変更で使えません。";
	}
	document.url_form.url_out.value = (urlOutput);
}