/* Estúdio Avatar 6.4: cache somente do aplicativo; nunca armazenar mídia/chaves de APIs */
const CACHE='estudio-avatar-shell-v6.4';
const SHELL=['./','./index.html','./manifest.json','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()).catch(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',e=>{
  const r=e.request, u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==self.location.origin) return;
  e.respondWith(fetch(r).then(res=>{
    if(res.ok && SHELL.some(p=>new URL(p,self.registration.scope).pathname===u.pathname)){
      const cloned=res.clone(); e.waitUntil(caches.open(CACHE).then(c=>c.put(r,cloned)));
    }
    return res;
  }).catch(()=>caches.match(r).then(c=>c|| (r.mode==='navigate'?caches.match('./index.html'):Response.error()))));
});
