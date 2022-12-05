export function nicknameCheck(nickname) {
  if (typeof nickname != 'string') return false;
  const regex_nick = /^[가-힣a-zA-Z0-9~!?@#$%^&*+=()[\]/'",.<>:;_-]+$/
  // 4byte 이상, 18자 이하
  if (getByte(nickname) >= 4 && nickname.length <= 18 && regex_nick.test(nickname)) {
    return true;
  } else {
    return false;
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