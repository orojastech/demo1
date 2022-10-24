import { AppService } from '../src/app.service';
import { HttpService } from '@nestjs/axios';
import axios from "axios";
import { join } from 'path';
import { readFileSync } from 'fs';
import { AppRepository } from '../src/app.repository';

describe('Service', () => {
  const mockAlbumsAxios = JSON.parse(
    readFileSync(join(__dirname, './mock-data/albums-axios.json'), "utf8")
  )
  const mockAlbumsExpect = JSON.parse(
    readFileSync(join(__dirname, './mock-data/albums-expect.json'), "utf8")
  )
  test('Get demo', () => {
    let appService = new AppService(new HttpService(), new AppRepository(new HttpService()));

    expect(appService.getHello()).toBe('Bienvenido demo!');
  });
  test('Get Product', () => {
    let appService = new AppService(new HttpService(), new AppRepository(new HttpService()));
    const productExpect = {code:200, name: "TV LG 55", price: 150.00, stock: 20}
    const productMock = {code:200, name: "TV LG 55", price: 150.00, stock: 20}
    jest.spyOn(appService, 'getProduct').mockImplementation(() => productMock);

    expect(appService.getProduct(100)).toMatchObject(productExpect);
  });
  test('Get Albums By User Id', async () => {
    const userId = 1
    let appService = new AppService(new HttpService(), new AppRepository(new HttpService()));
    expect(Array.isArray(await appService.getAlbumsByUser(userId))).toBe(true);
  });
  test('Get Albums Mock Axios', async () => {
    const userId = 1
    const httpService = new HttpService()
    let appService = new AppService(new HttpService(), new AppRepository(new HttpService()));
    axios.get = jest.fn().mockResolvedValue({ data:mockAlbumsAxios });
    expect(await appService.getAlbumsByUser(userId)).toMatchObject(mockAlbumsExpect);
  });
  test('Get Albums Mock Axios Repository', async () => {
    const httpService = new HttpService()
    let appService = new AppService(new HttpService(), new AppRepository(new HttpService()));
    let appRepository = new AppRepository(new HttpService());

    jest.spyOn(appRepository, 'getAlbums').mockImplementation(() => mockAlbumsAxios);

    expect(await appService.getAllAlbums()).toMatchObject(mockAlbumsExpect);
  });
})