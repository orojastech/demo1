import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService,
    private readonly appRepository: AppRepository,
) {}
  getHello(): string {
    return 'Bienvenido demo!';
  }
  createAlbum(): any {
    return {"message": "Registrado correctamente!"};
  }
  getProduct(code): any {
    return {code:code, name: "TV LG 55", price: 150.00, stock: 20};
  }
  async getAlbumsByUser(userId): Promise<Array<any>> {
    const repoAlbum = await this.appRepository.getAlbums()
    const searchUser = repoAlbum.filter(x => x.userId == userId)
    return searchUser;
  }
  async getAllAlbums() {
    const urlAlbums = await this.appRepository.getAlbums()
    return urlAlbums;
  }
}


