function login() {
  FB.login(function(response) {
    if (response.status == 'connected') {
      $("#loginBtn").hide();
      showListings();
    }
  })
}
function showListings() {
  FB.api(
    "/467223920343518/feed?limit=100&fields=from,message",
    function (response) {
      if (response && !response.error) {
        $("#hero").hide();
        response.data.map(function(listing) {
          if (listing.message) {
            var address = listing.message.split(/\r?\n/)[0].replace(/\b\w/g, l => l.toUpperCase());
            var price = listing.message.split(/\r?\n/)[1].split(" ")[0];
            var desc = listing.message.split(/\r?\n/)[3];

            var apiAddress = address.split(' ').join('+');
            var html = "<div class = \'row\'> " +
                          "<div class = \'col-md-6\'> " +
                            "<h2> " + address + " - " + price + "</h2> " +
                            "<h3>" + desc + "</h3> " +
                          "</div> " +
                          "<div class = \'col-md-6\'> " +
                            "<iframe " +
                              "width=\"400\" " +
                              "height=\"400\" " +
                              "frameborder=\"0\" style=\"border:0\" " +
                              "src=\"https://www.google.com/maps/embed/v1/place?key=AIzaSyCx8NsG_fJqJNWEtcnt5Wgy14x1B0ds8Ic" +
                                "&q=" + apiAddress + "\" allowfullscreen> " +
                            "</iframe> " +
                          "</div> " +
                        "</div> <br> <br>";
              $("#listings").append(html);m
            }
        });
      }
    }
  );
}
