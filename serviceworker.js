// Version 3
try {
    importScripts('events.js');
} catch (e) {

}
self.addEventListener('fetch', event => {
    console.log(`Fetching ${event.request.url}`);
    const parsedUrl = new URL(event.request.url);

    if (event.request.method == "POST") {
        const clonedRequest = event.request.clone();
        return;
    }

    if (parsedUrl.pathname == '/') {
        return;
    }

    // under /api /api/weather
    if (parsedUrl.pathname.match(/^\/api\/*/)) {
        const object = {
            temp: 56
        }
        const jsonResponse =  new Response(JSON.stringify(object), {
            status: 200,
            statusText: "OK",
            headers: {
                "Content-type": "application/json"
            }
        });
        event.respondWith(jsonResponse);
    }

    // response
    const body = `
        <!doctype html>
        <title> Service Worker HTML generation</title>
        <h1>
            The URL is ${event.request.url}
        </h1>
        <ul>
            <li>Cache ${event.request.cache}</li>
            <li>Credential ${event.request.credential}</li>
            <li>Destination ${event.request.destination}</li>
            <li>Method ${event.request.method}</li>
            <li>Referrer ${event.request.referrer}</li>
        </ul>
    `;
    const response = new Response(body, {
        status: 200,
        statusText: "OK",
        headers: {
            "Content-type": "text/html"
        }
    });
    event.respondWith(response);

    // OTHER WAY TO USE RESPONSE
    // event.respondWith(new Promise( (resolve, reject) => {
    //     fetch("/")
    //     .then(response => {
    //         const clonedResponse = response.clone();
    //         resolve(clonedResponse)
    //     })
    // }));
});