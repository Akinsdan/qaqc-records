const C="qaqc-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html"])).catch(()=>{}));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const q=e.request,u=new URL(q.url);
 if(q.method!=="GET"||u.hostname.endsWith("supabase.co"))return;
 e.respondWith(fetch(q).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(q,c))}return r}).catch(()=>caches.match(q).then(m=>m||(q.mode==="navigate"?caches.match("./index.html"):undefined))))});
