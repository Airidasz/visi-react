export const orderOptions = [
  { label: 'Užsakytas', value: '1' },
  { label: 'Patvirtintas', value: '2' },
  { label: 'Išsiųstas', value: '3' },
  { label: 'Pristatytas', value: '4' },
  { label: 'Klaida', value: '5' },
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
