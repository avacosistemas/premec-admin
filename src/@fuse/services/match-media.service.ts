import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class FuseMatchMediaService
{
    activeMediaQuery: string;
    onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(private observableMedia: MediaObserver)
    {
        this.activeMediaQuery = '';

        this.observableMedia.asObservable()
            .pipe(
                filter((changes: MediaChange[]) => changes.length > 0),
                map((changes: MediaChange[]) => changes[0])
            ).subscribe((change: MediaChange) => {
                if ( this.activeMediaQuery !== change.mqAlias )
                {
                    this.activeMediaQuery = change.mqAlias;
                    this.onMediaChange.next(change.mqAlias);
                }
            });
    }
}
