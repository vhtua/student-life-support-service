import context from "context";


function navigateToRoute(routeName) {
    const userRoleName = localStorage.getItem("roleName");

    if (context.studentRoleName.includes(userRoleName)) {
        return context.appRoute.studentRole.rootRoute + routeName;
    } else if (context.adminRoleName.includes(userRoleName)) {
        return context.appRoute.adminRole.rootRoute + routeName;
    } else if (!userRoleName) {
        return "/";
    }
    return `${context.appRoute.staffRole.rootRoute}${routeName}`;
}

// Example usage
// const route = navigateToRoute("/settings");
// console.log("Inside" + route);

export default navigateToRoute;