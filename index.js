import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://date.nager.at/api/v3/NextPublicHolidays/"
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

function dateToString(date){
  const new_date = new Date(date);

  const formattedDate = new_date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
    });
  return formattedDate;    
}

function filterByDateRange(jsonArray, dateField, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return jsonArray.filter(item => {
      const itemDate = new Date(item[dateField]);
      return itemDate >= start && itemDate <= end;
  });
}

app.locals.dateToString = dateToString;

app.get("/", async(req, res) =>{
    res.render("index.ejs")
});

app.post("/submit", async (req, res) => {
  const country = req.body.country
  const startDate = req.body.start
  const endDate = req.body.end
    try {
      const response = await axios.get(API_URL + country);
      const result = response.data;
      const filtered = filterByDateRange(result, "date", startDate, endDate);
      console.log(filtered)
      res.render("index.ejs", {content: filtered});
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

