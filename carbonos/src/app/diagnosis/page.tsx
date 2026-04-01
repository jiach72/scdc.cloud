'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, Factory, TreePine, Landmark, HelpCircle,
    Cpu, FlaskConical, Package, Zap, Shirt, UtensilsCrossed, Blocks,
    ArrowRight, ArrowLeft, CheckCircle2, Loader2, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import apiClient from '@/lib/api-client';

// ============ 问卷配置 ============

interface StepOption {
    value: string;
    label: string;
    icon: React.ReactNode;
    description?: string;
}

interface QuestionStep {
    id: string;
    question: string;
    subtitle?: string;
    options: StepOption[];
    type: 'single' | 'boolean';
}

const STEPS: QuestionStep[] = [
    {
        id: 'scenario',
        question: '您的业务场景是？',
        subtitle: '选择最符合您企业类型的场景',
        type: 'single',
        options: [
            { value: 'factory', label: '出口工厂', icon: <Factory className="w-6 h-6" />, description: '生产出口产品的制造企业' },
            { value: 'building', label: '商业建筑', icon: <Building2 className="w-6 h-6" />, description: '写字楼、商场、酒店等' },
            { value: 'park', label: '工业园区', icon: <TreePine className="w-6 h-6" />, description: '园区运营方或物业管理' },
            { value: 'government', label: '政府机构', icon: <Landmark className="w-6 h-6" />, description: '开发区、地方政府等' },
            { value: 'other', label: '其他', icon: <HelpCircle className="w-6 h-6" />, description: '以上都不符合' },
        ],
    },
    {
        id: 'industry',
        question: '您所在的行业是？',
        type: 'single',
        options: [
            { value: 'manufacturing', label: '制造业', icon: <Cpu className="w-6 h-6" /> },
            { value: 'chemical', label: '化工', icon: <FlaskConical className="w-6 h-6" /> },
            { value: 'building_materials', label: '建材', icon: <Blocks className="w-6 h-6" /> },
            { value: 'electronics', label: '电子', icon: <Zap className="w-6 h-6" /> },
            { value: 'textile', label: '纺织', icon: <Shirt className="w-6 h-6" /> },
            { value: 'food', label: '食品加工', icon: <UtensilsCrossed className="w-6 h-6" /> },
            { value: 'other', label: '其他', icon: <Package className="w-6 h-6" /> },
        ],
    },
    {
        id: 'electricity_range',
        question: '您的年用电量约为？',
        subtitle: '选择最接近的范围',
        type: 'single',
        options: [
            { value: 'below_100', label: '< 100 万 kWh', icon: <Zap className="w-5 h-5 text-amber-400" />, description: '小型企业' },
            { value: '100_500', label: '100 - 500 万 kWh', icon: <Zap className="w-6 h-6 text-amber-400" />, description: '中型企业' },
            { value: '500_1000', label: '500 - 1000 万 kWh', icon: <Zap className="w-7 h-7 text-amber-400" />, description: '大型企业' },
            { value: 'above_1000', label: '> 1000 万 kWh', icon: <Zap className="w-8 h-8 text-amber-400" />, description: '超大规模' },
        ],
    },
    {
        id: 'exports_to_eu',
        question: '您是否有产品出口至欧盟？',
        subtitle: 'CBAM 碳关税已于 2026 年全面生效',
        type: 'boolean',
        options: [
            { value: 'true', label: '是', icon: <span className="text-2xl">✅</span> },
            { value: 'false', label: '否 / 计划中', icon: <span className="text-2xl">❌</span> },
        ],
    },
    {
        id: 'has_carbon_audit',
        question: '您目前是否进行过碳盘查？',
        subtitle: '包括组织碳核算、产品碳足迹等',
        type: 'boolean',
        options: [
            { value: 'true', label: '是', icon: <span className="text-2xl">📊</span> },
            { value: 'false', label: '否 / 不清楚', icon: <span className="text-2xl">❓</span> },
        ],
    },
];

// ============ 主组件 ============

