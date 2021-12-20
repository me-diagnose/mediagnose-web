import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EndlessMedicalCheckerService} from '../services/endless-medical-checker.service';
import {IChoice, ISymptomWithDetails} from '../interfaces/symptom.interface';
import {IConversationText} from '../interfaces/conversation.interface';
import {IAnalysisResponse} from '../interfaces/results.interface';
import {UserService} from '../../../../shared/services/user.service';

const MIN_QUESTION_LENGTH = 6;

@Component({
  selector: 'app-endless-medical-checker',
  templateUrl: './endless-medical-checker.component.html',
  styleUrls: ['./endless-medical-checker.component.scss']
})
export class EndlessMedicalCheckerComponent implements OnInit, OnDestroy {
  questionCount = MIN_QUESTION_LENGTH;
  conversation: IConversationText[] = [];
  currentQuestion: ISymptomWithDetails;
  answeredQuestions: ISymptomWithDetails[] = [];
  showMainSymptomCategories = false;
  showTerms = false;
  termsAccepted = false;
  results: string[];
  showResults = false;
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

  constructor(private router: Router, private checkerService: EndlessMedicalCheckerService, private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    if (!this.checkerService.hasSessionID()) {
      await this.initSession();
    }
    this.showTerms = true;
  }

  async initSession() {
    await this.checkerService.initSession$();
  }

  async acceptedTerms(accepted: boolean): Promise<void> {
    if (!accepted) {
      await this.goHome();
    }
    this.showTerms = false;
    this.termsAccepted = true;
    await this.checkerService.acceptTerms();
    await this.submitAgeAndGender();
    this.showMainSymptomCategories = true;
  }

  async onAnswer(answerValue: number | string): Promise<void> {
    answerValue = Number(answerValue);
    const {name} = this.currentQuestion;
    const answerText = this.currentQuestion?.choices?.find((choice: IChoice) => choice.value === answerValue)?.laytext || answerValue;

    await this.checkerService.updateSymptom(name, answerValue);

    this.conversation.push({
      questionText: this.currentQuestion.laytext || this.currentQuestion.text,
      questionName: name,
      answerText,
      answerValue: answerValue
    });

    this.answeredQuestions.push(this.currentQuestion);

    // @ts-ignore
    this.currentQuestion = undefined;

    if(this.conversation.length > this.questionCount) {
      return this.analyze();
    }

    this.subscribeToSuggestions();
  }

  onMainSymptomAnswered(text: IConversationText): void {
    this.conversation.push(text);
  }

  onShowCurrentQuestion(question: ISymptomWithDetails): void {
    this.currentQuestion = question;
    this.showMainSymptomCategories = false
  }

  subscribeToSuggestions(): void {
    this.checkerService.suggestSymptoms$().subscribe((questions: any[]) => {
      if(!questions.length) {
        const sameCategoryQuestion = this.checkerService.getSameCategoryQuestion(this.currentQuestion.category, this.answeredQuestions.map(question => question.name))
        if(!!sameCategoryQuestion) {
          this.currentQuestion = sameCategoryQuestion;
        }
      } else {
        this.checkerService.getAllSymptoms$().subscribe((symptoms: ISymptomWithDetails[]) => {
          // @ts-ignore
          this.currentQuestion = symptoms.find(symptom => symptom.name === questions[0][0]);
          if(!this.currentQuestion) {
            // @ts-ignore
            this.currentQuestion = this.checkerService.getSameCategoryQuestion(questions[0][0], this.answeredQuestions.map(question => question.name))
          }
        })
      }
    })
  }

  analyze(): void {
    this.checkerService.analyze$().subscribe((results: IAnalysisResponse) => {
      this.results = results.Diseases;
      this.showResults = true;
    });
  }

  diseaseProbability(probability: string): string {
      return (Number(probability) * 100).toFixed(2) + '%';
  }

  continue(): void {
    this.questionCount = this.questionCount + 6;
    this.showResults = false;
    this.subscribeToSuggestions();
  }

  async submitAgeAndGender(): Promise<void> {
    const {age, gender} = await this.userService.getUserData();
    await this.checkerService.submitAgeAndGender(age, gender);
  }

  endSession(): void {
    this.checkerService.endSession();
    this.goHome();
  }

  goHome(): void {
    this.router.navigate(['..', 'home'])
  }

  ngOnDestroy(): void {
    this.endSession()
  }
}
