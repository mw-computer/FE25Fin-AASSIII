window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.classList.toggle('fixed', window.scrollY > 50);
});

// 맨 위로가기 버튼
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
