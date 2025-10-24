@sortable
Feature: Interação com Lista Ordenável
  Como usuário, eu quero ordenar itens usando drag and drop.

  Scenario: Ordenar a lista em ordem crescente
    Given Eu acesso a página "Sortable"
    When Eu arrasto os itens para a ordem crescente
    Then A lista deve estar na ordem crescente