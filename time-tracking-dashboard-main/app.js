const scheduleLinks = document.querySelectorAll('.schedule-links a');
const articles = document.querySelectorAll('article');

scheduleLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        // Remove active class from all links
        scheduleLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');

        const selectedTimeframe = this.textContent.toLowerCase(); // 'daily', 'weekly', or 'monthly'

        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                articles.forEach(article => {
                    const button = article.querySelector('button');
                    const title = button?.textContent.trim(); // e.g., "Work", "Play"
                    const h2 = article.querySelector('h2');
                    const p = article.querySelector('p');

                    // Find the matching item in JSON
                    const activity = data.find(item => item.title === title);

                    if (activity && h2 && p) {
                        const timeframe = activity.timeframes[selectedTimeframe];
                        h2.textContent = `${timeframe.current}hrs`;
                        p.textContent = `Yesterday - ${timeframe.previous}hrs`;
                    }
                });
            })
            .catch(error => console.error('Error loading JSON:', error));
    });
});
