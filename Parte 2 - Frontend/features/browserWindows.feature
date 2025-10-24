@browserWindows
Feature: Interação com Janelas do Navegador
  Como usuário, eu quero testar a abertura de novas janelas.

  Scenario: Abrir e validar uma nova janela
    Given Eu acesso a página "Browser Windows"
    When Eu clico no botão "New Window"
    Then Eu valido que a nova janela contém a mensagem "This is a sample page"
    And Eu fecho a nova janela e volto para a principal