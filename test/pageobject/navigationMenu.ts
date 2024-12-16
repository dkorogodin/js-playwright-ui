import {Locator, Page} from '@playwright/test'
import {BasePageObject} from '../pageobject/basePageObject'

export class NavigationMenu extends BasePageObject {

    private readonly formLayoutsMenuItem: Locator
    private readonly toastrMenuItem: Locator
    private readonly tooltipMenuItem: Locator
    private readonly smartTableMenuItem: Locator
    private readonly datepickerMenuItem: Locator

    constructor(page: Page) {
        super(page)
        this.formLayoutsMenuItem = this.page.getByText("Form Layouts")
        this.toastrMenuItem = this.page.getByText("Toastr")
        this.tooltipMenuItem = this.page.getByText("Tooltip")
        this.smartTableMenuItem = this.page.getByText("Smart Table")
        this.datepickerMenuItem = this.page.getByText("Datepicker")
    }
    
    async gotoFormLayoutsPage() {
        await this.selectGroupMenuItem("Forms")
        await this.formLayoutsMenuItem.click()
    }

    async gotoToastrPage() {
        await this.page.getByText("Modal & Overlays").click()
        await this.toastrMenuItem.click()
    }

    async gotoTooltipPage() {
        await this.selectGroupMenuItem("Modal & Overlays")
        await this.tooltipMenuItem.click()
    }

    async gotoSmartTablePage() {
        await this.selectGroupMenuItem("Tables & Data")
        await this.smartTableMenuItem.click()
    }

    async gotoDatepickerPage() {
        await this.selectGroupMenuItem("Forms")
        await this.datepickerMenuItem.click()
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        let groupMenuItem = this.page.getByTitle(groupItemTitle)
        let menuItemExpandedStatus = await groupMenuItem.getAttribute('aria-expanded')
        if (menuItemExpandedStatus == "false") {
            await groupMenuItem.click()
        }

    }

}