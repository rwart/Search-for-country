$(function () {
  'use strict';
  var url = 'https://restcountries.eu/rest/v2/name/';
  var $countriesList = $('#countries');

  $('#search').click(searchCountries);

  function searchCountries() {
    var countryName = $('#country-name').val();
    if (!countryName.length) countryName = 'Poland';
    countryName = encodeURIComponent(countryName);
    $.ajax({
      url: url + countryName,
      method: 'GET',
      success: showCountriesList,
      error: showError,
    });
  }

  function showError(xhr, status, error) {
    $countriesList.empty();

    var $errorMessLI = $('<li>')
      .appendTo($countriesList);
    var $errorMessUL = $('<ul>')
      .addClass('error-mess alert alert-info center-block')
      .appendTo($errorMessLI);
    $('<li>')
      .addClass('text-left')
      .html('<strong>Server:</strong> ' + url)
      .appendTo($errorMessUL);
    $('<li>')
      .addClass('text-left')
      .html('<strong>Response status:</strong> ' + xhr.responseJSON.status)
      .appendTo($errorMessUL);
    $('<li>')
      .addClass('text-left')
      .html('<strong>Response message:</strong> '  + xhr.responseJSON.message)
      .appendTo($errorMessUL);
  }

  function showCountriesList(resp) {
    var aboutCountry = [
      { key: 'capital', label: 'Capital' },
      { key: 'area', label: 'Land area' },
      { key: 'population', label: 'Population' },
      { key: 'languages', label: 'Language(s)' },
      { key: 'currencies', label: 'Currency' },
    ];

    $countriesList.empty();
    resp.forEach(function (item) {
      var $itemContainer = $('<li>')
        .addClass('country')
        .appendTo($countriesList);
      var $row = $('<div>')
        .addClass('row name-row')
        .appendTo($itemContainer);
      var $col = $('<div>')
        .addClass('col-xs-3')
        .appendTo($row);
      $('<img>')
        .attr('src', item.flag)
        .addClass('flag')
        .appendTo($col);
      $('<div>')
        .addClass('col-xs-9 name')
        .text(item.name)
        .appendTo($row);
      $('<div>')
      .addClass('row country-header')
      .text('Background Information')
      .appendTo($itemContainer);

      aboutCountry.forEach(function (position) {
        $row = $('<div>')
          .addClass('row position-row')
          .appendTo($itemContainer);
        $('<div>')
          .addClass('col-xs-3 position-label')
          .text(position.label)
          .appendTo($row);
        $('<div>')
          .addClass('col-xs-9 position-value')
          .text(fillPosition(position.key, item))
          .appendTo($row);
      });

      $('<div>')
        .addClass('row country-footer')
        .appendTo($itemContainer);
    });

    function fillPosition(key, item) {

      var str = '';
      var arr = [];
      var num = 0.1;

      switch (key) {
        case 'area':
          if ('area' in item) {
            str = item.area;
            if ($.isNumeric(str)) {
              num = Number(item.area);
              str = num.toLocaleString();
            }

            str += ' sq. km';
          }

          break;
        case 'languages':
          if ('languages' in item) {
            item.languages.forEach(function (e, i) {
              arr[i] = e.name;});

            str = arr.join(', ');
          }

          break;
        case 'currencies':
          if ('currencies' in item) {
            item.currencies.forEach(function (e, i) {
              arr[i] = e.name + ' (' + e.symbol + ')';});

            str = arr.join(', ');
          }

          break;
        case 'population':
          str = item.population;
          if ($.isNumeric(str)) {
            num = Number(str) / 1000000;
            str = num.toLocaleString() + ' millions';
          }

          break;
        default:
          if (key in item) {
            str = item[key];
          }

      }
      return str;
    }

  }

});
