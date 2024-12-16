import {test, expect} from '@playwright/test'
import { delay } from 'rxjs-compat/operator/delay'
import { NavigationMenu } from '../test/pageobject/navigationMenu'

test.beforeEach(async ({page}) => {
    await page.goto("/")
})

test.describe('Form Layout page', () => {
    test.beforeEach(async ({page}) => {
        const navigatioMenu = new NavigationMenu(page)
        await navigatioMenu.gotoFormLayoutsPage()
    })

    test('input fields', async ({page}) => {
        const usingTheGridSection = page.locator("nb-card").filter({hasText: 'Using the Grid'});
        const usingTheGridEmailFld = usingTheGridSection.getByRole('textbox', {name: 'Email'});

        await usingTheGridEmailFld.fill('email123@email.com');
        await usingTheGridEmailFld.clear();
        await usingTheGridEmailFld.pressSequentially('email1234@email.com', {delay: 100});

        // generic assertion
        const usingTheGridEmailFldValue = await usingTheGridEmailFld.inputValue();
        expect(usingTheGridEmailFldValue).toEqual('email1234@email.com');

        // location assertion
        await expect(usingTheGridEmailFld).toHaveValue('email1234@email.com');
    })
    
    test('radio buttons', async ({page}) => {
        const usingTheGridSection = page.locator("nb-card").filter({hasText: 'Using the Grid'});

        await usingTheGridSection.getByLabel('Option 1').check({force: true});
        await usingTheGridSection.getByRole('radio', {name: 'Option 2'}).check({force: true});

        // generic assertion
        const option2RadioButtonStatus = await usingTheGridSection.getByRole('radio', {name: 'Option 2'}).isChecked();
        const option1RadioButtonStatus = await usingTheGridSection.getByRole('radio', {name: 'Option 1'}).isChecked();

        expect(option2RadioButtonStatus).toEqual(true);
        // or
        expect(option2RadioButtonStatus).toBeTruthy();

        // location assertion
        await expect(usingTheGridSection.getByRole('radio', {name: 'Option 2'})).toBeChecked();
        expect(option1RadioButtonStatus).toBeFalsy();

    })

})


test.describe('Modal & Overlays page', () => {
    test.beforeEach(async ({page}) => {
        const navigatioMenu = new NavigationMenu(page)
        await navigatioMenu.gotoToastrPage()
    })

    test('checkboxes', async ({page}) => {
        // always click on checkbox, no matter if it's checked or unchecked
        await page.getByRole('checkbox', {name: 'Hide on click'}).click({force: true});

        // firstly check status of checkbox, and if it's unchecked then check the box
        await page.getByRole('checkbox', {name: 'Hide on click'}).check({force: true});
        await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true});

        // firstly check status of checkbox, and if it's checked then uncheck the box
        await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true});
        await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).uncheck({force: true});

        // check/ uncheck all checkboxes on the page
        const allCheckboxes = await page.getByRole('checkbox').all();

        // check all checkboxes on the page
        for(const box of allCheckboxes) {
            await box.check({force: true});
            expect(await box.isChecked()).toBeTruthy();
        }

        // uncheck all checkboxes on the page
        for(const box of allCheckboxes) {
            await box.uncheck({force: true});
            expect(await box.isChecked()).toBeFalsy();
        }
        
    })

})


test('lists and dropdowns', async ({page}) => {
    // Expand menu
    const dropDownMenu = page.locator('ngx-header nb-select');
    await dropDownMenu.click()


    const optionList = page.locator('nb-option-list nb-option')
    expect(await optionList.allTextContents()).toEqual([" Light", " Dark", " Cosmic", " Corporate"]);
    // or
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
    await optionList.filter({hasText: 'Cosmic'}).click()

    // verify if background color was changed
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')


    // verify all background colors
    const colors = {
        "Light": "rgb(255, 255, 255)", 
        "Dark": "rgb(34, 43, 69)", 
        "Cosmic": "rgb(50, 50, 89)", 
        "Corporate": "rgb(255, 255, 255)"
    }

    for(const color in colors){
        await dropDownMenu.click();
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
    }

    
})


