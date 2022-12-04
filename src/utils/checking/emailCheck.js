// 이메일 형식 맞는지 체크 (return boolean)
export function emailCheck(newEmail = '') {
  const reg_email = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  return reg_email.test(newEmail);
}
