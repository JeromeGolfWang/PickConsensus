<script>
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

                // Populate the week selector dropdown
                const allWeeks = [...new Set(games.map(game => game[headers.indexOf("Week")]))];
                console.log("All Weeks:", allWeeks);
                populateWeekSelector(allWeeks);

                // Show the current week's games initially
                populateGamesForWeek(getCurrentWeek());
            })
            .catch(error => console.error("Failed to fetch or process data:", error));
    }

    // ... [Keep all other existing functions as they are] ...

    // Update the savePicks function
    async function savePicks() {
    const selectedPlayer = document.getElementById('playerSelector').value;
    const selectedWeek = parseInt(document.getElementById("weekSelector").value);

    if (!selectedPlayer) {
        alert("Please select a player before saving.");
        return;
    }

    const picks = {
        player: selectedPlayer,
        week: selectedWeek,
        games: []
    };

    document.querySelectorAll('select[name^="game"]').forEach((select, index) => {
        const confidenceSelect = document.querySelector(`select[name="confidence${index}"]`);
        if (select.value && confidenceSelect.value) {
            picks.games.push({
                game: select.name,
                loser: select.value,
                confidence: parseInt(confidenceSelect.value)
            });
        }
    });

    // Convert the picks object into a JSON string
    const dataToSend = JSON.stringify(picks);

    try {
        const response = await fetch(`https://soft-lab-bfdb.jay-finnigan.workers.dev/save-picks?player=${selectedPlayer}&week=${selectedWeek}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: dataToSend,
        });

        if (response.ok) {
            alert("Your picks have been saved!");
        } else {
            alert("There was an issue saving your picks. Please try again.");
        }
    } catch (error) {
        console.error("Error saving picks:", error);
        alert("An error occurred. Please try again later.");
    }
}

    // Add a new function to retrieve picks
    async function getPicks(player, week) {
        try {
            const response = await fetch(`https://soft-lab-bfdb.jay-finnigan.workers.dev/get-picks?player=${player}&week=${week}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const picks = await response.json();
            console.log('Retrieved picks:', picks);
            // You can add code here to display the retrieved picks in the UI
        } catch (error) {
            console.error('Error retrieving picks:', error);
            alert('There was an error retrieving the picks. Please try again.');
        }
    }

    // Add an event listener to load picks when a player is selected
    document.getElementById('playerSelector').addEventListener('change', function() {
        const selectedPlayer = this.value;
        const selectedWeek = parseInt(document.getElementById('weekSelector').value);
        if (selectedPlayer) {
            getPicks(selectedPlayer, selectedWeek);
        }
    });

    // Ensure the fetchSchedule function is called when the page loads
    document.addEventListener('DOMContentLoaded', fetchSchedule);
</script>