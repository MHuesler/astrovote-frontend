import { environment } from './../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BackendService {


  baseUrl = environment.apiBaseUrl
  posts: Subject<any> = new Subject<any>()

  constructor(private http: HttpClient) {}

  createPost(post: { ticker: string, analysis: string }): Observable<null> {
    return this.http.post<null>(`${this.baseUrl}/posts`, post)
  }

  getPosts(sort: string = ""): void {
    this.http.get(`${this.baseUrl}/posts`, { params: sort != "" ? { sort } : {} }).subscribe(res => this.posts.next(res))
  }

  searchPosts(query: string, sort: string = ""): void {
    this.http.get(`${this.baseUrl}/posts/search?q=${query}`, { params: sort != "" ? { sort } : {} }).subscribe(res => this.posts.next(res))
  }

  createVote(postFK: string, rating: number): Observable<null> {
    return this.http.post<null>(`${this.baseUrl}/votes`, { postFK, rating })
  }

  updateVote(postFK: string, rating: number): Observable<null> {
    return this.http.put<null>(`${this.baseUrl}/votes/${ postFK }`, { rating })
  }

  deleteVote(postFK: string): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/votes/${ postFK }`)
  }

  getUser(id: string | null): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${id}`)
  }
}
