import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {EndlessMedicalCheckerService} from '../services/endless-medical-checker.service';
import {IChoice, ISymptomWithDetails} from '../interfaces/symptom.interface';
import {IConversationText} from '../interfaces/conversation.interface';
import {IAnalysisResponse} from '../interfaces/results.interface';
import {UserService} from '../../../../shared/services/user.service';
import {ResultsComponent} from './results/results.component';
import {MatDialog} from '@angular/material/dialog';

const MIN_QUESTION_LENGTH = 6;

@Component({
  selector: 'app-endless-medical-checker',
  templateUrl: './endless-medical-checker.component.html',
  styleUrls: ['./endless-medical-checker.component.scss']
})
export class EndlessMedicalCheckerComponent implements OnInit, OnDestroy{
  @ViewChild('scrollable') scrollable: any
  questionCount = MIN_QUESTION_LENGTH;
  conversation: IConversationText[] = [];
  currentQuestion: ISymptomWithDetails;
  lastQuestion: ISymptomWithDetails;
  answeredQuestions: ISymptomWithDetails[] = [];
  showMainSymptomCategories = false;
  showTerms = false;
  termsAccepted = false;
  results: string[];
  showResults = false;
  isFetching = true;
  Number = Number;
  termChoices = [
    {
      laytext: 'I have read and accepted the terms',
      value: 1
    },
    {
      laytext: 'I do not accept the terms',
      value: 0
    }
  ]

  constructor(private router: Router,
              private checkerService: EndlessMedicalCheckerService,
              private userService: UserService,
              private cdRef: ChangeDetectorRef,
              private dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    if (!this.checkerService.hasSessionID()) {
      await this.initSession();
    }
    this.showTerms = true;
    this.isFetching = false;
  }

  async initSession() {
    this.isFetching = true;
    await this.checkerService.initSession$();
    this.isFetching = false;
  }

  async acceptedTerms(accepted: boolean): Promise<void> {
    if (!accepted) {
      await this.goHome();
    }
    this.showTerms = false;
    this.termsAccepted = true;
    this.isFetching = true;
    await this.checkerService.acceptTerms();
    await this.submitAgeAndGender();
    this.showMainSymptomCategories = true;
    this.isFetching = false;
  }

  async onAnswer(answerValue: number | string): Promise<void> {
    const currentQuestion = {...this.currentQuestion}
    this.setCurrentQuestion(undefined);
    this.isFetching = true;

    answerValue = Number(answerValue);
    const {name} = currentQuestion;
    const answerText = currentQuestion?.choices?.find((choice: IChoice) => choice.value === answerValue)?.laytext || answerValue;

    this.conversation.push({
      questionText: currentQuestion.laytext || currentQuestion.text,
      questionName: name,
      answerText,
      answerValue: answerValue
    });

    this.answeredQuestions.push(currentQuestion);

    await this.checkerService.updateSymptom(name, answerValue);

    if(this.conversation.length > this.questionCount) {
      this.lastQuestion = currentQuestion;
      return this.analyze();
    }

    this.subscribeToSuggestions(currentQuestion);
  }

  onMainSymptomAnswered(text: IConversationText): void {
    this.conversation.push(text);
  }

  onShowCurrentQuestion(question: ISymptomWithDetails): void {
    this.setCurrentQuestion(question);
    this.showMainSymptomCategories = false
  }

  subscribeToSuggestions(currentQuestion: any): void {
    this.checkerService.suggestSymptoms$().subscribe((questions: any[]) => {
      if(!questions.length) {
        const sameCategoryQuestion = this.checkerService.getSameCategoryQuestion(currentQuestion.category, this.answeredQuestions.map(question => question.name))
        if(!!sameCategoryQuestion) {
          this.setCurrentQuestion(sameCategoryQuestion);
        }
      } else {
        this.checkerService.getAllSymptoms$().subscribe((symptoms: ISymptomWithDetails[]) => {
          const question = symptoms.find(symptom => symptom.name === questions[0][0]);
          this.setCurrentQuestion(question)
          if(!this.currentQuestion) {
            const question = this.checkerService.getSameCategoryQuestion(questions[0][0], this.answeredQuestions.map(question => question.name))
            this.setCurrentQuestion(question)
          }
        })
      }
    })
  }

  analyze(): void {
    this.checkerService.analyze$().subscribe((results: IAnalysisResponse) => {
      this.dialog.open(ResultsComponent, {
        disableClose: false,
        autoFocus: false,
        maxWidth: '90vw',
        data: {canContinue: this.questionCount < 24, diseases: results.Diseases}
      }).afterClosed().subscribe(continueQuestions => {
        if(continueQuestions) {
          this.continue();
        } else {
          this.endSession();
        }
      });
    });
  }

  diseaseProbability(probability: string): string {
      return (Number(probability) * 100).toFixed(2) + '%';
  }

  continue(): void {
    this.questionCount = this.questionCount + 6;
    this.showResults = false;
    this.subscribeToSuggestions(this.lastQuestion);
  }

  async submitAgeAndGender(): Promise<void> {
    const {age, gender} = await this.userService.getUserData();
    await this.checkerService.submitAgeAndGender(age, gender);
  }

  setCurrentQuestion(currentQuestion: any): void {
    this.isFetching = false
    this.currentQuestion = currentQuestion;
    this.cdRef.detectChanges()
    this.scrollToBottom();
  }

  scrollToBottom(): void{
    this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight
  }

  endSession(): void {
    this.checkerService.endSession();
    this.goHome();
  }

  goHome(): void {
    this.router.navigate(['..', 'home'])
  }

  ngOnDestroy(): void {
    this.endSession();
  }
}
