// Define the relative path to the CSV file with URL-encoded spaces
const sheetUrl = './NFL Schedule - Sheet1.csv';

function fetchSchedule() {
    fetch(sheetUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const rows = data.trim().split('\n').map(row => row.split(','));
            if (rows.length > 1) {
                populateGamesFromSheet(rows);
            } else {
                throw new Error("No game data found in the CSV file.");
            }
        })
        .catch(error => {
            console.error("Failed to fetch or process data:", error);
            document.getElementById("picksForm").innerHTML = `<p>Error loading game data. Please try again later.</p>`;
        });
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

        // Create and set up the confidence dropdown
        const confidenceSelect = document.createElement("select");
        confidenceSelect.name = `confidence${index}`;
        confidenceSelect.required = true;
        for (let i = 1; i <= rows.length - 1; i++) {
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

function submitPicks() {
    const form = document.getElementById("picksForm");
    const formData = new FormData(form);
    
    // Process the form data
    for (let [name, value] of formData.entries()) {
        console.log(name, value);
    }
    
    // Show confirmation
    document.getElementById("confirmation").classList.remove("hidden");
    
    // You can add more logic here to save the picks or send them to a server
}

// Call the function to fetch and populate the schedule when the page loads
document.addEventListener('DOMContentLoaded', fetchSchedule);
