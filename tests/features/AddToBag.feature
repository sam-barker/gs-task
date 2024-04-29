Feature: Add To Bag

  @Automated
  Scenario: Adding a product to the Bag
    Given the user is on a product page
    When adding the product to the bag
    Then the product should appear in the bag