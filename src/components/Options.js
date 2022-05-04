export const orderOptions = [
  { label: 'Užsakytas', value: 1, color: '#f3b748' },
  { label: 'Patvirtintas', value: 2, color: '#30b679' },
  { label: 'Surinktas', value: 3, color: '#a848f3' },
  { label: 'Užbaigtas', value: 4, color: '#78a52f' },
  { label: 'Atšauktas', value: 5, color: '#e72727' },
  { label: 'Klaida', value: 6, color: '#e72727' },
];

export const orderCancelOptions = [
  { value: true, color: '#e72727', label: 'Taip' },
  { value: false, color: '#78a52f', label: 'Ne' },
];

export const shopOrderOptions = [
  { label: 'Laukiama patvirtinimo', value: 0, color: '#f3b748' },
  { label: 'Patvirtintas', value: 1, color: '#30b679' },
  { label: 'Paimtas', value: 2, color: '#78a52f' },
  { label: 'Atšauktas', value: 3, color: '#e72727' },
  { label: 'Klaida', value: 4, color: '#e72727' },
];

export const paymentOptions = [
  { value: 1, label: 'Pristatymo metu grynais pinigais' },
  { value: 2, label: 'Pristatymo metu kortele' },
  {
    value: 3,
    label: 'Banko pavedimu',
    info: 'Sąskaitos informacija pateikiama atlikus užsakymą',
  },
];
