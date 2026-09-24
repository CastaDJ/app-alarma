export function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return {
    time: `${displayHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`,
    period,
  };
}
