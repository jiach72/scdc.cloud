import Link from 'next/link';
import { Factory, Building2, Trees, Landmark, ArrowRight, CheckCircle2, Zap, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

interface ScenarioCard {
    id: string;
    name: string;
    nameEn: string;
    icon: React.ReactNode;
    description: string;
    targetCustomer: string;
    painPoints: string[];
    solutions: string[];
    value: string;
    cta: string;
    href: string;
    gradient: string;
    bgImage?: string;
}

const scenarios: ScenarioCard[] = [
    {
        id: 'factory',
        name: '零碳工厂',
        nameEn: 'Zero-Carbon Factory',
        icon: <Factory className="w-8 h-8" />,
        description: 'CBAM 合规利器，让出口不再"税"痛',
        targetCustomer: '出口制造企业',
        painPoints: [
            '欧盟 CBAM 碳关税即将生效',
            '传统第三方核查周期长、费用高',
            '供应链碳数据难以追溯',
        ],
        solutions: [
            'CarbonOS 产品碳足迹 (PCF) 助手',
            '一键生成 CBAM 通报数据',
            'AI 智能诊断识别减排机会',
        ],
        value: '预计每吨产品节省 €50-100 碳关税成本',
        cta: '立即体验启航版',
        href: '/pricing',
        gradient: 'from-blue-500 to-cyan-600',
    },
    {
        id: 'building',
        name: '零碳建筑',
        nameEn: 'Zero-Carbon Building',
        icon: <Building2 className="w-8 h-8" />,
        description: 'LEED/WELL 认证一步到位',
        targetCustomer: '商业地产 / 物业公司',
        painPoints: [
            '绿色建筑认证数据准备繁琐',
            '能效对标缺乏行业参考',
            'ESG 披露合规压力增大',
        ],
        solutions: [
            '组织碳核算自动化',
            'ESG 报告章节自动生成',
            '同业能效对标分析',
        ],
        value: '加速绿色认证周期 50%+',
        cta: '了解专业版',
        href: '/pricing',
        gradient: 'from-emerald-500 to-teal-600',
    },
    {
        id: 'park',
        name: '零碳园区',
        nameEn: 'Zero-Carbon Park',
        icon: <Trees className="w-8 h-8" />,
        description: '源网荷储一体，招商引资新名片',
        targetCustomer: '园区运营方 / 开发区',
        painPoints: [
            '入驻企业碳数据分散难汇总',
            '能耗双控红线压力大',
            '缺乏绿色招商差异化优势',
        ],
        solutions: [
            '多租户碳核算管理平台',
            '碳-能协同控制调度',
            '绿色配额与政策匹配',
        ],
        value: '辅助入驻企业获得 6%-8% 绿色信贷利率优惠',
        cta: '联系旗舰版销售',
        href: '/solutions/zero-carbon-park',
        gradient: 'from-green-500 to-emerald-600',
    },
    {
        id: 'town',
        name: '零碳城镇',
        nameEn: 'Zero-Carbon Town',
        icon: <Landmark className="w-8 h-8" />,
        description: '区域碳账户，双控驾驶舱',
        targetCustomer: '地方政府 / 发改委',
        painPoints: [
            '区域碳排放数据难以汇总',
            '能耗双控考核压力',
            '缺乏碳中和进度可视化',
        ],
        solutions: [
            '区域碳账户体系建设',
            '万元 GDP 能耗双控驾驶舱',
            '政策模拟与红线预警',
        ],
        value: '助力完成"双碳"考核目标',
        cta: '获取定制方案',
        href: '/about#contact',
        gradient: 'from-purple-500 to-indigo-600',
    },
];

const stats = [
    { icon: <Factory className="w-6 h-6" />, value: '100+', label: '服务企业' },
    { icon: <TrendingUp className="w-6 h-6" />, value: '50,000+', label: '累计减排 (吨CO₂)' },
    { icon: <Zap className="w-6 h-6" />, value: '200+', label: '管理资产 (MWh)' },
    { icon: <Shield className="w-6 h-6" />, value: '5,000+', label: '辅助融资 (万元)' },
];

export default function SolutionsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <SiteHeader />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-4">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="animate-in fade-in slide-in-from-bottom-5 duration-600">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                从"低碳"到"零碳"
                                <br />
                                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                    找到属于您的转型路径
                                </span>
                            </h1>
                            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
                                无论您是出口工厂、商业建筑、工业园区还是地方政府，
                                <br className="hidden md:block" />
                                CarbonOS™ 都有量身定制的零碳解决方案
                            </p>
                        </div>

                        {/* Stats Bar */}
                        <div
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-600"
                            style={{ animationDelay: '200ms', animationFillMode: 'both' }}
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                                    <div className="flex items-center justify-center gap-2 text-emerald-400 mb-2">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm text-slate-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Scenario Cards */}
                <section className="pb-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            {scenarios.map((scenario, index) => (
                                <div
                                    key={scenario.id}
                                    className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all group animate-in fade-in slide-in-from-bottom-8"
                                    style={{ animationDelay: `${100 * index}ms`, animationFillMode: 'both' }}
                                >
                                    {/* Card Header */}
                                    <div className={`bg-gradient-to-r ${scenario.gradient} p-6`}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white">
                                                {scenario.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white">{scenario.name}</h3>
                                                <p className="text-white/80 text-sm">{scenario.nameEn}</p>
                                            </div>
                                        </div>
                                        <p className="text-white/90 mt-4 text-lg">{scenario.description}</p>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <span className="inline-block px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300">
                                                目标客户: {scenario.targetCustomer}
                                            </span>
                                        </div>

                                        {/* Pain Points */}
                                        <div className="mb-6">
                                            <h4 className="text-sm font-semibold text-slate-400 mb-3">痛点</h4>
                                            <ul className="space-y-2">
                                                {scenario.painPoints.map((point, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                                                        <span className="text-red-400 mt-1">•</span>
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Solutions */}
                                        <div className="mb-6">
                                            <h4 className="text-sm font-semibold text-slate-400 mb-3">解决方案</h4>
                                            <ul className="space-y-2">
                                                {scenario.solutions.map((solution, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                        {solution}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Value Highlight */}
                                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
                                            <p className="text-emerald-400 text-sm font-medium">
                                                💰 {scenario.value}
                                            </p>
                                        </div>

                                        {/* CTA */}
                                        <Link href={scenario.href}>
                                            <Button className="w-full bg-slate-800 hover:bg-slate-700 group-hover:bg-emerald-600 transition-colors">
                                                {scenario.cta}
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="pb-32 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl p-8 md:p-12 text-center">
                            <Zap className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                不确定哪个场景适合您？
                            </h2>
                            <p className="text-slate-400 mb-6">
                                完成 3 分钟免费诊断，获取专属零碳转型方案
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/diagnosis">
                                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500">
                                        免费诊断我的零碳需求
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                                <Link href="/pricing">
                                    <Button size="lg" variant="outline" className="border-slate-700 hover:bg-slate-800">
                                        查看定价方案
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
