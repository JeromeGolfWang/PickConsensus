document.addEventListener('DOMContentLoaded', function () {
    const TOTAL_WEEKS = 18;
    const ALLOWED_ORIGIN = 'https://pickconsensus.pages.dev'; // Your frontend domain
    const apiUrl = 'https://soft-lab-bfdb.jay-finnigan.workers.dev'; // Your Cloudflare Worker endpoint

    // Function to handle saving picks
    async function savePicks() {
        const selectedPlayer = document.getElementById('playerSelector').value;
        const selectedWeek = parseInt(document.getElementById('weekSelector').value);
        if (!selectedPlayer || isNaN(selectedWeek)) {
            alert('Please select a player and a valid week.');
            return;
        }

        // Collect picks from the page
        const games = [];
        document.querySelectorAll('select[name^="game"]').forEach((select, index) => {
            const confidenceSelect = document.querySelector(`select[name="confidence${index}"]`);
            if (select.value && confidenceSelect && confidenceSelect.value) {
                games.push(`${index}:${select.value}:${confidenceSelect.value}`);
            }
        });

        // Prepare data for sending
        const dataToSend = games.join('|');
        console.log(`Sending data for player ${selectedPlayer}, week ${selectedWeek}:`, dataToSend);

        try {
            const response = await fetch(`${apiUrl}/save-picks?player=${selectedPlayer}&week=${selectedWeek}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: dataToSend
            });

            if (response.ok) {
                alert('Your picks have been saved successfully!');
                console.log('Picks saved successfully');
            } else {
                const errorText = await response.text();
                console.error('Error saving picks:', errorText);
                alert(`Error saving picks: ${errorText}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred while saving your picks. Please try again.');
        }
    }

    // Function to handle loading picks
    async function loadPicks(player, week) {
        if (!player || isNaN(week)) {
            alert('Please select a player and a valid week.');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/get-picks?player=${player}&week=${week}`);
            if (response.ok) {
                const storedData = await response.text();
                console.log('Retrieved picks:', storedData);
                // You can add code here to populate the UI with the retrieved picks
            } else {
                console.error('Error retrieving picks:', await response.text());
                alert('No picks found for this player and week.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred while loading the picks. Please try again.');
        }
    }

    // Event listener for the save button
    document.getElementById('saveButton').addEventListener('click', savePicks);

    // Example: Event listener for loading picks when a player or week is selected
    document.getElementById('playerSelector').addEventListener('change', function () {
        const selectedPlayer = this.value;
        const selectedWeek = parseInt(document.getElementById('weekSelector').value);
        loadPicks(selectedPlayer, selectedWeek);
    });

    document.getElementById('weekSelector').addEventListener('change', function () {
        const selectedPlayer = document.getElementById('playerSelector').value;
        const selectedWeek = parseInt(this.value);
        loadPicks(selectedPlayer, selectedWeek);
    });
});