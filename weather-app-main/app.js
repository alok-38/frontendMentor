const h1El = document.querySelector('h1');
const formWrapper = document.querySelector('.form-wrapper');
const weatherReport = document.querySelector('.weather-report');
const noResultP = formWrapper.querySelector('p');
const searchInput = document.getElementById('search');

const firstArticle = document.querySelector('.weather-report section article:first-child');
const secondArticle = document.querySelectorAll('.weather-report section article')[1];
const thirdArticle = document.querySelectorAll('.weather-report section article')[2];
const dailyForecastWrapper = thirdArticle.querySelector('.daily--forcast__wrapper');

const hourlyListItems = document.querySelectorAll('aside ul li');
const daySelect = document.getElementById('day-select');

const originalFormWrapperHTML = formWrapper.innerHTML;

function showNoResultsMessage() {
    weatherReport.style.display = 'none';
    noResultP.style.display = 'block';
}

function clearNoResultsMessage() {
    noResultP.style.display = 'none';
    weatherReport.style.display = '';
}

function showApiError() {
    if (weatherReport) weatherReport.style.display = 'none';
    if (noResultP) noResultP.style.display = 'none';

    h1El.style.marginBottom = '24px';

    formWrapper.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 24px; align-items: center;">
        <p style="text-align: center;">
          We couldn't connect to the server (API error). Please try again in a few moments.
        </p>
        <button type="button" id="retry-btn" style="width: 98px; height: 43px; padding: 12px 16px; border-radius: 8px; background-color: #262540; color: white; border: none; cursor: pointer;">
          Retry
        </button>
      </div>
    `;

    document.getElementById('retry-btn').addEventListener('click', () => location.reload());
    h1El.textContent = "Something went wrong";
}

function showSpinner() {
    const form = formWrapper.querySelector('form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    const spinner = document.createElement('div');
    spinner.id = 'loading-spinner';
    spinner.style.border = '4px solid #f3f3f3';
    spinner.style.borderTop = '4px solid #555';
    spinner.style.borderRadius = '50%';
    spinner.style.width = '24px';
    spinner.style.height = '24px';
    spinner.style.animation = 'spin 1s linear infinite';
    spinner.style.marginLeft = '8px';

    submitBtn.disabled = true;
    submitBtn.appendChild(spinner);
}

function removeSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.remove();

    const form = formWrapper.querySelector('form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    submitBtn.disabled = false;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function restoreFormWrapper() {
    if (!formWrapper.querySelector('form')) {
        formWrapper.innerHTML = originalFormWrapperHTML;
        bindSubmitEvent();
    }
}

function updateHourlyForecastForDay(weatherData, selectedDay) {
    const hourlyTimes = weatherData.hourly?.time || [];
    const temperatures = weatherData.hourly?.temperature_2m || [];

    const selectedDate = weatherData.daily?.time.find(dateStr => {
        const date = new Date(dateStr);
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        return weekday === selectedDay.toLowerCase();
    });

    if (!selectedDate) {
        hourlyListItems.forEach(li => li.textContent = 'N/A');
        return;
    }

    const filteredHours = [];
    for (let i = 0; i < hourlyTimes.length; i++) {
        if (hourlyTimes[i].startsWith(selectedDate)) {
            filteredHours.push({
                time: hourlyTimes[i],
                temp: temperatures[i]
            });
        }
    }

    for (let i = 0; i < hourlyListItems.length; i++) {
        const li = hourlyListItems[i];

        if (filteredHours[i]) {
            const dateObj = new Date(filteredHours[i].time);
            const hourFormatted = dateObj.toLocaleTimeString('en-US', {
                hour: 'numeric',
                hour12: true,
            });

            const temp = Math.round(filteredHours[i].temp);
            li.innerHTML = `
                <div>${hourFormatted}</div>
                <div style="font-weight: bold;">${temp}°</div>
            `;
        } else {
            li.innerHTML = '<div>N/A</div>';
        }
    }
}

function bindSubmitEvent() {
    const form = formWrapper.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        restoreFormWrapper();

        const city = searchInput.value.trim();
        if (!city) return;

        clearNoResultsMessage();
        showSpinner();

        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`)
            .then(res => {
                if (!res.ok) throw new Error('Geocoding API error');
                return res.json();
            })
            .then(data => {
                if (!data.results || data.results.length === 0) {
                    showNoResultsMessage();
                    throw new Error('No geocoding results');
                }

                const { latitude, longitude, name: cityName, country } = data.results[0];

                // Corrected weather URL: Removed 'time' from daily parameters
                const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,windspeed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

                return fetch(weatherUrl)
                    .then(res => {
                        if (!res.ok) throw new Error('Weather API error');
                        return res.json();
                    })
                    .then(weatherData => {
                        // First article
                        const todayTemp = weatherData.daily.temperature_2m_max
                            ? weatherData.daily.temperature_2m_max[0]
                            : 'N/A';
                        const todayDate = weatherData.current_weather
                            ? weatherData.current_weather.time
                            : new Date().toISOString();

                        firstArticle.innerHTML = `
                            <h2>${cityName}, ${country || ''}</h2>
                            <p>${formatDate(todayDate)}</p>
                            <p style="font-size: 3rem; margin-top: 1rem;">${todayTemp}°C</p>
                        `;

                        // Second article
                        if (
                            weatherData.current_weather &&
                            weatherData.hourly &&
                            weatherData.hourly.time
                        ) {
                            const currentTime = weatherData.current_weather.time;
                            const hourlyTimes = weatherData.hourly.time;
                            const index = hourlyTimes.indexOf(currentTime);

                            const feelsLike = (weatherData.hourly.apparent_temperature && index !== -1)
                                ? weatherData.hourly.apparent_temperature[index]
                                : weatherData.current_weather.temperature || 'N/A';

                            const humidity = (weatherData.hourly.relativehumidity_2m && index !== -1)
                                ? weatherData.hourly.relativehumidity_2m[index] + '%'
                                : 'N/A';

                            const windSpeed = weatherData.current_weather.windspeed
                                ? weatherData.current_weather.windspeed + ' km/h'
                                : 'N/A';

                            const precipitation = (weatherData.hourly.precipitation && index !== -1)
                                ? weatherData.hourly.precipitation[index] + ' mm'
                                : 'N/A';

                            secondArticle.innerHTML = `
                                <div>Feels like <strong>${feelsLike}°C</strong></div>
                                <div>Humidity <strong>${humidity}</strong></div>
                                <div>Wind <strong>${windSpeed}</strong></div>
                                <div>Precipitation <strong>${precipitation}</strong></div>
                            `;
                        } else {
                            secondArticle.innerHTML = `
                                <div>Feels like <strong>N/A</strong></div>
                                <div>Humidity <strong>N/A</strong></div>
                                <div>Wind <strong>N/A</strong></div>
                                <div>Precipitation <strong>N/A</strong></div>
                            `;
                        }

                        // Daily forecast — populate 7 existing divs
                        const dayDivs = dailyForecastWrapper.querySelectorAll('div');
                        dayDivs.forEach((div, i) => {
                            if (
                                weatherData.daily?.time?.[i] &&
                                weatherData.daily.temperature_2m_max?.[i] != null &&
                                weatherData.daily.temperature_2m_min?.[i] != null
                            ) {
                                const date = new Date(weatherData.daily.time[i]);
                                const day = date.toLocaleDateString('en-US', { weekday: 'short' });
                                const max = Math.round(weatherData.daily.temperature_2m_max[i]);
                                const min = Math.round(weatherData.daily.temperature_2m_min[i]);

                                div.innerHTML = `${day}<br><strong>${max}°</strong><br><span style="color:#666;">${min}°</span>`;
                            } else {
                                div.innerHTML = 'N/A';
                            }
                        });

                        // Store data for dropdown use
                        window.latestWeatherData = weatherData;

                        // Immediately update hourly forecast to selected dropdown value
                        const selectedDay = daySelect.value;
                        updateHourlyForecastForDay(weatherData, selectedDay);
                    });
            })
            .catch(err => {
                console.error(err);
                showApiError();
            })
            .finally(() => {
                removeSpinner();
            });
    });
}


// Handle dropdown change for hourly forecast
daySelect.addEventListener('change', () => {
    const selectedDay = daySelect.value;
    if (window.latestWeatherData) {
        updateHourlyForecastForDay(window.latestWeatherData, selectedDay);
    }
});

// Initial binding
bindSubmitEvent();
