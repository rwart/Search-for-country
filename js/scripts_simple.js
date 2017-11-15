$(function () {
  var url = 'https://restcountries.eu/rest/v2/name/';
  var $countriesList = $('#countries');

  $('#search').click(searchCountries);

  function searchCountries() {
    var countryName = $('#country-name').val();
    if (!countryName.length) countryName = 'Poland';
    $.ajax({
      url: url + countryName,
      method: 'GET',
      success: showCountriesList,
    });
  }

  function showCountriesList(resp) {
    $countriesList.empty();
    resp.forEach(function (item) {
      var $itemContainer = $('<li>').appendTo($countriesList);
      $('<img>').attr('src', item.flag).appendTo($itemContainer);
      $('<p>').text(item.name).appendTo($itemContainer);
    });
  }

});
