$( document ).ready(function() {
  $("#filter").hide();
});
$('#priceSelect').change(function () {
    var selected = $(this).find("option:selected");
    localStorage.setItem('price', selected);

});
$('#locSelect').change(function () {
    var selected = $(this).find("option:selected");
    localStorage.setItem('loc', selected);
});
function login() {
  FB.login(function(response) {
    if (response.status == 'connected') {
      $("#loginBtn").hide();
      $('#hero').hide();
        $("#filter").show();
      showListings();
    }
  })
}
function showListings() {
  FB.api(
    "/467223920343518/feed?limit=100&fields=from,message,id",
    function (response) {
      if (response && !response.error) {
        response.data.map(function(listing) {
          if (listing.message) {
            var address = listing.message.split(/\r?\n/)[0].replace(/\b\w/g, l => l.toUpperCase());
            var price = listing.message.split(/\r?\n/)[1].split(" ")[0];
            var desc = listing.message.split(/\r?\n/)[3];
            var id = listing.id;
            var link = "https://www.facebook.com/groups/467223920343518/permalink/"+id;

            var apiAddress = address.split(' ').join('+');
            var html = "<div class = \'row\'> " +
                          "<div class = \'col-md-6\'> " +
                            "<div class = \"col-md-9\">" +
                              "<h3> " + address + " - " + price + "</h3> " +
                              "<h4>" + desc + "</h4> " +
                            "</div>" +
                            "<div class = \"col-md-3\">" +
                              "<a href=\"" + link +"\" class=\"btn btn-primary\" role=\"button\" target=\"_blank\">Link to Posting</a>" +
                            "</div>" +
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
                          "<hr class=\"section-heading-spacer\"> " +
                          "<div class=\"clearfix\"> </div> " +
                        "</div> <br> <br>";
              $("#listings").append(html);
            }
        });
      }
    }
  );
}
