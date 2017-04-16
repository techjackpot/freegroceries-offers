import { FreegroceriesOffersPage } from './app.po';

describe('freegroceries-offers App', () => {
  let page: FreegroceriesOffersPage;

  beforeEach(() => {
    page = new FreegroceriesOffersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
