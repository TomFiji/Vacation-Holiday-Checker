import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://date.nager.at/api/v3/PublicHolidays/2025/"

app.get("/", async(req, res) =>{
    res.render("index.ejs")
});

app.get("/vacation_holidays", async (req, res) => {
    try {
      const response = await axios.get(API_URL + "PL");
      const result = response.data;
      res.render("index.ejs", {content: result});
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
  });



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });