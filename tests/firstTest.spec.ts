import {test, expect} from '@playwright/test'

test.beforeAll(() => {
    // run once before all tests
})

test.beforeEach(async ({page}) => {
    await page.goto("/")
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
})

test('first test', async ({page}) => {
    const basicForm = page.locator("nb-card").filter({hasText: 'Basic form'});
    const emailFld = basicForm.getByRole('textbox', {name: 'Email'})
    const submitBtn = basicForm.getByRole('button', {name: 'Submit'})

    await emailFld.fill("email123@email.com")
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('Password123')
    await basicForm.locator('nb-checkbox').click()
    await submitBtn.click()

    // Get and verify text of button
    const submitBtnText = await submitBtn.textContent()
    expect(submitBtnText).toEqual('Submit')
    expect(emailFld).toHaveValue('email123@email.com')
    // or ..
    await expect(submitBtn).toHaveText('Submit')


    // Get all radio buttons text and verify contains for array
    const allRadioBtn = await page.locator('nb-radio').allTextContents()
    expect(allRadioBtn).toContain('Option 1')

    // Get input field text and verify it
    await emailFld.fill("email123@email.com")
    const emailFldVal = await emailFld.inputValue()
    expect(emailFldVal).toEqual('email123@email.com')

    // Get input field attribute and verify it
    const emailFldPlaceholderVal = await emailFld.getAttribute('placeholder')
    expect(emailFldPlaceholderVal).toEqual('Email')

})
