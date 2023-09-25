// check if the there main color save in the local storage

let mainColors = localStorage.getItem("color_option");

// console.log(mainColors);

if (mainColors != null){

  // console.log("set your main color ")

  // save the set color on the local storage 

  document.documentElement.style.setProperty("--main-color",mainColors);


  // remove all active class form all color list 

  document.querySelectorAll(".color-list li").forEach(element =>{

    element.classList.remove("active");

    // add active class on element with data-color === local storage item 

    if(element.dataset.color === mainColors){

      // add active class

      element.classList.add("active");
    }

  });

}

/////////////////////////////////////////////////////////////////////////

// toggle open class on icon 

function toggleMenu() {

    const spin = document.getElementById("spin");
    spin.classList.toggle('active'); // Toggles the 'active' class

    const open = document.getElementById("open");
    open.classList.toggle('open');

}

//////////////////////////////////////////////////////////////////////////////////

// switch colors 

const colorLi = document.querySelectorAll(".color-list li");

colorLi.forEach(li => {

  li.addEventListener("click" , (e) =>{

    // set color on the root color

    document.documentElement.style.setProperty("--main-color",e.target.dataset.color);

    // set color on local storage

    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);

  });

});

//////////////////////////////////////////////////////////////////////////

// background option 

let backgroundOption = true;

// var to control the interval 

let backgroundInterval;

//////////////////////////////////////////////////////////////////////////////////

// check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// check if random backgroundLocalStorage not empty

if (backgroundLocalItem !== null){

  if(backgroundLocalItem === 'true'){

    backgroundOption = true;

  } else {

    backgroundOption = false;
  }

  // remove active class from all spans 

  document.querySelectorAll(".random-background span").forEach(element => {

    element.classList.remove("active");

  });

  if (backgroundLocalItem === 'true'){

    document.querySelector(".random-background .yes").classList.add("active");

  } else {

    document.querySelector(".random-background .no").classList.add("active");
    
  }

}

//////////////////////////////////////////////////////////////////////////////////

// switch random background

const randomBackEl = document.querySelectorAll(".random-background span");

// loop on all spans 
randomBackEl.forEach(span => {

  span.addEventListener("click" , (e) =>{

    // remove active class from all spans
    
    handleActive(e);

    if (e.target.dataset.background === 'yes'){

      backgroundOption = true;

      randomize();

      localStorage.setItem("background_option", true);
    } 
    else{
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }

  });

}); 

//////////////////////////////////////////////////////////////////////////////////

// to remove the active class form li of nav-links and add it when i click on it 

