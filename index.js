import{a as m,S as p,i as n}from"./assets/vendor-hwdYKDic.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const e of r)if(e.type==="childList")for(const c of e.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const e={};return r.integrity&&(e.integrity=r.integrity),r.referrerPolicy&&(e.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?e.credentials="include":r.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(r){if(r.ep)return;r.ep=!0;const e=s(r);fetch(r.href,e)}})();const g="48879353-852d93d42efc708c69048a712",h="https://pixabay.com/api/",b=40;async function L(o,t=1){try{return(await m.get(h,{params:{key:g,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:b}})).data}catch(s){throw s}}function v(o,t=!0){const s=document.querySelector(".gallery");if(o.length===0){s.innerHTML="<p>No images found</p>";return}const a=o.map(e=>`
      <div class="gallery-item">
        <a href="${e.largeImageURL}">
          <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy"/>
        </a>
        <div class="info">
          <p><b>Likes:</b> ${e.likes}</p>
          <p><b>Views:</b> ${e.views}</p>
          <p><b>Comments:</b> ${e.comments}</p>
          <p><b>Downloads:</b> ${e.downloads}</p>
        </div>
      </div>`).join("");t?s.innerHTML=a:s.insertAdjacentHTML("beforeend",a),new p(".gallery .gallery-item a",{captionsData:"alt",captionDelay:250}).refresh(),document.querySelector("main").classList.add("visible"),document.querySelector("header").classList.add("searched")}let i=1,u="";const l=document.querySelector(".load-more"),f=document.querySelector(".gallery"),d=document.querySelector(".loader");document.getElementById("search-form").addEventListener("submit",async o=>{o.preventDefault(),i=1,f.innerHTML="",l.style.display="none";const t=document.getElementById("search-input").value.trim();if(!t){n.warning({message:"Please enter a search term!"});return}u=t,await y()});l.addEventListener("click",async()=>{i+=1,await y(!1)});async function y(o=!0){d.style.display="block";try{const t=await L(u,i);if(t.hits.length===0&&o){n.info({message:"Sorry, there are no images matching your search query."});return}if(v(t.hits,o),i*50>=t.totalHits?(l.style.display="none",o||n.info({message:"We're sorry, but you've reached the end of search results."})):l.style.display="block",o&&t.totalHits>0&&n.success({message:`Hooray! We found ${t.totalHits} images.`}),!o){const{height:s}=f.firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}}catch{n.error({message:"Failed to fetch images. Please try again later."})}finally{d.style.display="none"}}
//# sourceMappingURL=index.js.map
