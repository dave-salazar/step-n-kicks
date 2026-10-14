// Shared product list. Used by shop.html and product.html.
// To use a real photo for a shoe, add img:"yourfile.png" to its line
const P=[
{n:"Mexico 66",img:"mexico66.png",b:"Onitsuka Tiger",c:"Lifestyle",g:"men",p:11100,col:"#f2b705",tag:"Bestseller",sz:6,m:"Unisex • Yellow / Black",r:4.8},
{n:"Samba OG",img:"sambaog.webp",d:"lo",a:"#111",s:"#d9b77e",b:"adidas",c:"Lifestyle",g:"men",p:7800,col:"#f4f4f4",sz:6,m:"Unisex • Cream / Black / Gum",r:4.8},
{n:"Chuck 70 High",img:"chck.webp",d:"hi",a:"#fff",s:"#f3efe0",b:"Converse",c:"Lifestyle",g:"women",p:4795,col:"#111",tag:"Bestseller",sz:7,m:"Unisex • White",r:4.7},
{n:"GEL-Kayano 20",img:"Gel_kayano20.webp",d:"run",a:"#c4c8cf",s:"#fff",b:"ASICS",c:"Running",g:"men",p:11498,col:"#555",tag:"New arrival",sz:5,m:"Men • Grey / Silver",r:4.9},
{n:"Boston Suede",img:"boston.webp",d:"clog",a:"#8a7358",s:"#c9a56b",b:"Birkenstock",c:"Sandals & slides",g:"women",p:11995,col:"#a38b72",sz:5,m:"Unisex • Taupe",r:4.7},
{n:"Luka 5",img:"luka5.jpg",d:"bb",a:"#fff",s:"#fff",b:"Jordan",c:"Basketball",g:"men",p:7395,col:"#1a237e",tag:"New arrival",sz:5,m:"Men • Black / Green",r:4.8},
{n:"Giannis Immortality 4 SP",img:"Giannis_immo.jpg",d:"bb",a:"#111",s:"#fff",b:"Nike",c:"Basketball",g:"men",p:4295,col:"#d8d8dc",sz:6,m:"Men • White / Black / Gold",r:4.7},
{n:"Dunk Low Retro",img:"dnklowretro.webp",d:"lo",a:"#fff",s:"#fff",b:"Nike",c:"Lifestyle",g:"men",p:6495,col:"#222",sz:6,m:"Unisex • Black / White",r:4.9},
{n:"Gazelle Indoor",img:"gaz_ind.webp",d:"lo",a:"#fff",s:"#d9b77e",b:"adidas",c:"Lifestyle",g:"women",p:6500,col:"#1b5e20",tag:"Sale",red:1,sz:7,m:"Women • Beige / White / Gum",r:4.7},
{n:"Mexico 66 SD",img:"mex66.webp",d:"lo",a:"#1a3a8a",s:"#fff",b:"Onitsuka Tiger",c:"Lifestyle",g:"women",p:12500,col:"#e8e2cf",sz:6,m:"Unisex • Cream / Yellow",r:4.8},
{n:"Kobe 11 Elite Prelite",img:"kobe11.webp",d:"bb",a:"#c9a227",s:"#c9a227",b:"Nike",c:"Basketball",g:"men",p:12999,col:"#1a1a1a",tag:"Sold out",red:1,out:1,sz:0,m:"Men • Black / Gold",r:4.9},
{n:"Arizona Birko-Flor",img:"birken.webp",d:"slide",a:"#6e3f17",s:"#c9a56b",b:"Birkenstock",c:"Sandals & slides",g:"men",p:5995,col:"#8d5524",sz:6,m:"Unisex • Tan",r:4.7}
];

