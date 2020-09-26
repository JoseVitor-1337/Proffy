interface ISchedules {
  week_day: number;
  from: string;
  to: string;
}

export const convertTimeInMinutes = (time: string) => {
  let [hour, minutes] = time.split(":").map(Number);

  const timeInMinutes = hour * 60 + minutes;

  return timeInMinutes;
};

export const transformClassSchedule = (
  schedules: ISchedules[],
  classId: number
) => {
  return schedules.map((scheduleItem: ISchedules) => {
    const { week_day, to, from } = scheduleItem;

    return {
      class_id: classId,
      week_day,
      from: convertTimeInMinutes(from),
      to: convertTimeInMinutes(to),
    };
  });
};
