import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IosInstallBannerComponent } from './ios-install-banner.component';

describe('IosInstallBannerComponent', () => {
  let component: IosInstallBannerComponent;
  let fixture: ComponentFixture<IosInstallBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IosInstallBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IosInstallBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
