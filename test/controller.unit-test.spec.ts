import { AppService } from '../src/app.service';
import { AppController } from '../src/app.controller';
import { HttpService } from '@nestjs/axios';
import { AppRepository } from '../src/app.repository';

describe('Controller', () => {
  test('Get Product Controller', () => {
    let appService = new AppService(new HttpService(), new AppRepository(new HttpService()));
    let appController = new AppController(appService);
    const productExpect = {code:200, name: "TV LG 55", price: 150.00, stock: 20}
    const productMock = {code:200, name: "TV LG 55", price: 150.00, stock: 20}
    jest.spyOn(appService, 'getProduct').mockImplementation(() => productMock);

    expect(appController.getProduct(100)).toMatchObject(productExpect);
  });
})