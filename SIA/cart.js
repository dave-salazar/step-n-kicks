// Shared cart. Include in <head> of every page that has the header:
// <script src="cart.js"></script>
(function(){
  var KEY='snk-cart', MAX=10;
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}}
  function write(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}paint()}
  function count(){return read().reduce(function(s,i){return s+i.qty},0)}
  function paint(){
    var n=count();
    document.querySelectorAll('.cartlnk .cn').forEach(function(b){
      b.textContent=n;b.classList.toggle('hide',!n);
    });
  }
  window.SNKCart={
    get:read,count:count,
    add:function(item){
      var a=read(),f=a.filter(function(x){return x.n===item.n})[0];
      var q=item.qty||1;
      if(f){f.qty=Math.min(MAX,f.qty+q);if(item.size)f.size=item.size}
      else{item.qty=Math.min(MAX,q);item.size=item.size||9;a.push(item)}
      write(a);
    },
    setQty:function(i,q){var a=read();if(!a[i])return;if(q<=0)a.splice(i,1);else a[i].qty=Math.min(MAX,q);write(a)},
    setSize:function(i,s){var a=read();if(!a[i])return;a[i].size=+s;write(a)},
    remove:function(i){var a=read();a.splice(i,1);write(a)},
    clear:function(){write([])}
  };
  var css=document.createElement('style');
  css.textContent='.cartlnk{position:relative;display:inline-block}'+
    '.cn{position:absolute;top:-7px;right:-10px;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:#1565c0;color:#fff;font:700 9px/16px Lato,Arial,sans-serif;text-align:center}'+
    '#toast{position:fixed;left:50%;bottom:24px;transform:translate(-50%,20px);background:#1565c0;color:#fff;padding:10px 18px;border-radius:8px;font:700 12px Lato,Arial,sans-serif;opacity:0;pointer-events:none;transition:.2s;z-index:60}'+
    '#toast.show{opacity:1;transform:translate(-50%,0)}';
  document.head.appendChild(css);
  document.addEventListener('DOMContentLoaded',paint);
  window.addEventListener('storage',paint);
})();