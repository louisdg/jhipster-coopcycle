import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CooperativeComponentsPage, CooperativeDeleteDialog, CooperativeUpdatePage } from './cooperative.page-object';

const expect = chai.expect;

describe('Cooperative e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cooperativeComponentsPage: CooperativeComponentsPage;
  let cooperativeUpdatePage: CooperativeUpdatePage;
  let cooperativeDeleteDialog: CooperativeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Cooperatives', async () => {
    await navBarPage.goToEntity('cooperative');
    cooperativeComponentsPage = new CooperativeComponentsPage();
    await browser.wait(ec.visibilityOf(cooperativeComponentsPage.title), 5000);
    expect(await cooperativeComponentsPage.getTitle()).to.eq('coopcycleApp.cooperative.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(cooperativeComponentsPage.entities), ec.visibilityOf(cooperativeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Cooperative page', async () => {
    await cooperativeComponentsPage.clickOnCreateButton();
    cooperativeUpdatePage = new CooperativeUpdatePage();
    expect(await cooperativeUpdatePage.getPageTitle()).to.eq('coopcycleApp.cooperative.home.createOrEditLabel');
    await cooperativeUpdatePage.cancel();
  });

  it('should create and save Cooperatives', async () => {
    const nbButtonsBeforeCreate = await cooperativeComponentsPage.countDeleteButtons();

    await cooperativeComponentsPage.clickOnCreateButton();

    await promise.all([
      cooperativeUpdatePage.setCooperativeIdInput('5'),
      cooperativeUpdatePage.setNameInput('name'),
      cooperativeUpdatePage.setAreaInput('area')
      // cooperativeUpdatePage.restaurantSelectLastOption(),
    ]);

    expect(await cooperativeUpdatePage.getCooperativeIdInput()).to.eq('5', 'Expected cooperativeId value to be equals to 5');
    expect(await cooperativeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await cooperativeUpdatePage.getAreaInput()).to.eq('area', 'Expected Area value to be equals to area');

    await cooperativeUpdatePage.save();
    expect(await cooperativeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cooperativeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Cooperative', async () => {
    const nbButtonsBeforeDelete = await cooperativeComponentsPage.countDeleteButtons();
    await cooperativeComponentsPage.clickOnLastDeleteButton();

    cooperativeDeleteDialog = new CooperativeDeleteDialog();
    expect(await cooperativeDeleteDialog.getDialogTitle()).to.eq('coopcycleApp.cooperative.delete.question');
    await cooperativeDeleteDialog.clickOnConfirmButton();

    expect(await cooperativeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
