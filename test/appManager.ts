import {Page} from '@playwright/test'
import { NavigationMenu } from './pageobject/navigationMenu'
import { FormLayoutsPage } from './pageobject/formLayoutsPage'
import { DatepickerPage } from './pageobject/datepickerPage'

export class AppManager {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    getNavigationMenu(){
        return new NavigationMenu(this.page)
    }
 
    getFormLayoutsPage(){
        return new FormLayoutsPage(this.page)
    }

    getDatepickerPage(){
        return new DatepickerPage(this.page)
    }

}