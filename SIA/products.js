// Shared product list. Used by shop.html and product.html.
// To use a real photo for a shoe, add img:"yourfile.png" to its line
const P=[
{n:"Mexico 66",img:"mex66-main.webp",b:"Onitsuka Tiger",c:"Lifestyle",g:"men",p:11100,col:"#f2b705",tag:"Bestseller",sz:6,m:"Unisex • Yellow / Black"},
{n:"Samba OG",img:"sambaog.webp",d:"lo",a:"#111",s:"#d9b77e",b:"adidas",c:"Lifestyle",g:"men",p:7800,col:"#f4f4f4",sz:6,m:"Unisex • Cream / Black / Gum"},
{n:"Chuck 70 High",img:"chck.webp",d:"hi",a:"#fff",s:"#f3efe0",b:"Converse",c:"Lifestyle",g:"women",p:4795,col:"#111",tag:"Bestseller",sz:7,m:"Unisex • White"},
{n:"GEL-Kayano 20",img:"gel_kayano20.webp",d:"run",a:"#c4c8cf",s:"#fff",b:"ASICS",c:"Running",g:"men",p:11498,col:"#555",tag:"New arrival",sz:5,m:"Men • Grey / Silver"},
{n:"Boston Suede",img:"boston.webp",d:"clog",a:"#8a7358",s:"#c9a56b",b:"Birkenstock",c:"Sandals & slides",g:"women",p:11995,col:"#a38b72",sz:5,m:"Unisex • Taupe"},
{n:"Luka 5",img:"luka5.jpg",d:"bb",a:"#fff",s:"#fff",b:"Jordan",c:"Basketball",g:"men",p:7395,col:"#1a237e",tag:"New arrival",sz:5,m:"Men • Black / Green"},
{n:"Giannis Immortality 4 SP",img:"giannis_immo.jpg",d:"bb",a:"#111",s:"#fff",b:"Nike",c:"Basketball",g:"men",p:4295,col:"#d8d8dc",sz:6,m:"Men • White / Black / Gold"},
{n:"Dunk Low Retro",img:"dnklowretro.webp",d:"lo",a:"#fff",s:"#fff",b:"Nike",c:"Lifestyle",g:"men",p:6495,col:"#222",sz:6,m:"Unisex • Black / White"},
{n:"Gazelle Indoor",img:"gaz_ind.webp",d:"lo",a:"#fff",s:"#d9b77e",b:"adidas",c:"Lifestyle",g:"women",p:6500,col:"#1b5e20",sz:7,m:"Women • Beige / White / Gum"},
{n:"Mexico 66 SD",img:"mex66.webp",d:"lo",a:"#1a3a8a",s:"#fff",b:"Onitsuka Tiger",c:"Lifestyle",g:"women",p:12500,col:"#e8e2cf",sz:6,m:"Unisex • Cream / Yellow"},
{n:"Kobe 11 Elite Prelite",img:"kobe11.webp",d:"bb",a:"#c9a227",s:"#c9a227",b:"Nike",c:"Basketball",g:"men",p:12999,col:"#1a1a1a",tag:"Sold out",red:1,out:1,sz:0,m:"Men • Black / Gold"},
{n:"Arizona Birko-Flor",img:"birken.webp",d:"slide",a:"#6e3f17",s:"#c9a56b",b:"Birkenstock",c:"Sandals & slides",g:"men",p:5995,col:"#8d5524",sz:6,m:"Unisex • Tan"}
];

// Product details and reviews shown on product.html.
// Product descriptions/features shown on product.html (fallback text is used for products not listed here).
const PD={
"Mexico 66":{d:"A retro runner-inspired classic with the signature Tiger stripes on a clean, low-profile upper.",f:["Signature Tiger stripes","Low-profile retro running shape","Lightweight for everyday wear"]},
"Samba OG":{d:"The terrace-born classic with a suede T-toe overlay, serrated 3-Stripes and a gum rubber outsole.",f:["Suede T-toe overlay","Gum rubber outsole","Slim, low-top profile"]},
"Chuck 70 High":{d:"A high-top Chuck with heavier canvas, a cushioned insole and the vintage-inspired details of the 1970s original.",f:["Heavier-weight canvas upper","Cushioned insole","Vintage-inspired midsole and heel patch"]},
"GEL-Kayano 20":{d:"A retro running favorite revived with GEL cushioning and a stability-minded build.",f:["GEL cushioning in the heel","Breathable mesh upper with overlays","Stability-focused midsole"]},
"Boston Suede":{d:"A slip-on suede clog with an adjustable strap and a contoured cork footbed.",f:["Soft suede upper","Contoured cork-latex footbed","Adjustable buckle strap"]},
"Luka 5":{d:"Jordan's signature basketball shoe, built for quick changes of direction and a low-to-the-ground feel.",f:["Low-cut court design","Breathable mesh upper","Grippy rubber outsole"]},
"Giannis Immortality 4 SP":{d:"A value-friendly Nike hoops shoe with a roomy, bouncy feel for all-court play.",f:["Cushioned midsole for impact","Breathable upper","Durable outsole with traction pattern"]},
"Dunk Low Retro":{d:"The '80s basketball icon in a clean black and white colorway for everyday wear.",f:["Classic two-tone panel build","Padded low-cut collar","Durable rubber cupsole"]},
"Gazelle Indoor":{d:"A suede low-top with a gum sole and the classic 3-Stripes, inspired by indoor training shoes.",f:["Soft suede upper","Gum rubber outsole","Classic 3-Stripes"]},
"Mexico 66 SD":{d:"A special-edition take on the Mexico 66 in cream with yellow Tiger stripes.",f:["Cream upper with yellow Tiger stripes","Low-profile retro shape","Special-edition colorway"]},
"Kobe 11 Elite Prelite":{d:"A low-top performance basketball shoe with a knit upper and a gold Swoosh. Currently sold out.",f:["Low-top knit upper","Gold Swoosh accent","Court-ready cushioning"]},
"Arizona Birko-Flor":{d:"A two-strap sandal with adjustable buckles and a contoured footbed.",f:["Birko-Flor upper","Contoured cork-latex footbed","Adjustable buckles"]}
};