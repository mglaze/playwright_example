// test using pageobject pattern

import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/loginPage'

test.describe('_loginPage', {tag: '@saucedemo' }, () => {
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.goto()
    })

    test.afterEach(async ({page}) => {
        await page.close()
    })

    test('_valid login with standard credentials', async ({ page }) => {
        const credentials = await loginPage.getLoginCredentials()
        await loginPage.login(credentials.standard, 'secret_sauce') 
        await expect(page).toHaveURL(/.*inventory/)
    })

    test('_invalid login with locked_out credentials', async ({ page }) => {
        const credentials = await loginPage.getLoginCredentials()
        await loginPage.login(credentials.locked_out) 
        await expect(loginPage.errorMessage).toBeVisible()
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.')
    })
})