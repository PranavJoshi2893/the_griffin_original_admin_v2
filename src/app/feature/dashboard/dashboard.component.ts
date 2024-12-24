import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../core/service/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, MatListModule, MatDividerModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private _router = inject(Router);

  onRedirect(path: string) {
    const routingPath = path.split('/');
    this._router.navigate(routingPath);
  }

  private _userService = inject(UserService);
  onLogout() {
    this._userService.logout();
    this._router.navigate(['authentication', 'login']);
  }
}
