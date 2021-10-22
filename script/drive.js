"use strict";

//URL変換
function url_convert(){
	let urlInput, urlOutput, urlTmp, target, mode;
	urlInput = Function("return document.url_form.url_in.value;")();
	target = document.getElementById('url_mode');
	mode = target.value;
	target = document.getElementById("url_converted");
	target.href = "";
	
	urlOutput = "";
	urlTmp = urlInput.split('/');
	switch(mode){
		case '0':
			//一般的なモードにする予定　予定は未定
			break;
		case '1':
			//Google Drive
			if(urlTmp[6] != undefined && urlTmp[2] == "drive.google.com"){
				//urlTmp[6]がundefined -> URLが不完全（別になくてもいいけど…）
				urlOutput = "https://drive.google.com/uc?id=" + urlTmp[5] + "&export=download";
				target.href = (urlOutput);
			} else if(urlTmp[0] != "https:" && urlTmp[0] != "http:"){
				//URLじゃないとき（入力途中にしゃしゃり出てきて目障りなのを軽減）
				urlOutput = "";
			} else {
				urlOutput = "Error:URLが不正であるかまたは仕様変更により使えません";
			}
			break;
		case '2':
			//youtube->piped
			if(urlTmp[3] != undefined && urlTmp[2] == "www.youtube.com"){
				urlOutput = "https://piped.kavin.rocks/" + urlTmp[3];
				for(let i = 4; i < 30; i++){
					//チャンネル・プレイリスト用
					if(urlTmp[i] == undefined){break;}
					urlOutput = urlOutput + '/' + urlTmp[i];
				}
				target.href = (urlOutput);
			} else if(urlTmp[0] != "https:" && urlTmp[0] != "http:"){
				urlOutput = "";
			} else {
				urlOutput = "Error:URLが不正であるかまたは仕様変更により使えません";
			}
			break;
		case '3':
			//twitter->nitter
			if(urlTmp[3] != undefined && urlTmp[2] == "twitter.com"){
				urlOutput = "https://nitter.net/" + urlTmp[3];
				for(let i = 4; i < 30; i++){
					if(urlTmp[i] == undefined){break;}
					urlOutput = urlOutput + '/' + urlTmp[i];
				}
				target.href = (urlOutput);
			} else if(urlTmp[0] != "https:" && urlTmp[0] != "http:"){
				urlOutput = "";
			} else {
				urlOutput = "Error:URLが不正であるかまたは仕様変更により使えません";
			}
			break;
		default:
			urlOutput = "Error:ソースコードが不正です";
	}
	document.url_form.url_out.value = (urlOutput);
}

//ドライブのURL変換
function url_drive(){	
	let urlInput, urlOutput, urlTmp, target;
	urlInput = Function("return document.url_form.url_in.value;")();
	//eval(document.url_form.url_in.value)のより安全な記述法らしいけど、よくわからん
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
