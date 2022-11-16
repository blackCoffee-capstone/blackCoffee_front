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

export { alert, confirm, error };
