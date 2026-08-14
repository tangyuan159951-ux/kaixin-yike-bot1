const COUNTS = { joke: 100000, duanzi: 100000, riddle: 100000, story: 10000, article: 5000 };

const SUBJECTS = ["程序员","设计师","产品经理","会计","老师","学生","老板","同事","室友","邻居","快递员","外卖员","摄影师","厨师","理发师","医生","健身教练","客服","司机","网友"];
const SCENES = ["开会迟到","准备下班","排队买饭","参加面试","学习新技能","整理房间","制定计划","赶公交","点外卖","逛超市","看电影","做运动","写报告","准备考试","早起打卡","周一上班","周五下午","出门旅行","查看余额","面对难题"];
const TWISTS = ["先把今天过完，明天的问题让明天排队","计划非常完美，唯一的变量就是我本人","所谓效率，就是把发呆也安排进日程表","生活没有标准答案，但可以先选最开心的","遇事不慌，先喝口水再说","办法总比困难多，只是困难通常先到","我没有拖延，只是在等灵感热身","成年人的稳定，是稳定地想放假","道理我都懂，执行时还需要开个会","不是我不努力，是快乐总在半路拦住我"];
const TONES = ["现场安静两秒，然后笑声准时到达","大家决定先笑再思考","这说明开心也是一种解决方案","生活偶尔也会偷偷写段子","这条快乐记录值得加粗保存","连闹钟都笑得晚响了一分钟","认真生活，也别忘了轻松一下","这个结论值得配一杯奶茶","平凡的一天多了一个开心注脚","听完以后，嘴角已经先同意了"];

const OBJECTS = [["水","越洗别的东西，自己越容易变脏"],["影子","总跟着你，却抓不住"],["名字","属于你，别人却叫得更多"],["年龄","只会增加，很难减少"],["时间","看不见，却能改变一切"],["回声","你说什么，它常回答什么"],["地图","有城市和道路，却住不了人"],["时钟","有脸有手，却没有身体"],["书","不说话，却能讲很多故事"],["镜子","什么都照见，却留不住任何东西"],["铅笔","越工作，身体越短"],["蜡烛","站着流泪，越哭越矮"],["雨伞","下雨时开放，晴天时收拢"],["冰","怕热不怕冷"],["火","吃得越多，长得越大"],["风","摸不到，却能推动树叶"],["云","没有翅膀，也能飘在天空"],["雪","从天上来，落地后慢慢消失"],["门","有口却不会说话"],["窗","不出门，也能看见远方"]];
const PREFIXES = ["安静的","忙碌的","清晨的","夜晚的","下雨天的"];
const FRAMES = ["猜一猜：什么东西","脑筋转个弯：谁","不按常理想：什么","给你十秒：哪样东西","生活谜题：什么","轻松一猜：谁","换个角度看：什么东西","小小谜面：哪位","今天的问题：什么","趣味挑战：谁","想象一下：什么","快速问答：哪样东西","别急着回答：什么","答案就在身边：谁","观察生活：什么东西","聪明人也会停一下：哪样东西","开心猜谜：什么","一分钟谜题：谁","今天动动脑：什么东西","最后一个提示：哪样东西"];
const CONTEXTS = ["在家里","在路上","在清晨","在夜晚","在故事里"];
const HINTS = ["答案来自日常生活","换个角度就不难","别被字面意思骗了","答案可能就在身边","用想象力而不是计算器","先排除最复杂的答案","这是一道轻松题","观察它最明显的特点","答案通常很简单","读完后停三秒再回答"];

