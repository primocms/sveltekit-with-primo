import axios from 'axios'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ resolve, event }) {
  const response = await resolve(event);

  const repo = 'mateomorris/primocms.org'

  const allowlist = [
    'index',
    'themes',
    'cloud',
  ]
  const blocklist = [
    'app'
  ]

  const [ page = 'index', child ] = event.url.pathname.split('/').filter(Boolean)

  if (!blocklist.includes(page)) {

    // Serve JS modules
    if (page === '_module.js' || child === '_module.js') {
      const res = await axios.get(`https://raw.githubusercontent.com/${repo}/main/${ child ? `${page}/_module.js` : `_module.js`}`)
      return new Response(res.data ||  '', {
        headers: {  
          'Content-Type': 'text/javascript;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      })
    } 
    // Serve Primo site file
    else if (page === 'primo.json') { 
      const res = await axios.get(`https://raw.githubusercontent.com/${repo}/main/primo.json`)
      return new Response(JSON.stringify(res.data) ||  '{}', {
        headers: {  
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      })
    } 
    // Serve HTML page
    else {
      const res = await axios.get(`https://raw.githubusercontent.com/${repo}/main/${ page === 'index' ? `index.html` : `${page}/index.html`}`)
      return new Response(res.data ||  'failed', {
        headers: {  
          'Content-Type': 'text/html;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

  }

  if(event.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  response.headers.append('Access-Control-Allow-Origin', `*`);

  return response;
};