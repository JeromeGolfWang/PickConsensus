const TOTAL_WEEKS = 18;
const ALLOWED_ORIGIN = 'https://pickconsensus.pages.dev'; // Replace with your frontend domain

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    let response;

    if (request.method === 'OPTIONS') {
        response = handleOptionsRequest(request);
    } else if (request.method === 'POST' && url.pathname === '/save-picks') {
        response = await handleSavePicks(request);
    } else if (request.method === 'GET' && url.pathname === '/get-picks') {
        response = await handleGetPicks(request);
    } else {
        response = new Response(JSON.stringify({ error: 'Endpoint not found' }), { 
            status: 404,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': ALLOWED_ORIGIN 
            }
        });
    }

    return response;
}

function handleOptionsRequest(request) {
    const headers = {
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };
    return new Response(null, { status: 204, headers });
}

async function handleSavePicks(request) {
    const url = new URL(request.url);
    const player = url.searchParams.get('player');
    const week = parseInt(url.searchParams.get('week'));

    console.log(`Attempting to save picks for player: ${player}, week: ${week}`);

    if (!player || !week || week < 1 || week > TOTAL_WEEKS) {
        console.log('Invalid player or week');
        return new Response('Invalid player or week', {
            status: 400,
            headers: { 
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': ALLOWED_ORIGIN
            }
        });
    }

    try {
        const rawBody = await request.text();
        console.log('Received raw body:', rawBody);
        
        if (!rawBody) {
            console.log('Empty request body');
            return new Response('Empty request body', {
                status: 400,
                headers: { 
                    'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': ALLOWED_ORIGIN
                }
            });
        }

        // Save the raw body directly as a string
        const key = `picks:${player}:${week}`;
        await PICK_KV.put(key, rawBody);
        console.log('Picks saved successfully');

        return new Response('Picks saved successfully', {
            status: 200,
            headers: { 
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': ALLOWED_ORIGIN
            }
        });
    } catch (error) {
        console.error(`Failed to save picks for ${player}, week ${week}:`, error);
        return new Response('Error processing request', {
            status: 500,
            headers: { 
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': ALLOWED_ORIGIN
            }
        });
    }
}

async function handleGetPicks(request) {
    const url = new URL(request.url);
    const player = url.searchParams.get('player');
    const week = parseInt(url.searchParams.get('week'));

    if (!player || !week || week < 1 || week > TOTAL_WEEKS) {
        return new Response('Invalid player or week', {
            status: 400,
            headers: { 
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': ALLOWED_ORIGIN
            }
        });
    }

    const key = `picks:${player}:${week}`;

    try {
        const storedPicks = await PICK_KV.get(key);
        if (storedPicks === null) {
            console.log(`No picks found for player ${player}, week ${week}`);
            return new Response('No picks found for this player and week', {
                status: 404,
                headers: { 
                    'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': ALLOWED_ORIGIN
                }
            });
        }
        console.log(`Retrieved picks for player ${player}, week ${week}`);
        return new Response(storedPicks, {
            status: 200,
            headers: { 
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': ALLOWED_ORIGIN
            }
        });
    } catch (error) {
        console.error(`Failed to retrieve picks for ${player}, week ${week}:`, error);
        return new Response('Failed to retrieve picks', {
            status: 500,
            headers: { 
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': ALLOWED_ORIGIN
            }
        });
    }
}