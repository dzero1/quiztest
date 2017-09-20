import { ViewPage } from './app.po';

describe('view App', () => {
  let page: ViewPage;

  beforeEach(() => {
    page = new ViewPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
