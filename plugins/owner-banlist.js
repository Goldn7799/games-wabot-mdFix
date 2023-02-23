import dbs from '../lib/database.js'

let handler = (m)=>{
  let db = dbs.data;
  let user = [], group = [], chatBannedCount = 0, groupBannedCount = 0;
  Object.entries(db.users).map(dt =>{
    if(dt[0].split("@")[1] === "s.whatsapp.net"){
      if(dt[1].banned){
        chatBannedCount++;
        user.push(dt[0])
      };
    }else if (dt[0].split("@")[1] === "g.us"){
      if (dt[1].isBanned){
        groupBannedCount++;
        group.push[dt[0]]
      };
    };
  })
  m.reply(`
┌ *Daftar Group Terbanned*
│ Total : ${groupBannedCount} Group
${group.map(dts=>{
return `│-${dts}
`
})}
└────
┌ *Daftar User Terbanned*
│ Total : ${chatBannedCount} User
${user.map(dts=>{
  return `│-${dts}
  `
  })}
└────
  `)
}

handler.help = ['banlist']
handler.tags = ['owner']

handler.owner = true

handler.command = /^banlist$/i

export default handler