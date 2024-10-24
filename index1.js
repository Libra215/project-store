require("./Pengaturan/Admin/settings");

const makeWASocket = require("@whiskeysockets/baileys").default;
const {
  default: getAggregateVotesInPollMessage,
  delay,
  PHONENUMBER_MCC,
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  proto,
  Browsers,
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const axios = require("axios");
const FileType = require("file-type");
const PhoneNumber = require("awesome-phonenumber");
const { getProduk } = require("./Pengaturan/function/getpro");
const {
  smsg,
  getBuffer,
  serialize,
  fetchJson,
} = require("./Pengaturan/function/simple");
const fetch = require("node-fetch");

const readline = require("readline");
const chalk = require("chalk");
const NodeCache = require("node-cache");

const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
  writeExif,
} = require("./Pengaturan/function/exif");

const { toBuffer, toDataURL } = require("qrcode");
const express = require("express");
let app = express();
const { createServer } = require("http");
let server = createServer(app);
let _qr = "invalid";
let PORT = process.env.PORT;
const path = require("path");

const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});

global.nomorbot = "6285735200842";

const phoneNumber = global.nomorbot;
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code");
const useMobile = process.argv.includes("--mobile");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function Botstarted() {
  let { version, isLatest } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = await useMultiFileAuthState(`./session`);
  const msgRetryCounterCache = new NodeCache();

  const kris = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !pairingCode,
    browser: ["Mac OS", "chrome", "121.0.6167.159"],
    patchMessageBeforeSending: (message) => {
      const requiresPatch = !!(
        message.buttonsMessage ||
        message.templateMessage ||
        message.listMessage
        );
      if (requiresPatch) {
        message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadataVersion: 2,
                deviceListMetadata: {},
              },
              ...message,
            },
          },
        };
      }
      return message;
    },
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(
        state.keys,
        pino({ level: "fatal" }).child({ level: "fatal" })
        ),
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined,
  });

  if (pairingCode && !kris.authState.creds.registered) {
    if (useMobile) throw new Error("Cannot use pairing code with mobile API");

    let phoneNumberFormatted = phoneNumber.replace(/[^0-9]/g, "");

    if (
      !Object.keys(PHONENUMBER_MCC).some((v) =>
        phoneNumberFormatted.startsWith(v)
        )
      ) {
      console.log(
        chalk.bgBlack(
          chalk.redBright(
            "Start with country code of your WhatsApp Number, Example : +916909137213"
            )
          )
        );
    process.exit(0);
  }

  setTimeout(async () => {
    let code = await kris.requestPairingCode(phoneNumberFormatted);
    code = code?.match(/.{1,4}/g)?.join("-") || code;
    console.log(
      chalk.black(chalk.bgGreen(`Your Pairing Code : `)),
      chalk.black(chalk.white(code))
      );
  }, 3000);
}

