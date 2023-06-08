import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  userFullName: string = '';

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe((data) => {
      this.userFullName = data.fullName;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
