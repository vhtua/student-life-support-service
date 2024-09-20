import context from "context";
import { func } from "prop-types";

// Example: validateUserRole.navigateRouteByUserRole(localStorage.getItem("roleName")
function navigateRouteByUserRole(userRoleName) {
    if (context.studentRoleName.includes(userRoleName)) {
        return context.appRoute.studentRole.homepageRoute;
    } else if (context.adminRoleName.includes(userRoleName)) {
        return context.appRoute.adminRole.homepageRoute;
    } else if (!userRoleName) {
        return "/";
    }
    return context.appRoute.staffRole.homepageRoute;
}

export default { navigateRouteByUserRole };