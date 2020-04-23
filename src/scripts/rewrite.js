/**
 * @class
 * @description Rewrite HTML of response body using HTML Rewriter
 */

class Handler {
    constructor(content, attribute = '') {
        this.content = content
        this.attribute = attribute
    }

    element(element) {
        if (this.attribute) {
            element.setAttribute(this.attribute, this.content);
        } else {
            element.setInnerContent(this.content);
        }
    }
}

/**
 * @method rewriter
 * @description Rewrite HTML
 * @param {Response} response
 * @param {number} index
 */
export const rewriter = (response, index) => {
    const description = ["Visit my LinkedIn Profile", "Visit my Github Repository"]
    const links = ["https://www.linkedin.com/in/sbhardwaj96/", "https://github.com/dragoonblade/Cloudflare-Assessment"]

    return new HTMLRewriter()
        .on('title', new Handler("Shubham Bhardwaj's Assessment"))
        .on('h1#title', new Handler("Thanks for visiting my Assessment"))
        .on('p#description', new Handler("Hope to be working with you soon"))
        .on('a#url', new Handler(description[index]))
        .on('a#url', new Handler(links[index], 'href'))
        .transform(response)
}
