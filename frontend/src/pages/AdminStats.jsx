
import { Bar } from 'react-chartjs-2'

export default function AdminStats({ data }) {
  const races = data.map(d => d.race);
  const counts = data.map(d => d.count);
  return (
    <div className="p-6 bg-gray-900 text-white rounded shadow">
      <h2 className="text-2xl mb-4 text-dndgold"> Статистика персонажів</h2>
      <Bar
        data={{
          labels: races,
          datasets: [{
            label: "Кількість персонажів",
            data: counts,
            backgroundColor: "rgba(255, 99, 132, 0.5)"
          }]
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: "Розподіл за расами" }
          }
        }}
      />
    </div>
  );
}
