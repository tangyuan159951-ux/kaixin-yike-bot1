FROM python:3.12-slim

WORKDIR /app
COPY bot.py /app/bot.py
RUN mkdir -p /app/data

ENV BOT_DB_PATH=/app/data/bot.db
ENV BOT_TIMEZONE=Asia/Shanghai
ENV DAILY_PUSH_TIME=09:00

CMD ["python3", "-u", "bot.py"]
