const express = require("express");
const QRCode = require("qrcode");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/generateQR_CODE", (req, res) => {
    const body = req.body;
    const link = body.link;
    QRCode.toDataURL(`${link}`, function (err, url) {
      const dataURL = url;
      res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>LinkToQR | Generated QR Code</title>
      </head>
      <style>
          html {
              width: 100%;
              height: 100%;
          }
      
          body {
              width: 100%;
              height: 100%;
              text-align: center;
              font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: brown;
              color: white;
          }
      
          input {
              padding: 15px;
              outline: none;
              border: none;
              font-size: 17px;
              font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
              border-radius: 360px;
              width: 15.85em;
          }
      
          button {
              padding: 15px;
              font-size: 16px;
              width: 13em;
              border-radius: 360px;
              border: none;
              outline: none;
              color: white;
              font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              background-color: rgb(0, 0, 0);
          }
      </style>
      <body>
          <h1>LinkToQR</h1>
          <p>Here's the QR code for your link</p>
          <img width="256" height="256" src="${dataURL}" alt="QR Code" title="${link}">
          <br>
          <br>
          <button id="btn">Download QR code</button>
          <script type="text/javascript">
            document.getElementById("btn").onclick = () => {
                const dataURL_frontend = "${dataURL}";
                const download = (dataUrl, filename) => {
                  const link = document.createElement("a");
                  link.href = dataUrl;
                  link.download = filename;
                  link.click();
                };
                download("${dataURL}", "Namish_QRCode.png");
            };
          </script>
      </body>
      </html>
      `);    
    })
})
app.listen(process.env.PORT || 3000);