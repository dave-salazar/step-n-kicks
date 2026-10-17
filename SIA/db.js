// Shared Supabase helper. Include AFTER the supabase-js script:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
// <script src="db.js"></script>
// The publishable key is safe in browser code. Row Level Security (see supabase-setup.sql) decides who can do what.
(function(){
  var URL="https://gkpevwehuvmtebhezvvc.supabase.co",KEY="sb_publishable_QRCX-3fqe4n6dSBVK-hisA_RYwoA7fB";
  var client=null,base=null;
  try{client=window.supabase.createClient(URL,KEY)}catch(e){console.warn("Supabase not available",e)}

  function pht(iso){ // timestamptz -> "YYYY-MM-DDTHH:mm" in Philippine time
    var d=new Date(new Date(iso).getTime()+8*36e5),p=function(n){return String(n).padStart(2,"0")};
    return d.getUTCFullYear()+"-"+p(d.getUTCMonth()+1)+"-"+p(d.getUTCDate())+"T"+p(d.getUTCHours())+":"+p(d.getUTCMinutes());
  }
  function fromPht(s){return new Date(s+":00+08:00").toISOString()}

  window.SNKDB={
    client:client,ok:!!client,pht:pht,fromPht:fromPht,

    fetchProducts:async function(){
      var r=await client.from("products").select("*").order("id",{ascending:true});
      if(r.error)throw r.error;return r.data||[];
    },

    // Rebuilds the shop's product array P (in place) from database rows. Stock, price, name, brand, etc. come from the database.
    // Local details (images, reviews, colors) in products.js are reused when the names match.
    applyToCatalog:function(P,rows){
      if(!base)base=P.slice();
      var norm=function(v){return String(v||"").trim().toLowerCase()};
      var items=rows.filter(function(r){return !r.status||r.status==="active"}).map(function(r){
        var old=base.filter(function(x){return norm(x.n)===norm(r.name)})[0]||{};
        var stock=r.stock==null?null:Number(r.stock),out=stock!=null&&stock<=0;
        var cat=r.category?(r.category==="Sandals & clogs"?"Sandals & slides":r.category):(old.c||"Lifestyle");
        var sf=r.shop_for||"Unisex",g=sf==="Men"?"men":sf==="Women"?"women":(old.g||"men");
        var tag=out?"Sold out":(stock!=null&&stock<=5?"Only "+stock+" left":(old.tag==="Sold out"?undefined:old.tag));
        var o={};for(var k in old)o[k]=old[k];
        o.id=r.id;o.n=r.name;o.p=Number(r.price);o.b=r.brand||old.b||"Step 'N Kicks";o.c=cat;o.g=g;
        o.m=r.colorway?sf+" • "+r.colorway:(old.m||"Unisex • Available now");
        o.r=old.r!=null?old.r:4.8;o.img=r.image_url||old.img||"";
        o.stock=stock;o.out=out;o.tag=tag;o.red=(out||(stock!=null&&stock<=5))?1:(tag===old.tag?old.red:0);
        return o;
      }).filter(function(x){return x.n&&isFinite(x.p)});
      P.splice(0,P.length);Array.prototype.push.apply(P,items);
      return P;
    },

    // Atomic checkout: the database subtracts the stock and refuses the order if anything is short.
    place:async function(items,method,ship,disc,customer){
      var r=await client.rpc("place_order",{
        p_items:items.map(function(x){return {id:x.id==null?null:String(x.id),n:x.n,size:String(x.size||9),qty:x.qty||1}}),
        p_payment:method,p_shipping:ship,p_discount:disc,p_customer:customer||{}
      });
      if(r.error)throw r.error;return r.data;
    },
    cancel:async function(id,token){var r=await client.rpc("cancel_order",{p_id:id,p_token:token});if(r.error)throw r.error},
    statuses:async function(ids){var r=await client.rpc("get_order_statuses",{p_ids:ids});if(r.error)throw r.error;return r.data||[]},

    requireAdmin:async function(){
      if(!client)return false;
      var s=await client.auth.getSession();if(!s.data||!s.data.session)return false;
      var r=await client.rpc("is_admin");return r.data===true;
    },

    // Calls fn when the tables change, and again when the tab becomes visible.
    watch:function(fn,tables){
      if(!client)return;var t;function d(){clearTimeout(t);t=setTimeout(fn,300)}
      try{
        var ch=client.channel("snk-live-"+Math.random().toString(36).slice(2));
        (tables||["products"]).forEach(function(tb){ch=ch.on("postgres_changes",{event:"*",schema:"public",table:tb},d)});
        ch.subscribe();
      }catch(e){}
      document.addEventListener("visibilitychange",function(){if(!document.hidden)fn()});
    }
  };
})();
