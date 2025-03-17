import express from 'express';

const courseGoals = [];

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Learn HTMX</title>
      <link rel="stylesheet" href="/main.css" />
      <script src="/htmx.2.0.4.min.js" defer></script>
    </head>
    <body>
      <main>
        <h1>Manage your course goals</h1>
        <section>
          <form id="goal-form" 
                hx-post="/goals"
                hx-target="#goals"
                hw-swap="beforebegin">
            <div>
              <label htmlFor="goal">Goal</label>
              <input type="text" id="goal" name="goal" />
            </div>
            <button type="submit">Add goal</button>
          </form>
        </section>
        <section>
          <ul id="goals"></ul>
        </section>
      </main>
    </body>
  </html>
  `);
});

app.post('/goals', (req, res) => {
    const formData = req.body;
    const goalText = req.body.goal;
    courseGoals.push(goalText);

    // Since we pushed a new item on the array, then the index is the last item (need to use hx-swap="beforeend")
    //res.send(`<li id="goal-${courseGoals.length - 1}">${goalText}</li>`);

    res.send(`       
        <li id="goal-${courseGoals.length - 1}">
            <span>${goalText}</span>
            <button>Remove</button>
        </li>
    `);

    // List all items (need to use hx-swap="outerHTML")
    /*
    res.send(`
        <ul id="goals">
        ${courseGoals.map(
        (goal, index) => `
        <li id="goal-${index}">
            <span>${goal}</span>
            <button>Remove</button>
        </li>
        `
        )}
        </ul>
    `);
    */
});

app.listen(3000);
