import { DecimalPipe } from "@angular/common";

export interface IJob{
    id:number;
    title:string;
    description:string;
    latitude:string;
    longitude:string;
    image:string;
    date:Date;
    status:string;
    assigned_to:string;
    created_at:string;
    updated_at:string;
    icon:any;
}

export interface IJobs extends Array<IJob>{
    id:number;
    title:string;
    description:string;
    latitude:string;
    longitude:string;
    image:string;
    date:Date;
    status:string;
    assigned_to:string;
    created_at:string;
    updated_at:string;
}


