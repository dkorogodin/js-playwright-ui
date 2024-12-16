import {expect, Locator, Page} from '@playwright/test'
import {BasePageObject} from '../pageobject/basePageObject'

export class DatepickerPage extends BasePageObject {

    private readonly commonDatepickerInputFld: Locator
    private readonly datepickerWithRangeInputFld: Locator
    private readonly calendarMonthAndYear: Locator
    private readonly calendarNextMonthBtn: Locator
    private readonly calendarDay: Locator

    constructor(page: Page) {
        super(page)
        this.commonDatepickerInputFld = this.page.getByPlaceholder('Form Picker')
        this.datepickerWithRangeInputFld = this.page.getByPlaceholder('Range Picker')
        this.calendarMonthAndYear = this.page.locator('nb-calendar-view-mode')
        this.calendarNextMonthBtn = this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        this.calendarDay = this.page.locator('.day-cell.ng-star-inserted')
    }

    /**
     * This method select a date from Common Datepicker section
     * @param numberOfDaysFromToday - should be number of days from today
     */
    async selectCommonDatepickerDateFromToday(numberOfDaysFromToday: number) {
        await this.commonDatepickerInputFld.click()
        let expectedDate = await this.selectDateInCalendar(numberOfDaysFromToday)
        await expect(this.commonDatepickerInputFld).toHaveValue(expectedDate)    
    }

    /**
     * This method select a date from Common Datepicker section
     * @param startDayFromToday - should be number of days from today for start date
     * @param endDayFromToday - should be number of days from today for end date
     */
    async selectDatepickerWithRangeDateFromToday(startDayFromToday: number, endDayFromToday: number) {
        await this.datepickerWithRangeInputFld.click()
        let expectedStartDate = await this.selectDateInCalendar(startDayFromToday)
        let expectedEndDate = await this.selectDateInCalendar(endDayFromToday)
        let expectedDate = `${expectedStartDate} - ${expectedEndDate}`
        await expect(this.datepickerWithRangeInputFld).toHaveValue(expectedDate)    
    }

    private async selectDateInCalendar(numberOfDaysFromToday: number) {
        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        let expectedDay = date.getDate().toString();
        let expectedMonthShort = date.toLocaleString('En-US', {month: 'short'});
        let expectedMonthLong = date.toLocaleString('En-US', {month: 'long'});    
        let expectedYear = date.getFullYear();
    
        let expectedDate = `${expectedMonthShort} ${expectedDay}, ${expectedYear}`
    
        let calendarMonthAndYear = await this.calendarMonthAndYear.textContent()
        let expectedCalendarMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
        while(! calendarMonthAndYear.includes(expectedCalendarMonthAndYear)) {
            await this.calendarNextMonthBtn.click()
            calendarMonthAndYear = await this.calendarMonthAndYear.textContent()
        }
        await this.calendarDay.getByText(expectedDay, {exact: true}).click()
        return expectedDate
    }

}