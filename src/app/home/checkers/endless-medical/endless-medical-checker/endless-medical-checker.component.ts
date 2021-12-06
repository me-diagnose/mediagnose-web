import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EndlessMedicalCheckerService} from '../services/endless-medical-checker.service';
import {IChoice, ISymptomWithDetails} from '../interfaces/symptom.interface';
import {IConversationText} from '../interfaces/conversation.interface';
import {IAnalysisResponse} from '../interfaces/results.interface';

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
  startingQuestion = {
    age: {
      text: 'What is your age?',
      laytext: 'What is your age?',
      name: 'Age',
      type: 'integer',
      min: 18,
      max: 120,
      default: 35,
      category: 'Constitutional and vital signs physical examination',
      IsPatientProvided: false
    },
    sex: {
      text: 'What is patient\'s gender?',
      laytext: 'What is your gender?',
      name: 'Gender',
      type: 'categorical',
      default: 2,
      choices: [
        {
          text: 'Data unavailable (i.e. unable to assess).',
          laytext: 'Skip this question.',
          value: 1,
          relatedanswertag: null
        },
        {
          text: 'Male.',
          laytext: 'I am male.',
          value: 2,
          relatedanswertag: 'This question doesn\'t apply to me, as I am male.'
        },
        {
          text: 'Female.',
          laytext: 'I am female.',
          value: 3,
          relatedanswertag: 'This question doesn\'t apply to me, as I am female.'
        }
      ],
      category: 'Constitutional and vital signs physical examination',
      IsPatientProvided: true
    }
  };
  showMainSymptomCategories = false;
  showTerms = false;
  terms = 'Please remember, I am not healthcare provider, so I cannot provide professional medical advice.<br>' +
    'In case of any symptoms, complaints or problems, always immediately seek medical advice appropriately and don\'t delay contacting professional healthcare services. Only after you contact healthcare profesional use this symptom checker. <br>' +
    'Have you read and do you accept this terms and terms of use of EndlessMedical.com services, which are available for read at EndlessMedical.com?';
  termsAccepted = false;
  results: string[];
  showResults = false;
  Number = Number;

  constructor(private router: Router, private checkerService: EndlessMedicalCheckerService) {
  }

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
      await this.router.navigate(['..', 'home'])
    }

    this.termsAccepted = true;
    await this.checkerService.acceptTerms();
    this.currentQuestion = {...this.startingQuestion.age};
  }

  async onAnswer(answerValue: number | string): Promise<void> {
    answerValue = Number(answerValue);
    const {name} = this.currentQuestion;
    const answerText = this.currentQuestion?.choices?.find((choice: IChoice) => choice.value === answerValue)?.laytext || answerValue;

    await this.checkerService.updateSymptom(name, answerValue);

    this.conversation.push({
      questionText: this.currentQuestion.laytext,
      questionName: name,
      answerText,
      answerValue: answerValue
    });

    this.answeredQuestions.push(this.currentQuestion);

    if (this.currentQuestion.name === this.startingQuestion.age.name) {
      this.currentQuestion = this.startingQuestion.sex;
      return;
    }

    if(this.currentQuestion.name === this.startingQuestion.sex.name) {
      this.showMainSymptomCategories = true;
      // @ts-ignore
      this.currentQuestion = undefined
      return;
    }

    if(this.conversation.length > this.questionCount) {
      // @ts-ignore
      this.currentQuestion = undefined;
      return this.analyze();
    }

    this.subscribeToSuggestions();
  }

  onMainSymptomAnswered(text: IConversationText): void {
    this.conversation.push(text);
  }

  onShowCurrentQuestion(question: ISymptomWithDetails): void {
    this.currentQuestion = question;
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

  endSession(): void {
    this.checkerService.endSession();
  }

  ngOnDestroy(): void {
    this.endSession()
  }
}
