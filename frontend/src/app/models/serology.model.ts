export type SerologyStatus = 'pending' | 'negative' | 'positive';

export interface SerologyResult {
  vih: SerologyStatus;
  vhb: SerologyStatus;
  vhc: SerologyStatus;
}

export interface SourceSerology extends SerologyResult {
  arn: 'pending' | 'positive' | 'negative';
  cargaViral: 'pending' | 'positive' | 'negative';
  observacionesVih: string;
  vhbCore: 'pending' | 'positive' | 'negative';
  vhbSuperficie: 'pending' | 'positive' | 'negative';
}
