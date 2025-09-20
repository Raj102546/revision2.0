// Application data
const appData = {
    apologyMessage: "Umm...Martin,\n\nI know I messed up, and I can't begin to express how sorry I am. Your happiness means the world to me, and seeing you upset because of my actions breaks my heart.\n\nI take full responsibility for what happened, and I want you to know that I'm committed to making things right. You deserve so much better, and I promise to be the person you deserve.\n\nEvery moment without your smile feels incomplete. You bring so much joy and light into my life, and I can't imagine my world without you in it.\n\nPlease give me a chance to make this up to you❤️",
    yesResponse: "Thannnkkkkk youuuuuuuuu.....sooo much yrr 🥲, for forgiving. You’re so sweet. Now do me one more favour please—unblock me na! 🙏💙",
    finalSorryMessage: "I know I messed up and really hurt you😞, and I'm genuinely sorry for that🥺🙏. I totally get why you're upset, and I respect how you feel. Just know that I value what we have so much❤️, and I want to make things right between us. I'm here to listen, to understand, and to fix this however it takes. Let's get back to being the awesome friends who've always had each other's backs💪💙",
    successMessage: "Thank you for giving me this chance. I promise to cherish you and treat you with all the love and respect you deserve. You're my dearest friend! 💖✨"
};

// State management
let currentScreen = 'landing';
let noButtonAttempts = 0;
const maxAttempts = 3;
let isTyping = false;

// DOM elements - will be populated after DOM loads
let elements = {};

// Initialize the application
function init() {
    console.log('Initializing app...');

    // Get all DOM elements
    elements = {
        envelope: document.getElementById('envelope'),
        letterText: document.getElementById('letterText'),
        continueBtn: document.getElementById('continueBtn'),
        yesBtn: document.getElementById('noBtn'),
        noBtn: document.getElementById('yesBtn'),
        heartsIndicator: document.getElementById('heartsIndicator'),
        yesModal: document.getElementById('yesModal'),
        finalModal: document.getElementById('finalModal'),
        modalOverlay: document.getElementById('modalOverlay'),
        finalModalOverlay: document.getElementById('finalModalOverlay'),
        closeYesModal: document.getElementById('closeYesModal'),
        closeFinalModal: document.getElementById('closeFinalModal'),
        yesResponseText: document.getElementById('yesResponseText'),
        finalResponseText: document.getElementById('finalResponseText'),
        successMessage: document.getElementById('successMessage'),
        restartBtn: document.getElementById('restartBtn')
    };

    // Verify critical elements exist
    if (!elements.envelope) {
        console.error('Envelope element not found!');
        return;
    }

    console.log('Elements found, setting up event listeners...');
    setupEventListeners();
    createHeartsIndicator();

    // Add some sparkle effects on mouse move
    document.addEventListener('mousemove', createSparkleTrail);

    console.log('App initialized successfully');
}

// Event listeners setup
function setupEventListeners() {
    // Envelope click - main interaction
    if (elements.envelope) {
        elements.envelope.addEventListener('click', function (e) {
            console.log('Envelope clicked!');
            e.preventDefault();
            e.stopPropagation();
            openEnvelope();
        });

        // Make sure envelope is clickable
        elements.envelope.style.cursor = 'pointer';
        elements.envelope.style.userSelect = 'none';
    }

    // Continue button
    if (elements.continueBtn) {
        elements.continueBtn.addEventListener('click', function (e) {
            console.log('Continue button clicked');
            e.preventDefault();
            showScreen('question');
        });
    }

    // Yes/No buttons
    if (elements.yesBtn) {
        elements.yesBtn.addEventListener('click', function (e) {
            console.log('Yes button clicked');
            e.preventDefault();
            handleYesClick();
        });
    }

    if (elements.noBtn) {
        elements.noBtn.addEventListener('click', function (e) {
            console.log('No button clicked');
            e.preventDefault();
            handleNoClick(e);
        });

        elements.noBtn.addEventListener('mouseenter', function () {
            if (noButtonAttempts < maxAttempts - 1) {
                console.log('No button hover - moving');
                moveNoButton();
            }
        });
    }

    // Modal close buttons
    if (elements.closeYesModal) {
        elements.closeYesModal.addEventListener('click', function (e) {
            console.log('Closing yes modal');
            e.preventDefault();
            closeYesModal();
            setTimeout(() => showScreen('success'), 300);
        });
    }

    if (elements.closeFinalModal) {
        elements.closeFinalModal.addEventListener('click', function (e) {
            console.log('Closing final modal');
            e.preventDefault();
            closeFinalModal();
            setTimeout(() => showScreen('success'), 300);
        });
    }

    // Restart button
    if (elements.restartBtn) {
        elements.restartBtn.addEventListener('click', function (e) {
            console.log('Restart clicked');
            e.preventDefault();
            restartExperience();
        });
    }

    // Modal overlay clicks
    if (elements.modalOverlay) {
        elements.modalOverlay.addEventListener('click', function (e) {
            console.log('Modal overlay clicked');
            e.preventDefault();
            closeYesModal();
        });
    }

    if (elements.finalModalOverlay) {
        elements.finalModalOverlay.addEventListener('click', function (e) {
            console.log('Final modal overlay clicked');
            e.preventDefault();
            closeFinalModal();
        });
    }
}

