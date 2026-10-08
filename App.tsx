import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  VolumeX,
  HelpCircle,
  Users,
  PhoneCall,
  Sparkles,
  RotateCcw,
  BookOpen,
  Trophy,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Flame,
  Award,
  Mic,
  MessageSquare,
  Play,
  Languages,
} from 'lucide-react';
import {
  QUESTIONS,
  PARTS,
  PRIZE_LADDER,
  ORAL_PRACTICE_SAMPLE,
  Question,
  QuestionOption,
} from './questionsData';
import { sounds, speakSpanish } from './audioUtils';

type TabMode = 'game' | 'handbook' | 'oral';

export default function App() {
  // Navigation & Game State
  const [activeTab, setActiveTab] = useState<TabMode>('game');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [firstTryCorrectCount, setFirstTryCorrectCount] = useState<number>(0);
  const [questionAttempts, setQuestionAttempts] = useState<Record<number, number>>({});
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  // Armenian Translation toggles
  // Per-line translation reveal state for current question:
  const [revealedTranslations, setRevealedTranslations] = useState<Record<string, boolean>>({});
  // Global toggle: always reveal or click-to-reveal
  const [alwaysShowTranslations, setAlwaysShowTranslations] = useState<boolean>(false);

  // Lifelines
  const [lifeline5050Used, setLifeline5050Used] = useState<boolean>(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [audiencePollModal, setAudiencePollModal] = useState<boolean>(false);
  const [audiencePollData, setAudiencePollData] = useState<Record<string, number> | null>(null);
  const [phoneFriendModal, setPhoneFriendModal] = useState<boolean>(false);
  const [phoneFriendHint, setPhoneFriendHint] = useState<string | null>(null);

  // Audio settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Mobile drawer for prize ladder
  const [showMobileLadder, setShowMobileLadder] = useState<boolean>(false);

  // Handbook filter
  const [handbookPartFilter, setHandbookPartFilter] = useState<number | 'all'>('all');
  const [handbookRevealed, setHandbookRevealed] = useState<Record<string, boolean>>({});

  // Oral practice state
  const [oralActiveLine, setOralActiveLine] = useState<number>(0);
  const [oralRevealed, setOralRevealed] = useState<Record<number, boolean>>({});

  const currentQ: Question = QUESTIONS[currentIndex] || QUESTIONS[0];

  // Sound toggle handler
  const handleToggleSound = () => {
    const next = sounds.toggleSound();
    setSoundEnabled(next);
  };

  // Trigger TTS
  const handleSpeak = async (text: string) => {
    setIsSpeaking(true);
    await speakSpanish(text);
    setIsSpeaking(false);
  };

  // Toggle individual translation reveal
  const toggleTranslation = (id: string) => {
    setRevealedTranslations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isLineRevealed = (id: string) => {
    return alwaysShowTranslations || !!revealedTranslations[id];
  };

  // Handle Option Click
  const handleSelectOption = (opt: QuestionOption) => {
    if (hasAnswered && isCorrect) return; // already got it right

    setSelectedKey(opt.key);
    sounds.playLockIn();

    const correct = opt.key === currentQ.correctKey;
    setIsCorrect(correct);
    setHasAnswered(true);

    // Track attempt count for this question
    const attempts = (questionAttempts[currentQ.id] || 0) + 1;
    setQuestionAttempts((prev) => ({ ...prev, [currentQ.id]: attempts }));

    if (correct) {
      sounds.playCorrect();
      if (attempts === 1) {
        setFirstTryCorrectCount((prev) => prev + 1);
      }
      setCompletedQuestions((prev) => new Set(prev).add(currentQ.id));

      // Trigger Confetti for milestones and general correct answers
      if (currentQ.isMilestone || currentQ.id === 30) {
        sounds.playWin();
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#eab308', '#22c55e', '#38bdf8', '#a855f7'],
        });
      } else {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.7 },
        });
      }
    } else {
      // Wrong answer sound - BUT THE GAME CONTINUES!
      sounds.playWrong();
    }
  };

  // Continue to Next Question
  const handleNextQuestion = () => {
    sounds.playSelect();
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      resetQuestionState();
    } else {
      // Finished all 30 questions!
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
      });
      sounds.playWin();
    }
  };

  // Retry same question if wrong
  const handleRetryQuestion = () => {
    sounds.playSelect();
    setSelectedKey(null);
    setHasAnswered(false);
    setIsCorrect(null);
  };

  // Reset state when jumping or advancing
  const resetQuestionState = () => {
    setSelectedKey(null);
    setHasAnswered(false);
    setIsCorrect(null);
    setEliminatedOptions([]);
    setRevealedTranslations({});
    setAudiencePollModal(false);
    setPhoneFriendModal(false);
  };

  // Jump to specific question
  const handleJumpToQuestion = (index: number) => {
    sounds.playSelect();
    setCurrentIndex(index);
    resetQuestionState();
    setShowMobileLadder(false);
  };

  // Lifeline 50:50
  const handleUse5050 = () => {
    if (lifeline5050Used || hasAnswered) return;
    sounds.playLifeline();
    setLifeline5050Used(true);

    const wrongKeys = currentQ.options
      .filter((opt) => opt.key !== currentQ.correctKey)
      .map((opt) => opt.key);

    // Shuffle and pick 2 wrong options to eliminate
    const shuffled = [...wrongKeys].sort(() => 0.5 - Math.random());
    setEliminatedOptions([shuffled[0], shuffled[1]]);
  };

  // Lifeline Audience Poll
  const handleUseAudience = () => {
    if (hasAnswered) return;
    sounds.playLifeline();

    // Generate realistic poll with strong bias to correct key
    const remaining = 100;
    const correctPercent = Math.floor(Math.random() * 20) + 65; // 65% - 84%
    const rest = remaining - correctPercent;
    const r1 = Math.floor(Math.random() * (rest - 8)) + 3;
    const r2 = Math.floor(Math.random() * (rest - r1 - 4)) + 2;
    const r3 = rest - r1 - r2;

    const wrongDist = [r1, r2, r3];
    let wrongIdx = 0;

    const data: Record<string, number> = {};
    currentQ.options.forEach((opt) => {
      if (opt.key === currentQ.correctKey) {
        data[opt.key] = correctPercent;
      } else {
        data[opt.key] = wrongDist[wrongIdx++] || 5;
      }
    });

    setAudiencePollData(data);
    setAudiencePollModal(true);
  };

  // Lifeline Phone a Friend
  const handleUsePhoneFriend = () => {
    if (hasAnswered) return;
    sounds.playLifeline();
    const correctOpt = currentQ.options.find((o) => o.key === currentQ.correctKey);
    const hints = [
      `«¡Hola! Ես 95%-ով վստահ եմ, որ ճիշտ պատասխանն է ${currentQ.correctKey}) «${correctOpt?.es}»։ Իսպանիայում մենք հենց այս արտահայտությունն ենք օգտագործում այս համատեքստում։»`,
      `«Բարև՛։ Ես լսեցի հարցը. անկասկած ${currentQ.correctKey}) «${correctOpt?.es}» է (${correctOpt?.am})։ Դա դասական B1-B2 խոսակցական կառույց է։»`,
    ];
    setPhoneFriendHint(hints[Math.floor(Math.random() * hints.length)]);
    setPhoneFriendModal(true);
  };

  // Restart whole game
  const handleRestartGame = () => {
    if (window.confirm('Ցանկանո՞ւմ եք սկսել խաղը սկզբից:')) {
      setCurrentIndex(0);
      setFirstTryCorrectCount(0);
      setQuestionAttempts({});
      setCompletedQuestions(new Set());
      setLifeline5050Used(false);
      resetQuestionState();
    }
  };

  // Calculate current winnings/status
  const currentPrize = PRIZE_LADDER[currentIndex] || '1,000';
  const totalCompleted = completedQuestions.size;
  const isGameCompleted = currentIndex === 29 && hasAnswered && isCorrect;

  return (
    <div className="min-h-screen millionaire-bg text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-indigo-900/60 shadow-lg px-3 py-2.5 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-3xl filter drop-shadow">🇪🇸</span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-wide bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                  Habla como un español
                </h1>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                  B1–B2
                </span>
              </div>
              <p className="text-xs text-indigo-300 font-medium">Խոսի՛ր իսպանացու պես — 30 երկխոսություն</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => {
                sounds.playSelect();
                setActiveTab('game');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'game'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-md shadow-amber-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Միլիոնատեր</span>
            </button>

            <button
              onClick={() => {
                sounds.playSelect();
                setActiveTab('handbook');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'handbook'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-md shadow-amber-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>30 Երկխոսություն</span>
            </button>

            <button
              onClick={() => {
                sounds.playSelect();
                setActiveTab('oral');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'oral'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-md shadow-amber-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Բանավոր խոսք</span>
            </button>
          </nav>

          {/* Quick Controls */}
          <div className="flex items-center gap-2">
            {/* Sound toggle */}
            <button
              onClick={handleToggleSound}
              title={soundEnabled ? 'Անջատել ձայնը' : 'Միացնել ձայնը'}
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
            </button>

            {/* Mobile Ladder Toggle */}
            <button
              onClick={() => setShowMobileLadder(!showMobileLadder)}
              className="lg:hidden px-2 py-1 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-bold"
            >
              {currentPrize} ֏
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 flex flex-col">
        {activeTab === 'game' && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left / Main Column: Stage, Question, Dialogue, Options */}
            <div className="lg:col-span-8 flex flex-col justify-between gap-4">
              {/* Header Status Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-indigo-900/40 rounded-xl p-3 shadow-inner">
                {/* Part & Topic Badge */}
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                      Մաս {currentQ.part} • {currentQ.partTitleAm}
                    </span>
                    <h2 className="text-sm font-semibold text-slate-200">
                      {currentQ.id}. {currentQ.topicEs} — {currentQ.topicAm}
                    </h2>
                  </div>
                </div>

                {/* Score & Progress */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <span className="text-slate-400">Հարց:</span>{' '}
                    <span className="text-amber-300 font-bold">
                      {currentQ.id} / {QUESTIONS.length}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400">Միավոր:</span>{' '}
                    <span className="text-emerald-400 font-bold">
                      {firstTryCorrectCount} / {totalCompleted}
                    </span>
                  </div>
                  <div className="hidden sm:block text-right">
                    <span className="text-slate-400">Մրցանակ:</span>{' '}
                    <span className="text-yellow-400 font-black text-sm">{currentPrize} ֏</span>
                  </div>
                </div>
              </div>

              {/* Lifelines Toolbar */}
              <div className="flex items-center justify-between bg-slate-950/70 border border-indigo-950 rounded-2xl p-2.5 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 hidden sm:inline ml-2">Օգնություններ:</span>

                  {/* 50:50 Lifeline */}
                  <button
                    onClick={handleUse5050}
                    disabled={lifeline5050Used || hasAnswered}
                    title="Հեռացնել 2 սխալ պատասխան"
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                      lifeline5050Used
                        ? 'opacity-30 border-slate-800 bg-slate-900 text-slate-600 line-through cursor-not-allowed'
                        : 'border-amber-500/50 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 hover:scale-105 active:scale-95 shadow-sm'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>50:50</span>
                  </button>

                  {/* Audience Poll */}
                  <button
                    onClick={handleUseAudience}
                    disabled={hasAnswered}
                    title="Լսարանի օգնություն"
                    className="px-3 py-1.5 rounded-xl border border-sky-500/50 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 hover:scale-105 active:scale-95 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Լսարան</span>
                  </button>

                  {/* Phone Friend */}
                  <button
                    onClick={handleUsePhoneFriend}
                    disabled={hasAnswered}
                    title="Զանգ ընկերոջը (Մադրիդ)"
                    className="px-3 py-1.5 rounded-xl border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 hover:scale-105 active:scale-95 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Զանգ</span>
                  </button>
                </div>

                {/* Translation Reveal Global Switch */}
                <button
                  onClick={() => setAlwaysShowTranslations(!alwaysShowTranslations)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    alwaysShowTranslations
                      ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300'
                      : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white'
                  }`}
                  title="Միշտ ցույց տալ հայերեն թարգմանությունը կամ բացել միայն սեղմելիս"
                >
                  <Languages className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">
                    {alwaysShowTranslations ? 'Թարգմանությունը բաց է' : 'Սեղմիր իսպ.՝ թարգմանելու համար'}
                  </span>
                  <span className="md:hidden">Թարգմ.</span>
                  {alwaysShowTranslations ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Dialogue Podium Stage */}
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-900/90 border-2 border-indigo-900/80 p-4 sm:p-6 shadow-2xl overflow-hidden">
                {/* Background decorative spot lights */}
                <div className="absolute -top-24 -left-24 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative space-y-4">
                  {/* Speaker A Line */}
                  <div
                    onClick={() => toggleTranslation(`q${currentQ.id}_A`)}
                    className="group cursor-pointer p-3.5 sm:p-4 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-700/60 hover:border-amber-400/60 transition-all shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base">🇪🇸</span>
                          <span className="text-xs font-bold text-amber-400 tracking-wide uppercase">
                            Խոսող 1 {currentQ.dialogue.speakerA.es.includes('_____') ? '(Ընտրեք ճիշտ տարբերակը)' : '(Սեղմեք թարգմանության համար)'}
                          </span>
                        </div>
                        {currentQ.dialogue.speakerA.es.includes('_____') ? (
                          hasAnswered ? (
                            <p className="text-base sm:text-lg font-bold text-white tracking-wide leading-relaxed">
                              {currentQ.dialogue.speakerA.esCompleted || currentQ.dialogue.speakerA.es}
                            </p>
                          ) : (
                            <p className="text-base sm:text-lg font-semibold text-white tracking-wide leading-relaxed">
                              {currentQ.dialogue.speakerA.es.split('_____')[0]}
                              <span className="inline-block px-3 py-0.5 mx-1.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/50 font-mono tracking-widest text-sm animate-pulse">
                                _____
                              </span>
                              {currentQ.dialogue.speakerA.es.split('_____')[1]}
                            </p>
                          )
                        ) : (
                          <p className="text-base sm:text-lg font-semibold text-white tracking-wide leading-relaxed">
                            {currentQ.dialogue.speakerA.es}
                          </p>
                        )}
                      </div>

                      {/* TTS Play Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeak(
                            hasAnswered && currentQ.dialogue.speakerA.esCompleted
                              ? currentQ.dialogue.speakerA.esCompleted
                              : currentQ.dialogue.speakerA.es
                          );
                        }}
                        className="p-2 rounded-lg bg-indigo-950/80 border border-indigo-800/80 text-amber-300 hover:text-white hover:bg-amber-600 transition-colors"
                        title="Լսել արտասանությունը"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Armenian Translation Reveal */}
                    {isLineRevealed(`q${currentQ.id}_A`) && (
                      <div className="mt-2.5 pt-2.5 border-t border-slate-800 text-sm text-amber-200 font-medium flex items-center gap-2 animate-fadeIn">
                        <span className="text-base">🇦🇲</span>
                        <span>{currentQ.dialogue.speakerA.am}</span>
                      </div>
                    )}
                  </div>

                  {/* Speaker B Line (The Question Blank) */}
                  <div
                    onClick={() => toggleTranslation(`q${currentQ.id}_B`)}
                    className="group cursor-pointer p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 hover:bg-slate-850 border-2 border-indigo-800/70 hover:border-amber-400/70 transition-all shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base">🇪🇸</span>
                          <span className="text-xs font-bold text-sky-400 tracking-wide uppercase">
                            Խոսող 2 (Ընտրեք ճիշտ տարբերակը)
                          </span>
                        </div>

                        {/* If answered, display completed sentence with highlight */}
                        {hasAnswered ? (
                          <p className="text-base sm:text-lg font-bold text-white tracking-wide leading-relaxed">
                            {currentQ.dialogue.speakerB.esCompleted}
                          </p>
                        ) : (
                          <p className="text-base sm:text-lg font-semibold text-white tracking-wide leading-relaxed">
                            {currentQ.dialogue.speakerB.es.split('_____')[0]}
                            <span className="inline-block px-3 py-0.5 mx-1.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/50 font-mono tracking-widest text-sm animate-pulse">
                              _____
                            </span>
                            {currentQ.dialogue.speakerB.es.split('_____')[1]}
                          </p>
                        )}
                      </div>

                      {/* TTS Play Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeak(
                            (hasAnswered && currentQ.dialogue.speakerB.esCompleted)
                              ? currentQ.dialogue.speakerB.esCompleted
                              : currentQ.dialogue.speakerB.es
                          );
                        }}
                        className="p-2 rounded-lg bg-indigo-950/80 border border-indigo-800/80 text-amber-300 hover:text-white hover:bg-amber-600 transition-colors"
                        title="Լսել արտասանությունը"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Armenian Translation Reveal */}
                    {isLineRevealed(`q${currentQ.id}_B`) && (
                      <div className="mt-2.5 pt-2.5 border-t border-slate-800 text-sm text-sky-200 font-medium flex items-center gap-2 animate-fadeIn">
                        <span className="text-base">🇦🇲</span>
                        <span>{currentQ.dialogue.speakerB.am}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="text-amber-400">👆</span> Սեղմեք ցանկացած տողի վրա՝ հայերեն թարգմանությունը
                    տեսնելու համար
                  </span>
                  <span className="text-slate-500 font-mono">B1-B2 Coloquial</span>
                </div>
              </div>

              {/* 4 Answer Options (Millionaire Diamond Cut Buttons) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {currentQ.options.map((opt) => {
                  const isEliminated = eliminatedOptions.includes(opt.key);
                  const isChosen = selectedKey === opt.key;
                  const isCorrectOption = opt.key === currentQ.correctKey;

                  // Styling logic
                  let btnBg = 'bg-slate-900/90 hover:bg-slate-800/90 text-slate-100 border-indigo-900/80 hover:border-amber-400/80';
                  let badgeBg = 'bg-amber-500/20 text-amber-400 border-amber-500/40';

                  if (hasAnswered) {
                    if (isCorrectOption) {
                      btnBg = 'bg-emerald-950/90 border-emerald-500 text-emerald-100 shadow-lg shadow-emerald-500/20';
                      badgeBg = 'bg-emerald-500 text-black font-black border-emerald-400';
                    } else if (isChosen && !isCorrectOption) {
                      btnBg = 'bg-rose-950/90 border-rose-500 text-rose-100 shadow-lg shadow-rose-500/20 animate-shake';
                      badgeBg = 'bg-rose-500 text-white font-black border-rose-400';
                    } else {
                      btnBg = 'opacity-40 bg-slate-950/60 border-slate-800 text-slate-500';
                      badgeBg = 'bg-slate-800 text-slate-500 border-slate-700';
                    }
                  } else if (isEliminated) {
                    btnBg = 'opacity-20 pointer-events-none bg-slate-950 border-slate-900 text-slate-700';
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => !isEliminated && handleSelectOption(opt)}
                      disabled={isEliminated || (hasAnswered && isCorrect === true)}
                      className={`group relative text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${btnBg}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs shadow-inner ${badgeBg}`}
                          >
                            {opt.key}
                          </span>
                          <span className="text-base sm:text-lg font-bold tracking-wide">
                            {opt.es}
                          </span>
                        </div>

                        {/* Status Icon */}
                        {hasAnswered && isCorrectOption && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 animate-bounce" />
                        )}
                        {hasAnswered && isChosen && !isCorrectOption && (
                          <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                        )}
                      </div>

                      {/* Always show or click-revealed Armenian meaning for this option */}
                      {(isLineRevealed(`opt_${opt.key}`) || hasAnswered) && (
                        <div className="mt-2 pt-2 border-t border-slate-850 text-xs text-amber-200/90 font-medium flex items-center gap-1.5 animate-fadeIn">
                          <span>🇦🇲</span>
                          <span>{opt.am}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and "Continue Playing" Banner */}
              {hasAnswered && (
                <div
                  className={`p-4 sm:p-5 rounded-2xl border-2 shadow-2xl transition-all animate-fadeIn ${
                    isCorrect
                      ? 'bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-emerald-950/80 border-emerald-500/70'
                      : 'bg-gradient-to-r from-amber-950/80 via-slate-900/90 to-rose-950/80 border-amber-500/70'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            <span className="text-sm font-black text-emerald-400 uppercase tracking-wider">
                              ¡Excelente! Ճիշտ պատասխան
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-rose-400" />
                            <span className="text-sm font-black text-amber-300 uppercase tracking-wider">
                              Ոչինչ, խաղը շարունակվում է! Ճիշտ տարբերակն է {currentQ.correctKey}) {currentQ.options.find(o => o.key === currentQ.correctKey)?.es}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Detailed Armenian Explanation */}
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {currentQ.explanationAm}
                      </p>
                      <p className="text-xs text-indigo-300 italic mt-1 font-serif">
                        🇪🇸 {currentQ.explanationEs}
                      </p>
                    </div>

                    {/* Action buttons: Next question / Retry */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {!isCorrect && (
                        <button
                          onClick={handleRetryQuestion}
                          className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl border border-slate-600 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-all"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Կրկին փորձել</span>
                        </button>
                      )}

                      <button
                        onClick={handleNextQuestion}
                        className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg transition-all ${
                          isCorrect
                            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-black hover:scale-105 active:scale-95 shadow-emerald-500/30'
                            : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black hover:scale-105 active:scale-95 shadow-amber-500/30'
                        }`}
                      >
                        <span>
                          {currentIndex === QUESTIONS.length - 1
                            ? 'Ավարտել վիկտորինան 🏆'
                            : 'Շարունակել խաղը (Հաջորդ հարցը) ➔'}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Millionaire Prize Ladder (Desktop) */}
            <div className="hidden lg:flex lg:col-span-4 flex-col bg-slate-950/80 border-2 border-indigo-900/60 rounded-2xl p-4 shadow-2xl justify-between h-[640px]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-indigo-900/50 mb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                      Մրցանակային Սանդուղք
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">30 Հարց</span>
                </div>

                {/* Ladder scroll list (displayed from 30 down to 1) */}
                <div className="space-y-1 overflow-y-auto max-h-[500px] pr-1.5 custom-scrollbar">
                  {[...QUESTIONS].reverse().map((q, idx) => {
                    const qIndex = q.id - 1;
                    const isCurrent = qIndex === currentIndex;
                    const isPassed = completedQuestions.has(q.id);
                    const isMilestone = q.isMilestone;

                    let rowStyle = 'text-slate-400 bg-slate-900/40 hover:bg-slate-850';
                    if (isCurrent) {
                      rowStyle =
                        'bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-black shadow-lg shadow-amber-500/30 border border-amber-300 scale-102';
                    } else if (isPassed) {
                      rowStyle = 'text-emerald-400 bg-emerald-950/20 border-l-2 border-emerald-500';
                    } else if (isMilestone) {
                      rowStyle = 'text-amber-300 font-bold bg-indigo-950/40 border-l-2 border-amber-400';
                    }

                    return (
                      <div
                        key={q.id}
                        onClick={() => handleJumpToQuestion(qIndex)}
                        className={`cursor-pointer px-3 py-1 rounded-lg text-xs flex items-center justify-between transition-all ${rowStyle}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono w-5 text-right">{q.id}.</span>
                          <span className="truncate max-w-[130px]">{q.topicEs}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-bold">
                          {isPassed && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                          <span>{q.prizeAmount}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom reset / restart */}
              <div className="pt-3 border-t border-indigo-900/50 flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={handleRestartGame}
                  className="hover:text-amber-300 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Սկսել նորից</span>
                </button>
                <span className="font-mono text-emerald-400 font-bold">
                  {completedQuestions.size} / 30 ավարտված
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Study Handbook (All 30 Dialogues) */}
        {activeTab === 'handbook' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-indigo-900/60 rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-amber-300 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Բոլոր 30 Երկխոսությունները և Կանոնները
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Սեղմեք ցանկացած իսպաներեն նախադասության վրա՝ բացելու հայերեն թարգմանությունն ու բացատրությունը։
                  </p>
                </div>

                {/* Filter by Part */}
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setHandbookPartFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      handbookPartFilter === 'all'
                        ? 'bg-amber-500 text-black'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Բոլորը (30)
                  </button>
                  {PARTS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setHandbookPartFilter(p.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        handbookPartFilter === p.id
                          ? 'bg-amber-500 text-black'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      Մաս {p.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* List of Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUESTIONS.filter(
                (q) => handbookPartFilter === 'all' || q.part === handbookPartFilter
              ).map((q) => {
                const isItemRevealed = handbookRevealed[q.id];
                return (
                  <div
                    key={q.id}
                    className="bg-slate-900/90 border border-indigo-900/60 rounded-xl p-4 shadow-lg hover:border-amber-500/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Topic Title */}
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                        <span className="text-xs font-bold text-amber-400">
                          #{q.id} • {q.topicEs}
                        </span>
                        <span className="text-xs text-slate-400">{q.topicAm}</span>
                      </div>

                      {/* Dialogue lines */}
                      <div className="space-y-2 text-sm">
                        <div
                          onClick={() => handleSpeak(q.dialogue.speakerA.es)}
                          className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-start justify-between gap-2"
                        >
                          <div>
                            <span className="font-bold text-slate-200">🇪🇸 — {q.dialogue.speakerA.es}</span>
                            {isItemRevealed && (
                              <p className="text-xs text-amber-300 mt-1">🇦🇲 — {q.dialogue.speakerA.am}</p>
                            )}
                          </div>
                          <Volume2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-1" />
                        </div>

                        <div
                          onClick={() => handleSpeak(q.dialogue.speakerB.esCompleted || q.dialogue.speakerB.es)}
                          className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-start justify-between gap-2"
                        >
                          <div>
                            <span className="font-bold text-emerald-300">
                              🇪🇸 — {q.dialogue.speakerB.esCompleted}
                            </span>
                            {isItemRevealed && (
                              <p className="text-xs text-sky-300 mt-1">🇦🇲 — {q.dialogue.speakerB.am}</p>
                            )}
                          </div>
                          <Volume2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-1" />
                        </div>
                      </div>

                      {/* Options preview */}
                      <div className="grid grid-cols-2 gap-1.5 my-3 text-xs">
                        {q.options.map((opt) => (
                          <div
                            key={opt.key}
                            className={`p-1.5 rounded border ${
                              opt.key === q.correctKey
                                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 font-bold'
                                : 'bg-slate-950/40 border-slate-850 text-slate-400'
                            }`}
                          >
                            <span className="font-bold mr-1">{opt.key})</span> {opt.es}
                            {isItemRevealed && <div className="text-[10px] text-slate-300">{opt.am}</div>}
                          </div>
                        ))}
                      </div>

                      {/* Explanation */}
                      {isItemRevealed && (
                        <div className="mt-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                          {q.explanationAm}
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() =>
                          setHandbookRevealed((prev) => ({
                            ...prev,
                            [q.id]: !prev[q.id],
                          }))
                        }
                        className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                      >
                        {isItemRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{isItemRevealed ? 'Թաքցնել թարգմանությունը' : 'Ցույց տալ հայերենը'}</span>
                      </button>

                      <button
                        onClick={() => {
                          handleJumpToQuestion(q.id - 1);
                          setActiveTab('game');
                        }}
                        className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                      >
                        <span>Խաղալ այս հարցը</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Oral Practice (🎤 Բանավոր խոսքի զարգացում) */}
        {activeTab === 'oral' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-slate-900/80 border border-indigo-900/60 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <Mic className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-black text-amber-300">
                  {ORAL_PRACTICE_SAMPLE.titleEs}
                </h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {ORAL_PRACTICE_SAMPLE.descriptionAm}
              </p>
              <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                💡 <strong>Խորհուրդ.</strong> Լսեք յուրաքանչյուր արտահայտությունը իսպաներեն, բարձրաձայն կրկնեք այն, ապա
                փոխեք դերերը։ Սա օգնում է բնական և սահուն արտասանությանը։
              </div>
            </div>

            {/* Interactive Roleplay Card */}
            <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border-2 border-indigo-900/80 rounded-2xl p-6 shadow-2xl space-y-4">
              <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-sky-400" />
                Երկխոսություն. «Estoy hecho polvo» — Ուժասպառ եմ
              </h3>

              <div className="space-y-3">
                {ORAL_PRACTICE_SAMPLE.lines.map((line, idx) => {
                  const isRevealed = oralRevealed[idx];
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900/80 border border-indigo-950 hover:border-indigo-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-900/50 text-indigo-300 border border-indigo-800">
                            {line.speaker}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-white tracking-wide">{line.es}</p>
                        {isRevealed && (
                          <p className="text-sm text-amber-300 mt-1 font-medium flex items-center gap-1.5 animate-fadeIn">
                            <span>🇦🇲</span>
                            <span>{line.am}</span>
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSpeak(line.es)}
                          className="px-3 py-2 rounded-lg bg-indigo-950 border border-indigo-800 text-amber-300 hover:bg-amber-600 hover:text-black font-semibold text-xs flex items-center gap-1.5 transition-all"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>Լսել</span>
                        </button>

                        <button
                          onClick={() =>
                            setOralRevealed((prev) => ({
                              ...prev,
                              [idx]: !prev[idx],
                            }))
                          }
                          className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold text-xs flex items-center gap-1.5 transition-all"
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{isRevealed ? 'Թաքցնել' : 'Թարգմանել'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Full Speech Playback */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={async () => {
                    for (const line of ORAL_PRACTICE_SAMPLE.lines) {
                      await handleSpeak(line.es);
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4" />
                  <span>Լսել ամբողջ երկխոսությունը հերթով</span>
                </button>

                <button
                  onClick={() => {
                    const allRev: Record<number, boolean> = {};
                    ORAL_PRACTICE_SAMPLE.lines.forEach((_, i) => (allRev[i] = true));
                    setOralRevealed(allRev);
                  }}
                  className="text-xs text-indigo-300 hover:text-white underline"
                >
                  Բացել բոլոր թարգմանությունները
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Prize Ladder Drawer Modal */}
      {showMobileLadder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-80 bg-slate-950 border-l border-indigo-900 h-full p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-indigo-900/60 mb-3">
                <span className="text-sm font-bold text-amber-300">Մրցանակային Սանդուղք</span>
                <button
                  onClick={() => setShowMobileLadder(false)}
                  className="text-slate-400 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-1 overflow-y-auto max-h-[75vh] pr-1 custom-scrollbar">
                {[...QUESTIONS].reverse().map((q) => {
                  const qIndex = q.id - 1;
                  const isCurrent = qIndex === currentIndex;
                  const isPassed = completedQuestions.has(q.id);

                  return (
                    <div
                      key={q.id}
                      onClick={() => handleJumpToQuestion(qIndex)}
                      className={`px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'bg-amber-500 text-black font-black'
                          : isPassed
                          ? 'text-emerald-400 bg-emerald-950/20'
                          : 'text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      <span>
                        {q.id}. {q.topicEs}
                      </span>
                      <span className="font-bold">{q.prizeAmount}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audience Poll Modal */}
      {audiencePollModal && audiencePollData && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border-2 border-sky-500/80 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-fadeIn">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-sky-400" />
              <h3 className="text-base font-bold text-sky-300">Լսարանի Քվեարկության Արդյունքներ</h3>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Դահլիճի 100 իսպանախոս մասնակիցներ քվեարկեցին հետևյալ կերպ.
            </p>

            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt) => {
                const percent = audiencePollData[opt.key] || 0;
                return (
                  <div key={opt.key}>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>
                        {opt.key}) {opt.es}
                      </span>
                      <span className="text-sky-300">{percent}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-700"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setAudiencePollModal(false)}
              className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-black text-xs transition-colors"
            >
              Հասկացա, վերադառնալ խաղին
            </button>
          </div>
        </div>
      )}

      {/* Phone a Friend Modal */}
      {phoneFriendModal && phoneFriendHint && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border-2 border-emerald-500/80 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fadeIn">
            <div className="flex items-center gap-2 mb-3">
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-emerald-300">Զանգ Մադրիդ (Ընկեր Միգել)</h3>
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/60 text-sm text-slate-200 mb-6 italic leading-relaxed">
              {phoneFriendHint}
            </div>
            <button
              onClick={() => setPhoneFriendModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs transition-colors"
            >
              Շնորհակալություն, վերադառնալ խաղին
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-indigo-950/60 bg-slate-950/70 py-3 px-4 text-center text-xs text-slate-400">
        <p>
          🇪🇸 <strong>Habla como un español</strong> — Իսպաներեն-հայերեն ուսուցողական վիկտորինա B1–B2 մակարդակի համար։
        </p>
      </footer>
    </div>
  );
}
