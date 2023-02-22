import dbs from "../lib/database.js"

let handler = (m, { text })=>{
  let db = dbs.data;
  try {
    if(db.users[m.chat].registered){
      if(text){
        db.users[m.chat].name = text;
        m.reply(`Sukses ganti nama menjadi *${text}*`);
      }else {
        m.reply("Harap Isi Nama dengan format .editAcc <NAME>")
      }
    }else {
      m.reply("Anda belum terdaftar, harap daftar dengan .register <NAMA>")
    }
  }catch{
    m.reply("Gagal memuat")
  }
}

handler.help = ["editAcc <NAME>"]
handler.tags = ["info"]

handler.command = /^editAcc$/i
export default handler