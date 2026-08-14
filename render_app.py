#!/usr/bin/env python3
"""Render-compatible webhook server for the entertainment bot."""

from __future__ import annotations

import hashlib
import json
import os
import random
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

import bot

PORT = int(os.environ.get("PORT", "10000"))
EXTERNAL_URL = os.environ.get("RENDER_EXTERNAL_URL", "").rstrip("/")
WEBHOOK_SECRET = os.environ.get("WEBHOOK_SECRET") or hashlib.sha256(bot.TOKEN.encode()).hexdigest()[:32]
CRON_SECRET = os.environ.get("CRON_SECRET", "").strip()


def process_message(message: dict) -> None:
    bot.handle(message)
    bot.cloud_backup()


def process_callback(callback: dict) -> None:
    bot.handle_callback(callback)
    bot.cloud_backup()


def process_daily_push() -> None:
    bot.push_daily()
    bot.cloud_backup()


def register_webhook() -> None:
    if not EXTERNAL_URL:
        print("等待 RENDER_EXTERNAL_URL；本地模式不注册 Webhook。", flush=True)
        return
    bot.api(
        "setWebhook",
        url=f"{EXTERNAL_URL}/telegram",
        secret_token=WEBHOOK_SECRET,
        allowed_updates=json.dumps(["message", "callback_query"]),
        drop_pending_updates="false",
    )
    print(f"Webhook 已连接：{EXTERNAL_URL}/telegram", flush=True)


class Handler(BaseHTTPRequestHandler):
    def reply(self, status: int, body: dict) -> None:
        raw = json.dumps(body, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path in {"/", "/health"}:
            self.reply(200, {"ok": True, "name": "开心一刻 Telegram Bot"})
            return
        if parsed.path == "/cron":
            key = parse_qs(parsed.query).get("key", [""])[0]
            if not CRON_SECRET or key != CRON_SECRET:
                self.reply(403, {"ok": False})
                return
            threading.Thread(target=process_daily_push, daemon=True).start()
            self.reply(200, {"ok": True, "message": "daily push started"})
            return
        self.reply(404, {"ok": False})

    def do_POST(self) -> None:
        if urlparse(self.path).path != "/telegram":
            self.reply(404, {"ok": False})
            return
        if self.headers.get("X-Telegram-Bot-Api-Secret-Token") != WEBHOOK_SECRET:
            self.reply(403, {"ok": False})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            update = json.loads(self.rfile.read(length) or b"{}")
            if "message" in update:
                threading.Thread(target=process_message, args=(update["message"],), daemon=True).start()
            elif "callback_query" in update:
                threading.Thread(target=process_callback, args=(update["callback_query"],), daemon=True).start()
            self.reply(200, {"ok": True})
        except (ValueError, json.JSONDecodeError):
            self.reply(400, {"ok": False})

    def log_message(self, fmt: str, *args) -> None:
        print(f"{self.address_string()} - {fmt % args}", flush=True)


def main() -> None:
    if not bot.TOKEN:
        raise SystemExit("缺少 TELEGRAM_BOT_TOKEN 环境变量。")
    bot.db().close()
    bot.cloud_restore()
    bot.setup_commands_only()
    register_webhook()
    server = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print(f"Render Web 服务已启动，端口 {PORT}", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
