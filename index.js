import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// __dirname workaround in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//Main route
app.get("/", async (req, res) => {
  const category = req.query.category || "Any";
  try {
    const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}`);
    const joke = response.data;
    console.log(joke);
    res.render("index", { joke, category });
  } catch (error) {
    console.error("Error fetching joke", error.message);
    res.render("index", {
      joke: null,
      category,
      error: "Could not fetch a joke at this time.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
