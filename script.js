/**
 * Click Tracking Script for Digital Legacy Vault Landing Page
 * 
 * This script tracks user interactions and sends them to a Google Apps Script
 * web app endpoint which saves the data to a Google Sheet.
 * 
 * Setup Instructions:
 * 1. Create a Google Apps Script web app (see DEPLOYMENT.md)
 * 2. Replace GOOGLE_SCRIPT_URL with your deployed web app URL
 */

// Configuration
const CONFIG = {
    // Replace this URL with your Google Apps Script Web App URL
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
    
    // Enable/disable tracking
    TRACKING_ENABLED: true,
    
    // Enable console logging for debugging
    DEBUG_MODE: true
};

// Track page view on load
document.addEventListener('DOMContentLoaded', function() {
    trackEvent('page_view', {
        page: window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`
    });

    // Add click tracking to all elements with data-track attribute
    setupClickTracking();
});

/**
 * Set up click tracking for all elements with data-track attribute
 */
function setupClickTracking() {
    const trackableElements = document.querySelectorAll('[data-track]');
    
    trackableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const trackingId = this.getAttribute('data-track');
            const elementType = this.tagName.toLowerCase();
            const elementText = this.textContent.trim().substring(0, 100); // Limit to 100 chars
            
            trackEvent('click', {
                trackingId: trackingId,
                elementType: elementType,
                elementText: elementText,
                href: this.href || '',
                page: window.location.pathname
            });

            // Visual feedback
            if (CONFIG.DEBUG_MODE) {
                showTrackingFeedback(this);
            }
        });
    });

    if (CONFIG.DEBUG_MODE) {
        console.log(`✅ Click tracking enabled for ${trackableElements.length} elements`);
    }
}

/**
 * Track an event by sending it to Google Apps Script
 * 
 * @param {string} eventType - Type of event (e.g., 'click', 'page_view')
 * @param {object} eventData - Additional event data
 */
function trackEvent(eventType, eventData = {}) {
    if (!CONFIG.TRACKING_ENABLED) {
        return;
    }

    const trackingData = {
        timestamp: new Date().toISOString(),
        eventType: eventType,
        sessionId: getSessionId(),
        ...eventData
    };

    if (CONFIG.DEBUG_MODE) {
        console.log('📊 Tracking event:', trackingData);
    }

    // Send to Google Apps Script
    sendToGoogleSheet(trackingData);
}

/**
 * Send tracking data to Google Apps Script
 * 
 * @param {object} data - Tracking data to send
 */
function sendToGoogleSheet(data) {
    // Check if URL is configured
    if (CONFIG.GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
        if (CONFIG.DEBUG_MODE) {
            console.warn('⚠️ Google Apps Script URL not configured. Please update GOOGLE_SCRIPT_URL in script.js');
            console.log('Data that would be sent:', data);
        }
        return;
    }

    // Use fetch API to send data
    fetch(CONFIG.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        if (CONFIG.DEBUG_MODE) {
            console.log('✅ Event tracked successfully');
        }
    })
    .catch(error => {
        if (CONFIG.DEBUG_MODE) {
            console.error('❌ Error tracking event:', error);
        }
    });
}

/**
 * Get or create a session ID for the user
 * Stored in sessionStorage for the duration of the session
 * 
 * @returns {string} Session ID
 */
function getSessionId() {
    let sessionId = sessionStorage.getItem('dlv_session_id');
    
    if (!sessionId) {
        sessionId = generateId();
        sessionStorage.setItem('dlv_session_id', sessionId);
    }
    
    return sessionId;
}

/**
 * Generate a unique ID
 * 
 * @returns {string} Unique ID
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Show visual feedback when an element is tracked
 * 
 * @param {HTMLElement} element - Element that was clicked
 */
function showTrackingFeedback(element) {
    element.classList.add('tracking-active');
    setTimeout(() => {
        element.classList.remove('tracking-active');
    }, 300);
}

/**
 * Track custom events (can be called from anywhere in the page)
 * 
 * @param {string} eventName - Custom event name
 * @param {object} data - Additional data to track
 */
window.trackCustomEvent = function(eventName, data = {}) {
    trackEvent('custom', {
        customEventName: eventName,
        ...data
    });
};

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        trackEvent,
        trackCustomEvent: window.trackCustomEvent
    };
}
