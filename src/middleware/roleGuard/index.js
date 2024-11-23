export const roleGuard = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role

        if (roles.includes(userRole)) {
            next()
        } else {
            res.status(403).send("Permission Denied")
        }
    }
}


export const isCheked = () => {
  try {
    if (req.user.id = req.params.id) {
      next()
    } else {
      return res.status(403).send("Forbidden")
    }
  } catch (err) {
    next(err)
  }
}