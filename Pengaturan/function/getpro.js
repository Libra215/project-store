const fs = require("fs");
const crypto = require("crypto");
const axios = require("axios");

function getProduk(digiuser, digiapi) {
  let code = "pricelist";

  let hasho = crypto
  .createHash("md5")
  .update(digiuser + digiapi + code)
  .digest("hex");

  var config = {
    method: "POST", // Set the HTTP method to POST
    url: "https://api.digiflazz.com/v1/price-list", // Set the target URL
    data: {
      cmd: "prepaid",
      username: digiuser,
      sign: hasho,
    },
  };

  return axios(config)
  .then(function (response) {
      let data = JSON.stringify(response.data.data, null, 2); // Add formatting to JSON
      // console.log("Sukses mengambil data dari Digiflazz");
      
      // Simpan data ke file
      fs.writeFileSync("./Pengaturan/database/datadigiflaz.json", data);

      // Kembalikan data untuk digunakan di tempat lain
      // return data;
      return data;
    })
  .catch((error) => {
    console.error("Gagal mengambil data dari Digiflazz", error);
    return null;
  });
}

module.exports = { getProduk };
