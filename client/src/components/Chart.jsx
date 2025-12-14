import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function Chart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorBinance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FCD535" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#FCD535" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorKraken" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5741D9" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#5741D9" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis
                    dataKey="time"
                    stroke="#666"
                    tick={{ fill: '#666', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#666"
                    tick={{ fill: '#666', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    domain={['auto', 'auto']}
                />
                <Tooltip
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333', borderRadius: '8px' }}
                    labelStyle={{ color: '#a1a1aa' }}
                />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="binance"
                    name="Binance ($)"
                    stroke="#FCD535"
                    fill="url(#colorBinance)"
                    strokeWidth={2}
                />
                <Area
                    type="monotone"
                    dataKey="kraken"
                    name="Kraken ($)"
                    stroke="#5741D9"
                    fill="url(#colorKraken)"
                    strokeWidth={2}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default Chart;
