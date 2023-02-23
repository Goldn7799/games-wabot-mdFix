import fs from 'fs'
import db from '../lib/database.js'

let handler = (m)=>{
  try {
    let rawDate = Date().split(" ");
    let date = `${rawDate[0]}-${rawDate[1]}-${rawDate[2]}-${rawDate[3]}-${rawDate[4]}`;
    fs.writeFile(`./database.json.backup.${date}`, (db.data).toString(), (err)=>{
      if(err){
        m.reply(err);
      }else {
        m.reply(`Sukses membuat BackUp pada ${date}`);
      }
    })
  }catch{
    m.reply("Gagal membuat BackUp")
  }
}

handler.help = ['backup']
handler.tags = ['database']

handler.owner = true

handler.command = /^backup$/i

export default handler