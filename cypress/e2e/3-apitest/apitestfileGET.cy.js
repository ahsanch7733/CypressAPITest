/// <reference types="cypress" />
const dataJson = require('../../fixtures/example')
describe('api test cases', () => {
    var payload = ""

    const getUsers = () =>
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/',
        })

    it('get user', () => {
        getUsers().then((res) => {
            expect(res.status).to.eq(200)

        })
    })

    it('get user by id', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/2',
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.data.first_name).to.eq('Janet')
        })
    })


    it('get user verify json', () => {
        cy.request({
                method: 'GET',
                url: 'https://reqres.in/api/users/2',
            }).its('headers')
            .its('content-type')
            .should('include', 'application/json')
    })

    it('get user by verify deep equal data', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/2',
        }).then((res) => {
            expect(res.body).have.property('data')

            expect(res.body).has.to.deep.equal({
                "data": {
                    "id": 2,
                    "email": "janet.weaver@reqres.in",
                    "first_name": "Janet",
                    "last_name": "Weaver",
                    "avatar": "https://reqres.in/img/faces/2-image.jpg"

                },
                "support": {
                    "url": "https://reqres.in/#support-heading",
                    "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
                }

            })
        })
    })


})