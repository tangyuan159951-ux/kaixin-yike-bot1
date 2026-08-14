#!/usr/bin/env python3
"""A dependency-free Chinese entertainment bot for Telegram."""

from __future__ import annotations

import json
import os
import random
import re
import signal
import sqlite3
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()
API = f"https://api.telegram.org/bot{TOKEN}"
PUSH_TIME = os.environ.get("DAILY_PUSH_TIME", "09:00")
TIMEZONE = os.environ.get("BOT_TIMEZONE", "Asia/Shanghai")
DB_PATH = Path(os.environ.get("BOT_DB_PATH", "data/bot.db"))
CONTENT_DB_PATH = Path(os.environ.get("CONTENT_DB_PATH", "content.db"))
STATE_API_URL = os.environ.get("STATE_API_URL", "").rstrip("/")
STATE_API_KEY = os.environ.get("STATE_API_KEY", "").strip()
RUNNING = True
CLOUD_LOCK = threading.Lock()

JOKES = [
    "朋友问我为什么总低头看手机。我说：因为知识都在云端，我得仰望它的倒影。",
    "我去面试，老板问：你最大的优点是什么？我说：实事求是。老板：这算优点吗？我：我也不知道。",
    "为什么程序员分不清万圣节和圣诞节？因为 OCT 31 等于 DEC 25。",
    "我决定每天跑步五公里。第一天跑了两公里，剩下三公里决定明天再跑。",
    "今天给盆栽讲了个笑话，它没笑。看来是个植物人。",
    "老板说公司像家一样。我一听很感动，于是穿着睡衣来上班了。",
    "我问风扇为什么总摇头，它说：这工作，我不同意。",
    "减肥最大的敌人不是食欲，而是那句：来都来了。",
]

STORIES = [
    "【会发光的雨伞】\n小镇连续下了七天雨。修伞匠阿树发现，每修好一把旧伞，伞面就会亮起一颗小星星。第八天夜里停电了，街坊们撑起修好的伞，把整条回家的路照得像银河。阿树这才明白：认真修补过的东西，也会反过来照亮你。",
    "【最后一颗糖】\n小满每天都会在书包里放两颗糖，一颗给自己，一颗留给可能遇见的坏心情。那天她没遇见坏心情，却遇见一个在车站哭泣的小孩。糖送出去后，小孩笑了。回家路上，小满发现自己的那颗糖好像更甜了。",
    "【迟到的邮差】\n老邮差退休前送出最后一封信。信寄往三十年前，收件人正是年轻时的自己。信上只有一句：别怕走慢，只要别错过沿途的人。那天他第一次没有看表，慢慢走回家，夕阳刚好。",
    "【月亮便利店】\n午夜十二点，巷口会出现一家只卖愿望的便利店。有人买勇气，有人买好运。女孩小禾却用所有硬币买了一句“没关系”。后来每逢失败，她就把这句话送给自己。奇怪的是，愿望竟从那以后一个个实现了。",
]

RIDDLES = [
    ("什么东西越洗越脏？", "水。"),
    ("什么门永远关不上？", "球门。"),
    ("什么东西有头有尾，却没有身体？", "硬币。"),
    ("哪一种路不能走？", "电路。"),
    ("什么布剪不断？", "瀑布。"),
    ("什么东西明明是你的，别人却用得比你多？", "你的名字。"),
]

HELP = """🎉 欢迎来到「开心一刻」！

我能给你送上笑话、暖心小故事和脑筋急转弯。

/joke — 来个笑话
/duanzi — 来个段子
/story — 今日故事
/riddle — 脑筋急转弯
/answer — 查看上一题答案
/article — 提升自我的文章
/games — 打开小游戏中心
/history — 查看使用记录
/daily — 订阅每日推送
/stop — 取消每日推送
/help — 查看帮助

也可以直接发送“笑话”“故事”“脑筋急转弯”。"""

MAIN_KEYBOARD = json.dumps({"inline_keyboard": [
    [{"text": "😂 笑话", "callback_data": "content:joke"}, {"text": "😄 段子", "callback_data": "content:duanzi"}],
    [{"text": "📖 故事", "callback_data": "content:story"}, {"text": "🧠 急转弯", "callback_data": "content:riddle"}],
    [{"text": "🌱 成长文章", "callback_data": "content:article"}, {"text": "🎮 小游戏", "callback_data": "menu:games"}],
    [{"text": "🔔 订阅每日推送", "callback_data": "action:daily"}],
]}, ensure_ascii=False)

