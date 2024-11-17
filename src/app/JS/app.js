window.addEventListener("scroll", function()
{
    document.querySelector('nav').classList.toggle('window-nav-color', window.scrollY > 0)
})
/* Dark Mode*/
const moon = document.querySelector('.moon')
const attri = `fas fa-sun`
moon.addEventListener("click", function()
{
    document.querySelector('body').classList.toggle('dark')
    const i = document.createElement("i")
    i.setAttribute("class", attri)
    moon.appendChild(i);
    if(firstChild.classList.contain("fa-sun"))
    {
       return document.querySelector("fa-sun").style.display = "none" 
    }
})


//Calling Elements from DOM
const btnClose = document.querySelector('.close-menu-btn');

const btnOpen = document.querySelector('.open-menu-btn');

const rightNav = document.querySelector('.right_nav');
// console.log(btnOpen);
if(!rightNav.classList.contains('active'))
{
    btnOpen.addEventListener('click', function()
    {
        rightNav.classList.toggle('active');
        btnClose.style.display = "block"
        btnOpen.style.display = "none"
    })
}
btnClose.addEventListener('click', function()
{
    rightNav.classList.toggle('active');
    btnClose.style.display = "none"
    btnOpen.style.display = "block"
})

let images = document.querySelectorAll('.image');
console.log(images)

// const next = document.querySelector('#next')
let index = 0;

const Next = function()
{
    images[index].classList.remove('active');
    index = (index + 1) % images.length;
    images[index].classList.add('active');
}


const Prev = function()
 {
    images[index].classList.remove('active');
    index = (index - 1 + images.length) % images.length;
    images[index].classList.add('active');
 }
 Prev()

 //Pop-Cart

 const first = document.querySelector('.first');
 const popClose = document.querySelector('.pop-close');

 first.addEventListener('click', function()
 {
    document.querySelector(".popUp").classList.toggle('popTrue')
 })
 popClose.addEventListener('click', function()
 {
    document.querySelector(".popUp").classList.remove('popTrue')
 })