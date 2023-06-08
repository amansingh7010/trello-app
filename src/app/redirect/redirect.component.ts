import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
})
export class RedirectComponent {
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.redirect();
  }

  redirect(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.authService.redirect(params).subscribe((data) => {
        this.router.navigate(['']);
      });
    });
  }
}
