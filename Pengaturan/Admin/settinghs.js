const chalk = require("chalk");
const fs = require("fs");

global.owner = "628581286745";
global.toko = "PT NIAGAKUY INDONESIA";
global.namabot = "NIAGAKUY-STORE";
global.telegram = "@krispediaa";
global.channel = "https://kristopup.my.id/";
global.website = "https://kristopup.my.id/";
global.server = "NIAGAKUY H2H";
global.digiuser = "kobigoDA2zbW";

global.digiapi = "dev-6cbb0-43ce-11ee-8f80-dd5b3b78b44b";
global.sessionName = "session";
global.nomorKu = "6285812486745@s.whatsapp.net";
global.pajak = `350`;
global.krismenu = { url: "https://telegra.ph/file/170b043e37a629e2d555e.png" };
global.banner = { url: "https://telegra.ph/file/170b043e37a629e2d555e.png" };
global.qrisdonate = fs.readFileSync(
  `./Pengaturan/database/deposit/image/qr-code.jpg`
);
global.antilink = true;
global.packname = "NIAGAKUY-⚡";
global.author = "Hamdan";
global.apiotp = " ";
global.mess = {
  daftar:
    "_Untuk Daftar Silahkan Ketik Seperti Di Bawah Ini_\n#daftar username|email",
  admin: "Khusus Admin Grup Wahh",
  botAdmin: "Bot Nya Aja Gak Admin Duh",
  owner: "Ada Siapa Ini Khusus Owner Ku",
  group: "Fitur Untuk Grup Anjay",
  private: "Fitur Cuma Bisa Di Vrivate Chat",
};

global.keydepo = "997d5f70e07dfea5de2c0wqw57372ac";
global.paydisini = {
  validt: "1800",
  layanan: "17",
  apikey: " ",
  type_fee: "1",
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update'${__filename}'`));
  delete require.cache[file];
  require(file);
});
