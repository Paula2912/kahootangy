// Elementos del DOM
const playBtn = document.getElementById('playBtn');
const infoBtn = document.getElementById('infoBtn');
const backBtn = document.getElementById('backBtn');
const mainScreen = document.querySelector('.mario-bg');
const infoScreen = document.getElementById('infoScreen');
const mainTitle = document.querySelector('.title-main-text');
const buttons = document.querySelectorAll('.nes-button');

// Array para preguntas (puedes llenarlo luego)
let preguntasAngy = [];

// === EFECTOS VISUALES MARIO BROS ===

// Brillo pulsante título
setInterval(() => {
    mainTitle.style.textShadow =
        Math.random() > 0.5
            ? '6px 6px 0 #000, -4px -4px 0 #FF6600, 0 0 20px #FFD700'
            : '6px 6px 0 #000, -4px -4px 0 #FF6600, 0 0 30px #FF6600';
}, 2000);

// Nubes movimiento suave
const clouds = document.querySelectorAll('.cloud');
clouds.forEach((cloud, index) => {
    cloud.style.animation = `cloudFloat ${40 + index * 10}s infinite linear`;
});

// Tubería parpadeo ocasional
setInterval(() => {
    const pipe = document.querySelector('.pipe');
    if (pipe) {
        pipe.style.filter = Math.random() > 0.9 ? 'hue-rotate(90deg)' : 'none';
    }
}, 3000);

// === EVENTOS BOTONES ===

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.08)';
        this.style.boxShadow =
            '0 20px 0 #8B8B8B, inset 0 4px 0 rgba(255,255,255,0.9), 0 25px 40px rgba(0,0,0,0.5)';
        document.body.style.animation = 'shake 0.1s';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow =
            '0 8px 0 #8B8B8B, inset 0 4px 0 rgba(255,255,255,0.8), 0 12px 24px rgba(0,0,0,0.3)';
    });

    btn.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-2px) scale(0.98)';
    });

    btn.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-8px) scale(1.08)';
    });
});

// === BOTÓN JUGAR (ARREGLADO) ===

playBtn.addEventListener('click', function(e) {
    e.preventDefault();

    createCoinExplosion();

    // Guardar preguntas si luego las usas en game.html
    localStorage.setItem('kahootAngy', JSON.stringify(preguntasAngy));

    setTimeout(() => {
        window.location.href = "game.html";
    }, 700);
});

// === BOTÓN INFO ===

infoBtn.addEventListener('click', function(e) {
    e.preventDefault();

    mainScreen.style.transition = 'opacity 0.8s ease';
    mainScreen.style.opacity = '0.3';
    mainScreen.style.pointerEvents = 'none';

    setTimeout(() => {
        infoScreen.style.display = 'block';
        infoScreen.style.opacity = '0';
        infoScreen.style.transform = 'scale(0.8)';

        setTimeout(() => {
            infoScreen.style.transition = 'all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55)';
            infoScreen.style.opacity = '1';
            infoScreen.style.transform = 'scale(1)';
        }, 100);
    }, 400);
});

// === BOTÓN VOLVER ===

if (backBtn) {
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();

        infoScreen.style.opacity = '0';
        infoScreen.style.transform = 'scale(0.9)';

        setTimeout(() => {
            infoScreen.style.display = 'none';
            mainScreen.style.opacity = '1';
            mainScreen.style.pointerEvents = 'all';
        }, 400);
    });
}

// === EXPLOSIÓN MONEDAS ===

function createCoinExplosion() {
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const coin = document.createElement('div');
            coin.innerHTML = '🪙';
            coin.style.cssText = `
                position: fixed;
                font-size: 30px;
                pointer-events: none;
                z-index: 1000;
                left: 50%;
                top: 50%;
                animation: coinFly 1s forwards;
            `;
            document.body.appendChild(coin);

            setTimeout(() => coin.remove(), 1000);
        }, i * 50);
    }
}

// === SHAKE + COIN ANIMATIONS ===

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
    0%,100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
}
@keyframes coinFly {
    0% { transform: translate(-50%,-50%) rotate(0deg); opacity: 1; }
    100% {
        transform: translate(${Math.random()*400-200}px, ${Math.random()*-300-100}px) rotate(720deg);
        opacity: 0;
    }
}`;
document.head.appendChild(shakeStyle);

// === TECLADO ===

document.addEventListener('keydown', function(e) {
    if (e.code === 'Enter' || e.code === 'Space') playBtn.click();
    if (e.code === 'KeyI' || e.code === 'F1') infoBtn.click();
});

console.log('🎮 Kahoot Angy Mario Bros - ¡LISTO! 🚀');
