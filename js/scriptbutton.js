// Получаем все рождественские кнопки
const christmasButtons = document.querySelectorAll('.christmas-btn');

// Добавляем обработчики для каждой кнопки
christmasButtons.forEach(button => {
    // Эффект при наведении
    button.addEventListener('mouseenter', function() {
        createSnowflakes(this);
        playHoverSound();
    });
    
    // Эффект при клике
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Создаем эффект частиц
        createChristmasParticles(e);
        
        // Проигрываем звук
        playClickSound();
        
        // Анимация нажатия
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Показываем сообщение
        showChristmasMessage(this);
    });
    
    // Добавляем свечение при фокусе
    button.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 20px rgba(255, 215, 79, 0.8)';
    });
    
    button.addEventListener('blur', function() {
        this.style.boxShadow = '';
    });
});

// Функция создания снежинок
function createSnowflakes(button) {
    const snowflakes = ['❄', '❅', '❆', '*'];
    
    for (let i = 0; i < 5; i++) {
        const snowflake = document.createElement('span');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        snowflake.style.cssText = `
            position: absolute;
            top: -10px;
            left: ${Math.random() * 100}%;
            font-size: ${10 + Math.random() * 10}px;
            color: white;
            opacity: ${0.3 + Math.random() * 0.7};
            pointer-events: none;
            z-index: 1000;
        `;
        
        button.appendChild(snowflake);
        
        // Анимация падения
        const duration = 1 + Math.random() * 2;
        const animation = snowflake.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${button.offsetHeight + 20}px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        animation.onfinish = () => snowflake.remove();
    }
}

// Функция создания рождественских частиц
function createChristmasParticles(event) {
    const button = event.currentTarget;
    const colors = ['#FF0000', '#00FF00', '#FFFFFF', '#FFD700', '#1E90FF'];
    const symbols = ['❄', '🎄', '🎅', '🎁', '⭐', '🔔'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'christmas-particle';
        particle.textContent = Math.random() > 0.5 ? 
            symbols[Math.floor(Math.random() * symbols.length)] : 
            '';
        
        if (!particle.textContent) {
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.borderRadius = '50%';
        }
        
        particle.style.cssText = `
            position: fixed;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            font-size: ${12 + Math.random() * 12}px;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            opacity: 1;
            text-shadow: 0 0 5px currentColor;
        `;
        
        document.body.appendChild(particle);
        
        // Анимация разлета частиц
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        const animation = particle.animate([
            { 
                transform: `translate(-50%, -50%) translate(0, 0) rotate(0deg)`,
                opacity: 1
            },
            { 
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${360}deg)`,
                opacity: 0
            }
        ], {
            duration: 800 + Math.random() * 700,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        animation.onfinish = () => particle.remove();
    }
}

// Функция показа рождественского сообщения
function showChristmasMessage(button) {
    const messages = [
        "Merry Christmas! 🎄",
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    // Создаем временное сообщение
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        font-size: 24px;
        z-index: 10000;
        border: 2px solid #c62828;
        box-shadow: 0 0 30px rgba(198, 40, 40, 0.5);
        animation: messageFade 2s forwards;
    `;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
    messageElement.remove();
    window.location.href = 'Way.html'; // или другая страница
}, 3000);
}

// Добавляем CSS для анимации сообщения
const messageStyle = document.createElement('style');
messageStyle.textContent = `
    @keyframes messageFade {
        0% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.5); 
        }
        20% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1.1); 
        }
        40% { 
            transform: translate(-50%, -50%) scale(1); 
        }
        80% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.5); 
        }
    }
`;
document.head.appendChild(messageStyle);

// Звуковые эффекты (используем Web Audio API)
function playHoverSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Нота C5
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        console.log("Audio not supported");
    }
}

function playClickSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Создаем колокольчик звук
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(659.25 + (i * 100), audioContext.currentTime); // Нота E5
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.5);
            }, i * 100);
        }
    } catch (e) {
        console.log("Audio not supported");
    }
}

// Добавляем снег на задний фон (опционально)
function createBackgroundSnow() {
    const snowContainer = document.createElement('div');
    snowContainer.id = 'snow-container';
    snowContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
    document.body.appendChild(snowContainer);
    
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'bg-snowflake';
        snowflake.textContent = '❄';
        snowflake.style.cssText = `
            position: absolute;
            top: -20px;
            left: ${Math.random() * 100}%;
            font-size: ${10 + Math.random() * 15}px;
            color: white;
            opacity: ${0.3 + Math.random() * 0.5};
            animation: fall linear infinite;
            animation-duration: ${5 + Math.random() * 10}s;
            animation-delay: ${Math.random() * 5}s;
        `;
        snowContainer.appendChild(snowflake);
    }
    
    // Добавляем стили для анимации падения
    const snowStyle = document.createElement('style');
    snowStyle.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(-20px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(snowStyle);
}

// Запускаем снег при загрузке
document.addEventListener('DOMContentLoaded', function() {
    createBackgroundSnow();
    
    // Анимация появления кнопок
    const buttons = document.querySelectorAll('.christmas-btn');
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(30px) scale(0.8)';
        
        setTimeout(() => {
            button.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0) scale(1)';
        }, index * 300);
    });
});