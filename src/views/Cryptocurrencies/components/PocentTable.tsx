import { formatPercentage } from "@/utils/format";
import { Triangle } from "lucide-react";

interface PorcentTableProps {
    porcent: number;
    compactRows: "small" | "medium" | "big";
}

export default function PorcentTable({ porcent, compactRows }: PorcentTableProps) {
    const isNegative = porcent < 0;

    const colorClasses = isNegative
        ? "bg-[#A60320]/15 border border-[#A60320]/50 text-[#FF738C]"
        : "bg-[#62D361]/30 border border-[#62D361]/50 text-[#E4FFE4]";

    const sizeClasses =
        compactRows === "small"
            ? "px-1.5 py-0.5 text-xs "
            : compactRows === "medium"
              ? "px-1.5 py-1 text-sm"
              : "px-2 py-1";

    return (
        <div className={`${colorClasses} ${sizeClasses} rounded-lg inline-flex items-center gap-1`}>
            <span className="pl-1">
                <Triangle size={10} className={isNegative ? "rotate-180" : ""} />
            </span>
            {formatPercentage(porcent)}
        </div>
    );
}
