/// <reference types="cypress" />
const dataJson = require('../../fixtures/createuser.json')
describe('api test cases', () => {
    var payload = ""


    it('Verify the Response code(200)', function() {
        cy.request({
            method: 'PUT',
            url: "https://reqres.in/api/users/1",
            body: {
                "name": dataJson.name,
                "job": dataJson.job
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
        })
    })

    it('Verify Data elements are created as per the requests for body data', function() {
        cy.request({
            method: 'PUT',
            url: "https://reqres.in/api/users/1",
            body: {
                "name": dataJson.name,
                "job": dataJson.job
            }
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.body).has.property('job', dataJson.job)
            expect(response.body).has.property('name', dataJson.name)

        })
    })

    it('Verify POST Chaining with PUT Call by updating the newly created data', function() {
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
                method: 'PUT',
                url: 'https://reqres.in/api/users/' + userId,
                body: {
                    "job": "DB"
                }
            }).then((res) => {
                expect(res.status).to.eq(200)
            })
        })
    })

})