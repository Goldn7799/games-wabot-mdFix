let handler =  m => m.reply(`
╭─「 Donasi • Pulsa 」
│ • Indosat Ooredoo [085713964963]
│ • Telkomsel [081319944687]
│ • (Server) Indosat Ooredoo [085875536696]
│ • (Server) Telkomsel [081228020195]
╰────

╭─「 Donasi • Non Pulsa 」
│ • https://saweria.co/BochilGaming
│ • Gopay [085713964963]
│ • (Server) https://saweria.co/SyeifGamer1015
│ • (Server) Gopay [081228020195]
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

export default handler
