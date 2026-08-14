const COUNTS = { joke:120000, duanzi:120000, riddle:120000, story:120000, article:120000, motivation:120000, quote:120000 };
const GAME_COUNT = 120000;
const CURSOR_STEP = 7919;

const SUBJECTS = ["程序员","设计师","产品经理","会计","老师","学生","老板","同事","室友","邻居","快递员","外卖员","摄影师","厨师","理发师","医生","健身教练","客服","司机","网友"];
const SCENES = ["开会迟到","准备下班","排队买饭","参加面试","学习新技能","整理房间","制定计划","赶公交","点外卖","逛超市","看电影","做运动","写报告","准备考试","早起打卡","周一上班","周五下午","出门旅行","查看余额","面对难题"];
const TWISTS = ["先把今天过完，明天的问题让明天排队","计划非常完美，唯一的变量就是我本人","所谓效率，就是把发呆也安排进日程表","生活没有标准答案，但可以先选最开心的","遇事不慌，先喝口水再说","办法总比困难多，只是困难通常先到","我没有拖延，只是在等灵感热身","成年人的稳定，是稳定地想放假","道理我都懂，执行时还需要开个会","不是我不努力，是快乐总在半路拦住我"];
const TONES = ["现场安静两秒，然后笑声准时到达","大家决定先笑再思考","这说明开心也是一种解决方案","生活偶尔也会偷偷写段子","这条快乐记录值得加粗保存","连闹钟都笑得晚响了一分钟","认真生活，也别忘了轻松一下","这个结论值得配一杯奶茶","平凡的一天多了一个开心注脚","听完以后，嘴角已经先同意了"];

const OBJECTS = [["水","越洗别的东西，自己越容易变脏"],["影子","总跟着你，却抓不住"],["名字","属于你，别人却叫得更多"],["年龄","只会增加，很难减少"],["时间","看不见，却能改变一切"],["回声","你说什么，它常回答什么"],["地图","有城市和道路，却住不了人"],["时钟","有脸有手，却没有身体"],["书","不说话，却能讲很多故事"],["镜子","什么都照见，却留不住任何东西"],["铅笔","越工作，身体越短"],["蜡烛","站着流泪，越哭越矮"],["雨伞","下雨时开放，晴天时收拢"],["冰","怕热不怕冷"],["火","吃得越多，长得越大"],["风","摸不到，却能推动树叶"],["云","没有翅膀，也能飘在天空"],["雪","从天上来，落地后慢慢消失"],["门","有口却不会说话"],["窗","不出门，也能看见远方"]];
const PREFIXES = ["安静的","忙碌的","清晨的","夜晚的","下雨天的"];
const FRAMES = ["猜一猜：什么东西","脑筋转个弯：谁","不按常理想：什么","给你十秒：哪样东西","生活谜题：什么","轻松一猜：谁","换个角度看：什么东西","小小谜面：哪位","今天的问题：什么","趣味挑战：谁","想象一下：什么","快速问答：哪样东西","别急着回答：什么","答案就在身边：谁","观察生活：什么东西","聪明人也会停一下：哪样东西","开心猜谜：什么","一分钟谜题：谁","今天动动脑：什么东西","最后一个提示：哪样东西"];
const CONTEXTS = ["在家里","在路上","在清晨","在夜晚","在故事里"];
const HINTS = ["答案来自日常生活","换个角度就不难","别被字面意思骗了","答案可能就在身边","用想象力而不是计算器","先排除最复杂的答案","这是一道轻松题","观察它最明显的特点","答案通常很简单","读完后停三秒再回答","把关键词拆开想一想","先想用途，再想名字"];

