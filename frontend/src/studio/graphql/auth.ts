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
    $attributes: AttributesInput
    ) {
        createUser(userInput: {
            email: $email,
            password: $password,
            attributes: $attributes
        }) 
        {
            _id
            email
        }
    }
`;
