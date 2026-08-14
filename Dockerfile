FROM python:3.12-slim

WORKDIR /app
COPY bot.py render_app.py generate_content_db.py /app/
RUN python3 generate_content_db.py && mkdir -p /app/data

ENV BOT_DB_PATH=/app/data/bot.db
ENV BOT_TIMEZONE=Asia/Shanghai
ENV DAILY_PUSH_TIME=09:00

EXPOSE 10000
CMD ["python3", "-u", "render_app.py"]
