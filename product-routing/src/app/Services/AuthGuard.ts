import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./Auth";

@Injectable()
export class AuthGuard implements CanActivate , CanActivateChild, CanLoad{

    constructor(private authService:AuthService, private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | Promise<boolean> | Observable<boolean> {
        
        return this.authService.authenticated().then((authstatus:boolean)=>{
            if(authstatus){
                return true
            }else{
                this.router.navigate(['/'])
                return false
            }
        })
    }

    canLoad(route: Route, segments: UrlSegment[])   : boolean | Promise<boolean> | Observable<boolean> {
        return this.authService.authenticated().then((authstatus:boolean)=>{
            if(authstatus){
                return true
            }else{
                this.router.navigate(['/'])
                return false
            }
        })
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | Promise<boolean> | Observable<boolean> {
         return this.canActivate(childRoute,state)
    }
}