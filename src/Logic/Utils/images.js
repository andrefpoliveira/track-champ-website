export function resolveImagePath(path) {
    return !path.includes('/default')
    ? `${process.env.REACT_APP_SERVER_URL}${path}?${new Date().getTime()}` // Date used to ignore cached image after updating
    : path
}