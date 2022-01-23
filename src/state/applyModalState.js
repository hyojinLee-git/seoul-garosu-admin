import { atom } from 'recoil';

export const applyModalState = atom({
  key: 'applyModalState',
  default: false,
});

export const clickedApplyState = atom({
  key: 'applyModalState',
  default: '',
});