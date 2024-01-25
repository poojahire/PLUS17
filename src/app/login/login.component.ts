import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  resetCredentials = { email: '', newPassword: '' };
  showResetForm = false;
  showPassword = false; 

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {}

  // login() {
  //   this.authService.login(this.credentials).subscribe(
  //     (response) => {
  //       // Handle successful login response
  //       console.log('Login successful:', response);

  //       // Show snackbar
  //       this.snackBar.open('Login successful', 'Close', { duration: 3000 });
        
  //       // Navigate to the dashboard
  //       this.router.navigate(['/dashboard']);
  //     },
  //     (error) => {
  //       // Handle login error
  //       console.error('Login error:', error);
  //     }
  //   );
  // }

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.snackBar.open('Login successful', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login error:', error);
      }
    );}

  resetPassword() {
    // Implement logic to send a reset password email with the new password
    console.log('Reset password requested for email:', this.resetCredentials.email);
    console.log('New password:', this.resetCredentials.newPassword);

    // Show snackbar or any confirmation message
    this.snackBar.open('Password reset request sent', 'Close', { duration: 3000 });

    // You can navigate to another page if needed
    // this.router.navigate(['/dashboard']);
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