GAMES_KEYBOARD = json.dumps({"inline_keyboard": [
    [{"text": "🎯 猜数字", "callback_data": "game:number"}, {"text": "✊ 石头剪刀布", "callback_data": "game:rps"}],
    [{"text": "🧮 算术挑战", "callback_data": "game:math"}, {"text": "🔗 成语接龙", "callback_data": "game:idiom"}],
    [{"text": "🆎 猜字游戏", "callback_data": "game:char"}, {"text": "⬅️ 返回主菜单", "callback_data": "menu:main"}],
]}, ensure_ascii=False)

IDIOMS = [
    "一心一意", "意气风发", "发扬光大", "大快人心", "心想事成", "成千上万", "万事如意",
    "意味深长", "长治久安", "安居乐业", "业精于勤", "勤学好问", "问心无愧", "愧不敢当",
    "当机立断", "断章取义", "义无反顾", "顾全大局", "局促不安", "安然无恙", "恙无忌惮",
    "肆无忌惮", "胆大心细", "细水长流", "流连忘返", "返璞归真", "真心实意",
]

CHAR_RIDDLES = [
    ("一口吃掉牛尾巴", "告"), ("一人一张口，口下长只手", "拿"),
    ("大人挑小人", "夹"), ("山上还有山", "出"), ("一月七日", "脂"),
    ("一边是红，一边是绿，一边怕风，一边怕雨", "秋"),
    ("一加一不是二", "王"), ("需要一半，留下一半", "雷"),
    ("十个哥哥", "克"), ("格外大方", "回"), ("一百减一", "白"),
    ("人在云上", "会"), ("七十二小时", "晶"), ("两点天上来", "关"),
]


def db() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.execute("CREATE TABLE IF NOT EXISTS subscribers (chat_id INTEGER PRIMARY KEY, last_push TEXT)")
    conn.execute("CREATE TABLE IF NOT EXISTS state (chat_id INTEGER PRIMARY KEY, answer TEXT)")
    conn.execute("CREATE TABLE IF NOT EXISTS seen (chat_id INTEGER, content_id INTEGER, seen_at TEXT DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(chat_id, content_id))")
    conn.execute("CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY, chat_id INTEGER, action TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)")
    conn.execute("CREATE TABLE IF NOT EXISTS feedback (chat_id INTEGER, content_id INTEGER, value INTEGER, created_at TEXT DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(chat_id, content_id))")
    conn.execute("CREATE TABLE IF NOT EXISTS game_state (chat_id INTEGER PRIMARY KEY, game TEXT, target TEXT, attempts INTEGER DEFAULT 0)")
    return conn


def cloud_restore() -> None:
    """Restore mutable SQLite tables from the optional Cloudflare D1 state API."""
    if not STATE_API_URL or not STATE_API_KEY:
        return
    req = urllib.request.Request(STATE_API_URL, headers={"Authorization": f"Bearer {STATE_API_KEY}"})
    try:
        with urllib.request.urlopen(req, timeout=20) as res:
            payload = json.load(res)
        if not payload.get("ok") or not payload.get("data"):
            return
        tables = payload["data"]
        with db() as conn:
            for table in ("subscribers", "state", "seen", "history", "feedback", "game_state"):
                rows = tables.get(table, [])
                if not rows:
                    continue
                columns = list(rows[0])
                conn.execute(f"DELETE FROM {table}")
                marks = ",".join("?" for _ in columns)
                names = ",".join(columns)
                conn.executemany(f"INSERT OR REPLACE INTO {table}({names}) VALUES({marks})", [[r.get(c) for c in columns] for r in rows])
        print("已从 Cloudflare D1 恢复机器人数据。", flush=True)
    except Exception as exc:
        print(f"云数据恢复失败，继续使用本地数据：{exc}", flush=True)


def cloud_backup() -> None:
    """Snapshot mutable state to the optional Cloudflare D1 state API."""
    if not STATE_API_URL or not STATE_API_KEY:
        return
    with CLOUD_LOCK:
        tables = {}
        with db() as conn:
            conn.row_factory = sqlite3.Row
            for table in ("subscribers", "state", "seen", "history", "feedback", "game_state"):
                tables[table] = [dict(row) for row in conn.execute(f"SELECT * FROM {table}")]
        raw = json.dumps({"data": tables}, ensure_ascii=False).encode()
        req = urllib.request.Request(STATE_API_URL, data=raw, method="PUT", headers={
            "Authorization": f"Bearer {STATE_API_KEY}", "Content-Type": "application/json"
        })
        try:
            with urllib.request.urlopen(req, timeout=30) as res:
                if res.status >= 300:
                    raise RuntimeError(f"HTTP {res.status}")
        except Exception as exc:
            print(f"云数据备份失败：{exc}", flush=True)


