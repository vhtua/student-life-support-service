const appRoute = {
    landingPage: "/",
    login: "/login",
    logout: "/logout"
} 


const serverBaseUrl = "http://localhost:3000";
const apiEndpoint = {
    authenticateUserRoute: "/auth/login",
    logoutUserRoute: "/auth/logout",
    refreshTokenRoute: "/auth/refresh-token",
    verifyTokenRoute: "/auth/verify-token"
}


// HTTP Status Code definition for jwt token authentication/authorization
const unauthorizedHttpErrorCode = 403;      // server does not know the client, not valid refresh token 
const forbiddenHttpErrorCode = 401;         // server knows the client's identity, the refresh token is still valid

// HTTP Status Code definition for api response from the server
const badRequestHttpErrorCode = 400;
const internalServerHttpErrorCode = 500;



export default  {   
                    appRoute,
                    serverBaseUrl,
                    apiEndpoint,
                    unauthorizedHttpErrorCode, 
                    forbiddenHttpErrorCode,
                    badRequestHttpErrorCode,
                    internalServerHttpErrorCode,
                }
