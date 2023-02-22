import dbs from "../lib/database.js"

let handler = (m, { text })=>{
  try {
    let db = dbs.data;
    if(db.users[m.chat].registered){
      m.reply(`Kamu Sudah terdaftar sebagai *${db.users[m.chat].name}*`);
    }else {
      if (text){
        db.users[m.chat].registered = true;
        db.users[m.chat].name = text;
        m.reply(`Sukses Register sebagai *${text}*`);
      }else {
        m.reply("Mohon masukkan Nama")
      }
    }
  }catch {
    m.reply("Verify Failed")
  }
}

handler.help = ['register <name>']
handler.tags = ['info']

handler.command = /^register$/i
export default handler