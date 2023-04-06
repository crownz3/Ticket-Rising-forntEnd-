import { HttpHeaders, HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { GoogleSigninService } from "./google-signin.service";

@Injectable()
export class UserService{
    baseUrl = environment.serverBaseUrl
    loginUserName = ''
    private data = new Subject<string>();
    arr:any = []
    http:any;
    headers= new HttpHeaders().set('Content-Type' , 'application/json');

    

    constructor(@Inject(HttpClient) http:any, public router: Router,private googleApi:GoogleSigninService ) {
        this.http=http;
    };


  setData(id:string,data:any) {
    // this.data.next(data);
    // console.log(data)

    this.arr.push({key:id,value:data})
    console.log(this.arr)
    
  }

  getData(name:string) {
    let val =  this.arr.filter((el:any)=>{
        return el.key === name

    })
    console.log(val)
    return val[0].value
  }
  
}