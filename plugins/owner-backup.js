import fs from 'fs'
import db from '../lib/database.js'

let handler = (m)=>{
  try {
    let rawDate = Date().split(" ");
    let date = `${rawDate[0]}-${rawDate[1]}-${rawDate[2]}-${rawDate[3]}-${rawDate[4]}`;
    const write = ()=>{
      fs.readdir("./backups", (err, res)=>{
        if(err){
          fs.mkdir("./backups", (err)=>{
            if(err){
              m.reply(err)
            }else {
              write();
            }
          })
        }else {
          fs.copyFile('./database.json' ,`./backups/database.json.backup.${date}`, (err)=>{
            if(err){
              m.reply(err);
            }else {
              m.reply(`Sukses membuat BackUp pada ${date}`);
            }
          })
        }
      })
    }
  write()
  }catch{
    m.reply("Gagal membuat BackUp")
  }
}

handler.help = ['backup']
handler.tags = ['database']

handler.owner = true

handler.command = /^backup$/i

export default handler