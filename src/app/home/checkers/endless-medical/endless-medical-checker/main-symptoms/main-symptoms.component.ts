import {Component, EventEmitter, Output} from '@angular/core';
import {ISymptomWithDetails, MainSymptomsCategories} from '../../interfaces/symptom.interface';
import {IConversationText} from '../../interfaces/conversation.interface';
import {EndlessMedicalCheckerService} from '../../services/endless-medical-checker.service';

@Component({
  selector: 'app-main-symptoms',
  templateUrl: './main-symptoms.component.html',
  styleUrls: ['./main-symptoms.component.scss']
})
export class MainSymptomsComponent {
  @Output() answerMainSymptom: EventEmitter<IConversationText> = new EventEmitter<IConversationText>();
  @Output() showMainQuestion: EventEmitter<ISymptomWithDetails> = new EventEmitter<ISymptomWithDetails>();

  MainSymptomCategories = MainSymptomsCategories;
  question ='Let\'s start by selecting your main symptom';
  showList = true;
  mainSymptomQuestion: ISymptomWithDetails | undefined;

  constructor(private checkerService: EndlessMedicalCheckerService) {
  }

  onSymptomClick(value: string): void {
    // @ts-ignore
    const key = Object.keys(MainSymptomsCategories)[Object.values(MainSymptomsCategories).indexOf(value)]
    const chosenSymptom = {
      key,
      value
    }
    this.showList = false;
    this.answerMainSymptom.emit({
      questionText: this.question,
      questionName: key,
      answerText: value,
      answerValue: 0
    })

    this.subscribeForSymptomQuestion(chosenSymptom);
  }

  getMainSymptomsValues(): string[] {
    return Object.values(this.MainSymptomCategories);
  }

  subscribeForSymptomQuestion(chosenSymptom: { key: string
    value: string }): void {
    this.checkerService.getAllSymptoms$().subscribe((symptoms: ISymptomWithDetails[]) => {
      this.mainSymptomQuestion = symptoms.find((symptom: ISymptomWithDetails) => symptom.name === chosenSymptom.key);
      this.showMainQuestion.emit(this.mainSymptomQuestion);
    });
  }

}
