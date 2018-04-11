var clearDiv = '<div class="cl-t"></div>',
messageTagOpen = '<div class="message sent">',
messageTagClose = '</div>',
spanTimeOpen = '<span class="message-time">',
spanTimeClose = '</span>';

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
					messageTagOpen + newMessage + spanTimeOpen + now.getHours() + ':' + now.getMinutes() + spanTimeClose + messageTagClose + clearDiv
				);

				thisInput.val('');

				messagesContainer.scrollTop(messagesContainer[0].scrollHeight)
			}
		}
	});

});
