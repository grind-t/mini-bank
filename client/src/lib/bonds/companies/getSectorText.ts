export const bondSectors = {
  industrials: "Промышленность",
  government: "Государственный сектор",
  financial: "Финансовый сектор",
  other: "Прочее",
  consumer: "Потребительский сектор",
  materials: "Материалы",
  energy: "Энергетика",
  it: "Информационные технологии",
  health_care: "Здравоохранение",
  real_estate: "Недвижимость",
  utilities: "Коммунальные услуги",
  telecom: "Телекоммуникации",
  municipal: "Муниципальный сектор",
} as const;

export type BondSectorValue = keyof typeof bondSectors;
export type BondSectorLabel = (typeof bondSectors)[BondSectorValue];

export function getBondSectorText(sector: string): string {
  return bondSectors[sector as BondSectorValue] ?? "Неизвестный сектор";
}
