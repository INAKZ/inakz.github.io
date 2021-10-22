"use strict";

//ドライブのURL変換
function url_convert(){
	let urlInput, urlOutput, urlTmp, target;
	urlInput = Function("return document.url_form.url_in.value;")();
	//function urlInput(){return document.url_form.url_in.value;}
	
	urlTmp = urlInput.split('/');
	urlOutput = "https://drive.google.com/uc?id=" + urlTmp[5] + "&export=download";
	document.url_form.url_out.value = (urlOutput);
	
	target = document.getElementById("url_converted");
	target.href = (urlOutput);
}