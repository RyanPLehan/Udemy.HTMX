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
          <form 
            id="goal-form" 
            hx-post="/goals" 
            hx-target="#goals"
            hx-swap="beforeend">
            <div>
              <label htmlFor="goal">Goal</label>
              <input type="text" id="goal" name="goal" />
            </div>
            <button type="submit">Add goal</button>
          </form>
        </section>
        <section>
          <ul id="goals" hx-swap="outerHTML">
          ${courseGoals.map(
            (goal) => `
            <li id="goal-${goal.id}">
              <span>${goal.text}</span>
              <button 
                hx-delete="/goals/${goal.id}"
                hx-target="#goal-${goal.id}"                
                >
                Remove
                </button>
            </li>
          `
          ).join('')}
          </ul>
        </section>
      </main>
    </body>
  </html>
  `);
});

app.post('/goals', (req, res) => {
  const goalText = req.body.goal;
  
  // Create unique ID instead of using arrary index 
  const uuid = crypto.randomUUID().toString();
  courseGoals.push({text: goalText, id: uuid});

  res.send(`
    <li id="goal-${uuid}">
      <span>${goalText}</span>
      <button 
        hx-delete="/goals/${uuid}"
        hx-target="#goal-${uuid}"
      >
      Remove
      </button>
    </li>
  `);
});

app.delete('/goals/:id', (req, res) => {
    const uuid = req.params.id;
    // This causes an issue if items are deleted out of order
    const index = courseGoals.findIndex(goal => goal.id == uuid);
    courseGoals.splice(index, 1);
    res.send();
})

app.listen(3000);
