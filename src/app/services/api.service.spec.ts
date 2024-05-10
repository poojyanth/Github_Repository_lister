import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data from GitHub API', () => {
    const mockUserData = {
      login: 'testuser',
      id: 123,
      avatar_url: 'https://example.com/avatar.jpg',
      html_url: 'https://example.com/user/testuser',
      bio: 'Test bio',
      location: 'Test location',
      twitter_username: 'testuser_twitter'
    };

    const username = 'testuser';

    service.getUser(username).subscribe(userData => {
      expect(userData).toEqual(mockUserData);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });

  it('should return repositories data from GitHub API', () => {
    const mockRepoData = [
      { id: 1, name: 'repo1', full_name: 'testuser/repo1', description: 'Test repo 1' },
      { id: 2, name: 'repo2', full_name: 'testuser/repo2', description: 'Test repo 2' }
    ];

    const username = 'testuser';
    const page = 1;
    const perPage = 10;

    service.getRepos(username, page, perPage).subscribe(repoData => {
      expect(repoData).toEqual(mockRepoData);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRepoData);
  });
});
