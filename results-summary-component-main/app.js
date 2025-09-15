const buttonEl = document.querySelector('button');
const scoreSpans = document.querySelectorAll('li > p span');
const mainScoreSpan = document.querySelector('.result h2 span');

// Animate number inside a span from 0 to targetScore over duration ms
function animateScore(span, targetScore, duration = 1000) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * targetScore);
        span.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

buttonEl.addEventListener('click', () => {
    // Calculate average score
    let total = 0;
    scoreSpans.forEach(span => {
        total += parseInt(span.dataset.score, 10);
    });
    const average = Math.round(total / scoreSpans.length);

    // Animate main score (average)
    animateScore(mainScoreSpan, average);

    // Animate all individual scores
    scoreSpans.forEach(span => {
        const target = parseInt(span.dataset.score, 10);
        animateScore(span, target);
    });

    // Change button text
    buttonEl.textContent = "Continue";
});
