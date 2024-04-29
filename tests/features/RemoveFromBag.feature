Feature: Remove from bag

  @Automated
  Scenario: Removing a single product from a multi-item bag
    Given multiple products are in my bag
    When I remove the first product in my bag
    Then the first product should no longer appear in the bag
    And the other products in the bag remain

  @Manual
  Scenario: Removing a single product from a single-item bag
    Given a single product is in my bag
    When I remove the product
    Then the product should not appear in the bag
    And I have an empty bag