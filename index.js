const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { help1 } = require('./src/help1')
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
				teks = `      ^^^Olá @${num.split('@')[0]}^^^\n🌹bem vindo ao grupo:\n${mdata.subject}\n🧸 Leia as regras e use a tag para nao ser removido ♥️\n🦄Dígite /regras, caso nao consiga ler a descrição🌹`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `O @${num.split('@')[0]} nos deixou 💔 F`
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
				wait: '❗𝐀𝐠𝐮𝐚𝐫𝐝𝐞...(𝐜𝐚𝐬𝐨 𝐧𝐚𝐨 𝐟𝐨𝐫, 𝐭𝐞𝐧𝐭𝐞 𝐧𝐨𝐯𝐚𝐦𝐞𝐧𝐭𝐞)❗',
				success: '✔️ 𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐨 ✔️',
				error: {
					stick: '❗𝐄𝐫𝐫𝐨 𝐚𝐨 𝐭𝐫𝐚𝐧𝐬𝐟𝐨𝐫𝐦𝐚𝐫 𝐢𝐦𝐚𝐠𝐞𝐦 𝐞𝐦 𝐟𝐢𝐠𝐮𝐫𝐢𝐧𝐡𝐚❗',
					Iv: '❌ Link tidak valid ❌'
				},
				only: {
					group: '❗𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐝𝐢𝐬𝐩𝐨𝐧𝐢𝐯𝐞𝐥 𝐚𝐩𝐞𝐧𝐚𝐬 𝐞𝐦 𝐠𝐫𝐮𝐩𝐨𝐬❗',
					ownerG: '❗𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐱𝐜𝐥𝐮𝐬𝐢𝐯𝐨 𝐝𝐨 𝐚𝐝𝐦 𝐷𝑂𝐵𝐵𝑌♱᭄ ❗',
					ownerB: '❗𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐱𝐜𝐥𝐮𝐬𝐢𝐯𝐨 𝐝𝐨 𝐚𝐝𝐦 𝐷𝑂𝐵𝐵𝑌♱᭄ ❗',
					admin: '❗𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐱𝐜𝐥𝐮𝐬𝐢𝐯𝐨 𝐩𝐚𝐫𝐚 𝐚𝐝𝐦𝐢𝐧𝐬, 𝐬𝐞𝐮 𝐦𝐞𝐦𝐛𝐫𝐨 𝐜𝐨𝐦𝐮𝐦 🤬❗',
					Badmin: '❗𝐄 𝐧𝐞𝐜𝐞𝐬𝐬𝐚́𝐫𝐢𝐨 𝐨 𝐛𝐨𝐭 𝐬𝐞𝐫 𝐮𝐦 𝐚𝐝𝐦!❗'
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["5511911219615@s.whatsapp.net"] // replace this with your number
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
					case 'help2':
				case 'menu2':
					client.sendMessage(from, help1(prefix), text)
					break
				case 'desbloquear':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
				    client.blockUser (`${body.slice(9)}@c.us`, "remove")
					client.sendMessage(from, `𝐎 ${body.slice(9)}@c.us 𝐅𝐨𝐢 𝐝𝐞𝐬𝐛𝐥𝐨𝐪𝐮𝐞𝐚𝐝𝐨 😳`, text)
				    break
				case 'bloquear':
				 client.updatePresence(from, Presence.composing) 
				 client.chatRead (from)
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(7)}@c.us`, "add")
					client.sendMessage(from, `𝐎 ${body.slice(7)}@c.us 𝐅𝐨𝐢 𝐛𝐥𝐨𝐪𝐮𝐞𝐚𝐝𝐨 𝐝𝐞 𝐮𝐬𝐚𝐫 𝐨 𝐛𝐨𝐭 𝐧𝐨 𝐩𝐫𝐢𝐯𝐚𝐝𝐨 😂`, text)
					break
		 	case 'mute':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					var nomor = mek.participant
					const close = {
					text: `❗𝐎 𝐚𝐝𝐦 @${nomor.split("@s.whatsapp.net")[0]}\n𝐅𝐞𝐜𝐡𝐨𝐮 𝐨 𝐠𝐫𝐮𝐩𝐨, 𝐭𝐚𝐥𝐯𝐞𝐳 𝐢𝐫𝐚́ 𝐝𝐚𝐫 𝐮𝐦 𝐚𝐯𝐢𝐬𝐨 𝐞𝐧𝐭𝐚̃𝐨 𝐏𝐫𝐞𝐬𝐭𝐞𝐦 𝐀𝐓𝐄𝐍𝐂𝐀𝐎❗`,
					contextInfo: { mentionedJid: [nomor] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, true);
					reply(close)
					break
                case 'unmute':
                case 'bukagc':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					open = {
					text: `❗𝐎 𝐚𝐝𝐦 @${sender.split("@")[0]}\n𝐀𝐛𝐫𝐢𝐮 𝐨 𝐠𝐫𝐮𝐩𝐨, 𝐬𝐞 𝐜𝐨𝐦𝐩𝐨𝐫𝐭𝐞𝐦 ❗`,
					contextInfo: { mentionedJid: [sender] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, false)
					client.sendMessage(from, open, text, {quoted: mek})
					break
				case 'gtts':
				 if (!isNsfw) return reply('❗𝐒𝐨𝐦𝐞𝐧𝐭𝐞 𝐩𝐯❗')
					if (args.length < 1) return client.sendMessage(from, '❗𝐓𝐞𝐱𝐭𝐨 𝐦𝐮𝐢𝐭𝐨 𝐠𝐫𝐚𝐧𝐝𝐞, 𝐢𝐠𝐮𝐚𝐥 𝐦𝐞𝐮 𝐩❗', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Textnya mana om', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('❗𝐓𝐞𝐱𝐭𝐨 𝐦𝐮𝐢𝐭𝐨 𝐠𝐫𝐚𝐧𝐝𝐞, 𝐢𝐠𝐮𝐚𝐥 𝐦𝐞𝐮 𝐩❗')
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
				case 'listakamikaze':
					teks = '𝐍𝐮𝐦𝐞𝐫𝐨𝐬 𝐛𝐥𝐨𝐪𝐮𝐞𝐚𝐝𝐨𝐬 𝐝𝐚 𝐍𝐄𝐙𝐙𝐔𝐊𝐎-𝐂𝐇𝐀𝐍⁖ฺ۟̇࣪·֗٬̤⃟🌸:\n'
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
				 if (!isNsfw) return reply('❗𝐒𝐨𝐦𝐞𝐧𝐭𝐞 𝐩𝐯❗')
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
								reply(`❌ 𝐅𝐚𝐥𝐡𝐚 𝐚𝐨 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐞𝐫 ${tipe} 𝐩𝐚𝐫𝐚 𝐟𝐢𝐠𝐮𝐫𝐢𝐧𝐡𝐚❌`)
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
						reply(`❗𝐔𝐬𝐞 ${prefix}𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐞𝐦 𝐟𝐨𝐭𝐨𝐬 𝐨𝐮 𝐯𝐢𝐝𝐞𝐨𝐬 𝐧𝐨 𝐦𝐚𝐱𝐢𝐦𝐨 10𝐬❗`)
					}
					break
				case 'meme':
					meme = await kagApi.memes()
					buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Humor galera'})
					break
				case 'dobby':
				case 'dono':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/PO5PYYI.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🌹𝐃𝐨𝐧𝐨 𝐝𝐨 𝐛𝐨𝐭 シ︎\n🌹𝐀𝐝𝐦 𝐝𝐚 ᬊ͜͡𝑹𝑨ϟ𝑶℘⚡\n🌹𝐈𝐧𝐬𝐭𝐚:off\n🌹𝐂𝐨𝐧𝐭𝐚𝐭𝐨:wa.me/5511911219615\n\n\n👻Dìgite /bot para ver comandos basicos para criar um bot'})
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
					buffer = await getBuffer(`https://i.imgur.com/3qS2Fh7.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🌹𝑳𝒊𝒑𝒆\n🌹𝐀𝐝𝐦 𝐝𝐚 𝐅𝐂𝐂 ᬊ͜͡𝑹𝑨ϟ𝑶℘⚡\n🌹𝐂𝐚𝐧𝐚𝐥:off\n🌹𝐈𝐧𝐬𝐭𝐚:off'})
					break
				case 'kirito':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://imgur.com/VuICDTD.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🌹𝑲𝑰𝑹𝑰𝑻𝑶ッ\n🌹𝐀𝐝𝐦 𝐒𝐮𝐩𝐫𝐞𝐦𝐨 𝐝𝐚 𝐅𝐂𝐂 ᬊ͜͡𝑹𝑨ϟ𝑶℘⚡\n🌹𝐂𝐚𝐧𝐚𝐥:\nhttps://youtube.com/c/lele007%E3%83%83\n🌹𝐈𝐧𝐬𝐭𝐚:off'})
					break
				case 'ytpremium':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/fqE0TGs.png`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🌹𝐒𝐢𝐠𝐚 𝐨 𝐩𝐚𝐬𝐬𝐨 𝐚 𝐩𝐚𝐬𝐬𝐨 𝐩𝐚𝐫𝐚 𝐨𝐛𝐭𝐞𝐫 𝐨 𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦🌹\n\n\n➣𝐁𝐚𝐢𝐱𝐞 𝐞 𝐢𝐧𝐬𝐭𝐚𝐥𝐞 𝐨 𝐬𝐞𝐠𝐮𝐢𝐧𝐭𝐞 𝐚𝐩𝐩🐊:\n➣𝐕𝐚𝐧𝐜𝐞𝐝 𝐌𝐢𝐜𝐫𝐨𝐆🐊\nhttps://www.mediafire.com/file/qfr8ufmybswyz39/Vanced_microG.apk/file\n➣𝐀𝐠𝐨𝐫𝐚 𝐞 𝐬𝐨 𝐛𝐚𝐢𝐱𝐚𝐫 𝐨 𝐘𝐓 𝐝𝐞𝐬𝐞𝐣𝐚𝐝𝐨😳\n\n➣𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐓𝐞𝐦𝐚 𝐃𝐚𝐫𝐤🐊\nhttps://www.mediafire.com/file/ourocauwy1hc3v1/YouTube_Black.apk/file\n➣𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐓𝐞𝐦𝐚 𝐂𝐥𝐚𝐫𝐨🐊\nhttps://www.mediafire.com/file/x98arvls146n5i5/YouTube_Premium_15.43.32.apk/file\n➣𝐀𝐠𝐨𝐫𝐚 𝐞́ 𝐬𝐨́ 𝐥𝐨𝐠𝐚𝐫 𝐬𝐮𝐚 𝐜𝐨𝐧𝐭𝐚\n\n\n➣𝐁𝐲 𝐷𝑂𝐵𝐵𝑌♱᭄ 𝐇𝐞𝐡𝐞 👻'})
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
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '𝐎𝐥𝐡𝐚 𝐢𝐬𝐬𝐨 𝐦𝐚𝐧𝐨 🤤'})
					break
				case 'bot':
			     	memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/dPUVFF6.png`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '🔗𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐛𝐚𝐬𝐢𝐜𝐨𝐬 𝐩𝐚𝐫𝐚 𝐛𝐨𝐭 𝐧𝐨 𝐓𝐞𝐫𝐦𝐮𝐱🔗:\n\n🔗$termux-setup-storage\n🔗$pkg upgrade && pkg update\n🔗$pkg install git\n🔗$pkg install wget\n🔗$pkg install libwebp\n🔗$pkg install ffmpeg\n🔗$pkg install nodejs\n🔗$git clone (git que deseja clonar)\n🔗$cd (nome do repositório)\n🔗$bash install.sh\n🔗$(npm start) ou (node index.js) 𝐩𝐚𝐫𝐚 𝐠𝐞𝐫𝐚𝐫 𝐬𝐞𝐮 𝐪𝐫 𝐜𝐨𝐝𝐞 𝐞 𝐢𝐧𝐢𝐜𝐢𝐚𝐫 𝐬𝐞𝐮 𝐛𝐨𝐭\n\n\n➣𝐁𝐲 𝐷𝑂𝐵𝐵𝑌♱᭄ 𝐡𝐞𝐡𝐞 👻'})
					break
				case 'regras':
					reply('📍𝐑𝐄𝐆𝐑𝐀𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎📍:\n\n\n➣• 𝐒𝐞𝐦 𝐭𝐫𝐚𝐯𝐚𝐬❌\n➣•𝐒𝐞𝐦 𝐟𝐥𝐨𝐨𝐝❌\n➣•𝐒𝐞𝐦 𝐖𝐚.𝐦𝐞 𝐞 𝐧𝐮𝐦𝐞𝐫𝐨𝐬❌\n➣•𝐃𝐞𝐬𝐫𝐞𝐬𝐩𝐞𝐢𝐭𝐨❌\n➣•𝐒𝐞𝐦 𝐝𝐢𝐯𝐥𝐠𝐚𝐜𝐚̃𝐨❌\n➣•𝐒𝐞𝐦 𝐜𝐨𝐧𝐭𝐞𝐮𝐝𝐨𝐬 +18, 𝐠𝐨𝐫𝐞 𝐞 𝐜𝐩❌\n➣•𝐌𝐞𝐦𝐛𝐫𝐨 𝐝𝐚𝐬 𝐫𝐜𝐭𝐬 𝐨𝐮 𝐪𝐮𝐚𝐥𝐪𝐮𝐞𝐫 𝐠𝐫𝐮𝐩𝐨 𝐝𝐞 𝐚𝐭𝐚𝐪𝐮𝐞𝐬 𝐬𝐞𝐦 𝐭𝐚𝐠❌\n➣•𝐍𝐀𝐎 𝐈𝐑 𝐍𝐎 𝐏𝐕 𝐃𝐎𝐒 𝐀𝐃𝐌𝐒 𝐏𝐑𝐀 𝐏𝐄𝐃𝐈𝐑 𝐓𝐑𝐀𝐕𝐀𝐒❌\n\n\n⚡𝐄𝐯𝐢𝐭𝐞 𝐝𝐞𝐬𝐜𝐮𝐦𝐩𝐫𝐢𝐫 𝐚𝐬 𝐫𝐞𝐠𝐫𝐚𝐬 𝐩𝐚𝐫𝐚 𝐧𝐚𝐨 𝐬𝐞𝐫 𝐛𝐚𝐧𝐢𝐝𝐨(𝐚) <3⚡')
		 		break
				case 'imune':
				case 'imunes':
					reply('🌹𝐌𝐞𝐥𝐡𝐨𝐫𝐞𝐬 𝐢𝐦𝐮𝐧𝐞𝐬 𝐝𝐚 𝐚𝐭𝐮𝐚𝐥𝐢𝐝𝐚𝐝𝐞🌹\n⚡𝐓𝐢𝐬𝐮𝐕1:\n🌹https://youtu.be/XTFiom_tBaU\n\n⚡𝐓𝐢𝐬𝐮𝐕2:\nhttps://youtu.be/wx568PBGh2w\n\n🌹𝐂𝐨𝐦𝐨 𝐩𝐚𝐬𝐬𝐚𝐫 𝐩𝐞𝐥𝐨 𝐞𝐧𝐜𝐮𝐫𝐭𝐚𝐝𝐨𝐫🌹:\nhttps://youtu.be/QH7FMSnIWK0\n\n🌹𝐂𝐨𝐦𝐨 𝐢𝐧𝐬𝐭𝐚𝐥𝐚𝐫 𝐰𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐢𝐦𝐮𝐧𝐞 𝐬𝐞𝐦 𝐞𝐫𝐫𝐨𝐬✅\nhttps://youtu.be/ooR9k1DxOtI\n\n🌹𝐂𝐨𝐦𝐨 𝐢𝐧𝐬𝐭𝐚𝐥𝐚𝐫 𝐓𝐑𝐀𝐕𝐀𝐒 𝐧𝐨 𝐬𝐞𝐮 𝐙𝐚𝐩 (𝐃𝐚𝐭𝐚𝐁𝐚𝐬𝐞)🌹\nhttps://youtu.be/mhNVP4QivmU')
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
					reply(`❗𝐷𝑂𝐵𝐵𝑌♱᭄, 𝐨 𝐩𝐫𝐞𝐟𝐢𝐱𝐨 𝐟𝐨𝐢 𝐚𝐥𝐭𝐞𝐫𝐚𝐝𝐨 𝐜𝐨𝐦 𝐬𝐮𝐜𝐞𝐬𝐬𝐨 𝐩𝐚𝐫𝐚 ${prefix}❗`)
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
						if (args.length < 1) return client.sendMessage(from, 'Onde está o nome de usuário, hum?', text, {quoted: mek})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `*ID* : ${user.id}\n*Username* : ${user.uniqueId}\n*Nickname* : ${user.nickname}\n*Followers* : ${stats.followerCount}\n*Followings* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
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
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*#* @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
                case 'chamada2':
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
					reply('🌹𝐷𝑂𝐵𝐵𝑌♱᭄ 𝐨𝐬 𝐜𝐡𝐚𝐭𝐬 𝐝𝐨 𝐬𝐞𝐮 𝐛𝐨𝐭 𝐟𝐨𝐫𝐚𝐦 𝐥𝐢𝐦𝐩𝐨𝐬 𝐜𝐨𝐦 𝐬𝐮𝐜𝐞𝐬𝐬𝐨✅')
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
						mentions(`❗𝐎 @${mentioned[0].split('@')[0]} 𝐅𝐨𝐢 𝐩𝐫𝐨𝐦𝐨𝐯𝐢𝐝𝐨 𝐩𝐫𝐚 𝐚𝐝𝐦𝐢𝐧❗`, mentioned, true)
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
						mentions(`❗𝐎 @${mentioned[0].split('@')[0]} 𝐟𝐨𝐢 𝐫𝐞𝐛𝐚𝐢𝐱𝐚𝐝𝐨 𝐩𝐫𝐚 𝐦𝐞𝐦𝐛𝐫𝐨 𝐜𝐨𝐦𝐮𝐦❗`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'add':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('❗𝐐𝐮𝐞𝐦 𝐯𝐨𝐜𝐞̂ 𝐝𝐞𝐬𝐞𝐣𝐚 𝐚𝐝𝐢𝐜𝐢𝐨𝐧𝐚𝐫?🤨❗')
					if (args[0].startsWith('08')) return reply('Use o código do país amigo')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('❗𝐅𝐚𝐥𝐡𝐚 𝐚𝐨 𝐚𝐝𝐢𝐜𝐢𝐨𝐧𝐚𝐫 𝐩𝐞𝐬𝐬𝐨𝐚, 𝐭𝐚𝐥𝐯𝐞𝐬 𝐬𝐞𝐣𝐚 𝐩𝐫𝐢𝐯𝐚𝐝𝐨❗')
					}
					break
				case 'banir':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('❗Quem você deseja banir?🤨❗')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = '𝐎 \n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n 𝐟𝐨𝐢 𝐫𝐞𝐦𝐨𝐯𝐢𝐝𝐨 𝐜𝐨𝐦 𝐬𝐮𝐜𝐞𝐬𝐬𝐨 ✅`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`𝐎 @${mentioned[0].split('@')[0]} 𝐟𝐨𝐢 𝐫𝐞𝐦𝐨𝐯𝐢𝐝𝐨 𝐜𝐨𝐦 𝐬𝐮𝐜𝐞𝐬𝐬𝐨 ✅`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				case 'admins':
					if (!isGroup) return reply(mess.only.group)
					teks = `⚡𝐋𝐢𝐬𝐭𝐚 𝐝𝐞 𝐚𝐝𝐦𝐢𝐧𝐬 𝐝𝐨 𝐠𝐫𝐮𝐩𝐨 ${groupMetadata.subject}⚡\nTotal : ${groupAdmins.length}\n\n`
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
				 if (!isNsfw) return reply('❗𝐒𝐨𝐦𝐞𝐧𝐭𝐞 𝐩𝐯❗')
					if (!isQuotedSticker) return reply('❗𝐄 𝐧𝐞𝐜𝐞𝐬𝐬𝐚́𝐫𝐢𝐨 𝐦𝐚𝐫𝐜𝐚𝐫 𝐚𝐥𝐠𝐮𝐦𝐚 𝐟𝐢𝐠𝐮𝐫𝐢𝐧𝐡𝐚❗')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❗ 𝐅𝐚𝐥𝐡𝐚 𝐚𝐨 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐞𝐫 𝐅𝐈𝐆𝐔𝐑𝐈𝐍𝐇𝐀 𝐞𝐦 𝐢𝐦𝐚𝐠𝐞𝐦 ❗')
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
						if (isWelkom) return reply('❗𝐉𝐚́ 𝐚𝐭𝐢𝐯𝐨❗')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❗𝐌𝐞𝐧𝐬𝐚𝐠𝐞𝐧𝐬 𝐝𝐞 𝐛𝐨𝐚𝐬 𝐯𝐢𝐧𝐝𝐚𝐬 𝐚𝐭𝐢𝐯𝐚𝐝𝐚𝐬 𝐧𝐞𝐬𝐬𝐞 𝐠𝐫𝐮𝐩𝐨❗')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❗𝐌𝐞𝐧𝐬𝐚𝐠𝐞𝐧𝐬 𝐝𝐞 𝐛𝐨𝐚𝐬 𝐯𝐢𝐧𝐝𝐚𝐬 𝐝𝐞𝐬𝐚𝐭𝐢𝐯𝐚𝐝𝐚𝐬 𝐧𝐞𝐬𝐬𝐞 𝐠𝐫𝐮𝐩𝐨❗')
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
