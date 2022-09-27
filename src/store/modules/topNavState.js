import { atom } from 'recoil'

// 어떤 기능을 동작시킬지 정하는 keyword
const keywordToFunc = atom({
  key: 'keywordToFunc',
  default: ''
})

export { keywordToFunc };