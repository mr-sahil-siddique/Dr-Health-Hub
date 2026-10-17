// Run:  node generate-sitemap.js   (Node 18+)  -> writes sitemap.xml with ALL products
const SUPABASE_URL="https://fnyyhvqsmzcworwuhssq.supabase.co";
const KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZueXlodnFzbXpjd29yd3Voc3NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAzMjk4ODAsImV4cCI6MjEwNTkwNTg4MH0.QAJ-wDBIa9BFPD5BBEOVyTlW6EHOPk9P_cmX5FqsPvE";
const SITE="https://drhealthhub.store";
(async()=>{
  const r=await fetch(SUPABASE_URL+"/rest/v1/products?select=id&limit=5000",{headers:{apikey:KEY,Authorization:"Bearer "+KEY}});
  if(!r.ok)throw new Error("Supabase error "+r.status);
  const ids=(await r.json()).map(p=>p.id);
  const today=new Date().toISOString().slice(0,10);
  const urls=[`<url><loc>${SITE}/</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`]
    .concat(ids.map(id=>`<url><loc>${SITE}/product.html?id=${encodeURIComponent(id)}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`));
  require("fs").writeFileSync("sitemap.xml",`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
  console.log("sitemap.xml written with",urls.length,"URLs");
})();