const HEROES = ["小林","阿宁","小满","安安","阿树","小禾","晨晨","小夏","乐乐","青青","小远","子墨","小鹿","阿月","小川","宁宁","星星","小南","木木","小雨"];
const PLACES = ["旧车站","山顶邮局","海边灯塔","小镇书店","月光巷","森林小屋","清晨菜场","屋顶花园","河边长椅","深夜便利店","校园操场","老照相馆","雨天站台","安静图书馆","小城电影院","山间茶馆","街角面包店","蓝色渔村","老式钟表店","向日葵田","雪夜小站","巷口理发店","湖边小路","山脚诊所","温暖食堂"];
const STORY_OBJECTS = ["迟到的信","会发光的伞","装着回忆的糖","没有终点的车票","会回答问题的书","温暖的纽扣","不会熄灭的灯","迷路的纸鹤","陌生人留下的照片","会唱歌的石头","慢了十分钟的钟","写满谢谢的纸","收集微笑的风","等待主人的鞋","只能装好消息的盒子","会指向家的硬币","不怕雨的纸花","写着勇气的围巾","记得承诺的杯子","从不抱怨的种子"];
const LESSONS = ["勇气是害怕时仍愿意往前走","认真对待的小事会在意想不到时照亮你","善意送出去后常会换一种方式回来","走得慢没关系，别忘了看见身边的人","每个平凡的人都能成为别人故事里的光","不必等待完美的一天，今天就可以开始","放下答案后才能听见内心的声音","帮助一个人，世界就多一条回家的路","失败不会定义你，再次出发才会","被理解的感觉是很好的礼物","幸福也许就在你愿意珍惜的这一刻","给别人留余地也是给自己留一扇门","成长是学会温柔地和自己相处","希望是在一次次小行动里长出来的","感谢走过的路，也要相信还没到达的远方","真诚的一句话比华丽的安慰更有力量","与其害怕失去，不如好好经历此刻拥有","照顾好自己才有力量把温暖分给别人","不要小看每天的一点进步","真正的告别是带着爱继续生活"];

const TOPICS = ["建立自信","管理时间","克服拖延","稳定情绪","提升专注","养成阅读习惯","有效沟通","学会倾听","目标拆解","持续学习","健康作息","坚持运动","理性消费","整理环境","培养耐心","面对失败","减少内耗","建立边界","练习感恩","复盘成长"];
const ACTIONS = ["从五分钟开始","每天记录一次","只处理最重要的一件事","把目标写得具体","给行动设置固定时间","提前准备环境","减少一个干扰源","完成后及时奖励自己","寻找一位同行伙伴","用问题代替自责","把进步做成清单","允许自己慢一点","先完成再优化","把困难分成三步","睡前做简单复盘","早晨确定今日重点","练习说出真实需求","给自己留出空白","关注可以控制的部分","连续实践七天","用数据观察变化","为意外准备替代方案","主动请求反馈","庆祝微小进步","把经验分享给别人"];
const PERSPECTIVES = ["行动视角","习惯视角","情绪视角","长期视角","复盘视角","微小进步视角","环境设计视角","自我接纳视角","实践反馈视角","持续成长视角"];

const IDIOMS = ["一心一意","意气风发","发扬光大","大快人心","心想事成","成千上万","万事如意","意味深长","长治久安","安居乐业","业精于勤","勤学好问","问心无愧","愧不敢当","当机立断","断章取义","义无反顾","顾全大局","局促不安","安然无恙","肆无忌惮","胆大心细","细水长流","流连忘返","返璞归真","真心实意"];
const CHAR_RIDDLES = [["一口吃掉牛尾巴","告"],["一人一张口，口下长只手","拿"],["大人挑小人","夹"],["山上还有山","出"],["一月七日","脂"],["一边是红，一边是绿，一边怕风，一边怕雨","秋"],["一加一不是二","王"],["需要一半，留下一半","雷"],["十个哥哥","克"],["格外大方","回"],["一百减一","白"],["人在云上","会"],["七十二小时","晶"],["两点天上来","关"]];

const HELP = `🎉 欢迎来到「开心一刻」！

/joke — 笑话
/duanzi — 段子
/story — 故事
/riddle — 脑筋急转弯
/answer — 查看答案
/article — 成长文章
/games — 小游戏
/history — 使用记录
/daily — 订阅每日推送
/stop — 取消推送`;

const mainKeyboard = { inline_keyboard: [
  [{text:"😂 笑话",callback_data:"content:joke"},{text:"😄 段子",callback_data:"content:duanzi"}],
  [{text:"📖 故事",callback_data:"content:story"},{text:"🧠 急转弯",callback_data:"content:riddle"}],
  [{text:"🌱 成长文章",callback_data:"content:article"},{text:"🎮 小游戏",callback_data:"menu:games"}],
  [{text:"🔔 订阅每日推送",callback_data:"action:daily"}]
]};
const gamesKeyboard = { inline_keyboard: [
  [{text:"🎯 猜数字",callback_data:"game:number"},{text:"✊ 石头剪刀布",callback_data:"game:rps"}],
  [{text:"🧮 算术挑战",callback_data:"game:math"},{text:"🔗 成语接龙",callback_data:"game:idiom"}],
  [{text:"🆎 猜字游戏",callback_data:"game:char"},{text:"⬅️ 返回主菜单",callback_data:"menu:main"}]
]};

