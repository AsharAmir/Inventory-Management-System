describe('Delete Supplier Inventory Item', () => {
  // Firebase ID token used for authentication in the API requests.
  const authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJkMGFlMTRkMjhkMTY1NzhiMzFjOGJlNmM4ZmRlZDM0ZDVlMWExYzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3J5LW1nbXQtc3lzLWQyZTExIiwiYXVkIjoiaW52ZW50b3J5LW1nbXQtc3lzLWQyZTExIiwiYXV0aF90aW1lIjoxNzMzOTEyNTg1LCJ1c2VyX2lkIjoidFYxbXlna0diNlZ6MFdjMlVBM0FtTDFIV2I5MyIsInN1YiI6InRWMW15Z2tHYjZWejBXYzJVQTNBbUwxSFdiOTMiLCJpYXQiOjE3MzM5MTI1ODUsImV4cCI6MTczMzkxNjE4NSwiZW1haWwiOiJ0ZXN0QHVzZXIuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAdXNlci5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.X96rmxauwRUJXUkGA22dt2jxm_Qa-r7S6Go_hdBKDwN8DQaapcX_C9zPXQwI4Z9QUGWTf408jUSjEC1FpDgJTJFbi0QxvGjdWqMEE4fLq9cCh18XgEbicZzBuI3141W3Aux7fGWyhLRrtpRdyS1kxW3URSa0HDjc4hlsvpZqYo3aXjwu1YRA9rnaFYdIMWynHIIaj4sXTos1AIf47kXmDdGFcxEipEFsJU8i4JfGpZ_49HBjdlkXUoA0iMuzNM1a3_G6Kji16DZuDeTlWPfvEbbydNvHVVBV8pTxguOmtUh8Pd59AMuL5SpH74b7czxycL2ztqWrQj6ERT_e88HOjQ'; 
  
  // Variable to store the product ID for deletion later
  let productId;

  it('should delete an existing supplier inventory item successfully', () => {
    // Define a new product to be added to the inventory
    const newProduct = {
      name: 'Product Z',
      sku: 'PZ001',
      quantity: 60,
      price: 90,
      reorderPoint: 10,
      category: 'Electronics'
    };

    // Step 1: Add a new product to the inventory
    cy.request({
      method: 'POST',               // POST method to add a new product
      url: '/inventory',            // URL endpoint for adding products to inventory
      headers: {
        'Authorization': `Bearer ${authToken}`  // Pass the Firebase token for authentication
      },
      body: newProduct             // The product details sent in the request body
    }).then((response) => {
      // Step 2: Verify that the product was successfully created
      expect(response.status).to.eq(201);  // Ensure the response status is 201 (created)
      productId = response.body._id;      // Store the product ID from the response for deletion later

      // Step 3: Delete the newly added product using the product ID
      cy.request({
        method: 'DELETE',              // DELETE method to remove the product
        url: `/inventory/${productId}`,  // URL with the product ID for specific deletion
        headers: {
          'Authorization': `Bearer ${authToken}`  // Pass the Firebase token for authentication
        }
      }).then((deleteResponse) => {
        // Step 4: Verify that the product deletion was successful
        expect(deleteResponse.status).to.eq(200);  // The status should be 200 (OK)
        expect(deleteResponse.body).to.have.property('message', 'Product deleted'); // The response should confirm deletion

        // Step 5: Try to retrieve the deleted product to confirm it's no longer available
        cy.request({
          method: 'GET',                // GET method to attempt retrieving the product
          url: `/inventory/${productId}`,  // URL with the deleted product ID
          headers: {
            'Authorization': `Bearer ${authToken}`  // Pass the Firebase token for authentication
          },
          failOnStatusCode: false        // Allow failed request to check error response
        }).then((getResponse) => {
          // Step 6: Check the response for the non-existence of the deleted product
          expect(getResponse.status).to.eq(404); // 404 status indicates the product was not found
          expect(getResponse.body).to.have.property('message', 'Product not found'); // The response should say the product does not exist
        });
      });
    });
  });

  it('should return 404 when trying to delete a non-existent product', () => {
    // Define a fake product ID that does not exist in the database
    const fakeId = '612e3c4f4a3c2a1a1a1a1a1a';  // Example of a non-existent ObjectId

    // Attempt to delete the non-existent product by passing the fake ID
    cy.request({
      method: 'DELETE',              // DELETE method to attempt deletion
      url: `/inventory/${fakeId}`,   // Use the fake ID in the URL
      headers: {
        'Authorization': `Bearer ${authToken}`  // Pass the Firebase token for authentication
      },
      failOnStatusCode: false         // Allow failed request to check error response
    }).then((response) => {
      // Verify that attempting to delete a non-existent product results in a 404 error
      expect(response.status).to.eq(404);  // Expect 404 status (not found)
      expect(response.body).to.have.property('message', 'Product not found'); // Ensure the error message is as expected
    });
  });
});
