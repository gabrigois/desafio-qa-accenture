@practiceForm
Feature: Preenchimento do Practice Form
  Como usuário, eu quero preencher e enviar o formulário de prática.

  Scenario: Preencher e enviar o formulário com sucesso
    Given Eu acesso a página "Practice Form"
    When Eu preencho o formulário com dados
    And Eu submeto o formulário
    Then Eu devo ver um popup de sucesso
    And Eu fecho o popup
