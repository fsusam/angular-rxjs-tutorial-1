import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { from, fromEvent, interval, Observable, of } from 'rxjs';
import { count, debounceTime, distinct, elementAt, filter, first, last, max, min, skip, take, takeLast, takeWhile } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs-learning',
  templateUrl: './rxjs-learning.component.html',
  styleUrls: ['./rxjs-learning.component.css']
})
export class RxjsLearningComponent implements OnInit {
  agents: Observable<string>;
  agentName: string

  studentList = ['Fethi', 'Gulay', 'Susam', 'Gulay'];
  students: Observable<string[]> = of(this.studentList)

  stundentObj = {
    id: 1,
    name: 'Fethi'
  }

  studentObjs$: Observable<any> = of(this.stundentObj)
  
  orderArr = ['Fashion', 'Household', 'Electronic', 'Mobile', 'Household']
  orders$: Observable<string> = from(this.orderArr)
  orderName: string;

  ranks: number[] = [3,5,1,6,2,10];
  rank$: Observable<number> = from(this.ranks);

  @ViewChild('validate')
  validate: ElementRef;


  searchForm: FormGroup;   

  constructor() { }

  ngOnInit(): void {
    

    /*
    // Episode 3 , create observable

    this.agents = new Observable(
      function(observer){
        try {
          observer.next("Fethi")
          setInterval(() => {
            observer.next("Susam")
          }, 3000)
          
          setInterval(() => {
            observer.next("Gulay")
          }, 6000)

          

        } catch (e) {
          observer.error(e)
        }
      }
    );

    this.agents.subscribe(data => this.agentName = data);
    */
    
    /* of Operator 
    this.students.subscribe(data => {
      console.log(data)
    })

    this.studentObjs$.subscribe(data => {
      console.log(data)
    })
    */
   /* from operator
    this.orders$.subscribe(data => {
      console.log(data);
      setInterval(() => {
        this.orderName = data;
      }, 3000)
      
    })
    */

    /* interval 
    this.orders$.subscribe(data => {      
      
      const seqNum$ = interval(2000);

      seqNum$.subscribe(num=> {
        if(num<5){
          console.log(data + num);
        }        
      })

    })
    */

    this.searchForm = new FormGroup({
      name: new FormControl('start search')
    })

    // this.searchForm.get('name').valueChanges.subscribe(data => {
    //   console.log(data)
    // })

    /* debounceTime and take, takeWhile */
    this.searchForm.get('name').valueChanges.pipe(
      //take(2), // take only 2 values
      //takeWhile((v) => this.checkCondtion(v)), // take values till condition gets true.
      //takeLast(2),
      //debounceTime(3000) // time lag before it emits next value
      filter(v => this.checkCondtion(v))
    ).subscribe(data => {
      console.log(data)
    })

    /* takeLast */
    //this.orders$.pipe(takeLast(2)).subscribe(observer => console.log(observer));

    /* first */
    //this.orders$.pipe(first()).subscribe(observer=> console.log(observer));
    /* last */
    //this.orders$.pipe(last()).subscribe(observer=> console.log(observer));
    /* elementAt */
    //this.orders$.pipe(elementAt(0)).subscribe(observer=> console.log(observer));
    /* distinct */
    //this.orders$.pipe(distinct()).subscribe(observer=> console.log(observer));
    /* skip */
    //this.orders$.pipe(skip(2)).subscribe(observer=> console.log(observer));
    /* count */
    //this.orders$.pipe(count()).subscribe(observer=> console.log(observer));
    /* max */
    this.rank$.pipe(max()).subscribe(observer => console.log(observer));
    /* min */
    this.rank$.pipe(min()).subscribe(observer => console.log(observer));
  }

  rxJsEventObservable() {
    const btnObservable$ = fromEvent(this.validate?.nativeElement, 'click');

    btnObservable$.subscribe(data => {
      console.log(data);
    })    
  }

  readValue() {

  }

  checkCondtion(value: string): boolean{
    return value.length > 5 ? false : true
  }
}
