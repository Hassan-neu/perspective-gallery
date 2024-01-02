const imageWrapper = document.querySelectorAll(".image-wrapper");
const mouseCircle = document.querySelector(".mouse-circle");
const gallery = document.querySelector(".gallery-images");
let activeIndex = 3;
let insideActive = false;

imageWrapper.forEach((img) =>
    img.addEventListener("click", function (e) {
        if (this.dataset.status !== "active-image") return;
        const { offsetX, offsetY } = e;
        const leftSide = offsetX <= this.offsetWidth / 2;
        const rightSide = offsetX > this.offsetWidth / 2;
        if (rightSide) {
            const nextIndex = activeIndex + 1;
            const nextImage = document.querySelector(
                `[data-index='${nextIndex}']`
            );
            this.removeAttribute("data-status");
            nextImage.setAttribute("data-status", "active-image");
            imageWrapper.forEach(({ dataset }) => {
                const newIndex = dataset.index - 1 < 0 ? 6 : dataset.index - 1;
                dataset.index = newIndex;
            });
            const fromRight = document.querySelector(`[data-index='6']`);
            fromRight.dataset.dir = "from-right";
            setTimeout(() => fromRight.removeAttribute("data-dir"));
        } else if (leftSide) {
            const nextIndex = activeIndex - 1;
            const nextImage = document.querySelector(
                `[data-index='${nextIndex}']`
            );
            this.removeAttribute("data-status");
            nextImage.setAttribute("data-status", "active-image");
            imageWrapper.forEach(({ dataset }) => {
                const newIndex =
                    Number(dataset.index) + 1 > 6
                        ? 0
                        : Number(dataset.index) + 1;
                dataset.index = newIndex;
            });
            const fromLeft = document.querySelector(`[data-index='0']`);
            fromLeft.dataset.dir = "from-left";
            setTimeout(() => fromLeft.removeAttribute("data-dir"));
        }
    })
);
imageWrapper.forEach((img) =>
    img.addEventListener("mouseenter", function () {
        if (this.dataset.status !== "active-image") return;
        insideActive = true;
    })
);
imageWrapper.forEach((img) =>
    img.addEventListener("mouseleave", function () {
        if (this.dataset.status !== "active-image") return;
        insideActive = false;
        document.body.style.cursor = "default";
        mouseCircle.style.setProperty("opacity", "0");
    })
);
imageWrapper.forEach((img) =>
    img.addEventListener("mousemove", function (e) {
        if (!insideActive) return;
        const { pageY: topCoord, pageX: leftCoord } = e;
        document.body.style.cursor = "none";
        mouseCircle.style.setProperty("opacity", "1");
        mouseCircle.style.setProperty(
            "transform",
            `translate(${leftCoord}px,${topCoord}px )`
        );
    })
);
