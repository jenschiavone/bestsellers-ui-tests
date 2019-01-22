Feature: Testing that everything is wired up

    Scenario: It works
        Given I navigate to the Bestsellers home page
        Then I should see the app title

    Scenario: Viewing a list of books
        Given a list of hardcover fiction book exists
        When I choose to view the Hardcover Fiction list
        Then I should see the list of Hardcover Fiction books