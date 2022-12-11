
import { atom } from 'recoil'

const alert = atom({
  key: 'alert',
  default: "",
})
const confirm = atom({
  key: 'confirm',
  default: {
    message: "",
    callback: null,
  }
})
const error = atom({
  key: 'error',
  default: "",
})
const prompt = atom({
  key: 'prompt',
  default: {
    message: "",
    callback: null,
  }
})

export { alert, confirm, error, prompt };
