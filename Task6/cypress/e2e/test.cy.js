// cypress/e2e/test.cy.js

describe('E2E - Aplikacja sklepu', () => {
  const base = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(base);
  });

  it('Wyświetla listę produktów', () => {
    cy.contains('Produkty').should('exist');
    cy.contains('li', 'Mleko').should('exist');
    cy.contains('li', 'Chleb').should('exist');
    cy.contains('li', 'Ser').should('exist');
  });

  it('Dodaje produkt do koszyka', () => {
    cy.contains('li', 'Mleko').within(() => {
      cy.contains('Dodaj').click();
    });
    cy.contains('Koszyk').click();
    cy.contains('li', 'Mleko').should('exist');
    cy.get('strong').should('contain', '4.5');
  });

  it('Dodaje kilka produktów i sprawdza sumę', () => {
    const produkty = ['Mleko', 'Chleb', 'Ser'];
    produkty.forEach((produkt) => {
      cy.contains('li', produkt).within(() => {
        cy.contains('Dodaj').click();
      });
    });
    cy.contains('Koszyk').click();
    produkty.forEach((produkt) => {
      cy.contains('li', produkt).should('exist');
    });
    cy.get('strong').should('contain', '13.7');
  });

  it('Usuwa produkt z koszyka', () => {
    cy.contains('li', 'Chleb').within(() => {
      cy.contains('Dodaj').click();
    });
    cy.contains('Koszyk').click();
    cy.contains('li', 'Chleb').within(() => {
      cy.contains('Usuń').click();
    });
    cy.contains('li', 'Chleb').should('not.exist');
  });

  it('Koszyk jest pusty na początku', () => {
    cy.contains('Koszyk').click();
    cy.contains('Twój koszyk jest pusty.').should('exist');
  });

  it('Przejście do płatności', () => {
    cy.contains('Płatności').click();
    cy.url().should('include', '/platnosci');
    cy.contains('Zapłać').should('exist');
  });

  it('Nie pozwala zapłacić przy pustym koszyku', () => {
    cy.contains('Płatności').click();
    cy.get('button').should('be.disabled');
  });

  it('Wysyła płatność i otrzymuje OK', () => {
    cy.contains('li', 'Ser').within(() => {
      cy.contains('Dodaj').click();
    });
    cy.contains('Płatności').click();
    cy.intercept('POST', '**/platnosc').as('platnosc');
    cy.get('button').click();
    cy.wait('@platnosc').its('response.statusCode').should('eq', 200);
  });

  it('Dodaje wielokrotnie ten sam produkt', () => {
    cy.contains('li', 'Mleko').within(() => {
      cy.contains('Dodaj').click();
      cy.contains('Dodaj').click();
    });
    cy.contains('Koszyk').click();
    cy.get('li').filter(':contains("Mleko")').should('have.length.at.least', 2);
  });

  it('Poprawnie aktualizuje sumę po usunięciu', () => {
    cy.contains('li', 'Chleb').within(() => {
      cy.contains('Dodaj').click();
    });
    cy.contains('li', 'Ser').within(() => {
      cy.contains('Dodaj').click();
    });
    cy.contains('Koszyk').click();
    cy.contains('li', 'Ser').within(() => {
      cy.contains('Usuń').click();
    });
    cy.get('strong').should('contain', '3.0');
  });

  it('Koszyk nie wyświetla duplikatów jako jeden wpis', () => {
    cy.contains('li', 'Ser').within(() => {
      cy.contains('Dodaj').click();
      cy.contains('Dodaj').click();
    });
    cy.contains('Koszyk').click();
    cy.get('li').filter(':contains("Ser")').should('have.length', 2);
  });

  it('Zapłać działa tylko z produktami', () => {
    cy.contains('li', 'Ser').within(() => {
      cy.contains('Dodaj').click();
    });
    cy.contains('Płatności').click();
    cy.get('button').should('not.be.disabled');
  });

  it('Lista produktów zawiera ceny', () => {
    cy.get('li').each(($el) => {
      expect($el.text()).to.match(/\d+(\.\d+)? zl/);
    });
  });

  it('Koszyk wyświetla poprawnie ilość produktów', () => {
    cy.contains('li', 'Chleb').within(() => {
      cy.contains('Dodaj').click();
      cy.contains('Dodaj').click();
    });
    cy.contains('Koszyk').click();
    cy.get('li').filter(':contains("Chleb")').should('have.length', 2);
  });

  it('Płatność resetuje koszyk', () => {
    cy.contains('li', 'Chleb').within(() => {
      cy.contains('Dodaj').click();
    });
    cy.contains('Płatności').click();
    cy.get('button').click();
    cy.contains('Koszyk').click();
    cy.contains('Twój koszyk jest pusty.').should('exist');
  });

  it('Każdy produkt zawiera nazwę i cenę', () => {
    cy.get('li').each(($el) => {
      expect($el.text()).to.match(/[\w\s]+/);
      expect($el.text()).to.match(/\d+(\.\d+)? zl/);
    });
  });

  it('Linki nawigacyjne są widoczne', () => {
    cy.contains('Produkty').should('exist');
    cy.contains('Koszyk').should('exist');
    cy.contains('Płatności').should('exist');
  });

  it('Link do koszyka działa', () => {
    cy.contains('Koszyk').click();
    cy.url().should('include', '/koszyk');
  });

  it('Zawiera tytuł "Produkty"', () => {
    cy.title().should('include', 'Produkty');
  });

  it('Przycisk "Dodaj" istnieje przy każdym produkcie', () => {
    cy.get('button').contains('Dodaj').should('exist');
  });
});