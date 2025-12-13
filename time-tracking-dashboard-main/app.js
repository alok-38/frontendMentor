// Buttons
const dailyBtn = document.getElementById('daily');
const weeklyBtn = document.getElementById('weekly');
const monthlyBtn = document.getElementById('monthly');

// Card elements
const currentTimes = document.getElementsByClassName('card__current');
const previousTimes = document.getElementsByClassName('card__previous');
const cardTitles = document.querySelectorAll('.card__title');

// All buttons for active state
const buttons = document.querySelectorAll('.report__filter-btn');

// Helper function to set active button
function setActive(button) {
    buttons.forEach(btn => btn.classList.remove('report__filter-btn--active'));
    button.classList.add('report__filter-btn--active');
}

// Load data and update cards
async function loadData(timeframe = 'weekly') {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();

        data.forEach((item, index) => {
            // Optional: Update card title (you may keep static HTML titles)
            // cardTitles[index].childNodes[0].textContent = item.title;

            // Update current hours
            currentTimes[index].textContent = `${item.timeframes[timeframe].current}hrs`;

            // Determine period label
            const periodLabel =
                timeframe === 'daily' ? 'Day' :
                    timeframe === 'weekly' ? 'Week' : 'Month';

            // Update previous hours
            previousTimes[index].textContent = `Last ${periodLabel} - ${item.timeframes[timeframe].previous}hrs`;
        });
    } catch (err) {
        console.error('Failed to load JSON:', err);
    }
}

// Button click events
dailyBtn.addEventListener('click', () => {
    setActive(dailyBtn);
    loadData('daily');
});

weeklyBtn.addEventListener('click', () => {
    setActive(weeklyBtn);
    loadData('weekly');
});

monthlyBtn.addEventListener('click', () => {
    setActive(monthlyBtn);
    loadData('monthly');
});

// Initial load: weekly (matches your active button)
loadData('weekly');