// Screen management
function showScreen(screenName) {
    console.log(`Showing screen: ${screenName}`);

    const screens = {
        landing: document.getElementById('landing'),
        letter: document.getElementById('letter'),
        question: document.getElementById('question'),
        success: document.getElementById('success')
    };

    // Hide all screens
    Object.values(screens).forEach(screen => {
        if (screen) {
            screen.classList.remove('active');
        }
    });

    // Show target screen
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
        currentScreen = screenName;

        // Screen-specific animations
        if (screenName === 'letter') {
            setTimeout(() => {
                const letterPaper = document.querySelector('.letter-paper');
                if (letterPaper) {
                    letterPaper.classList.add('visible');
                }
                setTimeout(startTypingAnimation, 800);
            }, 300);
        }
    } else {
        console.error(`Screen ${screenName} not found!`);
    }
}

// Envelope opening functionality
function openEnvelope() {
    console.log('Opening envelope...');
    const envelope = elements.envelope;

    if (!envelope) {
        console.error('Envelope element not found!');
        return;
    }

    envelope.classList.add('opened');

    // Add some celebration effects
    createCelebrationHearts(envelope);

    // Disable further clicks
    envelope.style.pointerEvents = 'none';

    // Transition to letter screen after animation
    setTimeout(() => {
        console.log('Transitioning to letter screen...');
        showScreen('letter');
    }, 1000);
}

// Typing animation for the letter
function startTypingAnimation() {
    console.log('Starting typing animation...');

    if (isTyping) {
        console.log('Already typing, skipping...');
        return;
    }

    const letterText = elements.letterText;
    if (!letterText) {
        console.error('Letter text element not found!');
        return;
    }

    isTyping = true;
    const message = appData.apologyMessage;
    let currentIndex = 0;

    letterText.textContent = '';

    function typeNextChar() {
        if (currentIndex < message.length) {
            letterText.textContent += message[currentIndex];
            currentIndex++;

            // Variable typing speed for more natural feel
            const delay = message[currentIndex - 1] === '\n' ? 300 :
                message[currentIndex - 1] === '.' ? 150 :
                    message[currentIndex - 1] === ',' ? 100 : 25;

            setTimeout(typeNextChar, delay);
        } else {
            // Typing finished
            console.log('Typing finished, showing continue button');
            letterText.classList.add('finished');

            // Show continue button with multiple approaches to ensure visibility
            setTimeout(() => {
                const continueBtn = elements.continueBtn;
                if (continueBtn) {
                    console.log('Making continue button visible');

                    // Remove any existing display none styles
                    continueBtn.style.display = 'inline-block';
                    continueBtn.style.visibility = 'visible';
                    continueBtn.style.opacity = '1';
                    continueBtn.style.pointerEvents = 'auto';

                    // Add classes to ensure visibility
                    continueBtn.classList.remove('hidden');
                    continueBtn.classList.add('visible');

                    // Add animation
                    continueBtn.style.animation = 'fadeInUp 0.5s ease-out';

                    console.log('Continue button should now be visible');
                } else {
                    console.error('Continue button element not found when trying to show it!');
                }
            }, 1000);
            isTyping = false;
        }
    }

    typeNextChar();
}

// Handle "Yes" button click
function handleYesClick() {
    console.log('Handling yes click...');
    if (elements.yesResponseText) {
        elements.yesResponseText.textContent = appData.yesResponse;
    }
    showModal('yesModal');
}

// Handle "No" button click and movement
function handleNoClick(event) {
    console.log('Handling no click...');
    event.preventDefault();
    noButtonAttempts++;

    // Update hearts indicator
    updateHeartsIndicator();

    if (noButtonAttempts >= maxAttempts) {
        // Show final sorry message
        console.log('Max attempts reached, showing final modal');
        if (elements.finalResponseText) {
            elements.finalResponseText.textContent = appData.finalSorryMessage;
        }
        showModal('finalModal');
    } else {
        // Move the button to a random position
        console.log(`Attempt ${noButtonAttempts}, moving button`);
        moveNoButton();
    }
}