def random_content(kind: str, chat_id: int | None = None):
    if not CONTENT_DB_PATH.exists():
        return None
    with sqlite3.connect(CONTENT_DB_PATH) as content_conn:
        total = content_conn.execute("SELECT COUNT(*) FROM content WHERE type=?", (kind,)).fetchone()[0]
        if not total:
            return None
        excluded = set()
        if chat_id is not None:
            with db() as state_conn:
                excluded = {r[0] for r in state_conn.execute(
                    "SELECT content_id FROM seen WHERE chat_id=? ORDER BY seen_at DESC LIMIT 5000", (chat_id,)
                )}
        row = None
        for _ in range(25):
            offset = random.randrange(total)
            candidate = content_conn.execute(
                "SELECT id,title,body,answer FROM content WHERE type=? LIMIT 1 OFFSET ?", (kind, offset)
            ).fetchone()
            if candidate and candidate[0] not in excluded:
                row = candidate
                break
        if row is None:
            row = content_conn.execute("SELECT id,title,body,answer FROM content WHERE type=? ORDER BY RANDOM() LIMIT 1", (kind,)).fetchone()
    if row and chat_id is not None:
        with db() as conn:
            conn.execute("INSERT OR REPLACE INTO seen(chat_id,content_id,seen_at) VALUES(?,?,CURRENT_TIMESTAMP)", (chat_id, row[0]))
            conn.execute("INSERT INTO history(chat_id,action) VALUES(?,?)", (chat_id, kind))
    return row


def api(method: str, **params):
    data = urllib.parse.urlencode(params).encode()
    req = urllib.request.Request(f"{API}/{method}", data=data)
    try:
        with urllib.request.urlopen(req, timeout=40) as res:
            payload = json.load(res)
    except (urllib.error.URLError, TimeoutError) as exc:
        raise RuntimeError(f"Telegram API request failed: {exc}") from exc
    if not payload.get("ok"):
        raise RuntimeError(payload.get("description", "Telegram API error"))
    return payload.get("result")


def send(chat_id: int, text: str, reply_markup: str | None = None) -> None:
    params = {"chat_id": chat_id, "text": text}
    if reply_markup:
        params["reply_markup"] = reply_markup
    api("sendMessage", **params)


def feedback_keyboard(content_id: int) -> str:
    return json.dumps({"inline_keyboard": [[
        {"text": "👍 喜欢", "callback_data": f"feedback:{content_id}:1"},
        {"text": "👎 不喜欢", "callback_data": f"feedback:{content_id}:-1"},
    ]]}, ensure_ascii=False)


def subscribe(chat_id: int) -> None:
    with db() as conn:
        conn.execute("INSERT OR IGNORE INTO subscribers(chat_id, last_push) VALUES (?, NULL)", (chat_id,))


def unsubscribe(chat_id: int) -> None:
    with db() as conn:
        conn.execute("DELETE FROM subscribers WHERE chat_id = ?", (chat_id,))


def new_riddle(chat_id: int) -> str:
    item = random_content("riddle", chat_id)
    if item:
        content_id, _, question, answer = item
    else:
        question, answer = random.choice(RIDDLES)
    with db() as conn:
        conn.execute(
            "INSERT INTO state(chat_id, answer) VALUES (?, ?) ON CONFLICT(chat_id) DO UPDATE SET answer=excluded.answer",
            (chat_id, json.dumps({"answer": answer, "content_id": content_id if item else 0}, ensure_ascii=False)),
        )
    return f"🧠 脑筋急转弯\n\n{question}\n\n想好后发送 /answer 查看答案。"


def answer(chat_id: int) -> str:
    with db() as conn:
        row = conn.execute("SELECT answer FROM state WHERE chat_id = ?", (chat_id,)).fetchone()
    if not row:
        return "你还没有题目，先发送 /riddle 吧。"
    try:
        expected = json.loads(row[0])["answer"]
    except (json.JSONDecodeError, TypeError, KeyError):
        expected = row[0]
    return f"💡 答案：{expected}"


