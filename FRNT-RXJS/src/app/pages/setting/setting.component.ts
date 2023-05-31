import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObservableExampleService } from '../../services/testing/testing.service';
import { Subject, takeUntil } from 'rxjs';
import { SettingService } from '../../services/setting/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {
  private subjectForUnsubscribe = new Subject();

  constructor(private testing: ObservableExampleService,
              private settingService: SettingService) {
  }

  ngOnInit(): void {
    this.settingService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
    });

    this.settingService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
      (data) => {
      })
  }

  ngOnDestroy() {
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }
}
