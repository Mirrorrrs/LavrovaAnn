function createSlider(imgs) {
    let slider = new DOMParser().parseFromString('<div class="slider"><div class="cross"><img src="media/close.png" alt=""></div><div class="navigation"><div class="arrow-left-wrapper arrow-wrapper"><div class="arrow-left slider-arrow"></div></div><div class="arrow-right-wrapper arrow-wrapper"><div class="arrow-right slider-arrow"></div></div></div><div class="slides_wrapper"><div class="slides"></div></div>\</div>', "text/html").body.querySelector(".slider")
    imgs.forEach(img => {
        source = img.getAttribute("src")
        let slide = new DOMParser().parseFromString(`<div class="slide"><img src="${source}" alt=""></div>`, "text/html").body.querySelector(".slide")
        slider.querySelector(".slides").appendChild(slide)
    })
    let slide_number = 0
    let last_slide_index = imgs.length - 1
    let main_slide = slider.querySelector(".slide")
    slider.querySelector(".arrow-right-wrapper").onclick = () => {
        if (slide_number + 1 <= last_slide_index) {
            slide_number++
        } else {
            slide_number = 0
        }
        let slide_width = main_slide.clientWidth
        main_slide.style.marginLeft = -(slide_width * slide_number) + "px"
    }
    slider.querySelector(".arrow-left-wrapper").onclick = () => {
        let slide_width = main_slide.clientWidth
        if (slide_number > 0) {
            slide_number--
            main_slide.style.marginLeft = -(slide_width * slide_number) + "px"

        } else {
            slide_number = last_slide_index
            main_slide.style.marginLeft = -(slide_width * slide_number) + "px"

        }
    }

    let cross = slider.querySelector(".cross")
    cross.onclick = () => {
        slider.querySelectorAll(".slider-arrow").forEach(el => el.remove())
        slider.style.width = 0
        slider.style.height = 0
        cross.style.display = "none"
        slider.style.backgroundColor = "rgba(0,0,0,0)"
        setTimeout(() => {
            slider.remove()
            document.body.style.height = "auto"
            document.body.style.overflow = "visible"
        }, 500)

    }
    document.body.style.height = "100vh"
    document.body.style.overflow = "hidden"
    document.body.appendChild(slider)
}

(() => {
    let works = document.querySelectorAll(".work")
    Array.from(works).forEach(el => {
        el.onclick = (ev) => {
            let imgs = el.querySelectorAll("img")
            createSlider(imgs)
        }
    })
})()
