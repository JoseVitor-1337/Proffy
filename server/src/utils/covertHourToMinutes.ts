export default function convertHourToMinutes(time: string) {
  const [hour, minutes] = time.split(":").map(Number);

  const hourInMinutes = hour * 60 + minutes;

  return hourInMinutes;
}
