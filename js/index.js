function login() {
  FB.login(function(response) {
    if (response.status == 'connected') {
      showMeme();
    }
  })
}
function showMeme() {
  FB.api(
    "/467223920343518/feed?limit=100",
    function (response) {
      if (response && !response.error) {
        response.data.map(function(meme) {
          id = meme.id;
          var parent = document.getElementById('listings')
          var p = document.createElement('p')
          var node = document.createTextNode(meme.message)
          p.appendChild(node)
          parent.appendChild(p);

        });
      }
    }
  );
}
