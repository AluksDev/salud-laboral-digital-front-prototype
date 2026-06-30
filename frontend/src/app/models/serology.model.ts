export type SerologyStatus = 'pending' | 'negative' | 'positive';

export interface SerologyResult {
  vih: SerologyStatus;
  vhb: SerologyStatus;
  vhc: SerologyStatus;
}
