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
  question = 'Pick your main symptom ...';
  showList = true;
  mainSymptomQuestion: ISymptomWithDetails | undefined;

  constructor(private checkerService: EndlessMedicalCheckerService) {
  }

  onSymptomClick(chosenSymptom: { key:string
    value: string }): void {
    this.showList = false;
    this.answerMainSymptom.emit({
      questionText: this.question,
      questionName: chosenSymptom.key,
      answerText: chosenSymptom.value,
      answerValue: 0
    })

    this.subscribeForSymptomQuestion(chosenSymptom);
  }

  subscribeForSymptomQuestion(chosenSymptom: { key:string
    value: string }): void {
    this.checkerService.getAllSymptoms$().subscribe((symptoms: ISymptomWithDetails[]) => {
      this.mainSymptomQuestion = symptoms.find((symptom: ISymptomWithDetails) => symptom.name === chosenSymptom.key);
      console.log(this.mainSymptomQuestion)
      this.showMainQuestion.emit(this.mainSymptomQuestion);
    });
  }

}
