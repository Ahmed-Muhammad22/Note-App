import { Pipe, PipeTransform } from '@angular/core';
import { INotes } from '../interfaces/inotes';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(notes: INotes[], term: string): INotes[] {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
