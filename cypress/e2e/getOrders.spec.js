describe('Get All Orders', () => {
    // Use the Firebase ID token directly in the test case
    const authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJkMGFlMTRkMjhkMTY1NzhiMzFjOGJlNmM4ZmRlZDM0ZDVlMWExYzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3J5LW1nbXQtc3lzLWQyZTExIiwiYXVkIjoiaW52ZW50b3J5LW1nbXQtc3lzLWQyZTExIiwiYXV0aF90aW1lIjoxNzMzOTEyNTg1LCJ1c2VyX2lkIjoidFYxbXlna0diNlZ6MFdjMlVBM0FtTDFIV2I5MyIsInN1YiI6InRWMW15Z2tHYjZWejBXYzJVQTNBbUwxSFdiOTMiLCJpYXQiOjE3MzM5MTI1ODUsImV4cCI6MTczMzkxNjE4NSwiZW1haWwiOiJ0ZXN0QHVzZXIuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAdXNlci5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.X96rmxauwRUJXUkGA22dt2jxm_Qa-r7S6Go_hdBKDwN8DQaapcX_C9zPXQwI4Z9QUGWTf408jUSjEC1FpDgJTJFbi0QxvGjdWqMEE4fLq9cCh18XgEbicZzBuI3141W3Aux7fGWyhLRrtpRdyS1kxW3URSa0HDjc4hlsvpZqYo3aXjwu1YRA9rnaFYdIMWynHIIaj4sXTos1AIf47kXmDdGFcxEipEFsJU8i4JfGpZ_49HBjdlkXUoA0iMuzNM1a3_G6Kji16DZuDeTlWPfvEbbydNvHVVBV8pTxguOmtUh8Pd59AMuL5SpH74b7czxycL2ztqWrQj6ERT_e88HOjQ'; 
  
    it('should retrieve all orders for the authenticated user', () => {
      // Create an order first to ensure the user has orders
      const newOrder = {
        items: [
          { productId: 'prod123', quantity: 2, price: 50 },
          { productId: 'prod124', quantity: 1, price: 100 },
        ],
        totalAmount: 200,
        status: 'pending',
      };
  
      // Create a new order
      cy.request({
        method: 'POST',
        url: '/orders', // Endpoint to create a new order
        headers: {
          'Authorization': `Bearer ${authToken}`, // Use Firebase token here
        },
        body: newOrder,
      }).then((createResponse) => {
        expect(createResponse.status).to.eq(201); // Ensure the order was created successfully
  
        // Now, retrieve all orders
        cy.request({
          method: 'GET',
          url: '/orders', // Endpoint to retrieve all orders
          headers: {
            'Authorization': `Bearer ${authToken}`, // Use Firebase token here
          },
        }).then((getResponse) => {
          // Verify the response contains the created order
          expect(getResponse.status).to.eq(200); // Check for successful retrieval
          expect(getResponse.body).to.be.an('array'); // Ensure the response is an array
          expect(getResponse.body).to.have.length.greaterThan(0); // Ensure at least one order exists
          expect(getResponse.body[0]).to.include({
            totalAmount: newOrder.totalAmount,
            status: newOrder.status,
          }); // Check the order details
        });
      });
    });
  
    it('should return 401 if the user is not authenticated', () => {
      // Make a GET request without authentication
      cy.request({
        method: 'GET',
        url: '/orders',
        failOnStatusCode: false, // Allow failed request to check error message
      }).then((response) => {
        expect(response.status).to.eq(401); // Expect an Unauthorized error
        expect(response.body).to.have.property('message', 'No token, authorization denied');
      });
    });
  });
  