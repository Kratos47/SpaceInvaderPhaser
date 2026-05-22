/**
 * @file mobile-controls.js
 * Generates the virtual gamepad and handles keyboard simulation for mobile touch screens.
 */

window.addEventListener('DOMContentLoaded', () => {
    
    // 1. INJECT THE HTML
    const controlsHTML = `
        <div id="mobile-controls">
            <div class="d-pad">
                <button id="btn-left" class="control-btn">◀</button>
                <button id="btn-right" class="control-btn">▶</button>
            </div>
            
            <button id="btn-shoot" class="control-btn fire-btn">FIRE</button>
        </div>
    `;
    
    // Add the HTML to the bottom of the body
    document.body.insertAdjacentHTML('beforeend', controlsHTML);


    // 2. KEYBOARD SIMULATION LOGIC
    function simulateKey(eventType, keyCode, keyStr) {
        const event = new KeyboardEvent(eventType, {
            bubbles: true,
            cancelable: true,
            keyCode: keyCode,
            key: keyStr,
            code: keyStr === ' ' ? 'Space' : keyStr
        });
        document.dispatchEvent(event);
        window.dispatchEvent(event);
    }

    function attachControl(buttonId, keyCode, keyStr) {
        const btn = document.getElementById(buttonId);
        if (!btn) return;

        // Handle touch screens
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault(); 
            simulateKey('keydown', keyCode, keyStr);
        }, { passive: false });

        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            simulateKey('keyup', keyCode, keyStr);
        }, { passive: false });

        // Handle mouse clicks (for desktop testing)
        btn.addEventListener('mousedown', () => simulateKey('keydown', keyCode, keyStr));
        btn.addEventListener('mouseup', () => simulateKey('keyup', keyCode, keyStr));
        btn.addEventListener('mouseleave', () => simulateKey('keyup', keyCode, keyStr));
    }


    // 3. ATTACH EVENTS TO THE INJECTED BUTTONS
    // Left Arrow = 37, Right Arrow = 39, Spacebar = 32
    attachControl('btn-left', 37, 'ArrowLeft');
    attachControl('btn-right', 39, 'ArrowRight');
    attachControl('btn-shoot', 32, ' ');

});