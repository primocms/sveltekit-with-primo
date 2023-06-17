import axios from 'axios'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ resolve, event }) {
  const response = await resolve(event);

  const repo = 'mateomorris/primocms.org'
  const primo_pages = [
    'themes',
    'cloud',
  ]

  const [ page, child ] = event.url.pathname.split('/').filter(Boolean)

  if (primo_pages.includes(page)) {

    if (page === '_module.js' || child === '_module.js') {
      const res = await axios.get(`https://raw.githubusercontent.com/mateomorris/primocms.org/main/${ child ? `${page}/_module.js` : `_module.js`}`)
      return new Response(res.data ||  'no preview found', {
        headers: {  
          'Content-Type': 'text/javascript;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      })
    } else {
      const res = await axios.get(`https://raw.githubusercontent.com/mateomorris/primocms.org/main/${ page ?  `${page}/index.html` : `index.html`}`)
      return new Response(res.data ||  'no preview found', {
        headers: {  
          'Content-Type': 'text/html;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }


    // const {data:file} = await supabaseAdmin.storage.from('sites').download(`${site.id}/${page.id}/index.html`)
    

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