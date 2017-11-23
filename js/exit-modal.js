(function ($, Drupal, drupalSettings) {
	'use strict';

	/**
	 * Watches for mouse movement towards the top of the screen which probably
	 * indicates a desire to close the tab. When triggered, launches a Drupal
	 * modal containing the Exit Modal block.
	 */
	window.onload = function () {
		exitModalWatch();
	};

	/**
	 * Main logic for displaying Drupal modal.
	 */
	function exitModalWatch() {
		var $popupElement = $('.block-modal-exit-modal');
		// Remove all elements from array if there are found more than 1.
		if ($popupElement.length > 1) {
			$popupElement.splice(0, 1);
		}
		// Stop if no popup element.
		else if ($popupElement.length === 0) {
			return;
		}
		// On page exit - only begin after a couple of seconds to avoid
		// accidental triggering.
		var quit = false;
		setTimeout(function () {
			$(document).bind('mousemove', function (e) {
				if (e.pageY - $(window).scrollTop() <= 15) {
					if (!quit) {
						quit = true;
						popup($popupElement);
					} else {
						return null;
					}
				}
			});
		}, 2000);
	}

	/**
	 * Create our Drupal modal.
	 *
	 * @param $popupElement
	 *   Selector class name.
	 */
	function popup($popupElement) {
		$popupElement.addClass('block-exit-modal-popup-shown');
		var clonedElement = $popupElement.clone();
		clonedElement.removeClass('visually-hidden');
		var confirmationDialog = Drupal.dialog(clonedElement, {
			title: drupalSettings.exit_modal_block.label,
			dialogClass: 'block-exit-modal-popup',
			resizable: false,
			closeOnEscape: false,
			create: function () {
				clonedElement.children('h2:first').remove();
			},
			beforeClose: false,
			close: function (event) {
				$(event.target).remove();
				$popupElement.removeClass('block-exit-modal-popup-shown');
			}
		});
		confirmationDialog.showModal();
	}

})(jQuery, Drupal, drupalSettings);


