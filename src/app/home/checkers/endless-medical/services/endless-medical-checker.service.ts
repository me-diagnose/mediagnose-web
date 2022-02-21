import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {firstValueFrom, map, Observable, of, tap} from 'rxjs';
import {ISession} from '../interfaces/session.interface';
import {ISymptomWithDetails} from '../interfaces/symptom.interface';
import {environment} from '../../../../../environments/environment';
import {IAnalysisResponse, IDocumentation, IDocumentationResponse} from '../interfaces/results.interface';

const TERMS_PASSPHRASE = 'I have read, understood and I accept and agree to comply with the Terms of Use of EndlessMedicalAPI and Endless Medical services. The Terms of Use are available on endlessmedical.com'

@Injectable()
export class EndlessMedicalCheckerService {
  private url = environment.endlessMedical.checkerUrl;
  private sessionKey = environment.endlessMedical.sessionKey;
  private _allSymptoms: ISymptomWithDetails[] = [];

  constructor(private http: HttpClient) {
  }

  private _sessionId: string | null;

  public get sessionId(): string | null {
    this._sessionId = localStorage.getItem(this.sessionKey);
    return this._sessionId;
  }

  public initSession$(): Promise<ISession> {
    return firstValueFrom(this.http.get<ISession>('https://api-prod.endlessmedical.com/v1/dx/initSession').pipe(tap((session: ISession) => {
      if (session.SessionID) {
        localStorage.setItem(this.sessionKey, session.SessionID);
      }
    })))
  }

  public hasSessionID(): boolean {
    return !!this.sessionId || false;
  }

  public acceptTerms(): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${this.url}AcceptTermsOfUse?passphrase=${TERMS_PASSPHRASE}`, {}));
  }

  public updateSymptom(name: string, value: number): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${this.url}UpdateFeature?name=${name}&value=${value}`, {}));
  }

  public suggestSymptoms$(): Observable<any> {
    return this.http.get<any>(`${this.url}GetSuggestedFeatures_PatientProvided?TopDiseasesToTake=10`).pipe(map((responseBody: any) => {
      return responseBody.SuggestedFeatures;
    }));
  }

  public getAllSymptoms$(): Observable<ISymptomWithDetails[]> {
    if (this._allSymptoms.length) {
      return of(this._allSymptoms);
    }

    return this.http.get<ISymptomWithDetails[]>('https://endlessmedical.com/wp-content/uploads/SymptomChecker/assets/SymptomsOutput.json').pipe(map((allSymptoms: ISymptomWithDetails[]) => {
      this._allSymptoms = allSymptoms;
      return allSymptoms;
    }))
  }

  public getSameCategoryQuestion(category: string, alreadyAnsweredQuestions: string[]): ISymptomWithDetails | null {
    if (!this._allSymptoms.length) {
      return null;
    }

    const categorySymptoms = this._allSymptoms.filter((symptom: ISymptomWithDetails) => symptom.category === category)
    for (let i = 0; i < categorySymptoms.length; i++) {
      if (!alreadyAnsweredQuestions.includes(categorySymptoms[i].name)) {
        return categorySymptoms[i];
      }
    }

    return null;
  }

  public analyze$(): Observable<IAnalysisResponse> {
    return this.http.get<IAnalysisResponse>(`${this.url}Analyze?NumberOfResults=5&ResponseFormat=full`);
  }

  public getDocumentation(): Promise<IDocumentation> {
    return firstValueFrom(this.http.get<IDocumentationResponse>(`${this.url}GetMedicalDocumentation?SessionID=${this.sessionId}&format=json`).pipe(map(response => response.MedicalDocumentation)));
  }

  public async submitAgeAndGender(age: number, gender: number): Promise<void> {
    await this.updateSymptom('Age', age);
    await this.updateSymptom('Gender', gender);
  }

  public endSession(): void {
    localStorage.removeItem(this.sessionKey);
    this._sessionId = null;
  }
}
