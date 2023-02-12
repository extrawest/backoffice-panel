import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const PrimaryBoardChart = () => {
	const data = [
		{ y2: 12, y1: 35, x: 0 },
		{ y2: 30, y1: 37, x: 3 },
		{ y2: 27, y1: 22, x: 5 },
		{ y2: 52, y1: 34, x: 8 },
		{ y2: 17, y1: 16, x: 12 },
		{ y2: 47, y1: 42, x: 16 },
		{ y2: 37, y1: 35, x: 19 }
	];

	return (
		<ResponsiveContainer minHeight={300}>
			<LineChart
				data={data}
				margin={{
					top: 40,
					left: 40,
				}}
			>
				<Tooltip />
				<Line
					type="monotone"
					dataKey="y1"
					stroke="#8884d8"
				/>
				<Line
					type="monotone"
					dataKey="y2"
					stroke="grey"
				/>
				<XAxis
					dataKey="x"
					minTickGap={1}
					tickSize={1}
					type="number"
				/>
				<YAxis
					type="number"
					orientation="right"
					minTickGap={10}
				/>
				<CartesianGrid
					vertical={false}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default PrimaryBoardChart;
