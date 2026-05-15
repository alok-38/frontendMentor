document.querySelectorAll(".faq__question").forEach((button) => {
  button.addEventListener("click", () => {
    // Extract the number from button ID
    const questionNumber = button.id.split("-").pop();
    // Find the corresponding answer
    const faqAnswer = document.getElementById(`faq-answer-${questionNumber}`);
    // Toggle visibility
    const isHidden = faqAnswer.hasAttribute("hidden");
    if (isHidden) {
      faqAnswer.removeAttribute("hidden");
      button.setAttribute("aria-expanded", false);
    }
  });
});
