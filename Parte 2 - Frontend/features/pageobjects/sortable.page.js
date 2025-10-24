import Page from './page.js';

class SortablePage extends Page {
    // Retorna o item da lista com o texto
    getItem(text) {
        return $(`//div[contains(@class, 'vertical-list-container')]//div[text()="${text}"]`);
    }
    // Retorna o "slot" da lista (posição 0 = primeiro)
    getTargetSlot(index) {
        return $(`(//div[contains(@class, 'vertical-list-container')]//div[contains(@class, 'list-group-item')])[${index + 1}]`);
    }
}
export default new SortablePage();