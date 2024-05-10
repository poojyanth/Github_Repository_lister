import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userData: any;
  userRepos: any;
  page = 1;
  perPage = 10;
  totalPages = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const path = window.location.pathname.split('/');
    if (path.length > 1) {
      this.onSearchUser(path[1]);
    }
  }

  onSearchUser(username: string) {
    // Fetch user data based on the entered username from the navbar
    this.apiService.getUser(username).subscribe(data => {
      this.userData = data;
      // set the website address to /username
      window.history.pushState({}, '', `/${this.userData.login}`);
      this.totalPages = Math.ceil(this.userData.public_repos / this.perPage);
      this.apiService.getRepos(username,this.page,this.perPage).subscribe(repos => {
        this.userRepos = repos;
      });
    }
    );
  }

  setPage(page: number) {
    this.page = page;
    this.apiService.getRepos(this.userData.login,this.page,this.perPage).subscribe(repos => {
      this.userRepos = repos;      
    });
  }

  setPerPage(perPage: number) {
    this.perPage = perPage;
    this.apiService.getRepos(this.userData.login,this.page,this.perPage).subscribe(repos => {
      this.userRepos = repos;
      this.totalPages = Math.ceil(this.userData.public_repos / this.perPage);
    });
  }

  openGitRepo(url: string) {
    window.open(url, "_blank");
  }
}
