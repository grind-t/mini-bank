const locale = "ru-RU";

export function getCurrentMonthName(): string {
  const formatter = new Intl.DateTimeFormat(locale, { month: "long" });
  return formatter.format(Date.now());
}

export function getDistanceInYears(target: Date): number {
  const msInYear = 1000 * 60 * 60 * 24 * 365.25;
  const diff = target.getTime() - Date.now();

  return diff / msInYear;
}

export function getDistanceInYearsText(target: Date): string {
  const distance = +getDistanceInYears(target).toFixed(1);
  const pluralForm = new Intl.PluralRules(locale).select(Math.floor(distance));
  const yearForms: Record<Intl.LDMLPluralRule, string> = {
    zero: "лет",
    one: "год",
    two: "года",
    few: "года",
    many: "лет",
    other: "лет",
  };
  return `${distance} ${yearForms[pluralForm]}`;
}
