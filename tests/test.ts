// process.env.NODE_ENV = 'test';

// import client from '../src/dbconfig/dbconnector';
// import chai from 'chai';
// import chaiHttp from 'chai-http';

// chai.use(chaiHttp);

// describe('Test', () => {
//     it('should return 200', (done) => {
//         chai.request('http://localhost:3000')
//             .get('/users')
//             .end((err, res) => {
//                 chai.expect(res).to.have.status(200);
//                 done();
//             });
//     });
// })

import { expect } from 'chai'

class HelloWorld{
    show(){return 'Hello World'}  
}

describe('Test Hello World', () => {
    it('test_init_doNothing', () => {
        let sut = new HelloWorld()
    })

    it('test_show_returnHelloWorld', () => {
        let sut = new HelloWorld()
        expect(sut.show()).to.be.equal('Hello World')

    })
})

