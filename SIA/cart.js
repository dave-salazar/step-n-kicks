// Shared cart + pricing rules + small helpers. Include in <head> of every page that has the header:
// <script src="cart.js"></script>
// Cart lines are unique per product AND size.
(function(){
  var KEY='snk-cart-v2', MAX=10;
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}}
  function write(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}paint()}
  function count(){return read().reduce(function(s,i){return s+i.qty},0)}
  function same(a,b){return (a.id!=null&&b.id!=null?String(a.id)===String(b.id):a.n===b.n)&&+a.size===+b.size}
  function paint(){
    var n=count();
    document.querySelectorAll('.cartlnk .cn').forEach(function(b){b.textContent=n;b.classList.toggle('hide',!n)});
  }
  window.SNKCart={
    get:read,count:count,replace:write,
    add:function(item){
      var a=read();item.size=+item.size||9;item.qty=Math.min(MAX,item.qty||1);
      var f=a.filter(function(x){return same(x,item)})[0];
      if(f)f.qty=Math.min(MAX,f.qty+item.qty);else a.push(item);
      write(a);
    },
    setQty:function(i,q){var a=read();if(!a[i])return;if(q<=0)a.splice(i,1);else a[i].qty=Math.min(MAX,q);write(a)},
    setSize:function(i,s){
      var a=read();if(!a[i])return;a[i].size=+s;
      var j=a.findIndex(function(x,k){return k!==i&&same(x,a[i])});
      if(j>-1){a[j].qty=Math.min(MAX,a[j].qty+a[i].qty);a.splice(i,1)}
      write(a);
    },
    remove:function(i){var a=read();a.splice(i,1);write(a)},
    clear:function(){write([])}
  };
  // Pricing rules shown to the customer. The SERVER (place_order in supabase-setup.sql) is the source of truth: keep both in sync.
  window.SNKRules={FREE_OVER:5000,FEE:150,WELCOME:500,
    shipping:function(sub){return sub>=5000?0:150},
    welcome:function(sub,eligible){return eligible?Math.min(500,sub):0}};
  window.SNKEsc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]})};
  window.SNKLink=function(x){return x.id!=null?"product.html?id="+encodeURIComponent(x.id):"product.html?n="+encodeURIComponent(x.n)};
  var css=document.createElement('style');
  css.textContent='.cartlnk{position:relative;display:inline-block}'+
    '.cn{position:absolute;top:-7px;right:-10px;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:#1565c0;color:#fff;font:700 9px/16px Lato,Arial,sans-serif;text-align:center}'+
    '#toast{position:fixed;left:50%;bottom:24px;transform:translate(-50%,20px);background:#1565c0;color:#fff;padding:10px 18px;border-radius:8px;font:700 12px Lato,Arial,sans-serif;opacity:0;pointer-events:none;transition:.2s;z-index:60}'+
    '#toast.show{opacity:1;transform:translate(-50%,0)}'+
    'a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,[tabindex]:focus-visible{outline:2px solid #1565c0;outline-offset:2px}';
  document.head.appendChild(css);
  document.addEventListener('DOMContentLoaded',paint);
  window.addEventListener('storage',paint);
})();
