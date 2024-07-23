document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/prayer-times')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Prayer Times Data:', data); // Log data received from server

            const prayerTimesContainer = document.getElementById('prayer-times');
            const gregorianDate = document.getElementById('gregorian-date');
            const islamicDate = document.getElementById('islamic-date');
            
            // Get today's date and day name
            const today = new Date().getDate(); // Numeric day of the month
            const todayDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }); // Get the current day name

            // Find today's prayer times
            const todayPrayerTimes = data.find(pt => pt.Date == today && pt.Day.toLowerCase() === todayDay.toLowerCase());

            if (todayPrayerTimes) {
                // Update date display
                gregorianDate.textContent = `${todayPrayerTimes.Day} ${today}th July, 2024`; // Replace with dynamic date if needed
                islamicDate.textContent = `Prayer(Adhaan) Time`; // Replace with your logic for Islamic date

                // Prayer names and their icons
                const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asar', 'Maghrib', 'Isha'];
                const icons = {
                    Fajr: 'sunrise@2x.png',
                    Sunrise: 'sunrise-1@2x.png',
                    Dhuhr: 'sun@2x.png',
                    Asar: 'sun-1@2x.png',
                    Maghrib: 'sunset@2x.png',
                    Isha: 'moon-and-stars@2x.png'
                };

                // Clear existing content
                prayerTimesContainer.innerHTML = '';

                // Find the next prayer time
                const now = new Date();
                const currentTime = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
                let nextPrayer = null;

                for (const prayer of prayers) {
                    if (todayPrayerTimes[prayer] > currentTime) {
                        nextPrayer = prayer;
                        break;
                    }
                }

                // Create prayer times elements
                prayers.forEach(prayer => {
                    const prayerDiv = document.createElement('div');
                    prayerDiv.classList.add('flex', 'flex-col', 'items-center', 'gap-4', 'justify-between', 'p-4', 'rounded-3xl');
                    if (prayer === nextPrayer) {
                        prayerDiv.classList.add('border-white', 'border-2'); // Highlight border for the next prayer time
                    }

                    const img = document.createElement('img');
                    img.classList.add('object-contain');
                    img.src = `./public/${icons[prayer]}`;
                    img.alt = `${prayer} Icon`;
                    img.style.width = '40px';
                    img.style.height = '40px';

                    const button = document.createElement('button');
                    button.classList.add('flex', 'items-center', 'border-none', 'bg-white', 'text-mediumseagreen-300', 'font-extrabold', 'py-2', 'm-o', 'px-4', 'rounded-2xl');
                    button.style.fontSize = '1.25rem'; // Increase font size for the time
                    button.textContent = todayPrayerTimes[prayer]; // Time in AM/PM format

                    const prayerName = document.createElement('p');
                    prayerName.classList.add('text-white', 'm-0', 'text-xl');
                    prayerName.textContent = prayer;

                    prayerDiv.appendChild(img);
                    prayerDiv.appendChild(button);
                    prayerDiv.appendChild(prayerName);

                    prayerTimesContainer.appendChild(prayerDiv);
                });
            } else {
                prayerTimesContainer.textContent = 'No prayer times available for today.';
            }
        })
        .catch(error => {
            console.error('Error fetching prayer times:', error);
        });
});