function randomInt(max) {
  const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % max;
}
function normalizeAnswer(s) {
  return String(s || "").trim().toLowerCase().replace(/^(我猜|答案是|我觉得是|应该是)/, "").replace(/[\s，。！？、,.!?：:；;‘’“”'"（）()]/g, "");
}
function content(type, id) {
  id = ((id % COUNTS[type]) + COUNTS[type]) % COUNTS[type];
  if (type === "joke") {
    const s=SUBJECTS[id%20], scene=SCENES[Math.floor(id/20)%20], twist=TWISTS[Math.floor(id/400)%10], tone=TONES[Math.floor(id/4000)%10];
    return {id,type,title:"开心笑话",body:`${s}${scene}时，认真想了想说：${twist}。\n${tone}。\n【快乐签 ${String(id+1).padStart(6,"0")}】`};
  }
  if (type === "duanzi") {
    const s=SUBJECTS[id%20], scene=SCENES[Math.floor(id/20)%20], twist=TWISTS[Math.floor(id/400)%10], tone=TONES[Math.floor(id/4000)%10];
    return {id,type,title:"轻松段子",body:`今天${s}终于明白，${scene}这件事其实很有学问——${twist}。\n${tone}。\n【轻松号 ${String(id+1).padStart(6,"0")}】`};
  }
  if (type === "riddle") {
    const [answer,clue]=OBJECTS[id%20], prefix=PREFIXES[Math.floor(id/20)%5], frame=FRAMES[Math.floor(id/100)%20], context=CONTEXTS[Math.floor(id/2000)%5], hint=HINTS[Math.floor(id/10000)%10];
    return {id,type,title:"脑筋急转弯",body:`${context}，${frame}带着${prefix}气质，${clue}？\n提示：${hint}。`,answer};
  }
  if (type === "story") {
    const hero=HEROES[id%20], place=PLACES[Math.floor(id/20)%25], obj=STORY_OBJECTS[Math.floor(id/500)%20], lesson=LESSONS[Math.floor(id/500)%20];
    return {id,type,title:`${place}里的${obj}`,body:`${hero}在${place}意外发现了一件${obj}。起初大家都觉得它平平无奇，但${hero}愿意停下来，认真听完它背后的故事。\n\n那天以后，${place}多了一个小小的约定：无论谁经过，都会为下一个人留下一点善意。\n\n${hero}终于明白：${lesson}。`};
  }
  const topic=TOPICS[id%20], action=ACTIONS[Math.floor(id/20)%25], perspective=PERSPECTIVES[Math.floor(id/500)%10];
  return {id,type,title:`${topic}：${action}｜${perspective}`,body:`【${perspective}】\n提升自己不需要一次完成巨大改变。面对“${topic}”，更有效的方法是${action}。先选一个今天能完成的小动作，让开始不再依赖情绪。\n\n行动后记录事实：做了什么、遇到什么阻力、下次如何调整。稳定成长来自可重复的过程，而不是偶尔爆发的意志力。`};
}

async function tg(env, method, params={}) {
  const r = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(params)});
  const j = await r.json(); if (!j.ok) throw new Error(j.description || "Telegram API error"); return j.result;
}
async function send(env, chatId, text, replyMarkup) {
  const p={chat_id:chatId,text}; if(replyMarkup)p.reply_markup=replyMarkup; return tg(env,"sendMessage",p);
}
function feedbackKeyboard(item){return {inline_keyboard:[[{text:"👍 喜欢",callback_data:`feedback:${item.type}:${item.id}:1`},{text:"👎 不喜欢",callback_data:`feedback:${item.type}:${item.id}:-1`}]]};}
async function remember(env,chatId,type,id){
  await env.DB.batch([
    env.DB.prepare("INSERT OR IGNORE INTO seen(chat_id,content_type,content_id) VALUES(?,?,?)").bind(chatId,type,id),
    env.DB.prepare("INSERT INTO history(chat_id,action) VALUES(?,?)").bind(chatId,type)
  ]);
}
async function randomContent(env,chatId,type){
  let id=randomInt(COUNTS[type]);
  for(let i=0;i<20;i++){
    const row=await env.DB.prepare("SELECT 1 FROM seen WHERE chat_id=? AND content_type=? AND content_id=?").bind(chatId,type,id).first();
    if(!row)break; id=randomInt(COUNTS[type]);
  }
  await remember(env,chatId,type,id); return content(type,id);
}
async function showContent(env,chatId,type){
  const item=await randomContent(env,chatId,type);
  if(type==="riddle"){
    await env.DB.prepare("INSERT INTO user_state(chat_id,kind,data,updated_at) VALUES(?,'riddle',?,CURRENT_TIMESTAMP) ON CONFLICT(chat_id) DO UPDATE SET kind='riddle',data=excluded.data,updated_at=CURRENT_TIMESTAMP").bind(chatId,JSON.stringify({answer:item.answer,id:item.id})).run();
    return send(env,chatId,`🧠 脑筋急转弯\n\n${item.body}\n\n直接发送答案，或发送 /answer 查看。`);
  }
  const icons={joke:"😂",duanzi:"😄",story:"📖",article:"🌱"};
  return send(env,chatId,`${icons[type]} ${item.title}\n\n${item.body}`,feedbackKeyboard(item));
}

