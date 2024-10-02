import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';


@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: './sidebar.component.html',
    standalone: true,
    imports: [RouterLinkActive, RouterLink]
})
export class SidebarComponent {}
