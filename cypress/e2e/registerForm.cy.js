describe('form validations', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Hatali girislerde buton aktif olmuyor ve hata mesajlari gozukuyor', () => {
    cy.get('input[name="name"]').type('a'); 
    cy.get('input[name="surname"]').type('b'); 
    cy.get('input[name="email"]').type('emre@wit.'); 
    cy.get('input[name="password"]').type('asdfgh'); 
  
    
    cy.contains('button', 'Register').should('be.disabled');
  
    
    cy.contains('Name must be at least 3 characters long');
    cy.contains('Surname must be at least 3 characters long');
    cy.contains('Please enter a valid email address');
    cy.contains('Password must be at least 8 characters');
  });

  it('Gecerli girislerde kayit olabiliyor, user id ekranda gozukuyor', () => {
    cy.get('input[name="name"]').type('Oguz');
    cy.get('input[name="surname"]').type('Samsa');
    cy.get('input[name="email"]').type('oguzsamsa@gmail.com');
    cy.get('input[name="password"]').type('Strongpassword1!');
    cy.get('input[name="terms"]').check();

    cy.contains('button', 'Register').click();

    
    cy.contains('Registration Successful!');
    cy.contains('Registration Number:');
  });


  it('Basarili giristen sonra form sifirlaniyor', () => {
    cy.get('input[name="name"]').type('Oguz');
    cy.get('input[name="surname"]').type('Samsa');
    cy.get('input[name="email"]').type('oguz@example.com');
    cy.get('input[name="password"]').type('StrongPass123!');
    cy.get('input[name="terms"]').check();

    cy.contains('button', 'Register').click();

  
    cy.get('input[name="name"]').should('have.value', '');
    cy.get('input[name="surname"]').should('have.value', '');
    cy.get('input[name="email"]').should('have.value', '');
    cy.get('input[name="password"]').should('have.value', '');
    cy.get('input[name="terms"]').should('not.be.checked');
  });
});