import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobCardComponent } from '../job-card/job-card.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JobCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AssendingDesecending';
}
