// Dark mode functionality
const themeToggleSwitch = document.getElementById('theme-toggle');
const quizTopicsList = document.querySelectorAll(".quiz__topic");
const quizTopicButton = document.querySelectorAll(".quiz__topic-btn");

themeToggleSwitch.addEventListener("click", () => {
  quizTopicsList.forEach((list) => {
    list.style.backgroundColor = "#3b4d66";
  });

  quizTopicButton.forEach((btn) => {
    btn.style.color = "white";
  });
});
