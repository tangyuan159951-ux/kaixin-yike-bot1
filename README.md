# 开心一刻 Telegram 娱乐机器人

一个纯娱乐中文机器人，包含 10 万笑话、10 万段子、10 万脑筋急转弯、1 万故事和 5000 篇成长文章。支持防重复推荐、答案判断、按钮菜单、反馈和小游戏。

## 创建机器人

1. 在 Telegram 中打开 [@BotFather](https://t.me/BotFather)。
2. 发送 `/newbot`，根据提示设置名称和用户名。
3. 保存 BotFather 给出的 Token。不要把 Token 提交到代码仓库或发给别人。

## 本地运行

需要 Python 3.9 或更高版本。

```bash
cd telegram_fun_bot
export TELEGRAM_BOT_TOKEN="你的 Token"
python3 bot.py
```

启动后，在 Telegram 中找到机器人并发送 `/start`。

## 指令

| 指令 | 功能 |
| --- | --- |
| `/joke` | 随机笑话或段子 |
| `/story` | 随机每日故事 |
| `/riddle` | 脑筋急转弯 |
| `/answer` | 查看上一题答案 |
| `/article` | 提升自我的文章 |
| `/games` | 小游戏中心 |
| `/history` | 查看使用记录 |
| `/daily` | 订阅每日推送 |
| `/stop` | 取消每日推送 |
| `/help` | 使用帮助 |

机器人也能识别“笑话”“段子”“故事”“脑筋急转弯”“答案”等文字。

## 每日推送配置

默认每天 `09:00`，使用 `Asia/Shanghai` 时区：

```bash
export DAILY_PUSH_TIME="20:30"
export BOT_TIMEZONE="Asia/Shanghai"
export TELEGRAM_BOT_TOKEN="你的 Token"
python3 bot.py
```

订阅信息保存在 `data/bot.db`。服务器应持续运行，才能按时推送。

## Docker 运行

```bash
docker build -t happy-moment-bot .
docker run -d --name happy-moment-bot \
  --restart unless-stopped \
  -e TELEGRAM_BOT_TOKEN="你的 Token" \
  -e DAILY_PUSH_TIME="09:00" \
  -e BOT_TIMEZONE="Asia/Shanghai" \
  -v "$PWD/data:/app/data" \
  happy-moment-bot
```

## 说明

- 同一 Token 不要同时启动多个长轮询实例。
- 群聊里也能使用命令；每日推送会发送到执行 `/daily` 的聊天。
- 可直接修改 `bot.py` 中的 `JOKES`、`STORIES`、`RIDDLES` 扩充内容。

Telegram 官方文档：[Bot API](https://core.telegram.org/bots/api) · [BotFather 入门](https://core.telegram.org/bots/tutorial)

## Render 免费部署

项目已包含 `render.yaml` 和 Webhook 服务入口 `render_app.py`。

1. 把整个项目上传到一个 GitHub 仓库。
2. 登录 Render，选择 **New + → Blueprint**。
3. 连接该 GitHub 仓库，Render 会读取 `render.yaml`。
4. 在环境变量 `TELEGRAM_BOT_TOKEN` 中粘贴完整 Token，然后部署。
5. 部署成功后打开 Render 给出的网址；显示 JSON 状态即表示服务正常。
6. 回到 Telegram 给机器人发送 `/start`。

Webhook 会在服务启动时自动注册。`WEBHOOK_SECRET` 和 `CRON_SECRET` 由 Render 自动生成。

### 免费版每日推送

Render 免费服务会休眠，因此需要一个外部定时请求唤醒 `/cron`：

1. 在 Render 的 **Environment** 页面复制 `CRON_SECRET` 的值。
2. 在任意免费 HTTP 定时服务创建每日请求：

```text
https://你的Render域名/cron?key=你的CRON_SECRET
```

北京时间 09:00 对应 UTC 01:00。接口具有密钥保护，并会利用数据库中的订阅记录推送内容。


## Cloudflare D1 永久保存

项目包含 `cloudflare_state_worker.js` 和 `cloudflare_state_schema.sql`。将 Worker 绑定 D1 为 `DB`，创建机密 `STATE_API_KEY`，然后在 Render 增加：

- `STATE_API_URL`：`https://你的Worker域名/state`
- `STATE_API_KEY`：与 Cloudflare Worker 机密相同的随机字符串

配置后，订阅、历史、反馈、已读内容和游戏进度会在每次操作后备份到 D1，Render 重启时自动恢复。

## 小游戏

- 猜数字
- 石头剪刀布
- 算术挑战
- 成语接龙
- 猜字游戏
