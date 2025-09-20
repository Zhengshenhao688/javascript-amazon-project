import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

/**
 * 检查一个 DayJS 日期对象是否是周末
 * @param {object} date - 一个 DayJS 对象
 * @returns {boolean} - 如果是周六或周日，返回 true；否则返回 false
 */
export default function isWeekend(data) {
  const dayName = data.format('dddd');

  return dayName === 'Saturday' || dayName === 'Sunday'
}

/*
// 测试今天的日期
console.log('--- 测试今天 ---');
const today = dayjs();
console.log(`今天是: ${today.format('dddd')}`);
console.log(`是周末吗? ${isWeekend(today)}`);

console.log(''); // 空一行，方便查看

// 测试一个已知的周六
console.log('--- 测试一个周六 ---');
const aSaturday = dayjs('2025-09-13');
console.log(`日期是: ${aSaturday.format('dddd, MMMM D')}`);
console.log(`是周末吗? ${isWeekend(aSaturday)}`);
*/