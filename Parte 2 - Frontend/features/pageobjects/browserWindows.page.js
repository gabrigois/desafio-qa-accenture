import Page from './page.js';

class BrowserWindowsPage extends Page {
    // Mapeamento dos elementos
    get newWindowButton() { return $('#windowButton'); }
    get samplePageHeading() { return $('#sampleHeading'); }
}
export default new BrowserWindowsPage();