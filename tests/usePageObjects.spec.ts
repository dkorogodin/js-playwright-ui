import {test, expect} from '@playwright/test'
import { delay } from 'rxjs-compat/operator/delay'
import { AppManager } from '../test/appManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async ({page}) => {
    await page.goto("/")
})

test('test navigation menu', async ({page}) => {
    let navigatioMenu = new AppManager(page).getNavigationMenu()
    await navigatioMenu.gotoFormLayoutsPage()
    await navigatioMenu.gotoDatepickerPage()
    await navigatioMenu.gotoSmartTablePage()
    await navigatioMenu.gotoToastrPage()
    await navigatioMenu.gotoTooltipPage()
})

test('parameterized methods', async ({page}) => {
    let randomFullName = faker.person.fullName()
    let randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
    
    let appManager = new AppManager(page)
    await appManager.getNavigationMenu().gotoFormLayoutsPage()

    await appManager.getFormLayoutsPage().signinFromUsingTheGridForm(randomEmail, 'test123', 'Option 2')
    await appManager.getFormLayoutsPage().submitFromInlineForm(randomFullName, randomEmail, false)

})

test('datepicker', async ({page}) => {
    let appManager = new AppManager(page)
    await appManager.getNavigationMenu().gotoDatepickerPage()

    await appManager.getDatepickerPage().selectCommonDatepickerDateFromToday(99)
    await appManager.getDatepickerPage().selectDatepickerWithRangeDateFromToday(10, 20)

})
