
import { TranslateModule } from '@ngx-translate/core'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { UserService } from '../Services/user.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatDividerModule } from '@angular/material/divider'
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { FeedbackDetailsComponent } from './feedback-details.component'

describe('FeedbackDetailsComponent', () => {
  let component: FeedbackDetailsComponent
  let fixture: ComponentFixture<FeedbackDetailsComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        MatDividerModule,
        MatDialogModule
      ],
      declarations: [FeedbackDetailsComponent],
      providers: [
        UserService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { productData: {} } }
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