test('tooltips', async ({page}) => {
    const navigatioMenu = new NavigationMenu(page)
    await navigatioMenu.gotoTooltipPage()

    const tooltipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    // hover over the text on button
    await tooltipCard.getByRole('button', {name: 'Top'}).hover()

    const tooltip = await page.locator('nb-tooltip').textContent();
    expect(tooltip).toEqual('This is a tooltip');
})


test('dialog boxes', async ({page}) => {
    const navigatioMenu = new NavigationMenu(page)
    await navigatioMenu.gotoSmartTablePage()

    // accept and validate browser dialog box, before calling it you need to call page.on dialog listener
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click();
    // validate row deleted
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')

})


test('web tables', async ({page}) => {
    const navigatioMenu = new NavigationMenu(page)
    await navigatioMenu.gotoSmartTablePage()

    // Get the row by any text in this row
    var tableRow = page.getByRole('row', {name: 'twitter@outlook.com'});
    await tableRow.locator('.nb-edit').click()

    var emailFld = page.locator('input-editor').getByPlaceholder('Age');
    await emailFld.clear()
    await emailFld.fill('35')
    await page.locator('.nb-checkmark').click()

    // Get the row based on the text in the specific colummn
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click();

    var tableRowById = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')});
    await tableRowById.locator('.nb-edit').click()

    emailFld = page.locator('input-editor').getByPlaceholder('E-mail');
    await emailFld.clear()
    await emailFld.fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(tableRowById.locator('td').nth(5)).toHaveText('test@test.com')

    // filter of the table
    const ages = ['20', '30', '40', '200']
    const ageFilterFld = page.locator('input-filter').getByPlaceholder('Age')
    for (let age of ages) {
        await ageFilterFld.clear()
        await ageFilterFld.fill(age)
        await page.waitForTimeout(500)
        const tableRows = page.locator('tbody tr')

        for (let row of await tableRows.all()) {
            const cellValue = await row.locator('td').last().textContent()
            if (age == '200')
                expect(cellValue).toEqual(" No data found ")
            else
                expect(cellValue).toEqual(age)
        }
    }
})

test('datepicker', async ({page}) => {
    const navigatioMenu = new NavigationMenu(page)
    await navigatioMenu.gotoDatepickerPage()

    const calendarFld = page.getByPlaceholder('Form Picker')
    await calendarFld.click()

    const date = new Date();
    date.setDate(date.getDate() + 100);
    const expectedDay = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'});
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'});    
    const expectedYear = date.getFullYear();

    const expectedDate = `${expectedMonthShort} ${expectedDay}, ${expectedYear}`

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    let expectedCalendarMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
    while(! calendarMonthAndYear.includes(expectedCalendarMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDay, {exact: true}).click()
    await expect(calendarFld).toHaveValue(expectedDate)

})

test('sliders', async ({page}) => {
    // 1st approach is to update attributes
    const temeratureGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await temeratureGauge.evaluate(circleElem => {
        circleElem.setAttribute('cx', '232.630')
        circleElem.setAttribute('cy', '232.630')
    })
    await temeratureGauge.click()

    // 2nd approach is to move mouse cursor
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    // creating starting coordinates in the centre of boundingBox
    const box = await tempBox.boundingBox()
    const x = box.x + box.width / 2
    const y = box.y + box.width / 2
    // move cursor to the centre of boundingBox
    await page.mouse.move(x, y)
    // simulate click of left button on the mouse
    await page.mouse.down()
    // move cursor to the right
    await page.mouse.move(x-100, y)
    // move cursor down
    await page.mouse.move(x-100, y+100)
    // simulate releasing of click of left button on the mouse
    await page.mouse.up()

    await expect(tempBox).toContainText('12')


})
