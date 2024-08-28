// Define the relative path to the CSV file with URL-encoded spaces
const sheetUrl = './NFL%20Schedule%20-%20Sheet1.csv';

function fetchSchedule() {
    fetch(sheetUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(data => {
            // Parse the CSV data into rows and columns
            const rows = data.trim().split('\n').map(row => row.split(','));
            populateGamesFromSheet(rows);
        })
        .catch(error => console.error("Failed to fetch data:", error));
}

function populateGamesFromSheet(rows) {
    const form = document.getElementById("picksForm");
    if (!rows || rows.length === 0) {
        console.error("No data found in sheet.");
        return;
    }

    rows.forEach((row, index) => {
        if (index === 0) return; // Skip header row
        const [week, date, time, awayTeam, homeTeam, location] = row;

        // Create a container div for each game
        const div = document.createElement("div");
        div.className = "game";

        // Create and set up the label
        const label = document.createElement("label");
        label.textContent = `Week ${week}: ${awayTeam} vs ${homeTeam} (${date} at ${time})`;

        // Create and set up the select dropdown for picking the loser
        const select = document.createElement("select");
        select.name = `game${index}`;
        select.required = true;
        select.innerHTML = `
            <option value="">Select Loser</option>
            <option value="${homeTeam}">${homeTeam}</option>
            <option value="${awayTeam}">${awayTeam}</option>
        `;

        // Create and set up the confidence input
        const input = document.createElement("input");
        input.type = "number";
        input.name = `confidence${index}`;
        input.min = 1;
        input.max = rows.length - 1; // Adjust based on the number of games
        input.placeholder = "Confidence";

        // Append elements to the container div
        div.appendChild(label);
        div.appendChild(select);
        div.appendChild(input);

        // Append the container div to the form
        form.appendChild(div);
    });
}

// Call the function to fetch and populate the schedule when the page loads
document.addEventListener('DOMContentLoaded', fetchSchedule);
