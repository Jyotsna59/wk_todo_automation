import TodoPageModels from './todoPageModels';

describe('WK Todos Test', function () {
  const todopagemodels = new TodoPageModels();

  beforeEach(function () {
    cy.fixture('example').then(function (testdata) {
      this.testdata = testdata
      cy.log("data : " + testdata);
    })
    todopagemodels.visit();
  })

  it('Test to Add Item in todo list', function () {
    cy.log("Test to Add Item in todo list");
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item1}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item2}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item3}{enter}`)
    todopagemodels.gettodocount().contains('3 items left')
    todopagemodels.gettodoitem().should('have.length', 3)
    todopagemodels.gettodoitem().eq(0).should('contain', this.testdata.todo_item1)
    todopagemodels.gettodoitem().eq(1).should('contain', this.testdata.todo_item2)
    todopagemodels.gettodoitem().eq(2).should('contain', this.testdata.todo_item3)

    todopagemodels.getcompletecheckbox().eq(0).should('not.have.class', 'completed')
    todopagemodels.getcompletecheckbox().eq(1).should('not.have.class', 'completed')
    todopagemodels.getcompletecheckbox().eq(2).should('not.have.class', 'completed')
    todopagemodels.getcompletecheckbox().eq(0).should('not.be.checked')
  })

  it('Test to complete and verify clear complete item in todo list', function () {
    cy.log("Test to complete a todo item and verify clear complete link functionality");
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item1}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item2}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item3}{enter}`)
    todopagemodels.gettodoitem().should('have.length', 3)
    todopagemodels.gettodocount().contains('3 items left')
    todopagemodels.getcompletecheckbox().eq(2).click()
    todopagemodels.getcompletecheckbox().eq(2).should('be.checked')
    todopagemodels.gettodoitem().eq(2).should('have.css', 'text-decoration', 'line-through solid rgb(217, 217, 217)')
    todopagemodels.clearcompletedlink().should('be.visible')
    todopagemodels.clearcompletedlink().click()
    todopagemodels.gettodoitem().should('have.length', 2)
    todopagemodels.gettodocount().contains('2 items left')
    todopagemodels.gettodoitem().eq(2).should('not.exist');
  })

  it('Verify edit todo list item functionality', function () {
    cy.log("Verify edit todo list item functionality");
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item1}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item2}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item3}{enter}`)
    todopagemodels.gettodoitem().should('have.length', 3)
    todopagemodels.gettodoitem().eq(1).dblclick()
    todopagemodels.geteditbox().should('be.visible').type(`${this.testdata.edit_todo_item1}{enter}`)
  })

  it('Test to Edit completed todo list item', function () {
    cy.log("Edit completed todo task.");
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item1}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item2}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item3}{enter}`)
    todopagemodels.getcompletecheckbox().eq(2).click()
    todopagemodels.getcompletecheckbox().eq(2).should('be.checked')
    todopagemodels.gettodoitem().eq(2).should('have.css', 'text-decoration', 'line-through solid rgb(217, 217, 217)')
    todopagemodels.gettodoitem().should('have.length', 3)
    todopagemodels.gettodoitem().eq(2).dblclick()
    todopagemodels.getcompletededitbox().should('be.visible').type(`${this.testdata.edit_todo_item2}{enter}`)
  })

  it('Complete all tasks', function () {
    cy.log("Complete all todo list item");
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item1}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item2}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item3}{enter}`)
    todopagemodels.completealltasks()
    todopagemodels.gettodoitem().should('have.length', 3)
    todopagemodels.gettodocount().contains('0 items left')
    todopagemodels.clearcompletedlink().click()
    todopagemodels.getfooter().should('not.exist')
  })

  it('Test: Edit completed todo list item', function () {
    cy.log("Verify Edit functionality for completed todo list item")
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item1}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item2}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item3}{enter}`)
    todopagemodels.getcompletecheckbox().eq(2).click()
    todopagemodels.getcompletecheckbox().eq(2).should('be.checked')
    todopagemodels.gettodoitem().eq(2).should('have.css', 'text-decoration', 'line-through solid rgb(217, 217, 217)')
    todopagemodels.gettodoitem().should('have.length', 3)
    todopagemodels.gettodoitem().eq(2).dblclick()
    todopagemodels.getcompletededitbox().should('be.visible').type(`${this.testdata.edit_todo_item2}{enter}`)
  })

  it('Test to add invalid long length task in todo list', function () {
    cy.log("Test to Add invalid long length task in the todo list")
    todopagemodels.addnewtodo().type(`${this.testdata.invalid_data1}{enter}`)
    todopagemodels.gettodoitem().should('have.length', 1)
    todopagemodels.gettodoitem().eq(0).should('contain', this.testdata.invalid_data1)
  })

  it('Test to add invalid long length task with all special characters in todo list', function () {
    cy.log("Test to Add invalid long length task with all special characters in todo list")
    todopagemodels.addnewtodo().type(`${this.testdata.invalid_data2}{enter}`)
    todopagemodels.gettodoitem().should('have.length', 1)
    todopagemodels.gettodoitem().eq(0).should('contain', this.testdata.invalid_data2)
  })

  it('Test to add empty spaces', function () {
    cy.log("Test to add empty spaces");
    todopagemodels.addnewtodo().type(`${this.testdata.whitespace_data}{enter}`)
    todopagemodels.getfooter().should('not.exist');
  })

  it('Test to Edit completed todo list with empty spaces', function () {
    cy.log("Test to Edit completed todo list with empty spaces");
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item1}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item2}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item3}{enter}`)
    todopagemodels.getcompletecheckbox().eq(2).click()
    todopagemodels.getcompletecheckbox().eq(2).should('be.checked')
    todopagemodels.gettodoitem().eq(2).should('have.css', 'text-decoration', 'line-through solid rgb(217, 217, 217)')
    todopagemodels.gettodoitem().should('have.length', 3)
    todopagemodels.gettodoitem().eq(2).dblclick()
    todopagemodels.getcompletededitbox().should('be.visible').type(`${this.testdata.whitespace_data}{enter}`)
    todopagemodels.gettodoitem().eq(1).dblclick()
    todopagemodels.geteditbox().should('be.visible').type(`${this.testdata.whitespace_data}{enter}`)
  })

  it('Test to add duplicate and multiple (more than 10) todo items', function () {
    cy.log("Verify to add multiple and duplicate to-do task lists");
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item1}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item2}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item3}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item1}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item2}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item3}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item1}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item2}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item3}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item1}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item2}{enter}`)
    todopagemodels.addnewtodo().type(`${this.testdata.todo_item3}{enter}`)
    todopagemodels.gettodoitem().should('have.length', 12)
  })
})