export default function DiagnosisPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [contactInfo, setContactInfo] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<DiagnosisResult | null>(null);

    const totalSteps = STEPS.length + 1; // +1 for contact form
    const isContactStep = currentStep === STEPS.length;
    const isComplete = result !== null;

    const handleOptionSelect = (stepId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [stepId]: value }));
        // 自动进入下一步
        setTimeout(() => {
            if (currentStep < STEPS.length) {
                setCurrentStep(prev => prev + 1);
            }
        }, 300);
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const payload = {
                scenario: answers.scenario,
                industry: answers.industry,
                electricity_range: answers.electricity_range,
                exports_to_eu: answers.exports_to_eu === 'true',
                has_carbon_audit: answers.has_carbon_audit === 'true',
                contact_info: contactInfo,
            };

            const survey = await apiClient.post<{ id: string }>('/api/v1/surveys', payload);

            // 获取诊断结果
            const diagnosis = await apiClient.get<DiagnosisResult>(`/api/v1/surveys/${survey.id}/diagnosis`);

            setResult(diagnosis);
        } catch (error) {
            console.error('提交失败:', error);
            // 降级处理：使用前端计算结果
            setResult(calculateLocalResult());
        } finally {
            setIsSubmitting(false);
        }
    };

    // 前端降级计算
    const calculateLocalResult = (): DiagnosisResult => {
        let score = 30;

        if (answers.scenario === 'park' || answers.scenario === 'government') score += 15;
        else if (answers.scenario === 'factory') score += 10;

        if (answers.electricity_range === 'above_1000') score += 20;
        else if (answers.electricity_range === '500_1000') score += 15;
        else if (answers.electricity_range === '100_500') score += 10;

        if (answers.exports_to_eu === 'true') score += 15;
        if (answers.has_carbon_audit === 'true') score += 20;

        const level = score >= 80 ? '领先' : score >= 60 ? '良好' : score >= 40 ? '起步' : '较弱';

        let recommended_plan = 'essential';
        let plan_name = '启航版';
        if (answers.scenario === 'government') {
            recommended_plan = 'custom';
            plan_name = '定制版';
        } else if (answers.scenario === 'park' || answers.electricity_range === 'above_1000') {
            recommended_plan = 'enterprise';
            plan_name = '旗舰版';
        } else if (answers.exports_to_eu === 'true' || answers.electricity_range !== 'below_100') {
            recommended_plan = 'pro';
            plan_name = '专业版';
        }

        return {
            score: Math.min(score, 100),
            level,
            recommended_plan,
            plan_name,
            summary: score >= 60
                ? '您的企业已具备良好的零碳基础，建议尽快启动数字化管理。'
                : '您的企业正在零碳转型起步阶段，有较大提升空间。',
            key_insights: [
                answers.exports_to_eu === 'true' ? '欧盟 CBAM 已于 2026 年全面生效，需准备产品碳足迹数据' : '',
                answers.has_carbon_audit !== 'true' ? '建议先完成组织碳核算，建立排放基线' : '已有碳盘查基础，可快速启动碳管理数字化',
                answers.electricity_range === 'above_1000' ? '大规模用电企业建议考虑绿电采购和储能投资' : '',
            ].filter(Boolean),
        };
    };

    // 进度条
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="flex min-h-screen flex-col bg-slate-950 text-white">
            <SiteHeader />

            <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
                <div className="w-full max-w-2xl">
                    {/* 进度条 */}
                    {!isComplete && (
                        <div className="mb-8">
                            <div className="flex justify-between text-sm text-slate-400 mb-2">
                                <span>{isContactStep ? '联系方式' : `第 ${currentStep + 1} / ${STEPS.length} 题`}</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {/* 问题步骤 */}
                        {!isContactStep && !isComplete && (
                            <QuestionCard
                                key={STEPS[currentStep].id}
                                step={STEPS[currentStep]}
                                selectedValue={answers[STEPS[currentStep].id]}
                                onSelect={(value) => handleOptionSelect(STEPS[currentStep].id, value)}
                            />
                        )}

                        {/* 联系表单 */}
                        {isContactStep && !isComplete && (
                            <ContactForm
                                key="contact"
                                contactInfo={contactInfo}
                                onChange={setContactInfo}
                                onSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                            />
                        )}

                        {/* 结果页面 */}
                        {isComplete && result && (
                            <ResultCard key="result" result={result} />
                        )}
                    </AnimatePresence>

                    {/* 导航按钮 */}
                    {!isComplete && currentStep > 0 && (
                        <div className="mt-8 flex justify-start">
                            <Button
                                variant="ghost"
                                className="text-slate-400 hover:text-white"
                                onClick={handleBack}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" /> 上一题
                            </Button>
                        </div>
                    )}
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}

// ============ 子组件 ============

interface QuestionCardProps {
    step: QuestionStep;
    selectedValue?: string;
    onSelect: (value: string) => void;
}

function QuestionCard({ step, selectedValue, onSelect }: QuestionCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
        >
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {step.question}
            </h1>
            {step.subtitle && (
                <p className="text-slate-400 mb-8">{step.subtitle}</p>
            )}

            <div className="grid gap-3">
                {step.options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => onSelect(option.value)}
                        className={`w-full p-4 rounded-xl border transition-all text-left flex items-center gap-4 group
              ${selectedValue === option.value
                                ? 'bg-emerald-500/20 border-emerald-500 text-white'
                                : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center
              ${selectedValue === option.value
                                ? 'bg-emerald-500/30 text-emerald-400'
                                : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                            }`}
                        >
                            {option.icon}
                        </div>
                        <div className="flex-1">
                            <div className="font-medium">{option.label}</div>
                            {option.description && (
                                <div className="text-sm text-slate-500">{option.description}</div>
                            )}
                        </div>
                        {selectedValue === option.value && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        )}
                    </button>
                ))}
            </div>
        </motion.div>
    );
}

interface ContactFormProps {
    contactInfo: { name: string; company: string; phone: string; email: string };
    onChange: (info: { name: string; company: string; phone: string; email: string }) => void;
    onSubmit: () => void;
    isSubmitting: boolean;
}

