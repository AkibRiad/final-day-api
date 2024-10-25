const loadCategories = async() =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
}



const displayCategories = (data) =>{
    const categoriesSection =document.getElementById('categories-section');
   for(const datas of data){
    const button = document.createElement('button');
    button.classList ="btn"
    button.innerText=datas.category;
    


    categoriesSection.appendChild(button)
   }
}

loadCategories();
// 
// 
// 
const loadVideos = async() =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error))
}



const displayVideos = (data) =>{
    const videosSection =document.getElementById('videos-section');
   for(const datas of data){
    const div = document.createElement('div');
    
    div.innerHTML=datas;
    


    videosSection.appendChild(div);
   }
}

loadVideos();