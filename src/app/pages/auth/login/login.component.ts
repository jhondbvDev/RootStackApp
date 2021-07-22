import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/_models/user.interface';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private isValidEmail=/\S+@\S+\.\S+/;

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required,Validators.pattern(this.isValidEmail)]),
    password: new FormControl('', [Validators.required,Validators.minLength(5)])
  })


  isLoginFailed: boolean = false;
  errorMessage: string = '';
  constructor(private authService: AuthService
    , private router: Router
    , private tokenStorage: TokenStorageService
    , private fb: FormBuilder) {

  }


  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['job']);
    }
  }

  onLogin(form: IUser): void {

    this.authService.getAuth(form).subscribe(
      d => {
        this.tokenStorage.saveToken(d.access_token);
        this.authService.setUserInfo();
        this.isLoginFailed = false;
        this.router.navigate(['job']);
      },
      err => {
        this.isLoginFailed = true;
        this.errorMessage="user or password invalid";
      })
  }

  onLogOut(): void {
    this.authService.logout();

  }

  getErrorMessage(field:string):string{
    let message:string ='';
    if(this.loginForm.get(field)?.errors?.required){
      message='You must enter a value ';
    }else if(this.loginForm.get(field)?.hasError('pattern')){
      message='Not a valid email';

    }else if ((this.loginForm.get(field)?.hasError('minlength')))
    {
      const minlength = this.loginForm.get(field)?.errors?.minlength.required;
      message=`this field must be longer than ${minlength} characters `;

    }
    return message;
  }
  isValidField(field:string):boolean{

    return (this.loginForm.get(field)?.touched 
    || this.loginForm.get(field)?.dirty 
    && !this.loginForm.get(field)?.valid)!;
   
  }

  reloadPage(): void {
    window.location.reload();
  }

}
