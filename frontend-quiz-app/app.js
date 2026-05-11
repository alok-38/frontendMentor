// Dark mode functionality
const themeToggleSwitch = document.getElementById("theme-toggle");
const quizTopicsList = document.querySelectorAll(".quiz__topic");
const quizTopicButtons = document.querySelectorAll(".quiz__topic-btn");
const bodyEl = document.querySelector("body");
const h1El = document.getElementById("quiz-menu-title");
const subTitleEl = document.querySelector(".quiz__subtitle");
const headerText = document.querySelector(".header__text");
const sunIcon = document.getElementById("sun");
const moonIcon = document.getElementById("moon");
const toggleThumb = document.querySelector(".toggle__thumb");

let isDark = false;

themeToggleSwitch.addEventListener("click", () => {
  isDark = !isDark;

  // 🌙 Body styles
  bodyEl.style.backgroundColor = isDark ? "#313e51" : "#f4f6fa";
  bodyEl.style.backgroundImage = isDark
    ? "url('./assets/images/pattern-background-desktop-dark.svg')"
    : "url('./assets/images/pattern-background-desktop-light.svg')";

  // 📝 Text styles
  h1El.style.color = isDark ? "white" : "#313e51";
  subTitleEl.style.color = isDark ? "#abc1e1" : "#626c7f";
  headerText.style.color = isDark ? "white" : "#626c7f";

  // 📦 Topic cards
  quizTopicsList.forEach((list) => {
    list.style.backgroundColor = isDark ? "#3b4d66" : "white";
  });

  // 🔘 Buttons
  quizTopicButtons.forEach((btn) => {
    btn.style.color = isDark ? "white" : "#313e51";
  });

  // ☀️🌙 Icons
  sunIcon.style.opacity = isDark ? "0.9" : "1";
  sunIcon.style.filter = isDark ? "brightness(0) invert(1)" : "none";

  moonIcon.style.opacity = isDark ? "1" : "0.9";
  moonIcon.style.filter = isDark ? "brightness(0) invert(1)" : "none";

  // Move toggle thumb
  toggleThumb.style.transform = isDark
    ? "translateX(24px)"
    : "translateX(-2px)";
});

// Quiz Implementation
let quizTopicsData = {};

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    quizTopicsData = data;
    quizTopicButtons.forEach((topic) => {
      topic.addEventListener("click", () => {
        const selectedTopic = topic.dataset.topic;

        const selected = quizTopicsData.quizzes.find(
          (quiz) => quiz.title === selectedTopic,
        );

        headerText.textContent = selected?.title || "Unknown Topic";
      });
    });
  });
