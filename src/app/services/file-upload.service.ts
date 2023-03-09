import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class fileUpload{
    constructor(private http:HttpClient){}

    submitForm(formdata:FormData){
        return this.http.post('./api/fileupload',formdata)
    }
}