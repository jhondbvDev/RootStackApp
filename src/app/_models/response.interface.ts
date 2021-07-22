import {  IJobs } from "./job.interface";

export interface IResponse{
    current_page:number;
    data:IJobs;
    next_page_url:string;
    path:string;
    per_page:number;
    prev_page_url:string;
    to:number;
    total:number;
    links:ILinks;
    
}

export interface ILink{
    url:string;
    label:string;
    active:boolean;
}

export interface ILinks extends Array<ILink>{
    url:string;
    label:string;
    active:boolean;
}