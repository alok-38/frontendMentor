const h1El = document.querySelector('h1');
const formWrapper = document.querySelector('.form-wrapper');
const form = formWrapper.querySelector('form');
const noResultP = formWrapper.querySelector('p');
const headerEl = document.querySelector('header');

// Function to add FontAwesome icon centered above h1 only once
function addFontAwesomeIcon() {
    // Check if icon already exists
    if (document.querySelector('.fa-cloud-error-icon')) return;

    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-cloud fa-cloud-error-icon'; // add unique class for styling & reference
    icon.style.fontSize = '2rem';
    icon.style.color = '#ff4757'; // error red
    icon.style.display = 'block';
    icon.style.marginBottom = '0.5rem';

    // Center icon: wrap in a div container with flex centering
    const iconWrapper = document.createElement('div');
    iconWrapper.style.display = 'flex';
    iconWrapper.style.justifyContent = 'center';
    iconWrapper.style.marginBottom = '24px'; // spacing below icon and above h1
    iconWrapper.appendChild(icon);

    h1El.parentNode.insertBefore(iconWrapper, h1El);
}

// Function to remove the icon if present (optional, if you want retry to clean it)
function removeFontAwesomeIcon() {
    const iconWrapper = document.querySelector('.fa-cloud-error-icon')?.parentNode;
    if (iconWrapper) iconWrapper.remove();
}

// Function to show API error with retry button
function showApiError() {
    // Remove the "No search result found!" <p> if present
    if (noResultP) {
        noResultP.remove();
    }

    // Replace form with error message and retry button
    formWrapper.innerHTML = `
      <div style="
        --text-5m-font: 'DM Sans', sans-serif;
        --text-5m-weight: 500;
        --text-5m-style: normal;
        --text-5m-size: 20px;
        --text-5m-line-height: 120%;
        --text-5m-letter-spacing: 0;
        display: flex;
        flex-direction: column;
        gap: 24px;
        align-items: center; /* center retry button */
      ">
        <p style="
          font-family: var(--text-5m-font);
          font-weight: var(--text-5m-weight);
          font-style: var(--text-5m-style);
          font-size: var(--text-5m-size);
          line-height: var(--text-5m-line-height);
          letter-spacing: var(--text-5m-letter-spacing);
          text-align: center;
        ">
          We couldn't connect to the server (API error). Please try again in a few moments.
        </p>
        <button type="button" id="retry-btn">Retry</button>
      </div>
    `;

    // Add event listener to retry button
    const retryBtn = document.getElementById('retry-btn');
    retryBtn.addEventListener('click', () => {
        // Optionally remove icon on retry
        removeFontAwesomeIcon();
        location.reload();
    });

    // Add FontAwesome icon centered above h1
    addFontAwesomeIcon();

    // Update h1 text and margin-bottom
    h1El.textContent = "Something went wrong";
    headerEl.style.marginBottom = '24px';
}

// Geolocation and fetch logic
navigator.geolocation.getCurrentPosition(
    (position) => {
        console.log('Geolocation success:', position);

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log(`Using coordinates: ${lat}, ${lon}`);

        fetch(`https://ap.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
            .then(response => {
                console.log('Raw response:', response);
                if (!response.ok) {
                    throw new Error('Server responded with an error.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather data:', data);
                // Normal data handling here
            })
            .catch(error => {
                console.error('Connection error (fetch):', error);
                showApiError();
            });
    },
    (geoError) => {
        console.error('Geolocation error:', geoError);
        showApiError();
    }
);
