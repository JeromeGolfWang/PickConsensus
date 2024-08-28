let games = [];
let headers = [];

// Define the sheet URL
const sheetUrl = './NFL Schedule - Sheet1.csv'; // Replace with your actual CSV file URL

// Fetch the CSV file and process it
function fetchSchedule() {
    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            // Split the CSV text into rows and columns
            const rows = data.trim().split('\n').map(row => row.split(',').map(cell => cell.trim()));

            // Extract headers and game data
            headers = rows[0];  // First row is the headers
            games = rows.slice(1);  // The rest are game data

            // Log headers and games for debugging
            console.log("Headers:", headers);
            console.log("Games Data:", games);

            // Populate the week selector dropdown
            const allWeeks = [...new Set(games.map(game => parseInt(game[headers.indexOf("Week")])))]
                            .filter(week => !isNaN(week)); // Ensure week is a valid number
            console.log("All Weeks:", allWeeks);
            populateWeekSelector(allWeeks);
            
            // Show the first week's games initially
            populateGamesForWeek(allWeeks[0]);
        })
        .catch(error => console.error("Failed to fetch or process data:", error));
}

// Populate the week selector dropdown
function populateWeekSelector(weeks) {
    const weekSelector = document.createElement("select");
    weekSelector.id = "weekSelector";
    document.body.prepend(weekSelector); // Add it to the top of the body

    weeks.forEach(week => {
        const option = document.createElement("option");
        option.value = week;
        option.textContent = `Week ${week}`;
        weekSelector.appendChild(option);
    });

    // Automatically select the first week
    weekSelector.value = weeks[0];

    weekSelector.addEventListener("change", function() {
        const selectedWeek = parseInt(weekSelector.value);
        populateGamesForWeek(selectedWeek);
    });
}

// Populate games based on the selected week
function populateGamesForWeek(selectedWeek) {
    const form = document.getElementById("picksForm");
    form.innerHTML = ''; // Clear previous games

    const currentWeekGames = games.filter(game => parseInt(game[headers.indexOf("Week")]) === selectedWeek);
    currentWeekGames.forEach((game, index) => {
        const dayIndex = headers.indexOf("Day");
        const dateIndex = headers.indexOf("Date");
        const visTmIndex = headers.indexOf("VisTm");
        const homeTmIndex = headers.indexOf("HomeTm");
        const timeIndex = headers.indexOf("Time");

        const day = game[dayIndex];
        const date = game[dateIndex];
        const visTm = game[visTmIndex];
        const homeTm = game[homeTmIndex];
        const time = game[timeIndex] || "TBA";

        // Debugging: Log each game's details
        console.log(`Week: ${selectedWeek}, Day: ${day}, Date: ${date}, Visitor: ${visTm}, Home: ${homeTm}, Time: ${time}`);

        // Create a container div for each game
        const div = document.createElement("div");
        div.className = "game";

        // Create and set up the label
        const label = document.createElement("label");
        label.textContent = `Week ${selectedWeek}: ${visTm} @ ${homeTm} (${day}, ${date} at ${time})`;

        // Create and set up the select dropdown for picking the loser
        const select = document.createElement("select");
        select.name = `game${index}`;
        select.required = true;
        select.innerHTML = `
            <option value="">Select Loser</option>
            <option value="${homeTm}">${homeTm}</option>
            <option value="${visTm}">${visTm}</option>
        `;

        // Create and set up the confidence dropdown with the correct range
        const confidenceSelect = document.createElement("select");
        confidenceSelect.name = `confidence${index}`;
        confidenceSelect.required = true;
        for (let i = 1; i <= currentWeekGames.length; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.text = i;
            confidenceSelect.appendChild(option);
        }

        // Disable the selected confidence score in other dropdowns
        confidenceSelect.addEventListener('change', () => {
            const selectedValue = confidenceSelect.value;
            const allConfidenceSelects = document.querySelectorAll('select[name^="confidence"]');

            allConfidenceSelects.forEach(selectElement => {
                [...selectElement.options].forEach(option => {
                    option.disabled = option.value !== "" && option.value === selectedValue;
                });
            });
        });

        // Append elements to the container div
        div.appendChild(label);
        div.appendChild(select);
        div.appendChild(confidenceSelect);

        // Append the container div to the form
        form.appendChild(div);
    });
}

// Ensure the fetchSchedule function is called when the page loads
document.addEventListener('DOMContentLoaded', fetchSchedule);
