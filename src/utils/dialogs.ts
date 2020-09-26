export interface Dialog {
  lines: string[];
  question?: string;
  accept?: string;
  refuse?: string;
}

export const beforeEndDialogs: Dialog[] = [
  { lines: ['before-end.announce'], question: 'before-end.interrogation' },
  {
    lines: ['before-end.leaving', 'before-end.time'],
    accept: 'before-end.ready',
  },
];

export const endDialogs: Dialog[] = [
  { lines: ['end.suspension'], question: 'end.window' },
  { lines: ['end.car', 'end.waiting'], question: 'end.not-dead' },
  {
    lines: ['end.second', 'end.rescue', 'end.no-deads'],
    question: 'end.really',
  },
  { lines: ['end.meaning', 'end.obligation'], question: 'end.hurtful' },

  {
    lines: ['end.pain', 'end.after', 'end.ready'],
    accept: 'end.end',
    refuse: 'end.back',
  },
  {
    lines: ['end.understand'],
    refuse: 'end.thank',
  },
];
