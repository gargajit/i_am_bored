import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  // try {
  //   const response = await axios.get("https://bored-api.appbrewery.com/random");
  //   const result = response.data;
  //   res.render("index.ejs", { data: result });
  // } catch (error) {
  //   console.error("Failed to make request:", error.message);
  //   res.render("index.ejs", {
  //     error: error.message,
  //   });
  // }
  res.render("index.ejs");
});

app.post("/", async (req, res) => {
  // console.log(req.body);
  let response;

  try {
    const selectedType = req.body.type;
    const selectedParticipants = req.body.participants;
    if (selectedType === '' && selectedParticipants === '') {
      response = await axios.get("https://bored-api.appbrewery.com/filter");  
    } else if (selectedType !== '' && selectedParticipants === '') {
      response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${selectedType}`);
    } else {
      response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${selectedType}&participants=${selectedParticipants}`);
    }
    const result = response.data;
    
    // const data = result[Math.floor(Math.random() * result.length)];
    // console.log(data);
    
    res.render("index.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    });
    
  
  } catch (error) {
    console.error("Failed to make request: ", error.message);
    res.render("index.ejs", {
      error: "Activities not found for the given filter.",
    });

    // res.status(500).send("Failed to fetch the selected activity. Please try again.");
    
  }

  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
