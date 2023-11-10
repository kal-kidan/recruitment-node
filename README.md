 
### Carbon Certificates application API

The APIs contain endpoints:

1. Login
2. List of available Carbon certificates (_no owner_)
3. List of owned Carbon certificates (_owned by current user_)
4. Transfer my own Carbon certificate to the another existing user (_based on the User ID parameter_)

##### Data informations

**Carbon certificate**  contain the following data:

- Unique ID
- Country
- Status:
  - `available` (_no owner_)
  - `owned` (_owner is present and certificate hasn't been transferred_)
  - `transferred` (_owner is present and certificate has been transferred from one owner to another_)
- Owner (_relation to existing user, can be empty_)  
- Seeds are included with (_100 random certificates, 5 random users with certificates and 5 without them_)  
