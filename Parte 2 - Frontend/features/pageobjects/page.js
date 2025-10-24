import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    // Abre a URL base (https://demoqa.com)
    openBase() {
        return browser.url(`https://demoqa.com`);
    }

    // Método genérico para clicar nas categorias da home
    async clickCategory(categoryName) {
        const element = await $(`//h5[text()="${categoryName}"]`);
        await element.waitForClickable();
        await element.click();
    }

    // Método genérico para clicar em um item do submenu
    async clickSubMenu(menuName) {
        const element = await $(`//span[text()="${menuName}"]/parent::li`);
        await element.waitForClickable();
        await element.click();
    }
}
