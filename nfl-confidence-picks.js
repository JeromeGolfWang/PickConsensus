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
    addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    let response;

    if (request.method === 'POST' && url.pathname === '/save-picks') {
        response = await handleSavePicks(request);
    } else if (request.method === 'GET' && url.pathname === '/get-picks') {
        response = await handleGetPicks(request);
    } else {
        response = new Response(JSON.stringify({ error: 'Endpoint not found' }), { 
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return response;
}

async function handleSavePicks(request) {
    const url = new URL(request.url);
    const player = url.searchParams.get('player');
    const week = url.searchParams.get('week');

    if (!player || !week) {
        return new Response(JSON.stringify({ error: 'Missing player or week in URL parameters' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    let data;
    try {
        data = await request.json();  // Expect JSON data
    } catch (e) {
        console.error('Error parsing JSON data:', e);
        return new Response(JSON.stringify({ error: 'Error parsing JSON data', details: e.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const games = data.games;

    if (!Array.isArray(games)) {
        return new Response(JSON.stringify({ error: 'Games data is invalid' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const picks = { player, week: parseInt(week), games };

    // Save picks
    const key = `picks:${player}:${week}`;
    await PICK_KV.put(key, JSON.stringify(picks));

    console.log(`Picks saved successfully for ${player}, week ${week}`);
    return new Response(JSON.stringify({ message: 'Picks saved successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

async function handleGetPicks(request) {
    const url = new URL(request.url);
    const player = url.searchParams.get('player');
    const week = url.searchParams.get('week');

    if (!player || !week) {
        return new Response(JSON.stringify({ error: 'Missing player or week parameter' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const key = `picks:${player}:${week}`;

    try {
        const storedPicks = await PICK_KV.get(key);
        if (storedPicks === null) {
            console.log(`No picks found for player ${player}, week ${week}`);
            return new Response(JSON.stringify({ error: 'No picks found for this player and week' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        console.log(`Retrieved picks for player ${player}, week ${week}`);
        return new Response(storedPicks, {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error(`Failed to retrieve picks for ${player}, week ${week}:`, error);
        return new Response(JSON.stringify({ error: 'Failed to retrieve picks', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
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