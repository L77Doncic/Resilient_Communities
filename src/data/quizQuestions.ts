type RawQuestion = {
  q: string;
  options: string[];
  a: number;
  explanation: string;
};

export type LocalizedText = {
  zh: string;
  en: string;
};

export type Question = {
  q: LocalizedText;
  options: LocalizedText[];
  a: number;
  explanation: LocalizedText;
};

function hasCjk(text: string) {
  return /[\u4e00-\u9fff]/.test(text);
}

function splitBilingualText(text: string): LocalizedText {
  const trimmed = text.trim();
  const match = trimmed.match(/^(.*)\s+\(([^()]+)\)\s*$/);
  if (!match) {
    return {zh: trimmed, en: trimmed};
  }

  const outside = match[1].trim();
  const inside = match[2].trim();
  const outsideHasCjk = hasCjk(outside);
  const insideHasCjk = hasCjk(inside);

  if (outsideHasCjk && !insideHasCjk) {
    return {zh: outside, en: inside};
  }
  if (!outsideHasCjk && insideHasCjk) {
    return {zh: inside, en: outside};
  }
  if (outsideHasCjk && insideHasCjk) {
    return {zh: outside, en: inside};
  }
  return {zh: outside, en: inside};
}

const rawQuestions: RawQuestion[] = [
  {
    q: "地震发生时，如果你在室内，第一反应应该是什么？ (During an earthquake indoors, what should you do first?)",
    options: ["冲向楼梯 (Run to the stairs)", "伏地、遮挡、手抓牢 (Drop, Cover, and Hold On)", "站到门框下面 (Stand in a doorway)", "乘电梯下楼 (Take the elevator down)"],
    a: 1,
    explanation: "室内地震避险的核心是伏地、遮挡、手抓牢，保护头颈并远离窗户。楼梯、电梯和门框都可能带来额外风险。 (Drop, Cover, and Hold On protects your head and neck; stairs, elevators, and doorways can be unsafe.)"
  },
  {
    q: "地震时人在床上，最合适的做法是？ (If you are in bed during an earthquake, what is best?)",
    options: ["立刻跳下床跑出房间 (Jump out of bed and run)", "趴下并用枕头保护头颈 (Turn face down and cover your head and neck with a pillow)", "站在窗边观察 (Stand by the window)", "打开房门等待 (Open the door and wait)"],
    a: 1,
    explanation: "床上遇震应尽量保护头颈，避免在黑暗和晃动中奔跑导致摔倒或被玻璃割伤。 (Protect your head and neck; running during shaking can cause falls and injuries.)"
  },
  {
    q: "地震后闻到煤气味，应该怎么做？ (After an earthquake, you smell gas. What should you do?)",
    options: ["开灯检查泄漏点 (Turn on lights to inspect)", "点火确认是否漏气 (Use a flame to check)", "关闭气源、开窗、离开并报告 (Shut off gas if safe, ventilate, leave, and report)", "继续留在室内等待 (Stay indoors and wait)"],
    a: 2,
    explanation: "煤气泄漏时不能开关电器或点火，应在安全条件下关闭阀门、通风、撤离并联系专业人员。 (Do not use switches or flames around gas; ventilate, leave, and call professionals.)"
  },
  {
    q: "暴雨内涝时，为什么不应进入地下车库挪车？ (Why should you not enter an underground garage during severe flooding?)",
    options: ["车库太吵 (It is too noisy)", "地下空间可能快速进水并断电 (It can flood rapidly and lose power)", "车库没有手机信号 (There may be no signal)", "停车位难找 (Parking is difficult)"],
    a: 1,
    explanation: "地下空间积水速度快，可能导致人员被困、触电或溺水。车辆可放弃，生命优先。 (Underground areas can flood fast; life safety comes before property.)"
  },
  {
    q: "开车遇到道路积水，最安全的选择是？ (When driving and seeing floodwater across the road, what is safest?)",
    options: ["加速冲过去 (Speed through)", "下车测水深 (Get out to test depth)", "掉头绕行，不涉水 (Turn around and avoid the water)", "跟着大车通过 (Follow a large vehicle)"],
    a: 2,
    explanation: "积水深度、流速和路基情况难以判断，车辆可能熄火或被冲走。正确做法是绕行。 (Floodwater can sweep cars away or hide road damage. Turn around.)"
  },
  {
    q: "洪水中步行涉水的主要危险是什么？ (What is a major danger of walking through floodwater?)",
    options: ["鞋子会湿 (Shoes get wet)", "水中可能有电线、化学品、病原体和暗坑 (It may hide wires, chemicals, germs, and holes)", "水温总是很高 (The water is always hot)", "水会让人迷路 (Water always causes disorientation)"],
    a: 1,
    explanation: "洪水可能含污染物、带电设施、尖锐物和看不见的坑洞，即使水不深也危险。 (Floodwater can be contaminated and hide electrical and physical hazards.)"
  },
  {
    q: "洪水上涨被困高处时，应该怎样求救？ (If trapped above rising floodwater, how should you signal for help?)",
    options: ["跳入水中游向救援人员 (Jump into the water)", "挥舞亮色衣物或用灯光示意 (Wave bright clothing or flash a light)", "不停大喊直到失声 (Shout until exhausted)", "点燃物品制造大火 (Start a large fire)"],
    a: 1,
    explanation: "保持体力，使用醒目的视觉信号等待专业救援；不要进入湍急洪水。 (Conserve energy and use visible signals; do not enter moving floodwater.)"
  },
  {
    q: "火灾逃生时，为什么要低姿前进？ (Why should you stay low while escaping a fire?)",
    options: ["低姿更容易看清方向 (It improves vision)", "浓烟和高温会上升 (Smoke and heat rise)", "低姿可以跑得更快 (It makes you faster)", "地面不会有烟 (There is no smoke at floor level)"],
    a: 1,
    explanation: "火灾中烟气和热量上升，贴近地面的空气相对更可呼吸，但仍需尽快撤离。 (Smoke and heat rise, so lower air is usually safer while evacuating.)"
  },
  {
    q: "油锅起火时，哪种做法最危险？ (When a pan of oil catches fire, what is most dangerous?)",
    options: ["盖上锅盖 (Cover with a lid)", "关闭热源 (Turn off heat)", "往锅里倒水 (Pour water into the pan)", "使用合适灭火器 (Use a suitable extinguisher)"],
    a: 2,
    explanation: "水遇高温油会汽化并使燃烧的油飞溅，可能引发爆燃。 (Water can vaporize violently and spread burning oil.)"
  },
  {
    q: "使用灭火器的 PASS 方法中，A 代表什么？ (In the PASS fire extinguisher method, what does A mean?)",
    options: ["Aim at the base of the fire (对准火焰根部)", "Alert everyone (提醒所有人)", "Add water (加水)", "Avoid smoke (避开烟雾)"],
    a: 0,
    explanation: "PASS 是 Pull, Aim, Squeeze, Sweep。应对准火焰根部，而不是火苗上方。 (Aim at the base of the fire, then squeeze and sweep.)"
  },
  {
    q: "身上衣物着火时，应怎么做？ (If your clothes catch fire, what should you do?)",
    options: ["奔跑找水 (Run to find water)", "用手拍打 (Slap the flames)", "停下、倒地、翻滚 (Stop, Drop, and Roll)", "站着等待别人帮忙 (Stand still and wait)"],
    a: 2,
    explanation: "奔跑会给火焰供氧，手拍会烧伤手。停、倒、滚可压灭火焰。 (Running feeds the fire; Stop, Drop, and Roll smothers it.)"
  },
  {
    q: "楼房火灾时，为什么不能乘电梯逃生？ (Why should you not use elevators during a building fire?)",
    options: ["电梯速度太慢 (They are too slow)", "可能断电、停运或进烟 (They may lose power, stop, or fill with smoke)", "电梯会自动报警 (They automatically alarm)", "楼梯总是更近 (Stairs are always closer)"],
    a: 1,
    explanation: "火灾可能导致电梯断电、受热变形或烟气进入，应走疏散楼梯。 (Use stairs because elevators may fail or fill with smoke.)"
  },
  {
    q: "台风来临前，阳台花盆和户外杂物应如何处理？ (Before a typhoon, what should you do with balcony pots and loose outdoor items?)",
    options: ["留在原处 (Leave them)", "移入室内或固定 (Bring them indoors or secure them)", "放到窗台边 (Place them on the windowsill)", "堆到楼道里 (Pile them in the corridor)"],
    a: 1,
    explanation: "强风会把松散物变成飞射物，可能伤人或砸坏玻璃；楼道也不能堆放阻碍疏散。 (Loose items can become projectiles; do not block evacuation corridors.)"
  },
  {
    q: "台风眼经过时短暂风平浪静，应该怎么做？ (The eye of a typhoon passes and it becomes calm. What should you do?)",
    options: ["马上外出拍照 (Go outside for photos)", "继续留在安全室内 (Stay safely indoors)", "打开所有窗户 (Open all windows)", "去海边观察 (Go to the coast)"],
    a: 1,
    explanation: "台风眼后强风会从相反方向再次来袭，不能因短暂平静而外出。 (Dangerous winds return after the eye passes.)"
  },
  {
    q: "海边感到强烈地震后，最安全的做法是？ (After strong shaking near the coast, what is safest?)",
    options: ["去海边看退潮 (Go watch the shoreline)", "立即向高处或内陆转移 (Move to high ground or inland immediately)", "等待所有人集合再走 (Wait for everyone to gather)", "开车沿海岸线行驶 (Drive along the coast)"],
    a: 1,
    explanation: "海边强震可能引发海啸，应把自然信号当作警报，立即向高处或内陆撤离。 (Strong coastal shaking can be a natural tsunami warning.)"
  },
  {
    q: "海水突然快速退去，露出大片海床，可能意味着什么？ (The sea suddenly recedes and exposes the seabed. What may it mean?)",
    options: ["适合捡贝壳 (Good time to collect shells)", "海啸可能来临 (A tsunami may be coming)", "天气转晴 (Weather is clearing)", "潮汐完全正常且安全 (It is always normal and safe)"],
    a: 1,
    explanation: "海水异常快速退去是海啸自然预警信号之一，应马上离开海岸。 (Unusual rapid recession is a natural tsunami warning sign.)"
  },
  {
    q: "被离岸流带离岸边时，应怎么做？ (If caught in a rip current, what should you do?)",
    options: ["直接逆流游回岸边 (Swim directly against it)", "平行海岸游或先漂浮呼救 (Swim parallel to shore or float and signal)", "潜入海底 (Dive to the bottom)", "抓住别人一起游 (Grab another swimmer)"],
    a: 1,
    explanation: "离岸流不会把人拉入水底，但逆流硬游会耗尽体力。应平行海岸脱离，或漂浮呼救。 (Do not fight the current; swim parallel or float and signal.)"
  },
  {
    q: "雷暴时在户外，以下哪个避险地点最安全？ (During a thunderstorm outdoors, which shelter is safest?)",
    options: ["孤立大树下 (Under a lone tree)", "金属棚架下 (Under a metal shelter)", "坚固建筑或封闭车辆内 (Inside a substantial building or enclosed vehicle)", "空旷高地 (Open high ground)"],
    a: 2,
    explanation: "雷暴时应进入坚固建筑或封闭金属车身车辆，远离孤立高物、金属结构和开阔地。 (Use a substantial building or enclosed vehicle; avoid isolated tall objects and open areas.)"
  },
  {
    q: "雷暴中无处躲避时，下列哪项最不应该做？ (If caught outside with no shelter in lightning, what should you NOT do?)",
    options: ["离开孤立大树 (Move away from lone trees)", "蹲低并减少接地面积 (Crouch low and minimize contact)", "平躺在地上 (Lie flat on the ground)", "远离金属物 (Move away from metal objects)"],
    a: 2,
    explanation: "平躺会增加接地面积和地电流风险。应尽快转移到安全建筑，临时降低身体高度。 (Lying flat increases ground-current exposure.)"
  },
  {
    q: "极端高温天气，最需要主动关注的人群是？ (During extreme heat, who needs proactive checking?)",
    options: ["老人、儿童、慢病患者和独居者 (Older adults, children, chronically ill people, and people living alone)", "只关注运动员 (Only athletes)", "只关注上班族 (Only office workers)", "没有人需要特别关注 (No one needs special attention)"],
    a: 0,
    explanation: "高温对老人、儿童、慢病患者、户外劳动者和缺少降温条件的人影响更大，需要主动联系和帮助。 (Vulnerable groups need proactive support during heat.)"
  },
  {
    q: "高温天出现意识模糊、体温很高、皮肤发热，可能是什么情况？ (Confusion, very high body temperature, and hot skin in heat may indicate what?)",
    options: ["普通疲劳 (Normal fatigue)", "热射病风险，需要紧急处理 (Possible heat stroke, an emergency)", "轻微口渴 (Mild thirst)", "睡眠不足 (Lack of sleep)"],
    a: 1,
    explanation: "热射病可危及生命，应立即呼叫急救、转移至阴凉处并降温。 (Heat stroke is life-threatening; call emergency help and cool the person.)"
  },
  {
    q: "停电后使用便携式发电机，正确做法是？ (How should a portable generator be used after a power outage?)",
    options: ["放在室内走廊 (In an indoor hallway)", "放在阳台并关窗 (On a balcony with windows closed)", "放在室外并远离门窗通风口 (Outdoors, away from doors, windows, and vents)", "放在车库里开门运行 (In a garage with the door open)"],
    a: 2,
    explanation: "发电机会产生一氧化碳，必须在室外并远离门窗和通风口使用，车库也不安全。 (Generators produce carbon monoxide; use them outdoors away from openings.)"
  },
  {
    q: "一氧化碳中毒的危险特征是？ (What makes carbon monoxide especially dangerous?)",
    options: ["有强烈臭味 (It has a strong smell)", "无色无味且可致命 (It is colorless, odorless, and can be deadly)", "只在冬天出现 (It only occurs in winter)", "只影响儿童 (It only affects children)"],
    a: 1,
    explanation: "一氧化碳无色无味，燃烧设备通风不良时可能积聚，应安装报警器并保持通风。 (CO is colorless and odorless; alarms and ventilation matter.)"
  },
  {
    q: "灾后看到掉落电线，应该怎么做？ (After a disaster, you see a downed power line. What should you do?)",
    options: ["用木棍挑开 (Move it with a stick)", "靠近拍照 (Get close for photos)", "远离并报告 (Stay away and report it)", "踩过去快速离开 (Step over it quickly)"],
    a: 2,
    explanation: "掉落电线可能仍带电，周围地面也可能带电，应保持距离并通知电力或应急部门。 (Downed lines may be energized; keep away and report.)"
  },
  {
    q: "如果电线落在车上且车内没有起火，车内人员应优先怎么做？ (If a power line falls on your car and there is no fire, what should occupants do first?)",
    options: ["留在车内等待救援 (Stay inside and wait for help)", "立刻下车跑开 (Get out and run)", "打开车门检查电线 (Open the door to inspect)", "用雨伞移开电线 (Move the wire with an umbrella)"],
    a: 0,
    explanation: "车体可形成相对保护。除非起火等迫切危险，应留在车内等待专业人员处理。 (The vehicle can offer protection; stay inside unless there is immediate danger like fire.)"
  },
  {
    q: "家庭应急包中，饮用水的常见建议量是？ (A common emergency water recommendation is what?)",
    options: ["每人每天约1加仑/约4升 (About 1 gallon/4 liters per person per day)", "全家每天一杯 (One cup per family per day)", "只准备饮料 (Only soft drinks)", "不需要准备水 (No water needed)"],
    a: 0,
    explanation: "许多应急指南建议每人每天约1加仑水，用于饮用和基本卫生，并至少准备数天。 (Many guides recommend about 1 gallon per person per day.)"
  },
  {
    q: "应急包中为什么应准备手摇或电池收音机？ (Why include a hand-crank or battery radio in an emergency kit?)",
    options: ["听音乐放松 (For music only)", "手机网络中断时接收官方信息 (To receive official updates if cell networks fail)", "替代手电筒 (To replace a flashlight)", "用来充当工具箱 (To serve as a toolbox)"],
    a: 1,
    explanation: "灾害中通信和电力可能中断，收音机能帮助获取官方预警、避难和救援信息。 (A radio can receive official information when power and networks fail.)"
  },
  {
    q: "应急包中重要文件应如何存放？ (How should important documents be stored in an emergency kit?)",
    options: ["随便塞入口袋 (Loose in a pocket)", "放入防水袋或密封容器 (In a waterproof bag or sealed container)", "只存在手机里 (Only on a phone)", "不需要备份 (No backup needed)"],
    a: 1,
    explanation: "证件、保险、医疗和联系人信息应有纸质或离线备份，并防水保存。 (Keep protected paper/offline copies of IDs, insurance, medical, and contacts.)"
  },
  {
    q: "撤离前制定家庭联络计划，最重要的内容之一是？ (What is one key part of a family communication plan before evacuation?)",
    options: ["只记住一个社交账号 (Only remember a social account)", "约定集合点和外地联系人 (Set meeting places and an out-of-area contact)", "只告诉一个人路线 (Tell only one person the route)", "不需要提前计划 (No plan needed)"],
    a: 1,
    explanation: "灾害中本地通信可能拥堵，集合点和外地联系人能帮助家人重新取得联系。 (Meeting points and an out-of-area contact help families reconnect.)"
  },
  {
    q: "收到官方撤离命令时，正确做法是？ (When officials order evacuation, what should you do?)",
    options: ["尽早按指定路线离开 (Leave early using designated routes)", "等灾害靠近再走 (Wait until danger is close)", "只带贵重家具 (Take bulky valuables)", "逆向进入危险区找人 (Enter the danger area to look for others)"],
    a: 0,
    explanation: "拖延会遇到堵车、道路封闭或更高风险。应按官方路线带上必要物品尽早离开。 (Leave early by official routes; delays increase risk.)"
  },
  {
    q: "给宠物做灾害准备，哪项最合适？ (Which is best for pet disaster preparedness?)",
    options: ["撤离时把宠物留家里 (Leave pets at home)", "准备宠物食物、牵引/笼具、药物和身份信息 (Prepare pet food, carrier/leash, medicines, and ID)", "只准备玩具 (Only prepare toys)", "让宠物自行逃生 (Let pets escape on their own)"],
    a: 1,
    explanation: "宠物也需要食物、水、药物、牵引或笼具及身份信息，并提前确认可接收宠物的避难安排。 (Pets need supplies, restraint/carriers, medication, ID, and pet-friendly shelter planning.)"
  },
  {
    q: "慢性病患者准备应急包时，特别应加入什么？ (What should people with chronic conditions include in emergency supplies?)",
    options: ["额外药物清单和处方信息 (Medication supply/list and prescription information)", "只带零食 (Only snacks)", "只带运动鞋 (Only sports shoes)", "不需要特殊准备 (No special preparation)"],
    a: 0,
    explanation: "灾害可能中断就医和取药，应准备药物、处方、过敏信息和医疗设备供电方案。 (Disasters can interrupt care; keep medicines, prescriptions, allergy info, and power plans.)"
  },
  {
    q: "洪水或停电后，冰箱食物是否安全主要取决于什么？ (After flooding or power outage, food safety mainly depends on what?)",
    options: ["闻起来是否正常 (Smell only)", "是否保持安全温度且未接触污染水 (Whether it stayed cold and avoided contaminated water)", "包装是否漂亮 (Package appearance)", "价格是否昂贵 (Price)"],
    a: 1,
    explanation: "断电会让易腐食物进入危险温度区，洪水接触也会污染食品；不确定时应丢弃。 (Temperature abuse and floodwater contamination make food unsafe; when in doubt, throw it out.)"
  },
  {
    q: "灾后自来水可能受污染时，应优先听从什么信息？ (If tap water may be contaminated after a disaster, what should guide you?)",
    options: ["邻居猜测 (Neighbors' guesses)", "官方饮水安全通知 (Official water safety notices)", "水看起来清不清 (Whether water looks clear)", "社交媒体谣言 (Social media rumors)"],
    a: 1,
    explanation: "水透明不代表安全，应按官方通知进行煮沸、消毒或使用瓶装水。 (Clear water can still be unsafe; follow official boil/disinfection/bottled-water guidance.)"
  },
  {
    q: "山洪或泥石流预警时，在山谷露营应怎么做？ (With flash flood or debris-flow warnings while camping in a valley, what should you do?)",
    options: ["留在沟谷底部 (Stay in the channel)", "向沟谷两侧高处转移 (Move to higher ground on the sides)", "躲到桥下 (Hide under a bridge)", "顺着水流方向跑 (Run downstream)"],
    a: 1,
    explanation: "沟谷中洪水和泥石流来得快、冲击强，应垂直离开沟道向两侧高处转移。 (Move out of the channel to higher ground; flows are fast and destructive.)"
  },
  {
    q: "滑坡发生前可能出现的征兆是？ (Which may be a warning sign of a landslide?)",
    options: ["地面裂缝、墙体开裂、树木倾斜 (Ground cracks, wall cracks, leaning trees)", "天空更蓝 (Bluer sky)", "手机电量下降 (Phone battery drops)", "空气变甜 (Air smells sweet)"],
    a: 0,
    explanation: "坡体变形可能表现为裂缝、门窗卡住、树木或电杆倾斜、异常渗水等。 (Cracks, leaning objects, stuck doors/windows, and seepage can indicate slope movement.)"
  },
  {
    q: "冬季暴风雪中被困车内，较安全的做法是？ (If trapped in a car during a blizzard, what is safer?)",
    options: ["弃车步行找路 (Leave and walk)", "持续开发动机并紧闭车窗 (Run engine continuously with windows sealed)", "间歇运行发动机取暖并保持排气管通畅 (Run engine intermittently and keep exhaust clear)", "吃大量雪补水 (Eat lots of snow for water)"],
    a: 2,
    explanation: "暴风雪中离车易迷路失温；排气管堵塞会导致一氧化碳进入车内，应间歇取暖并通风。 (Stay with the car, prevent CO buildup, and keep exhaust clear.)"
  },
  {
    q: "寒冷天气出现失温时，下列哪项正确？ (For suspected hypothermia, what is correct?)",
    options: ["快速喝酒升温 (Drink alcohol to warm up)", "转移到温暖处并逐步保暖 (Move to warmth and warm gradually)", "用雪摩擦身体 (Rub the body with snow)", "继续剧烈运动 (Keep exercising hard)"],
    a: 1,
    explanation: "失温需尽快避寒、换干衣、逐步保暖并寻求医疗帮助；酒精会增加散热。 (Warm gradually, remove wet clothing, and seek care; alcohol worsens heat loss.)"
  },
  {
    q: "公共场所发生拥挤踩踏风险时，最好的预防做法是？ (In a crowd crush risk, what helps prevent injury?)",
    options: ["逆人流奔跑 (Run against the crowd)", "保持重心、顺人流移动，双臂护胸留空间 (Stay balanced, move with the flow, protect chest space)", "蹲下系鞋带 (Crouch to tie shoes)", "推开前面的人 (Push people away)"],
    a: 1,
    explanation: "拥挤中应避免逆行和弯腰，保护胸部呼吸空间，随人流缓慢移动到边缘。 (Avoid going against the crowd or bending down; preserve breathing space.)"
  },
  {
    q: "如果在拥挤人群中跌倒，应优先保护哪里？ (If you fall in a dense crowd, what should you protect first?)",
    options: ["手机 (Phone)", "头颈和胸腹部 (Head, neck, chest, and abdomen)", "鞋子 (Shoes)", "背包 (Backpack)"],
    a: 1,
    explanation: "侧卧蜷缩、双手护头颈并尽量保护胸腹，可降低踩踏造成的致命伤。 (Curl on your side and protect vital areas.)"
  },
  {
    q: "发现有人触电时，第一步是什么？ (If someone is being shocked, what is the first step?)",
    options: ["直接用手拉开 (Pull them with bare hands)", "切断电源或用绝缘物隔离 (Cut power or use an insulating object)", "给水降温 (Pour water)", "立刻搬动伤者跑走 (Carry them away immediately)"],
    a: 1,
    explanation: "直接接触会让施救者触电。先切断电源，无法切断时用干燥绝缘物隔离。 (Do not touch directly; cut power or use dry insulating material.)"
  },
  {
    q: "家中火灾报警器应该如何维护？ (How should home smoke alarms be maintained?)",
    options: ["装上后不再管 (Install and ignore)", "定期测试并按说明更换电池/设备 (Test regularly and replace batteries/devices as instructed)", "只在厨房安装一个 (Install only one in the kitchen)", "响了就拆掉 (Remove it if it alarms)"],
    a: 1,
    explanation: "烟雾报警器能提供关键逃生时间，但必须定期测试并保持可用。 (Smoke alarms save time for escape only if maintained.)"
  },
  {
    q: "家庭疏散通道应保持什么状态？ (What condition should home evacuation routes be kept in?)",
    options: ["堆放杂物节省空间 (Store items there)", "清晰、无障碍、夜间可辨认 (Clear, unobstructed, and identifiable at night)", "只留给成年人知道 (Known only to adults)", "用锁封住 (Locked shut)"],
    a: 1,
    explanation: "火灾或地震后视线差、时间短，通道堵塞会严重影响逃生。 (Blocked routes can cost critical escape time.)"
  },
  {
    q: "使用蜡烛照明时，哪项做法最安全？ (If using candles for light, what is safest?)",
    options: ["放在窗帘旁 (Place near curtains)", "离开房间也点着 (Leave burning unattended)", "使用稳固烛台并远离可燃物 (Use stable holders away from flammables)", "让儿童拿着照明 (Have children hold them)"],
    a: 2,
    explanation: "停电时优先用手电。必须用蜡烛时，要稳固放置、远离可燃物并有人看管。 (Flashlights are safer; if using candles, keep them stable, away from combustibles, and attended.)"
  },
  {
    q: "灾后清理积水房屋时，为什么要穿防护装备？ (Why wear protective gear when cleaning a flooded home?)",
    options: ["为了拍照好看 (For better photos)", "防止接触污染水、霉菌、尖锐物和化学品 (To avoid contaminated water, mold, sharp objects, and chemicals)", "可以完全不用通风 (So ventilation is unnecessary)", "可以不洗手 (So handwashing is unnecessary)"],
    a: 1,
    explanation: "洪水清理存在感染、割伤、化学暴露和霉菌风险，应穿手套、靴子、口罩并通风。 (Flood cleanup has biological, chemical, and injury hazards.)"
  },
  {
    q: "野火烟雾严重时，普通湿毛巾能否可靠过滤细颗粒物？ (During heavy wildfire smoke, can a wet towel reliably filter fine particles?)",
    options: ["可以完全替代口罩 (It fully replaces a respirator)", "不能，应减少暴露并使用合适防护如N95 (No; reduce exposure and use proper protection such as N95)", "只要颜色深就可以 (Only if dark colored)", "只对儿童有效 (Only for children)"],
    a: 1,
    explanation: "野火烟雾含细颗粒物，湿毛巾防护有限；应关闭门窗、过滤空气、减少外出并按需使用合适口罩。 (Wet towels are limited against fine particles; reduce exposure and use proper protection.)"
  },
  {
    q: "野火附近收到撤离提醒时，为什么要尽早离开？ (Why leave early when evacuation is advised near a wildfire?)",
    options: ["道路、烟雾和火势可能快速恶化 (Roads, smoke, and fire behavior can worsen quickly)", "早走可以看风景 (For sightseeing)", "撤离命令通常不重要 (Evacuation orders are usually unimportant)", "留到最后更安全 (It is safer to wait)"],
    a: 0,
    explanation: "野火蔓延快、烟雾会降低能见度，道路也可能封闭；早撤离更安全。 (Wildfires and smoke change fast; roads can close.)"
  },
  {
    q: "化学品泄漏要求就地避难时，通常应怎么做？ (If told to shelter in place during a chemical release, what should you usually do?)",
    options: ["关闭门窗和通风系统，进入室内 (Close windows/doors and ventilation, stay inside)", "跑到室外看风向 (Go outside to check wind)", "打开窗户通气 (Open windows)", "开车穿过泄漏区 (Drive through the release area)"],
    a: 0,
    explanation: "就地避难的目标是减少外部污染空气进入，等待官方进一步指令。 (Shelter-in-place reduces contaminated outdoor air entering.)"
  },
  {
    q: "收到陌生来源的灾害消息时，正确做法是？ (When receiving disaster information from an unknown source, what should you do?)",
    options: ["立刻转发 (Forward immediately)", "与官方渠道核实 (Verify with official channels)", "只看标题 (Read only the headline)", "按最夸张的说法行动 (Follow the most dramatic claim)"],
    a: 1,
    explanation: "灾害谣言会造成恐慌或误导行动，应以官方应急、气象、消防、社区通知为准。 (Verify with official emergency and weather sources.)"
  },
  {
    q: "准备家庭应急联系人卡时，哪项信息最有用？ (What is useful on a family emergency contact card?)",
    options: ["血型、过敏、药物、联系人和集合点 (Blood type, allergies, medicines, contacts, and meeting points)", "银行卡密码 (Bank card PINs)", "社交媒体密码 (Social media passwords)", "购物清单 (Shopping list)"],
    a: 0,
    explanation: "医疗和联系信息能帮助救援人员及家人快速沟通，但不要写敏感密码。 (Medical/contact details help; do not include passwords.)"
  }
];

export const quizQuestions: Question[] = rawQuestions.map((item) => ({
  q: splitBilingualText(item.q),
  options: item.options.map(splitBilingualText),
  a: item.a,
  explanation: splitBilingualText(item.explanation),
}));