function moveNoButton() {
    const button = elements.noBtn;
    if (!button) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonRect = button.getBoundingClientRect();

    // Calculate safe boundaries
    const maxX = Math.max(50, viewportWidth - buttonRect.width - 50);
    const maxY = Math.max(50, viewportHeight - buttonRect.height - 50);

    // Generate random position
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Add moving class for smooth transition
    button.classList.add('moving');

    // Apply new position
    button.style.position = 'fixed';
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
    button.style.zIndex = '1000';

    // Add some playful rotation
    const randomRotation = (Math.random() - 0.5) * 30;
    button.style.transform = `rotate(${randomRotation}deg)`;

    // Remove moving class after animation
    setTimeout(() => {
        button.classList.remove('moving');
    }, 500);
}

// Hearts indicator management
function createHeartsIndicator() {
    const indicator = elements.heartsIndicator;
    if (!indicator) return;

    indicator.innerHTML = '';

    for (let i = 0; i < maxAttempts; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-attempt';
        heart.textContent = '💔';
        indicator.appendChild(heart);
    }
}

function updateHeartsIndicator() {
    const hearts = elements.heartsIndicator?.querySelectorAll('.heart-attempt');
    if (hearts && hearts[noButtonAttempts - 1]) {
        hearts[noButtonAttempts - 1].classList.add('filled');
        hearts[noButtonAttempts - 1].textContent = '💖';
    }
}

// Modal management
function showModal(modalId) {
    console.log(`Showing modal: ${modalId}`);
    const modal = elements[modalId];
    if (modal) {
        modal.classList.remove('hidden');

        // Add entrance animation
        const card = modal.querySelector('.response-card');
        if (card) {
            card.style.animation = 'modalSlideIn 0.5s ease-out';
        }
    }
}

function closeYesModal() {
    console.log('Closing yes modal');
    if (elements.yesModal) {
        elements.yesModal.classList.add('hidden');
    }
}

function closeFinalModal() {
    console.log('Closing final modal');
    if (elements.finalModal) {
        elements.finalModal.classList.add('hidden');
    }
}

// Restart functionality
function restartExperience() {
    console.log('Restarting experience...');

    // Reset all state
    noButtonAttempts = 0;
    isTyping = false;

    // Reset envelope
    if (elements.envelope) {
        elements.envelope.classList.remove('opened');
        elements.envelope.style.pointerEvents = 'auto';
    }

    // Reset letter
    if (elements.letterText) {
        elements.letterText.textContent = '';
        elements.letterText.classList.remove('finished');
    }
    if (elements.continueBtn) {
        elements.continueBtn.style.display = 'none';
        elements.continueBtn.style.visibility = 'hidden';
        elements.continueBtn.style.opacity = '0';
        elements.continueBtn.classList.add('hidden');
        elements.continueBtn.classList.remove('visible');
    }

    const letterPaper = document.querySelector('.letter-paper');
    if (letterPaper) {
        letterPaper.classList.remove('visible');
    }

    // Reset no button
    const noBtn = elements.noBtn;
    if (noBtn) {
        noBtn.style.position = 'relative';
        noBtn.style.left = 'auto';
        noBtn.style.top = 'auto';
        noBtn.style.transform = 'none';
    }

    // Reset hearts indicator
    createHeartsIndicator();

    // Close all modals
    closeYesModal();
    closeFinalModal();

    // Return to landing
    showScreen('landing');
}

// Special effects
function createCelebrationHearts(element) {
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💖';
            heart.style.position = 'fixed';
            heart.style.left = `${rect.left + rect.width / 2}px`;
            heart.style.top = `${rect.top + rect.height / 2}px`;
            heart.style.fontSize = '24px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.animation = 'celebrationFloat 2s ease-out forwards';

            // Random direction
            const angle = (Math.PI * 2 * i) / 6;
            const distance = 100;
            heart.style.setProperty('--end-x', `${Math.cos(angle) * distance}px`);
            heart.style.setProperty('--end-y', `${Math.sin(angle) * distance}px`);

            document.body.appendChild(heart);

            // Remove after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 100);
    }
}

function createSparkleTrail(event) {
    // Throttle sparkle creation
    if (Math.random() > 0.1) return;

    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${event.clientX}px`;
    sparkle.style.top = `${event.clientY}px`;
    sparkle.style.fontSize = '16px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '5';
    sparkle.style.animation = 'sparkleTrail 1s ease-out forwards';

    document.body.appendChild(sparkle);

    // Remove after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000);
}

// Add additional CSS animations for effects
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes celebrationFloat {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--end-x), var(--end-y)) scale(0.5);
        }
    }
    
    @keyframes sparkleTrail {
        0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.3) rotate(180deg) translateY(-30px);
        }
    }
    
    /* Ensure continue button visibility */
    .continue-btn.visible {
        display: inline-block !important;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        position: absolute;
    bottom: 40px;
    left: 110px;
    }
`;
document.head.appendChild(additionalStyles);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing...');
    setTimeout(init, 100); // Small delay to ensure all elements are rendered
});

// Fallback initialization
if (document.readyState !== 'loading') {
    console.log('DOM already loaded, initializing immediately...');
    setTimeout(init, 100);
}
