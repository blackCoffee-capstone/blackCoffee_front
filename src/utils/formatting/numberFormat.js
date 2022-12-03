// 숫자에 3자리마다 ',' 추가 (양수만 가능)
export function numberFormat(num = 0) {
  if (typeof num === 'string') {
    num = num.replace(/[^0-9]/g, ''); // 숫자이외 제거
  }
  return new Intl.NumberFormat().format(num);
}
