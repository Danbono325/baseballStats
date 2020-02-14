import { SortDirection } from '../helpers/NgbdSortableHeader';

export interface SortEvent {
    column: string;
    direction: SortDirection;
  }