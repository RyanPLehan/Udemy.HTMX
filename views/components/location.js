export default function renderLocation(location, isAvailableLocation = true) {
  let attributes;

  if (isAvailableLocation) {
    attributes = `
      hx-post="/places" 
      hx-vals='{"locationId": "${location.id}"}'
      hx-target="#interesting-locations"
      hx-swap="beforeend show:#int-locations-section:top"
      hx-on:htmx:before-request"
      data-action="add"
    `;
  } 
  else {
    attributes = `
      hx-delete="/places/${location.id}"
      hx-target="#location-${location.id}"
      hx-swap="outerHTML"
      hx-on:htmx:before-request"
      data-action="remove"
    `;
  }


  return `
    <li class="location-item" id="location-${location.id}">
      <button ${attributes}>
        <img src="${`/images/${location.image.src}`}" alt="${location.image.alt}" />
        <h3>${location.title}</h3>
      </button>
    </li>
  `;
}
