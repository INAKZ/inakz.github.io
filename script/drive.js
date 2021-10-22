"use strict";

//ドライブのURL変換
function url_convert(){
	let urlInput, urlOutput, urlTmp, target;
	urlInput = Function("return document.url_form.url_in.value;")();
	//function urlInput(){return document.url_form.url_in.value;}
	
	target = document.getElementById("url_converted");
	target.href = "";
	
	urlTmp = urlInput.split('/');
	if(urlTmp[6] != undefined && urlTmp[2] == "drive.google.com"){
		//urlTmp[6]がundefined -> URLが不完全（別になくてもいいけど…）
		urlOutput = "https://drive.google.com/uc?id=" + urlTmp[5] + "&export=download";
		target.href = (urlOutput);
	} else if(urlTmp[0] != "https:" && urlTmp[0] != "http:"){
		//URLじゃないとき（入力途中にしゃしゃり出てきて目障りなのを軽減）
		urlOutput = "";
	} else {
		urlOutput = "Error:URLが不完全、または仕様変更により使えません。";
	}
	document.url_form.url_out.value = (urlOutput);
}