import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  imports: [ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private readonly toastrService = inject(ToastrService);
  footerForm: FormGroup = new FormGroup({
    email: new FormControl(null),
  });
  shareApp(): void {
    if (this.footerForm.valid) {
      console.log(this.footerForm.value);
      this.footerForm.reset();
      this.toastrService.success(
        'The sending process was successfully completed.',
        'GoodNotes'
      );
    } else {
      this.toastrService.error(
        'Please enter a value before sending.',
        'FreshCart'
      );
    }
  }
}
