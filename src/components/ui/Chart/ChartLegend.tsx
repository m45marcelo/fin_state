"use client"

interface LegendItem{
    label: string;
    percentages: number;
    value: number;
    color: string;
}

interface ChartLegendProps {
    items: LegendItem[];
}

export const ChartLegend = ({items}: ChartLegendProps) =>{
    return(
        <div className="flex w-full flex-col gap-3 mt-4">
            {items.map(item => (
                <div key={item.label} className="flex justify-between items-center gap-3 text-sm">
                    <span className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}/>

                    <span className="flex-1 text-gray-700 text-xs font-normal">{item.label}</span>

                    <span className="text-xs font-medium text-gray-700">
                        {(item.percentages).toFixed(2)}%
                    </span>
                </div>
            ))}
        </div>
    )
}