var middleLat = 37.52;

$( document ).ready(function() {
  $("#filter").hide();
});

function filter() {
  var selectedLoc = $('#locSelect').val();
  var selectedprice = $('#priceSelect').val();

  localStorage.setItem('loc', selectedLoc);
  localStorage.setItem('price', selectedprice);
  showListings();
}
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
  $("#listings").empty();
  FB.api(
    "/467223920343518/feed?limit=100&fields=from,message,id",
    function (response) {
      if (response && !response.error) {
        response.data.map(function(listing) {
          if (listing.message) {
            var address = listing.message.split(/\r?\n/)[0].replace(/\b\w/g, l => l.toUpperCase());
            var price = listing.message.split(/\r?\n/)[1].split(" ")[0];
            var desc = listing.message.split(/\r?\n/)[3];
            var id = listing.id.split("_")[1];
            var link = "https://www.facebook.com/groups/467223920343518/permalink/"+id;

            var currLoc = localStorage.getItem('loc');
            var currPrice = localStorage.getItem('price')


            var apiAddress = address.split(' ').join('+');
            var lattitude = getLattitude(apiAddress);
            if (currLoc === "1" && (lattitude <= middleLat) || (currLoc === "2" && (lattitude >= middleLat))) {
              var html = "<div class = \'row\'> " +
                            "<div class = \'col-md-6\'> " +
                              "<div class = \"col-sm-9\">" +
                                "<h3> " + address + " - " + price + "</h3> " +
                                "<h4>" + desc + "</h4> " +
                              "</div>" +
                              "<div class = \"col-sm-3\">" +
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
            }
        });
      }
    }
  );
}

function getLattitude(address) {

	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address

    var lattitude= 0;

    $.ajax({
        url: url,
        type: "GET",
        async: false,
        headers: { "Accept": "application/json;odata=verbose"}, // return data format
        success: function (data) {
         lattitude = data.results[0].geometry.location.lat;
        },
        error: function (error) {
        }
    });
    return lattitude;
}
