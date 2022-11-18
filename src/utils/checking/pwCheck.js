// 비밀번호 형식 맞는지 체크 (return boolean)
export function pwCheck(newPW = '') {
  // 8~15자리 사이 숫자, 특수문자, 영어 1개 이상씩
  const reg_pw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!@#$%^&*()+=_-]).{8,15}/;
  return reg_pw.test(newPW);
};
