
export default function AlertBox({ message, type = "error" }) {
  const colors = {
    error: "bg-red-100 text-red-800 border border-red-300",
    success: "bg-green-100 text-green-800 border border-green-300",
    info: "bg-blue-100 text-blue-800 border border-blue-300"
  };

  return (
    <div className={`p-3 rounded mb-4 text-sm ${colors[type] || colors.error}`}>
      {message}
    </div>
  );
}
