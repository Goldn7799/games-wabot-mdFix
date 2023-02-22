import Connection from '../lib/connection.js'
import dbs from "../lib/database.js";
let db = dbs.data
import { plugins } from '../lib/plugins.js';
import { cpus as _cpus, totalmem, freemem } from 'os'
// import util from 'util'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
import e from 'express'
let format = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})
let handler = async (m, { conn }) => {
  const chats = Object.entries(Connection.store.chats).filter(([id, data]) => id && data.isChats)
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
  const used = process.memoryUsage()
  const cpus = _cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
  })
  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  })
  const message = m.reply('_Testing speed..._')
  let old = performance.now()
  await message
  let neww = performance.now()
  let speed = neww - old
  let users = Object.keys(db.users).length
  let registred = Object.values(db.users).filter(user => user.registered == true).length
  let id = [], stats = [], chatCount = 0, groupCount = 0, groupBannedCount = 0, chatBannedCount = 0, featureCount = 0;
  for(let prop in db.users){ 
    id.push(prop);
  }
  stats = Object.values(plugins).map(pl => {
    return {
      help: Array.isArray(pl.tags) ? pl.help : [pl.help]
    }
  })
  stats.map(dt =>{
    featureCount += dt.help.length;
  })
  id.map(dt => {
    if(dt.split("@")[1] === "s.whatsapp.net"){
      chatCount++;
    }else if (dt.split("@")[1] === "g.us"){
      groupCount++
    };
  })
  stats.map(dt =>{
    featureCount++;
  })
  Object.entries(db.users).map(dt =>{
    if(dt[0].split("@")[1] === "s.whatsapp.net"){
      if(dt[1].banned){
        chatBannedCount++;
      };
    }else if (dt[0].split("@")[1] === "g.us"){
      if (dt[1].isBanned){
        groupBannedCount++;
      };
    };
  })
  m.reply(`
Merespon dalam ${speed} millidetik

💬 Status :
- Total Feature *${featureCount} Features*
- *${groupCount}* Group Chats
- *${groupsIn.length}* Groups Joined
- *${groupsIn.length - groupsIn.length}* Groups Left
- *${groupBannedCount}* Groups Banned
- *${chatBannedCount}* Personal Chats Banned
- *${chatCount}* Personal Chats
- *${users}* Total Chats

💻 *Server Info* :
RAM: ${format(totalmem() - freemem())} / ${format(totalmem())}

_NodeJS Memory Usage_
${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n') + '```'}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}

_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`.trim())
}
handler.help = ['ping', 'speed']
handler.tags = ['info', 'tools']

handler.command = /^(ping|speed|info)$/i
export default handler