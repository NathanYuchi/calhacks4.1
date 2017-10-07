function login() {
  FB.login(function(response) {
    if (response.status == 'connected') {
      showListings();
    }
  })
}
function showListings() {
  FB.api(
    "/467223920343518/feed?limit=100",
    function (response) {
      if (response && !response.error) {
        response.data.map(function(listing) {
          if (listing.message) {
            var address = listing.message.split(/\r?\n/)[0].replace(/\b\w/g, l => l.toUpperCase());
            var price = listing.message.split(/\r?\n/)[1].split(" ")[0];
            var desc = listing.message.split(/\r?\n/)[3];

            var html = "<div class = \'container\'>" +
                          "<div class = \'col-md-6\'>" +
                            "<h2> " + address + " - " + price + "</h2>" +
                            "<h3>" + desc + "</h3>" +
                          "</div>" +
                          "<div class = \'col-md-6\'>" +
                            "<iframe" +
                              "width=\"600\"" +
                              "height=\"450\""
                              "frameborder=\"0\" style=\"border:0\"" +
                              "src=\"https://www.google.com/maps/embed/v1/place?key=AIzaSyCMC_RzdmMB3AH0MXEu8OcedoD3P9Ik9uY" +
                                "&q=" + address + " allowfullscreen>" +
                            "</iframe>" +
                          "</div>" +
                        "</div>";
            }
        });
      }
    }
  );
}
