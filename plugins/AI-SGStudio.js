import similarity from "similarity";

let handler = (m, {conn, text})=>{
  const matches = 0.75;
  if(text){
    let cmd = text.toLowerCase();
    let cl = cmd.split(" ");
    if(similarity(cl[0], "buka")||similarity(cl[0], "open")){
      if(similarity(cl[1], "group")){
        
      }
    }
  }
} 

handler.help = ['ai']
handler.tags = ['tools']
handler.command = /^(ai|a|i|p)$/i

export default handler