async function startGame(env,chatId,game){
  let data,prompt;
  if(game==="number"){data={target:randomInt(100)+1,attempts:0};prompt="🎯 我想好了 1—100 之间的数字，直接发数字来猜！";}
  else if(game==="math"){const a=randomInt(46)+5,b=randomInt(19)+2;data={target:a+b,attempts:0};prompt=`🧮 算术挑战：${a} + ${b} = ？`;}
  else if(game==="rps"){data={};prompt="✊ 发送“石头”、“剪刀”或“布”。";}
  else if(game==="idiom"){const eligible=IDIOMS.filter(x=>IDIOMS.some(y=>y.startsWith(x.at(-1))));const current=eligible[randomInt(eligible.length)];data={current};prompt=`🔗 成语接龙开始！\n我先来：${current}\n请发送以“${current.at(-1)}”开头的成语。`;}
  else {const [clue,answer]=CHAR_RIDDLES[randomInt(CHAR_RIDDLES.length)];data={answer};prompt=`🆎 猜字游戏\n谜面：${clue}\n请直接发送一个汉字。`;}
  await env.DB.batch([
    env.DB.prepare("INSERT INTO user_state(chat_id,kind,data,updated_at) VALUES(?,?,?,CURRENT_TIMESTAMP) ON CONFLICT(chat_id) DO UPDATE SET kind=excluded.kind,data=excluded.data,updated_at=CURRENT_TIMESTAMP").bind(chatId,`game:${game}`,JSON.stringify(data)),
    env.DB.prepare("INSERT INTO history(chat_id,action) VALUES(?,?)").bind(chatId,`game:${game}`)
  ]);
  return send(env,chatId,prompt);
}
async function playState(env,chatId,text){
  const row=await env.DB.prepare("SELECT kind,data FROM user_state WHERE chat_id=?").bind(chatId).first(); if(!row)return false;
  const data=JSON.parse(row.data), kind=row.kind;
  if(kind==="riddle"){
    const a=normalizeAnswer(text),e=normalizeAnswer(data.answer),aliases=new Set([e,e.replace(/^你的/,""),e.replace(/^一个/,"")]);
    const ok=[...aliases].some(x=>a===x||(a.length>=2&&(a.includes(x)||x.includes(a))));
    if(ok){await env.DB.prepare("DELETE FROM user_state WHERE chat_id=?").bind(chatId).run();await send(env,chatId,"🎉 回答正确！发送 /riddle 再挑战一道。");}
    else await send(env,chatId,"还不对，再想一想～也可以发送 /answer 查看答案。"); return true;
  }
  const game=kind.slice(5);
  if(game==="rps"){
    const choice=text.replace(/\s/g,"");if(!["石头","剪刀","布"].includes(choice)){await send(env,chatId,"请发送：石头、剪刀或布。");return true;}
    const mine=["石头","剪刀","布"][randomInt(3)],wins=new Set(["石头:剪刀","剪刀:布","布:石头"]);const result=choice===mine?"平局":wins.has(`${choice}:${mine}`)?"你赢了！":"我赢了～";
    await env.DB.prepare("DELETE FROM user_state WHERE chat_id=?").bind(chatId).run();await send(env,chatId,`我出：${mine}\n${result} 发送 /games 再来一局。`);return true;
  }
  if(game==="char"){
    if(normalizeAnswer(text)===normalizeAnswer(data.answer)){await env.DB.prepare("DELETE FROM user_state WHERE chat_id=?").bind(chatId).run();await send(env,chatId,"🎉 猜对了！发送 /games 再玩一题。");}else await send(env,chatId,"还不对，再看看谜面～");return true;
  }
  if(game==="idiom"){
    const value=text.trim().replace(/\s/g,"");if(value.length!==4||!IDIOMS.includes(value)){await send(env,chatId,`请发送一个以“${data.current.at(-1)}”开头的四字成语。`);return true;}
    if(!value.startsWith(data.current.at(-1))){await send(env,chatId,`没接上哦，需要以“${data.current.at(-1)}”开头。`);return true;}
    const options=IDIOMS.filter(x=>x.startsWith(value.at(-1))&&x!==value&&IDIOMS.some(y=>y.startsWith(x.at(-1))));if(!options.length){await env.DB.prepare("DELETE FROM user_state WHERE chat_id=?").bind(chatId).run();await send(env,chatId,`你接：${value}\n🎉 你把我难住了，你赢了！`);return true;}
    data.current=options[randomInt(options.length)];await env.DB.prepare("UPDATE user_state SET data=?,updated_at=CURRENT_TIMESTAMP WHERE chat_id=?").bind(JSON.stringify(data),chatId).run();await send(env,chatId,`接得好！我接：${data.current}\n请发送以“${data.current.at(-1)}”开头的成语。`);return true;
  }
  if(!/^-?\d+$/.test(text.trim())){await send(env,chatId,"请直接发送一个数字。");return true;}
  const value=Number(text),goal=Number(data.target);data.attempts++;
  if(value===goal){await env.DB.prepare("DELETE FROM user_state WHERE chat_id=?").bind(chatId).run();await send(env,chatId,`🎉 答对了！你用了 ${data.attempts} 次。发送 /games 继续玩。`);}
  else {await env.DB.prepare("UPDATE user_state SET data=?,updated_at=CURRENT_TIMESTAMP WHERE chat_id=?").bind(JSON.stringify(data),chatId).run();await send(env,chatId,game==="math"?"还不对，再算一次～":value>goal?"大了，再猜！":"小了，再猜！");} return true;
}

