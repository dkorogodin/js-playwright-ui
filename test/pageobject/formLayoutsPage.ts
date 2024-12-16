import {Locator, Page} from '@playwright/test'
import {BasePageObject} from '../pageobject/basePageObject'

export class FormLayoutsPage extends BasePageObject {

    private readonly inlineFormSection: Locator
    private readonly inlineFormNameFld: Locator
    private readonly inlineFormEmailFld: Locator
    private readonly inlineFormRememberMeCheckbox: Locator
    private readonly inlineFormSubmitBtn: Locator

    private readonly usingTheGridSection: Locator
    private readonly usingTheGridEmailFld: Locator
    private readonly usingTheGridPasswordFld: Locator
    private readonly usingTheGridSignInBtn: Locator

    constructor(page: Page) {
        super(page)
        this.inlineFormSection = this.page.locator("nb-card").filter({hasText: 'Inline form'})
        this.inlineFormNameFld = this.inlineFormSection.getByPlaceholder('Jane Doe')
        this.inlineFormEmailFld = this.inlineFormSection.getByPlaceholder('Email')
        this.inlineFormRememberMeCheckbox = this.inlineFormSection.getByRole('checkbox', {name: 'Remember me'})
        this.inlineFormSubmitBtn = this.inlineFormSection.getByRole('button')

        this.usingTheGridSection = this.page.locator("nb-card").filter({hasText: 'Using the Grid'})
        this.usingTheGridEmailFld = this.usingTheGridSection.getByPlaceholder('Email')
        this.usingTheGridPasswordFld = this.usingTheGridSection.getByPlaceholder('Password')
        this.usingTheGridSignInBtn = this.usingTheGridSection.getByRole('button')
    }
    
    async signinFromUsingTheGridForm(email: string, password: string, option: string) {
        await this.usingTheGridEmailFld.clear()
        await this.usingTheGridEmailFld.fill(email)

        await this.usingTheGridPasswordFld.clear()
        await this.usingTheGridPasswordFld.fill(password)

        let usingTheGridOption = await this.usingTheGridSection.getByRole('radio', {name: option})
        usingTheGridOption.check({force: true})

        await this.usingTheGridSignInBtn.click()

    }

    /**
     * This method fill out the Inline Form with user details
     * @param name - should be the first and last names
     * @param email - should be user email
     * @param hasRememberMe - should be true/ false, depending on if "Remember me" checkbox selected or not
     */
    async submitFromInlineForm(name: string, email: string, hasRememberMe: boolean) {
        await this.inlineFormNameFld.clear()
        await this.inlineFormNameFld.fill(email)

        await this.inlineFormEmailFld.clear()
        await this.inlineFormEmailFld.fill(email)

        if(hasRememberMe){
            await this.inlineFormRememberMeCheckbox.check({force: hasRememberMe})
        } else {
            await this.inlineFormRememberMeCheckbox.uncheck({force: hasRememberMe})
        }

        await this.inlineFormSubmitBtn.click()
    }

}