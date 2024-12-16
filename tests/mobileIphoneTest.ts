import {test} from '@playwright/test'


test('first mobile test', async ({page}) => {
    await page.goto("/")
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()

    const basicForm = page.locator("nb-card").filter({hasText: 'Basic form'});
    const emailFld = basicForm.getByRole('textbox', {name: 'Email'})
    const submitBtn = basicForm.getByRole('button', {name: 'Submit'})

    await emailFld.fill("email123@email.com")
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('Password123')
    await basicForm.locator('nb-checkbox').click()
    await submitBtn.click()

})
