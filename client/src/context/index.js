// Client
const adminRoleName = ["Admin"];
const studentRoleName = ["Student"];
const staffRoleName = ["Dorm Staff", "Student Affairs"];
const allRoleName = [...adminRoleName, ...studentRoleName, ...staffRoleName];


const appFeature = [
    { name: 'Homepage', url: '/homepage' },
    { name: 'Profile', url: '/profile' },
    { name: 'Settings/Edit Profile', url: '/settings/edit-profile' },
    { name: 'Settings/Change Password', url: '/settings/change-password' },
]


const appRoute = {
    landingPage: "/",
    login: "/login",
    logout: "/logout",
    
    studentRole: {
        rootRoute: "/student",
        homepageRoute: "/student/homepage",
        profileRoute: "/student/profile",
        editProfileRoute: "/student/settings/edit-profile",
        changePasswordRoute: "/student/settings/change-password",
        ticketListRoute: "/student/ticket"
    },

    adminRole: {
        rootRoute: "/admin",
        homepageRoute: "/admin/homepage",
        profileRoute: "/admin/profile"
    },

    staffRole: {
        rootRoute: "/staff",
        homepageRoute: "/staff/homepage",
        profileRoute: "/staff/profile",
    }
} 

const googleCaptchaSiteKey = "6LdG0iMmAAAAAMc92UYnBUcVagNQQlaTIC3130BG";

// Server
const serverBaseUrl = "http://localhost:3000";
const apiEndpoint = {
    authenticateUserRoute: "/auth/login",
    logoutUserRoute: "/auth/logout",
    refreshTokenRoute: "/auth/refresh-token",
    verifyTokenRoute: "/auth/verify-token",
    verifyRefreshTokenRoute: "/auth/verify-refreshToken",

    userApi: {
        rootApi: `/api/v1/users`,
        changePasswordApi: "/api/v1/users/password",    // PATCH
        editProfileApi: "/api/v1/users/phone-number"         // PATCH
    },

    ticketApi: {
        rootApi: '/api/v1/tickets',  
    }
}


// HTTP Status Code definition for jwt token authentication/authorization
const unauthorizedHttpErrorCode = 403;      // server does not know the client, not valid refresh token 
const forbiddenHttpErrorCode = 401;         // server knows the client's identity, the refresh token is still valid

// HTTP Status Code definition for api response from the server
const badRequestHttpErrorCode = 400;
const internalServerHttpErrorCode = 500;



export default  {   
                    allRoleName,
                    adminRoleName,
                    studentRoleName,
                    staffRoleName,
                    appFeature,
                    appRoute,
                    googleCaptchaSiteKey,
                    serverBaseUrl,
                    apiEndpoint,
                    unauthorizedHttpErrorCode, 
                    forbiddenHttpErrorCode,
                    badRequestHttpErrorCode,
                    internalServerHttpErrorCode,
                }
