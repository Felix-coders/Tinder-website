const no = document.querySelector(".no")
const star = document.querySelector(".star")
const heart = document.querySelector(".heart")
const user = document.querySelector(".user")
const card = document.querySelector(".card")
var clicked = false
var current = 0
var data = [
    {
        "src": "https://images.unsplash.com/photo-1532910404247-7ee9488d7292?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80",
        "name": "Rafaela",
        "age": 20,
        "distance": "9,018.3"
    },
    {
        "src": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80",
        "name": "Leo",
        "age": 25,
        "distance": "3,450.2"
    },
    {
        "src": "https://images.unsplash.com/photo-1603415526960-f76d57b5d58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80",
        "name": "Emily",
        "age": 24,
        "distance": "2,112.5"
    },
    {
        "src": "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80",
        "name": "Daniel",
        "age": 28,
        "distance": "4,678.9"
    },
    {
        "src": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80",
        "name": "Sophia",
        "age": 19,
        "distance": "2,381.6"
    }
]

changeImage()

no.addEventListener('click', () => {
    if(!clicked && data.length >= current){
        clicked = true
        var tager = "<h1 class='selection' style='color:red;'>Disliked</h1>"
        showNotification(tager)
        changeDirection('disliked')
    }
})

star.addEventListener('click', () => {
    if(!clicked && data.length >= current){
        clicked = true
        var tager = "<h1 class='selection' style='color:gold;'>Super Liked</h1>"
        showNotification(tager)
        changeDirection('super_liked')
    }
})

heart.addEventListener('click', () => {
    if(!clicked && data.length >= current){
        clicked = true
        var tager = "<h1 class='selection' style='color:green;'>Liked</h1>"
        showNotification(tager)
        changeDirection('liked')
    }
})

function showNotification(tager) {
    var userTag = user.innerHTML
    var newTag = userTag + tager
    user.innerHTML = newTag
    setTimeout(() => { user.innerHTML = userTag }, 1000)
}

function changeDirection(class_name) {
    var card_class = document.querySelector('.card').classList
    card_class.add(class_name)
    setTimeout(() => {
        card_class.remove(class_name)
        clicked = false
        changeImage()
    }, 2000)
}

function changeImage() {
    var new_card
    if (current <= data.length - 1) {
        new_card = `<img
              class="user"
              src=${data[current].src}
              alt=""
              draggable="false"
            />
            <div class="profile">
              <div class="name">${data[current].name} <span>${data[current].age}</span></div>
              <div class="local">
                <i class="fas fa-map-marker-alt"></i>
                <span>${data[current].distance} km away</span>
              </div>
            </div>`

    } else {
        new_card = `<div class="no_sugg">No More Suggestions</div>`
    }
    user.innerHTML = new_card
    current++
}

let draggable = false
let offsetX = 0
let original_x = card.offsetLeft
let cardWidth = card.offsetWidth

function startDrag(event) {
    if (current > data.length || clicked) return
    draggable = true
    offsetX = (event.touches ? event.touches[0].clientX : event.clientX) - card.offsetLeft
    card.style.transition = ""
}

function moveCard(event) {
    if (!draggable) return

    let clientX = event.touches ? event.touches[0].clientX : event.clientX
    let newLeft = clientX - offsetX
    let maxDistance = cardWidth * 0.7
    let distanceMoved = newLeft - original_x

    if (Math.abs(distanceMoved) <= maxDistance) {
        card.style.left = `${newLeft}px`
        card.style.transform = `rotate(${distanceMoved / 10}deg)`
    }
}

function endDrag() {
    if (!draggable) return

    draggable = false
    let distanceMoved = card.offsetLeft - original_x
    let maxDistance = cardWidth * 0.7
    let finalLeft = distanceMoved > 0 ? original_x + maxDistance : original_x - maxDistance

    card.style.transition = "all 0.5s ease"
    card.style.left = `${finalLeft}px`
    card.style.transform = `rotate(${distanceMoved > 0 ? maxDistance / 10 : -maxDistance / 10}deg)`

    card.addEventListener("transitionend", function returnAndTrigger() {
        card.removeEventListener("transitionend", returnAndTrigger)

        card.style.transition = "all 0.5s ease"
        card.style.left = `${original_x}px`
        card.style.transform = "rotate(0deg)"

        card.addEventListener("transitionend", () => {
            changeImage()
        }, { once: true })
    }, { once: true })
}

card.addEventListener("mousedown", startDrag)
document.addEventListener("mousemove", moveCard)
document.addEventListener("mouseup", endDrag)

card.addEventListener("touchstart", startDrag)
document.addEventListener("touchmove", moveCard)
document.addEventListener("touchend", endDrag)

const profile = document.getElementById('profile')

profile.addEventListener('click', () => {
    document.querySelector('.drop-down').classList.toggle('visible')
})


const userProfile = JSON.parse(localStorage.getItem('userProfile'));

        if (userProfile) {
            profile.src = userProfile.photo;
        } else {
            alert("No profile found! Please create your profile first.");
            window.location.href = "../public/profile-creation.html";
        }
