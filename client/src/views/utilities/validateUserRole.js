import context from "context";

function navigateRouteByUserRole(userRoleName) {
    if (context.studentRoleName.includes(userRoleName)) {
        return context.appRoute.studentRole.dashboardRoute;
    } else if (context.adminRoleName.includes(userRoleName)) {
        return context.appRoute.adminRole.dashboardRoute;
    }
    return context.appRoute.staffRole.dashboardRoute;
}

export default { navigateRouteByUserRole };