let allBooks=[];
async function load(){
 try{
  let r=await fetch('/api/rfid');
  allBooks=await r.json();
  render(allBooks);
 }catch(e){}
}
function render(books){
 document.getElementById('total').innerText=books.length;
 document.getElementById('dispo').innerText=books.filter(b=>b.status=='disponible').length;
 document.getElementById('empr').innerText=books.filter(b=>b.status!='disponible').length;
 if(!books.length){document.getElementById('empty').style.display='block';document.getElementById('books').innerHTML='';return;}
 document.getElementById('empty').style.display='none';
 document.getElementById('books').innerHTML=books.slice().reverse().map(b=>`
  <div class="card">
   <div><h3>${b.title}</h3><small>${b.author||''} • ${b.uid}</small><br><small style="color:#bbb">${b.lastScan}</small></div>
   <span class="badge ${b.status=='disponible'?'dispo':'emprunte'}">${b.status}</span>
  </div>`).join('');
}
function filterBooks(){
 let q=document.getElementById('search').value.toLowerCase();
 render(allBooks.filter(b=>b.title.toLowerCase().includes(q)||b.uid.toLowerCase().includes(q)));
}
load(); setInterval(load,2000);