async function handleMessage(env,msg){
  const chatId=msg.chat?.id,text=(msg.text||"").trim();if(!chatId||!text)return;const cmd=text.split(/\s/)[0].split("@")[0].toLowerCase();
  if(["/start","/help","/menu"].includes(cmd))return send(env,chatId,HELP,mainKeyboard);
  if(cmd==="/joke"||text.includes("笑话"))return showContent(env,chatId,"joke");
  if(cmd==="/duanzi"||text.includes("段子"))return showContent(env,chatId,"duanzi");
  if(cmd==="/story"||text.includes("故事"))return showContent(env,chatId,"story");
  if(cmd==="/riddle"||text.includes("急转弯")||text.includes("猜谜"))return showContent(env,chatId,"riddle");
  if(cmd==="/article"||text.includes("提升")||text.includes("成长文章"))return showContent(env,chatId,"article");
  if(cmd==="/answer"||text==="答案"){
    const row=await env.DB.prepare("SELECT kind,data FROM user_state WHERE chat_id=?").bind(chatId).first();return send(env,chatId,row?.kind==="riddle"?`💡 答案：${JSON.parse(row.data).answer}`:"你还没有题目，先发送 /riddle 吧。");
  }
  if(["/games","/game"].includes(cmd)||text==="小游戏")return send(env,chatId,"🎮 小游戏中心\n选择一个游戏：",gamesKeyboard);
  if(cmd==="/daily"){await env.DB.prepare("INSERT OR IGNORE INTO subscribers(chat_id,last_push) VALUES(?,NULL)").bind(chatId).run();return send(env,chatId,"🔔 已订阅每日推送！每天北京时间 09:00 见。");}
  if(cmd==="/stop"){await env.DB.prepare("DELETE FROM subscribers WHERE chat_id=?").bind(chatId).run();return send(env,chatId,"🔕 已取消每日推送。");}
  if(cmd==="/history"){
    const {results}=await env.DB.prepare("SELECT action,COUNT(*) count FROM history WHERE chat_id=? GROUP BY action ORDER BY count DESC LIMIT 10").bind(chatId).all();return send(env,chatId,"📊 你的使用记录\n\n"+(results.length?results.map(x=>`${x.action}：${x.count} 次`).join("\n"):"还没有记录。"));
  }
  if(await playState(env,chatId,text))return;return send(env,chatId,"我暂时没听懂～发送 /help 看看我会什么。",mainKeyboard);
}
async function handleCallback(env,q){
  const chatId=q.message?.chat?.id,data=q.data||"";if(!chatId)return;await tg(env,"answerCallbackQuery",{callback_query_id:q.id}).catch(()=>{});
  if(data==="menu:main")return send(env,chatId,"🎉 开心一刻主菜单",mainKeyboard);
  if(data==="menu:games")return send(env,chatId,"🎮 选择一个小游戏：",gamesKeyboard);
  if(data.startsWith("content:"))return showContent(env,chatId,data.split(":")[1]);
  if(data.startsWith("game:"))return startGame(env,chatId,data.split(":")[1]);
  if(data==="action:daily"){await env.DB.prepare("INSERT OR IGNORE INTO subscribers(chat_id,last_push) VALUES(?,NULL)").bind(chatId).run();return send(env,chatId,"🔔 已订阅！每天北京时间 09:00 见。");}
  if(data.startsWith("feedback:")){const [,type,id,value]=data.split(":");await env.DB.prepare("INSERT OR REPLACE INTO feedback(chat_id,content_type,content_id,value,created_at) VALUES(?,?,?,?,CURRENT_TIMESTAMP)").bind(chatId,type,Number(id),Number(value)).run();return send(env,chatId,"谢谢反馈！我会用它改善推荐。");}
}