document.addEventListener('DOMContentLoaded', function() {

  // Add event listener to the navActive list

  var navActive = document.getElementById('navActive');
  var activeLink = navActive.querySelector('.active');

  navActive.addEventListener('click', function(e) {

    // Check if the clicked element is an <a> element
    if (e.target.tagName.toLowerCase() === 'a') {

          // Remove the active class from all links

          navActive.querySelectorAll('a').forEach(function(link) {

              link.classList.remove('active');

            });

            // Add the active class to the clicked link

            e.target.classList.add('active');

            // Update the activeLink variable to the newly selected link

            activeLink = e.target;
      
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////

// Select the landing page element
let page = document.querySelector(".landing-page");

// Get array of images
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];

// function to randomize background

function randomize(){

  if ( backgroundOption === true){

    // To change the background after "x" seconds
    backgroundInterval = setInterval(() => {

      // Get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Add CSS transition property
      page.style.transition = "background-image 0.5s ease-in-out";

      // Change background image URL
      page.style.backgroundImage = 'url("img/' + imgsArray[randomNumber] + '")';

      // Reset transition property after the transition completes
      setTimeout(() => {

        page.style.transition = "";

      }, 1000);// Adjust the duration to match the transition duration in CSS

    }, 5000);
  }
}

randomize();

/////////////////////////////////////////////////////////////////////////////////////


// Skills Sections :

let ourSkills = document.querySelector(".skills");

window.addEventListener("scroll", function () {

  // Get the position of the skills section relative to the viewport

  let skillsTop = ourSkills.getBoundingClientRect().top;

  // Calculate when to trigger the animation based on the viewport height

  let triggerPoint = window.innerHeight;

  // Check if the skills section is in the viewport
  if (skillsTop < triggerPoint) {

    let allSkills = document.querySelectorAll(".skills-box .skill-progress span");

    allSkills.forEach(skill => {

      skill.style.width = skill.getAttribute("data-progress");

    });

  }

});

////////////////////////////////////////////////////////////////////////////////////////

// gallery section :

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

  img.addEventListener('click', (e) => {

    // create overlay element :

    let overlay = document.createElement("div");

    // add class to overlay :

    overlay.className = 'popup-overlay';

    // append overlay to the body :

    document.body.appendChild(overlay);

    // create the popup :

    let popupBox = document.createElement("div");

    // add class to the popupBox :

    popupBox.className = 'popup-box';

    
    if (img.alt !== null ){

      // create heading :

      let imgHeading = document.createElement("h3");

      // create text for heading :

      let imgText = document.createTextNode(img.alt);

      // append the text to the heading :

      imgHeading.appendChild(imgText);

      // append the heading to the popup-box :

      popupBox.appendChild(imgHeading);

      
    }

    // create the image :

    let popupImage = document.createElement("img");

    // set image source :

    popupImage.src = img.src;

    //  add image to popupBox :

    popupBox.appendChild(popupImage);

    // append popupBox to the body :

    document.body.appendChild(popupBox);

    // create the close span : 

    let popupClose = document.createElement("span");

    // create the close button text :

    let popupCloseText = document.createTextNode("X");

    // append the text to the close span :

    popupClose.appendChild(popupCloseText);

    // append the close span to the popup-box :

    popupClose.className = 'popupClose'

    // add close button to the popup box :

    popupBox.appendChild(popupClose);

    popupBox.classList.add('show');

  });

});

// close popup : 

document.addEventListener("click", function (e) {

  if (e.target.className == 'popupClose'){

    // remove the current popup :

    e.target.parentNode.classList.remove('show');

    // remove overlay :

    document .querySelector(".popup-overlay").remove();

  }

});

////////////////////////////////////////////////////////////////////////////////////////

// select all bullets :

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links :

const allLinks = document.querySelectorAll("header .nav-links a");

///////////////////////////////////////////////////////////////////////////////////

// Show Bullets or No and save it in local storage :

// select Bullets :

let bullets = document.querySelectorAll(".bullets-option span");

let bulletsCon = document.querySelector(".nav-bullets");

let bulletLocal = localStorage.getItem("bullets_option");

if (bulletLocal !== null){

  bullets.forEach(span => {

    span.classList.remove("active");

  });

  if (bulletLocal === 'block'){

    bulletsCon.style.display = "block";
    
    document.querySelector(".bullets-option .yes").classList.add("active");
    
  }
  
  else {
    
    bulletsCon.style.display = "none";
    
    document.querySelector(".bullets-option .no").classList.add("active");

  }
}

bullets.forEach(span => {

  span.addEventListener("click", (e) => {

    if (span.dataset.display === 'show'){

      bulletsCon.style.display = 'block'; 

      localStorage.setItem("bullets_option", "block");
      
    }
    
    else{

      bulletsCon.style.display = 'none'; 

      localStorage.setItem("bullets_option", "bloc");

    }

    handleActive(e);  

  });

});

// General Function :
function scrollToAnySection(elements){

  elements.forEach(element => {
  
    element.addEventListener("click", (e) => {
      
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
  
        behavior: "smooth"
  
      });
    });
  });
} 

// Run The Function :

scrollToAnySection(allBullets);
scrollToAnySection(allLinks);

///////////////////////////////////////////////////////////////////////////////////////////////////

// General Function to Handle any class "Active" :


function handleActive(ev){

  ev.target.parentElement.querySelectorAll(".active").forEach(element => {

    element.classList.remove("active");


  });

  ev.target.classList.add("active");

}

///////////////////////////////////////////////////////////////////////////////////////////////////

// reset button;