def normalize_answer(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"^(我猜|答案是|我觉得是|应该是)", "", value)
    return re.sub(r"[\s，。！？、,.!?：:；;‘’“”'\"（）()]", "", value)


def judge_answer(chat_id: int, text: str):
    with db() as conn:
        row = conn.execute("SELECT answer FROM state WHERE chat_id = ?", (chat_id,)).fetchone()
        if not row:
            return None
        try:
            expected = json.loads(row[0])["answer"]
        except (json.JSONDecodeError, TypeError, KeyError):
            expected = row[0]
        actual_n, expected_n = normalize_answer(text), normalize_answer(expected)
        aliases = {expected_n, expected_n.removeprefix("你的"), expected_n.removeprefix("一个")}
        if actual_n in aliases or (len(actual_n) >= 2 and any(actual_n in a or a in actual_n for a in aliases)):
            conn.execute("DELETE FROM state WHERE chat_id = ?", (chat_id,))
            return "🎉 回答正确！真棒！发送 /riddle 再挑战一道。"
    return "还不对，再想一想～也可以发送 /answer 查看答案。"


def start_game(chat_id: int, game: str) -> str:
    if game == "number":
        target, prompt = str(random.randint(1, 100)), "🎯 我想好了 1—100 之间的数字，直接发数字来猜！"
    elif game == "math":
        a, b = random.randint(5, 50), random.randint(2, 20)
        target, prompt = str(a + b), f"🧮 算术挑战：{a} + {b} = ？"
    elif game == "rps":
        target, prompt = "rps", "✊ 发送“石头”、“剪刀”或“布”。"
    elif game == "idiom":
        target = random.choice([x for x in IDIOMS if any(y.startswith(x[-1]) for y in IDIOMS)])
        prompt = f"🔗 成语接龙开始！\n我先来：{target}\n请发送以“{target[-1]}”开头的成语。"
    else:
        clue, target = random.choice(CHAR_RIDDLES)
        prompt = f"🆎 猜字游戏\n谜面：{clue}\n请直接发送一个汉字。"
    with db() as conn:
        conn.execute("INSERT OR REPLACE INTO game_state(chat_id,game,target,attempts) VALUES(?,?,?,0)", (chat_id, game, target))
        conn.execute("INSERT INTO history(chat_id,action) VALUES(?,?)", (chat_id, f"game:{game}"))
    return prompt


def play_game(chat_id: int, text: str):
    with db() as conn:
        row = conn.execute("SELECT game,target,attempts FROM game_state WHERE chat_id=?", (chat_id,)).fetchone()
        if not row:
            return None
        game, target, attempts = row
        if game == "rps":
            choice = text.replace(" ", "")
            if choice not in {"石头", "剪刀", "布"}:
                return "请发送：石头、剪刀或布。"
            mine = random.choice(["石头", "剪刀", "布"])
            winning_pairs = {("\u77f3\u5934", "\u526a\u5200"), ("\u526a\u5200", "\u5e03"), ("\u5e03", "\u77f3\u5934")}
            result = "平局" if choice == mine else ("你赢了！" if (choice, mine) in winning_pairs else "我赢了～")
            conn.execute("DELETE FROM game_state WHERE chat_id=?", (chat_id,))
            return f"我出：{mine}\n{result} 发送 /games 再来一局。"
        if game == "char":
            if normalize_answer(text) == normalize_answer(target):
                conn.execute("DELETE FROM game_state WHERE chat_id=?", (chat_id,))
                return "🎉 猜对了！发送 /games 再玩一题。"
            return "还不对，再看看谜面～"
        if game == "idiom":
            value = text.strip().replace(" ", "")
            if len(value) != 4 or value not in IDIOMS:
                return f"请发送一个以“{target[-1]}”开头的四字成语。"
            if value[0] != target[-1]:
                return f"没接上哦，需要以“{target[-1]}”开头。"
            candidates = [x for x in IDIOMS if x[0] == value[-1] and x != value and any(y.startswith(x[-1]) for y in IDIOMS)]
            if not candidates:
                conn.execute("DELETE FROM game_state WHERE chat_id=?", (chat_id,))
                return f"你接：{value}\n🎉 你把我难住了，你赢了！"
            mine = random.choice(candidates)
            conn.execute("UPDATE game_state SET target=?, attempts=attempts+1 WHERE chat_id=?", (mine, chat_id))
            return f"接得好！我接：{mine}\n请发送以“{mine[-1]}”开头的成语。"
        if not re.fullmatch(r"-?\d+", text.strip()):
            return "请直接发送一个数字。"
        value, goal = int(text), int(target)
        attempts += 1
        if value == goal:
            conn.execute("DELETE FROM game_state WHERE chat_id=?", (chat_id,))
            return f"🎉 答对了！你用了 {attempts} 次。发送 /games 继续玩。"
        conn.execute("UPDATE game_state SET attempts=? WHERE chat_id=?", (attempts, chat_id))
        if game == "math":
            return "还不对，再算一次～"
        return "大了，再猜！" if value > goal else "小了，再猜！"


