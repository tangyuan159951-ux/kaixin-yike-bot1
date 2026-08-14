# 开心一刻 Telegram Bot — GitHub + Cloudflare 版

无 Render、无 Docker、无 UptimeRobot。Cloudflare Worker 处理 Telegram Webhook 和每日定时推送，D1 永久保存订阅、历史、反馈、已读记录及游戏进度。

## 功能

- 100,000 笑话、100,000 段子、100,000 脑筋急转弯
- 10,000 故事、5,000 成长文章
- 用户级防重复、智能答案识别、每日推送
- 猜数字、石头剪刀布、算术挑战、成语接龙、猜字游戏
- 按钮菜单、喜欢/不喜欢、使用历史

## 需要的 Cloudflare Secrets

- `TELEGRAM_BOT_TOKEN`：BotFather Token
- `WEBHOOK_SECRET`：自定义随机密钥
- `ADMIN_SECRET`：自定义随机管理密钥

## 初次启用

1. 先对 D1 执行 `schema.sql`。
2. 给 Worker 设置上述三个 Secrets。
3. 部署后访问：`https://你的workers.dev/setup?key=你的ADMIN_SECRET`
4. 看到 `webhook configured` 后，到 Telegram 发送 `/start`。

Cloudflare Cron `0 1 * * *` 会在北京时间每天 09:00 执行推送。
