document.addEventListener("DOMContentLoaded", () => {
  const prayerTimesContainer = document.getElementById("prayer-times");
  const gregorianDate = document.getElementById("gregorian-date");
  const islamicDate = document.getElementById("islamic-date");
  const switchScheduleButton = document.getElementById("switch-schedule");

  let showingAdhanTimes = true;

  function fetchPrayerTimes() {
    const url = showingAdhanTimes ? "/api/prayer-times" : "/api/iqamah-times";
    console.log('Fetching prayer times from URL:', url);

    fetch(url)
      .then((response) => {
        console.log('HTTP Response Status:', response.status); // Debugging line
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Times Data:", data); // Log the data received from server

        const now = new Date();
        const today = now.getDate();
        const todayDay = now.toLocaleDateString("en-US", { weekday: "long" });
        const currentMonth = now.toLocaleDateString("en-US", { month: "long" });
        const currentYear = now.getFullYear();

        console.log("Current Date:", today);
        console.log("Current Day:", todayDay);

        const todayTimes = data.find(
          (pt) =>
            pt.Date == today && pt.Day.toLowerCase() === todayDay.toLowerCase()
        );

        if (todayTimes) {
          gregorianDate.textContent = `${todayDay} ${today} ${currentMonth}, ${currentYear}`;
          islamicDate.textContent = showingAdhanTimes
            ? `Prayer (Adhaan) Time`
            : `Prayer (Iqamah) Time`;

          const prayers = ["Fajr", "Sunrise", "Dhuhr", "Asar", "Maghrib", "Isha"];
          const icons = {
            Fajr: "sunrise@2x.png",
            Sunrise: "sunrise-1@2x.png",
            Dhuhr: "sun@2x.png",
            Asar: "sun-1@2x.png",
            Maghrib: "sunset@2x.png",
            Isha: "moon-and-stars@2x.png",
          };

          prayerTimesContainer.innerHTML = "";

          const currentTime = now.getHours() * 60 + now.getMinutes();
          let nextPrayer = null;

          prayers.forEach((prayer, index) => {
            const [time, period] = todayTimes[prayer].split(" ");
            const [hours, minutes] = time.split(":").map(Number);
            const prayerTime =
              (hours % 12) * 60 + minutes + (period === "PM" ? 720 : 0);

            if (nextPrayer === null && prayerTime > currentTime) {
              nextPrayer = prayer;
            }

            console.log(`Prayer: ${prayer}, Time: ${prayerTime}, Current Time: ${currentTime}`); // Debugging line
          });

          console.log("Next Prayer:", nextPrayer);

          prayers.forEach((prayer) => {
            const prayerDiv = document.createElement("div");
            prayerDiv.classList.add(
              "flex",
              "flex-col",
              "items-center",
              "gap-4",
              "justify-between",
              "p-4",
              "rounded-3xl"
            );
            if (prayer === nextPrayer) {
              prayerDiv.classList.add("border-white", "border-2");
            }

            const img = document.createElement("img");
            img.classList.add("object-contain");
            img.src = `./public/${icons[prayer]}`;
            img.alt = `${prayer} Icon`;
            img.style.width = "40px";
            img.style.height = "40px";

            const button = document.createElement("button");
            button.classList.add(
              "flex",
              "items-center",
              "border-none",
              "bg-white",
              "text-mediumseagreen-300",
              "font-extrabold",
              "py-2",
              "m-o",
              "px-4",
              "rounded-2xl"
            );
            button.style.fontSize = "1.25rem";
            button.textContent = todayTimes[prayer];

            const prayerName = document.createElement("p");
            prayerName.classList.add("text-white", "m-0", "text-xl");
            prayerName.textContent = prayer;

            prayerDiv.appendChild(img);
            prayerDiv.appendChild(button);
            prayerDiv.appendChild(prayerName);

            prayerTimesContainer.appendChild(prayerDiv);
          });

          prayerTimesContainer.classList.remove("fade-out", "hide");
          prayerTimesContainer.classList.add("fade-in", "show");
        } else {
          console.log('No prayer times available for today.'); // Debugging line
          prayerTimesContainer.textContent = "No prayer times available for today.";
        }
      })
      .catch((error) => {
        console.error("Error fetching times:", error);
      });
  }

  fetchPrayerTimes();

  function toggleFadeEffect() {
    const elements = [prayerTimesContainer, gregorianDate, islamicDate];
    elements.forEach((element) => {
      element.classList.remove("fade-in", "show");
      element.classList.add("fade-out");
      setTimeout(() => {
        element.classList.add("hide");
        fetchPrayerTimes();
        setTimeout(() => {
          element.classList.remove("hide");
          element.classList.add("fade-in", "show");
        }, 10);
      }, 500);
    });
  }

  switchScheduleButton.addEventListener("click", () => {
    showingAdhanTimes = !showingAdhanTimes;
    toggleFadeEffect();
  });
});
