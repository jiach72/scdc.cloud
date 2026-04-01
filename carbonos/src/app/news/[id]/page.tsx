"use client";

import { useParams } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Newspaper, ArrowLeft, Calendar, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// 与 news/page.tsx 共享相同的 MOCK_NEWS 数据（后续改为 API）
const MOCK_NEWS: Record<string, {
    id: string;
    title: string;
    summary: string;
    content: string;
    pubDate: string;
    source: string;
    category: string;
}> = {
    "1": {
        id: "1",
        title: "全球储能市场迎来爆发式增长，中国企业占据领先地位",
        summary: "据最新报告显示，2024年全球储能装机量同比增长超过80%，中国储能企业凭借技术优势和成本优势，在国际市场份额持续扩大...",
        content: `据最新行业报告显示，2024年全球储能装机量同比增长超过80%，总装机规模突破200GWh。中国储能企业凭借技术优势和成本优势，在国际市场份额持续扩大。\n\n在技术路线方面，磷酸铁锂电池仍占据主导地位，占比超过70%。同时，钠离子电池、液流电池等新型储能技术加速商业化进程。\n\n政策层面，国家发改委和能源局联合发布《关于加快推动新型储能发展的指导意见》，明确提出到2025年新型储能装机规模达到30GW以上的目标。\n\n业内专家认为，随着电力市场化改革深入推进，储能项目的经济性将进一步提升，行业有望进入高速发展的黄金期。`,
        pubDate: "2026-02-04",
        source: "北极星电力网",
        category: "new-energy",
    },
    "2": {
        id: "2",
        title: "AI大模型训练能耗优化新突破，算力效率提升40%",
        summary: "清华大学研究团队发布最新研究成果，通过创新的模型压缩和分布式训练技术，大幅降低了AI大模型的训练能耗...",
        content: `清华大学计算机系研究团队发布最新研究成果，通过创新的模型压缩和分布式训练技术，成功将AI大模型的训练能耗降低了40%，算力效率提升显著。\n\n该研究团队提出了一种名为"GreenTrain"的训练框架，通过动态梯度裁剪、自适应学习率调度和智能数据选择等技术，在保证模型精度的前提下大幅减少计算资源消耗。\n\n实验结果表明，在同等模型精度下，GreenTrain框架可将训练时间缩短35%，GPU利用率提升至92%，整体能耗降低40%以上。\n\n该成果已发表在国际顶级学术会议NeurIPS 2026上，并获得最佳论文提名。团队表示将开源该框架，推动绿色AI的发展。`,
        pubDate: "2026-02-04",
        source: "机器之心",
        category: "ai-computing",
    },
    "3": {
        id: "3",
        title: "绿色债券发行规模创新高，新能源项目融资渠道拓宽",
        summary: "2024年上半年，中国绿色债券发行总额突破5000亿元，其中新能源项目占比超过35%，为行业发展提供强劲资金支持...",
        content: `2024年上半年，中国绿色债券发行总额突破5000亿元大关，同比增长65%，创下历史新高。其中，新能源项目相关债券占比超过35%，成为绿色债券市场的主力军。\n\n从发行主体来看，国有企业仍占据主导地位，但民营企业发行占比持续提升，达到28%。这反映出绿色金融正在向更广泛的市场主体渗透。\n\n监管部门积极推动绿色债券标准与国际接轨，发布了新版《绿色债券支持项目目录》，新增了氢能、储能等新兴领域的认定标准。\n\n市场分析人士指出，随着"双碳"目标的持续推进，绿色债券市场有望继续保持高速增长，预计全年发行规模将突破万亿元。`,
        pubDate: "2026-02-03",
        source: "碳排放交易网",
        category: "green-finance",
    },
    "4": {
        id: "4",
        title: "首批国家级零碳园区示范项目名单公布",
        summary: "国家发改委公布首批20个国家级零碳园区示范项目，涵盖工业、商业、综合类园区，将为全国零碳转型提供可复制经验...",
        content: `国家发改委近日公布了首批20个国家级零碳园区示范项目名单，涵盖工业、商业、综合类园区等多种类型，分布在全国15个省份。\n\n这些示范项目将在能源结构优化、碳排放监测、绿色建筑推广、智慧能源管理等方面开展先行先试，为全国零碳转型提供可复制、可推广的经验。\n\n其中，苏州工业园区、深圳前海深港现代服务业合作区、成都天府新区等知名园区入选。这些园区将在2028年前实现碳排放强度下降50%以上的目标。\n\n国家发改委表示，将对示范项目给予政策支持和资金补贴，并建立定期评估机制，确保示范目标如期实现。`,
        pubDate: "2026-02-02",
        source: "中国节能在线",
        category: "zero-carbon",
    },
    "5": {
        id: "5",
        title: "工商业储能电站峰谷价差套利模式深度解析",
        summary: "随着电力市场化改革深入推进，工商业储能电站通过峰谷价差套利实现盈利的模式日趋成熟，投资回报周期持续缩短...",
        content: `随着全国电力市场化改革的深入推进，工商业储能电站通过峰谷价差套利实现盈利的商业模式日趋成熟。最新数据显示，全国平均峰谷价差已扩大至0.7元/kWh以上。\n\n以江苏省为例，大工业用电峰谷价差达到0.85元/kWh，储能电站的投资回报周期已缩短至5-6年。在浙江、广东等省份，回报周期更是低至4年左右。\n\n业内专家分析，储能电站的盈利能力主要取决于三个因素：峰谷价差大小、充放电次数和系统转换效率。随着电池成本的持续下降，这三个指标都在向有利方向发展。\n\n建议工商业用户在评估储能项目时，重点关注当地电价政策、用电负荷特性和场地条件，选择最优的技术方案和商业模式。`,
        pubDate: "2026-02-01",
        source: "北极星电力网",
        category: "new-energy",
    },
    "6": {
        id: "6",
        title: "GPU算力成本持续下降，AI推理服务进入普惠时代",
        summary: "随着国产AI芯片量产和云计算竞争加剧，AI推理服务的单价大幅下降，为中小企业提供了更多发展机遇...",
        content: `随着国产AI芯片的规模化量产和云计算市场的激烈竞争，AI推理服务的价格持续走低，行业正式进入"普惠时代"。\n\n数据显示，2024年主流云厂商的AI推理服务价格较去年同期下降超过60%。以GPT-4级别的大模型推理为例，每百万token的调用成本已从年初的30美元降至10美元以下。\n\n国产AI芯片方面，华为昇腾、寒武纪思元等产品在推理场景的性价比已接近国际主流水平，部分场景甚至更具优势。\n\n这一趋势为中小企业提供了前所未有的AI应用机会。专家预测，2026年将成为AI应用大规模落地的元年，各行业将涌现大量基于AI的创新应用。`,
        pubDate: "2026-01-31",
        source: "机器之心",
        category: "ai-computing",
    },
    "7": {
        id: "7",
        title: "碳交易市场扩容在即，更多行业将纳入碳市场管理",
        summary: "生态环境部正在研究将钢铁、水泥等高排放行业纳入全国碳市场，预计碳配额总量和市场规模将大幅增长...",
        content: `生态环境部近日表示，正在研究将钢铁、水泥、电解铝等高排放行业纳入全国碳排放权交易市场，预计将于2026年底前完成相关制度设计。\n\n目前全国碳市场仅覆盖电力行业，纳入企业约2200家，年覆盖二氧化碳排放量约50亿吨。扩容后，预计将新增约3000家重点排放单位，覆盖排放量增加约30亿吨。\n\n市场分析人士指出，碳市场扩容将显著提升市场流动性和价格发现功能，碳价有望在当前基础上进一步上涨。同时，更多行业企业将面临碳约束，倒逼其加快绿色低碳转型。\n\n建议相关行业企业提前做好碳资产管理准备，积极参与碳市场交易，把握低碳转型的先发优势。`,
        pubDate: "2026-01-30",
        source: "碳排放交易网",
        category: "green-finance",
    },
    "8": {
        id: "8",
        title: "苏州工业园区打造零碳智慧园区标杆",
        summary: "苏州工业园区通过光储充一体化、智能能源管理等技术，实现园区碳排放同比下降30%，成为长三角零碳转型典范...",
        content: `苏州工业园区作为全国首批国家级零碳园区示范项目，通过光储充一体化、智能能源管理等先进技术，成功实现园区碳排放同比下降30%，成为长三角地区零碳转型的典范。\n\n在能源供给侧，园区建设了50MW分布式光伏电站和20MWh储能系统，可再生能源占比提升至35%。在能源消费侧，园区推广电能替代和能效提升，综合能效提升15%。\n\n在碳管理方面，园区建设了CarbonOS碳管理平台，实现碳排放的实时监测、核算和分析，为减排决策提供数据支撑。\n\n园区管委会表示，将继续加大绿色低碳投入，力争在2028年前实现碳排放强度下降50%的目标，打造全国零碳园区的标杆。`,
        pubDate: "2026-01-28",
        source: "中国节能在线",
        category: "zero-carbon",
    },
};

