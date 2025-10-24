import Page from './page.js';

class ProgressBarPage extends Page {
    // Mapeamento dos elementos
    get startStopButton() { return $('#startStopButton'); }
    get resetButton() { return $('#resetButton'); }
    get progressBar() { return $(`#progressBar > div`); }

    // Ações da página
    async getValue() {
        const value = await this.progressBar.getAttribute('aria-valuenow');
        return parseInt(value);
    }
}
export default new ProgressBarPage();