function ContactForm({ contactInfo, onChange, onSubmit, isSubmitting }: ContactFormProps) {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const PHONE_REGEX = /^1[3-9]\d{9}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!contactInfo.name.trim()) newErrors.name = "请输入姓名";
        if (!contactInfo.company.trim()) newErrors.company = "请输入公司名称";
        if (!contactInfo.phone.trim()) {
            newErrors.phone = "请输入手机号码";
        } else if (!PHONE_REGEX.test(contactInfo.phone)) {
            newErrors.phone = "请输入正确的中国手机号格式";
        }
        if (!contactInfo.email.trim()) {
            newErrors.email = "请输入邮箱";
        } else if (!EMAIL_REGEX.test(contactInfo.email)) {
            newErrors.email = "请输入正确的邮箱格式";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) onSubmit();
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
        >
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                最后一步：留下您的联系方式
            </h1>
            <p className="text-slate-400 mb-8">
                我们将为您生成详细诊断报告
            </p>

            <div className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="姓名 *"
                        value={contactInfo.name}
                        onChange={(e) => { onChange({ ...contactInfo, name: e.target.value }); setErrors(prev => ({ ...prev, name: "" })); }}
                        className={`w-full h-14 px-4 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 ${errors.name ? "border-red-500" : "border-slate-700"}`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="公司名称 *"
                        value={contactInfo.company}
                        onChange={(e) => { onChange({ ...contactInfo, company: e.target.value }); setErrors(prev => ({ ...prev, company: "" })); }}
                        className={`w-full h-14 px-4 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 ${errors.company ? "border-red-500" : "border-slate-700"}`}
                    />
                    {errors.company && <p className="text-red-400 text-xs mt-1 ml-1">{errors.company}</p>}
                </div>
                <div>
                    <input
                        type="tel"
                        placeholder="手机号码 *"
                        value={contactInfo.phone}
                        onChange={(e) => { onChange({ ...contactInfo, phone: e.target.value }); setErrors(prev => ({ ...prev, phone: "" })); }}
                        className={`w-full h-14 px-4 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 ${errors.phone ? "border-red-500" : "border-slate-700"}`}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1 ml-1">{errors.phone}</p>}
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="邮箱 *"
                        value={contactInfo.email}
                        onChange={(e) => { onChange({ ...contactInfo, email: e.target.value }); setErrors(prev => ({ ...prev, email: "" })); }}
                        className={`w-full h-14 px-4 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 ${errors.email ? "border-red-500" : "border-slate-700"}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                </div>
            </div>

            <Button
                size="lg"
                className="w-full h-14 mt-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        生成诊断报告中...
                    </>
                ) : (
                    <>
                        获取诊断报告 <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                )}
            </Button>

            <p className="text-center text-xs text-slate-500 mt-4">
                提交即表示同意我们的隐私政策
            </p>
        </motion.div>
    );
}

interface DiagnosisResult {
    score: number;
    level: string;
    recommended_plan: string;
    plan_name: string;
    summary: string;
    key_insights: string[];
}

function ResultCard({ result }: { result: DiagnosisResult }) {
    const getLevelColor = (level: string) => {
        switch (level) {
            case '领先': return 'text-emerald-400';
            case '良好': return 'text-cyan-400';
            case '起步': return 'text-amber-400';
            default: return 'text-red-400';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    您的零碳就绪指数
                </h1>
                <p className="text-slate-400">诊断结果已生成</p>
            </div>

            {/* 评分展示 */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 text-center mb-6">
                <div className="relative w-40 h-40 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-slate-800"
                        />
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: '0 283' }}
                            animate={{ strokeDasharray: `${result.score * 2.83} 283` }}
                            transition={{ duration: 1, delay: 0.3 }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            className="text-4xl font-bold text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {result.score}
                        </motion.span>
                        <span className={`text-sm font-medium ${getLevelColor(result.level)}`}>
                            {result.level}
                        </span>
                    </div>
                </div>

                <p className="text-slate-300">{result.summary}</p>
            </div>

            {/* 推荐方案 */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-slate-400 text-sm mb-1">推荐方案</div>
                        <div className="text-xl font-bold text-white">
                            CarbonOS™ {result.plan_name}
                        </div>
                    </div>
                    <Button className="bg-white hover:bg-slate-100 text-slate-900">
                        了解详情 <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </div>

            {/* 关键洞察 */}
            {result.key_insights.length > 0 && (
                <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-400" />
                        关键洞察
                    </h3>
                    <ul className="space-y-3">
                        {result.key_insights.map((insight, index) => (
                            <li key={index} className="flex items-start gap-3 text-slate-300">
                                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {index + 1}
                                </span>
                                {insight}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 行动按钮 */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-500">
                    预约专家咨询
                </Button>
                <Button size="lg" variant="outline" className="flex-1 h-12 border-slate-600 text-slate-300 hover:bg-slate-800">
                    下载诊断报告 PDF
                </Button>
            </div>
        </motion.div>
    );
}
