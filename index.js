const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { vipmenu } = require('./src/vipmenu')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const imgbb = require('imgbb-uploader')
const lolis = require('lolis.life')
const loli = new lolis()
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
prefix = '/'
blocked = []

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Hora ${pad(minutes)} Minuto ${pad(seconds)} Segundo`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./BarBar.json') && client.loadAuthInfo('./BarBar.json')
	client.on('connecting', () => {
		start('2', 'Connecting...')
	})
	client.on('open', () => {
		success('2', 'Connected')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./BarBar.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `❜❜𝗢𝗹𝗮́ @${num.split('@')[0]}^-^❜❜\n➵𝗕𝗲𝗺 𝘃𝗶𝗻𝗱𝗼(𝗮) 𝗮𝗼 𝗴𝗿𝘂𝗽𝗼 ${mdata.subject}\n➵𝗗𝗶𝗴𝗶𝘁𝗲 /𝗿𝗲𝗴𝗿𝗮𝘀 𝗽𝗮𝗿𝗮 𝗹𝗲𝗿 𝗮𝘀 𝗿𝗲𝗴𝗿𝗮𝘀 𝗱𝗼 𝗴𝗿𝘂𝗽𝗼 𝗲 𝗻𝗮̃𝗼 𝘀𝗲𝗿 𝗯𝗮𝗻𝗶𝗱𝗼\n➵𝗦𝗲 𝘃𝗼𝗰𝗲 𝗲𝗻𝘁𝗿𝗼𝘂 𝗲𝗺 𝗮𝗹𝗴𝘂𝗺𝗮 𝗥𝗖𝗧 𝗱𝗮 𝗿𝗮𝗶𝗼, 𝗲 𝗻𝗮̃𝗼 𝘀𝗮𝗯𝗲 𝗼 𝗾𝘂𝗲 𝗲́ 𝘂𝗺 "𝗮𝘁𝗮𝗰𝗸", 𝗼𝘂 𝗻𝗮̃𝗼 𝘀𝗮𝗯𝗲 𝗾𝘂𝗮𝗶𝘀 𝘀𝗮̃𝗼 𝗮𝘀 𝗱𝗶𝘃𝗶𝘀𝗼̃𝗲𝘀 𝗱𝗮 𝗿𝗮𝗶𝗼, 𝗲 𝗰𝗼𝗺𝗼 𝘀𝘂𝗯𝗶𝗿 𝗱𝗲 𝗱𝗶𝘃𝗶𝘀𝗮̃𝗼 𝗱𝗶𝗴𝗶𝘁𝗲 /𝗮𝘁𝗮𝗰𝗸\n➵𝗘 𝗽𝗼𝗿 𝘂𝗹𝘁𝗶𝗺𝗼 𝗿𝘀𝗿𝘀, 𝗻𝗮̃𝗼 𝗲𝘀𝗾𝘂𝗲𝗰̧𝗮 𝗱𝗲 𝘂𝘀𝗮𝗿 𝗮 𝘁𝗮𝗴, 𝗱𝗶𝗴𝗶𝘁𝗲 /𝘁𝗮𝗴 \n