function chinaDate(){return new Date(Date.now()+8*3600000).toISOString().slice(0,10);}
async function dailyPush(env){
  const today=chinaDate();const {results}=await env.DB.prepare("SELECT chat_id FROM subscribers WHERE last_push IS NULL OR last_push<>?").bind(today).all();
  for(const row of results){try{const type=["joke","duanzi","story","riddle","article"][randomInt(5)];await showContent(env,row.chat_id,type);await env.DB.prepare("UPDATE subscribers SET last_push=? WHERE chat_id=?").bind(today,row.chat_id).run();}catch(e){console.log("push failed",row.chat_id,e.message);}}
}
async function configure(env,origin){
  await tg(env,"setWebhook",{url:`${origin}/telegram`,secret_token:env.WEBHOOK_SECRET,allowed_updates:["message","callback_query"],drop_pending_updates:false});
  await tg(env,"setMyCommands",{commands:[{command:"joke",description:"来个笑话"},{command:"duanzi",description:"来个段子"},{command:"story",description:"每日故事"},{command:"riddle",description:"脑筋急转弯"},{command:"answer",description:"查看答案"},{command:"article",description:"成长文章"},{command:"games",description:"小游戏中心"},{command:"history",description:"使用记录"},{command:"daily",description:"订阅每日推送"},{command:"stop",description:"取消每日推送"},{command:"help",description:"使用帮助"}]});
}

export default {
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    if(url.pathname==="/"||url.pathname==="/health")return Response.json({ok:true,name:"开心一刻 Telegram Bot",platform:"Cloudflare Workers"});
    if(url.pathname==="/setup"){
      if(!env.ADMIN_SECRET||url.searchParams.get("key")!==env.ADMIN_SECRET)return Response.json({ok:false,error:"unauthorized"},{status:403});
      await configure(env,url.origin);return Response.json({ok:true,message:"webhook configured"});
    }
    if(url.pathname==="/telegram"&&request.method==="POST"){
      if(request.headers.get("X-Telegram-Bot-Api-Secret-Token")!==env.WEBHOOK_SECRET)return Response.json({ok:false},{status:403});
      const update=await request.json();ctx.waitUntil(update.message?handleMessage(env,update.message):update.callback_query?handleCallback(env,update.callback_query):Promise.resolve());return Response.json({ok:true});
    }
    return Response.json({ok:false,error:"not_found"},{status:404});
  },
  async scheduled(_event,env,ctx){ctx.waitUntil(dailyPush(env));}
};

export { content, normalizeAnswer, COUNTS };
