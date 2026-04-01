"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const PRODUCTS = [
  "CVD金刚石散热片",
  "金刚石热沉",
  "铜-金刚石复合材料",
  "其他",
];

export default function InquiryForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    dimensions: "",
    quantity: "",
    message: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `询价 - ${form.product || "产品咨询"} - ${form.company}`
    );

    const body = encodeURIComponent(
      `姓名：${form.name}\n` +
        `公司：${form.company}\n` +
        `邮箱：${form.email}\n` +
        `电话：${form.phone || "未提供"}\n` +
        `感兴趣的产品：${form.product || "未选择"}\n` +
        `尺寸需求：${form.dimensions || "未指定"}\n` +
        `数量：${form.quantity || "未指定"}\n\n` +
        `详细需求：\n${form.message || "无"}`
    );

    window.location.href = `mailto:sales@scdc.cloud?subject=${subject}&body=${body}`;
  };

  const inputClass =
    "w-full rounded-lg border bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-colors";

  return (
    <section className="py-20 bg-slate-900/50">
      <div className="container px-4 mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">询价 / 技术咨询</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-slate-400">
            填写以下表单，我们将尽快回复您
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: name + company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">
                姓名 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={onChange}
                placeholder="您的姓名"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">
                公司 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="company"
                required
                value={form.company}
                onChange={onChange}
                placeholder="公司名称"
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 2: email + phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">
                邮箱 <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={onChange}
                placeholder="name@company.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">电话</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="选填"
                className={inputClass}
              />
            </div>
          </div>

          {/* Product select */}
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">感兴趣的产品</label>
            <select
              name="product"
              value={form.product}
              onChange={onChange}
              className={`${inputClass} appearance-none`}
            >
              <option value="">请选择</option>
              {PRODUCTS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Row 3: dimensions + quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">尺寸需求</label>
              <input
                type="text"
                name="dimensions"
                value={form.dimensions}
                onChange={onChange}
                placeholder='如 "10×10×0.5mm"'
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">数量</label>
              <input
                type="text"
                name="quantity"
                value={form.quantity}
                onChange={onChange}
                placeholder="如 100 片"
                className={inputClass}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">详细需求</label>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={onChange}
              placeholder="请描述您的具体需求、应用场景或技术问题…"
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-10 text-base font-medium rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 mr-2" />
            发送询价
          </button>
        </form>
      </div>
    </section>
  );
}
