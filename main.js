var clearDiv = '<div class="cl-t"></div>',
messageSentTagOpen = '<div class="message sent">',
messageReceivedTagOpen = '<div class="message received">',
messageTagClose = '</div>',
spanTimeOpen = '<span class="message-time">',
spanTimeClose = '</span>',
contactsFilter = $('#contacts-filter');

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
				messagesContainer = rightContainer.children('.right-messages');

				messagesContainer.append(
					messageSentTagOpen + newMessage + spanTimeOpen + now.getHours() + ':' + now.getMinutes() + spanTimeClose + messageTagClose + clearDiv
				);

				thisInput.val('');

				messagesContainer.scrollTop(messagesContainer[0].scrollHeight)

				window.setTimeout(function() {
					messagesContainer.append(
						messageReceivedTagOpen + 'Ok' + spanTimeOpen + now.getHours() + ':' + now.getMinutes() + spanTimeClose + messageTagClose + clearDiv
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

});
