export interface ISymptomWithDetails {
  text: string;
  laytext: string;
  name: string;
  type: string;
  min?: number;
  max?: number;
  default: number;
  choices?: IChoice[];
  category: string;
  IsPatientProvided?: boolean
}

export interface IChoice {
  'text': string;
  'laytext': string;
  'value': number,
  'relatedanswertag': string | null
}

export interface ISymptom {
  code: string;
  text: string;
}

export enum MainSymptomsCategories {
  BurningWithUrination = 'Burning with urination.',
  Constipation = 'Constipation.',
  DiarrheaSx = 'Diarrhea, loose stools.',
  ElevatedSystolicBp = 'Elevated blood pressure.',
  GrossHematuria = 'Visible blood (red) in urine.',
  MicroscopicHematuriaRBCs = 'Red blood cells detected (test) in urine.',
  FoamyUrine = 'Foamy or bublly urine.',
  UAProteinuria = 'Protein in urine.',
  StrainStream = 'Straining on urination.',
  NonEmptyBladder = 'Feeling of not empyting bladder.',
  Edema = 'Swollen legs.',
  HeadacheIntensity = 'Headache.',
  SeverityCough = 'Cough.',
  HistoryFever = 'Fever or high temperature.',
  SoreThroatROS = 'Sore throat.',
  DyspneaSeveritySubjective = 'Shortness of breath.',
  ChestPainSeverity = 'Chest pain.',
  StomachPainSeveritySx = 'Belly or abdominal pain.',
  Nausea = 'Feeling like vomiting or vomiting.',
  LowerGIBleedSx = 'Red stools.',
  FemaleDCSx = 'Abnormal vaginal discharge'
}
