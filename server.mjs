import http from 'http';

const PORT = 3001;

const server = http.createServer((req, res) => {
    const cookieString = 'session_token=authenticated_user_123; Max-Age=3600; HttpOnly; SameSite=Strict';
    const existingCookie = req.headers.cookie;

    res.setHeader('Set-Cookie', cookieString);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>SameSite=Strict in Node.js</title>
        </head>
        <body>
            <h1>Session Cookie Set with SameSite=Strict</h1>
            
            <p><strong>Set-Cookie header sent:</strong> <code>${cookieString}</code></p>
            
            <h2>Cookie Behavior (Same-Site)</h2>
            <p>If you reload this page, your browser WILL send the cookie to the server:</p>
            
            <p>Cookie received in current request: <strong>${existingCookie || 'No cookie sent yet (first visit).'}</strong></p>
            
            <h3>CSRF Protection:</h3>
            <p>Due to <code>SameSite=Strict</code>, if an external site (e.g., <code>attacker.com</code>) tried to load this URL or submit a form to this server, the browser would **NOT** attach the <code>session_token</code> cookie, thwarting the CSRF attack.</p>
        </body>
        </html>
    `);
});

server.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server.');
});
