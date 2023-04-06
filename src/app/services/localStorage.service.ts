import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
    providedIn: 'root'
})

export class localStorage{
    storage:any=[]
    constructor(){}


    setLocal(key:any,value:any){
        let obj:any = {key :key,value:value}
        
        this.storage.push(obj)
    }

    getLocal(key:any){
        let data
        this.storage.forEach((row:any) => {
            if(row.key == key){
                data = row.value
            }
        });
        return data
    }

   
}