import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {EndlessMedicalCheckerService} from '../../services/endless-medical-checker.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  emailInput = false;
  doctorsEmail = new FormControl('', [Validators.required, Validators.email]);


  constructor(@Inject(MAT_DIALOG_DATA) public data: {canContinue: boolean, diseases: string[]},
              private checkerService: EndlessMedicalCheckerService,
              public dialogRef: MatDialogRef<ResultsComponent>) {}

  diseaseProbability(probability: string): string {
    return (Number(probability) * 100).toFixed(2) + '%';
  }

  showEmailInput(): void {
    this.emailInput = true;
  }

  getProblemsAndProbability(): string {
    let result = ''
    for(let disease of this.data.diseases) {
      result += `${disease[1]}: ${(Number(disease[2])* 100).toFixed(2)}%\n`
    }

    return result;
  }

  async sendEmail(event: Event): Promise<void> {
    event.preventDefault();

    const documentation = await this.checkerService.getDocumentation();
    const subject = `Patient Symptom report ${documentation['Chief complaint']}`;
    const body = encodeURIComponent(`${documentation.Assessment.text}\n\nPlan:\n${documentation.Plan}\n\nPossible Problems:\n${this.getProblemsAndProbability()}`)

    window.open(`mailto:${this.doctorsEmail.value}?subject=${subject}&body=${body}`);
  }

  continue(): void{
    this.dialogRef.close(true);
  }
  endSession(): void{
    this.dialogRef.close(false);
  }
}
