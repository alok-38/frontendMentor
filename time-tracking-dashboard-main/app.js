const data = [
    {
        "title": "Work",
        "timeframes": {
            "daily": { "current": 5, "previous": 7 },
            "weekly": { "current": 32, "previous": 36 },
            "monthly": { "current": 103, "previous": 128 }
        }
    },
    {
        "title": "Play",
        "timeframes": {
            "daily": { "current": 1, "previous": 2 },
            "weekly": { "current": 10, "previous": 8 },
            "monthly": { "current": 23, "previous": 29 }
        }
    },
    {
        "title": "Study",
        "timeframes": {
            "daily": { "current": 0, "previous": 1 },
            "weekly": { "current": 4, "previous": 7 },
            "monthly": { "current": 13, "previous": 19 }
        }
    },
    {
        "title": "Exercise",
        "timeframes": {
            "daily": { "current": 1, "previous": 1 },
            "weekly": { "current": 4, "previous": 5 },
            "monthly": { "current": 11, "previous": 18 }
        }
    },
    {
        "title": "Social",
        "timeframes": {
            "daily": { "current": 1, "previous": 3 },
            "weekly": { "current": 5, "previous": 10 },
            "monthly": { "current": 21, "previous": 23 }
        }
    },
    {
        "title": "Self Care",
        "timeframes": {
            "daily": { "current": 0, "previous": 1 },
            "weekly": { "current": 2, "previous": 2 },
            "monthly": { "current": 7, "previous": 11 }
        }
    }
];

// Select timeframe buttons (Daily, Weekly, Monthly)
const timeframeLinks = document.querySelectorAll('section:first-of-type a');

// Helper to get label for "previous" time
const getLabel = (timeframe) => {
    switch (timeframe) {
        case 'daily': return 'Yesterday';
        case 'weekly': return 'Last Week';
        case 'monthly': return 'Last Month';
        default: return 'Previous';
    }
};

// Event listeners for each link
timeframeLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        // Remove .active from all and set it on clicked link
        timeframeLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const timeframe = link.textContent.trim().toLowerCase();
        const previousLabel = getLabel(timeframe);

        data.forEach(item => {
            const className = item.title.toLowerCase().replace(' ', '');
            const card = document.querySelector(`article.${className}`);
            if (!card) return;

            const hoursEl = card.querySelector('h2');
            const previousEl = card.querySelector('p');

            const current = item.timeframes[timeframe].current;
            const previous = item.timeframes[timeframe].previous;

            hoursEl.textContent = `${current}hrs`;
            previousEl.textContent = `${previousLabel} - ${previous}hrs`;
        });
    });
});

// Set default to Weekly on page load
document.querySelector('section:first-of-type a:nth-of-type(2)').click();
