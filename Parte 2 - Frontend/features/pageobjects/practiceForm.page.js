import Page from './page.js';
import path from 'path'; // Para lidar com o upload

class PracticeFormPage extends Page {
    // Mapeamento dos elementos
    get inputFirstName() { return $('#firstName'); }
    get inputLastName() { return $('#lastName'); }
    get inputEmail() { return $('#userEmail'); }
    get radioGenderMale() { return $(`//label[text()="Male"]`); }
    get inputMobile() { return $('#userNumber'); }
    get inputUploadPicture() { return $('#uploadPicture'); }
    get inputCurrentAddress() { return $('#currentAddress'); }
    get dropdownState() { return $('#state'); }
    get dropdownCity() { return $('#city'); }
    get buttonSubmit() { return $('#submit'); }
    get modalTitle() { return $('#example-modal-sizes-title-lg'); }
    get buttonCloseModal() { return $('#closeLargeModal'); }

    // Ações da página
    async fillForm(data) {
        await this.inputFirstName.setValue(data.firstName);
        await this.inputLastName.setValue(data.lastName);
        await this.inputEmail.setValue(data.email);
        await this.radioGenderMale.click();
        await this.inputMobile.setValue(data.mobile);
        
        // Caminho absoluto para o arquivo de upload 
        const filePath = path.resolve('./fixtures/uploadFile.txt');
        await this.inputUploadPicture.setValue(filePath);
        
        await this.inputCurrentAddress.setValue(data.address);
        
        await this.dropdownState.scrollIntoView();
        await this.dropdownState.click();
        await $(`//*[text()="${data.state}"]`).click();
        
        await this.dropdownCity.click();
        await $(`//*[text()="${data.city}"]`).click();
    }

    // Submete o formulário
    async submit() {
        await this.buttonSubmit.scrollIntoView();
        await this.buttonSubmit.click();
    }
    
    // Fecha o modal de sucesso
    async closeModal() {
        await this.buttonCloseModal.click();
    }
}
export default new PracticeFormPage();
