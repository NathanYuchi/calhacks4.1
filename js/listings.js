

$(document).ready(function(){
  onPageLoad();
});

function onPageLoad() {
  createListings();
}

function createListings() {
  var url = window.location.href;
  var start = params("s", url);


}

function params( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}