const categoryNames: Record<string, string> = {
    "new-energy": "新能源",
    "ai-computing": "AI算力",
    "green-finance": "绿色金融",
    "zero-carbon": "零碳园区",
};

export default function NewsDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const article = MOCK_NEWS[id];

    if (!article) {
        return (
            <div className="flex min-h-screen flex-col bg-slate-950 text-white">
                <SiteHeader />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <Newspaper className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-2">文章未找到</h1>
                        <p className="text-slate-400 mb-6">该资讯可能已被移除或链接无效</p>
                        <Link href="/news">
                            <Button className="bg-emerald-600 hover:bg-emerald-700">
                                <ArrowLeft className="w-4 h-4 mr-2" /> 返回资讯列表
                            </Button>
                        </Link>
                    </div>
                </main>
                <SiteFooter />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-950 text-white font-sans">
            <SiteHeader />
            <main className="flex-1">
                <article className="py-16">
                    <div className="container mx-auto px-6 max-w-3xl">
                        {/* 返回按钮 */}
                        <Link href="/news" className="inline-flex items-center text-slate-400 hover:text-emerald-400 mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> 返回资讯列表
                        </Link>

                        {/* 分类标签 */}
                        <div className="mb-4">
                            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
                                {categoryNames[article.category] || article.category}
                            </span>
                        </div>

                        {/* 标题 */}
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6 leading-tight">
                            {article.title}
                        </h1>

                        {/* 元信息 */}
                        <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-white/10">
                            <span className="flex items-center gap-1">
                                <Globe className="w-4 h-4" /> {article.source}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" /> {article.pubDate}
                            </span>
                        </div>

                        {/* 摘要 */}
                        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 mb-8">
                            <p className="text-lg text-slate-300 leading-relaxed font-medium">
                                {article.summary}
                            </p>
                        </div>

                        {/* 正文 */}
                        <div className="prose prose-invert prose-lg max-w-none">
                            {article.content.split("\n\n").map((paragraph, idx) => (
                                <p key={idx} className="text-slate-300 leading-relaxed mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </article>
            </main>
            <SiteFooter />
        </div>
    );
}
