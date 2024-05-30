import Cookies from 'js-cookie';
let baseURL;
if (process.env.NODE_ENV == 'production') {
  baseURL = 'https://adminplayer.sohatv.vn';
} else if (process.env.NODE_ENV == 'development') {

  baseURL ='http://localhost:80'
} else {
    baseURL = 'http://localhost:80';

}
const handleResult = (data) => {
  return data;
};

const fetchRequest = (url, configExtend, method, data) => {
  const promise = new Promise((resolve, reject) => {
    url = `${baseURL}${url}`;
    let config;
    if (method === 'GET' || method === 'DELETE') {
      config = {
        method,
        // credentials: 'include',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Headers': 'Access-Control-Allow-Origin, Authorization, Content-Type',
          'Content-Type': 'application/json',
        }
      };
    } else {
      config = {
        method,
        // credentials: 'include',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Headers': 'Access-Control-Allow-Origin, Authorization, Content-Type',
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify(data)
      };
    }

    if (Cookies.get('user')) {
      if (configExtend) {
       
        config.headers = {
          ...config.headers,
          ...configExtend,
          authorization: `Bearer ${Cookies.get('user')}`
        };
      } else {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${Cookies.get('user')}`
        };
      }
    }

    fetch(url, config)
      .then((response) => response.json())
      .then((data) => {
        if(data?.status==403 || data?.status ==401){
           window.location.href='/login'
        }else{

          resolve(handleResult(data));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};

const ApiClient = {
  get: (url, payload, config) => fetchRequest(url, config, 'GET', payload),
  post: (url, payload, config) => fetchRequest(url, config, 'POST', payload),
  put: (url, payload, config) => fetchRequest(url, config, 'PUT', payload),
  path: (url, payload, config) => fetchRequest(url, config, 'PATH', payload),
  delete: (url, payload, config) => fetchRequest(url, config, 'DELETE', payload)
};

export {ApiClient} ;
