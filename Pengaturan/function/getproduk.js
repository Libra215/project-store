const fs = require('fs')
const crypto = require('crypto')
const axios = require('axios')
function getWeb(apiid_smm, apikey_smm) {

  var config = {
    method: "POST", // Set the HTTP method to POST
    url: "https://api.medanpedia.co.id/services", // Set the target URL
    data: {
      "api_id": apiid_smm,
      "api_key":apikey_smm,
    },
  };

  axios(config)
    .then(function (response) {
      let data = JSON.stringify(response.data.data);
       console.log("Sukses");
      // Simpan data ke file
      fs.writeFileSync("./Pengaturan/database/dataweb.json", data);
      let dataup = JSON.parse(fs.readFileSync("./Pengaturan/database/dataweb.json"));
      let updatedData = JSON.stringify(dataup);
      fs.writeFileSync("./Pengaturan/database/dataweb.json", updatedData);
    })

    .catch((error) => {
      console.log("Gagal");
    });
}

module.exports = { getWeb }