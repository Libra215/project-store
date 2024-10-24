const chalk = require("chalk");
const fs = require("fs");

global.owner = "6285735200842";
global.newslatter = "Fz-Store";
global.multiowner = ['6285812486745@s.whatsapp.net', '6285735200842@s.whatsapp.net', '6285735115194@s.whatsapp.net'];
global.toko = "PT FZ-STORE INDONESIA";
global.namabot = "Fz-Store";
global.ownername = "Mardok`s";
global.botname = "Fz-STore";
global.telegram = "@rezekibotz";
global.channel = " ";
global.website = " ";
global.server = "Fz-Store H2H";
global.digiuser = "recinag1j3Jo"; //username digi

global.digiapi = "f67ce2ad-a7e6-52fb-81b0-fcb9cc37da9b"; //apikey digi
global.sessionName = "session";
global.nomorKu = "6285735200842@s.whatsapp.net";
global.pajak = `350`;
global.krismenu = { url: "https://telegra.ph/file/170b043e37a629e2d555e.png" };
global.banner = { url: "https://telegra.ph/file/fc1d7e0eb6ee8291a2896.png" };
global.qrisdonate = fs.readFileSync(
  `./Pengaturan/database/deposit/image/fz-qr.jpg`
  );
global.antilink = true;
global.packname = "NIAGAKUY-⚡";
global.author = "Mardok`s";
global.otpapi = " ";
global.domainotp = "https://tokoclaude.com/api";
global.apiotp = " ";
global.mess = {
  daftar:
  "_Untuk Daftar Silahkan Ketik Seperti Di Bawah Ini_\n#daftar username|email",
  admin: "Khusus Admin Grup Wahh",
  botAdmin: "Bot Nya Aja Gak Admin Duh",
  owner: "Anda Siapa Ini Khusus Owner Ku",
  group: "Fitur Untuk Grup Anjay",
  private: "Fitur Cuma Bisa Di Private Chat",
};

//______________________[ INFO UPLEVEL ]_______________________//
global.hargalevel = `Keuntungan UPLEVEL Kamu Akan Mendapatkan Harga Special Dan Yang Pasti Lebih Murah.
Khusus Level Partner Akan Mendapatkan Pelayanan Khsusus Dari Kami.

LIST BIAYA UPLEVEL :
*GOLD : Rp 50.000*
*PLATINUM : Rp 100.000*
*PARTNER : Rp 150.000*
`;

global.idpay = "961";
global.keydepo = "d1df0cb3-dfbf-5fe2-b34e-98de185a8d6c"; //apikey paydisini

global.tokopay = {
  validt: "1800",
  layanan: "QRISREALTIME",
  merchantid: "M231223SSOCE455",
  secretkey: "c785febc76ecf4df71187b0f101051c3ff1a3c892bf72b2456462d5afebfc9dd",
  type_fee: "1",
};
global.paydisini = {
  idpay: "961",
  validt: "300",
  layanan: "11", //jika belum verifaksi ganti jadi 11
  apikey: "997d5f70e07dfea5de2c0a96d57372ac", // apikey paydisini
  type_fee: "1",
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update'${__filename}'`));
  delete require.cache[file];
  require(file);
});
