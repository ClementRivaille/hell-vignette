export interface Dialog {
  lines: string[];
  question?: string;
  accept?: string;
  refuse?: string;
}

export const beforeEndDialogs: Dialog[] = [
  { lines: ['before-end.announce'], question: 'before-end.question' },
  {
    lines: ['before-end.leaving', 'before-end.ready'],
    accept: 'before-end.go',
  },
];

export const endDialogs: Dialog[] = [
  { lines: ['end.suspension'], question: 'end.window' },

  {
    lines: ['end.decision'],
    accept: 'end.accept',
    refuse: 'end.refuse',
  },
  {
    lines: ['end.comprehension'],
    refuse: 'end.back',
  },
];
