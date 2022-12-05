export function nameCheck(name) {
  if (typeof name != 'string') return false;
  const regex_name = /^[가-힣]{2,8}|[a-zA-Z]{2,16}$/;
  if (getByte(name) <= 16 && regex_name.test(name)) {
    return true
  } else {
    return false
  }

  function getByte(str) { // 바이트 수 계산
    const strLength = str.length;
    let strByteLength = 0;
    for (let i = 0; i < strLength; i++) {
      if (escape(str.charAt(i)).length >= 4)
        strByteLength += 2;
      else if (escape(str.charAt(i)) == "%A7")
        strByteLength += 2;
      else
      if (escape(str.charAt(i)) != "%0D")
        strByteLength++;
    }
    return strByteLength;
  }
}