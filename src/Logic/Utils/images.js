export function resolveImagePath(path) {
    if (path === null) {
        return '/images/defaultProfile.jpg'
    }

    return path !== null && !path.includes('/default')
    ? `${process.env.REACT_APP_SERVER_URL}${path}?${new Date().getTime()}` // Date used to ignore cached image after updating
    : path
}