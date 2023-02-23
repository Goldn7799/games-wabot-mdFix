import dbs from "../lib/database.js"

let handler = (m, { text })=>{
  let db = dbs.data;
  try {
    if(db.users[m.sender].registered){
      if(text&&text.length >= 4){
        db.users[m.sender].name = text;
        m.reply(`Sukses ganti nama menjadi *${text}*`);
      }else {
        m.reply("Harap Isi Nama dengan format .editAcc <NAME> atau minimal nama 4 karakter")
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