$(document).ready(function () {
  const apiUrl = 'http://0.0.0.0:5001/api/v1/status/';
  // Get the API status and update the page accordingly
  $.get(apiUrl, function (data, status) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  // Listen for changes on each input checkbox tag
  $('.amenities input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      // Store the Amenity ID in a variable
      let amenityId = $(this).attr('data-id')
      // Add the Amenity ID to the list of amenities checked
      amenitiesIds.push(amenityId)
    } else {
      // Remove the Amenity ID from the list of amenities checked
      let amenityId = $(this).attr('data-id')
      let index = amenitiesIds.indexOf(amenityId)
      if (index > -1) {
        amenitiesIds.splice(index, 1)
      }
    }
    // Update the h4 tag with the list of amenities checked
    updateAmenities()
  });
});
