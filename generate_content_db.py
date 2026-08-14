#!/usr/bin/env python3
"""Generate an original, exact-deduplicated entertainment content database."""

import sqlite3
from pathlib import Path

OUT = Path(__file__).with_name("content.db")

subjects = [
    "程序员", "设计师", "产品经理", "会计", "老师", "学生", "老板", "同事", "室友", "邻居",
    "快递员", "外卖员", "摄影师", "厨师", "理发师", "医生", "健身教练", "销售", "客服", "司机",
    "猫", "狗", "仓鼠", "鹦鹉", "熊猫", "企鹅", "海豚", "蜗牛", "兔子", "松鼠",
    "手机", "电脑", "闹钟", "冰箱", "风扇", "电梯", "路由器", "打印机", "雨伞", "咖啡机",
    "爸爸", "妈妈", "爷爷", "奶奶", "哥哥", "姐姐", "弟弟", "妹妹", "朋友", "网友",
]
scenes = [
    "开会迟到", "准备下班", "排队买饭", "参加面试", "学习新技能", "整理房间", "制定计划", "赶公交",
    "点外卖", "逛超市", "看电影", "做运动", "拍照片", "写报告", "修电脑", "准备考试", "早起打卡",
    "熬夜之后", "周一上班", "周五下午", "出门旅行", "在电梯里", "在咖啡店", "在图书馆", "在健身房",
    "在地铁上", "在办公室", "在家做饭", "参加聚会", "接到电话", "收到快递", "打开冰箱", "查看余额",
    "连接网络", "设定闹钟", "尝试减肥", "开始存钱", "学习英语", "练习唱歌", "打扫卫生", "换新发型",
    "面对难题", "遭遇堵车", "忘带钥匙", "找不到手机", "遇到下雨", "准备表白", "收到红包", "完成任务",
    "准备睡觉",
]
twists = [
    "认真想了三秒，说：先把今天过完，明天的问题让明天排队。",
    "淡定地回答：计划非常完美，唯一的变量就是我本人。",
    "忽然明白了：所谓效率，就是把发呆安排进日程表。",
    "最后总结：生活没有标准答案，但可以先选一个最开心的。",
]

openings = [
    "今天我终于明白", "朋友郑重告诉我", "老板突然宣布", "同事神秘地说", "室友认真建议",
    "早上醒来发现", "下班路上想到", "排队时听见", "吃饭时意识到", "开会时悟到",
    "手机弹出提醒", "闹钟再次证明", "余额悄悄提示", "镜子如实反映", "体重秤沉默片刻",
    "电梯门一开", "外卖刚送到", "咖啡喝到一半", "电脑重启以后", "网络恢复以后",
    "我制定新计划", "我决定早睡", "我开始健身", "我尝试存钱", "我准备学习",
    "我打开冰箱", "我整理书桌", "我翻开日历", "我查看天气", "我收拾行李",
    "周一告诉我", "周五提醒我", "假期教育我", "堵车启发我", "下雨证明了",
    "朋友问起梦想", "家人问起工作", "同事问起进度", "老师问起作业", "老板问起目标",
]
situations = scenes
endings = [
    "——道理我都懂，执行的时候需要再开一次会。",
    "——不是我不努力，是快乐总在半路拦住我。",
    "——成年人的稳定，就是稳定地想放假。",
    "——办法总比困难多，只是困难通常先到。",
    "——我没有拖延，只是在等灵感完成热身。",
]

objects = [
    ("水", "越洗别的东西，自己越容易变脏"), ("影子", "总跟着你，却抓不住"),
    ("名字", "属于你，别人却叫得更多"), ("年龄", "只会增加，很难减少"),
    ("时间", "看不见，却能改变一切"), ("回声", "你说什么，它常回答什么"),
    ("地图", "有城市和道路，却住不了人"), ("时钟", "有脸有手，却没有身体"),
    ("书", "不说话，却能讲很多故事"), ("镜子", "什么都照见，却留不住任何东西"),
    ("铅笔", "越工作，身体越短"), ("蜡烛", "站着流泪，越哭越矮"),
    ("雨伞", "下雨时开放，晴天时收拢"), ("冰", "怕热不怕冷"),
    ("火", "吃得越多，长得越大"), ("风", "摸不到，却能推动树叶"),
    ("云", "没有翅膀，也能飘在天空"), ("雪", "从天上来，落地后慢慢消失"),
    ("门", "有口却不会说话"), ("窗", "不出门，也能看见远方"),
]
object_prefixes = ["安静的", "忙碌的", "清晨的", "夜晚的", "下雨天的"]
objects = [(p + a, b) for p in object_prefixes for a, b in objects]
riddle_frames = [
    "猜一猜：什么东西{clue}？", "脑筋转个弯：谁{clue}？", "不按常理想：什么{clue}？",
    "给你十秒：哪样东西{clue}？", "生活谜题：什么{clue}？", "轻松一猜：谁{clue}？",
    "换个角度看：什么东西{clue}？", "小小谜面：哪位{clue}？", "今天的问题：什么{clue}？",
    "趣味挑战：谁{clue}？", "想象一下：什么{clue}？", "快速问答：哪样东西{clue}？",
    "别急着回答：什么{clue}？", "答案就在身边：谁{clue}？", "观察生活：什么东西{clue}？",
    "聪明人也会停一下：哪样东西{clue}？", "开心猜谜：什么{clue}？", "一分钟谜题：谁{clue}？",
    "今天动动脑：什么东西{clue}？", "最后一个提示：哪样东西{clue}？",
]
riddle_contexts = ["在家里", "在路上", "在清晨", "在夜晚", "在故事里"]