async function updateProduk() {
  try {
    const produk = await getProduk(digiuser, digiapi);

    if (produk && produk.length > 0) {
      console.log(produk);

    } else {
      console.log(`Tidak ada produk yang ditemukan atau produk kosong.`);
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat memperbarui produk:", error);
  }
}


setInterval(updateProduk, 300000);
updateProduk();


kris.ev.on("creds.update", saveCreds);
kris.ev.on("messages.upsert", () => {});

kris.ev.on("messages.upsert", async (chatUpdate) => {
    //console.log(JSON.stringify(chatUpdate, undefined, 2))
    try {
      m = chatUpdate.messages[0];
      if (!m.message) return;
      m.message =
      Object.keys(m.message)[0] === "ephemeralMessage"
      ? m.message.ephemeralMessage.message
      : m.message;
      if (m.key && m.key.remoteJid === "status@broadcast") return;
      if (!kris.public && !m.key.fromMe && chatUpdate.type === "notify") return;
      if (m.key.id.startsWith("BAE5") && m.key.id.length === 16) return;
      var msg = m;
      msg = serialize(kris, msg);
      m = smsg(kris, m, store);
      require("./niagabotz")(kris, msg, m, chatUpdate, store);
    } catch (err) {
      console.log(err);
    }
  });
  /*
    setInterval(() => {
        for (let i of Object.values(opengc)) {
            if (Date.now() >= i.time) {
                kris.groupSettingUpdate(i.id, "not_announcement")
                .then((res) =>
                kris.sendMessage(i.id, { text: `Sukses, group telah dibuka` }))
                .catch((err) =>
                kris.sendMessage(i.id, { text: 'Error' }))
                delete opengc[i.id]
                fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
            }
        }
    }, 1000)  
    */  
    

  //   kris.ev.on('group-participants.update', async (anu) => {
  //     const isWelcome = _welcome.includes(anu.id)
  //     const isLeft = _left.includes(anu.id)
  //     try {
  //       let metadata = await kris.groupMetadata(anu.id)
  //       let participants = anu.participants
  //       const groupName = metadata.subject
  //       const groupDesc = metadata.desc
  //       for (let num of participants) {
  //         try {
  //           ppuser = await kris.profilePictureUrl(num, 'image')
  //         } catch {
  //           ppuser = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg'
  //         }

  //         try {
  //           ppgroup = await kris.profilePictureUrl(anu.id, 'image')
  //         } catch {
  //           ppgroup = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg'
  //         }
  //         if (anu.action == 'add' && isWelcome) {
  //           console.log(anu)
  //           if (isSetWelcome(anu.id, set_welcome_db)) {               	
  //             var get_teks_welcome = await getTextSetWelcome(anu.id, set_welcome_db)
  //             var replace_pesan = (get_teks_welcome.replace(/@user/gi, `@${num.split('@')[0]}`))
  //             var full_pesan = (replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc))
  //             kris.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `${full_pesan}` })
  //           } else {
  //             kris.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `Halo @${num.split("@")[0]}, Welcome To ${metadata.subject}` })
  //           }
  //         } else if (anu.action == 'remove' && isLeft) {
  //          console.log(anu)
  //          if (isSetLeft(anu.id, set_left_db)) {            	
  //           var get_teks_left = await getTextSetLeft(anu.id, set_left_db)
  //           var replace_pesan = (get_teks_left.replace(/@user/gi, `@${num.split('@')[0]}`))
  //           var full_pesan = (replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc))
  //           kris.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `${full_pesan}` })
  //         } else {
  //           kris.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `Sayonara @${num.split("@")[0]}` })
  //         }
  //       } else if (anu.action == 'promote') {
  //         kris.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} sekaran menjadi admin grup ${metadata.subject}` })
  //       } else if (anu.action == 'demote') {
  //         kris.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} bukan admin grup ${metadata.subject} lagi` })
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // })


  // kris.ev.on('group-participants.update', async (anu) => {
  //   const isWelcome = _welcome.includes(anu.id);
  //   const isLeft = _left.includes(anu.id);
  //   try {
  //     let metadata = await kris.groupMetadata(anu.id);
  //     let participants = anu.participants;
  //     const groupName = metadata.subject;
  //     const groupDesc = metadata.desc;

  //     for (let num of participants) {
  //       let ppuser;
  //       try {
  //         ppuser = await kris.profilePictureUrl(num, 'image');
  //       } catch {
  //         ppuser = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg'; 
  //       }

  //       let ppgroup;
  //       try {
  //         ppgroup = await kris.profilePictureUrl(anu.id, 'image');
  //       } catch {
  //         ppgroup = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg'; L
  //       }

  //       if (anu.action === 'add' && isWelcome) {
  //         console.log(anu);
  //         if (isSetWelcome(anu.id, set_welcome_db)) {
  //           const get_teks_welcome = await getTextSetWelcome(anu.id, set_welcome_db);
  //           const replace_pesan = get_teks_welcome.replace(/@user/gi, `@${num.split('@')[0]}`);
  //           const full_pesan = replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc);
  //           kris.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `${full_pesan}` });
  //         } else {
  //           kris.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `Halo @${num.split('@')[0]}, Welcome To ${groupName}` });
  //         }
  //       } else if (anu.action === 'remove' && isLeft) {
  //         console.log(anu);
  //         if (isSetLeft(anu.id, set_left_db)) {
  //           const get_teks_left = await getTextSetLeft(anu.id, set_left_db);
  //           const replace_pesan = get_teks_left.replace(/@user/gi, `@${num.split('@')[0]}`);
  //           const full_pesan = replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc);
  //           kris.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `${full_pesan}` });
  //         } else {
  //           kris.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `Sayonara @${num.split('@')[0]}` });
  //         }
  //       } else if (anu.action === 'promote') {
  //         kris.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} sekarang menjadi admin grup ${groupName}` });
  //       } else if (anu.action === 'demote') {
  //         kris.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} bukan admin grup ${groupName} lagi` });
  //       }
  //     }
  //   } catch (err) {
  //     console.log('Error processing group participant update:', err);
  //   }
  // });


  // Setting
  kris.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (
        (decode.user && decode.server && decode.user + "@" + decode.server) ||
        jid
        );
    } else return jid;
  };

  kris.ev.on("contacts.update", (update) => {
    for (let contact of update) {
      let id = kris.decodeJid(contact.id);
      if (store && store.contacts)
        store.contacts[id] = { id, name: contact.notify };
    }
  });

  kris.getName = (jid, withoutContact = false) => {
    id = kris.decodeJid(jid);
    withoutContact = kris.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us"))
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = kris.groupMetadata(id) || {};
        resolve(
          v.name ||
          v.subject ||
          PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber(
            "international"
            )
          );
      });
    else
      v =
    id === "0@s.whatsapp.net"
    ? {
      id,
      name: "WhatsApp",
    }
    : id === kris.decodeJid(kris.user.id)
    ? kris.user
    : store.contacts[id] || {};
    return (
      (withoutContact ? "" : v.name) ||
      v.subject ||
      v.verifiedName ||
      PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
        "international"
        )
      );
  };

  kris.sendContact = async (jid, kon, quoted = "", opts = {}) => {
    let list = [];
    for (let i of kon) {
      list.push({
        displayName: await kris.getName(i + "@s.whatsapp.net"),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await kris.getName(
          i + "@s.whatsapp.net"
          )}\nFN:${await kris.getName(
            i + "@s.whatsapp.net"
            )}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        });
    }
    kris.sendMessage(
      jid,
      {
        contacts: { displayName: `${list.length} Kontak`, contacts: list },
        ...opts,
      },
      { quoted }
      );
  };

  kris.public = true;

  kris.serializeM = (m) => smsg(kris, m, store);

  kris.ev.on("connection.update", ({ connection }) => {
    if (connection === "open") {
      console.log(
        "KONEKSI " + "Terhubung (" + kris.user?.["id"]["split"](":")[0] + ")"
        );
    }
    if (connection === "close") {
      Botstarted();
    }
    if (connection === "connecting") {
      if (kris.user) {
        console.log(
          "KONEKSI " +
          "Menghubungkan Ulang (" +
          kris.user?.["id"]["split"](":")[0] +
          ")"
          );
      } else if (!nomorbot) {
        console.log(
          "CONNECTION " +
          "Autentikasi Dibutuhkan\nGunakan Perintah \x1B[36mnpm start\x1B[0m untuk terhubung menggunakan nomor telepon\n\n\x1B[1m\x1B[41m Full Tutorial Check di Youtube: @KirBotz \x1B[0m\n\n"
          );
      }
    }
  });

  kris.ev.on("creds.update", saveCreds);

  kris.sendText = (jid, text, quoted = "", options) =>
  kris.sendMessage(jid, { text: text, ...options }, { quoted, ...options });

  kris.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
    ? message.mtype.replace(/Message/gi, "")
    : mime.split("/")[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    return buffer;
  };

  kris.downloadAndSaveMediaMessage = async (
    message,
    filename,
    attachExtension = true
    ) => {
    let quoted = message.msg ? message.msg : message;

    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
    ? message.mtype.replace(/Message/gi, "")
    : mime.split("/")[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    trueFileName = attachExtension ? filename + "." + type.ext : filename;
    // save to file
    await fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  };
  kris.sendTextWithMentions = async (jid, text, quoted, options = {}) =>
  kris.sendMessage(
    jid,
    {
      text: text,
      mentions: [...text.matchAll(/@(\d{0,16})/g)].map(
        (v) => v[1] + "@s.whatsapp.net"
        ),
      ...options,
    },
    {
      quoted,
    }
    );

  kris.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path)
    ? path
    : /^data:.*?\/.*?;base64,/i.test(path)
    ? Buffer.from(path.split`,`[1], "base64")
    : /^https?:\/\//.test(path)
    ? await (await fetch(path)).buffer()
    : fs.existsSync(path)
    ? fs.readFileSync(path)
    : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifImg(buff, options);
    } else {
      buffer = await imageToWebp(buff);
    }

    await kris.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      }
      );
    return buffer;
  };

  /**
   *
   * @param {*} jid
   * @param {*} path
   * @param {*} quoted
   * @param {*} options
   * @returns
   */
   kris.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path)
    ? path
    : /^data:.*?\/.*?;base64,/i.test(path)
    ? Buffer.from(path.split`,`[1], "base64")
    : /^https?:\/\//.test(path)
    ? await getBuffer(path)
    : fs.existsSync(path)
    ? fs.readFileSync(path)
    : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifVid(buff, options);
    } else {
      buffer = await videoToWebp(buff);
    }

    await kris.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      }
      );
    return buffer;
  };

  return kris;
}

Botstarted();
