# 开心一刻 Telegram 娱乐机器人

一个纯娱乐中文机器人，支持随机笑话/段子、每日故事、脑筋急转弯及订阅式每日推送。使用 Python 标准库实现，无第三方依赖。

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

注意：Render 免费服务的本地文件不是永久存储；重新部署或平台重启后，用户需要再次发送 `/daily`。普通笑话、故事和脑筋急转弯功能不受影响。