𝗘𝘀𝗽𝗲𝗿𝗼 𝗾𝘂𝗲 𝗴𝗼𝘀𝘁𝗲 𝗱𝗼 𝗴𝗿𝘂𝗽𝗼♥️`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `➵𝗧𝗮 𝘃𝗲𝗻𝗱𝗼 𝗲𝘀𝘀𝗲 𝗰𝗮𝗿𝗮 𝗮𝗾𝘂𝗶? @${num.split('@')[0]} 𝗘𝗹𝗲 𝗲́ 𝗺𝗮𝗶𝘀 𝘂𝗺 𝗳𝗿𝗮𝗰𝗼 𝗾𝘂𝗲 𝗻𝗼𝘀 𝗱𝗲𝗶𝘅𝗼𝘂. 𝗦𝗮𝗶𝘂 𝘁𝗮𝗿𝗱𝗲 𝗵𝗲𝗵𝗲🔥 `
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
                        if (!mek.hasNewMessage) return
                        mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = 'Your-Api-Key'
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: '❜❜𝗧𝗼 𝗳𝗮𝘇𝗲𝗻𝗱𝗼, 𝗰𝗮𝗹𝗺𝗮 𝗮𝗲 𝗽𝗼𝗿𝗮 🥵, (𝗦𝗲 𝗮 𝗳𝗶𝗴𝘂𝗿𝗶𝗻𝗵𝗮 𝘀𝗮𝗶𝗿 𝗽𝗮𝗿𝗮𝗱𝗮, 𝘀𝗲𝗻𝘁𝗮 𝗲 𝗰𝗵𝗼𝗿𝗮, 𝗽𝗼𝘀𝘀𝗼 𝗳𝗮𝘇𝗲𝗿 𝗻𝗮𝗱𝗮)❜❜',
				success: '✔️ 𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐨 ✔️',
				error: {
					stick: '❜❜𝗖𝗼𝗺𝗼 𝗾𝘂𝗲𝗿 𝗳𝗮𝘇𝗲𝗿 𝘂𝗺𝗮 𝗳𝗶𝗴𝘂𝗿𝗶𝗻𝗵𝗮 𝗴𝗶𝗳 𝘃𝗶𝗿𝗮𝗿 𝘂𝗺𝗮 𝗳𝗼𝘁𝗼?❜❜',
					Iv: '❌ Link tidak valid ❌'
				},
				only: {
					group: '❜❜𝗖𝗼𝗺𝗮𝗻𝗱𝗼 𝗱𝗶𝘀𝗽𝗼𝗻𝗶𝘃𝗲𝗹 𝘀𝗼𝗺𝗲𝗻𝘁𝗲 𝗲𝗺 𝗴𝗿𝘂𝗽𝗼𝘀!!!❜❜',
					ownerG: '❜❜𝗖𝗼𝗺𝗮𝗻𝗱𝗼 𝗲𝘅𝗰𝗹𝘂𝘀𝗶𝘃𝗼 𝗱𝗼 𝗱𝗼𝗻𝗼 𝗱𝗼 𝗴𝗿𝘂𝗽𝗼❜❜',
					ownerB: '❜❜𝗖𝗼𝗺𝗮𝗻𝗱𝗼𝘀 𝗲𝘅𝗰𝗹𝘂𝘀𝗶𝘃𝗼 𝗱𝗼 𝗴𝗼𝘀𝘁𝗼𝘀𝗼 𝗱𝗼 𝗗𝗼𝗯𝗯𝘆❜❜',
					admin: '❜❜𝗮𝗹𝗮 𝗺𝗲𝗺𝗯𝗿𝗼 𝗰𝗼𝗺𝘂𝗺 𝗾𝘂𝗲𝗿𝗲𝗻𝗱𝗼 𝘂𝘀𝗮𝗿 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 𝗱𝗲 𝗮𝗱𝗲𝗺𝗶𝗿𝗼 𝗞𝗞𝗞𝗞𝗞❜❜',
					Badmin: '❜❜𝗘𝘂 𝗽𝗿𝗲𝗰𝗶𝘀𝗼 𝘀𝗲𝗿 𝘂𝗺𝗮 𝗮𝗱𝗲𝗺𝗶𝗿𝗮 𝗻𝗲́, 𝗻𝗮̃𝗼 𝗳𝗮𝗰̧𝗼 𝗺𝗮𝗴𝗶𝗰𝗮❜❜'
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["12193709818@s.whatsapp.net"] // replace this with your number
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : true
			const isSimi = isGroup ? samih.includes(from) : true
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			switch(command) {
				case 'help':
				case 'menu':
				case 'comandos':
					client.sendMessage(from, help(prefix), text)
					break
				case 'vipmenu':
					client.sendMessage(from, vipmenu(prefix), text)
		 	case 'mute':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					var nomor = mek.participant
					const close = {
					text: `⚠️❗𝗢 𝗮𝗱𝗺 @${nomor.split("@s.whatsapp.net")[0]} 𝗙𝗲𝗰𝗵𝗼𝘂 𝗼 𝗴𝗿𝘂𝗽𝗼, 𝘁𝗮𝗹𝘃𝗲𝘇 𝗶𝗿𝗮́ 𝗱𝗮𝗿 𝘂𝗺 𝗮𝘃𝗶𝘀𝗼 𝗲𝗻𝘁𝗮̃𝗼 𝗽𝗿𝗲𝘀𝘁𝗲𝗺 𝗔𝗧𝗘𝗡𝗖𝗔𝗢❗⚠️`,
					contextInfo: { mentionedJid: [nomor] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, true);
					reply(close)
					break
                case 'unmute':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					open = {
					text: `⚠️❗❛❛𝗢 𝗮𝗱𝗺 @${sender.split("@")[0]} 𝗮𝗯𝗿𝗶𝘂 𝗼 𝗴𝗿𝘂𝗽𝗼, 𝘀𝗲 𝗰𝗼𝗺𝗽𝗼𝗿𝘁𝗲𝗺❛❛❗⚠️`,
					contextInfo: { mentionedJid: [sender] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, false)
					client.sendMessage(from, open, text, {quoted: mek})
					break
				case 'gtts':
					if (args.length < 1) return client.sendMessage(from, '❛❛𝗧𝗲𝘅𝘁𝗼 𝗺𝘂𝗶𝘁𝗼 𝗴𝗿𝗮𝗻𝗱𝗲, 𝗶𝗴𝘂𝗮𝗹 𝗺𝗲𝘂 𝗽@𝘂❛❛', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Textnya mana om', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('❛❛𝗧𝗲𝘅𝘁𝗼 𝗺𝘂𝗶𝘁𝗼 𝗴𝗿𝗮𝗻𝗱𝗲, 𝗶𝗴𝘂𝗮𝗹 𝗺𝗲𝘂 𝗽@𝘂❛❛')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('Gagal om:(')
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
				case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `🌸𝐍𝐎𝐌𝐄 : ${me.name}\n🌸𝐍𝐔𝐌𝐄𝐑𝐎 : @${me.jid.split('@')[0]}\n🌸𝐏𝐑𝐄𝐅𝐈𝐗𝐎 : ${prefix}\n*🌸𝐂𝐎𝐍𝐓𝐀𝐓𝐎𝐒 𝐁𝐋𝐎𝐐𝐔𝐄𝐀𝐃𝐎𝐒 : ${blocked.length}\n🌸𝐁𝐎𝐓 𝐀𝐓𝐈𝐕𝐎 𝐃𝐄𝐒𝐃𝐄  : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				case 'listablock':
					teks = '𝗡𝘂𝗺𝗲𝗿𝗼𝘀 𝗯𝗹𝗼𝗾𝘂𝗲𝗮𝗱𝗼𝘀 𝗱𝗮 𝐍𝐄𝐙𝐙𝐔𝐊𝐎-𝐂𝐇𝐀𝐍⁖ฺ۟̇࣪·֗٬̤⃟🌸:\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
				case 'ocr':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Só uma foto')
					}
					break
				case 'stiker':
				case 'sticker':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❛❛𝗘𝘂 𝗻𝗮̃𝗼 𝗰𝗼𝗻𝘀𝗲𝗴𝘂𝗶 𝗰𝗼𝗻𝘃𝗲𝗿𝘁𝗲𝗿 *${tipe}* 𝗽𝗮𝗿𝗮 𝗳𝗶𝗴𝘂𝗿𝗶𝗻𝗵𝗮, 𝗱𝗲𝘀𝗰𝘂𝗹𝗽𝗲❛❛`)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'Your-ApiKey'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Falha, ocorreu um erro, tente novamente mais tarde.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								client.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
							})
						})
					/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.on('start', function (cmd) {
								console.log('Started :', cmd)
							})
							.on('error', function (err) {
								fs.unlinkSync(media)
								console.log('Error :', err)
							})
							.on('end', function () {
								console.log('Finish')
								fs.unlinkSync(media)
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)*/
					} else {
						reply(`❛❛ 𝗨𝘀𝗲 ${prefix}𝘀𝘁𝗶𝗰𝗸𝗲𝗿 𝗲𝗺 𝗳𝗼𝘁𝗼𝘀, 𝗴𝗶𝗳𝘀, 𝗼𝘂 𝗲𝗺 𝘃𝗶𝗱𝗲𝗼𝘀, 𝗻𝗼 𝗺𝗮𝘅𝗶𝗺𝗼 10 𝘀𝗲𝗴𝘂𝗻𝗱𝗼𝘀 𝗱𝗲 𝗱𝘂𝗿𝗮𝗰̧𝗮̃𝗼❛❛`)
					}
					break
				case 'dobby':
				case 'dono':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/PO5PYYI.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '➵𝗘𝘀𝘀𝗲 𝗲́ 𝗼 𝗱𝗼𝗯𝗯𝘆, 𝗺𝗲𝘂 𝗽𝗮𝗽𝗮𝗶\n➵𝗣𝗿𝗼𝗴𝗿𝗮𝗺𝗮𝗱𝗼𝗿 𝗱𝗮 𝗯𝗼𝘁 𝗼𝘂 𝘀𝗲 𝗽𝗿𝗲𝗳𝗲𝗿𝗶𝗿 "𝗶𝗻𝘁𝗲𝗹𝗶𝗴𝗲̂𝗻𝗰𝗶𝗮 𝗮𝗿𝘁𝗶𝗳𝗶𝗰𝗶𝗮𝗹" 𝗡𝗲𝘇𝘂𝗸𝗸𝗼-𝗖𝗵𝗮𝗻\n➵𝗔𝗱𝗲𝗺𝗶𝗿𝗼 𝗱𝗮 𝗳𝗰𝗰 ᬊ͜͡𝑹𝑨ϟ𝑶℘\n➵𝗖𝗮𝘀𝗼 𝗾𝘂𝗲𝗶𝗿𝗮 𝗽𝗲𝗿𝗴𝘂𝗻𝘁𝗮𝗿 𝗮𝗹𝗴𝘂𝗺𝗮 𝗰𝗼𝗶𝘀𝗮 𝗽𝗮𝗿𝗮 𝗲𝗹𝗲 𝘀𝗼𝗯𝗿𝗲 𝗼 𝗯𝗼𝘁:wa.me/5519997908058\n➵𝗦𝗲 𝘃𝗼𝗰𝗲̂ 𝗾𝘂𝗶𝘀𝗲𝗿 𝗲𝘅𝗲𝗰𝘂𝗹𝘁𝗮𝗿 𝘂𝗺𝗮 𝗴𝗶𝘁 𝗷𝗮 𝗽𝗿𝗼𝗻𝘁𝗮, 𝗳𝗲𝗶𝘁𝗮 𝗲𝗺 𝗷𝘀 𝗽𝗮𝗿𝗮 𝗸𝗮𝗹𝗶 𝗹𝗶𝗻𝘂𝘅 𝗱𝗶𝗴𝗶𝘁𝗲 /𝗯𝗼𝘁 𝗽𝗮𝗿𝗮 𝘃𝗲𝗿 𝗮 𝗹𝗶𝘀𝘁𝗮 𝗱𝗲 𝗱𝗲𝗽𝗲𝗻𝗱𝗲̂𝗻𝗰𝗶𝗮𝘀 𝗯𝗮𝘀𝗶𝗰𝗮𝘀 𝗽𝗮𝗿𝗮 𝗼 𝘀𝗲𝘂 𝘁𝗲𝗿𝗺𝗶𝗻𝗮𝗹, 𝗲 𝗼𝘀 𝗰𝗼𝗺𝗮𝗻𝗱𝗼𝘀 𝗱𝗲 𝗶𝗻𝘀𝘁𝗮𝗹𝗮𝗰̧𝗮̃𝗼'})
					break
				case 'salada':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/aFJDAN3.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '╠═══〘𝐒4𝐋𝐀𝐃𝐀〙\n║\n║➣𝐀𝐃𝐌 𝐒𝐔𝐏𝐑𝐄𝐌𝐎 𝐃𝐎 𝐓𝐈𝐒𝐔 : 𝐒4𝐋𝐀𝐃𝐀   \n║\n║➣𝐂𝐀𝐍𝐀𝐋:https://www.youtube.com/channel/UCm3nyU3EHF1PNMCN3XCjTTw\n║\n║\n║➣𝐈𝐍𝐒𝐓𝐀:https://www.instagram.com/saladax.ff/\n║\n╠═══════════'})
					break
				case 'kelzin':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/o9rUAOk.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🌹ீ͜ৡৢ͜͡𝑲𝜩͢𝑳𝒁𝑰𝑵⃟ 𝜣͢𝑺𝑯𖤐᭄\n🌹𝐀𝐝𝐦 𝐝𝐚 𝐅𝐂𝐂 ᬊ͜͡𝑹𝑨ϟ𝑶℘⚡\n🌹𝐂𝐚𝐧𝐚𝐥:https://youtube.com/channel/UCqu8zleVeNCZb_4xtr136eA\n🌹𝐈𝐧𝐬𝐭𝐚:\nhttps://instagram.com/kelzin_osh?igshid=srtrmmwwh0vj'})
					break
				case 'gisu':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/5p15lDl.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🌹𝐆𝐢𝐬𝐮\n🌹𝐀𝐝𝐦 𝐝𝐚 𝐅𝐂𝐂 ᬊ͜͡𝑹𝑨ϟ𝑶℘⚡\n🌹𝐂𝐚𝐧𝐚𝐥:\nhttps://youtube.com/channel/UCuNeRD2CaRxpMs3Ugki9vIg\n🌹𝐈𝐧𝐬𝐭𝐚: off'})
					break
				case 'lipe':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/IGA7lz9.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🌹𝑳𝒊𝒑𝒆\n🌹𝐀𝐝𝐦 𝐝𝐚 𝐅𝐂𝐂 ᬊ͜͡𝑹𝑨ϟ𝑶℘⚡\n🌹𝐂𝐚𝐧𝐚𝐥:https://youtube.com/channel/UCm1O9GThMhcCPqimUuLjsyQ\n🌹𝐈𝐧𝐬𝐭𝐚:off'})
					break
				case 'kirito':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://imgur.com/VuICDTD.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🌹𝑲𝑰𝑹𝑰𝑻𝑶ッ\n🌹𝐀𝐝𝐦 𝐒𝐮𝐩𝐫𝐞𝐦𝐨 𝐝𝐚 𝐅𝐂𝐂 ᬊ͜͡𝑹𝑨ϟ𝑶℘⚡\n🌹𝐂𝐚𝐧𝐚𝐥:\nhttps://youtube.com/c/lele007%E3%83%83\n🌹𝐈𝐧𝐬𝐭𝐚:off'})
					break
				case 'ytpremium':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/fqE0TGs.png`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '➵𝗦𝗶𝗴𝗮 𝗼 𝗽𝗮𝘀𝘀𝗼 𝗮 𝗽𝗮𝘀𝘀𝗼 𝗽𝗮𝗿𝗮 𝗼𝗯𝘁𝗲𝗿 𝗼 𝗬𝗼𝘂𝗧𝘂𝗯𝗲 𝗣𝗿𝗲𝗺𝗶𝘂𝗺:\n\n\n➵𝗕𝗮𝗶𝘅𝗲 𝗲 𝗶𝗻𝘀𝘁𝗮𝗹𝗲 𝗼𝘀 𝘀𝗲𝗴𝘂𝗶𝗻𝘁𝗲𝘀 𝗮𝗽𝗽𝘀 𝗲𝗺 𝘀𝗲𝘂 𝗱𝗶𝘀𝗽𝗼𝘀𝗶𝘁𝗶𝘃𝗼:\n➣𝐕𝐚𝐧𝐜𝐞𝐝 𝐌𝐢𝐜𝐫𝐨𝐆🐊\nhttps://www.mediafire.com/file/qfr8ufmybswyz39/Vanced_microG.apk/file\n➵𝗔𝗴𝗼𝗿𝗮 𝗲́ 𝘀𝗼 𝗯𝗮𝗶𝘅𝗮𝗿 𝗼 𝗬𝗧 𝗱𝗲𝘀𝗲𝗷𝗮𝗱𝗼:\n\n➵ 𝗬𝗼𝘂𝗧𝘂𝗯𝗲 𝗣𝗿𝗲𝗺𝗶𝘂𝗺 𝘁𝗲𝗺𝗮 𝗯𝗹𝗮𝗰𝗸:\nhttps://www.mediafire.com/file/ourocauwy1hc3v1/YouTube_Black.apk/file\n➵𝗬𝗼𝘂𝗧𝘂𝗯𝗲 𝗣𝗿𝗲𝗺𝗶𝘂𝗺 𝗧𝗲𝗺𝗮 𝗕𝗿𝗮𝗻𝗰𝗼:\nhttps://www.mediafire.com/file/x98arvls146n5i5/YouTube_Premium_15.43.32.apk/file\n➵𝗔𝗴𝗼𝗿𝗮 𝗲́ 𝘀𝗼́ 𝗹𝗼𝗴𝗮𝗿 𝘀𝘂𝗮 𝗰𝗼𝗻𝘁𝗮 𝗲 𝗮𝘀𝘀𝗶𝘀𝘁𝗶𝗿 𝘀𝗲𝘂 𝗟𝘂𝗰𝗮𝘀 𝗡𝗲𝘁𝘁𝗼 😘\n\n\n➣𝗕𝘆 𝐷𝑂𝐵𝐵𝑌♱᭄ 👻'})
					break
				case 'white':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/dfbgScB.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🔥͜⏤͟͞𝐖𝚮I𝚻Ξ ᎷΘᗪ𝛧 ✓ⵢ❄️\n🌹𝐀𝐝𝐦 𝐝𝐚 𝐅𝐂𝐂 ᬊ͜͡𝑹𝑨ϟ𝑶⚡\n🌹𝐂𝐚𝐧𝐚𝐥:\nhttps://youtube.com/channel/UCp7A8aBaGcm1LUc-fDRZQtw\n🌹𝐈𝐧𝐬𝐭𝐚:\nhttps://instagram.com/alsportsgames?igshid=1l5mik7xv0da6'})
					break
				case 'tisu':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/hmjQDL3.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '⚡𝐓𝐢𝐬𝐮 𝐝𝐞𝐥 𝐙𝐚𝐩 ϟ\n🌹𝐃𝐨𝐧𝐨 𝐝𝐚 𝐅𝐂𝐂 ᬊ͜͡𝑹𝑨ϟ𝑶⚡\n🌹𝐀𝐝𝐦 𝐒𝐮𝐩𝐫𝐞𝐦𝐨 𝐝𝐚 ᬊ͜͡𝑹𝑨ϟ𝑶℘⚡\n🌹𝐂𝐚𝐧𝐚𝐥:\nhttps://youtube.com/channel/UC7JdGFqRraNbKLCv5UTWtVA\n🌹𝐈𝐧𝐬𝐭𝐚:\nhttps://instagram.com/tisuzz?igshid=175cmdn23fk6c'})
					break
				case 'grupo':
				case 'grupos':
					reply('⚡𝐆𝐫𝐮𝐩𝐨𝐬 𝐝𝐞 𝐑𝐞𝐜𝐫𝐮𝐭𝐚𝐦𝐞𝐧𝐭𝐨 𝐝𝐚 𝐅𝐂𝐂 𝐑𝐚𝐢𝐨⚡\n\nᬊ͜͡𝑹𝑨ϟ𝑶℘𝙍𝘾𝙏 𝟏📴⚡\nhttps://chat.whatsapp.com/GMPh8UlLsHz3GFa5av852c\n\nᬊ͜͡𝑹𝑨ϟ𝑶℘𝙍𝘾𝙏 𝟐📴⚡\nhttps://chat.whatsapp.com/FFzcWBC71JN2etrY5bDzbd\n\nᬊ͜͡𝑹𝑨ϟ𝑶℘𝙍𝘾𝙏 𝟑📴⚡\nhttps://chat.whatsapp.com/DLQIGjbVIWSBrMCo5mO3f8\n\nᬊ͜͡𝑹𝑨ϟ𝑶℘𝙍𝘾𝙏 𝟒📴⚡\nhttps://chat.whatsapp.com/F5Fm8b45Hw7GAWKMy2Jn18\n\nᬊ͜͡𝑹𝑨ϟ𝑶℘𝙍𝘾𝙏 𝟓📴⚡\nhttps://chat.whatsapp.com/FY6E4Pzw4ohGkhG1e6eesu\n\nᬊ͜͡𝑹𝑨ϟ𝑶℘𝙍𝘾𝙏 𝟔📴⚡\nhttps://chat.whatsapp.com/JC7BsF8JGRCBdtsQWiGkLV\n\nᬊ͜͡𝑹𝑨ϟ𝑶℘𝙍𝘾𝙏 𝟕📴⚡\nhttps://chat.whatsapp.com/IXYHWYRzvZl3kmGyyBSWE7\n\n⚡𝐆𝐫𝐮𝐩𝐨𝐬 𝐝𝐨 𝐓𝐢𝐬𝐮⚡\n𝐃𝐞𝐧𝐮́𝐧𝐜𝐢𝐚𝐬 𝐠𝐞𝐫𝐚𝐢𝐬 🆘:\nhttps://chat.whatsapp.com/EDq2ekTWnbi5I1CqPiYiLp\n\n𝐃𝐢𝐯𝐮𝐥𝐠𝐚𝐜̧𝐚̃𝐨 𝐠𝐞𝐫𝐚𝐥✅\nhttps://chat.whatsapp.com/FEJ68aMBB2QLjsKwnj7w5Y\n\n𝐁𝐚𝐭𝐞-𝐏𝐚𝐩𝐨🔊:\nhttps://chat.whatsapp.com/KfsvBzPeAn16MM9s5uiAnW\n\n🦄𝐌𝐞𝐦𝐞𝐬 𝐞 𝐟𝐢𝐠𝐮𝐫𝐢𝐧𝐡𝐚𝐬⚡:\nhttps://chat.whatsapp.com/C9q9q99SxrcCfq6Q6qPDEd\n\n🦄𝐌𝐞𝐦𝐞𝐬 𝐞 𝐟𝐢𝐠𝐮𝐫𝐢𝐧𝐡𝐚𝐬 2⚡:\nhttps://chat.whatsapp.com/J7x8NF5lL6t8fNOuxPJKOq\n\n🧪𝐋𝐚𝐛𝐨𝐫𝐚𝐭𝐨́𝐫𝐢𝐨 1⚡:\nhttps://chat.whatsapp.com/BwsobuaYuTU2031uQQ0HOp\n\n🧪𝐋𝐚𝐛𝐨𝐫𝐚𝐭𝐨́𝐫𝐢𝐨 2⚡:\nhttps://chat.whatsapp.com/DYnO1NequRS6sdTl6UzJMs\n\n🧪𝐋𝐚𝐛𝐨𝐫𝐚𝐭𝐨́𝐫𝐢𝐨 3⚡:\nhttps://chat.whatsapp.com/HOkhvaI8qZoLAmEne9GdNF\n\n🧪𝐋𝐚𝐛𝐨𝐫𝐚𝐭𝐨́𝐫𝐢𝐨 4⚡:\nhttps://chat.whatsapp.com/ED5xjahgiBOLF6yjTJVhDi\n\n🧪𝐋𝐚𝐛𝐨𝐫𝐚𝐭𝐨́𝐫𝐢𝐨 5⚡:\nhttps://chat.whatsapp.com/J9ciz7gyKUtGcB9n5y82Oi\n\n🧪𝐋𝐚𝐛𝐨𝐫𝐚𝐭𝐨́𝐫𝐢𝐨 6⚡\nhttps://chat.whatsapp.com/LofoiZhKRrWCRP6BCohs6z\n\n🧪𝐋𝐚𝐛𝐨𝐫𝐚𝐭𝐨́𝐫𝐢𝐨 7⚡\nhttps://chat.whatsapp.com/JsqbtoXmDri3k5yf0DQvN4\n\n⚡𝐆𝐑𝐔𝐏𝐎 𝐓𝐄𝐋𝐄𝐆𝐑𝐀𝐌⚡\nhttps://t.me/joinchat/HJfuhU8Q-OsYAKYE\n\n⚡𝐒𝐄𝐑𝐕𝐈𝐃𝐎𝐑 𝐃𝐈𝐒𝐂𝐎𝐑𝐃⚡\nhttps://discord.com/invite/pB2kupg8u6')
		 		break
				case 'belle2':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://4.bp.blogspot.com/-pBwX3-rdXeM/XwTW_9oT_9I/AAAAAAAAPt4/_jmeK-lOJMoE4gPYvhgFqzOp-uKnNN9ygCLcBGAsYHQ/s1600/boabronha_2.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '❛❛𝗢𝗹𝗵𝗮 𝗶𝘀𝘀𝗼 𝗺𝗮𝗻 🤤❛❛'})
					break
				case 'bot':
			     	memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/dPUVFF6.png`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🔗𝗗𝗲𝗽𝗲𝗻𝗱𝗲̂𝗻𝗰𝗶𝗮𝘀 𝗯𝗮𝘀𝗶𝗰𝗮𝘀 𝗲 𝗶𝗻𝘀𝘁𝗮𝗹𝗮𝗰̧𝗮̃𝗼 𝗽𝗮𝗿𝗮 𝗲𝘅𝗲𝗰𝘂𝗹𝘁𝗮𝗿 𝘀𝘂𝗮 𝘀𝗰𝗿𝗶𝗽𝘁 𝗱𝗼 𝗯𝗼𝘁 𝗻𝗼 𝘁𝗲𝗿𝗺𝘂𝘅🔗:\n\n🔗$𝘁𝗲𝗿𝗺𝘂𝘅-𝘀𝗲𝘁𝘂𝗽-𝘀𝘁𝗼𝗿𝗮𝗴𝗲\n🔗$𝗽𝗸𝗴 𝘂𝗽𝗴𝗿𝗮𝗱𝗲 && 𝗽𝗸𝗴 𝘂𝗽𝗱𝗮𝘁𝗲\n🔗$𝗽𝗸𝗴 𝗶𝗻𝘀𝘁𝗮𝗹𝗹 𝗴𝗶𝘁\n🔗$𝗽𝗸𝗴 𝗶𝗻𝘀𝘁𝗮𝗹𝗹 𝘄𝗴𝗲𝘁\n🔗$𝗽𝗸𝗴 𝗶𝗻𝘀𝘁𝗮𝗹𝗹 𝗹𝗶𝗯𝘄𝗲𝗯\n🔗$𝗽𝗸𝗴 𝗶𝗻𝘀𝘁𝗮𝗹𝗹  𝗳𝗳𝗺𝗽𝗲𝗴\n🔗$𝗽𝗸𝗴 𝗶𝗻𝘀𝘁𝗮𝗹𝗹 𝗻𝗼𝗱𝗲𝗷𝘀\n🔗$𝗴𝗶𝘁 𝗰𝗹𝗼𝗻𝗲 (𝗴𝗶𝘁 𝗰𝗼𝗺 𝗼 𝘀𝗰𝗿𝗶𝗽𝘁)\n🔗$𝗰𝗱 (𝗻𝗼𝗺𝗲 𝗱𝗼 𝗿𝗲𝗽𝗼𝘀𝗶𝘁𝗼́𝗿𝗶𝗼)\n🔗$𝗯𝗮𝘀𝗵 𝗶𝗻𝘀𝘁𝗮𝗹𝗹.𝘀𝗵\n🔗$(𝗻𝗽𝗺 𝘀𝘁𝗮𝗿𝘁) 𝗼𝘂 (𝗻𝗼𝗱𝗲 𝗶𝗻𝗱𝗲𝘅.𝗷𝘀) 𝗽𝗮𝗿𝗮 𝗴𝗲𝗿𝗮𝗿 𝘀𝗲𝘂 𝗤𝗥𝗖𝗢𝗗𝗘 𝗲 𝗲𝘀𝗰𝗮𝗻𝗲𝗮𝗿 𝗼 𝗰𝗼́𝗱𝗶𝗴𝗼\n\n\n➣𝗕𝘆 𝐷𝑂𝐵𝐵𝑌♱᭄ 👻'})
					break
				case 'regras':
					reply('❗𝗥𝗘𝗚𝗥𝗔𝗦 𝗗𝗢 𝗚𝗥𝗨𝗣𝗢❗:\n\n\n➣• 𝗦𝗲𝗺 𝗧𝗿𝗮𝘃𝗮𝘀❌\n➣•𝗦𝗲𝗺 𝗙𝗹𝗼𝗼𝗱/𝗦𝗽𝗮𝗺❌\n➣•𝗦𝗲𝗺 𝗪𝗮.𝗺𝗲 𝗲 𝗻𝘂𝗺𝗲𝗿𝗼𝘀❌\n➣•𝗗𝗲𝘀𝗿𝗲𝘀𝗽𝗲𝗶𝘁𝗼 𝗲𝗺 𝗴𝗲𝗿𝗮𝗹❌\n➣•𝗦𝗲𝗺 𝗱𝗶𝘃𝘂𝗹𝗴𝗮𝗰̧𝗮̃𝗼❌\n➣•𝗦𝗲𝗺 𝗰𝗼𝗻𝘁𝗲𝘂𝗱𝗼𝘀 𝗽𝗼𝗿𝗻𝗼𝗴𝗿𝗮𝗳𝗶𝗰𝗼𝘀, 𝗴𝗼𝗿𝗲 𝗲 𝗰𝗽❌\n➣•𝗠𝗲𝗺𝗯𝗿𝗼𝘀 𝗱𝗮𝘀 𝗿𝗰𝘁𝘀 𝗼𝘂 𝗾𝘂𝗮𝗹𝗾𝘂𝗲𝗿 𝗴𝗿𝘂𝗽𝗼 𝗱𝗲 𝗮𝘁𝗮𝗾𝘂𝗲 𝘀𝗲𝗺 𝘁𝗮𝗴❌\n➣•𝗡𝗔𝗢 𝗜𝗥 𝗡𝗢 𝗣𝗩 𝗗𝗢𝗦 𝗔𝗗𝗠𝗦 𝗣𝗔𝗥𝗔 𝗣𝗘𝗗𝗜𝗥 𝗧𝗥𝗔𝗩𝗔𝗦❌\n\n❗𝗥𝗘𝗚𝗥𝗔𝗦 𝗗𝗔 𝗕𝗢𝗧 𝗡𝗘𝗭𝗭𝗨𝗞𝗢❗\n➣•𝗡𝗮̃𝗼 𝗳𝗹𝗼𝗱𝗮𝗿 𝗮 𝗯𝗼𝘁❌\n➣•𝗡𝗮̃𝗼 𝗲𝗻𝘃𝗶𝗮𝗿 𝘁𝗿𝗮𝘃𝗮𝘀 𝗽𝗮𝗿𝗮 𝗮 𝗯𝗼𝘁❌\n➣•𝗨𝘀𝗮𝗿 𝗼 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 /𝗮𝗱𝗺𝗶𝗻𝘀, 𝘀𝗼𝗺𝗲𝗻𝘁𝗲 𝗾𝘂𝗮𝗻𝗱𝗼 𝗼 𝗴𝗿𝘂𝗽𝗼 𝗲𝘀𝘁𝗶𝘃𝗲𝗿 𝗲𝗺 𝗮𝘁𝗮𝗾𝘂𝗲, 𝗰𝗮𝘀𝗼 𝗰𝗼𝗻𝘁𝗿𝗮𝗿𝗶𝗼, 𝗲𝘀𝘁𝗮𝗿𝗮 𝘀𝘂𝗷𝗲𝗶𝘁𝗼 𝗮 𝗯𝗮𝗻\n➣•𝗡𝗮̃𝗼 𝗳𝗮𝗰̧𝗮 𝗹𝗶𝗴𝗮𝗰̧𝗼̃𝗲𝘀 𝗽𝗮𝗿𝗮 𝗮 𝗯𝗼𝘁 ❌\n➣•𝗦𝗲 𝗮 𝗯𝗼𝘁 𝗻𝗮̃𝗼 𝗿𝗲𝘀𝗽𝗼𝗻𝗱𝗲𝗿 𝗲𝗹𝗮 𝗽𝗿𝗼𝘃𝗮𝘃𝗲𝗹𝗺𝗲𝗻𝘁𝗲 𝗲𝘀𝘁𝗮́ 𝗼𝗳𝗳 𝗼𝘂 𝗰𝗼𝗺 𝗱𝗲𝗹𝗮𝘆, 𝗲𝗻𝘁𝗮̃𝗼 𝗻𝗮̃𝗼 𝗲𝗻𝘀𝗶𝘀𝘁𝗮 𝗲𝗺 𝗳𝗹𝗼𝗼𝗱𝗮𝗿 𝗼 𝗰𝗼𝗺𝗮𝗻𝗱𝗼\n➣•𝗖𝗮𝘀𝗼 𝗲𝗹𝗮 𝗻𝗮̃𝗼 𝗿𝗲𝘀𝗽𝗼𝗻𝗱𝗮 𝗼 𝘀𝗲𝘂 𝗰𝗼𝗺𝗮𝗻𝗱𝗼, 𝗺𝗮𝗻𝗱𝗲 𝗮𝗽𝗲𝗻𝗮𝘀 2 𝘃𝗲𝘇𝗲𝘀, 𝗲𝘀𝘀𝗲 𝗲́ 𝗼 𝗻𝘂𝗺𝗲𝗿𝗼 𝗺𝗮𝘅𝗶𝗺𝗼, 𝗰𝗮𝘀𝗼 𝗰𝗼𝗻𝘁𝗿𝗮𝗿𝗶𝗼, 𝘀𝗲𝗿𝗮́ 𝗰𝗼𝗻𝘀𝗶𝗱𝗲𝗿𝗮𝗱𝗼 𝗰𝗼𝗺𝗼 𝗳𝗹𝗼𝗼𝗱\n\n\n⚡𝗘𝘃𝗶𝘁𝗲 𝗱𝗲𝘀𝗰𝘂𝗺𝗽𝗿𝗶𝗿 𝗮𝘀 𝗿𝗲𝗴𝗿𝗮𝘀 𝗽𝗮𝗿𝗮 𝗻𝗮̃𝗼 𝘀𝗲𝗿 𝗯𝗮𝗻𝗶𝗱𝗼(𝗮) <3⚡\n~𝐶𝑎𝑠𝑜 𝑠𝑒𝑗𝑎 𝑏𝑎𝑛𝑖𝑑𝑜 𝑒 𝑎𝑐ℎ𝑎 𝑞𝑢𝑒 𝑜 𝑏𝑎𝑛 𝑛𝑎̃𝑜 𝑓𝑜𝑖 𝑗𝑢𝑠𝑡𝑜, 𝑟𝑒𝑐𝑜𝑟𝑟𝑎 𝑛𝑜 𝑝𝑣 𝑑𝑜 𝑎𝑑𝑚 𝑞𝑢𝑒 𝑡𝑒 𝑎𝑝𝑙𝑖𝑐𝑜𝑢 𝑜 𝑏𝑎𝑛.')
		 		break
				case 'imune':
				case 'imunes':
					reply('🌹𝐌𝐞𝐥𝐡𝐨𝐫𝐞𝐬 𝐢𝐦𝐮𝐧𝐞𝐬 𝐝𝐚 𝐚𝐭𝐮𝐚𝐥𝐢𝐝𝐚𝐝𝐞🌹\n⚡𝐓𝐢𝐬𝐮𝐕1:\n🌹https://youtu.be/XTFiom_tBaU\n\n⚡𝐓𝐢𝐬𝐮𝐕2:\nhttps://youtu.be/wx568PBGh2w\n🌹𝐑𝐚𝐢𝐨 𝐏𝐫𝐢𝐯𝐚𝐭𝐞:\nhttps://youtu.be/Rdk7B8zq1JM\n\n🌹𝐂𝐨𝐦𝐨 𝐩𝐚𝐬𝐬𝐚𝐫 𝐩𝐞𝐥𝐨 𝐞𝐧𝐜𝐮𝐫𝐭𝐚𝐝𝐨𝐫🌹:\nhttps://youtu.be/QH7FMSnIWK0\n\n🌹𝐂𝐨𝐦𝐨 𝐢𝐧𝐬𝐭𝐚𝐥𝐚𝐫 𝐰𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐢𝐦𝐮𝐧𝐞 𝐬𝐞𝐦 𝐞𝐫𝐫𝐨𝐬✅\nhttps://youtu.be/ooR9k1DxOtI\n\n🌹𝐂𝐨𝐦𝐨 𝐢𝐧𝐬𝐭𝐚𝐥𝐚𝐫 𝐓𝐑𝐀𝐕𝐀𝐒 𝐧𝐨 𝐬𝐞𝐮 𝐙𝐚𝐩 (𝐃𝐚𝐭𝐚𝐁𝐚𝐬𝐞)🌹\nhttps://youtu.be/mhNVP4QivmU')
		 		break
				case 'belle3':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://1.bp.blogspot.com/-3K_b14RzHTA/XwTW7SQTPRI/AAAAAAAAPtY/UOaKURECbzwXfvASa3g6Pz0D_Ha73Dw4wCLcBGAsYHQ/s1600/boabronha_10.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'olha isso mano, pqp 🤤 '})
					break
				case 'loli1':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/iphQUGi.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'hmm, então quer ver loli?'})
					break
				case 'hentai':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/8U9GwX4.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '...'})
					break
				case 'belle':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZu6GwgURUgkuWZXOq-KPLRvA5LOezhvY_VQ&usqp=CAU`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🤭'})
					break
				case 'belle1':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ7ot6RZPnXSJFFKVjPoeXHjTYyi6uk5W_mA&usqp=CAU`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🤭'})
					break
				case 'mia':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaKeXU5ryvFTNz6nJm9cioGCoeqlZQSh1Mgw&usqp=CAU`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🤭'})
					break
				case 'canal':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://imgur.com/gallery/xuTCBPO`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '️*canal do dark:*\n\n https://bit.ly/3omUNCg'})
					break
				case 'mia1':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjVCGkGDxARumfloekQMCazM8uvpj2AgW2lg&usqp=CAU`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '👀️'})
					break
				case 'mia2':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.gifer.com/7udO.gif`)
					client.sendMessage(from, buffer, video, {quoted: mek, caption: 'use o .sticker para ver o gif da mia️'})
					break
				case 'memeindo':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://imgur.com/${memein.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break
				case 'prefixo':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`❛❛𝗣𝗮𝗽𝗮𝗶, 𝗺𝗲𝘂 𝗻𝗼𝘃𝗼 𝗽𝗿𝗲𝗳𝗶𝘅𝗼 𝗮𝗴𝗼𝗿𝗮 𝗲́ ${prefix}❛❛`)
					break
				case 'hilih':
					if (args.length < 1) return reply('Cadê o texto, hum?')
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/hilih?teks=${body.slice(7)}`, {method: 'get'})
					reply(anu.result)
					break
				case 'yt2mp3':
					if (args.length < 1) return reply('Cadê o url, hum?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/yta?url=${args[0]}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Filesize* : ${anu.filesize}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
					break
				case 'ytsearch':
					if (args.length < 1) return reply('O que você está procurando? pau?')
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/ytsearch?q=${body.slice(10)}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = '=================\n'
					for (let i of anu.result) {
						teks += `*Title* : ${i.title}\n*Id* : ${i.id}\n*Published* : ${i.publishTime}\n*Duration* : ${i.duration}\n*Views* : ${h2k(i.views)}\n=================\n`
					}
					reply(teks.trim())
					break
				case 'tiktok':
					if (args.length < 1) return reply('Onde está o url, hum?')
					if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/tiktok?url=${args[0]}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {quoted: mek})
					break
				case 'tiktokstalk':
					try {
						if (args.length < 1) return client.sendMessage(from, '❗𝐂𝐚𝐝𝐞̂ 𝐨 𝐧𝐨𝐦𝐞 𝐝𝐨 𝐮𝐬𝐮𝐚𝐫𝐢𝐨?❗', text, {quoted: mek})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `📍𝐈𝐃 : ${user.id}\n📍𝐍𝐨𝐦𝐞 : ${user.uniqueId}\n📍𝐔𝐬𝐮𝐚𝐫𝐢𝐨 : ${user.nickname}\n📍𝐒𝐞𝐠𝐮𝐢𝐝𝐨𝐫𝐞𝐬 : ${stats.followerCount}\n📍𝐒𝐞𝐠𝐮𝐢𝐧𝐝𝐨 : ${stats.followingCount}\n📍𝐍° 𝐝𝐞 𝐕𝐢𝐝𝐞𝐨𝐬 : ${stats.videoCount}`
						buffer = await getBuffer(user.avatarLarger)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Possível nome de usuário inválido')
					}
					break
				case 'nulis':
				case 'tulis':
					if (args.length < 1) return reply('O que você quer escrever??')
					teks = body.slice(7)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/nulis?text=${teks}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					break
				case 'url2img':
					tipelist = ['desktop','tablet','mobile']
					if (args.length < 1) return reply('Que tipo é??')
					if (!tipelist.includes(args[0])) return reply('Tipe desktop|tablet|mobile')
					if (args.length < 2) return reply('Cadê o url, hum?')
					if (!isUrl(args[1])) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/url2image?tipe=${args[0]}&url=${args[1]}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, image, {quoted: mek})
					break
				case 'tstiker':
				case 'tsticker':
					if (args.length < 1) return reply('Cadê o texto, hum?')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = body.slice(9).trim()
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/text2image?text=${teks}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						client.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break
				case 'chamada':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '⚡❗❗「𝗔𝗧𝗘𝗡𝗖𝗔𝗢 𝗠𝗘𝗠𝗕𝗥𝗢𝗦」❗❗⚡\n\n'
					for (let mem of groupMembers) {
						teks += `➵❛❛@${mem.jid.split('@')[0]}❜❜\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
                case 'chamada2':
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➣ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					reply(teks)
					break
                 case 'chamada3':
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➣ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, teks, text, {detectLinks: false, quoted: mek})
					break
