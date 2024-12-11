describe('Add New Supplier Inventory Item', () => {
  // Use the Firebase ID token directly in the test case. This token is needed for authentication.
  const authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJkMGFlMTRkMjhkMTY1NzhiMzFjOGJlNmM4ZmRlZDM0ZDVlMWExYzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3J5LW1nbXQtc3lzLWQyZTExIiwiYXVkIjoiaW52ZW50b3J5LW1nbXQtc3lzLWQyZTExIiwiYXV0aF90aW1lIjoxNzMzOTEyNTg1LCJ1c2VyX2lkIjoidFYxbXlna0diNlZ6MFdjMlVBM0FtTDFIV2I5MyIsInN1YiI6InRWMW15Z2tHYjZWejBXYzJVQTNBbUwxSFdiOTMiLCJpYXQiOjE3MzM5MTI1ODUsImV4cCI6MTczMzkxNjE4NSwiZW1haWwiOiJ0ZXN0QHVzZXIuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAdXNlci5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.X96rmxauwRUJXUkGA22dt2jxm_Qa-r7S6Go_hdBKDwN8DQaapcX_C9zPXQwI4Z9QUGWTf408jUSjEC1FpDgJTJFbi0QxvGjdWqMEE4fLq9cCh18XgEbicZzBuI3141W3Aux7fGWyhLRrtpRdyS1kxW3URSa0HDjc4hlsvpZqYo3aXjwu1YRA9rnaFYdIMWynHIIaj4sXTos1AIf47kXmDdGFcxEipEFsJU8i4JfGpZ_49HBjdlkXUoA0iMuzNM1a3_G6Kji16DZuDeTlWPfvEbbydNvHVVBV8pTxguOmtUh8Pd59AMuL5SpH74b7czxycL2ztqWrQj6ERT_e88HOjQ'; 

  it('should add a new supplier inventory item successfully', () => {
    // Define a new product object with all required details for the inventory.
    const newProduct = {
      name: 'Product X',
      sku: 'PX002',
      quantity: 100,
      price: 50,
      reorderPoint: 20,
      category: 'Electronics'
    };

    // Send a POST request to the '/inventory' endpoint to add the new product.
    cy.request({
      method: 'POST',             // HTTP method for creating a resource
      url: '/inventory',          // URL to the API endpoint for adding an inventory item
      headers: {
        // Authorization header with Bearer token for secure access
        'Authorization': `Bearer ${authToken}`  
      },
      body: newProduct           // The body of the request includes the product details
    }).then((response) => {
      // Assert the response to ensure that the product is created successfully
      expect(response.status).to.eq(201);  // Expect HTTP status code 201 (Created)
      
      // Verify that the response body contains the same product details
      expect(response.body).to.include({
        name: newProduct.name,
        sku: newProduct.sku,
        quantity: newProduct.quantity,
        price: newProduct.price,
        reorderPoint: newProduct.reorderPoint,
        category: newProduct.category 
      });
    });
  });

  it('should fail to add a product with missing required fields', () => {
    // Define an invalid product object that misses some required fields
    const invalidProduct = {
      sku: 'PX002',    // SKU is provided
      quantity: 50     // Quantity is provided, but other required fields like 'name' are missing
    };

    // Send a POST request to add the invalid product
    cy.request({
      method: 'POST',
      url: '/inventory',
      headers: {
        // Pass the Bearer token for authentication
        'Authorization': `Bearer ${authToken}`
      },
      body: invalidProduct,           // Include the invalid product data
      failOnStatusCode: false         // Allow the request to fail so we can assert the error response
    }).then((response) => {
      // Assert that the server returns a 400 Bad Request status, which indicates a validation failure
      expect(response.status).to.eq(400);  
      
      // Check that the error message is included in the response body
      expect(response.body).to.have.property('message');
    });
  });
});
