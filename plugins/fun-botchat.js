let handler = (m, { conn })=>{
  let name = conn.getName(m.sender);
  let words = ['Ekhmmm....', `Saya di sini ${name}`, 'ada yang manggil?', `Ada apa ${name}`, 'Uhukk uhukk...', 'Apa weh']
  let text = `${words[Math.floor(Math.random() * words.length)]}`
  m.reply(text);
}

handler.help = ['bot']
handler.tags = ['fun']

handler.customPrefix = /Bot/
handler.command = new RegExp

export default handler