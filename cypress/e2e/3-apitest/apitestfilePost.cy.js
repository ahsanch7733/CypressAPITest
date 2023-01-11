/// <reference types="cypress" />
const dataJson = require('../../fixtures/createuser.json')
describe('api test cases', () => {
    var payload = ""


    it('Post Method Call', function() {
        cy.request({
            method: 'POST',
            url: "https://reqres.in/api/users",
            body: {
                "name": dataJson.name,
                "job": dataJson.job
            }
        }).then((response) => {
            expect(response.status).to.equal(201)
        })
    })

    it('Post Method verify property', function() {
        cy.request({
            method: 'POST',
            url: "https://reqres.in/api/users",
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

    it('Post chaining Method get', function() {
        cy.request({
            method: 'POST',
            url: "https://reqres.in/api/users",
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
                method: 'GET',
                url: 'https://gorest.co.in/public/v1/users/' + userId,
            }).then((res) => {
                expect(res.status).to.eq(200)
            })
        })
    })

})