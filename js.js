const loadCategories = async () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
const removeActiveCls= () =>{
const buttons = document.getElementsByClassName("category-btn");
for(let btn of buttons){
  btn.classList.remove("active");
}
}



const categoryVideos = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // sobaike active cls remove koro..jar dorkar tare active cls add koro
      removeActiveCls();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category)
    })
    .catch((error) => console.log(error));
}

const displayCategories = (data) => {
  const categoriesSection = document.getElementById("categories-section");
  for (const datas of data) {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML=
    `
    <button id="btn-${datas.category_id}" onclick="categoryVideos(${datas.category_id})" class="btn category-btn">${datas.category}</button>
    `

    categoriesSection.appendChild(buttonContainer);
  }
};

loadCategories();
//
//
function getTimeString(time){
  const hour = parseInt(time / 3600);
  let remainingSeconds = time % 3600;
  const minute = parseInt(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  return `${hour} hour ${minute} minute ${remainingSeconds} seconds ago`;
}
//
const loadVideos =  (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const loadDetails = async (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.video);
}
const displayDetails = (video)=>{
const detailsContainer = document.getElementById("modalDiv");
document.getElementById('showModal').click();
detailsContainer.innerHTML=`
<p>${video.description}</p>
`

}

const cardDemo = {
  category_id: "1003",
  video_id: "aaae",
  thumbnail: "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
  title: "Inside Amy Schumer",
  authors: [
    {
      profile_picture: "https://i.ibb.co/YD2mqH7/amy.jpg",
      profile_name: "Amy Schumer",
      verified: "",
    },
  ],
  others: {
    views: "3.6K",
    posted_date: "15147",
  },
  description:
    "'Inside Amy Schumer' is a comedy show by the popular comedian Amy Schumer, blending sharp satire and unfiltered humor to tackle everyday issues and societal norms. With 3.6K views, the show promises a blend of hilarious sketches, thought-provoking stand-up, and candid interviews. It's a must-watch for fans of bold, edgy comedy.",
};

const displayVideos = (data) => {
  const videosSection = document.getElementById("videos-section");
  videosSection.innerHTML = "";
  if(data.length == 0){
    videosSection.classList.remove("grid")
    videosSection.innerHTML =
    `
    <div class=" flex flex-col gap-4 justify-center items-center">
    <img src="Icon.png" alt=""/>
    <h1 class="font-bold text-2xl">No Videos Here</h1></div>`
    
    return;
  }else{
    videosSection.classList.add("grid")
  }
  for (const datas of data) {
    
    const div = document.createElement("div");
    div.classList = "card card-compact";
    div.innerHTML = `
    <figure class="h-[200px] relative">
          <img
            src=${datas.thumbnail} class="h-full w-full object-cover"/>
            ${datas.others.posted_date?.length == 0 ? "": `<span class="absolute right-2 bottom-2 bg-black rounded-lg text-white text-xs">${getTimeString(datas.others.posted_date)}</span>`}
            
        </figure>
        <div class="px-0 py-2 flex gap-4">
        <div><img src=${datas.authors[0].profile_picture} class="h-10 w-10 rounded-full object-cover" alt=""></div>
        <div>
        <h1 class="font-bold">${datas.title}</h1>
        <div class="flex gap-4 items-center">
        <p class="text-gray-400">${datas.authors[0].profile_name}</p>
        ${datas.authors[0].verified == true ? `<img class="w-5 h-full object-cover" src="https://img.icons8.com/?size=40&id=41816&format=png" alt=""></img>`: ""}
        </div>
        <div>
        <p>${datas.others.views} views</p> 
        </div>
        <div>
        <p><button onclick="loadDetails('${datas.video_id}')"  class="btn btn-sm btn-error">Details</button>
        </p> 
        </div>
        
        </div>
        
    `;

    videosSection.appendChild(div);

    // 
    // <div class="h-10"><img src= class="h-full w-full object-cover" alt=""></div>
  }
};

loadVideos();

document.getElementById("searchBar").addEventListener("keyup",(event)=> {
  loadVideos(event.target.value);

}
)
