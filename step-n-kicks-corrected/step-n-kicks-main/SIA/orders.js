// Shared orders store. Include in <head> of every page that reads or places orders:
// <script src="orders.js"></script>
// Orders are kept in localStorage on this device. Replace read()/write() with your backend when it is ready.
(function(){
  var KEY='snk-orders';
  // Sample orders shown the first time (before the customer has placed any).
  var SEED=[
    {id:'SNK-482915',date:'2026-10-05T10:24:00',status:'shipped',method:'cod',ship:150,disc:500,total:7450,
     items:[{n:'Samba OG',b:'adidas',img:'sambaog.webp',d:'lo',a:'#111',s:'#d9b77e',col:'#f4f4f4',m:'Unisex • Cream / Black / Gum',p:7800,size:9,qty:1}]},
    {id:'SNK-310276',date:'2026-09-18T15:02:00',status:'delivered',method:'gcash',ship:150,disc:500,total:7045,
     items:[{n:'Luka 5',b:'Jordan',img:'luka5.jpg',d:'bb',a:'#fff',s:'#fff',col:'#1a237e',m:'Men • Black / Green',p:7395,size:9,qty:1}]}
  ];
  function read(){
    try{
      var r=localStorage.getItem(KEY);
      if(r===null){localStorage.setItem(KEY,JSON.stringify(SEED));return JSON.parse(JSON.stringify(SEED))}
      return JSON.parse(r)||[];
    }catch(e){return JSON.parse(JSON.stringify(SEED))}
  }
  function write(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}}
  function newId(list){
    var id;do{id='SNK-'+Math.floor(100000+Math.random()*900000)}while(list.some(function(o){return o.id===id}));
    return id;
  }
  window.SNKOrders={
    get:read,
    isActive:function(o){return o.status==='processing'||o.status==='shipped'},
    // o: {items, method, total, ship, disc}
    add:function(o){
      var list=read();
      var order={
        id:newId(list),date:new Date().toISOString(),status:'processing',
        method:o.method||'cod',ship:o.ship||0,disc:o.disc||0,total:o.total,
        items:o.items.map(function(x){
          return {n:x.n,b:x.b,img:x.img||'',d:x.d||'',a:x.a||'',s:x.s||'',col:x.col||'',m:x.m,p:x.p,size:x.size||9,qty:x.qty||1};
        })
      };
      list.unshift(order);write(list);
      return order;
    },
    setStatus:function(id,status){
      var list=read();
      list.forEach(function(o){if(o.id===id)o.status=status});
      write(list);
    }
  };
})();