case 'limparchat':
					if (!isOwner) return reply(mess.only.ownerB)
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('❛❛𝐷𝑂𝐵𝐵𝑌♱᭄ 𝗺𝗲𝘂𝘀 𝗰𝗵𝗮𝘁𝘀 𝗱𝗲 𝗰𝗼𝗻𝘃𝗲𝗿𝘀𝗮 𝗳𝗼𝗿𝗮𝗺 𝗹𝗶𝗺𝗽𝗼𝘀 𝗰𝗼𝗺 𝘀𝘂𝗰𝗲𝘀𝘀𝗼❛❛')
					break
				case 'tagth':
					reply('ᬊ͜͡𝑻𝑯𝑼𝑵𝑫𝑬𝑹ϟ Seu Nome⚡')
		 		break
				case 'atack':
				case 'infoatack':
				case 'ataque':
					reply('➵𝗢 𝗾𝘂𝗲 𝗲́ 𝘂𝗺 𝗮𝘁𝗮𝗾𝘂𝗲?\n📍Ataques são compostos por fases,\n1-Escolher o alvo\n2-Marcar ataque no grupo\n3-iniciar ataque\n4-Esperar até algum adm abrir o grupo e mandar sua print.\n\n➵𝗘𝗺 𝗾𝘂𝗲 𝗵𝗼𝗿𝗮𝗿𝗶𝗼𝘀 𝗼𝘀 𝗮𝘁𝗮𝗾𝘂𝗲𝘀 𝗮𝗰𝗼𝗻𝘁𝗲𝗰𝗲𝗺?\n📍Geralmente são feitos a tarde, com duração de 1h.\n\n➵𝗤𝘂𝗲𝗺 𝘀𝗮̃𝗼 𝗼𝘀 𝗮𝗹𝘃𝗼𝘀 𝗱𝗼𝘀 𝗮𝘁𝗮𝗾𝘂𝗲𝘀?\n📍São contatos denunciados no nosso grupo de denuncias virtuais, caso queira entrar e fazer sua denuncia, dígite /grupos\n\n➵𝗖𝗼𝗺𝗼 𝗼𝗰𝗼𝗿𝗿𝗲𝗺 𝗼𝘀 𝗮𝘁𝗮𝗾𝘂𝗲𝘀?\n📍O atack se iniciara na hora marcada pelo adm no titulo do grupo, TODAS as divisões da ᬊ͜͡𝑹𝑨ϟ𝑶℘⚡ terão seus grupos fechados, e o adm irá colocar o alvo para os membros rajarem com travas.\n\n➵𝗤𝘂𝗮𝗶𝘀 𝘁𝗿𝗮𝘃𝗮𝘀 𝗲𝘂 𝗱𝗲𝘃𝗼 𝗿𝗮𝗷𝗮𝗿?\n📍A trava mais recomendavel é a trava contato, uma das travas mais fortes da atualidade.\n\n➵𝗤𝘂𝗮𝗶𝘀 𝗼𝘀 𝗿𝗲𝗾𝘂𝗶𝘀𝗶𝘁𝗼𝘀 𝗽𝗮𝗿𝗮 𝗺𝗶𝗺 𝘀𝘂𝗯𝗶𝗿 𝗱𝗲 𝗱𝗶𝘃𝗶𝘀𝗮̃𝗼 𝗻𝗮 𝗿𝗮𝗶𝗼?\n📍A raio é dividida em 3 divisões no momento, são elas:\⚡Recrutas=Nenhum requisito\n⚡Raio Oficial=Estar em alguma recruta, rajar no mínimo 6k de travas, estar com a tag.\n⚡The Thunder(Elite)=Estar na Raio Oficial, rajar no mínimo 10k de travas, estar com a tag.\n\n➵𝗖𝗼𝗺𝗼 𝗳𝘂𝗻𝗰𝗶𝗼𝗻𝗮 𝗮 𝘀𝗲𝗹𝗲𝘁𝗶𝘃𝗮 𝗽𝗮𝗿𝗮 𝘀𝘂𝗯𝗶𝗿 𝗱𝗲 𝗱𝗶𝘃𝗶𝘀𝗮̃𝗼 𝗻𝗮 𝗿𝗮𝗶𝗼?\n📍As seletivas não são feitas em todos os ataques, então se você quer subir, participe de todos, no fim de um ataque, o adm irá colocar "❗PRINTS AGORA❗ no titulo do grupo, e você irá mandar print do seu contador, ou das mensagens selecionadas, ou das mensagens apagadas na barra de notificacão, e depois de 30min o adm irá mudar o nome do grupo para ❗SELETIVA AGORA❗ e se sua print for marcada com um "." Parabéns, você subiu de divisão. ')
		 		break
				case 'tag':
					reply('ᬊ͜͡𝑹𝑨ϟ𝑶℘seu nome⚡')
		 		break
				case 'ts':
					if (!isOwner) return reply('⚡𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐱𝐜𝐥𝐮𝐬𝐢𝐯𝐨 𝐝𝐨 𝐚𝐝𝐦 𝐷𝑂𝐵𝐵𝑌♱᭄ 🤭')
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `[ ISSO E UMA TRANSMISSÃO ]\n\n${body.slice(4)}`})
						}
						reply('Transmissão enviada com sucesso')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ ISSO E UMA TRANSMISSÃO ]\n\n${body.slice(4)}`)
						}
						reply('Transmissão enviada com sucesso')
					}
					break
        case 'promover':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Promovido⚡\n'
					 for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(from, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`❛❛𝗢 @${mentioned[0].split('@')[0]} 𝗮𝗴𝗼𝗿𝗮 𝗲́ 𝘂𝗺 𝗮𝗱𝗲𝗺𝗶𝗿𝗼❛❛`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
				case 'rebaixar':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Rebaixado com sucesso\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`❛❛𝗢 @${mentioned[0].split('@')[0]} 𝗳𝗼𝗶 𝗿𝗲𝗯𝗮𝗶𝘅𝗮𝗱𝗼 𝗮 𝗺𝗲𝗺𝗯𝗿𝗼 𝗰𝗼𝗺𝘂𝗺 𝗞𝗞𝗞𝗞❛❛`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'add':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('❛❛𝗤𝘂𝗲𝗺 𝘃𝗼𝗰𝗲̂ 𝗱𝗲𝘀𝗲𝗷𝗮 𝗮𝗱𝗶𝗰𝗶𝗼𝗻𝗮𝗿?❛❛')
					if (args[0].startsWith('08')) return reply('Use o código do país amigo')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('❛❛𝗡𝗮̃𝗼 𝗰𝗼𝗻𝘀𝗲𝗴𝘂𝗶 𝗮𝗱𝗶𝗰𝗶𝗼𝗻𝗮𝗿 𝗲𝘀𝘀𝗲 𝗯𝗶𝘅𝗼, 𝘁𝗮𝗹𝘃𝗲𝘇 𝘀𝗲𝗷𝗮 𝗽𝗿𝗶𝘃𝗮𝗱𝗼❛❛')
					}
					break
				case 'banir':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('❛❛𝗤𝘂𝗲𝗺 𝘃𝗼𝗰𝗲̂ 𝗱𝗲𝘀𝗲𝗷𝗮 𝗯𝗮𝗻𝗶𝗿?❛❛')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = '❛❛𝗢 \n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n 𝗳𝗼𝗶 𝗿𝗲𝗺𝗼𝘃𝗶𝗱𝗼 𝗰𝗼𝗺 𝘀𝘂𝗰𝗲𝘀𝘀𝗼❛❛`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`❛❛𝗢 @${mentioned[0].split('@')[0]} 𝗳𝗼𝗶 𝗿𝗲𝗺𝗼𝘃𝗶𝗱𝗼 𝗰𝗼𝗺 𝘀𝘂𝗰𝗲𝘀𝘀𝗼❛❛`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				case 'admins':
					if (!isGroup) return reply(mess.only.group)
					teks = `❗❗𝗔𝗖𝗢𝗥𝗗𝗔 𝗔𝗗𝗠 𝗧𝗔𝗢 𝗧𝗥𝗔𝗩𝗔𝗡𝗗𝗢 𝗢 𝗚𝗥𝗨𝗣𝗢:${groupMetadata.subject}❗❗\n𝗧𝗢𝗧𝗔𝗟 𝗗𝗘 𝗔𝗗𝗠 : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
                                case 'linkgrupo':
                                        if (!isGroup) return reply(mess.only.group)
                                        if (!isGroupAdmins) return reply(mess.only.admin)
                                        if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                                        linkgc = await client.groupInviteCode(from)
                                        reply('https://chat.whatsapp.com/'+linkgc)
                                        break
                                case 'autoban':
                                        if (!isGroup) return reply(mess.only.group)
                                        if (isGroupAdmins || isOwner) {
                                            client.groupLeave(from)
                                        } else {
                                            reply(mess.only.admin)
                                        }
                                        break
				case 'imagem':
					if (!isQuotedSticker) return reply('❛❛𝗘 𝗻𝗲𝗰𝗲𝘀𝘀𝗮́𝗿𝗶𝗼 𝗺𝗮𝗿𝗰𝗮𝗿 𝗮𝗹𝗴𝘂𝗺𝗮 𝗳𝗶𝗴𝘂𝗿𝗶𝗻𝗵𝗮❛❛')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❛❛𝗡𝗮̃𝗼 𝗰𝗼𝗻𝘀𝗲𝗴𝘂𝗶 𝘁𝗿𝗮𝗻𝘀𝗳𝗼𝗿𝗺𝗮𝗿 𝗮 𝗳𝗶𝗴𝘂𝗿𝗶𝗻𝗵𝗮 𝗲𝗺 𝗶𝗺𝗮𝗴𝗲𝗺, 𝘁𝗮𝗹𝘃𝗲𝘇 𝗲𝗹𝗮 𝘀𝗲𝗷𝗮 𝘂𝗺𝗮 𝗳𝗶𝗴𝘂𝗿𝗶𝗻𝗵𝗮 𝗴𝗶𝗳❛❛')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '🌹'})
						fs.unlinkSync(ran)
					})
					break
				case 'simih':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isSimi) return reply('O modo Simi está ativado')
						samih.push(from)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('⚡Modo simi ativado com sucesso neste grupo⚡')
					} else if (Number(args[0]) === 0) {
						samih.splice(from, 1)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('⚡Modo simi desativado com sucesso nesse grupo⚡')
					} else {
						reply('1 para ativar, 0 para desativar, lerdão você em 🤦')
					}
					break
				case 'bemvindo':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('❛❛𝗝𝗮́ 𝗮𝘁𝗶𝘃𝗼❛❛')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❛❛𝗠𝗲𝗻𝘀𝗮𝗴𝗲𝗻𝘀 𝗱𝗲 𝗯𝗼𝗮𝘀 𝘃𝗶𝗻𝗱𝗮𝘀 𝗮𝘁𝗶𝘃𝗮𝗱𝗮𝘀, 𝗮𝗴𝗼𝗿𝗮 𝘃𝗼𝘂 𝗮𝗽𝗿𝗲𝘀𝗲𝗻𝘁𝗮𝗿 𝗼 𝗴𝗿𝘂𝗽𝗼 𝗽𝗮𝗿𝗮 𝗺𝗲𝗺𝗯𝗿𝗼𝘀 𝗻𝗼𝘃𝗼𝘀^-^❛❛')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❛❛𝗠𝗲𝗻𝘀𝗮𝗴𝗲𝗻𝘀 𝗱𝗲 𝗯𝗼𝗮𝘀 𝘃𝗶𝗻𝗱𝗮𝘀 𝗱𝗲𝘀𝗮𝘁𝗶𝘃𝗮𝗱𝗮𝘀, 𝗮𝗴𝗼𝗿𝗮 𝗻𝗮̃𝗼 𝘃𝗼𝘂 𝗺𝗮𝗶𝘀 𝗮𝗽𝗿𝗲𝘀𝗲𝗻𝘁𝗮𝗿 𝗼 𝗴𝗿𝘂𝗽𝗼 𝗽𝗮𝗿𝗮 𝗺𝗲𝗺𝗯𝗿𝗼𝘀 𝗻𝗼𝘃𝗼𝘀 :(❛❛')
					} else {
						reply('❗𝐃𝐢𝐠𝐢𝐭𝐞 1 𝐩𝐚𝐫𝐚 𝐚𝐭𝐢𝐯𝐚𝐫 𝐞 0 𝐩𝐚𝐫𝐚 𝐝𝐞𝐬𝐚𝐭𝐢𝐯𝐚𝐫❗')
					}
                                      break
				case 'clone':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('A tag alvo que você deseja clonar')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('falhou')
					}
					break
				case 'wait':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('❗𝐂𝐚𝐝𝐞̂ 𝐚 𝐟𝐨𝐭𝐨?❗')
					}
					break
				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[ERROR]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
