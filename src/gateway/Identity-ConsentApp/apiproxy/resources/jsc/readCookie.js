var cookieHeader = context.Variable("request.header.Cookie");


if (cookieHeader != null && cookieHeader !=""){
	cookies= cookieHeader.split(';')
}

var cookieId=getCookie("id");
var username=getCookie("Id");




function getCookie(cname){
for(var i=0; i<cookies.length; i++) 
  {
  var c = cookies[i].trim();
  if (c.indexOf(name)==0) 
	  return c.substring(name.length,c.length);
  }
return "";
}