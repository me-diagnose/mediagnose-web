export interface IAnalysisResponse {
  Diseases: string[];
  VariableImportances: VariablesImportace[];
  status: string
}


export interface VariablesImportace {
  [key: string]: {[key: string]: string}[]
}

export interface IDocumentationResponse {
  status: string;
  MedicalDocumentation: IDocumentation
}

export interface IDocumentation {
  Additionally: string;
  Assessment: string;
  'Chief complaint': string;
  Plan: string;
}
