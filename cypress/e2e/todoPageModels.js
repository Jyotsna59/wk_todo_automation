class TodoPageModels {

  addnewtodo() { return cy.get('.new-todo') }
  gettodoList() { return cy.get('.todo-list') }
  gettodoitem() { return cy.get('label') }
  getcompletecheckbox() { return cy.get('.toggle') }
  clearcompletedlink() { return cy.get('.clear-completed') }
  getfooter() { return cy.get('.footer') }
  geteditbox() { return cy.get('.edit') }
  getcompletededitbox() { return cy.get('.completed > .edit') }
  gettodocount() { return cy.get('.todo-count') }

  //Function
  
  visit() {
    cy.visit('/')
    cy.contains('h1', 'todos').should('be.visible')
    this.addnewtodo().should('be.visible');
    this.getfooter().should('not.exist');
  }

  addtodoitem(value) {
    if (this.addnewtodo().should('have.value', '')) {
      this.addnewtodo().type(value)
    } else {
      this.addnewtodo().type(value)
    }
    return this
  }

  todoitemnotcompleted() {
    if (cy.get('.toggle').eq(0).should('not.have.class', 'completed') == true) {
      return true
    }
    else {
      cy.log("To do Item is already completed")
    }
  }

  todoitemcompleted() {
    if (cy.get('.toggle').eq(0).should('have.class', 'completed') == true) {
      return true
    }
    else {
      cy.log("To do Item is not completed")
    }
  }

  completealltasks() {
    this.getcompletecheckbox().as('checkboxes').check()
    cy.get('@checkboxes').each(checkbox => { expect(checkbox[0].checked).to.equal(true) })
  }
}
export default TodoPageModels