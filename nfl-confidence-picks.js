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

    async function savePicks() {
        console.log("savePicks function called");
        const selectedPlayer = document.getElementById('playerSelector').value;
        const selectedWeek = parseInt(document.getElementById("weekSelector").value);
        console.log(`Selected player: ${selectedPlayer}, Selected week: ${selectedWeek}`);
        
        if (!selectedPlayer) {
            console.log("No player selected");
            alert("Please select a player before saving.");
            return;
        }
        
        const games = [];
        document.querySelectorAll('select[name^="game"]').forEach((select, index) => {
            const confidenceSelect = document.querySelector(`select[name="confidence${index}"]`);
            console.log(`Game ${index}: ${select.value}, Confidence: ${confidenceSelect ? confidenceSelect.value : 'N/A'}`);
            if (select.value && confidenceSelect && confidenceSelect.value) {
                games.push(`${index}:${select.value}:${confidenceSelect.value}`);
            }
        });

        console.log(`Games array:`, games);
        const dataToSend = games.join('|');
        console.log("Data being sent:", dataToSend);

        try {
            console.log("Sending fetch request");
            const response = await fetch(`https://soft-lab-bfdb.jay-finnigan.workers.dev/save-picks?player=${selectedPlayer}&week=${selectedWeek}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: dataToSend
            });
            
            console.log("Fetch response received");
            const responseText = await response.text();
            console.log("Raw response:", responseText);

            if (response.ok) {
                console.log("Picks saved successfully");
                alert("Your picks have been saved!");
            } else {
                console.error("Error saving picks:", responseText);
                alert(`There was an issue saving your picks: ${responseText}`);
            }
        } catch (error) {
            console.error("Error in fetch operation:", error);
            alert("An error occurred. Please try again later.");
        }
    }

    async function getPicks(player, week) {
        try {
            const response = await fetch(`https://soft-lab-bfdb.jay-finnigan.workers.dev/get-picks?player=${player}&week=${week}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const storedData = await response.text();
            console.log('Retrieved picks:', storedData);
            const picks = storedData.split('|').map(entry => {
                const [index, loser, confidence] = entry.split(':');
                return { game: `game${index}`, loser, confidence: parseInt(confidence) };
            });
            console.log('Parsed picks:', picks);
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