import {MovieEvent} from './movieEvent.model.client';

export class BookingDetail {
  eventId : string;
  event : MovieEvent;
  user : string;
  tickets : string;
}