def handle(message: dict) -> None:
    chat_id = message.get("chat", {}).get("id")
    text = (message.get("text") or "").strip()
    if not chat_id or not text:
        return
    command = text.split()[0].split("@")[0].lower()
    if command in {"/start", "/help"}:
        send(chat_id, HELP, MAIN_KEYBOARD)
    elif command == "/joke" or "笑话" in text:
        item = random_content("joke", chat_id)
        send(chat_id, f"😂 开心笑话\n\n{item[2] if item else random.choice(JOKES)}", feedback_keyboard(item[0]) if item else None)
    elif command == "/duanzi" or "段子" in text:
        item = random_content("duanzi", chat_id)
        send(chat_id, f"😄 轻松段子\n\n{item[2] if item else random.choice(JOKES)}", feedback_keyboard(item[0]) if item else None)
    elif command == "/story" or "故事" in text:
        item = random_content("story", chat_id)
        send(chat_id, f"📖 每日故事\n\n{item[2] if item else random.choice(STORIES)}", feedback_keyboard(item[0]) if item else None)
    elif command == "/riddle" or "急转弯" in text or "猜谜" in text:
        send(chat_id, new_riddle(chat_id))
    elif command == "/answer" or text == "答案":
        send(chat_id, answer(chat_id))
    elif command == "/article" or "提升" in text or "成长文章" in text:
        item = random_content("article", chat_id)
        send(chat_id, f"🌱 {item[1]}\n\n{item[2]}" if item else "文章库正在准备中。", feedback_keyboard(item[0]) if item else None)
    elif command in {"/games", "/game"} or text == "小游戏":
        send(chat_id, "🎮 小游戏中心\n选择一个游戏开始：", GAMES_KEYBOARD)
    elif command == "/history":
        with db() as conn:
            rows = conn.execute("SELECT action,COUNT(*) FROM history WHERE chat_id=? GROUP BY action ORDER BY COUNT(*) DESC LIMIT 10", (chat_id,)).fetchall()
        send(chat_id, "📊 你的使用记录\n\n" + ("\n".join(f"{name}：{count} 次" for name, count in rows) if rows else "还没有记录。"))
    elif command == "/daily":
        subscribe(chat_id)
        send(chat_id, f"🔔 已订阅每日推送！每天 {PUSH_TIME}（{TIMEZONE}）见。")
    elif command == "/stop":
        unsubscribe(chat_id)
        send(chat_id, "🔕 已取消每日推送。想念我时随时发送 /daily。")
    else:
        played = play_game(chat_id, text)
        judged = None if played else judge_answer(chat_id, text)
        send(chat_id, played or judged or "我暂时没听懂～发送 /help 看看我会什么。")


def handle_callback(callback: dict) -> None:
    callback_id = callback.get("id")
    message = callback.get("message", {})
    chat_id = message.get("chat", {}).get("id")
    data = callback.get("data", "")
    if not chat_id:
        return
    try:
        api("answerCallbackQuery", callback_query_id=callback_id)
    except RuntimeError:
        pass
    if data == "menu:main":
        send(chat_id, "🎉 开心一刻主菜单", MAIN_KEYBOARD)
    elif data == "menu:games":
        send(chat_id, "🎮 选择一个小游戏：", GAMES_KEYBOARD)
    elif data.startswith("game:"):
        send(chat_id, start_game(chat_id, data.split(":", 1)[1]))
    elif data == "action:daily":
        subscribe(chat_id)
        send(chat_id, f"🔔 已订阅！每天 {PUSH_TIME}（{TIMEZONE}）见。")
    elif data.startswith("feedback:"):
        _, content_id, value = data.split(":")
        with db() as conn:
            conn.execute("INSERT OR REPLACE INTO feedback(chat_id,content_id,value) VALUES(?,?,?)", (chat_id, int(content_id), int(value)))
        send(chat_id, "谢谢反馈！我会用它改善推荐。")
    elif data.startswith("content:"):
        kind = data.split(":", 1)[1]
        if kind == "riddle":
            send(chat_id, new_riddle(chat_id))
            return
        item = random_content(kind, chat_id)
        if not item:
            send(chat_id, "内容库正在准备中。")
            return
        icons = {"joke": "😂 开心笑话", "duanzi": "😄 轻松段子", "story": "📖 每日故事", "article": f"🌱 {item[1]}"}
        send(chat_id, f"{icons[kind]}\n\n{item[2]}", feedback_keyboard(item[0]))


