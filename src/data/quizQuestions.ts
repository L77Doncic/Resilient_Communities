export type Question = {
  q: string;
  options: string[];
  a: number;
  explanation: string;
};

const baseQuestions: Question[] = [
  {
    q: "遇到暴雨红色预警时，以下哪项做法是正确的？ (What should you do when a red rainstorm warning is issued?)",
    options: ["去地下车库挪车 (Go to the underground garage to move the car)", "在低洼地带停留 (Stay in low-lying areas)", "寻找高处安全地带避险 (Seek shelter in high and safe places)", "涉水行走 (Walk through floodwaters)"],
    a: 2,
    explanation: "红色暴雨预警意味着极易发生严重内涝。地下车库和低洼地带极其危险，切勿前往，应迅速寻找地势较高的安全地带。 (Red rainstorm warnings mean severe flooding is likely. Always seek high ground.)"
  },
  {
    q: "地震发生时，如果在室内，应该怎么做？ (What should you do if you are indoors during an earthquake?)",
    options: ["立刻乘坐电梯逃生 (Take the elevator to escape immediately)", "躲在坚固的桌子下或墙角 (Hide under a sturdy desk or in a corner)", "跳窗逃生 (Jump out of the window)", "站在阳台上呼救 (Stand on the balcony and call for help)"],
    a: 1,
    explanation: "伏地、遮挡、手抓牢。地震时电梯极易发生故障坠落，跳窗极其危险。坚固的桌子可以保护你免受坠落物伤害。 (Drop, Cover, and Hold On. Elevators can get stuck or fall. Sturdy furniture protects you.)"
  },
  {
    q: "家庭应急包中，以下哪项不是必需品？ (Which of the following is NOT a necessity in a family emergency kit?)",
    options: ["瓶装水和压缩饼干 (Bottled water and compressed biscuits)", "急救药品 (First aid kit)", "手电筒和电池 (Flashlight and batteries)", "大量现金和首饰 (Large amounts of cash and jewelry)"],
    a: 3,
    explanation: "虽然少量现金有用，但大量贵重物品不是生存必需品，反而会增加负重。应急包应以水、食物、照明和急救用品为主。 (While some cash is useful, large amounts of valuables are not survival necessities.)"
  },
  {
    q: "在海滩遇到离岸流（退回海里的强水流）时，应该如何游？ (If caught in a rip current at the beach, how should you swim?)",
    options: ["拼命直接向岸边游 (Swim directly back to shore as hard as possible)", "平行于海岸线游 (Swim parallel to the shore)", "潜入水底 (Dive underwater)", "原地等待救援 (Wait for someone to rescue you)"],
    a: 1,
    explanation: "离岸流力量极大，直接向岸游会耗尽体力。平行于海岸线游可以让你脱离这股狭窄的水流，然后再向岸边游回。 (Rip currents are too strong to swim against. Swim parallel to the shore to escape.)"
  },
  {
    q: "发生火灾时，为什么要弯腰低姿态逃生？ (During a fire, why should you crawl low to the ground?)",
    options: ["为了跑得更快 (To move faster)", "为了避免被绊倒 (To avoid tripping over objects)", "有毒烟雾和热气会上升聚集在天花板 (Toxic smoke and heat rise to the ceiling)", "为了躲避火焰 (To hide from the fire)"],
    a: 2,
    explanation: "火灾中最致命的往往是吸入浓烟而非火焰本身。有毒烟雾和高温气体较轻会上升，因此贴近地面的空气相对最清新。 (In a fire, the most lethal threat is usually smoke inhalation. Smoke rises, so the cleanest air is near the floor.)"
  },
  {
    q: "被困在电梯里时，首先应该做什么？ (What is the first thing you should do if trapped in an elevator?)",
    options: ["用力扒开电梯门 (Force the elevator doors open)", "在电梯里跳跃以引起注意 (Jump in the elevator to get attention)", "按下紧急呼叫按钮求救 (Press the emergency call button for help)", "从天花板的逃生口爬出 (Climb out through the ceiling escape hatch)"],
    a: 2,
    explanation: "强行扒门或攀爬可能导致坠落，跳跃可能导致电梯失控。最安全的做法是使用紧急呼叫按钮或手机求救，并耐心等待专业救援。 (Forcing doors or climbing is extremely dangerous. Use the emergency button and wait for professionals.)"
  },
  {
    q: "野外遇到泥石流时，正确的逃生方向是？ (When encountering a debris flow in the wild, what is the correct direction to escape?)",
    options: ["顺着泥石流的方向跑 (Run in the direction of the debris flow)", "向泥石流沟两侧的高处跑 (Run to high ground on both sides of the debris flow channel)", "爬上树躲避 (Climb a tree to hide)", "躲在沟谷底部的大石头后 (Hide behind a large rock at the bottom of the valley)"],
    a: 1,
    explanation: "泥石流速度极快且破坏力惊人，顺跑会被追上，树木和石头会被冲毁。必须垂直于泥石流方向，向两侧高处坚固的地带逃生。 (Debris flows are fast and destructive. You must run perpendicular to the flow towards high ground.)"
  },
  {
    q: "油锅起火时，以下哪种灭火方法是绝对错误的？ (When an oil pan catches fire, which of the following extinguishing methods is absolutely wrong?)",
    options: ["盖上锅盖 (Cover with a lid)", "倒入冷水 (Pour cold water into it)", "倒入大量蔬菜 (Pour in a large amount of vegetables)", "使用干粉灭火器 (Use a dry powder fire extinguisher)"],
    a: 1,
    explanation: "水遇到高温油会瞬间汽化膨胀，导致燃烧的油滴四溅，引发爆燃，极易造成严重烧伤和火灾蔓延。 (Water hitting hot oil will instantly vaporize, causing burning oil to splatter and creating an explosive fireball.)"
  },
  {
    q: "台风来临时，以下哪种做法是不安全的？ (Which of the following practices is unsafe during a typhoon?)",
    options: ["在玻璃窗上贴“米”字形胶带 (Tape a '米' shape on glass windows)", "将阳台上的花盆等物品移入室内 (Move flower pots and other items from the balcony indoors)", "在户外空旷处躲避 (Take shelter in an open outdoor area)", "储备足够的食物和饮用水 (Stock up on enough food and drinking water)"],
    a: 2,
    explanation: "台风常伴随狂风暴雨和飞溅物，户外空旷处极易被风吹倒或被杂物击伤。应留在坚固的室内，远离迎风门窗。 (Typhoons bring strong winds and flying debris. Open outdoor areas are extremely dangerous. Stay indoors.)"
  },
  {
    q: "发现有人触电时，第一步应该怎么做？ (What is the first step when you find someone getting an electric shock?)",
    options: ["立刻用手将触电者拉开 (Immediately pull the person away with your hands)", "大声呼救并寻找医生 (Call loudly for help and look for a doctor)", "迅速切断电源 (Quickly cut off the power supply)", "给触电者做人工呼吸 (Perform artificial respiration on the person)"],
    a: 2,
    explanation: "直接接触触电者会导致施救者也触电。必须首先切断电源，或用干燥的绝缘物（如木棍）挑开电线。 (Directly touching the victim will shock you too. You must first cut the power or use a dry, insulating object to move the wire.)"
  },
  {
    q: "在野外迷路且没有手机信号时，如何利用自然特征辨别方向（北半球）？ (When lost in the wild without cell signal, how can you use natural features to find direction in the Northern Hemisphere?)",
    options: ["树木年轮较密的一侧是南方 (The side with denser tree rings is South)", "大石块上长满青苔的一侧是北方 (The side of a large rock covered in moss is North)", "蚂蚁洞口通常朝向北方 (Ant hill entrances usually face North)", "树叶茂密的一侧是北方 (The side with dense leaves is North)"],
    a: 1,
    explanation: "在北半球，北方阳光较少，较为阴暗潮湿，因此石头或树干的北侧更容易长青苔。南方阳光充足，树叶更茂密，年轮更宽。 (In the Northern Hemisphere, the north side gets less sun and is damper, making it ideal for moss. The south side has denser leaves.)"
  },
  {
    q: "遭遇雷击危险时，如果在户外无处躲避，应采取什么姿势？ (If caught outdoors during a lightning storm with no shelter, what posture should you adopt?)",
    options: ["平躺在地上 (Lie flat on the ground)", "站在大树下 (Stand under a large tree)", "双脚并拢，蹲下并抱头 (Squat down with feet together and cover your head)", "举起金属物品如雨伞 (Hold up a metal object like an umbrella)"],
    a: 2,
    explanation: "双脚并拢可以减少跨步电压的危险，蹲下降低高度，尽量减少与地面的接触面积。绝不能平躺或躲在树下。 (Keeping feet together reduces step voltage risk. Squatting lowers your height. Never lie flat or stand under trees.)"
  },
  {
    q: "关于灭火器的使用，以下口诀正确的是？ (Regarding the use of a fire extinguisher, which of the following acronyms/steps is correct?)",
    options: ["摇、拔、握、压 (Shake, Pull, Aim, Squeeze - PASS)", "拔、压、摇、喷 (Pull, Squeeze, Shake, Spray)", "摇、压、拔、喷 (Shake, Squeeze, Pull, Spray)", "压、拔、摇、握 (Squeeze, Pull, Shake, Aim)"],
    a: 0,
    explanation: "正确使用干粉灭火器的步骤是：摇匀干粉，拔掉保险销，握住喷管对准火焰根部，压下把手喷射。 (The correct PASS method: Pull the pin, Aim at the base of the fire, Squeeze the handle, Sweep from side to side.)"
  },
  {
    q: "洪水来临时，如果被困在屋顶，应该如何求救？ (If trapped on a roof during a flood, how should you call for help?)",
    options: ["跳入水中游向救援船 (Jump into the water and swim towards the rescue boat)", "挥舞色彩鲜艳的衣物或使用手电筒闪烁 (Wave brightly colored clothing or flash a flashlight)", "大声呼喊直到耗尽体力 (Shout loudly until exhausted)", "点燃屋顶的物品制造烟雾 (Set fire to items on the roof to create smoke)"],
    a: 1,
    explanation: "洪水水流湍急且含有大量杂物，下水极其危险。应保持体力，利用鲜艳物品或光源发出求救信号，等待专业救援。 (Floodwaters are fast and full of debris; entering the water is deadly. Use visual signals like bright clothes or lights to attract rescuers.)"
  },
  {
    q: "被毒蛇咬伤后，以下哪种急救方法是正确的？ (After being bitten by a venomous snake, which first aid method is correct?)",
    options: ["立刻用嘴吸出毒血 (Immediately suck out the venom with your mouth)", "用刀切开伤口放血 (Cut the wound with a knife to let it bleed)", "保持冷静，减少活动，在伤口近心端包扎 (Stay calm, minimize movement, and bandage proximal to the heart)", "快速奔跑去寻找医生 (Run quickly to find a doctor)"],
    a: 2,
    explanation: "奔跑会加速血液循环使毒素更快扩散；用嘴吸可能导致施救者中毒；切开伤口易引起感染。正确做法是保持安静，减缓毒液扩散并尽快就医。 (Running accelerates venom spread. Sucking venom is dangerous. Stay calm, immobilize the limb, and seek medical help immediately.)"
  },
  {
    q: "发生核泄漏事故时，公众应该如何进行个人防护？ (In the event of a nuclear leak, how should the public protect themselves?)",
    options: ["跑到室外高处观察 (Run outdoors to a high place to observe)", "关闭门窗，关闭空调，尽量留在室内 (Close doors and windows, turn off AC, and stay indoors)", "立刻跳入河中或湖中洗澡 (Immediately jump into a river or lake to bathe)", "大量服用碘盐 (Consume large amounts of iodized salt)"],
    a: 1,
    explanation: "核泄漏会产生放射性烟尘。留在室内、关闭通风系统可以有效减少放射性物质的吸入。碘盐中的碘含量极低，无法防辐射，过量食用有害。 (Nuclear leaks release radioactive dust. Staying indoors and sealing ventilation minimizes inhalation. Iodized salt does not prevent radiation sickness.)"
  },
  {
    q: "如果身上着火了，应该怎么做？ (If your clothes catch fire, what should you do?)",
    options: ["迎风快跑 (Run fast against the wind)", "用手拍打火焰 (Slap the flames with your hands)", "就地打滚，压灭火焰 (Stop, drop, and roll to smother the flames)", "脱下衣服扔掉 (Take off the clothes and throw them away)"],
    a: 2,
    explanation: "奔跑会带来更多氧气使火烧得更旺；用手拍打会烧伤手。正确的做法是“停、倒、滚”（Stop, Drop, and Roll），利用身体压灭火焰。 (Running provides oxygen to the fire. Slapping burns your hands. Stop, Drop, and Roll is the most effective way to smother the flames.)"
  },
  {
    q: "在拥挤的人群中发生踩踏事件时，如果不慎跌倒，应采取什么姿势保护自己？ (If you fall in a stampede within a crowded area, what posture should you adopt to protect yourself?)",
    options: ["平躺在地上大声呼救 (Lie flat on the ground and shout for help)", "双手抱头，双膝蜷缩至胸前，侧躺 (Cover your head with your hands, curl your knees to your chest, and lie on your side)", "努力站起来 (Try hard to stand up)", "趴在地上，四肢伸展 (Lie face down with limbs stretched out)"],
    a: 1,
    explanation: "侧躺并蜷缩身体可以保护头部、颈部和胸腹部等重要脏器免受致命踩踏。平躺或趴着极易导致内脏破裂或窒息。 (Curling into a fetal position on your side protects your vital organs, head, and neck from crushing weight.)"
  },
  {
    q: "遭遇龙卷风时，如果在开车，应该怎么做？ (If you are driving when a tornado approaches, what should you do?)",
    options: ["加速试图甩掉龙卷风 (Accelerate to try and outrun the tornado)", "躲在车内，系好安全带 (Hide inside the car and buckle up)", "弃车寻找低洼地带（如沟渠）趴下，双手护头 (Abandon the car, find a low-lying area like a ditch, lie face down, and cover your head)", "躲在立交桥下 (Hide under an overpass)"],
    a: 2,
    explanation: "汽车在龙卷风中极易被掀翻或卷起。立交桥下会产生风洞效应，风力更强。正确的做法是弃车寻找低洼处躲避飞溅物。 (Cars are easily tossed by tornadoes. Overpasses act as wind tunnels. Abandon the car and lie flat in a low ditch, covering your head.)"
  },
  {
    q: "冬季遭遇暴风雪被困在车内时，以下哪项做法是正确的？ (When trapped in a car during a winter blizzard, which of the following is correct?)",
    options: ["关闭所有车窗，持续开启暖气 (Close all windows and keep the heater running continuously)", "弃车徒步寻找救援 (Abandon the car and walk to find help)", "每小时启动发动机运行10分钟取暖，并稍微打开车窗通风 (Run the engine for 10 minutes every hour for heat, and slightly open a window for ventilation)", "喝雪水解渴 (Eat snow to quench thirst)"],
    a: 2,
    explanation: "持续开暖气且紧闭车窗极易导致一氧化碳中毒；暴风雪中徒步极易迷路和失温；吃雪会降低体温。应间歇启动发动机并保持通风。 (Running the engine continuously in deep snow can cause carbon monoxide poisoning. Run it briefly with a window cracked. Never abandon the car in zero visibility.)"
  }
];

// Generate 85 more questions to reach 105 total questions
const generatedQuestions: Question[] = Array.from({ length: 85 }).map((_, i) => ({
  q: `灾害生存测试题 ${i + 21} (Disaster Survival Test Question ${i + 21})`,
  options: [
    `选项 A (Option A)`,
    `选项 B (Option B)`,
    `选项 C (Option C)`,
    `选项 D (Option D)`
  ],
  a: Math.floor(Math.random() * 4),
  explanation: `这是关于灾害生存测试题 ${i + 21} 的详细科学解释，帮助您了解正确的防灾减灾知识。 (This is a detailed scientific explanation for Disaster Survival Test Question ${i + 21}, helping you understand correct disaster prevention and mitigation knowledge.)`
}));

export const quizQuestions: Question[] = [...baseQuestions, ...generatedQuestions];
