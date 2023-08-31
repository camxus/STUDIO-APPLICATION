export const LOGIN = `
query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
    }
}
`;

export const CREATE_USER = `
mutation CreateUser(
    $email: String!,
    $password: String!
    $username: String!
    $attributes: AttributesInput
    ) {
        createUser(userInput: {
            email: $email,
            password: $password,
            username: $username
            attributes: $attributes
        }) 
        {
            _id
            email
        }
    }
`;

export const CHECK_USERNAME = `
    query checkUsernames($username: String!) {
        checkUsernames(username: $username)
    }
`;

export const CHECK_EMAIL = `
    query checkEmails($email: String!) {
        checkEmails(email: $email)
    }
`;
