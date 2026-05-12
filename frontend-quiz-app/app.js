document.addEventListener("DOMContentLoaded", () => {
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
  const quizMenuScreen = document.getElementById("quiz-menu");
  const quizQestionsScreen = document.getElementById("quiz-question");

  let isDark = false;

  if (themeToggleSwitch) {
    themeToggleSwitch.addEventListener("click", () => {
      isDark = !isDark;

      // 🌙 Body styles
      if (bodyEl) {
        bodyEl.style.backgroundColor = isDark ? "#313e51" : "#f4f6fa";
        bodyEl.style.backgroundImage = isDark
          ? "url('./assets/images/pattern-background-desktop-dark.svg')"
          : "url('./assets/images/pattern-background-desktop-light.svg')";
      }

      // 📝 Text styles
      if (h1El) {
        h1El.style.color = isDark ? "white" : "#313e51";
      }

      if (subTitleEl) {
        subTitleEl.style.color = isDark ? "#abc1e1" : "#626c7f";
      }

      if (headerText) {
        headerText.style.color = isDark ? "white" : "#626c7f";
      }

      // 📦 Topic cards
      quizTopicsList.forEach((list) => {
        list.style.backgroundColor = isDark ? "#3b4d66" : "white";
      });

      // 🔘 Buttons
      quizTopicButtons.forEach((btn) => {
        btn.style.color = isDark ? "white" : "#313e51";
      });

      // ☀️🌙 Icons
      if (sunIcon) {
        sunIcon.style.opacity = isDark ? "0.9" : "1";
        sunIcon.style.filter = isDark ? "brightness(0) invert(1)" : "none";
      }

      if (moonIcon) {
        moonIcon.style.opacity = isDark ? "1" : "0.9";
        moonIcon.style.filter = isDark ? "brightness(0) invert(1)" : "none";
      }

      // Toggle thumb
      if (toggleThumb) {
        toggleThumb.style.transform = isDark
          ? "translateX(24px)"
          : "translateX(-2px)";
      }
    });
  }

  // Quiz Implementation
  let quizTopicsData = {};

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      quizTopicsData = data;

      quizTopicButtons.forEach((topic) => {
        topic.addEventListener("click", () => {
          const selectedTopic = topic.dataset.topic;

          const selected = quizTopicsData.quizzes.find(
            (quiz) => quiz.title === selectedTopic,
          );

          if (headerText) {
            headerText.textContent = selected?.title || "Unknown Topic";
          }
          // Switch screens
          if (quizMenuScreen && quizQestionsScreen) {
            quizMenuScreen.style.display = "none";
            quizQestionsScreen.style.display = "flex";
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error loading data.json:", error);
    });
});
