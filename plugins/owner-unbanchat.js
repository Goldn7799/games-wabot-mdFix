import db from '../lib/database.js'

let handler = async (m, { text }) => {
    db.data.chats[text].isBanned = false
    m.reply(`Sukses Unban ${text}`)
}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = /^unbanchat$/i
handler.owner = true

export default handler