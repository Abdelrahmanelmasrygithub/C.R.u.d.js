let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mode='create';
let tmp;
//get total
function gettotal () {
    if (price.value!='') {
        let res = (+price.value  +   +taxes.value  +  +ads.value )-  +discount.value

total.innerHTML=res;
total.style.background='green';

    }
else{

    total.innerHTML=''
    total.style.background='';
}
};
//create  product
let datapro;
if (localStorage.prd !=null) {
    datapro = JSON.parse(localStorage.prd)
}
else{
     datapro=[];
}



submit.onclick=function () {
    let datasa={

        title:title.value.toLowerCase(),
         price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
         total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    clear()
    showdata()
    if (mode==='create') {
        if (datasa.count>1) {
    for (let i = 0; i < datasa.count; i++) {
        
        datapro.push(datasa);
    }

}else{
    datapro.push(datasa);
}

    
    }else{
     datapro[ tmp ]=datasa;
count.style.display='block';
mode='create';
submit.innerHTML='create';    
}


// save local
localStorage.setItem('prd'  , JSON.stringify(datapro))

}

;
//clear inputs
function clear() {
   // total.style.background='';
 title.value='';
 price.value='';
  taxes.value='';
   discount.value='';
  total.innerHTML='';
  count.value='';
   category.value='';
ads.value='';

};
//read
function showdata() {
    gettotal()
let table='';
for (let i = 0; i < datapro.length; i++) {
    table+=`
    <tr>
    <td>${i} </td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}  </td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td> <button onclick='updatedata(${i})' id="update" >update</button>
    </td>
    <td><button onclick='deletedata(${i})' id="delete">delete</button></td>
    </tr>`

    }

document.getElementById('tbody').innerHTML=table;
let btndelete=document.getElementById('deletall');
if (datapro.length>1) {
    btndelete.innerHTML=`
    <button onclick='deleteall()' >delete All(${datapro.length})</button>
    `
}else{
    btndelete.innerHTML='';
}
}
showdata()
//delete
function deletedata(i) {
   console.log(i)
datapro.splice(i,1)
localStorage.prd=JSON.stringify(datapro)
showdata()
}

function deleteall() {
    localStorage.clear()
    datapro.splice(0)
    showdata()
}
    
//count




//update
function updatedata(i){
    title.value=datapro[i].title
    price.value=datapro[i].price
    taxes.value=datapro[i].taxes
    ads.value=datapro[i].ads
    discount.value=datapro[i].discount
    category.value=datapro[i].category
    gettotal()

    submit.innerHTML='UPDATE'
count.style.display='none'

mode='update';
tmp=i;
scroll({
    top:0,behavior:"smooth"
})
}

//search
let searchmod='title';
function getsearchmod(id){
    let searchh = document.getElementById('search');
    if (id == 'searchtitle') {
      searchmod='title';
      
      searchh.placeholder='search by title'
     
    }
else{
    searchmod='category';
    searchh.placeholder='search by category'
}


searchh.focus()
searchh.value='';
showdata()
}

function searchdata(value){
    let table='';
    if (searchmod=='title') {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value.toLowerCase())) {
                
                table+=`
                <tr>
                <td>${i} </td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}  </td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td> <button onclick='updatedata(${i})' id="update" >update</button>
                </td>
                <td><button onclick='deletedata(${i})' id="delete">delete</button></td>
                </tr>`; 
           
                
            }
            
        }




    }

    





    else{

        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].category.includes(value.toLowerCase())) {
                
                table+=`
                <tr>
                <td>${i} </td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}  </td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td> <button onclick='updatedata(${i})' id="update" >update</button>
                </td>
                <td><button onclick='deletedata(${i})' id="delete">delete</button></td>
                </tr>`; 
           
                
            }
            
        }



    }
    document.getElementById('tbody').innerHTML=table;
}

//clean data
