import dbs from "../lib/database.js"

let handler = (m, { text })=>{
  try {
    let db = dbs.data;
    if(db.users[m.sender].registered){
      m.reply(`Kamu Sudah terdaftar sebagai *${db.users[m.sender].name}*`);
    }else {
      if (text&&text.length >= 4){
        db.users[m.sender].registered = true;
        db.users[m.sender].name = text;
        m.reply(`Sukses Register sebagai *${text}*`);
      }else {
        m.reply("Mohon masukkan Nama/Karakter minimal 4")
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