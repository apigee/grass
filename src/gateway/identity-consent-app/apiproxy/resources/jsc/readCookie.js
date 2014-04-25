var cookieHeader = context.getVariable("request.header.Cookie");
cookies=[];

if (cookieHeader != null && cookieHeader !=""){
	cookies= cookieHeader.split(';')
}

var sessionIdForCookie=getCookie("id");

context.setVariable("sessionIdForCookie",sessionIdForCookie)


function getCookie(cname)
{
var name = cname + "=";
for(var i=0; i<cookies.length; i++) 
  {
  var c = cookies[i].trim();
  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
return "";
}
