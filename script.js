
const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {

  // 스크롤 진행도
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${scrolled}%`;
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


const texts = ["디자이너", "I N T J", "성장하는"];
    let index = 0;
    const target = document.getElementById("typing-container");

    function typeText(text, i = 0) {
      if (i < text.length) {
        target.innerHTML += text[i];
        setTimeout(() => typeText(text, i + 1), 300);
      } else {
        setTimeout(() => deleteText(text), 1500);
      }
    }

    function deleteText(text, i = text.length - 1) {
      if (i >= 0) {
        target.innerHTML = text.slice(0, i);
        setTimeout(() => deleteText(text, i - 1), 80);
      } else {
        index = (index + 1) % texts.length;
        setTimeout(() => typeText(texts[index]), 500);
      }
    }

    setTimeout(() => typeText(texts[index]), 1000);

// section-text와 .timeline을 동시에 처리
const sectionTexts = document.querySelectorAll('.section-text, .timeline');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // section-text의 경우: span 요소 순차적으로 fade-in
      if (entry.target.classList.contains('section-text')) {
        const spans = entry.target.querySelectorAll('span');
        spans.forEach((span, index) => {
          setTimeout(() => {
            span.classList.add('visible');
          }, index * 700);  // 0.5초 간격으로 순차적으로 등장
        });
      } 
      // .timeline의 경우: 전체 요소 등장
      else if (entry.target.classList.contains('timeline')) {
        entry.target.classList.add('visible');
      }
    } else {
      // .section-text: visible 클래스 제거
      if (entry.target.classList.contains('section-text')) {
        const spans = entry.target.querySelectorAll('span');
        spans.forEach((span) => {
          span.classList.remove('visible');
        });
      }
      // .timeline: visible 클래스 제거
      else if (entry.target.classList.contains('timeline')) {
        entry.target.classList.remove('visible');
      }
    }
  });
}, { threshold: 0.5 });  // 화면 절반 이상 보일 때 trigger

sectionTexts.forEach(section => observer.observe(section));  // 두 가지 모두 감지

function runHighlightAnimation() {
  const highlightTarget = document.querySelector('.highlight-animated');
  if (highlightTarget) {
    highlightTarget.classList.add('highlight-animated');
  }
}

// 예: 페이지 로드 후 3초 뒤 실행
setTimeout(runHighlightAnimation, 3000);