const birthday = new Date("December 4, 2026 00:00:00").getTime();
function updateCountdown(){
  const now=Date.now(), distance=birthday-now;
  if(distance<=0){["days","hours","minutes","seconds"].forEach(id=>document.getElementById(id).textContent="00");return;}
  document.getElementById("days").textContent=Math.floor(distance/86400000);
  document.getElementById("hours").textContent=String(Math.floor(distance%86400000/3600000)).padStart(2,"0");
  document.getElementById("minutes").textContent=String(Math.floor(distance%3600000/60000)).padStart(2,"0");
  document.getElementById("seconds").textContent=String(Math.floor(distance%60000/1000)).padStart(2,"0");
}
updateCountdown();setInterval(updateCountdown,1000);

const photos=[
  ["images/malu-01.jpg","A moment to keep."],
  ["images/malu-02.jpg","That beautiful smile."],
  ["images/malu-03.jpg","A little sunshine."],
  ["images/malu-04.jpg","A day worth remembering."],
  ["images/malu-05.jpg","Side by side."],
  ["images/malu-06.jpg","Our kind of memory."],
  ["images/malu-07.jpg","The silly little moments."],
  ["images/malu-08.jpg","Forever in the camera roll."],
  ["images/malu-09.jpg","A smile that stays."],
  ["images/malu-10.jpg","Always my little sister."]
];
let current=0, playing=true, timer;
const image=document.getElementById("slideImage"), number=document.getElementById("slideNumber"), captionNumber=document.getElementById("captionNumber"), caption=document.getElementById("slideCaption"), dots=document.getElementById("slideDots"), playButton=document.getElementById("playPause");
photos.forEach((photo,index)=>{const dot=document.createElement("button");dot.setAttribute("aria-label",`Show photo ${index+1}`);dot.addEventListener("click",()=>showSlide(index));dots.appendChild(dot);});
function showSlide(index){
  current=(index+photos.length)%photos.length;
  image.classList.add("fade");
  setTimeout(()=>{image.src=photos[current][0];caption.textContent=photos[current][1];number.textContent=String(current+1).padStart(2,"0");captionNumber.textContent=String(current+1).padStart(2,"0");image.classList.remove("fade");},180);
  [...dots.children].forEach((dot,i)=>dot.classList.toggle("active",i===current));
}
function next(){showSlide(current+1)}
function start(){clearInterval(timer);timer=setInterval(next,4200);playing=true;playButton.innerHTML='Ⅱ <span>PAUSE</span>'}
function pause(){clearInterval(timer);playing=false;playButton.innerHTML='▶ <span>PLAY</span>'}
document.getElementById("prevSlide").addEventListener("click",()=>showSlide(current-1));
document.getElementById("nextSlide").addEventListener("click",()=>showSlide(current+1));
playButton.addEventListener("click",()=>playing?pause():start());
showSlide(0);start();
