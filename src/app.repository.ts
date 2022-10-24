import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class AppRepository {
  constructor(private readonly httpService: HttpService) {}
  getHello(): string {
    return 'Bienvenido demo!';
  }
  getProduct(code): any {
    return {code:code, name: "TV LG 55", price: 150.00, stock: 20};
  }
  async getAlbums(): Promise<Array<any>> {
    const urlAlbum = "https://jsonplaceholder.typicode.com/albums";
    const result = await lastValueFrom(this.httpService.get(urlAlbum));
    return result.data;
  }
  async getToken(): Promise<string> {
    const urlAlbum = "https://jsonplaceholder.typicode.com/albums";
    const result = await lastValueFrom(this.httpService.get(urlAlbum));
    // obtener de result el token ....
    return "token-prueba-123456";
  }
  async createPINok(tokenok:any): Promise<AxiosResponse<any>> {
    // Usar tokenok para consumir api okn
    const urlAlbum = "https://jsonplaceholder.typicode.com/albums";
    const result = await lastValueFrom(this.httpService.get(urlAlbum));
    return result.data;
  }
}
