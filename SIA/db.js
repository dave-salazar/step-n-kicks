// Shared Supabase helper. Include AFTER the supabase-js script:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
// <script src="db.js"></script>
// The publishable key is safe in browser code: Row Level Security (see ../supabase-setup.sql) decides who can do what.
(function(){
  var URL="https://gkpevwehuvmtebhezvvc.supabase.co",KEY="sb_publishable_QRCX-3fqe4n6dSBVK-hisA_RYwoA7fB";
  var client=null,base=null;
  try{client=window.supabase.createClient(URL,KEY)}catch(e){console.warn("Supabase not available",e)}

  function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]})}
  function here(){return (location.pathname.split("/").pop()||"shop.html")+location.search}
  function pht(iso){ // timestamptz -> "YYYY-MM-DDTHH:mm" in Philippine time
    var d=new Date(new Date(iso).getTime()+8*36e5),p=function(n){return String(n).padStart(2,"0")};
    return d.getUTCFullYear()+"-"+p(d.getUTCMonth()+1)+"-"+p(d.getUTCDate())+"T"+p(d.getUTCHours())+":"+p(d.getUTCMinutes());
  }
  function fromPht(s){return new Date(s+":00+08:00").toISOString()}
  async function uid(){var r=await client.auth.getUser();return r.data&&r.data.user?r.data.user.id:null}
  function ck(r){if(r.error)throw r.error;return r.data}

  window.SNKDB={
    client:client,ok:!!client,pht:pht,fromPht:fromPht,esc:esc,

    // ---- catalog ----
    fetchProducts:async function(){
      var r=await client.from("products").select("*").order("id",{ascending:true});
      return ck(r)||[];
    },
    fetchRatings:async function(){
      var r=await client.from("product_ratings").select("*"),m={};
      if(r.error)return m;(r.data||[]).forEach(function(x){m[String(x.product_id)]={avg:Number(x.avg_rating),n:x.review_count}});return m;
    },
    // Rebuilds the shop's product array P (in place) from database rows. Price, stock, name, brand, photo come from the database;
    // local extras (SVG fallback art, description text) in products.js are reused when the names match.
    applyToCatalog:function(P,rows,ratings){
      if(!base)base=P.slice();
      var norm=function(v){return String(v||"").trim().toLowerCase()};
      var items=rows.filter(function(r){return !r.status||r.status==="active"}).map(function(r){
        var old=base.filter(function(x){return norm(x.n)===norm(r.name)})[0]||{};
        var stock=r.stock==null?null:Number(r.stock),out=stock!=null&&stock<=0,low=stock!=null&&stock>0&&stock<=5;
        var cat=r.category?(r.category==="Sandals & clogs"?"Sandals & slides":r.category):(old.c||"Lifestyle");
        var sf=r.shop_for||"Unisex",g=sf==="Men"?"men":sf==="Women"?"women":(old.g||"men");
        var keep=old.tag==="Bestseller"?old.tag:undefined;
        var rt=ratings&&ratings[String(r.id)];
        var o={};for(var k in old)o[k]=old[k];
        o.id=r.id;o.n=r.name;o.p=Number(r.price);o.b=r.brand||old.b||"Step 'N Kicks";o.c=cat;o.g=g;o.d=old.d||"lo";
        o.m=r.colorway?sf+" • "+r.colorway:(old.m||"Unisex • Available now");
        o.img=r.image_url||old.img||"";o.desc=r.description||"";o.sku=r.sku||"";
        o.stock=stock;o.out=out;
        o.tag=out?"Sold out":low?"Only "+stock+" left":(r.release_class==="new"?"New arrival":keep);
        o.red=(out||low)?1:0;
        o.r=rt?rt.avg:null;o.rc=rt?rt.n:0;
        return o;
      }).filter(function(x){return x.n&&isFinite(x.p)});
      P.splice(0,P.length);Array.prototype.push.apply(P,items);
      return P;
    },

    // ---- auth ----
    session:async function(){var r=await client.auth.getSession();return r.data?r.data.session:null},
    // Returns the user, or sends the visitor to the login page (and back here afterwards).
    requireLogin:async function(next){
      if(!client)return null;
      var s=await this.session();if(s)return s.user;
      location.replace("index.html?next="+encodeURIComponent(next||here()));return null;
    },
    requireAdmin:async function(){
      if(!client)return false;
      var s=await this.session();if(!s)return false;
      var r=await client.rpc("is_admin");return r.data===true;
    },
    signUp:async function(email,pw,meta){
      return ck(await client.auth.signUp({email:email,password:pw,options:{data:meta||{},emailRedirectTo:location.origin+location.pathname.replace(/[^\/]*$/,"index.html")}}));
    },
    signIn:async function(email,pw){return ck(await client.auth.signInWithPassword({email:email,password:pw}))},
    signOut:async function(){try{await client.auth.signOut()}catch(e){}},
    resetPassword:async function(email){
      return ck(await client.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname.replace(/[^\/]*$/,"index.html")}));
    },
    setPassword:async function(pw){return ck(await client.auth.updateUser({password:pw}))},
    updateProfile:async function(meta){return ck(await client.auth.updateUser({data:meta}))},

    // ---- orders ----
    place:async function(items,method,customer){
      return ck(await client.rpc("place_order",{
        p_items:items.map(function(x){return {id:x.id==null?null:String(x.id),n:x.n,size:String(x.size||9),qty:x.qty||1}}),
        p_payment:method,p_customer:customer||{}}));
    },
    cancel:async function(id){ck(await client.rpc("cancel_order",{p_id:id}))},
    myOrders:async function(){return ck(await client.from("orders").select("*, order_items(*)").order("created_at",{ascending:false}))||[]},
    // PHP 500 first-order voucher: true when the signed-in customer has no non-cancelled order yet
    welcomeEligible:async function(){
      var s=await this.session();if(!s)return false;
      var r=await client.from("orders").select("id",{count:"exact",head:true}).neq("status","cancelled");
      return !r.error&&(r.count||0)===0;
    },

    // ---- saved addresses ----
    listAddresses:async function(){return ck(await client.from("addresses").select("*").order("is_default",{ascending:false}).order("created_at",{ascending:true}))||[]},
    saveAddress:async function(a){
      var row={label:a.label||null,full_name:a.full_name,phone:a.phone,address_line:a.address_line,city:a.city,province:a.province,postal_code:a.postal_code||null};
      if(a.id){ck(await client.from("addresses").update(row).eq("id",a.id));return a.id}
      row.user_id=await uid();var cur=await this.listAddresses();row.is_default=cur.length===0;
      return ck(await client.from("addresses").insert(row).select().single()).id;
    },
    deleteAddress:async function(id){ck(await client.from("addresses").delete().eq("id",id))},
    makeDefault:async function(id){
      var u=await uid();
      ck(await client.from("addresses").update({is_default:false}).eq("user_id",u));
      ck(await client.from("addresses").update({is_default:true}).eq("id",id));
    },

    // ---- reviews / alerts / contact ----
    reviews:async function(pid){return ck(await client.from("reviews").select("*").eq("product_id",String(pid)).order("created_at",{ascending:false}))||[]},
    canReview:async function(pid){
      var r=await client.from("order_items").select("order_id, orders!inner(status)").eq("product_id",String(pid)).eq("orders.status","delivered").limit(1);
      return !r.error&&(r.data||[]).length>0;
    },
    submitReview:async function(pid,rating,fit,comment,name){
      ck(await client.rpc("submit_review",{p_product_id:String(pid),p_rating:rating,p_fit:fit||null,p_comment:comment,p_public_name:name||null}));
    },
    deleteReview:async function(id){ck(await client.from("reviews").delete().eq("id",id))},
    notify:async function(pid){
      var s=await this.session(),r=await client.from("stock_alerts").insert({product_id:String(pid),user_id:s.user.id,email:s.user.email});
      if(r.error&&r.error.code!=="23505")throw r.error;
    },
    sendMessage:async function(m){ck(await client.from("contact_messages").insert(m))},

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

  // "Log out" links in the account area
  document.addEventListener("DOMContentLoaded",function(){
    document.querySelectorAll(".tab.out").forEach(function(a){
      a.addEventListener("click",async function(e){e.preventDefault();await window.SNKDB.signOut();location.href="index.html"});
    });
  });
})();
