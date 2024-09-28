import { Page, Locator } from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly loginCredentials: Locator
    readonly loginCredentialsPassword: Locator
    readonly errorMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.usernameInput = this.page.locator('[data-test="username"]');
        this.passwordInput = this.page.locator('[data-test="password"]');
        this.loginButton = this.page.getByRole('button', { name: 'Login' })
        this.loginCredentials = this.page.locator('[data-test="login-credentials"]');
        this.loginCredentialsPassword = this.page.locator('[data-test="login-password"]');
        this.errorMessage = this.page.locator('[data-test="error"]');

    }

    async init() {
        await this.loginCredentials.waitFor({ state: 'visible' });
        await this.loginCredentialsPassword.waitFor({ state: 'visible' });
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/') // replace with env variable TODO: make env.yml
    }

    async login(username: string, password: string = 'secret_sauce') {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    async getLoginCredentials(): Promise<{ [key: string]: string }> {
        const credentials = await this.loginCredentials.textContent()
        
        if (!credentials) return {}

        const splitArray = credentials
            .replace('Accepted usernames are:','')
            .split(/(_user)/)
            .filter(Boolean);

        const result = [];
        for (let i = 0; i < splitArray.length; i += 2) {
            result.push(splitArray[i] + (splitArray[i + 1] || ''));
        }

        const credentialsObj: { [key: string]: string } = {};
        result.forEach((splitArray: string) => {
            const key = splitArray.split('_user')[0];
            credentialsObj[key] = splitArray;
        });

        return credentialsObj
    }
}