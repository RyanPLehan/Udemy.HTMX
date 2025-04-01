function showConfirmationModal(event) {
    event.preventDefault();
    console.log(event);
    const action = event.detail.elt.dataset.action;         // references value from the data-action attribute in the location.js
    const confirmationModal = `
    <dialog class="modal">
      <div id="confirmation">
        <h2>Are you sure?</h2>
        <p>Do you really want to ${action} this place?</p>
        <div id="confirmation-actions">
          <button id="action-no" className="button-text">
            No
          </button>
          <button id="action-yes" className="button">
            Yes
          </button>
        </div>
      </div>
    </dialog>
  `;

  document.body.insertAdjacentHTML('beforeend', confirmationModal);
  const dialog = document.querySelector('dialog');

  // Handle when user clicks 'No' from dialog
  const noButton = document.getElementById('action-no');
  noButton.addEventListener('click', function() {
    dialog.remove();
  });

  // Handle when user clicks 'Yes' from dialog
  const yesButton = document.getElementById('action-yes');      // button id = "action-yes"
  yesButton.addEventListener('click', function() {
    event.detail.issueRequest();
    dialog.remove();
  });

  dialog.showModal();
}

//document.addEventListener('htmx:beforeRequest', showConfirmationModal)
document.addEventListener('htmx:confirm', showConfirmationModal)