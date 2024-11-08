describe('Pruebas de Amazon - Desktop y Mobile', () => {

  const url = 'https://www.amazon.com';

  // **Desktop Tests**
  context('Pruebas Desktop', () => {

      beforeEach(() => {
          cy.viewport(1280, 720);
          cy.visit(url);
      });

      it('Debería iniciar sesión o permitir el flujo de recuperación de contraseña', () => {
          cy.get('#nav-link-accountList-nav-line-1').click();
          cy.get('h1').should('contain', 'Iniciar sesión');

          // Proceso de crear cuenta
          cy.get('#createAccountSubmit').click();
          cy.get('h1').should('contain', 'Crear cuenta');
          cy.get('#ap_customer_name').type('Brandon Ramirez');
          cy.get('#ap_email').type('brandon@example.com');
          cy.get('#ap_password').type('p@ss123');
          cy.get('#ap_password_check').type('p@ss123');
          cy.get('#continue').should('be.visible');;
      });

      // Buscar libros de Magento
      it('Debería buscar libros de Magento y mostrar resultados', () => {
          cy.get('#twotabsearchtextbox').type('Magento books');
          cy.get('#nav-search-submit-button').click();
          cy.get('.s-main-slot').should('contain', 'Magento');
      });
      // Agregar computador portátil al carrito
      it('Debería agregar un producto al carrito y mostrar el botón de "Proceder al pago"', () => {
          cy.wait(1000);
          cy.get('#twotabsearchtextbox').type('Laptop');
          cy.get('#nav-search-submit-button').click();
          cy.wait(2000);
          cy.get('.s-main-slot .s-result-item').first().find('h2', { timeout: 2000 }).should('be.visible');
          cy.get('#a-autoid-1-announce').click();
          cy.wait(2000);
          cy.get('#nav-cart-count').should('not.contain', '0');
          cy.get('#nav-cart-text-container > span.nav-line-2').click();
          cy.get('#sc-buy-box-ptc-button').should('be.visible');
      });
  });

  // **Mobile Tests**
  context('Pruebas Mobile', () => {

      beforeEach(() => {
          cy.viewport('iphone-xr');
          cy.visit(url);
      });

      // Validar que se vea el menú hamburguesa
      it('Debería mostrar el menú de hamburguesa en la versión mobile', () => {
          cy.get('#nav-hamburger-menu').should('be.visible');
      });
      // Buscar producto
      it('Debería buscar un producto desde mobile y mostrar resultados', () => {
          cy.wait(1000);
          cy.get('#twotabsearchtextbox').type('Tablet');
          cy.get('#nav-search-submit-button').click();
          cy.get('.s-main-slot').should('contain', 'Tablet');
      });
      // Abrir la página del carrito de compras
      it('Debería abrir la vista del carrito desde mobile', () => {
          cy.get('#nav-cart').click();
          cy.get('.sc-your-amazon-cart-is-empty').should('be.visible');
      });
  });
});
