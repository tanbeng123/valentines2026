// Get DOM elements
const landingPage = document.getElementById('landingPage');
const valentinePage = document.getElementById('valentinePage');
const enterBtn = document.getElementById('enterBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const resultMessage = document.getElementById('result');

let noClickCount = 0;
const maxNoClicks = 4; // After 4 "No" clicks, it becomes impossible to click

// Show Valentine's page when entering
enterBtn.addEventListener('click', function() {
    landingPage.classList.remove('active');
    valentinePage.classList.add('active');
    
    // Add a little animation effect when transitioning
    valentinePage.style.animation = 'fadeIn 0.5s ease-out';
});

// YES Button - Happy response
yesBtn.addEventListener('click', function() {
    resultMessage.textContent = 'You make me the happiest hooman-being, I love you! 💕';
    resultMessage.classList.add('result-yes');
    
    // Trigger confetti
    createConfetti();
    
    // Disable buttons after clicking
    yesBtn.disabled = true;
    noBtn.disabled = true;
    yesBtn.style.opacity = '0.6';
    noBtn.style.opacity = '0.6';
});

// NO Button - Spawn multiple moving clickable "No" buttons and handle clicks
const totalNoClones = 6; // total clones to spawn over time
let clonesSpawned = 0;

function randomPositionForBtn(btnWidth = 150, btnHeight = 50) {
    const x = Math.random() * (window.innerWidth - btnWidth - 20) + 10;
    const y = Math.random() * (window.innerHeight - btnHeight - 20) + 10;
    return { x, y };
}

function handleNoClick(e) {
    e.preventDefault();
    noClickCount++;

    const funnyMessages = [
        'Oh come on, you can\'t run away from your lover!',
        '🤭 Stop running away bebe!',
        '💕 Nice try! But I know you want to say yes!',
        '😊 Just press YES already please!'
    ];

    // Animate/move the clicked button unless we're at the final step
    if (noClickCount < maxNoClicks) {
        const btn = e.currentTarget;
        btn.style.position = 'fixed';
        btn.style.transition = 'all 0.35s cubic-bezier(.2,.9,.2,1)';
        const pos = randomPositionForBtn(btn.offsetWidth, btn.offsetHeight);
        btn.style.left = pos.x + 'px';
        btn.style.top = pos.y + 'px';
        btn.style.zIndex = '999';

        resultMessage.textContent = funnyMessages[Math.min(noClickCount - 1, funnyMessages.length - 1)];
        resultMessage.classList.remove('result-yes');

        // spawn one new clone per No click (sequential spawning)
        if (clonesSpawned < totalNoClones) {
            spawnSingleNoClone();
        }
    } else {
        // Final step: remove/disable all No buttons and encourage Yes
        const allNoButtons = document.querySelectorAll('.no-button, .no-clone');
        allNoButtons.forEach(b => {
            b.style.opacity = '0';
            b.style.pointerEvents = 'none';
            b.style.transition = 'opacity 0.6s ease-out';
        });

        resultMessage.textContent = '😊 Looks like you have no choice but to say YES! 💕';
        resultMessage.classList.add('result-yes');
        yesBtn.style.animation = 'pulse 0.6s ease-in-out infinite';
    }
}

function spawnSingleNoClone() {
    const clone = document.createElement('button');
    clone.className = 'no-button cute-btn no-clone';
    clone.type = 'button';
    clone.textContent = 'No';
    // position and style
    clone.style.position = 'fixed';
    const pos = randomPositionForBtn(140, 48);
    clone.style.left = pos.x + 'px';
    clone.style.top = pos.y + 'px';
    clone.style.zIndex = '998';
    clone.style.transition = 'all 0.35s cubic-bezier(.2,.9,.2,1)';

    // attach handler
    clone.addEventListener('click', handleNoClick);

    document.body.appendChild(clone);
    clonesSpawned++;
}

noBtn.addEventListener('click', function firstNoClick(e) {
    e.preventDefault();

    // On each click, treat like any other No click: move and spawn sequential clone
    handleNoClick(e);
});

// Create confetti effect
function createConfetti() {
    const colors = ['#ff4d7d', '#ff6b9d', '#ffd6e8', '#fff5f7', '#ffe5f0'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = Math.random() * 0.7 + 0.3;
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(function() {
            confetti.remove();
        }, 3000);
    }
}

// Easter egg: Double click the hearts for extra magic
let clickCount = 0;
landingPage.addEventListener('dblclick', function() {
    clickCount++;
    if (clickCount % 2 === 1) {
        document.body.style.background = 'linear-gradient(135deg, #ff6b9d, #ff4d7d)';
    } else {
        document.body.style.background = 'linear-gradient(135deg, #ffd6e8 0%, #fff5f7 100%)';
    }
});
