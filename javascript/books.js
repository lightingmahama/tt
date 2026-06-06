// DOM Elements
const overlay = document.getElementById('formOverlay');
const form = document.getElementById('autoForm');
const ghanaRadio = document.querySelector('.ghana');
const americaRadio = document.querySelector('.america');

// Configuration
const EXCHANGE_RATE = 12; // 1 USD = 12 GHS

// Book pricing data
const books = [
    { selector: '.result', usdPrice: 12.00 },
    { selector: '.result2', usdPrice: 10.00 },
    { selector: '.result3', usdPrice: 15.50 },
    { selector: '.price', usdPrice: 13.00 },
    { selector: '.result5', usdPrice: 11.99 }
];

/**
 * Updates book prices based on selected currency
 */
function updatePrices() {
    if (!ghanaRadio || !americaRadio) {
        console.warn('Currency radio buttons not found');
        return;
    }

    books.forEach(book => {
        const element = document.querySelector(book.selector);
        if (!element) {
            console.warn(`Element with selector ${book.selector} not found`);
            return;
        }

        if (ghanaRadio.checked) {
            // Convert to Ghana Cedis
            const ghsPrice = (book.usdPrice * EXCHANGE_RATE).toFixed(2);
            element.textContent = `GH₵ ${ghsPrice}`;
        } else {
            // Show USD
            element.textContent = `$${book.usdPrice.toFixed(2)}`;
        }
    });
}

/**
 * Toggles the form overlay visibility
 */
function toggleForm() {
    if (!overlay) {
        console.error('Form overlay element not found');
        return;
    }

    const isVisible = overlay.style.display === 'flex';
    overlay.style.display = isVisible ? 'none' : 'flex';
}

/**
 * Handles form submission
 * @param {Event} e - The submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();

    // Basic form validation
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#2ecc71';
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields.');
        return;
    }

    // Here you would typically send the form data to a server
    console.log('Form submitted successfully');

    // Hide the overlay
    overlay.style.display = 'none';

    // Reset form
    form.reset();

    // Reset border colors
    requiredFields.forEach(field => {
        field.style.borderColor = '';
    });
}

/**
 * Initializes the application
 */
function init() {
    // Set up event listeners
    if (ghanaRadio && americaRadio) {
        ghanaRadio.addEventListener('change', updatePrices);
        americaRadio.addEventListener('change', updatePrices);
    }

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Show overlay after page load
    if (overlay) {
        setTimeout(() => {
            overlay.style.display = 'flex';
        }, 2000);
    }

    // Initialize prices
    updatePrices();

    // Initialize Typed.js
    if (typeof Typed !== 'undefined') {
        new Typed('.auto-typed', {
            strings: ['Great books', 'Divine reads', 'Vocabulary building'],
            typeSpeed: 100,
            backSpeed: 100,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    } else {
        console.warn('Typed.js library not loaded');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
