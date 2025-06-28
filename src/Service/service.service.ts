import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  getUserProfile(): Promise<{ name: string; age: number }> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ name: 'Alice', age: 25 });
    }, 4000);
  });
}

}
