import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { JsontodoComponent } from './jsontodo/jsontodo.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';

export const routes: Routes = [
    {path:'',component:AppComponent},
    {path:'login' ,component:LoginComponent},
    {path:'json',component:JsontodoComponent},
    {path:'success',component:SuccessDialogComponent},
    
];
