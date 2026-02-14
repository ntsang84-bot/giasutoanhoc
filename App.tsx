import React, { useState, useEffect } from 'react';
import { Calculator, Brain, History, Settings, Sparkles } from 'lucide-react';
import { EducationLevel, QuizState, QuizResult } from './types';
import { LEVELS, CURRICULUM, THEMES } from './constants';
import { generateQuizQuestions } from './services/geminiService';
import QuizInterface from './components/QuizInterface';
import ResultScreen from './components/ResultScreen';
import HistoryModal from './components/HistoryModal';
import ChatWidget from './components/ChatWidget';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {

  // =====================================================
  // 🔐 API CONFIGURATION (KHUNG RIÊNG)
  // =====================================================

  const [apiConfig, setApiConfig] = useState({
    apiKey: localStorage.getItem('gemini_api_key') || '',
    model: localStorage.getItem('gemini_model') || 'gemini-3-flash-preview'
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (!apiConfig.apiKey) {
      setIsSettingsOpen(true);
    }
  }, []);

  const handleSaveSettings = (key: string, model: string) => {
    localStorage.setItem('gemini_api_key', key);
    localStorage.setItem('gemini_model', model);

    setApiConfig({
      apiKey: key,
      model: model
    });

    setIsSettingsOpen(false);
  };

  // =====================================================
  // 📘 SETUP STATE (GIỮ NGUYÊN GIA SƯ)
  // =====================================================

  const [level, setLevel] = useState<EducationLevel>('primary');
  const [grade, setGrade] = useState<number>(1);
  const [topic, setTopic] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');

  // =====================================================
  // 📊 HISTORY
  // =====================================================

  const [history, setHistory] = useState<QuizResult[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('math_quiz_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Parse history error", e);
      }
    }
  }, []);

  // =====================================================
  // 🎯 QUIZ STATE
  // =====================================================

  const [quizState, setQuizState] = useState<QuizState>({
    status: 'setup',
    level: 'primary',
    grade: 1,
    topic: '',
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    score: 0,
    startTime: 0,
    endTime: null,
  });

  const [loadingMsg, setLoadingMsg] = useState('Đang chuẩn bị...');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Update grade/topic when level changes
  useEffect(() => {
    const defaultGrade = CURRICULUM[level][0].grade;
    setGrade(defaultGrade);
    setTopic(CURRICULUM[level][0].topics[0]);
    setCustomTopic('');
  }, [level]);

  useEffect(() => {
    const gradeConfig = CURRICULUM[level].find(g => g.grade === grade);
    if (gradeConfig) {
      setTopic(gradeConfig.topics[0]);
    }
  }, [grade, level]);

  const currentTheme = THEMES[level];

  // =====================================================
  // 🚀 START QUIZ (GIỮ NGUYÊN LOGIC)
  // =====================================================

  const handleStartQuiz = async () => {

    const finalTopic = customTopic.trim() ? customTopic.trim() : topic;

    if (customTopic.trim() && (customTopic.length < 5 || customTopic.length > 100)) {
      setErrorMsg("⚠️ Chủ đề từ 5–100 ký tự");
      return;
    }

    setQuizState(prev => ({ ...prev, status: 'loading' }));
    setErrorMsg(null);
    setLoadingMsg("AI đang soạn bài cho bạn...");

    try {

      const questions = await generateQuizQuestions(
        level,
        grade,
        finalTopic
      );

      setQuizState({
        status: 'active',
        level,
        grade,
        topic: finalTopic,
        questions,
        currentQuestionIndex: 0,
        userAnswers: {},
        score: 0,
        startTime: Date.now(),
        endTime: null,
      });

    } catch (error: any) {
      setErrorMsg(error.message || "Lỗi tạo câu hỏi. Kiểm tra API.");
      setQuizState(prev => ({ ...prev, status: 'setup' }));
    }
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setQuizState(prev => {
      const question = prev.questions.find(q => q.id === questionId);
      const isCorrect = question?.correctAnswer === answer;

      return {
        ...prev,
        userAnswers: { ...prev.userAnswers, [questionId]: answer },
        score: isCorrect ? prev.score + 1 : prev.score
      };
    });
  };

  const handleNext = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, prev.questions.length - 1)
    }));
  };

  const handleFinish = () => {

    const result: QuizResult = {
      id: Date.now().toString(),
      date: Date.now(),
      grade: quizState.grade,
      topic: quizState.topic,
      score: quizState.score,
      totalQuestions: quizState.questions.length,
      level: quizState.level
    };

    const updatedHistory = [result, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('math_quiz_history', JSON.stringify(updatedHistory));

    setQuizState(prev => ({
      ...prev,
      status: 'finished',
      endTime: Date.now()
    }));
  };

  const handleRetry = () => {
    setQuizState(prev => ({
      ...prev,
      status: 'setup',
      questions: [],
      userAnswers: {},
      score: 0
    }));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('math_quiz_history');
    setIsHistoryOpen(false);
  };

  // =====================================================
  // 🎨 RENDER
  // =====================================================

  if (quizState.status === 'loading') {
    return (
      <div className={`min-h-screen flex items-center justify-center ${currentTheme.bg}`}>
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <Brain className={`w-10 h-10 mx-auto mb-4 ${currentTheme.text} animate-pulse`} />
          <h2 className="font-bold text-lg">{loadingMsg}</h2>
        </div>
      </div>
    );
  }

  if (quizState.status === 'active') {
    return (
      <QuizInterface
        state={quizState}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onFinish={handleFinish}
      />
    );
  }

  if (quizState.status === 'finished') {
    return (
      <ResultScreen
        state={quizState}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <>
      <div className={`min-h-screen ${currentTheme.bg}`}>
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6" />
            <h1 className="font-bold">GIA SƯ TOÁN PRO</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsSettingsOpen(true)}><Settings /></button>
            <button onClick={() => setIsHistoryOpen(true)}><History /></button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-8">
          <button
            onClick={handleStartQuiz}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold"
          >
            <Sparkles className="inline w-4 h-4 mr-1" />
            BẮT ĐẦU ÔN TẬP
          </button>
        </main>
      </div>

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
      />

      <ChatWidget />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
        currentApiKey={apiConfig.apiKey}
        currentModel={apiConfig.model}
        isMandatory={!apiConfig.apiKey}
      />
    </>
  );
};

export default App;
