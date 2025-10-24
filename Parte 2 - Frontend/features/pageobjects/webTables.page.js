import Page from './page.js';

class WebTablesPage extends Page {
    // Mapeamento dos elementos
    get addNewRecordButton() { return $('#addNewRecordButton'); }
    get firstNameInput() { return $('#firstName'); }
    get lastNameInput() { return $('#lastName'); }
    get emailInput() { return $('#userEmail'); }
    get ageInput() { return $('#age'); }
    get salaryInput() { return $('#salary'); }
    get departmentInput() { return $('#department'); }
    get submitButton() { return $('#submit'); }

    // Encontra uma linha específica pelo email
    findRow(email) {
        return $(`//div[@class='rt-tr-group' and .//div[text()="${email}"]]`);
    }

// Ações da página    
    async addNewRecord(data) {
        await this.addNewRecordButton.waitForClickable();
        await this.addNewRecordButton.click();
        await this.firstNameInput.setValue(data.firstName);
        await this.lastNameInput.setValue(data.lastName);
        await this.emailInput.setValue(data.email);
        await this.ageInput.setValue(data.age);
        await this.salaryInput.setValue(data.salary);
        await this.departmentInput.setValue(data.department);
        await this.submitButton.waitForClickable();
        await this.submitButton.click();
    }

    async editRecord(email, newSalary) {
        const row = await this.findRow(email);
        await row.scrollIntoView();
        await row.$(`[title="Edit"]`).waitForClickable({ timeout: 10000 });
        await row.$(`[title="Edit"]`).click();
        await this.salaryInput.setValue(newSalary);
        await this.submitButton.waitForClickable();
        await this.submitButton.click();
    }

    async deleteRecord(email) {
        const row = await this.findRow(email);
        await row.$(`[title="Delete"]`).waitForClickable({ timeout: 10000 });
        await row.$(`[title="Delete"]`).click();
    }


    // --- MÉTODOS BÔNUS ---

    //seleciona a quantidade de linhas a serem exibidas
    async selectRowsToShow(text) {
        await $('[aria-label="rows per page"]').selectByVisibleText(text);
    }

    // Encontra a primeira linha da tabela que contém um texto parcial no email
    findRowByPartialEmail(partialEmail) {
        return $(`//div[@role="rowgroup" and .//*[contains(text(), "${partialEmail}")]]`);
    }

    
    // Deleta todos os registros que contêm o email base, um por um
    async deleteAllNewRecords(baseEmail) {

        // Encontra a primeira linha que corresponde ao critério
        let rowToDelete = await this.findRowByPartialEmail(baseEmail);

        // Loop: Enquanto uma linha correspondente existir...
        while (await rowToDelete.isExisting()) {
            
            // Encontra o ícone de deletar *dentro* daquela linha específica
            const deleteButton = await rowToDelete.$('[title="Delete"]');
            
            // Clica nele
            await deleteButton.waitForClickable({ timeout: 5000 });
            await deleteButton.click();
            
            // Re-pesquisa desde o início.
            rowToDelete = await this.findRowByPartialEmail(baseEmail);
        }
    }
}
export default new WebTablesPage();