// Product details and reviews shown on product.html.
// NOTE: descriptions and reviews below are sample content. Replace them with your real data.
const PD={
"Mexico 66":{d:"A retro runner-inspired classic with the signature Tiger stripes on a clean, low-profile upper.",f:["Signature Tiger stripes","Low-profile retro running shape","Lightweight for everyday wear"],
 rv:[["Mark A.",5,"Sep 2026","Looks even better in person. The yellow pops and it's light on foot."],["Jessa R.",5,"Aug 2026","Got so many compliments on the first day. Comfortable straight out of the box."],["Paolo D.",4,"Aug 2026","Great style. Runs a little snug, so consider sizing up if you have wide feet."]]},
"Samba OG":{d:"The terrace-born classic with a suede T-toe overlay, serrated 3-Stripes and a gum rubber outsole.",f:["Suede T-toe overlay","Gum rubber outsole","Slim, low-top profile"],
 rv:[["Carla M.",5,"Sep 2026","The cream and gum combo goes with everything. Very happy with it."],["Joaquin S.",5,"Sep 2026","Clean, classic and well made. Packaging arrived in perfect condition."],["Bea L.",4,"Jul 2026","Love the look. It needs a few wears to break in."]]},
"Chuck 70 High":{d:"A high-top Chuck with heavier canvas, a cushioned insole and the vintage-inspired details of the 1970s original.",f:["Heavier-weight canvas upper","Cushioned insole","Vintage-inspired midsole and heel patch"],
 rv:[["Rico T.",5,"Sep 2026","More comfortable than the regular Chucks. The cushioning makes a real difference."],["Angela V.",5,"Aug 2026","Exactly as pictured. Great quality for the price."],["Miguel C.",4,"Aug 2026","Solid pair. The high top takes a little getting used to."]]},
"GEL-Kayano 20":{d:"A retro running favorite revived with GEL cushioning and a stability-minded build.",f:["GEL cushioning in the heel","Breathable mesh upper with overlays","Stability-focused midsole"],
 rv:[["Trisha P.",5,"Sep 2026","Super comfy for long walks, and the grey and silver looks sharp."],["Dennis F.",5,"Aug 2026","Great cushioning. I wear them daily and they still feel fresh."],["Kath N.",5,"Jul 2026","Authentic and well packed. Fast delivery too."]]},
"Boston Suede":{d:"A slip-on suede clog with an adjustable strap and a contoured cork footbed.",f:["Soft suede upper","Contoured cork-latex footbed","Adjustable buckle strap"],
 rv:[["Mark A.",5,"Sep 2026","So easy to slip on. The footbed molds to your foot after a week."],["Jessa R.",4,"Aug 2026","Lovely taupe color. A bit stiff at first but it gets better."],["Carla M.",5,"Jul 2026","My go-to pair for the house and quick errands."]]},
"Luka 5":{d:"Jordan's signature basketball shoe, built for quick changes of direction and a low-to-the-ground feel.",f:["Low-cut court design","Breathable mesh upper","Grippy rubber outsole"],
 rv:[["Joaquin S.",5,"Sep 2026","Great traction on indoor courts. The green is wild in the best way."],["Rico T.",5,"Sep 2026","Responsive and lightweight. Perfect for guards."],["Bea L.",4,"Aug 2026","Excellent on court. Needs a short break-in period."]]},
"Giannis Immortality 4 SP":{d:"A value-friendly Nike hoops shoe with a roomy, bouncy feel for all-court play.",f:["Cushioned midsole for impact","Breathable upper","Durable outsole with traction pattern"],
 rv:[["Angela V.",5,"Sep 2026","Great value. Plenty of cushioning for the price."],["Paolo D.",4,"Aug 2026","Comfortable and stable. The white shows dirt quickly."],["Dennis F.",5,"Aug 2026","Bought for weekend games, and it's been solid."]]},
"Dunk Low Retro":{d:"The '80s basketball icon in a clean black and white colorway for everyday wear.",f:["Classic two-tone panel build","Padded low-cut collar","Durable rubber cupsole"],
 rv:[["Kath N.",5,"Sep 2026","The panda colorway is a classic for a reason. Goes with anything."],["Miguel C.",5,"Aug 2026","Authentic, with clean stitching and good packaging."],["Trisha P.",5,"Aug 2026","My second pair. Comfortable all day."]]},
"Gazelle Indoor":{d:"A suede low-top with a gum sole and the classic 3-Stripes, inspired by indoor training shoes.",f:["Soft suede upper","Gum rubber outsole","Classic 3-Stripes"],
 rv:[["Carla M.",5,"Sep 2026","The beige is a lovely neutral. Soft suede and very comfy."],["Mark A.",4,"Aug 2026","Great look. Be careful in wet weather, since suede marks easily."],["Bea L.",5,"Jul 2026","Light and easy to style. Worth the sale price."]]},
"Mexico 66 SD":{d:"A special-edition take on the Mexico 66 in cream with yellow Tiger stripes.",f:["Cream upper with yellow Tiger stripes","Low-profile retro shape","Special-edition colorway"],
 rv:[["Jessa R.",5,"Sep 2026","The cream and yellow is so fresh. Feels premium."],["Rico T.",5,"Aug 2026","Gorgeous pair and true to the original shape."],["Joaquin S.",4,"Aug 2026","Beautiful, though pricey. Comfortable from day one."]]},
"Kobe 11 Elite Prelite":{d:"A low-top performance basketball shoe with a knit upper and a gold Swoosh. Currently sold out.",f:["Low-top knit upper","Gold Swoosh accent","Court-ready cushioning"],
 rv:[["Dennis F.",5,"Aug 2026","Fits like a sock and looks incredible in black and gold."],["Angela V.",5,"Jul 2026","Best hoops shoe I've owned. Wish I'd bought two."],["Paolo D.",5,"Jun 2026","Worth every peso. Great court feel."]]},
"Arizona Birko-Flor":{d:"A two-strap sandal with adjustable buckles and a contoured footbed.",f:["Birko-Flor upper","Contoured cork-latex footbed","Adjustable buckles"],
 rv:[["Miguel C.",5,"Sep 2026","Comfortable right away and easy to clean."],["Kath N.",4,"Aug 2026","Great everyday sandal. The footbed is firm, so give it a week."],["Trisha P.",5,"Aug 2026","Perfect for the Manila heat."]]}
};