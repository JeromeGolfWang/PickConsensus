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
    async function savePicks() {
    const selectedPlayer = document.getElementById('playerSelector').value;
    const selectedWeek = parseInt(document.getElementById("weekSelector").value);
    if (!selectedPlayer) {
        alert("Please select a player before saving.");
        return;
    }
    const games = [];
    document.querySelectorAll('select[name^="game"]').forEach((select, index) => {
        const confidenceSelect = document.querySelector(`select[name="confidence${index}"]`);
        if (select.value && confidenceSelect.value) {
            games.push({
                game: `game${index}`,
                loser: select.value,
                confidence: parseInt(confidenceSelect.value)
            });
        }
    });

    const dataToSend = JSON.stringify({ games });
    console.log("Data being sent:", dataToSend);

    try {
        const response = await fetch(`https://soft-lab-bfdb.jay-finnigan.workers.dev/save-picks?player=${selectedPlayer}&week=${selectedWeek}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataToSend
        });
        
        const responseText = await response.text();
        console.log("Raw response:", responseText);

        let responseData;
        try {
            responseData = JSON.parse(responseText);
        } catch (error) {
            console.error("Error parsing response JSON:", error);
            alert("Received invalid response from server.");
            return;
        }

        if (response.ok) {
            alert("Your picks have been saved!");
        } else {
            alert(`There was an issue saving your picks: ${responseData.error}`);
        }
        console.log("Server response:", responseData);
    } catch (error) {
        console.error("Error saving picks:", error);
        alert("An error occurred. Please try again later.");
    }
}

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

    document.getElementById('playerSelector').addEventListener('change', function() {
        const selectedPlayer = this.value;
        const selectedWeek = parseInt(document.getElementById('weekSelector').value);
        if (selectedPlayer) {
            getPicks(selectedPlayer, selectedWeek);
        }
    });

    document.addEventListener('DOMContentLoaded', fetchSchedule);
</script>