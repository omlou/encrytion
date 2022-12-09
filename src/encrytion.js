(function(root,factory){
	if(typeof(module)==='object'&&typeof(module.exports)==='object'){
		module.exports["Encry"]=factory()
	}else if(typeof(exports)==='object'){
		exports["Encry"]=factory()
	}else if(typeof(root)==='object'){
		root["Encry"]=factory()
	}else if(typeof(window)==='object'){
		window["Encry"]=factory()
	}else{
		console.warn('encrytion startup failure.')
	}
})(this,function(){
	const key="EbCPDqW8IjOyQRA5MTgNUVGXYZaBcdefShiJklmnopFrstuvwxLz01234K67H9#%"
	function codeKey(pass){
		var passkey=Array.from(key)
		var keylen=passkey.length
		for(let i in Array.from(pass)){
			let ti=Number(i)%keylen
			let tar=passkey.indexOf(pass[i])
			let mid=passkey[tar]
			passkey[tar]=passkey[ti]
			passkey[ti]=mid
		}
		return passkey.join('')
	}
	function code(str,secret){
		var output=""
		var chr1,chr2,chr3,enc1,enc2,enc3,enc4
		var i=0
		str=utf8encode(str)
		while(i<str.length){
			chr1=str.charCodeAt(i++)
			chr2=str.charCodeAt(i++)
			chr3=str.charCodeAt(i++)
			enc1=chr1>>2
			enc2=((chr1&3)<<4)|(chr2>>4)
			enc3=((chr2&15)<<2)|(chr3>>6)
			enc4=chr3&63
			if(isNaN(chr2)){
				enc3=enc4=64
			}else if(isNaN(chr3)){
				enc4=64
			}
			output=output+secret.charAt(enc1)+secret.charAt(enc2)+secret.charAt(enc3)+secret.charAt(enc4)
		}
		return output
	}
	function utf8encode(string){
		string=string.replace(/\r\n/g,"\n")
		var utftext=""
		for(var n=0;n<string.length;n++){
			var c=string.charCodeAt(n)
			if(c<128){
				utftext+=String.fromCharCode(c)
			}else if((c>127)&&(c<2048)){
				utftext+=String.fromCharCode((c>>6)|192)
				utftext+=String.fromCharCode((c&63)|128)
			}else{
				utftext+=String.fromCharCode((c>>12)|224)
				utftext+=String.fromCharCode(((c>>6)&63)|128)
				utftext+=String.fromCharCode((c&63)|128)
			}
		}
		return utftext
	}
	function utf8decode(utftext){
		var string=""
		var i=0
		var c=0,c1=0,c2=0
		while(i<utftext.length){
			c=utftext.charCodeAt(i)
			if(c<128){
				string+=String.fromCharCode(c)
				i++
			}else if((c>191)&&(c<224)){
				c1=utftext.charCodeAt(i+1)
				string+=String.fromCharCode(((c&31)<<6)|(c1&63))
				i+=2
			}else{
				c1=utftext.charCodeAt(i+1)
				c2=utftext.charCodeAt(i+2)
				string+=String.fromCharCode(((c&15)<<12)|((c1&63)<<6)|(c2&63))
				i+=3
			}
		}
		return string
	}
	return {
		encrypt:function(input,password){
			if(password)return code(input,codeKey(code(password,key)))
			return code(input,key)
		},
		decrypt:function(input,password){
			var passkey=password?codeKey(code(password,key)):key;
			var output=""
			var chr1,chr2,chr3
			var enc1,enc2,enc3,enc4
			var i=0
			input=input.replace((new RegExp(`[^${passkey}]`,'g')),"")
			while(i<input.length){ 
				enc1=passkey.indexOf(input.charAt(i++))
				enc2=passkey.indexOf(input.charAt(i++))
				enc3=passkey.indexOf(input.charAt(i++))
				enc4=passkey.indexOf(input.charAt(i++))
				chr1=(enc1<<2)|(enc2>>4)
				chr2=((enc2&15)<<4)|(enc3>>2)
				chr3=((enc3&3)<<6)|enc4
				output=output+String.fromCharCode(chr1)
				if(enc3!=64){
					output=output+String.fromCharCode(chr2)
				}
				if(enc4!=64){
					output=output+String.fromCharCode(chr3)
				}
			}
			output=utf8decode(output).replace(/\u0000/g,"")
			return output
		}
	}
})