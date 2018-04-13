var clearDiv = '<div class="cl-t"></div>',
messageSentTagOpen = '<div class="message sent">',
messageReceivedTagOpen = '<div class="message received">',
messageTagClose = '</div>',
spanTimeOpen = '<span class="message-time">',
spanTimeClose = '</span>',
messageOptionsButton = '<i class="fa fa-chevron-down f-right message-options"></i>',
optionsPanel = `<div class="message-options-panel">
	<div class="message-info">Info messaggio</div>
	<div class="message-destroy">Cancella messaggio</div>
</div>`,
contactsFilter = $('#contacts-filter'),
contactsContainer = $('.contacts'),
messagesContainer = $('.right-messages-container');

$(document).ready(function() {

	$('.new-message-inputs').keypress(function(e) {
		if (e.which == 13) {
			var thisInput = $(this),
			newMessage = thisInput.val(),
			now = new Date();

			if (newMessage) {
				//now i can append to the messages
				var footerCnt = thisInput.parent(),
				rightContainer = footerCnt.parent()
				messagesContainer = rightContainer.children('.right-messages-container').children('.right-messages.active');

				messagesContainer.append(
					messageSentTagOpen + newMessage + messageOptionsButton + spanTimeOpen + now.getHours() + ':' + now.getMinutes() + spanTimeClose + optionsPanel + messageTagClose + clearDiv
				);

				thisInput.val('');

				messagesContainer.scrollTop(messagesContainer[0].scrollHeight)

				window.setTimeout(function() {
					messagesContainer.append(
						messageReceivedTagOpen + 'Ok' + messageOptionsButton + spanTimeOpen + now.getHours() + ':' + now.getMinutes() + spanTimeClose + optionsPanel + messageTagClose + clearDiv
					);
				}, 2000);
			}
		}
	});

	contactsFilter.keyup(function() {
		var search = contactsFilter.val();

		search = search.toLowerCase();
		var contacts = $('.contact');

		contacts.each(function() {
			var contactName = $(this).children('.contact-info').children('h3').children('.contact-name');

			if (!contactName.text().toLowerCase().includes(search)) {
				$(this).hide();
			}
			else {
				$(this).show();
			}
		});
	});

	$('.contact').click(function() {
		var thisContact = $(this),
		numberOfContact = thisContact.index();

		thisContact.addClass('active');
		$('.contact').not(thisContact).removeClass('active');
		//cambio il nome del contatto nell'header in alto. Posso fare la stessa cosa per cambiare l'immagine
		var contactName = $(this).children('.contact-info').children('h3').children('.contact-name').text();
		$('#header-right-contact-name').text(contactName);

		$('.right-messages').each(function() {
			if ($(this).index() == numberOfContact) {
				$(this).addClass('active');
			}
			else {
				$(this).removeClass('active');
			}
		});
	});

	$(document).on('click', '.message-options', function() {
		$(this).toggleClass('active');
		$(this).siblings('.message-options-panel').toggleClass('active');
	});

	$(document).on('click', '.message-destroy', function() {
		$(this).parent().parent().remove();
	});

});
