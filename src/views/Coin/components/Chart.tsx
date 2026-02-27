import { useEffect, useRef } from "react";
import { createChart, AreaSeries, ColorType } from "lightweight-charts";
import { req } from "@/services/api";

interface ChartProps {
    id: string | undefined;
}

const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutos
const MAX_CACHE_CHARTS = 3;

export default function Chart({ id }: ChartProps) {
    const chartRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!chartRef.current || !id) return;

        const CACHE_KEY = `chart_${id}`;

        const chart = createChart(chartRef.current, {
            height: 400,
            autoSize: true,
            handleScroll: true,
            handleScale: false,
            grid: {
                vertLines: { color: "#0E1215" },
                horzLines: { color: "#0E1215" },
            },
            layout: {
                background: { type: ColorType.Solid, color: "#0E1215" },
                textColor: "#ffff",
            },
        });

        const areaSeries = chart.addSeries(AreaSeries, {
            lineWidth: 2,
        });
        
        function limitCache() {
            const keys = Object.keys(localStorage).filter((key) => key.startsWith("chart_"));

            if (keys.length <= MAX_CACHE_CHARTS) return;

            const items = keys
                .map((key) => {
                    const value = localStorage.getItem(key);
                    if (!value) return null;
                    const parsed = JSON.parse(value);
                    return { key, timestamp: parsed.timestamp };
                })
                .filter(Boolean) as { key: string; timestamp: number }[];

            items.sort((a, b) => a.timestamp - b.timestamp);

            const removeCount = items.length - MAX_CACHE_CHARTS;

            for (let i = 0; i < removeCount; i++) {
                localStorage.removeItem(items[i].key);
            }
        }

        async function fetchData() {
            const cached = localStorage.getItem(CACHE_KEY);

            if (cached) {
                const { data, timestamp } = JSON.parse(cached);

                if (Date.now() - timestamp < CACHE_EXPIRATION) {
                    applyChart(data);
                    return;
                }
            }

            const response = await req.get(`/coins/${id}/market_chart`, {
                params: {
                    vs_currency: "brl",
                    days: 30,
                },
            });

            const formatted = response.data.prices.map((item: [number, number]) => ({
                time: Math.floor(item[0] / 1000),
                value: item[1],
            }));

            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                    data: formatted,
                    timestamp: Date.now(),
                }),
            );

            limitCache();
            applyChart(formatted);
        }

        function applyChart(formatted: any[]) {
            const isPositive = formatted[0].value < formatted[formatted.length - 1].value;

            const mainColor = isPositive ? "#16c784" : "#ea3943";

            areaSeries.applyOptions({
                lineColor: mainColor,
                topColor: isPositive ? "rgba(22,199,132,0.4)" : "rgba(234,57,67,0.4)",
                bottomColor: "rgba(0,0,0,0)",
            });

            areaSeries.setData(formatted);
            chart.timeScale().fitContent();
        }

        fetchData();

        return () => chart.remove();
    }, [id]);

    return (
        <div className="rounded-2xl overflow-hidden">
            <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
        </div>
    );
}
