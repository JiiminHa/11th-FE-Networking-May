export const getWeekdayFromDate = (mmdd: string): string => {
  const now = new Date(); // 현재 연도 가져오기
  const [month, day] = mmdd.split(".").map(Number);

  if (!month || !day) return ""; // 예외 처리

  const date = new Date(now.getFullYear(), month - 1, day);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return weekdays[date.getDay()];
};
