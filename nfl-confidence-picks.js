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
            const rows = data.trim().split('\n').map(row => row.split(','));

            // Extract headers and game data
            headers = rows[0];  // First row is the headers
            games = rows.slice(1);  // The rest are game data

            console.log("Headers:", headers);
            console.log("Games Data:", games);

            // Populate the week selector dropdown with unique week numbers
            const allWeeks = [...new Set(games.map(game => game[headers.indexOf("Week")]))];
            
            // Log the extracted week numbers
            console.log("Extracted Week Numbers: ", allWeeks);

            populateWeekSelector(allWeeks);

            // Show the first week's games initially
            populateGamesForWeek(Math.min(...allWeeks));
        })
        .catch(error => console.error("Failed to fetch or process data:", error));
}

function populateWeekSelector(weeks) {
    const weekSelector = document.getElementById("weekSelector");

    weeks.forEach(week => {
        const option = document.createElement("option");
        option.value = week;
        option.textContent = `Week ${week}`;
        weekSelector.appendChild(option);
    });

    // Automatically select the first available week by default
    weekSelector.value = Math.min(...weeks);

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
        const weekIndex = headers.indexOf("Week");
        const dayIndex = headers.indexOf("Day");
        const dateIndex = headers.indexOf("Date");
        const visTmIndex = headers.indexOf("VisTm");
        const homeTmIndex = headers.indexOf("HomeTm");
        const timeIndex = headers.indexOf("Time");

        const week = game[weekIndex];
        const day = game[dayIndex];
        const date = game[dateIndex];
        const visTm = game[visTmIndex];
        const homeTm = game[homeTmIndex];
        const time = game[timeIndex] || "TBA";

        // Create a container div for each game
        const div = document.createElement("div");
        div.className = "game";

        // Create and set up the label
        const label = document.createElement("label");
        label.textContent = `Week ${week}: ${visTm} @ ${homeTm} (${day}, ${date} at ${time})`;

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

        // Append elements to the container div
        div.appendChild(label);
        div.appendChild(select);
        div.appendChild(confidenceSelect);

        // Append the container div to the form
        form.appendChild(div);
    });

    // Now, add the event listener to update options after the games are populated
    updateConfidenceOptions(); // Initialize the options once after populating

    document.querySelectorAll('select[name^="confidence"]').forEach(select => {
        select.addEventListener('change', updateConfidenceOptions);
    });
}

// Function to prevent duplicate confidence numbers
function updateConfidenceOptions() {
    const allSelectedValues = Array.from(document.querySelectorAll('select[name^="confidence"]'))
        .map(select => select.value)
        .filter(value => value !== "");

    document.querySelectorAll('select[name^="confidence"]').forEach(select => {
        const currentValue = select.value;

        Array.from(select.options).forEach(option => {
            if (option.value === "" || option.value === currentValue) {
                option.disabled = false;
            } else {
                option.disabled = allSelectedValues.includes(option.value);
            }
        });
    });
}

// Update savePicks function to store picks using the selected week
async function savePicks() {
    const selectedPlayer = document.getElementById('playerSelector').value;
    const selectedWeek = document.getElementById('weekSelector').value; // Get the selected week

    if (!selectedPlayer) {
        alert("Please select a player before saving.");
        return;
    }

    if (!selectedWeek) {
        alert("Please select a week before saving.");
        return;
    }

    // Prepare picks data
    const picks = {
        player: selectedPlayer,
        week: parseInt(selectedWeek), // Use the selected week
        games: []
    };

    document.querySelectorAll('select[name^="game"]').forEach((select, index) => {
        const confidenceSelect = document.querySelector(`select[name="confidence${index}"]`);
        if (select.value && confidenceSelect.value) {
            picks.games.push({
                game: select.name,
                loser: select.value,
                confidence: confidenceSelect.value
            });
        }
    });

    // Send picks to the Cloudflare Worker (backend) for storage
    const response = await fetch('https://solitary-boat-e4cc.jay-finnigan.workers.dev/save-picks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(picks)
    });

    if (response.ok) {
        alert("Your picks have been saved!");
    } else {
        alert("There was an issue saving your picks. Please try again.");
    }
}

// Ensure the fetchSchedule function is called when the page loads
document.addEventListener('DOMContentLoaded', fetchSchedule);
