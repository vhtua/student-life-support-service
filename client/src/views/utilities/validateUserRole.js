import context from "context";

function navigateRouteByUserRole(userRoleName) {
    if (context.studentRoleName.includes(userRoleName)) {
        return context.appRoute.studentRole.homepageRoute;
    } else if (context.adminRoleName.includes(userRoleName)) {
        return context.appRoute.adminRole.homepageRoute;
    }
    return context.appRoute.staffRole.homepageRoute;
}

export default { navigateRouteByUserRole };