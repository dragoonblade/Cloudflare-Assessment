import {rewriter} from './src/scripts/rewrite'
import {getUrlFromCookie} from './src/scripts/cookie'
import {getRandomInt} from './src/scripts/cookie'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * @method handleRequest
 * @description Return the Rewritten HTML Page
 * @param {Request} request
 */
async function handleRequest(request) {
  let resp = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
  resp= await resp.json();
  const variants = resp['variants'];

  let url = getUrlFromCookie(request);
  if (!url) {  
    url = getRandomInt(1);
    // setUrlToCookie(request, url);
  }
  resp = await fetch(variants[url]);
  resp = await rewriter(resp, url).text();
  
  
  return new Response(resp, {
    headers: {
      'Content-type': 'text/html',
      'Set-Cookie': 'url=' + url + '; max-age=' + 7 * 24 * 60 * 60 + ';'  // persists for 1 week
    },
  })
}