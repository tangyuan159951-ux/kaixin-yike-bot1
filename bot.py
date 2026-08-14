#!/usr/bin/env python3
"""A dependency-free Chinese entertainment bot for Telegram."""

from __future__ import annotations

import json
import os
import random
import re
import signal
import sqlite3
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
RUNNING = True

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
/daily — 订阅每日推送
/stop — 取消每日推送
/help — 查看帮助

也可以直接发送“笑话”“故事”“脑筋急转弯”。"""


def db() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.execute("CREATE TABLE IF NOT EXISTS subscribers (chat_id INTEGER PRIMARY KEY, last_push TEXT)")
    conn.execute("CREATE TABLE IF NOT EXISTS state (chat_id INTEGER PRIMARY KEY, answer TEXT)")
    return conn


def random_content(kind: str):
    if not CONTENT_DB_PATH.exists():
        return None
    with sqlite3.connect(CONTENT_DB_PATH) as conn:
        return conn.execute(
            "SELECT title, body, answer FROM content WHERE type = ? ORDER BY RANDOM() LIMIT 1",
            (kind,),
        ).fetchone()


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


def send(chat_id: int, text: str) -> None:
    api("sendMessage", chat_id=chat_id, text=text)


def subscribe(chat_id: int) -> None:
    with db() as conn:
        conn.execute("INSERT OR IGNORE INTO subscribers(chat_id, last_push) VALUES (?, NULL)", (chat_id,))


def unsubscribe(chat_id: int) -> None:
    with db() as conn:
        conn.execute("DELETE FROM subscribers WHERE chat_id = ?", (chat_id,))


def new_riddle(chat_id: int) -> str:
    item = random_content("riddle")
    if item:
        _, question, answer = item
    else:
        question, answer = random.choice(RIDDLES)
    with db() as conn:
        conn.execute(
            "INSERT INTO state(chat_id, answer) VALUES (?, ?) ON CONFLICT(chat_id) DO UPDATE SET answer=excluded.answer",
            (chat_id, answer),
        )
    return f"🧠 脑筋急转弯\n\n{question}\n\n想好后发送 /answer 查看答案。"


def answer(chat_id: int) -> str:
    with db() as conn:
        row = conn.execute("SELECT answer FROM state WHERE chat_id = ?", (chat_id,)).fetchone()
    return f"💡 答案：{row[0]}" if row else "你还没有题目，先发送 /riddle 吧。"


def normalize_answer(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"^(我猜|答案是|我觉得是|应该是)", "", value)
    return re.sub(r"[\s，。！？、,.!?：:；;‘’“”'\"（）()]", "", value)


def judge_answer(chat_id: int, text: str):
    with db() as conn:
        row = conn.execute("SELECT answer FROM state WHERE chat_id = ?", (chat_id,)).fetchone()
        if not row:
            return None
        expected = row[0]
        if normalize_answer(text) == normalize_answer(expected):
            conn.execute("DELETE FROM state WHERE chat_id = ?", (chat_id,))
            return "🎉 回答正确！真棒！发送 /riddle 再挑战一道。"
    return "还不对，再想一想～也可以发送 /answer 查看答案。"


def handle(message: dict) -> None:
    chat_id = message.get("chat", {}).get("id")
    text = (message.get("text") or "").strip()
    if not chat_id or not text:
        return
    command = text.split()[0].split("@")[0].lower()
    if command in {"/start", "/help"}:
        send(chat_id, HELP)
    elif command == "/joke" or "笑话" in text:
        item = random_content("joke")
        send(chat_id, f"😂 开心笑话\n\n{item[1] if item else random.choice(JOKES)}")
    elif command == "/duanzi" or "段子" in text:
        item = random_content("duanzi")
        send(chat_id, f"😄 轻松段子\n\n{item[1] if item else random.choice(JOKES)}")
    elif command == "/story" or "故事" in text:
        send(chat_id, f"📖 每日故事\n\n{random.choice(STORIES)}")
    elif command == "/riddle" or "急转弯" in text or "猜谜" in text:
        send(chat_id, new_riddle(chat_id))
    elif command == "/answer" or text == "答案":
        send(chat_id, answer(chat_id))
    elif command == "/article" or "提升" in text or "成长文章" in text:
        item = random_content("article")
        send(chat_id, f"🌱 {item[0]}\n\n{item[1]}" if item else "文章库正在准备中。")
    elif command == "/daily":
        subscribe(chat_id)
        send(chat_id, f"🔔 已订阅每日推送！每天 {PUSH_TIME}（{TIMEZONE}）见。")
    elif command == "/stop":
        unsubscribe(chat_id)
        send(chat_id, "🔕 已取消每日推送。想念我时随时发送 /daily。")
    else:
        judged = judge_answer(chat_id, text)
        send(chat_id, judged or "我暂时没听懂～发送 /help 看看我会什么。")


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
                    item = random_content("joke")
                    send(chat_id, f"☀️ 今日份快乐\n\n{item[1] if item else random.choice(JOKES)}")
                elif choice == "duanzi":
                    item = random_content("duanzi")
                    send(chat_id, f"☀️ 今日段子\n\n{item[1] if item else random.choice(JOKES)}")
                elif choice == "story":
                    send(chat_id, f"☀️ 今日小故事\n\n{random.choice(STORIES)}")
                elif choice == "article":
                    item = random_content("article")
                    send(chat_id, f"🌱 {item[0]}\n\n{item[1]}" if item else "今天也要继续成长。")
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
            updates = api("getUpdates", offset=offset, timeout=25, allowed_updates=json.dumps(["message"]))
            for update in updates:
                offset = max(offset, update["update_id"] + 1)
                if "message" in update:
                    handle(update["message"])
        except RuntimeError as exc:
            print(exc, flush=True)
            time.sleep(3)


if __name__ == "__main__":
    main()
