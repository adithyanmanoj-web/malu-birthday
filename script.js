
// ========================================
// MALU'S 17TH BIRTHDAY COUNTDOWN
// ========================================

const birthday = new Date("December 4, 2026 00:00:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = birthday - now;

  if (distance <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });
    return;
  }

  document.getElementById("days").textContent =
    Math.floor(distance / 86400000);

  document.getElementById("hours").textContent =
    String(Math.floor(distance % 86400000 / 3600000)).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(Math.floor(distance % 3600000 / 60000)).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(Math.floor(distance % 60000 / 1000)).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ========================================
// MALU'S PHOTO SLIDESHOW
// ========================================

const photos = [
  ["malu-01.jpg", "A moment to keep."],
  ["malu-02.jpg", "That beautiful smile."],
  ["malu-03.jpg", "A little sunshine."],
  ["malu-04.jpg", "A day worth remembering."],
  ["malu-05.jpg", "Side by side."],
  ["malu-06.jpg", "Our kind of memory."],
  ["malu-07.jpg", "The silly little moments."],
  ["malu-08.jpg", "Forever in the camera roll."],
  ["malu-09.jpg", "A smile that stays."],
  ["malu-10.jpg", "Always my little sister."]
];

let current = 0;
let playing = true;
let timer;

const image = document.getElementById("slideImage");
const number = document.getElementById("slideNumber");
const captionNumber = document.getElementById("captionNumber");
const caption = document.getElementById("slideCaption");
const dots = document.getElementById("slideDots");
const playButton = document.getElementById("playPause");


// Create slideshow navigation dots

photos.forEach((photo, index) => {
  const dot = document.createElement("button");

  dot.setAttribute("aria-label", `Show photo ${index + 1}`);

  dot.addEventListener("click", () => {
    showSlide(index);
  });

  dots.appendChild(dot);
});


// Display selected photo

function showSlide(index) {
  current = (index + photos.length) % photos.length;

  image.classList.add("fade");

  setTimeout(() => {
    image.src = photos[current][0];

    caption.textContent = photos[current][1];

    number.textContent =
      String(current + 1).padStart(2, "0");

    captionNumber.textContent =
      String(current + 1).padStart(2, "0");

    image.classList.remove("fade");
  }, 180);

  [...dots.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === current);
  });
}


// Next photo

function next() {
  showSlide(current + 1);
}


// Start slideshow

function start() {
  clearInterval(timer);

  timer = setInterval(next, 4200);

  playing = true;

  playButton.innerHTML = 'Ⅱ <span>PAUSE</span>';
}


// Pause slideshow

function pause() {
  clearInterval(timer);

  playing = false;

  playButton.innerHTML = '▶ <span>PLAY</span>';
}


// Previous and next buttons

document.getElementById("prevSlide").addEventListener("click", () => {
  showSlide(current - 1);
});

document.getElementById("nextSlide").addEventListener("click", () => {
  showSlide(current + 1);
});


// Play / Pause button

playButton.addEventListener("click", () => {
  playing ? pause() : start();
});


// Initialize slideshow

showSlide(0);
start();
