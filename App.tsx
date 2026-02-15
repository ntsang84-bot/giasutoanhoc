import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, School, Brain, Sparkles, Calculator, PenTool, History, Settings } from 'lucide-react';
import { EducationLevel, QuizState, GradeConfig, QuizResult } from './types';
import { LEVELS, CURRICULUM, THEMES } from './constants';
import { generateQuizQuestions } from './services/geminiService';
import QuizInterface from './components/QuizInterface';
import ResultScreen from './components/ResultScreen';
import HistoryModal from './components/HistoryModal';
import ChatWidget from './components/ChatWidget';
import SettingsModal from './components/SettingsModal';

declare global {
  interface Window {
    MathJax: any;
  }
}

const App: React.FC = () => {

  // ================= MATHJAX AUTO RENDER =================
  useEffect(() => {
    const renderMath = () => {
      if (window.MathJax) {
        window.MathJax.typesetPromise();
      }
    };

    const timeout = setTimeout(renderMath, 100);
    return () => clearTimeout(timeout);
  }, []);

  // ================= SETUP STATE =================
  const [level, setLevel] = useState<EducationLevel>('primary');
  const [grade, setGrade] = useState<number>(1);
  const [topic, setTopic] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');

  const [history, setHistory] = useState<QuizResult[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [model, setModel] = useState(localStorage.getItem('gemini_model') || 'gemini-3-flash-preview');

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

  // ================= LOAD HISTORY =================
  useEffect(() => {
    const savedHistory = localStorage.getItem('math_quiz_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // ================= AUTO RENDER MATH WHEN QUIZ CHANGES =================
  useEffect(() => {
    const renderMath = () => {
      if (window.MathJax) {
        window.MathJax.typesetPromise();
      }
    };

    const timeout = setTimeout(renderMath, 100);
    return () => clearTimeout(timeout);
  }, [
    quizState.status,
    quizState.currentQuestionIndex,
    quizState.questions,
  ]);

  // ================= LEVEL CHANGE =================
  useEffect(() => {
    const defaultGrade = CURRICULUM[level][0].grade;
    setGrade(defaultGrade);
    setTopic(CURRICULUM[level][0].topics[0]);
    setCustomTopic('');
  }, [level]);

  useEffect(() => {
    const gradeConfig = CURRICULUM[level].find(g => g.grade === grade);
    if (gradeConfig && gradeConfig.topics.length > 0) {
      setTopic(gradeConfig.topics[0]);
    }
  }, [grade, level]);

  const currentTheme = THEMES[level];

  // ================= START QUIZ =================
  const handleStartQuiz = async () => {

    const finalTopic = customTopic.trim() ? customTopic.trim() : topic;

    if (customTopic.trim().length > 0) {
      if (customTopic.trim().length < 5 || customTopic.trim().length > 100) {
        setErrorMsg("⚠️ Vui lòng nhập chủ đề từ 5-100 ký tự");
        return;
      }
    }

    setQuizState(prev => ({ ...prev, status: 'loading' }));
    setErrorMsg(null);

    try {
      const questions = await generateQuizQuestions(level, grade, finalTopic);

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
      console.error(error);
      setErrorMsg(error.message || "Đã có lỗi xảy ra.");
      setQuizState(prev => ({ ...prev, status: 'setup' }));
    }
  };

  // ================= ANSWER =================
  const handleAnswer = (questionId: string, answer: string) => {
    setQuizState(prev => {
      const question = prev.questions.find(q => q.id === questionId);
      const isCorrect = question?.correctAnswer === answer;

      return {
        ...prev,
        userAnswers: { ...prev.userAnswers, [questionId]: answer },
        score: isCorrect ? prev.score + 1 : prev.score
      }
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

  // ================= RENDER =================
  return (
    <>
      {quizState.status === 'active' && (
        <QuizInterface
          state={quizState}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onFinish={handleFinish}
        />
      )}

      {quizState.status === 'finished' && (
        <ResultScreen state={quizState} onRetry={handleRetry} />
      )}

      {quizState.status === 'setup' && (
        <div className="min-h-screen flex items-center justify-center">
          <button
            onClick={handleStartQuiz}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold"
          >
            BẮT ĐẦU
          </button>
        </div>
      )}

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
        onSave={(key, newModel) => {
          localStorage.setItem('gemini_api_key', key);
          localStorage.setItem('gemini_model', newModel);
          setApiKey(key);
          setModel(newModel);
          setIsSettingsOpen(false);
        }}
        currentApiKey={apiKey}
        currentModel={model}
        isMandatory={!apiKey}
      />
    </>
  );
};

export default App;
