"use strict";

//出力をクリップボードにコピー
function CopyToClipboard(){
	let target = Function("return document.url_form.url_out.value;")();
	navigator.clipboard.writeText(target).then(function() {
		//成功したら選択
		document.url_form.url_out.select();
	}, function() {
		//失敗したらアラート
		alert("コピーに失敗しました");
	});
}

//URL変換
function UrlConvert(){
	const M_GEN = '0', M_DRI = '1', M_PIP = '2', M_INV = '3', M_NIT = '4', M_NITS = '5';
	const invIns = ["invidious.namazso.eu", "invidio.xamh.de", "vid.puffyan.us", "youtube.076.ne.jp", "yewtu.be", "invidious-us.kavin.rocks", "inv.riverside.rocks", "vid.mint.lgbt", "invidious-jp.kavin.rocks", "invidious.snopyta.org", "invidious.kavin.rocks", "yt.artemislena.eu", "invidious.osi.kr"];
	const nitIns = ["nitter.net", "nitter.42l.fr", "nitter.pussthecat.org", "nitter.nixnet.services", "nitter.fdn.fr", "nitter.1d4.us", "nitter.kavin.rocks", "nitter.vxempire.xyz", "nitter.unixfox.eu", "nitter.unixfox.eu", "nitter.eu", "nitter.namazso.eu", "nitter.mailstation.de", "nitter.actionsack.com", "birdsite.xanny.family", "nitter.hu", "nitter.exonip.de", "twitr.gq", "nitter.moomoo.me", "bird.trom.tf", "nitter.it", "twitter.censors.us", "nitter.grimneko.de", "nitter.koyu.space", "nitter.alefvanoon.xyz", "nitter.ir", "nitter.autarkic.org", "n.0x0.st", "n.hyperborea.cloud", "nitter.ca", "twitter.076.ne.jp", "lu-nitter.resolv.ee", "is-nitter.resolv.ee", "cy-nitter.resolv.ee", "nitter.mstdn.social", "nitter.fly.dev", "notabird.site", "nitter-jp.kavin.rocks"];
	let urlInput, urlOutput, urlTmp, target, mode;
	urlInput = Function("return document.url_form.url_in.value;")();
	target = document.getElementById('url_mode');
	mode = target.value;
	target = document.getElementById("url_converted");
	target.href = "";
	
	urlOutput = "";
	urlTmp = urlInput.split('/');
	switch(mode){
		case M_GEN:
			//一般的なモードにする予定　予定は未定
			break;
		case M_DRI:
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
		case M_PIP:
			//youtube->piped
			if(urlTmp[3] != undefined && (urlTmp[2] == "www.youtube.com" || urlTmp[2] == "youtu.be")){
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
		case M_INV:
			if(urlTmp[3] != undefined && (urlTmp[2] == "www.youtube.com" || urlTmp[2] == "youtu.be")){
				urlOutput = "https://" + invIns[Math.floor(Math.random() * invIns.length)] + '/' + urlTmp[3];
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
		case M_NIT:
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
		case M_NITS:
			if(urlTmp[3] != undefined && urlTmp[2] == "twitter.com"){
				urlOutput = "https://" + nitIns[Math.floor(Math.random() * nitIns.length)] + '/' + urlTmp[3];
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
