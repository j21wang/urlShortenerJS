var alphabet = "abcdefghijklmnopqrstuvwxyz0123456789./";

var map = ['b','i','5','2','z','w','m','k','9','0',
           'j','n','q','r','4','p','u','a','3','o',
           'c','1','6','x','d','f','e','7','h','g',
           'l','s','8','v','t','y','.','/']

var randomPeriod = ['-','_','~','&','!'];
var randomSlash = ['@','[',']','+','='];

$(document).ready(function(){
    $("#submit").click(function(){
        var longURL = $("#longURL")[0].value;
        var encoded = shortenURL(longURL);
        alert(encoded);
    })
})

function shortenURL(longURL){

    var longURL = prependPrefix(longURL);
    var isValid = validateURL(longURL);

    if(isValid){
        longURL = truncateURL(longURL);
        shortenedURL = 'http://www.jwang.io/' + encodeURL(longURL);
        return shortenedURL;
    } else {
        alert("Error: Please enter a valid URL!");
    }
}

function truncateURL(url){
    var containsHTTP = /^(http)/.test(url);
    var containsHTTPS = /^(https)/.test(url);
    var containsFTP = /^(ftp)/.test(url);

    if(containsHTTP){
        url = url.substring(7); //truncate http://
    } else if(containsHTTPS){
        url = url.substring(8); //truncate https://
    } else if(containsFTP){
        url = url.substring(6); //truncate ftp://
    } 

    var containsWWW = /^(www)/.test(url);

    if(containsWWW){
        url = url.substring(4); //truncate www
    }

    console.log(url);
    return url;
}

function encodeURL(url){
    
    var shortened = "";
    for(var i=0; i<url.length; i++){
        index = alphabet.indexOf(url.charAt(i));

        if(map[index] == '.'){
            shortened = shortened + randomPeriod[i % 5];
        } else if(map[index] == '/'){
            shortened = shortened + randomSlash[i % 5];
        }else {
            shortened = shortened + map[index];
        }
    }
    return shortened;
}

function prependPrefix(url){
    var containsPrefix = /^(ftp|http|https)/.test(url);
    var validLongURL = url;
    if(!containsPrefix){
        validLongURL = "http://" + validLongURL;
    }
    return validLongURL;
}

function validateURL(url) {
    var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    return urlregex.test(url);
}
