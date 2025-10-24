import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';


// Importando as instâncias prontas dos Page Objects
import practiceFormPage from '../pageobjects/practiceForm.page.js';
import browserWindowsPage from '../pageobjects/browserWindows.page.js';
import webTablesPage from '../pageobjects/webTables.page.js';
import progressBarPage from '../pageobjects/progressBar.page.js';
import sortablePage from '../pageobjects/sortable.page.js';

// --- Variáveis globais para os cenários ---
let originalWindowHandle;
const formData = {
  firstName: 'Fulano',
  lastName: 'da Silva',
  email: 'fulano.silva@teste.com',
  mobile: '1199999999',
  address: 'Rua dos Testes, 123',
  state: 'NCR',
  city: 'Delhi',
};
const webTableData = {
  firstName: 'Ciclano',
  lastName: 'Teste',
  email: 'ciclano@teste.com',
  age: '30',
  salary: '10000',
  department: 'QA',
};

// --- Cenário 1: Practice Form ---

Given('Eu acesso a página "Practice Form"', async () => {
    await browser.maximizeWindow();
    await practiceFormPage.openBase();
    await practiceFormPage.clickCategory('Forms');
    await practiceFormPage.clickSubMenu('Practice Form');
});

When('Eu preencho o formulário com dados', async () => {
    await practiceFormPage.fillForm(formData);
});

When('Eu submeto o formulário', async () => {
    await practiceFormPage.submit();
});

Then('Eu devo ver um popup de sucesso', async () => {
    await expect(practiceFormPage.modalTitle).toHaveText('Thanks for submitting the form');
});

Then('Eu fecho o popup', async () => {
    await practiceFormPage.closeModal();
});

// --- Cenário 2: Browser Windows ---

Given('Eu acesso a página "Browser Windows"', async () => {
    await browser.maximizeWindow();
    await browserWindowsPage.openBase();
    await browserWindowsPage.clickCategory('Alerts, Frame & Windows');
    await browserWindowsPage.clickSubMenu('Browser Windows');
});

When('Eu clico no botão "New Window"', async () => {
    originalWindowHandle = await browser.getWindowHandle();
    await browserWindowsPage.newWindowButton.click();
    
    // Espera até que uma nova janela seja aberta
    await browser.waitUntil(
        async () => (await browser.getWindowHandles()).length > 1,
        { timeoutMsg: 'Nova janela não abriu' }
    );
});

Then('Eu valido que a nova janela contém a mensagem "This is a sample page"', async () => {
    const allWindows = await browser.getWindowHandles();
    const newWindowHandle = allWindows.find(handle => handle !== originalWindowHandle);
    
    // Muda o foco para a nova janela
    await browser.switchToWindow(newWindowHandle);
    await expect(browserWindowsPage.samplePageHeading).toHaveText('This is a sample page');
});

Then('Eu fecho a nova janela e volto para a principal', async () => {
    await browser.closeWindow();
    await browser.switchToWindow(originalWindowHandle);
    await expect(browserWindowsPage.newWindowButton).toBeDisplayed();
});

// --- Cenário 3: Web Tables ---

Given('Eu acesso a página "Web Tables"', async () => {
    await browser.maximizeWindow();
    await webTablesPage.openBase();
    await webTablesPage.clickCategory('Elements');
    await webTablesPage.clickSubMenu('Web Tables');
});

When('Eu crio um novo registro', async () => {
    await webTablesPage.addNewRecord(webTableData);
});

Then('O novo registro deve existir na tabela', async () => {
    await expect(webTablesPage.findRow(webTableData.email)).toExist();
});

When('Eu edito o salário do novo registro', async () => {
    await webTablesPage.editRecord(webTableData.email, '15000');
});

Then('O salário do registro deve estar atualizado', async () => {
    newSalary = await expect.stringContaining('15000');
    await expect(webTablesPage.findRow(webTableData.email)).toHaveText(newSalary);
});

When('Eu deleto o novo registro', async () => {
    await webTablesPage.deleteRecord(webTableData.email);
});

Then('O novo registro não deve mais existir na tabela', async () => {
    await expect(webTablesPage.findRow(webTableData.email)).not.toExist();
});

    
    // --- STEPS BÔNUS ---

