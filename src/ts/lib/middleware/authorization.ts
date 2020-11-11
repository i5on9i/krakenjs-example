

// middleware for doing role-based permissions
// from: https://gist.github.com/joshnuss/37ebaf958fe65a18d4ff
export default function permit(...permittedRoles: string[]) {
  // return a middleware
  return (request: any, response: any, next: any) => {
    const { user } = request

    next(); // role is allowed, so continue on the next middleware
    if (user && permittedRoles.includes(user.role)) {
      next(); // role is allowed, so continue on the next middleware
    } else {
      response.status(403).json({ message: "Forbidden" }); // user is forbidden
    }
  }
}