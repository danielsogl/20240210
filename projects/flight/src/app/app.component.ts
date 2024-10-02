import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderbarComponent, SidebarComponent } from './shared/ui-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, HeaderbarComponent, SidebarComponent],
})
export class AppComponent {}
