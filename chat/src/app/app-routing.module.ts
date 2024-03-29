import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { NologinGuard } from "./guards/nologin.guard";

const routes: Routes = [
  { path: '', redirectTo: 'login',  pathMatch: 'full'},
  { path: 'home', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate : [AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate : [NologinGuard] },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule', canActivate : [NologinGuard] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
