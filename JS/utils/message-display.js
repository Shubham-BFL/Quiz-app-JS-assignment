/**
 * Utility functions to display messages in DOM instead of using alert()
 */

/**
 * Display a message in a DOM element
 * @param {string} message - The message to display
 * @param {string} type - The type of message: 'success', 'error', 'warning', 'info'
 * @param {string} containerId - The ID of the container to display the message in
 * @param {number} duration - Optional duration in milliseconds to auto-hide the message
 */
function displayMessage(message, type = 'info', containerId = 'message-container', duration = 0) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Message container with ID "${containerId}" not found`);
        return;
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `alert alert-${getAlertClass(type)} alert-dismissible fade show`;
    messageEl.setAttribute('role', 'alert');
    messageEl.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Clear previous messages
    container.innerHTML = '';

    // Add new message
    container.appendChild(messageEl);

    // Auto-hide if duration specified
    if (duration > 0) {
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, duration);
    }

    // Scroll to message if it's not in viewport
    messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Get Bootstrap alert class based on message type
 * @param {string} type - Message type
 * @returns {string} Bootstrap alert class
 */
function getAlertClass(type) {
    const classMap = {
        'success': 'success',
        'error': 'danger',
        'warning': 'warning',
        'info': 'info'
    };
    return classMap[type] || 'info';
}

/**
 * Create a message container if it doesn't exist
 * @param {string} containerId - The ID for the new container
 * @param {HTMLElement} parentElement - Parent element to append the container to
 * @param {string} position - Where to insert: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
 */
function createMessageContainer(containerId = 'message-container', parentElement = document.body, position = 'afterbegin') {
    if (document.getElementById(containerId)) return;

    const container = document.createElement('div');
    container.id = containerId;
    container.className = 'message-container mb-3';
    
    if (parentElement) {
        parentElement.insertAdjacentElement(position, container);
    }
}

// Export for use in other modules
window.MessageDisplay = {
    display: displayMessage,
    createContainer: createMessageContainer
};
