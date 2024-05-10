import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private userCache = new Map<string, Observable<any>>();
  private repoCache = new Map<string, Observable<any>>();

  constructor(private httpClient: HttpClient) { }

  getUser(githubUsername: string): Observable<any> {
    if (!this.userCache.has(githubUsername)) {
      this.userCache.set(githubUsername, this.httpClient.get(`https://api.github.com/users/${githubUsername}`).pipe(
        shareReplay(1) // Cache the result and replay it to subsequent subscribers
      ));
    }
    return this.userCache.get(githubUsername)!;
  }

  getRepos(githubUsername: string, page: number = 1, perPage: number = 10): Observable<any> {
    const cacheKey = `${githubUsername}-${page}-${perPage}`;
    if (!this.repoCache.has(cacheKey)) {
      this.repoCache.set(cacheKey, this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${perPage}`).pipe(
        shareReplay(1) // Cache the result and replay it to subsequent subscribers
      ));
    }
    return this.repoCache.get(cacheKey)!;
  }
}
