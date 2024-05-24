import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Component decorator with metadata defining the selector, HTML and CSS files
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  presentationTime: string = '';
  eventTimes: string = '';
  eventDay: string = 'Saturday';
  welcomeMessages: string[] = [];
  roomsearch!: FormGroup;
  rooms!: Room[];
  messages: string[] = [];
  private baseUrl: string = 'http://localhost:8080';
  currentCheckInVal!: string;
  currentCheckOutVal!: string;
  request!: ReserveRoomRequest;
  public submitted!: boolean;

  // Constructor to inject the HttpClient service
  constructor(private httpClient: HttpClient) {}

  // Lifecycle hook that initializes the component
  ngOnInit() {
    this.roomsearch = new FormGroup({
      checkin: new FormControl(''),
      checkout: new FormControl('')
    });

    // Listen to form value changes
    this.roomsearch.valueChanges.subscribe(x => {
      this.currentCheckInVal = x.checkin;
      this.currentCheckOutVal = x.checkout;
    });

    // Initial method call to fetch welcome messages
    this.fetchWelcomeMessages();
    this.fetchPresentationTimes();
  }

  // Fetches initial welcome messages from the server
  fetchWelcomeMessages() {
    this.httpClient.get<string[]>(`${this.baseUrl}/welcome`)
      .subscribe(
        messages => this.handleWelcomeMessages(messages),
        error => this.logMessageFetchError(error)
      );
  }

  fetchPresentationTimes(): void {
    // Set the responseType to 'text' to treat the HTTP response as a plain text string.
    // The 'as 'json'' casting is used here for type consistency, though it's technically incorrect for the 'text' responseType.
    this.httpClient.get<string>(`${this.baseUrl}/api/time/convert`, { responseType: 'text' as 'json' })
      .subscribe(
        presentationTime => {
          // Assign the retrieved presentation time to the component's presentationTime variable.
          this.presentationTime = presentationTime;
        },
        error => {
          // Log an error message to the console if the HTTP request fails.
          console.error('Error fetching presentation times:', error);
        }
      );
  }


  // Handles the welcome messages received from the server
  private handleWelcomeMessages(messages: string[]): void {
    this.messages = messages;
    console.log('Messages:', this.messages);
  }

  // Logs errors that occur during the fetch operation
  private logMessageFetchError(error: any): void {
    console.error('Error fetching welcome messages:', error);
  }


  // Handles the form submission and retrieves room availability
  onSubmit(form: { value: RoomSearch, valid: boolean }) {
    if (!form.valid) {
      console.error('Form submission is invalid');
      return; // Stops further execution if form data is invalid
    }

    this.retrieveAvailableRooms().subscribe(
      roomsData => this.processRoomData(roomsData),
      error => console.error('Error fetching rooms:', error)
    );
  }

  // Fetches room data from the server
  private retrieveAvailableRooms(): Observable<any> {
    return this.getAll();
  }

  // Processes fetched room data
  private processRoomData(roomsData: any) {
    const roomsArray = Object.values(roomsData)[0];
    if (!Array.isArray(roomsArray)) {
      console.error('Incorrect format for rooms data:', roomsArray);
      return; // Exit if data is not in expected array format
    }

    this.updateRoomsList(roomsArray);
    console.log('Fetched rooms:', roomsArray);
  }

  // Updates the rooms list with currency conversions
  private updateRoomsList(roomsArray: Room[]) {
    this.rooms = roomsArray.map(room => ({
      ...room,
      priceCAD: this.convertToCAD(room.price),
      priceEUR: this.convertToEUR(room.price)
    }));
  }

  // Converts price to CAD
  private convertToCAD(price: string): string {
    return (parseFloat(price) * 1.3).toFixed(2);
  }

  // Converts price to EUR
  private convertToEUR(price: string): string {
    return (parseFloat(price) * 0.9).toFixed(2);
  }


  reserveRoom(value: string) {
    this.request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);
    this.createReservation(this.request);
  }

  // Handles room reservation requests
  createReservation(request: ReserveRoomRequest) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post<Room>(`${this.baseUrl}/room/reservation/v1`, request, { headers })
      .subscribe(response => console.log(response)); // Log the server response
  }

  getAll(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(`${this.baseUrl}/room/reservation/v1`, {
      params: { checkin: this.currentCheckInVal, checkout: this.currentCheckOutVal },
      responseType: 'json'
    });
  }
}

export interface RoomSearch {
  checkin: string;
  checkout: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  price: string;
  priceCAD: string;
  priceEUR: string;
  links: any;
}



export class ReserveRoomRequest {
  constructor(
    public roomId: string,
    public checkin: string,
    public checkout: string
  ) {}
}
