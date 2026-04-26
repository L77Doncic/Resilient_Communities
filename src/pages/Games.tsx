import { useState, useEffect } from 'react';
import { Shield, Heart, AlertCircle, Play, BrainCircuit, Map, Clock, CheckCircle2, XCircle, Mountain, Waves, Building2, Factory, TreePine } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { quizQuestions, Question } from '../data/quizQuestions';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';

type Sector = {
  id: string;
  name: string;
  risk: number;
  damage: number;
  terrain: string;
  climate: string;
  icon: any;
};

type GameEvent = {
  time: number;
  message: string;
  type: 'warning' | 'critical' | 'info';
};

const QUIZ_ROUND_SIZE = 10;

function drawQuizRound() {
  return [...quizQuestions]
    .sort(() => 0.5 - Math.random())
    .slice(0, QUIZ_ROUND_SIZE);
}

function ResourceGame({ onBack }: { onBack: () => void }) {
  const { t } = useAppContext();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inventory, setInventory] = useState({ sandbags: 15, medkits: 8 });
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [gameOver, setGameOver] = useState(false);
  
  const initialSectors: Sector[] = [
    { id: 'A', name: t('Coastal District', '滨海区'), risk: 30, damage: 0, terrain: t('Low-lying', '低洼地带'), climate: t('Humid', '潮湿多雨'), icon: Waves },
    { id: 'B', name: t('Mountain Valley', '山谷区'), risk: 20, damage: 0, terrain: t('Steep', '陡峭山地'), climate: t('Variable', '气候多变'), icon: Mountain },
    { id: 'C', name: t('Urban Center', '市中心'), risk: 40, damage: 0, terrain: t('Concrete', '水泥硬化'), climate: t('Heat Island', '热岛效应'), icon: Building2 },
    { id: 'D', name: t('Industrial Zone', '工业区'), risk: 10, damage: 0, terrain: t('Flat', '平坦开阔'), climate: t('Dry', '干燥少雨'), icon: Factory },
    { id: 'E', name: t('Forest Edge', '森林边缘'), risk: 15, damage: 0, terrain: t('Wooded', '植被茂密'), climate: t('Dry', '干燥易燃'), icon: TreePine },
  ];
  
  const [sectors, setSectors] = useState<Sector[]>(initialSectors);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0 && !gameOver) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        
        // Passive resource generation
        if (timeLeft % 5 === 0) {
          setInventory(prev => ({
            sandbags: prev.sandbags + 1,
            medkits: prev.medkits + (Math.random() > 0.5 ? 1 : 0)
          }));
        }

        // Random Events
        if (timeLeft % 8 === 0) {
          const randomSector = Math.floor(Math.random() * sectors.length);
          const eventTypes = ['heavy_rain', 'landslide', 'power_outage', 'wildfire'];
          const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
          
          let riskIncrease = 0;
          let msg = '';
          
          if (eventType === 'heavy_rain') {
            riskIncrease = 30;
            msg = t(`Heavy rain in ${initialSectors[randomSector].name}!`, `${initialSectors[randomSector].name}突降暴雨！`);
          } else if (eventType === 'landslide') {
            riskIncrease = 40;
            msg = t(`Landslide warning in ${initialSectors[randomSector].name}!`, `${initialSectors[randomSector].name}滑坡预警！`);
          } else if (eventType === 'wildfire') {
            riskIncrease = 35;
            msg = t(`Wildfire spotted near ${initialSectors[randomSector].name}!`, `${initialSectors[randomSector].name}附近发现野火！`);
          } else {
            riskIncrease = 20;
            msg = t(`Power outage in ${initialSectors[randomSector].name}.`, `${initialSectors[randomSector].name}大面积停电。`);
          }

          setEvents(prev => [{ time: timeLeft, message: msg, type: riskIncrease > 30 ? 'critical' : 'warning' }, ...prev].slice(0, 5));
          
          setSectors(prev => prev.map((s, idx) => {
            if (idx === randomSector) return { ...s, risk: Math.min(100, s.risk + riskIncrease) };
            return s;
          }));
        } else {
          // Normal risk creep
          setSectors(prev => prev.map(s => {
            const newRisk = Math.min(100, s.risk + Math.floor(Math.random() * 4));
            let newDamage = s.damage;
            if (newRisk === 100) {
              newDamage += 5; // Take damage if risk is 100
            }
            return { ...s, risk: newRisk, damage: newDamage };
          }));
        }
      }, 1000);
    } else if (timeLeft === 0 || gameOver) {
      setIsPlaying(false);
    }

    // Check game over condition
    const totalDamage = sectors.reduce((acc, s) => acc + s.damage, 0);
    if (totalDamage >= 100 && !gameOver) {
      setGameOver(true);
      setIsPlaying(false);
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, gameOver, sectors, t]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(180);
    setInventory({ sandbags: 15, medkits: 8 });
    setSectors(initialSectors);
    setEvents([{ time: 180, message: t('Storm approaching. Defend the sectors!', '风暴即将来临。保护各个区域！'), type: 'info' }]);
    setIsPlaying(true);
    setGameOver(false);
  };

  const allocateResource = (sectorId: string, type: 'sandbags' | 'medkits') => {
    if (!isPlaying || inventory[type] <= 0) return;

    setInventory(prev => ({ ...prev, [type]: prev[type] - 1 }));
    setSectors(prev => prev.map(s => {
      if (s.id === sectorId) {
        const riskReduction = type === 'sandbags' ? 25 : 15;
        const damageReduction = type === 'medkits' ? 10 : 0;
        
        setScore(prevScore => prevScore + riskReduction + (damageReduction * 2));
        
        return {
          ...s,
          risk: Math.max(0, s.risk - riskReduction),
          damage: Math.max(0, s.damage - damageReduction)
        };
      }
      return s;
    }));
  };

  const totalDamage = sectors.reduce((acc, s) => acc + s.damage, 0);

  return (
    <div className="bg-pure-white border border-oat-border rounded-lg p-8 clay-shadow max-w-6xl mx-auto my-12">
      <div className="flex items-center justify-between mb-8 pb-8 border-b border-oat-light">
        <div className="flex gap-8 items-center">
          <button onClick={onBack} className="text-warm-silver hover:text-clay-black font-medium">← {t('Back', '返回')}</button>
          <div>
            <p className="text-[14px] text-warm-silver uppercase tracking-[1.08px] font-semibold mb-1">{t('Time Left', '剩余时间')}</p>
            <p className="text-[32px] font-mono font-bold text-clay-black flex items-center gap-2">
              <Clock size={24} className={timeLeft < 15 ? 'text-pomegranate-400 animate-pulse' : ''} />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </p>
          </div>
          <div>
            <p className="text-[14px] text-warm-silver uppercase tracking-[1.08px] font-semibold mb-1">{t('City Damage', '城市受损度')}</p>
            <p className={`text-[32px] font-mono font-bold ${totalDamage > 50 ? 'text-pomegranate-400' : 'text-clay-black'}`}>
              {totalDamage}%
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-oat-light px-4 py-2 rounded-md flex items-center gap-2 text-clay-black" title={t('Sandbags (Reduces Risk)', '沙袋 (降低风险)')}>
            <Shield size={20} className="text-matcha-600" />
            <span className="font-mono font-bold text-[20px]">{inventory.sandbags}</span>
          </div>
          <div className="bg-oat-light px-4 py-2 rounded-md flex items-center gap-2 text-clay-black" title={t('Medkits (Reduces Damage)', '急救包 (修复受损)')}>
            <Heart size={20} className="text-pomegranate-400" />
            <span className="font-mono font-bold text-[20px]">{inventory.medkits}</span>
          </div>
        </div>
      </div>

      {!isPlaying && timeLeft === 180 && !gameOver ? (
        <div className="text-center py-12">
          <h2 className="text-[32px] font-semibold mb-4 text-clay-black">{t('Resilience Commander', '韧性指挥官')}</h2>
          <p className="text-[18px] text-warm-silver mb-8 max-w-2xl mx-auto">
            {t('A severe 3-minute storm is hitting the city. Allocate sandbags to reduce risk, and medkits to heal damage across 5 diverse sectors. If total damage reaches 100%, the city falls.', '一场持续3分钟的强风暴正在袭击城市。在5个不同地形的区域中分配沙袋降低风险，分配急救包修复受损。如果总受损度达到100%，城市将沦陷。')}
          </p>
          <button 
            onClick={startGame}
            className="bg-clay-black text-pure-white px-8 py-4 rounded-md text-[20px] font-medium clay-hover"
          >
            {t('Start Mission', '开始任务')}
          </button>
        </div>
      ) : (!isPlaying && (timeLeft === 0 || gameOver)) ? (
        <div className="text-center py-12">
          <h2 className="text-[32px] font-semibold mb-4 text-clay-black">
            {gameOver ? t('Mission Failed', '任务失败') : t('Mission Complete!', '任务完成！')}
          </h2>
          <p className="text-[20px] text-warm-silver mb-8">
            {gameOver 
              ? t('The city sustained too much damage.', '城市遭受了过多的破坏。') 
              : t(`City survived with ${totalDamage}% damage. Score: ${score}`, `城市成功挺过危机，受损度 ${totalDamage}%。得分：${score}`)}
          </p>
          <button 
            onClick={startGame}
            className="bg-clay-black text-pure-white px-8 py-4 rounded-md text-[20px] font-medium clay-hover"
          >
            {t('Play Again', '再玩一次')}
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sectors.map(sector => {
              const Icon = sector.icon;
              return (
                <div 
                  key={sector.id} 
                  className={`border rounded-lg p-5 transition-colors relative overflow-hidden ${
                    sector.risk > 80 ? 'bg-pomegranate-400/10 border-pomegranate-400' : 
                    sector.risk > 50 ? 'bg-lemon-400/10 border-lemon-400' : 
                    'bg-pure-white border-oat-border'
                  }`}
                >
                  {sector.damage > 0 && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-pomegranate-400" style={{ opacity: sector.damage / 100 }} />
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-oat-light rounded-lg text-clay-black"><Icon size={18} /></div>
                      <h3 className="text-[18px] font-semibold text-clay-black">{sector.name}</h3>
                    </div>
                    {sector.risk > 80 && <AlertCircle className="text-pomegranate-400 animate-pulse" size={20} />}
                  </div>
                  
                  <div className="flex gap-2 mb-4 text-[12px] font-medium">
                    <span className="bg-oat-light text-warm-charcoal px-2 py-1 rounded-md">{sector.terrain}</span>
                    <span className="bg-oat-light text-warm-charcoal px-2 py-1 rounded-md">{sector.climate}</span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-[13px] mb-1 font-mono text-clay-black">
                      <span>{t('Risk', '风险')}</span>
                      <span className={sector.risk > 80 ? 'text-pomegranate-400 font-bold' : ''}>{sector.risk}%</span>
                    </div>
                    <div className="h-1.5 bg-oat-light rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          sector.risk > 80 ? 'bg-pomegranate-400' : 
                          sector.risk > 50 ? 'bg-lemon-500' : 
                          'bg-matcha-600'
                        }`}
                        style={{ width: `${sector.risk}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex justify-between text-[13px] mb-1 font-mono text-clay-black">
                      <span>{t('Damage', '受损')}</span>
                      <span className={sector.damage > 0 ? 'text-pomegranate-400 font-bold' : ''}>{sector.damage}%</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => allocateResource(sector.id, 'sandbags')}
                      disabled={inventory.sandbags === 0}
                      className="flex-1 bg-pure-white border border-oat-border py-2.5 rounded-md flex justify-center items-center gap-2 hover:bg-matcha-300 transition-colors disabled:opacity-50 disabled:hover:bg-pure-white text-clay-black font-semibold text-[14px]"
                    >
                      <Shield size={16} /> -25%
                    </button>
                    <button 
                      onClick={() => allocateResource(sector.id, 'medkits')}
                      disabled={inventory.medkits === 0 || sector.damage === 0}
                      className="flex-1 bg-pure-white border border-oat-border py-2.5 rounded-md flex justify-center items-center gap-2 hover:bg-pomegranate-400 hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-pure-white text-clay-black font-semibold text-[14px]"
                    >
                      <Heart size={16} /> -10%
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-oat-light/50 rounded-lg p-6 border border-oat-border h-full flex flex-col">
            <h3 className="font-semibold text-clay-black mb-4">{t('Event Log', '事件日志')}</h3>
            <div className="space-y-3 flex-1 overflow-y-auto">
              {events.map((ev, i) => (
                <div key={i} className={`text-[13px] p-3 rounded-lg border ${
                  ev.type === 'critical' ? 'bg-pomegranate-400/10 border-pomegranate-400/20 text-pomegranate-600' :
                  ev.type === 'warning' ? 'bg-lemon-400/10 border-lemon-400/20 text-lemon-700' :
                  'bg-white border-oat-border text-warm-charcoal'
                }`}>
                  <span className="font-mono text-[11px] opacity-70 block mb-1">
                    T-{Math.floor(ev.time / 60)}:{(ev.time % 60).toString().padStart(2, '0')}
                  </span>
                  {ev.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuizGame({ onBack }: { onBack: () => void }) {
  const { t, language } = useAppContext();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  
  useEffect(() => {
    setQuestions(drawQuizRound());
  }, []);

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredState, setAnsweredState] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    if (answeredState !== 'none') return; // Prevent multiple clicks
    
    setSelectedOption(index);
    if (index === questions[currentQ].a) {
      setScore(score + 1);
      setAnsweredState('correct');
    } else {
      setAnsweredState('incorrect');
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setAnsweredState('none');
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) return null;

  return (
    <div className="bg-pure-white border border-oat-border rounded-lg p-8 clay-shadow max-w-3xl mx-auto my-12">
      <button onClick={onBack} className="text-warm-silver hover:text-clay-black font-medium mb-8">← {t('Back', '返回')}</button>
      
      {showResult ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-matcha-600/20 text-matcha-600 rounded-lg flex items-center justify-center mx-auto mb-6">
            <BrainCircuit size={48} />
          </div>
          <h2 className="text-[32px] font-semibold mb-4 text-clay-black">{t('Quiz Complete!', '问答完成！')}</h2>
          <p className="text-[20px] text-warm-silver mb-8">{t(`You scored ${score} out of ${questions.length}`, `你答对了 ${score} 道题，共 ${questions.length} 道`)}</p>
          <button 
            onClick={() => { 
              setQuestions(drawQuizRound());
              setCurrentQ(0); 
              setScore(0); 
              setShowResult(false); 
              setAnsweredState('none'); 
              setSelectedOption(null); 
            }}
            className="bg-clay-black text-pure-white px-8 py-4 rounded-md text-[20px] font-medium clay-hover"
          >
            {t('Try Again', '再试一次')}
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[14px] text-warm-silver uppercase tracking-[1.08px] font-semibold">{t(`Question ${currentQ + 1} of ${questions.length}`, `第 ${currentQ + 1} 题，共 ${questions.length} 题`)}</p>
              <p className="text-[14px] font-mono font-bold text-clay-black">{t('Score:', '得分：')} {score}</p>
            </div>
            <div className="h-2 bg-oat-light rounded-full overflow-hidden mb-6">
              <div className="h-full bg-lemon-500 transition-all duration-300" style={{ width: `${((currentQ) / questions.length) * 100}%` }} />
            </div>
            <h2 className="text-[24px] font-semibold text-clay-black leading-[1.4]">{questions[currentQ].q[language]}</h2>
          </div>
          
          <div className="space-y-4 mb-8">
            {questions[currentQ].options.map((opt, i) => {
              let btnClass = "w-full text-left p-5 rounded-md border transition-all text-[18px] font-medium ";
              
              if (answeredState === 'none') {
                btnClass += "border-oat-border bg-pure-white hover:bg-oat-light text-clay-black";
              } else {
                if (i === questions[currentQ].a) {
                  btnClass += "border-matcha-600 bg-matcha-600/10 text-matcha-700"; // Correct answer always highlights green
                } else if (i === selectedOption) {
                  btnClass += "border-pomegranate-400 bg-pomegranate-400/10 text-pomegranate-600"; // Wrong selected answer highlights red
                } else {
                  btnClass += "border-oat-border bg-pure-white opacity-50 text-warm-silver"; // Others fade out
                }
              }

              return (
                <button 
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answeredState !== 'none'}
                  className={btnClass}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt[language]}</span>
                    {answeredState !== 'none' && i === questions[currentQ].a && <CheckCircle2 size={24} className="text-matcha-600" />}
                    {answeredState !== 'none' && i === selectedOption && i !== questions[currentQ].a && <XCircle size={24} className="text-pomegranate-400" />}
                  </div>
                </button>
              );
            })}
          </div>

          {answeredState !== 'none' && (
            <div className={`p-6 rounded-lg mb-8 animate-in fade-in slide-in-from-bottom-4 ${answeredState === 'correct' ? 'bg-matcha-600/10 border border-matcha-600/20' : 'bg-pomegranate-400/10 border border-pomegranate-400/20'}`}>
              <h3 className={`font-bold mb-2 flex items-center gap-2 ${answeredState === 'correct' ? 'text-matcha-700' : 'text-pomegranate-600'}`}>
                {answeredState === 'correct' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                {answeredState === 'correct' ? t('Correct!', '回答正确！') : t('Incorrect!', '回答错误！')}
              </h3>
              <p className="text-warm-charcoal leading-[1.6]">{questions[currentQ].explanation[language]}</p>
            </div>
          )}

          {answeredState !== 'none' && (
            <button 
              onClick={nextQuestion}
              className="w-full bg-clay-black text-pure-white py-4 rounded-md text-[18px] font-medium clay-hover"
            >
              {currentQ < questions.length - 1 ? t('Next Question', '下一题') : t('See Results', '查看结果')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function Games() {
  const { t } = useAppContext();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="bg-warm-cream">
            <PageHero
              eyebrow={t('Interactive Learning', '互动学习')}
              title={t('Resilience Training Center', '韧性训练中心')}
              description={t('Practice resource allocation and answer realistic emergency questions. The quiz now draws 10 questions from a 50-question disaster-safety bank each time.', '练习资源调度，并回答真实应急场景题。答题每次会从50题防灾题库中随机抽取10题。')}
              image="/common/img/elements/induction-interview.webp"
              icon={BrainCircuit}
            />

            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-pure-white border border-oat-border rounded-lg p-8 clay-shadow flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-lg bg-ube-300 text-ube-900 flex items-center justify-center mb-6">
                  <Map size={32} />
                </div>
                <h3 className="text-[24px] font-semibold mb-4 text-clay-black">{t('Resilience Commander', '韧性指挥官')}</h3>
                <p className="text-warm-charcoal mb-8">
                  {t(
                    'Act as the community commander. Manage resources and respond to dynamic weather events to keep the city safe.',
                    '扮演社区指挥官。管理资源并应对动态天气事件，以确保城市安全。'
                  )}
                </p>
                <Link
                  to="commander"
                  className="bg-clay-black text-pure-white px-6 py-3 rounded-md font-medium clay-hover flex items-center gap-2 mt-auto"
                >
                  <Play size={18} /> {t('Play Game', '开始游戏')}
                </Link>
              </div>

              <div className="bg-pure-white border border-oat-border rounded-lg p-8 clay-shadow flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-lg bg-lemon-400 text-lemon-800 flex items-center justify-center mb-6">
                  <BrainCircuit size={32} />
                </div>
                <h3 className="text-[24px] font-semibold mb-4 text-clay-black">{t('Survival Quiz', '生存问答')}</h3>
                <p className="text-warm-charcoal mb-8">
                  {t(
                    'Test your knowledge on disaster response with detailed explanations for every scenario.',
                    '通过详细的场景解析，测试您在灾害应对方面的知识。'
                  )}
                </p>
                <Link
                  to="quiz"
                  className="bg-clay-black text-pure-white px-6 py-3 rounded-md font-medium clay-hover flex items-center gap-2 mt-auto"
                >
                  <Play size={18} /> {t('Start Quiz', '开始问答')}
                </Link>
              </div>
              </div>
            </div>
          </div>
        }
      />
      <Route path="commander" element={<div className="bg-warm-cream px-6"><ResourceGame onBack={() => navigate('/games')} /></div>} />
      <Route path="quiz" element={<div className="bg-warm-cream px-6"><QuizGame onBack={() => navigate('/games')} /></div>} />
    </Routes>
  );
}