const HEROES = ["小林","阿宁","小满","安安","阿树","小禾","晨晨","小夏","乐乐","青青","小远","子墨","小鹿","阿月","小川","宁宁","星星","小南","木木","小雨"];
const PLACES = ["旧车站","山顶邮局","海边灯塔","小镇书店","月光巷","森林小屋","清晨菜场","屋顶花园","河边长椅","深夜便利店","校园操场","老照相馆","雨天站台","安静图书馆","小城电影院","山间茶馆","街角面包店","蓝色渔村","老式钟表店","向日葵田","雪夜小站","巷口理发店","湖边小路","山脚诊所","温暖食堂"];
const STORY_OBJECTS = ["迟到的信","会发光的伞","装着回忆的糖","没有终点的车票","会回答问题的书","温暖的纽扣","不会熄灭的灯","迷路的纸鹤","陌生人留下的照片","会唱歌的石头","慢了十分钟的钟","写满谢谢的纸","收集微笑的风","等待主人的鞋","只能装好消息的盒子","会指向家的硬币","不怕雨的纸花","写着勇气的围巾","记得承诺的杯子","从不抱怨的种子"];
const LESSONS = ["勇气是害怕时仍愿意往前走","认真对待的小事会在意想不到时照亮你","善意送出去后常会换一种方式回来","走得慢没关系，别忘了看见身边的人","每个平凡的人都能成为别人故事里的光","不必等待完美的一天，今天就可以开始","放下答案后才能听见内心的声音","帮助一个人，世界就多一条回家的路","失败不会定义你，再次出发才会","被理解的感觉是很好的礼物","幸福也许就在你愿意珍惜的这一刻","给别人留余地也是给自己留一扇门","成长是学会温柔地和自己相处","希望是在一次次小行动里长出来的","感谢走过的路，也要相信还没到达的远方","真诚的一句话比华丽的安慰更有力量","与其害怕失去，不如好好经历此刻拥有","照顾好自己才有力量把温暖分给别人","不要小看每天的一点进步","真正的告别是带着爱继续生活"];

