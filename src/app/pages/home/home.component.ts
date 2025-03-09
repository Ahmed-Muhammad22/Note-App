import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { INotes } from '../../shared/interfaces/inotes';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly notesService = inject(NotesService);
  private readonly toastrService = inject(ToastrService);
  private readonly platId = inject(PLATFORM_ID);
  @ViewChild('updateModel') myElement!: ElementRef;
  @ViewChild('addModal') myEl!: ElementRef;
  notes: INotes[] = [];
  noteId: string = '';
  term: string = '';
  addForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });
  updateForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.platId)) {
      if (localStorage.getItem('userToken') !== null) {
        this.getAllNotes();
      }
    }
  }
  getAllNotes(): void {
    this.notesService.getUserNotes().subscribe({
      next: (res) => {
        console.log(res);
        this.notes = res.notes;
      },
      error: (err) => {
        if (err.error.msg === 'not notes found') {
          this.notes = [];
        }
      },
    });
  }
  submitAddForm(): void {
    if (this.addForm.valid) {
      this.notesService.addNewNote(this.addForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.getAllNotes();
          this.addForm.reset();
          this.closeModel();
          this.toastrService.success(
            'The adding process was successfully completed.',
            'GoodNotes'
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  showModel(): void {
    const model = this.myElement.nativeElement as HTMLElement;

    model.classList.remove('d-none');
  }

  hideModel(): void {
    const model = this.myElement.nativeElement as HTMLElement;

    model.classList.add('d-none');
  }

  @HostListener('document:click', ['$event']) onClick(event: PointerEvent) {
    if (event.target === this.myElement.nativeElement) {
      this.hideModel();
    }
    if (event.target === this.myEl.nativeElement) {
      this.closeModel();
    }
  }
  setFormPatch(note: any, id: string): void {
    this.noteId = id;
    this.updateForm.patchValue({
      title: note.title,
      content: note.content,
    });
  }

  submitUpdateForm(): void {
    this.notesService
      .updateNotes(this.updateForm.value, this.noteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateForm.reset();
          this.toastrService.success(
            'The updating process was successfully completed.',
            'GoodNotes'
          );
          this.hideModel();
          this.getAllNotes();
        },
      });
  }

  deleteSpecificNote(id: string): void {
    this.notesService.deleteNotes(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(
          'The deleting process was successfully completed.',
          'GoodNotes'
        );
        this.getAllNotes();
      },
    });
  }

  openModel(): void {
    const modal = this.myEl.nativeElement as HTMLElement;
    modal.classList.remove('d-none');
  }
  closeModel(): void {
    const modal = this.myEl.nativeElement as HTMLElement;
    modal.classList.add('d-none');
  }
}
