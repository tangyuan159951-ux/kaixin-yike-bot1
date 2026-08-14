# 开心一刻 Telegram Bot — GitHub + Cloudflare 版

无 Render、无 Docker、无 UptimeRobot。Cloudflare Worker 处理 Telegram Webhook 和每日定时推送，D1 永久保存订阅、历史、反馈、已读记录及游戏进度。

## 功能

- 120,000 笑话、120,000 段子、120,000 故事
- 120,000 脑筋急转弯、120,000 成长文章、120,000 励志文案
- 120,000 条“可靠名言原句 + 不重复解读”，不伪造名人署名
- 每种小游戏 120,000 个不重复挑战编号：猜数字、石头剪刀布、算术挑战、成语接龙、猜字游戏
- 用户级严格防重复：每类完整走完 120,000 条后才进入下一轮
- 脑筋急转弯与猜字游戏支持直接发送答案并自动判断
- 按钮菜单、喜欢/不喜欢、使用历史

## 需要的 Cloudflare Secrets

- `TELEGRAM_BOT_TOKEN`：BotFather Token
- `WEBHOOK_SECRET`：自定义随机密钥
- `ADMIN_SECRET`：自定义随机管理密钥

## 初次启用

1. 先对 D1 执行最新版 `schema.sql`（重复执行安全）。
2. 给 Worker 设置上述三个 Secrets。
3. 部署后访问：`https://你的workers.dev/setup?key=你的ADMIN_SECRET`
4. 看到 `webhook configured` 后，到 Telegram 发送 `/start`。

Cloudflare Cron `0 1 * * *` 会在北京时间每天 09:00 执行推送。
