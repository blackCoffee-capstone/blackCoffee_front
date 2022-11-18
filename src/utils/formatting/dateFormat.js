// date를 형식에 맞게 변환
export function dateFormat(date = '', format = '-') {
  // date는 2021-12-31 00:00:00 형식이어야 한다.
  if (typeof date !== 'string') {
    console.warn('dateFormat의 인자로는 string이 와야합니다');
    return '-';
  }
  if (format === 'day') {
    const _date = new Date(date);
    return `${_date.getFullYear()}년 ${_date.getMonth() + 1}월 ${_date.getDate()}일`;
  }

  const sliced = date.slice(0, 10); // 앞에 10자리만 ex) 2021-12-31

  return format === '-'
    ? sliced // ex) 2021-12-31
    : sliced.replaceAll('-', format); // ex) format이 .이면 2021.12.31
};