document.querySelector(".reset-option").addEventListener("click", function() {

  localStorage.removeItem("bullets_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");

  window.location.reload();

});

///////////////////////////////////////////////////////////////////////////////////////////////////

// menu logic and toggle menu :

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".nav-links");
let mainCon = document.querySelector(".introduction-text");

toggleBtn.onclick = function () {

  this.classList.toggle("menu-active");
  
  tLinks.classList.toggle("open");

  mainCon.classList.toggle("open");

};

// to click the menu from anywhere

document.addEventListener("click", (e) => {

  if ( e.target !== toggleBtn && !tLinks.contains(e.target)){

      // check if menu is open :

      if (tLinks.classList.contains("open")){

        tLinks.classList.remove("open");

        mainCon.classList.toggle("open");

        toggleBtn.classList.toggle("menu-active");

      }
  }

});

// stop propagation on menu :

tLinks.onclick = function(e){

  e.stopPropagation();

};

///////////////////////////////////////////////////////////////////////////////////////////

// scrollReveal :

ScrollReveal().reveal('.nav-bullets', {
  
  delay: 500 ,
  origin: 'right',
  easing: 'ease-in-out',
  distance: '50px'
});


ScrollReveal().reveal('.introduction-text', {
  
  delay: 500 ,
  origin: 'left',
  easing: 'ease-in-out',
  distance: '50px'

});



ScrollReveal().reveal('.info-box', {
  
  delay: 500 ,
  origin: 'left',
  easing: 'ease-in-out',
  distance: '50px'
});

ScrollReveal().reveal('.image-box', {
  
  delay: 800 ,
  origin: 'right',
  easing: 'ease-in-out',
  distance: '50px'
});

ScrollReveal().reveal('#skill-sec', {
  
  origin: 'top',
  easing: 'ease-in-out',
  distance: '50px'
});

ScrollReveal().reveal('.skills-box', {
  
  origin: 'top',
  easing: 'ease-in-out',
  distance: '50px'
});

ScrollReveal().reveal('#Gallery-sec', {
  
  delay: 800 ,
  origin: 'top',
  easing: 'ease-in-out',
  distance: '50px'
});

ScrollReveal().reveal('.images-box', {
  
  delay: 1000 ,
  origin: 'right',
  easing: 'ease-in-out',
  distance: '50px'
});



ScrollReveal().reveal('.year', {
  
  delay: 300 ,
  origin: 'top',
  easing: 'ease-in-out',
  distance: '50px'
});

ScrollReveal().reveal('.left', {
  
  delay: 500 ,
  origin: 'left',
  easing: 'ease-in-out',
  distance: '50px'
});

ScrollReveal().reveal('.right', {
  
  delay: 500 ,
  origin: 'right',
  easing: 'ease-in-out',
  distance: '50px'
});


ScrollReveal().reveal('#features-sec', {
  
  delay: 500 ,
  origin: 'left',
  easing: 'ease-in-out',
  distance: '50px'
});

ScrollReveal().reveal('.img', {
  
  delay: 800 ,
  origin: 'top',
  easing: 'ease-in-out',
  distance: '50px'
});

ScrollReveal().reveal('.P-info', {
  
  delay: 1000 ,
  origin: 'bottom',
  easing: 'ease-in-out',
  distance: '50px'
});


ScrollReveal().reveal('#testimonials-sec', {
  
  delay: 500 ,
  origin: 'left',
  easing: 'ease-in-out',
  distance: '50px'
});

ScrollReveal().reveal('.person-info', {
  
  delay: 800 ,
  origin: 'right',
  easing: 'ease-in-out',
  distance: '50px'
});


ScrollReveal().reveal('#Contact-Us-sec', {
  
  delay: 500 ,
  origin: 'top',
  easing: 'ease-in-out',
  distance: '50px'
});
ScrollReveal().reveal('.left-form', {
  
  delay: 800 ,
  origin: 'left',
  easing: 'ease-in-out',
  distance: '50px'
});
ScrollReveal().reveal('.right-form', {
  
  delay: 800 ,
  origin: 'right',
  easing: 'ease-in-out',
  distance: '50px'
});