def push_daily() -> None:
    now = datetime.now(ZoneInfo(TIMEZONE))
    today = now.date().isoformat()
    # External free monitors may arrive a few minutes late. Send on the first
    # check at or after the configured time; last_push prevents duplicates.
    if now.strftime("%H:%M") < PUSH_TIME:
        return
    with db() as conn:
        rows = conn.execute("SELECT chat_id FROM subscribers WHERE last_push IS NULL OR last_push != ?", (today,)).fetchall()
        for (chat_id,) in rows:
            try:
                choice = random.choice(["joke", "duanzi", "story", "riddle", "article"])
                if choice == "joke":
                    item = random_content("joke", chat_id)
                    send(chat_id, f"☀️ 今日份快乐\n\n{item[2] if item else random.choice(JOKES)}")
                elif choice == "duanzi":
                    item = random_content("duanzi", chat_id)
                    send(chat_id, f"☀️ 今日段子\n\n{item[2] if item else random.choice(JOKES)}")
                elif choice == "story":
                    item = random_content("story", chat_id)
                    send(chat_id, f"☀️ 今日小故事\n\n{item[2] if item else random.choice(STORIES)}")
                elif choice == "article":
                    item = random_content("article", chat_id)
                    send(chat_id, f"🌱 {item[1]}\n\n{item[2]}" if item else "今天也要继续成长。")
                else:
                    send(chat_id, new_riddle(chat_id))
                conn.execute("UPDATE subscribers SET last_push = ? WHERE chat_id = ?", (today, chat_id))
                conn.commit()
            except RuntimeError as exc:
                print(f"Push failed for chat {chat_id}: {exc}", flush=True)


def setup() -> None:
    api("deleteWebhook", drop_pending_updates="false")
    setup_commands_only()


def setup_commands_only() -> None:
    commands = json.dumps([
        {"command": "joke", "description": "来个笑话"},
        {"command": "duanzi", "description": "来个段子"},
        {"command": "story", "description": "今日故事"},
        {"command": "riddle", "description": "脑筋急转弯"},
        {"command": "answer", "description": "查看答案"},
        {"command": "article", "description": "提升自我的文章"},
        {"command": "games", "description": "小游戏中心"},
        {"command": "history", "description": "使用记录"},
        {"command": "daily", "description": "订阅每日推送"},
        {"command": "stop", "description": "取消每日推送"},
        {"command": "help", "description": "使用帮助"},
    ], ensure_ascii=False)
    api("setMyCommands", commands=commands)


def main() -> None:
    global RUNNING
    if not TOKEN:
        raise SystemExit("请先设置 TELEGRAM_BOT_TOKEN 环境变量。")
    signal.signal(signal.SIGTERM, lambda *_: globals().__setitem__("RUNNING", False))
    signal.signal(signal.SIGINT, lambda *_: globals().__setitem__("RUNNING", False))
    setup()
    print(f"开心一刻机器人已启动，每日推送时间：{PUSH_TIME} {TIMEZONE}", flush=True)
    offset = 0
    last_push_check = 0.0
    while RUNNING:
        if time.monotonic() - last_push_check >= 20:
            push_daily()
            last_push_check = time.monotonic()
        try:
            updates = api("getUpdates", offset=offset, timeout=25, allowed_updates=json.dumps(["message", "callback_query"]))
            for update in updates:
                offset = max(offset, update["update_id"] + 1)
                if "message" in update:
                    handle(update["message"])
                elif "callback_query" in update:
                    handle_callback(update["callback_query"])
        except RuntimeError as exc:
            print(exc, flush=True)
            time.sleep(3)


if __name__ == "__main__":
    main()
