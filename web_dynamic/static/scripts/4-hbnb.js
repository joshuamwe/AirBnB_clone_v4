// Wait until the document is ready before executing the JavaScript code
$(document).ready(function () {

  // Function to retrieve checked amenities and make a POST request with them
  function getAmenities() {
    // Get all checked amenities and store them in an array
    let amenities = [];
    $('input[type="checkbox"]:checked').each(function () {
      amenities.push($(this).attr('data-id'));
    });

    // Set the URL and data to send in the AJAX request
    const url = 'http://0.0.0.0:5001/api/v1/places_search/';
    const data = JSON.stringify({ amenities: amenities });

    // Send a POST request to the server with the data
    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: data,
      success: function (response) {

        // Store the places in a variable
        let places = response;

        // Clear the section.places element before appending new results
        $('section.places').empty();

        // Loop through each place and create an article element for it
        for (let i = 0; i < places.length; i++) {

          // Get the current place
          let place = places[i];

          // Create a template string with the place information
          let template = `<article>
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

          // Append the template to the section.places element
          $('section.places').append(template);
        }
      }
    });
  }

  // Bind the getAmenities function to the button click event
  $('button').click(getAmenities);
});