article_topics = [
    "建立自信", "管理时间", "克服拖延", "稳定情绪", "提升专注", "养成阅读习惯", "有效沟通", "学会倾听",
    "目标拆解", "持续学习", "健康作息", "坚持运动", "理性消费", "整理环境", "培养耐心", "面对失败",
    "减少内耗", "建立边界", "练习感恩", "复盘成长",
]
article_actions = [
    "从五分钟开始", "每天记录一次", "只处理最重要的一件事", "把目标写得具体", "给行动设置固定时间",
    "提前准备环境", "减少一个干扰源", "完成后及时奖励自己", "寻找一位同行伙伴", "用问题代替自责",
    "把进步做成清单", "允许自己慢一点", "先完成再优化", "把困难分成三步", "睡前做简单复盘",
    "早晨确定今日重点", "练习说出真实需求", "给自己留出空白", "关注可以控制的部分", "连续实践七天",
    "用数据观察变化", "为意外准备替代方案", "主动请求反馈", "庆祝微小进步", "把经验分享给别人",
]

humor_tones = [
    "这段经历被记在了《今日轻松观察》里。", "旁边的人听完，决定先笑再思考。",
    "后来大家一致认为，开心也是一种解决方案。", "现场安静两秒，然后笑声准时到达。",
    "这说明生活偶尔也会偷偷写段子。", "如果快乐有记录，这一条应该加粗保存。",
    "故事传开后，连闹钟都笑得晚响了一分钟。", "总结起来：认真生活，也别忘了轻松一下。",
    "听众表示，这个结论值得配一杯奶茶。", "于是平凡的一天，多了一个开心注脚。",
]
riddle_variants = [
    "提示：答案来自日常生活。", "提示：换个角度就不难。", "提示：别被字面意思骗了。",
    "提示：答案可能就在身边。", "提示：用想象力而不是计算器。", "提示：先排除最复杂的答案。",
    "提示：这是一道轻松题。", "提示：观察它最明显的特点。", "提示：答案通常很简单。",
    "提示：读完后停三秒再回答。",
]
article_perspectives = [
    "行动视角", "习惯视角", "情绪视角", "长期视角", "复盘视角",
    "微小进步视角", "环境设计视角", "自我接纳视角", "实践反馈视角", "持续成长视角",
]


def build_rows():
    jokes = []
    for subject in subjects:
        for scene in scenes:
            for twist in twists:
                base = f"{subject}{scene}时，{twist}"
                for tone in humor_tones:
                    jokes.append(("joke", "开心笑话", f"{base}\n{tone}", None, scene))

    duanzi = []
    for opening in openings:
        for situation in situations:
            for ending in endings:
                base = f"{opening}，{situation}这件事其实很有学问{ending}"
                for tone in humor_tones:
                    duanzi.append(("duanzi", "轻松段子", f"{base}\n{tone}", None, situation))

    riddles = []
    for answer, clue in objects:
        base_answer = answer[3:] if answer[:3] in object_prefixes else answer
        mood = answer[:3]
        for frame in riddle_frames:
            for context in riddle_contexts:
                question = f"{context}，{frame.format(clue=f'带着{mood}气质，{clue}')}"
                for variant in riddle_variants:
                    riddles.append(("riddle", "脑筋急转弯", f"{question}\n{variant}", base_answer, context))

    articles = []
    for topic in article_topics:
        for action in article_actions:
            title = f"{topic}：{action}"
            body = (
                f"提升自己不需要一次完成巨大的改变。面对“{topic}”，更有效的方法是{action}。"
                f"先选一个今天就能完成的小动作，把它做到足够简单，让开始不再依赖情绪。\n\n"
                "行动之后，记录事实而不是评价自己：做了什么、遇到什么阻力、下一次如何调整。"
                "稳定的成长来自可重复的过程，而不是偶尔爆发的意志力。\n\n"
                "今天的练习：花十分钟完成第一步，结束时写下一句收获。"
                "当小行动不断累积，你会更信任自己的执行力。"
            )
            for perspective in article_perspectives:
                articles.append(("article", f"{title}｜{perspective}", f"【{perspective}】\n{body}", None, topic))
    return jokes, duanzi, riddles, articles


def main():
    jokes, duanzi, riddles, articles = build_rows()
    expected = {"joke": 100000, "duanzi": 100000, "riddle": 100000, "article": 5000}
    rows = jokes + duanzi + riddles + articles
    assert {k: sum(1 for r in rows if r[0] == k) for k in expected} == expected
    for kind in expected:
        bodies = [r[2] for r in rows if r[0] == kind]
        assert len(bodies) == len(set(bodies)), f"duplicate {kind}"

    if OUT.exists():
        OUT.unlink()
    with sqlite3.connect(OUT) as conn:
        conn.execute("CREATE TABLE content (id INTEGER PRIMARY KEY, type TEXT, title TEXT, body TEXT, answer TEXT, category TEXT)")
        conn.execute("CREATE INDEX idx_content_type ON content(type)")
        conn.executemany("INSERT INTO content(type,title,body,answer,category) VALUES (?,?,?,?,?)", rows)
        conn.commit()
    print(expected, OUT.stat().st_size)


if __name__ == "__main__":
    main()
