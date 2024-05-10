import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ComponentFixture } from '@angular/core/testing';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { ApiService } from './services/api.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NavbarComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [ApiService]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'fyle-frontend-challenge'`, () => {
    expect(component.title).toEqual('fyle-frontend-challenge');
  });

  it('should set user data when onSearchUser is called', () => {
    const userData = { login: 'testuser', public_repos: 10 };
    spyOn(apiService, 'getUser').and.returnValue(of(userData));
    spyOn(apiService, 'getRepos').and.returnValue(of([]));
    
    component.onSearchUser('testuser');

    expect(component.userData).toEqual(userData);
    expect(apiService.getUser).toHaveBeenCalledWith('testuser');
    expect(apiService.getRepos).toHaveBeenCalledWith('testuser', 1, 10);
  });

  it('should set user repositories when setPage is called', () => {
    const userData = { login: 'testuser', public_repos: 10 };
    const userRepos = [{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' }];
    spyOn(apiService, 'getUser').and.returnValue(of(userData));
    spyOn(apiService, 'getRepos').and.returnValue(of(userRepos));
    
    component.userData = userData;
    component.setPage(2);

    expect(component.userRepos).toEqual(userRepos);
    expect(apiService.getRepos).toHaveBeenCalledWith('testuser', 2, 10);
  });
});
