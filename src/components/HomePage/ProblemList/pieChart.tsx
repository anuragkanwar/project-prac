// import {
//   PolarGrid,
//   PolarRadiusAxis,
//   RadialBar,
//   RadialBarChart,
// } from "recharts"
// import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
//
// const chartData = [{ month: "january", desktop: 100, mobile: 50 }]
// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig// interface PieChartType { }
//
// export const PieChart = () => {
//
//   const totalVisitors = chartData[0].desktop + chartData[0].mobile + 50
//
//   return (
//     <div>
//       <ChartContainer
//         config={chartConfig}
//         className="mx-auto aspect-square w-full max-w-[250px]"
//       >
//         <RadialBarChart
//           data={chartData}
//           startAngle={90}
//           endAngle={180}
//           innerRadius={80}
//           outerRadius={130}
//         >
//           <PolarGrid
//             gridType="circle"
//             radialLines={false}
//             stroke="none"
//             className="first:fill-muted last:fill-background"
//             startAngle={60}
//             polarRadius={[86, 74]}
//           />
//           <ChartTooltip
//             cursor={false}
//             content={<ChartTooltipContent hideLabel />}
//           />
//           <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} />
//           <RadialBar
//             dataKey="desktop"
//             stackId="a"
//             cornerRadius={5}
//             fill="var(--color-desktop)"
//             className="stroke-transparent stroke-2"
//           />
//           <RadialBar
//             dataKey="mobile"
//             fill="var(--color-mobile)"
//             stackId="a"
//             cornerRadius={5}
//             className="stroke-transparent stroke-2"
//           />
//         </RadialBarChart>
//       </ChartContainer>
//     </div>
//   )
// }
