"use client";

import { useEffect, useState, useRef } from 'react';

/** 动态数字计数组件（客户端） */
export function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
    const [displayValue, setDisplayValue] = useState('0');
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateValue();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const animateValue = () => {
        // 提取数字部分
        const numericMatch = value.match(/[\d,]+/);
        if (!numericMatch) {
            setDisplayValue(value);
            return;
        }

        const numericStr = numericMatch[0].replace(/,/g, '');
        const targetNum = parseInt(numericStr, 10);
        const prefix = value.slice(0, value.indexOf(numericMatch[0]));
        const suffixPart = value.slice(value.indexOf(numericMatch[0]) + numericMatch[0].length);

        const duration = 1500; // 动画持续时间
        const steps = 60;
        const stepDuration = duration / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += 1;
            const progress = current / steps;
            // 缓动函数 - easeOutExpo
            const easeProgress = 1 - Math.pow(2, -10 * progress);
            const currentValue = Math.floor(targetNum * easeProgress);

            // 格式化数字（添加千分位）
            const formattedValue = currentValue.toLocaleString();
            setDisplayValue(prefix + formattedValue + suffixPart);

            if (current >= steps) {
                clearInterval(timer);
                setDisplayValue(value); // 确保最终值精确
            }
        }, stepDuration);
    };

    return <div ref={ref}>{displayValue}{suffix}</div>;
}
