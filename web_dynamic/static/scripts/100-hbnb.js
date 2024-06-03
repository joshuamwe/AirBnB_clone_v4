$(document).ready(function () {
  // Define an empty dictionary to store checked states/cities
  const checkedDict = {};

  // Listen for changes on each input checkbox tag
  $('input[type=checkbox]').change(function () {
    // Get the data-id and data-name attributes of the checkbox
    const dataId = $(this).attr('data-id');
    const dataName = $(this).attr('data-name');

    if (this.checked) {
      // If the checkbox is checked, add the state/city to the dictionary
      checkedDict[dataId] = dataName;
    } else {
      // If the checkbox is unchecked, remove the state/city from the dictionary
      delete checkedDict[dataId];
    }

    // Update the h4 tag inside the div Locations with the list of States or Cities checked
    const checkedList = Object.values(checkedDict).sort().join(', ');
    $('div.locations h4').text(checkedList);
  });

  // Listen for clicks on the search button
  $('button').click(function () {
    // Get the URL and data to send in the AJAX request
    const url = 'http://0.0.0.0:5001/api/v1/places_search/';
    const data = JSON.stringify({
      amenities: Object.keys(checkedAmenities),
      cities: Object.keys(checkedDict),
      states: Object.keys(checkedDict)
    });

    // Send a POST request to the server with the data
    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: data,
      success: function (response) {
        // Clear the existing articles
        $('section.places').empty();

        // Loop through each place and create an article element for it
        for (let i = 0; i < response.length; i++) {
          const place = response[i];
          const template = `<article>
                              <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                              </div>
                              <div class="information">
                                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                              </div>
                              <div class="description">
                                ${place.description}
                              </div>
                            </article>`;
          $('section.places').append(template);
        }
      }
    });
  });
});
