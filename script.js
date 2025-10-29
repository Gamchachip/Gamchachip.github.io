// Windows 98 Style Games - JavaScript

// Update clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    const clockElement = document.querySelector('.clock');
    if (clockElement) {
        clockElement.textContent = `${displayHours}:${displayMinutes} ${ampm}`;
    }
}

// Initialize clock
updateClock();
setInterval(updateClock, 1000);

// Start button click handler
const startButton = document.querySelector('.start-button');
if (startButton) {
    startButton.addEventListener('click', function() {
        alert('Welcome to Win98 Style Games!\n\nThis is a nostalgic tribute to the classic Windows 98 era gaming experience.');
    });
}

// Window control buttons
const titleBarButtons = document.querySelectorAll('.title-bar-controls button');
titleBarButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        switch(index) {
            case 0: // Minimize
                alert('Minimize functionality is for display only in this demo.');
                break;
            case 1: // Maximize
                alert('Maximize functionality is for display only in this demo.');
                break;
            case 2: // Close
                if (confirm('Are you sure you want to close this window?')) {
                    alert('This is a demo - the window won\'t actually close!');
                }
                break;
        }
    });
});

// Add click effect to game cards
const gameCards = document.querySelectorAll('.game-card');
gameCards.forEach(card => {
    card.addEventListener('click', function() {
        const gameName = this.querySelector('h3').textContent;
        alert(`You clicked on ${gameName}!\n\nThis is a demonstration of Win98 style games. In a full implementation, this would launch the game.`);
    });
    
    card.style.cursor = 'pointer';
});

// Add hover effect to buttons
const allButtons = document.querySelectorAll('button, .win98-button');
allButtons.forEach(button => {
    button.style.cursor = 'pointer';
});

console.log('Win98 Style Games loaded successfully!');
