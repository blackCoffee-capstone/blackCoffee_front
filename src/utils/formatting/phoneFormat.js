// 핸드폰번호 형식으로 변환
export const phoneFormat = {
  methods: {
    phoneFormat(phoneNum = '') {
      if (typeof phoneNum !== 'string') {
        console.warn('phoneFormat의 인자로는 string이 와야합니다');
        return;
      }

      phoneNum = phoneNum.replace(/[^0-9]/g, ''); //숫자만

      if (phoneNum.length == 8) {
        return phoneNum.replace(/(\d{4})(\d{4})/, '$1-$2');
      } else {
        return phoneNum.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3');
      }
    },

    // 핸드폰번호 11자리 들어오면 000-0000-0000 처럼 변환
    // phoneFormat(phoneNum=''){
    //     return phoneNum.replace(/[^0-9]/g, "") //숫자만
    //         .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    // }

    // phoneFormat(phoneNum=''){
    //     return phoneNum.replace(/[^0-9]/g, "")	// 숫자만 남김
    //         .replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
    // },
  },
};
