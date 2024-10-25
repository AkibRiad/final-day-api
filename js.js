const loadCategories = async() =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
}



const displayCategories = (data) =>{
    const categoriesSection =document.getElementById('categories-section');
   for(const datas of data){
    const div = document.createElement('div');
    div.innerHTML=`
    <p>ID:${datas.caregory_id}</p>
    <p>Category:${datas.category}</p>
    `;


    categoriesSection.appendChild(div)
   }
}

loadCategories();
