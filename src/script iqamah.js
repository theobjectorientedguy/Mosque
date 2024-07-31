document.addEventListener('DOMContentLoaded', () => {
    const prayerTimesContainer = document.getElementById('prayer-times');
    const gregorianDate = document.getElementById('gregorian-date');
    const islamicDate = document.getElementById('islamic-date');
    const switchScheduleButton = document.getElementById('switch-schedule');
    
    let showingAdhanTimes = true;

    function fetchPrayerTimes() {
        const url = showingAdhanTimes ? '/api/prayer-times' : '/api/iqamah-times';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched Times Data:', data); // Log data received from server

                // Get today's date and day name
                const today = new Date().getDate(); // Numeric day of the month
                const todayDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }); // Get the current day name
                const currentMonth = now.toLocaleDateString('en-US', { month: 'long' }); // Get the current month
                const currentYear = now.getFullYear(); // Get the current year

                // Find today's times
                const todayTimes = data.find(pt => pt.Date == today && pt.Day.toLowerCase() === todayDay.toLowerCase());

                if (todayTimes) {
                    // Update date display
                    gregorianDate.textContent = `${todayDay} ${today} ${currentMonth}, ${currentYear}`;
                    islamicDate.textContent = showingAdhanTimes ? `Prayer (Adhaan) Time` : `Prayer (Iqamah) Time`;

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
                        if (todayTimes[prayer] > currentTime) {
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
                        button.textContent = todayTimes[prayer]; // Time in AM/PM format

                        const prayerName = document.createElement('p');
                        prayerName.classList.add('text-white', 'm-0', 'text-xl');
                        prayerName.textContent = prayer;

                        prayerDiv.appendChild(img);
                        prayerDiv.appendChild(button);
                        prayerDiv.appendChild(prayerName);

                        prayerTimesContainer.appendChild(prayerDiv);
                    });

                    // Add fade-in effect
                    prayerTimesContainer.classList.remove('fade-out', 'hide');
                    prayerTimesContainer.classList.add('fade-in', 'show');
                } else {
                    prayerTimesContainer.textContent = 'No prayer times available for today.';
                }
            })
            .catch(error => {
                console.error('Error fetching times:', error);
            });
    }

    // Initial fetch
    fetchPrayerTimes();

    // Function to toggle fade effect
    function toggleFadeEffect() {
        const elements = [prayerTimesContainer, gregorianDate, islamicDate];
        elements.forEach(element => {
            element.classList.remove('fade-in', 'show');
            element.classList.add('fade-out');
            setTimeout(() => {
                element.classList.add('hide');
                fetchPrayerTimes();
                setTimeout(() => {
                    element.classList.remove('hide');
                    element.classList.add('fade-in', 'show');
                }, 10); // Short delay to ensure the 'hide' class is removed after fetching new data
            }, 500); // Wait for the fade-out transition to complete before updating content
        });
    }

    // Switch between Adhan and Iqamah times
    switchScheduleButton.addEventListener('click', () => {
        showingAdhanTimes = !showingAdhanTimes;
        toggleFadeEffect();
    });
});
