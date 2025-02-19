const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());



function createResponse(data, errorCode = 0, text = "Success") {
  return {
    data,
    errorCode,
    text,
  };
}



app.post("/lefu/wifi/register", (req, res) => {
   console.log("register req body",req.body)

  res.status(200).json(
    createResponse(
      {
        now: Date.now(),
        unit: 0,
      },
      0,
      "Register success"
    )
  );
});



app.get("/lefu/wifi/config", (req, res) => {
    console.log("config queried params",req.query);

    try {
        const configData = {
            // wifiSSID: "TU_CORP",
            // wifiPassword: "ArcherC25@",
            deviceName: "Health Scale c24"
            // firmwareUpdateURL: "http://10.11.10.109:3000/lefu/wifi/updateFirmware"
        };

        res.status(200).json(createResponse(configData, 0, "Configuration retrieved successfully"));
    } catch (error) {
        console.error("Error fetching configuration:", error.message);

        res.status(500).json(createResponse(null, 5001, "Failed to retrieve configuration"));
    }
});

  

app.post("/lefu/wifi/record", (req, res) => {

   console.log("Weight Record Received:", req.body);

  res.status(200).json(
    createResponse(
      {
        now: Date.now(),
      },
      0,
      "Record received successfully"
    )
  );
});



app.use((req, res) => {
  res.status(404).json(
    createResponse(null, 4040, "Endpoint not found")
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
