// Windows 98 Style JavaScript

let draggedWindow = null;
let offsetX = 0;
let offsetY = 0;
let highestZIndex = 1000;

// Update clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

setInterval(updateClock, 1000);
updateClock();

// Window management
function openWindow(windowName) {
    const window = document.getElementById(`${windowName}-window`);
    if (window) {
        window.style.display = 'block';
        bringToFront(window);
        updateTaskbar();
    }
}

function closeWindow(windowName) {
    const window = document.getElementById(`${windowName}-window`);
    if (window) {
        window.style.display = 'none';
        updateTaskbar();
    }
}

function bringToFront(window) {
    // Remove active class from all windows
    document.querySelectorAll('.window').forEach(w => {
        w.classList.remove('active');
    });
    
    // Set this window to front
    highestZIndex++;
    window.style.zIndex = highestZIndex;
    window.classList.add('active');
}

// Drag functionality
function dragStart(event, windowId) {
    const window = document.getElementById(windowId);
    if (!window) return;
    
    bringToFront(window);
    draggedWindow = window;
    
    const rect = window.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
}

function drag(event) {
    if (!draggedWindow) return;
    
    event.preventDefault();
    
    let newX = event.clientX - offsetX;
    let newY = event.clientY - offsetY;
    
    // Boundary checks
    const maxX = window.innerWidth - draggedWindow.offsetWidth;
    const maxY = window.innerHeight - draggedWindow.offsetHeight - 28; // 28px for taskbar
    
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    
    draggedWindow.style.left = `${newX}px`;
    draggedWindow.style.top = `${newY}px`;
}

function dragEnd() {
    draggedWindow = null;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', dragEnd);
}

// Start Menu
function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (startMenu.style.display === 'none' || !startMenu.style.display) {
        startMenu.style.display = 'block';
    } else {
        startMenu.style.display = 'none';
    }
}

// Close start menu when clicking outside
document.addEventListener('click', function(event) {
    const startMenu = document.getElementById('start-menu');
    const startButton = document.querySelector('.start-button');
    
    if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
        startMenu.style.display = 'none';
    }
});

// Taskbar management
function updateTaskbar() {
    const taskbarButtons = document.getElementById('taskbar-buttons');
    taskbarButtons.innerHTML = '';
    
    const windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        if (window.style.display !== 'none') {
            const titleText = window.querySelector('.title-bar-text').textContent;
            const button = document.createElement('button');
            button.className = 'taskbar-button';
            button.textContent = titleText;
            
            if (window.classList.contains('active')) {
                button.classList.add('active');
            }
            
            button.onclick = () => {
                if (window.style.display === 'none') {
                    window.style.display = 'block';
                }
                bringToFront(window);
                updateTaskbar();
            };
            
            taskbarButtons.appendChild(button);
        }
    });
}

// Make windows clickable to bring to front
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.window').forEach(window => {
        window.addEventListener('mousedown', () => {
            bringToFront(window);
            updateTaskbar();
        });
    });
});

// Initialize
updateTaskbar();
