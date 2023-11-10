 
### Carbon Certificates application API

Create the API containing endpoints:

1. Login
2. List of available Carbon certificates (_no owner_)
3. List of owned Carbon certificates (_owned by current user_)
4. Transfer my own Carbon certificate to the another existing user (_based on the User ID parameter_)

##### Data informations

**Carbon certificate** should contain the following data:

- Unique ID
- Country
- Status:
  - `available` (_no owner_)
  - `owned` (_owner is present and certificate hasn't been transferred_)
  - `transferred` (_owner is present and certificate has been transferred from one owner to another_)
- Owner (_relation to existing user, can be empty_)

##### Requirements

- Application should be written with strong typing (_TypeScript_)
- Framework is free of choice
- Authentication should be implemented (_type/package if free of choice_)
- Seeds should be included (_100 random certificates, 5 random users with certificates and 5 without them_)
- Tests have to be included

### Good luck!
