import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const accessToken = atom({
  key: 'accessToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
})
const refreshToken = atom({
  key: 'refreshToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
})

export { accessToken, refreshToken };
