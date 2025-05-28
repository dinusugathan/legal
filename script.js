async function sendMessage() {
    const $input = $('#user-input');
    const $chatMessages = $('#chat-messages');
    const query = $input.val().trim();

    if (!query) return;

    // Display user message
    $chatMessages.append(`<div class="message user-message">${query}</div>`);
    $input.val('');

    // Scroll to bottom
    $chatMessages[0].scrollTop = $chatMessages[0].scrollHeight;

    try {
        const response = await fetch('http://localhost:3000/v1/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, context: 'general' }),
            credentials: 'include' // Include cookies for session
        });

        const data = await response.json();

        // Display assistant response
        $chatMessages.append(`<div class="message assistant-message">${data.response || 'No response received.'}</div>`);

        // Scroll to bottom
        $chatMessages[0].scrollTop = $chatMessages[0].scrollHeight;
    } catch (error) {
        console.error('Error:', error);
        $chatMessages.append(`<div class="message assistant-message">An error occurred while fetching the response.</div>`);
    }
}

// Allow sending message with Enter key
$('#user-input').on('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});