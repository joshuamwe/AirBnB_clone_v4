// Function to update the h4 tag with the list of amenities checked
function updateAmenities () {
  let amenityIds = []
  $('.amenities input[type="checkbox"]:checked').each(function () {
    amenityIds.push($(this).attr('data-id'))
  })
  let amenitiesText = amenityIds.length > 0 ? amenityIds.join(', ') : '&nbsp;'
  $('.amenities h4').html(amenitiesText)
}

$(document).ready(function () {
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
  })
})
