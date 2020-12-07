import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/auth.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';

declare var $;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  signupForm: FormGroup;
  isSubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.signupForm = this._fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  onSignup(form) {
    this.isSubmitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService
      .createUser(form.value.email, form.value.password)
      .subscribe(
        (user: any) => {
          console.log('user created =', user);
          if (user.status === true) {
            this.toastr.success('User created successfully!', 'Signup!');
            setTimeout(() => {
              $('#signup-modal').modal('hide');
              // $('#signup-modal').modal({ show: false });

              // $('#login-modal').modal('show');

              $('#login-modal').modal({ show: true });
              this.router.navigate(['/admin/login']);
            }, 2000);
          }
        },
        (err) => {
          if (err) {
            this.toastr.error('User already exists!!');
          }
          console.log('error in create product', err);
        }
      );
  }
}
