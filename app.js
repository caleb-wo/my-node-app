/* Caleb Wolfe, Connor Dedic, Jonathan Swenson, Tyson Christiansen, Haein Lee, Danny Kim */

const http = require('http');
const url = require('url');

// Function to calculate max heart rate and range
function calculateHeartRateRange(age) {
    let maxHeartRate = 220 - age;
    let rateFloor = maxHeartRate * 0.65;
    let rateCeiling = maxHeartRate * 0.85;
    
    return {
        maxHeartRate: maxHeartRate,
        rateFloor: Math.floor(rateFloor),
        rateCeiling: Math.floor(rateCeiling),
    };
}

// Create the server
const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;

  // Serve the HTML form
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <html>
        <body>
          <h1>Heart Rate Calculator</h1>
          <form action="/calculate" method="GET">
            <label for="age">How old are you?</label>
            <input type="number" id="age" name="age" required>
            <input type="submit" value="Calculate">
          </form>
        </body>
      </html>
    `);
  } 
  // Calculate heart rate based on age input
  else if (req.url.startsWith('/calculate')) {
    const age = parseFloat(queryObject.age);

    if (isNaN(age) || age <= 0) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Invalid age provided.\n');
    } else {
      const heartRateData = calculateHeartRateRange(age);

      // Serve results along with the form again
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <html>
          <body>
            <h1>Heart Rate Calculator</h1>
            <p>Max heart rate: ${heartRateData.maxHeartRate}</p>
            <p>Your range to strengthen your heart is between ${heartRateData.rateFloor} and ${heartRateData.rateCeiling}.</p>
            <form action="/calculate" method="GET">
              <label for="age">How old are you?</label>
              <input type="number" id="age" name="age" required>
              <input type="submit" value="Calculate">
            </form>
          </body>
        </html>
      `);
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404 Not Found\n');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