const TOPICS = ["建立自信","管理时间","克服拖延","稳定情绪","提升专注","养成阅读习惯","有效沟通","学会倾听","目标拆解","持续学习","健康作息","坚持运动","理性消费","整理环境","培养耐心","面对失败","减少内耗","建立边界","练习感恩","复盘成长"];
const ACTIONS = ["从五分钟开始","每天记录一次","只处理最重要的一件事","把目标写得具体","给行动设置固定时间","提前准备环境","减少一个干扰源","完成后及时奖励自己","寻找一位同行伙伴","用问题代替自责","把进步做成清单","允许自己慢一点","先完成再优化","把困难分成三步","睡前做简单复盘","早晨确定今日重点","练习说出真实需求","给自己留出空白","关注可以控制的部分","连续实践七天","用数据观察变化","为意外准备替代方案","主动请求反馈","庆祝微小进步","把经验分享给别人"];
const PERSPECTIVES = ["行动视角","习惯视角","情绪视角","长期视角","复盘视角","微小进步视角","环境设计视角","自我接纳视角","实践反馈视角","持续成长视角"];
const STORY_VARIANTS = ["一次误会让大家重新认识了彼此","一场小雨让等待有了意义","一封回信改变了原来的计划","一个孩子提出了没人想到的问题","一次停电让人们看见了星光","一顿共享的晚餐拉近了距离","一句迟到的道歉解开了心结","一个普通清晨成了新的起点","一次失败反而指明了方向","一位陌生人的帮助留下了温暖","一个旧约定终于被认真完成","一次勇敢的选择带来了转机"];
const ARTICLE_EXERCISES = ["写下今天最值得完成的一件事","关闭通知专注十分钟","把一个大目标拆成三个小步骤","记录一次情绪出现的原因","整理桌面上最碍事的三样物品","读完五页书并写一句总结","向一个人认真表达感谢","拒绝一件超出边界的请求","完成一次十五分钟散步","提前半小时放下手机","列出三件能够控制的事","给明天准备一个最小行动","复盘今天做对的一件事","把自责改写成一个具体问题","主动询问一次真实反馈","为一个好习惯设置明显提示","删除一个无效待办事项","练习两分钟深呼吸","把本周进步写成一句话","给困难准备备用方案","完成一件拖延已久的小事","学习一个能立即使用的小技巧","为自己安排一段无任务时间","把经验分享给需要的人"];
const MOTIVATION_OPENERS = ["别急着否定自己","真正的改变从今天开始","慢一点也没有关系","你走过的路不会白费","先成为自己的支持者","把注意力放回行动","允许自己从零开始","困难不是最终答案","愿你始终保有勇气","每一步都算数","你比想象中更有韧性","今天仍然值得认真对待"];
const MOTIVATION_CORES = ["完成比完美更重要","持续的小行动会积累成真正的改变","低谷期也可以悄悄扎根","不和别人比较，只和昨天的自己对话","把不能控制的放下，把能做的做好","勇气不是不害怕，而是害怕时仍愿前进","方向正确时，慢也是一种进步","休息是为了恢复力量，不是放弃","你可以重新选择自己的下一步","长期主义会奖励耐心的人"];
const MOTIVATION_ENDS = ["现在就做一个最小动作","给自己一点时间，也给未来一点信心","愿你的努力最终有迹可循","先迈出去，答案会在路上出现","今天的坚持会感谢现在的你","把这一页认真写完，再翻到下一页","不必声势浩大，只要持续向前","照顾好自己，再继续出发","请相信微小改变的力量","你正在成为更坚定的自己"];
const VERIFIED_QUOTES = [
  ["千里之行，始于足下。","《道德经》第六十四章"],
  ["学而不思则罔，思而不学则殆。","《论语·为政》"],
  ["三人行，必有我师焉。","《论语·述而》"],
  ["知之为知之，不知为不知，是知也。","《论语·为政》"],
  ["天行健，君子以自强不息。","《周易·乾》"],
  ["锲而不舍，金石可镂。","《荀子·劝学》"],
  ["不积跬步，无以至千里。","《荀子·劝学》"],
  ["业精于勤，荒于嬉。","韩愈《进学解》"],
  ["纸上得来终觉浅，绝知此事要躬行。","陆游《冬夜读书示子聿》"],
  ["山重水复疑无路，柳暗花明又一村。","陆游《游山西村》"],
  ["长风破浪会有时，直挂云帆济沧海。","李白《行路难·其一》"],
  ["沉舟侧畔千帆过，病树前头万木春。","刘禹锡《酬乐天扬州初逢席上见赠》"]
];

const IDIOMS = ["一心一意","意气风发","发扬光大","大快人心","心想事成","成千上万","万事如意","意味深长","长治久安","安居乐业","业精于勤","勤学好问","问心无愧","愧不敢当","当机立断","断章取义","义无反顾","顾全大局","局促不安","安然无恙","肆无忌惮","胆大心细","细水长流","流连忘返","返璞归真","真心实意"];
const CHAR_RIDDLES = [["一口吃掉牛尾巴","告"],["一人一张口，口下长只手","拿"],["大人挑小人","夹"],["山上还有山","出"],["一月七日","脂"],["一边是红，一边是绿，一边怕风，一边怕雨","秋"],["一加一不是二","王"],["需要一半，留下一半","雷"],["十个哥哥","克"],["格外大方","回"],["一百减一","白"],["人在云上","会"],["七十二小时","晶"],["两点天上来","关"]];

const HELP = `🎉 欢迎来到「开心一刻」！

/joke — 笑话
/duanzi — 段子
/story — 故事
/riddle — 脑筋急转弯
/answer — 查看答案
/article — 成长文章
/motivation — 励志文案
/quote — 名人名言（标注出处）
/games — 小游戏
/history — 使用记录
/daily — 订阅每日推送
/stop — 取消推送`;

