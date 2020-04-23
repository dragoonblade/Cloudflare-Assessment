/**
 * @method getUrlFromCookie
 * @description Gets cookie from request header
 * @param {Request} req
 */
export const getUrlFromCookie = req => {
    let url = null;
    const cookieString = req.headers.get('Cookie')
    if (cookieString) {
        const cookies = cookieString.split(';')
        cookies.forEach(cookie => {
            const name = cookie.split('=')[0].trim()
            if (name === 'url') {
                const value = cookie.split('=')[1]
                url = value
            }
        })
    }
    return url;
}