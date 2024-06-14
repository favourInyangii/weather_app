document.getElementById('get-weather').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    const apiKey = '71c3ffba41dddec39565352804ae72a0';  // API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized: Check your API key');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.weather || !data.weather[0]) {
                throw new Error('Invalid weather data');
            }

            const location = data.name;
            const description = data.weather[0].description;
            const temperature = data.main.temp;

            document.getElementById('location').innerText = `Location: ${location}`;
            document.getElementById('description').innerText = `Description: ${description}`;
            document.getElementById('temperature').innerText = `Temperature: ${temperature}°C`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert(`Error: ${error.message}`);
        });
});
