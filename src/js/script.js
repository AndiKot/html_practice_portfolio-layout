const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const closeEl = document.querySelector(".menu__close");
const overlayEl = document.querySelector(".menu__overlay");
const progresses = document.querySelectorAll(".skills__progress-range"),
    progressBars = document.querySelectorAll(".skills__progress-bar-range");

const closeArr = [];
closeArr.push(closeEl, overlayEl);

hamburger.addEventListener("click", () => {
    menu.classList.add("active");
});

closeArr.forEach(item => {
    item.addEventListener("click", () => menu.classList.remove("active"));
});

progressBars.forEach(
    (item, index) => (item.style.width = progresses[index].innerText)
);
