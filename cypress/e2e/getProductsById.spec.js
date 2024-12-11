describe('Retrieve Supplier Inventory Item by ID', () => {
  // Use the Firebase ID token directly in the test case (replace with a valid token)
  const authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJkMGFlMTRkMjhkMTY1NzhiMzFjOGJlNmM4ZmRlZDM0ZDVlMWExYzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3J5LW1nbXQtc3lzLWQyZTExIiwiYXVkIjoiaW52ZW50b3J5LW1nbXQtc3lzLWQyZTExIiwiYXV0aF90aW1lIjoxNzMzOTEyNTg1LCJ1c2VyX2lkIjoidFYxbXlna0diNlZ6MFdjMlVBM0FtTDFIV2I5MyIsInN1YiI6InRWMW15Z2tHYjZWejBXYzJVQTNBbUwxSFdiOTMiLCJpYXQiOjE3MzM5MTI1ODUsImV4cCI6MTczMzkxNjE4NSwiZW1haWwiOiJ0ZXN0QHVzZXIuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAdXNlci5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.X96rmxauwRUJXUkGA22dt2jxm_Qa-r7S6Go_hdBKDwN8DQaapcX_C9zPXQwI4Z9QUGWTf408jUSjEC1FpDgJTJFbi0QxvGjdWqMEE4fLq9cCh18XgEbicZzBuI3141W3Aux7fGWyhLRrtpRdyS1kxW3URSa0HDjc4hlsvpZqYo3aXjwu1YRA9rnaFYdIMWynHIIaj4sXTos1AIf47kXmDdGFcxEipEFsJU8i4JfGpZ_49HBjdlkXUoA0iMuzNM1a3_G6Kji16DZuDeTlWPfvEbbydNvHVVBV8pTxguOmtUh8Pd59AMuL5SpH74b7czxycL2ztqWrQj6ERT_e88HOjQ'; 
  
  let productId;

  it('should retrieve an existing supplier inventory item by ID', () => {
    const newProduct = {
      name: 'Product Y',
      sku: 'PY001',
      quantity: 80,
      price: 75,
      reorderPoint: 15,
      category: 'Electronics' // Ensure category is included
    };

    // Add a new product first
    cy.request({
      method: 'POST',
      url: '/inventory', // The endpoint to add product
      headers: {
        'Authorization': `Bearer ${authToken}`  // Use the Firebase token here
      },
      body: newProduct
    }).then((response) => {
      expect(response.status).to.eq(201); // Ensure the product was created
      productId = response.body._id; // Save the product ID for retrieval

      // Now retrieve the product by ID
      cy.request({
        method: 'GET',
        url: `/inventory/${productId}`, // Use the product ID in the URL
        headers: {
          'Authorization': `Bearer ${authToken}`  // Use the Firebase token here
        }
      }).then((getResponse) => {
        expect(getResponse.status).to.eq(200); // Ensure the product was retrieved successfully
        expect(getResponse.body).to.have.property('_id', productId);
        expect(getResponse.body).to.include({
          name: newProduct.name,
          sku: newProduct.sku,
          quantity: newProduct.quantity,
          price: newProduct.price,
          reorderPoint: newProduct.reorderPoint,
          category: newProduct.category // Validate that 'category' is included
        });
      });
    });
  });

  it('should return 404 for a non-existent product ID', () => {
    const fakeId = '612e3c4f4a3c2a1a1a1a1a1a'; // Example of a non-existent ObjectId

    cy.request({
      method: 'GET',
      url: `/inventory/${fakeId}`, // Attempt to fetch a non-existent product by ID
      headers: {
        'Authorization': `Bearer ${authToken}` // Use the Firebase token here
      },
      failOnStatusCode: false  // Allow failed request to check error message
    }).then((response) => {
      expect(response.status).to.eq(404); // Expect a 404 error for non-existent product
      expect(response.body).to.have.property('message', 'Product not found');
    });
  });
});
