

export class AuthService{
 loggedIn:boolean=false;


authenticated(){
    const promise= new Promise<boolean>((resolve,reject)=>{
        setTimeout(()=>{
            resolve(this.loggedIn)
        })
    })
    return promise
}

 login(){
     this.loggedIn=true
 }
 logout(){
     this.loggedIn=false
 }
}