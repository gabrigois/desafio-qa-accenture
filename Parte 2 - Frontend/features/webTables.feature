@webTables
Feature: Interação com Web Tables
  Como usuário, eu quero manipular registros em uma tabela.

  Scenario: Criar, editar e deletar um registro
    Given Eu acesso a página "Web Tables"
    When Eu crio um novo registro
    Then O novo registro deve existir na tabela
    When Eu edito o salário do novo registro
    Then O salário do registro deve estar atualizado
    When Eu deleto o novo registro
    Then O novo registro não deve mais existir na tabela

# --- BÔNUS ---
  @bonus
  Scenario: Bônus - Criar e validar 12 novos registros de forma dinâmica e deletá-los
    Given Eu acesso a página "Web Tables"
    When Eu seleciono para exibir 100 rows
    And Eu crio 12 novos registros dinâmicos com o email base "@bonus.com"
    Then Eu devo ter 12 novos registros na tabela com o email base "@bonus.com"
    When Eu deleto todos os registros criados com o email base "@bonus.com"
    Then Nenhum registro com o email base "@bonus.com" deve existir na tabela
    