import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


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
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
