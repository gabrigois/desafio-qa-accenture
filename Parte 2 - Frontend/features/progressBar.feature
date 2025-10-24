@progressBar
Feature: Interação com a Progress Bar
  Como usuário, eu quero controlar uma barra de progresso.

  Scenario: Controlar a barra de progresso
    Given Eu acesso a página "Progress Bar"
    When Eu clico em "Start"
    And Eu clico em "Stop" antes dos 25%
    Then O valor da barra de progresso deve ser menor ou igual a 25
    When Eu clico em "Start" novamente e espero chegar em 100%
    Then Eu clico em "Reset" e a barra deve zerar