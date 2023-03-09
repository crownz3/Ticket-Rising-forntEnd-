import { HttpHeaders, HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class UserService{
    private data = new Subject<string>();
    arr:any = []
    http:any;
    baseUrl=environment.serverBaseUrl;
    headers= new HttpHeaders().set('Content-Type' , 'application/json');

    

    constructor(@Inject(HttpClient) http:any, public router: Router ) {
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