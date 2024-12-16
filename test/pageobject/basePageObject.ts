import {expect, Locator, Page} from '@playwright/test'

export class BasePageObject {
    
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

}
