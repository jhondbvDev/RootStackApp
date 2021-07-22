import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IJob, IJobs } from 'src/app/_models/job.interface';
import { IResponse } from 'src/app/_models/response.interface';
import { JobService } from 'src/app/_services/job.service';


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport | undefined;
  
  // Properties
  response: IResponse | undefined;
  lat = 0;
  lng = 0;
  myLattitude=0;
  myLongitude=0;
  zoom = 0;
  openedWindow: number | null = 0;
  selectedItem=0;

  constructor(private jobService: JobService
    ,private _cdr: ChangeDetectorRef) {
    //call API 
    this.loadJobs(undefined);
  }

  ngOnInit(): void {
    this.getCurrentPosition();
  }

  //Get current position 
  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.myLattitude = position.coords.latitude;
      this.myLongitude = position.coords.longitude;
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    }
    )
  }
  openWindow(data: IJob) {
    this.lat = Number(data.latitude);
    this.lng = Number(data.longitude);
    this.zoom = 5;
    setTimeout(() => {
      this.openedWindow = data.id;
    }, 100);
  }

  closeWindow() {
    this.openedWindow = null;
    this.selectedItem =0;
  }

  isInfoWindowOpen(id: number) {
    return this.openedWindow == id;
  }

  onCovenrtNumber(num: string): number {
    return Number(num);
  }

  //get images from job 
  onGetIcon(jobs: IJobs): void {
    jobs.forEach(element => {
      element.icon = ({ url: element.image, scaledSize: { width: 30, height: 30 } });
    });
  }

  //Get jobs from API 
  loadJobs(url: string | undefined): void {

    this.jobService.getJobs(url)
      .subscribe(
        d => {

          this.response = d;
          this.onGetIcon(this.response?.data!);
        },
        err => {
          console.log(err);
        }
      )
  }

  //Pagination
  onPageChange($event: { pageIndex: number; pageSize: number; }) {
    let indexP = $event.pageIndex + 1;
    let urlPage = this.response?.links.find(x => x.label == indexP.toString())?.url;
    this.loadJobs(urlPage);
  }

  onPingMap(job:IJob):void{
    setTimeout(() => {
      this.selectedItem = job.id;
      this._cdr.detectChanges();
    }, 100);
    let index = this.response?.data.findIndex(x=>x.id==job.id);
    this.virtualScroll?.scrollToIndex(index!*180);
    console.log(`index ${index}`);
  }

}
