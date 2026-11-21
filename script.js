
/* ==========================================
   MALU'S BIRTHDAY WONDERLAND ❤️
========================================== */


/* 1. BIRTHDAY COUNTDOWN */

const birthday = new Date(2026, 11, 4, 0, 0, 0).getTime();

function updateCountdown() {

    const distance = birthday - Date.now();

    if (distance <= 0) {

        const heading = document.querySelector(".countdown-box h3");
        const intro = document.querySelector(".countdown-intro");
        const grid = document.querySelector(".count-grid");
        const footer = document.querySelector(".countdown-footer");

        if (heading) {
            heading.textContent = "HAPPY 17TH BIRTHDAY MALU! 🎂❤️";
        }

        if (intro) {
            intro.textContent = "Today is YOUR special day!";
        }

        if (grid) {
            grid.innerHTML =
                "<div class='birthday-arrived'>IT'S YOUR DAY! 🎉🎀</div>";
        }

        if (footer) {
            footer.textContent = "Let's celebrate, Malu! 🧸";
        }

        clearInterval(countdownInterval);
        celebrate();

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    const values = {
        days,
        hours,
        minutes,
        seconds
    };

    Object.entries(values).forEach(([id, value]) => {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = String(value).padStart(2, "0");
        }

    });

}

updateCountdown();

const countdownInterval = setInterval(updateCountdown, 1000);


/* 2. OPEN MAIN SURPRISE */

function openSurprise() {

    const section = document.getElementById("kinderSection");

    if (section) {

        section.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

}


/* 3. KINDER JOY SURPRISE */

function openKinderJoy() {

    const egg = document.getElementById("kinderEgg");
    const reveal = document.getElementById("kinderReveal");

    if (!egg || !reveal || !reveal.classList.contains("hidden")) {
        return;
    }

    egg.style.transform = "scale(0) rotate(360deg)";
    egg.style.opacity = "0";

    setTimeout(() => {

        egg.classList.add("hidden");
        reveal.classList.remove("hidden");

        reveal.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        celebrate();

    }, 600);

}


/* 4. BIRTHDAY CELEBRATION */

function celebrate() {

    const emojis = [
        "💗", "💕", "✨", "🎀",
        "🧸", "🎉", "🌸", "⭐"
    ];

    for (let i = 0; i < 45; i++) {

        const piece = document.createElement("span");

        piece.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        piece.style.position = "fixed";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.top = "-40px";
        piece.style.fontSize = (18 + Math.random() * 18) + "px";
        piece.style.zIndex = "9999";
        piece.style.pointerEvents = "none";

        piece.style.animation =
            "fall " + (2 + Math.random() * 3) + "s linear forwards";

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 5500);

    }

}


/* 5. FLOATING DECORATIONS */

function startFloatingDecorations() {

    const container = document.getElementById("sparkles");

    if (!container) return;

    const symbols = ["💗", "✨", "🌸", "♡", "⭐", "🦋"];

    setInterval(() => {

        const sparkle = document.createElement("span");

        sparkle.className = "sparkle";

        sparkle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        sparkle.style.left = Math.random() * 100 + "vw";

        sparkle.style.fontSize =
            (12 + Math.random() * 18) + "px";

        sparkle.style.animationDuration =
            (5 + Math.random() * 5) + "s";

        container.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 10000);

    }, 800);

}

startFloatingDecorations();


/* 6. BLOW OUT BIRTHDAY CANDLES */

function blowCandles() {

    const flames = document.querySelectorAll(".flame");
    const message = document.getElementById("wishMessage");
    const button = document.getElementById("blowButton");

    if (!flames.length || !message || !button) return;

    if (button.disabled) return;

    flames.forEach(flame => {
        flame.classList.add("off");
    });

    message.classList.remove("hidden");

    button.textContent = "Wish Made! ❤️";
    button.disabled = true;

    celebrate();

}

// Also allow tapping the cake itself

const cake = document.getElementById("birthdayCake");

if (cake) {
    cake.addEventListener("click", blowCandles);
}


/* 7. ORIGINAL BIRTHDAY MELODY */

let audioContext = null;
let musicTimer = null;
let musicPlaying = false;
let melodyPosition = 0;

const melody = [
    523.25, 523.25, 587.33, 523.25,
    698.46, 659.25, 523.25, 523.25,
    587.33, 523.25, 783.99, 698.46,
    523.25, 523.25, 1046.50, 880.00
];

function playNote(frequency) {

    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);

    gain.gain.exponentialRampToValueAtTime(
        0.12,
        audioContext.currentTime + 0.03
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.28
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);

}


async function toggleMusic() {

    const button = document.getElementById("musicButton");

    if (!button) return;

    if (!musicPlaying) {

        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) {

            button.textContent = "Music not supported in this browser";
            return;

        }

        audioContext = audioContext || new AudioContextClass();

        await audioContext.resume();

        musicPlaying = true;

        button.textContent = "❚❚ Pause Birthday Music 🎵";

        playNote(melody[melodyPosition]);

        musicTimer = setInterval(() => {

            melodyPosition =
                (melodyPosition + 1) % melody.length;

            playNote(melody[melodyPosition]);

        }, 350);

    } else {

        musicPlaying = false;

        clearInterval(musicTimer);

        if (audioContext) {
            await audioContext.suspend();
        }

        button.textContent = "▶ Play Birthday Music";

    }

}


/* 8. WEBSITE READY */

console.log("Malu's Birthday Wonderland is ready! 🧸❤️");
console.log("Made with endless love by her brother.");
