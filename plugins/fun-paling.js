let toM = a => '@' + a.split('@')[0]
let handler = (m, { text, groupMetadata })=>{
  if(text){
    let ps = groupMetadata.participants.map(v => v.id)
    let a = ps.getRandom()
    m.reply(`Yang paling *${text}* adalah ${toM(a)}`, null, {
      mentions: [a]
    })
  }else {
    m.reply('Mohon masukkan kata, contoh .paling pintar')
  }
}

handler.help = ['paling <action>']
handler.tags = ['fun']

handler.group = true

handler.command = /^paling$/i
export default handler