When('Eu seleciono para exibir 100 rows', async () => {
    await webTablesPage.selectRowsToShow('100 rows');
});


// Executa um loop FOR e gera os dados dinamicamente.
When('Eu crio 12 novos registros dinâmicos com o email base "@bonus.com"', async () => {

    console.log(`Iniciando criação de 12 registros...`);
    // Loop de 1 a 12
    for (let i = 1; i <= 12; i++) {

        // Gerar dados dinâmicos
        const dadosDinamicos = {
            firstName: 'Usuario',
            lastName: `Dinamico ${i}`,
            email: `user.dinamico.${i}@bonus.com`, // ex: user.dinamico.1@bonus.com
            age: `${20 + i}`, // 21, 22, 23...
            salary: `${10000 + i}`, // 10001, 10002...
            department: 'QA Dinamico'
        };

        // Chamar o Page Object para criar o registro
        await webTablesPage.addNewRecord(dadosDinamicos);
    }
    console.log('Criação em massa concluída.');
});

Then('Eu devo ter 12 novos registros na tabela com o email base "@bonus.com"', async () => {
    const createdLines = await $$(`//div[@role="rowgroup" and .//*[contains(text(), "@bonus.com")]]`);

    // Valida se a quantidade de linhas encontradas é 12
    await expect(createdLines).toHaveLength(12);
});

When('Eu deleto todos os registros criados com o email base "@bonus.com"', async () => {
    await webTablesPage.deleteAllNewRecords('@bonus.com');
});

Then('Nenhum registro com o email base "@bonus.com" deve existir na tabela', async () => {
    const row = await webTablesPage.findRowByPartialEmail('@bonus.com');
    await expect(row).not.toExist();
});


// --- Cenário 4: Progress Bar ---

Given('Eu acesso a página "Progress Bar"', async () => {
    await browser.maximizeWindow();
    await progressBarPage.openBase();
    await progressBarPage.clickCategory('Widgets');
    await progressBarPage.clickSubMenu('Progress Bar');
});

When('Eu clico em "Start"', async () => {
    await progressBarPage.startStopButton.click();
});

When('Eu clico em "Stop" antes dos 25%', async () => {
    await browser.waitUntil(
        async () => (await progressBarPage.getValue()) >= 20,
        { timeoutMsg: 'A barra não atingiu 20%' }
    );
    await progressBarPage.startStopButton.click();
});

Then('O valor da barra de progresso deve ser menor ou igual a 25', async () => {
    const value = await progressBarPage.getValue();
    expect(value).toBeLessThanOrEqual(25);
});

When('Eu clico em "Start" novamente e espero chegar em 100%', async () => {
    await progressBarPage.startStopButton.click();
    await browser.waitUntil(
        async () => (await progressBarPage.getValue()) === 100,
        { timeout: 15000, timeoutMsg: 'A barra não atingiu 100%' }
    );
});

Then('Eu clico em "Reset" e a barra deve zerar', async () => {
    await progressBarPage.resetButton.click();
    await expect(await progressBarPage.getValue()).toBe(0);
});

// --- Cenário 5: Sortable ---

Given('Eu acesso a página "Sortable"', async () => {
    await browser.maximizeWindow();
    await sortablePage.openBase();
    await sortablePage.clickCategory('Interactions');
    await sortablePage.clickSubMenu('Sortable');
});

When('Eu arrasto os itens para a ordem crescente', async () => {
    const correctOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

    // Arrasta os itens para a ordem correta
    for (let i = 0; i < correctOrder.length; i++) {
        const itemText = correctOrder[i];
        const itemToDrag = await sortablePage.getItem(itemText);
        const targetSlot = await sortablePage.getTargetSlot(i);
        await itemToDrag.dragAndDrop(targetSlot);
    }
});

Then('A lista deve estar na ordem crescente', async () => {
    const correctOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
    const items = await $$(`//div[contains(@class, 'vertical-list-container')]//div[contains(@class, 'list-group-item')]`);

    // Verifica se a ordem dos itens está correta
    for (let i = 0; i < items.length; i++) {
        await expect(items[i]).toHaveText(correctOrder[i]);
    }
});