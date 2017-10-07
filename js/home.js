
$(document).ready(function(){
  onPageLoad();
});

function onPageLoad() {
  fbInit();
}

function fbInit() {
  window.fbAsyncInit = function() {
    FB.init({
      appId            : '375220902820299',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.10'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
 }

function fbLogin() {
  FB.login(function(response){
  // Handle the response object, like in statusChangeCallback() in our demo
  // code.
});
}

$( "#login" ).click(function() {
  FB.login(function(response){
  // Handle the response object, like in statusChangeCallback() in our demo
  // code.
});
});
