/// <reference types="cypress" />
const dataJson = require('../../fixtures/createuser.json')
describe('api test cases', () => {
    var payload = ""


    it('Verify the Response Code (204)', function() {
        cy.request({
            method: 'DELETE',
            url: "https://reqres.in/api/users/1",
        }).then((response) => {
            expect(response.status).to.equal(204)
        })
    })



    it('Verify POST Chaining with DELETE Call by Deleting the newly created data', function() {
        cy.request({
            method: 'POST',
            url: "https://reqres.in/api/users/1",
            body: {
                "name": dataJson.name,
                "job": dataJson.job
            }
        }).then((response) => {
            expect(response.body).has.property('job', dataJson.job)
            expect(response.body).has.property('name', dataJson.name)

        }).then((response) => {
            cy.log(JSON.stringify(response));

            const userId = response.body.id
            cy.log("user id is: " + userId)
                //2. get user (GET)
            cy.request({
                method: 'DELETE',
                url: 'https://reqres.in/api/users/' + userId,
            }).then((res) => {
                expect(res.status).to.eq(204)
            })
        })
    })

})