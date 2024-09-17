// Client
const adminRoleName = ["Admin"];
const studentRoleName = ["Student"];
const staffRoleName = ["Dorm Staff", "Student Affairs"];

const appRoute = {
    landingPage: "/",
    login: "/login",
    logout: "/logout",
    
    studentRole: {
        homepageRoute: "/student/homepage",
        profileRoute: "/student/profile",
        changePassword: "/student/password",
        ticketListRoute: "/student/ticket"
    },

    adminRole: {
        homepageRoute: "/admin/homepage",
        profileRoute: "/admin/profile"
    },

    staffRole: {
        homepageRoute: "/staff/homepage",
        profileRoute: "/staff/profile",
    }
} 

// Server
const serverBaseUrl = "http://localhost:3000";
const apiEndpoint = {
    authenticateUserRoute: "/auth/login",
    logoutUserRoute: "/auth/logout",
    refreshTokenRoute: "/auth/refresh-token",
    verifyTokenRoute: "/auth/verify-token",
    verifyRefreshTokenRoute: "/auth/verify-refreshToken"
}


// HTTP Status Code definition for jwt token authentication/authorization
const unauthorizedHttpErrorCode = 403;      // server does not know the client, not valid refresh token 
const forbiddenHttpErrorCode = 401;         // server knows the client's identity, the refresh token is still valid

// HTTP Status Code definition for api response from the server
const badRequestHttpErrorCode = 400;
const internalServerHttpErrorCode = 500;



export default  {   
                    adminRoleName,
                    studentRoleName,
                    staffRoleName,
                    appRoute,
                    serverBaseUrl,
                    apiEndpoint,
                    unauthorizedHttpErrorCode, 
                    forbiddenHttpErrorCode,
                    badRequestHttpErrorCode,
                    internalServerHttpErrorCode,
                }