const mainKeyboard = { inline_keyboard: [
  [{text:"😂 笑话",callback_data:"content:joke"},{text:"😄 段子",callback_data:"content:duanzi"}],
  [{text:"📖 故事",callback_data:"content:story"},{text:"🧠 急转弯",callback_data:"content:riddle"}],
  [{text:"🌱 成长文章",callback_data:"content:article"},{text:"🔥 励志文案",callback_data:"content:motivation"}],
  [{text:"📜 名人名言",callback_data:"content:quote"},{text:"🎮 小游戏",callback_data:"menu:games"}],
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
    const [answer,clue]=OBJECTS[id%20], prefix=PREFIXES[Math.floor(id/20)%5], frame=FRAMES[Math.floor(id/100)%20], context=CONTEXTS[Math.floor(id/2000)%5], hint=HINTS[Math.floor(id/10000)%12];
    return {id,type,title:"脑筋急转弯",body:`${context}，${frame}带着${prefix}气质，${clue}？\n提示：${hint}。`,answer};
  }
  if (type === "story") {
    const hero=HEROES[id%20], place=PLACES[Math.floor(id/20)%25], obj=STORY_OBJECTS[Math.floor(id/500)%20], variant=STORY_VARIANTS[Math.floor(id/10000)%12], lesson=LESSONS[Math.floor(id/500)%20];
    return {id,type,title:`${place}里的${obj}｜${String(id+1).padStart(6,"0")}`,body:`${hero}在${place}意外发现了一件${obj}。起初大家都觉得它平平无奇，但${hero}愿意停下来，认真听完它背后的故事。后来，${variant}。\n\n那天以后，${place}多了一个小小的约定：无论谁经过，都会为下一个人留下一点善意。\n\n${hero}终于明白：${lesson}。`};
  }
  if (type === "article") {
    const topic=TOPICS[id%20], action=ACTIONS[Math.floor(id/20)%25], perspective=PERSPECTIVES[Math.floor(id/500)%10], exercise=ARTICLE_EXERCISES[Math.floor(id/5000)%24];
    return {id,type,title:`${topic}：${action}｜${String(id+1).padStart(6,"0")}`,body:`【${perspective}】\n提升自己不需要一次完成巨大改变。面对“${topic}”，更有效的方法是${action}。先选一个今天能完成的小动作，让开始不再依赖情绪。\n\n今日练习：${exercise}。\n行动后记录事实：做了什么、遇到什么阻力、下次如何调整。稳定成长来自可重复的过程，而不是偶尔爆发的意志力。`};
  }
  if (type === "motivation") {
    const opener=MOTIVATION_OPENERS[id%12], core=MOTIVATION_CORES[Math.floor(id/12)%10], end=MOTIVATION_ENDS[Math.floor(id/120)%10];
    return {id,type,title:`励志文案 ${String(id+1).padStart(6,"0")}`,body:`${opener}。${core}；${end}。\n\n【成长编号 M-${String(id+1).padStart(6,"0")}】`};
  }
  const [quote,source]=VERIFIED_QUOTES[id%12], topic=TOPICS[Math.floor(id/12)%20], action=ACTIONS[Math.floor(id/240)%25], perspective=PERSPECTIVES[Math.floor(id/6000)%10];
  return {id,type,title:`名言与行动 ${String(id+1).padStart(6,"0")}`,body:`“${quote}”\n——${source}\n\n【${perspective}】把它用在“${topic}”上：${action}。\n【研习编号 Q-${String(id+1).padStart(6,"0")}】`};
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
async function nextUniqueId(env,chatId,type,count){
  let row=await env.DB.prepare("SELECT offset,position FROM content_cursor WHERE chat_id=? AND content_type=?").bind(chatId,type).first();
  if(!row){row={offset:randomInt(count),position:0};await env.DB.prepare("INSERT INTO content_cursor(chat_id,content_type,offset,position) VALUES(?,?,?,0)").bind(chatId,type,row.offset).run();}
  const id=(Number(row.offset)+(Number(row.position)%count)*CURSOR_STEP)%count;
  await env.DB.prepare("UPDATE content_cursor SET position=position+1 WHERE chat_id=? AND content_type=?").bind(chatId,type).run();
  return id;
}
async function randomContent(env,chatId,type){
  const id=await nextUniqueId(env,chatId,type,COUNTS[type]);
  await remember(env,chatId,type,id); return content(type,id);
}
async function showContent(env,chatId,type){
  const item=await randomContent(env,chatId,type);
  if(type==="riddle"){
    await env.DB.prepare("INSERT INTO user_state(chat_id,kind,data,updated_at) VALUES(?,'riddle',?,CURRENT_TIMESTAMP) ON CONFLICT(chat_id) DO UPDATE SET kind='riddle',data=excluded.data,updated_at=CURRENT_TIMESTAMP").bind(chatId,JSON.stringify({answer:item.answer,id:item.id})).run();
    return send(env,chatId,`🧠 脑筋急转弯\n\n${item.body}\n\n直接发送答案，或发送 /answer 查看。`);
  }
  const icons={joke:"😂",duanzi:"😄",story:"📖",article:"🌱",motivation:"🔥",quote:"📜"};
  return send(env,chatId,`${icons[type]} ${item.title}\n\n${item.body}`,feedbackKeyboard(item));
}

async function startGame(env,chatId,game){
  let data,prompt;const challengeId=await nextUniqueId(env,chatId,`game:${game}`,GAME_COUNT);const label=`【挑战 G-${game}-${String(challengeId+1).padStart(6,"0")}】`;
  if(game==="number"){data={target:(challengeId*37%100)+1,attempts:0};prompt=`🎯 我想好了 1—100 之间的数字，直接发数字来猜！\n${label}`;}
  else if(game==="math"){const a=(challengeId*17%91)+5,b=(challengeId*29%47)+2;data={target:a+b,attempts:0};prompt=`🧮 算术挑战：${a} + ${b} = ？\n${label}`;}
  else if(game==="rps"){data={challengeId};prompt=`✊ 发送“石头”、“剪刀”或“布”。\n${label}`;}
  else if(game==="idiom"){const eligible=IDIOMS.filter(x=>IDIOMS.some(y=>y.startsWith(x.at(-1))));const current=eligible[challengeId%eligible.length];data={current};prompt=`🔗 成语接龙开始！\n我先来：${current}\n请发送以“${current.at(-1)}”开头的成语。\n${label}`;}
  else {const [clue,answer]=CHAR_RIDDLES[challengeId%CHAR_RIDDLES.length];data={answer};prompt=`🆎 猜字游戏\n谜面：${clue}\n请直接发送一个汉字。\n${label}`;}
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
  if(cmd==="/motivation"||text.includes("励志文案"))return showContent(env,chatId,"motivation");
  if(cmd==="/quote"||text.includes("名人名言")||text==="名言")return showContent(env,chatId,"quote");
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
  for(const row of results){try{const types=["joke","duanzi","story","riddle","article","motivation","quote"],type=types[randomInt(types.length)];await showContent(env,row.chat_id,type);await env.DB.prepare("UPDATE subscribers SET last_push=? WHERE chat_id=?").bind(today,row.chat_id).run();}catch(e){console.log("push failed",row.chat_id,e.message);}}
}
async function configure(env,origin){
  await tg(env,"setWebhook",{url:`${origin}/telegram`,secret_token:env.WEBHOOK_SECRET,allowed_updates:["message","callback_query"],drop_pending_updates:false});
  await tg(env,"setMyCommands",{commands:[{command:"joke",description:"来个笑话"},{command:"duanzi",description:"来个段子"},{command:"story",description:"每日故事"},{command:"riddle",description:"脑筋急转弯"},{command:"answer",description:"查看答案"},{command:"article",description:"成长文章"},{command:"motivation",description:"励志文案"},{command:"quote",description:"名人名言"},{command:"games",description:"小游戏中心"},{command:"history",description:"使用记录"},{command:"daily",description:"订阅每日推送"},{command:"stop",description:"取消每日推送"},{command:"help",description:"使用帮助"}]});
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

export { content, normalizeAnswer, COUNTS, GAME_COUNT };
