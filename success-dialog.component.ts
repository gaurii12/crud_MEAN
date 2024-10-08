import { Component } from '@angular/core';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss'
})
export class SuccessDialogComponent {

  closeDialog(dialogContainer: HTMLElement) {
    dialogContainer.style.display = 'none';
    dialogContainer.style.opacity='0'
  }
}
