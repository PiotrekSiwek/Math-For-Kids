import "../scss/main.scss";

class Mathematica {
    constructor(min, max) {
        this.min = min;
        this.max = max;
        this.A = Math.floor(Math.random() * (max - min + 1) + min);
        this.B = Math.floor(Math.random() * (max - min + 1) + min);
        this.$chat = document.querySelector(".picture__text");
        this.$operations = document.querySelectorAll(".btn");
        this.$math = document.querySelector(".math-calculator");
        this.$data = document.querySelector("input");
        this.$circle = this.$math.querySelectorAll(".circle");

    }

    randomNumbers() {
        if (this.A > this.B) {
            this.$math.firstElementChild.textContent = `${this.A}`
            this.$math.firstElementChild.nextElementSibling.nextElementSibling.textContent = `${this.B}`
        } else {
            this.$math.firstElementChild.textContent = `${this.B}`
            this.$math.firstElementChild.nextElementSibling.nextElementSibling.textContent = `${this.A}`
        }
    }

    checkClass() {
        if (this.$data.classList.contains("roll")) this.$data.classList.remove("roll");
        if (this.$chat.classList.contains("show")) this.$chat.classList.remove("show");
        this.$data.style.backgroundColor = "#e5bd10";
    }

    circleAnim() {
        this.$circle.forEach(circle => {
            if (circle.classList.contains("rollAll")) circle.classList.remove("rollAll")
        })
    }

    anim() {
        this.$data.style.backgroundColor = "#69d632";
        this.$data.classList.add("roll");
        this.$chat.classList.add("show");
    }

    operations() {
        this.$operations[0].addEventListener("click", (e) => {
            this.$math.firstElementChild.nextElementSibling.textContent = "+";
            this.checkClass()
            this.circleAnim()
        });
        this.$operations[1].addEventListener("click", (e) => {
            this.$math.firstElementChild.nextElementSibling.textContent = "-";
            this.checkClass()
            this.circleAnim()
        });
        this.$operations[2].addEventListener("click", (e) => {
            this.$math.firstElementChild.nextElementSibling.textContent = "*";
            this.checkClass()
            this.circleAnim()
        });
    }

    checkResult(e) {
        const sign = this.$math.firstElementChild.nextElementSibling;
        this.circleAnim();
        if (sign.textContent === "+") {
            if (this.A + this.B === Number(this.$data.value)) {
                this.anim()
            } else {
                this.$data.style.backgroundColor = "red";
            }
        } else if (sign.textContent === "*") {
            if (this.A * this.B === Number(this.$data.value)) {
                this.anim()
            } else {
                this.$data.style.backgroundColor = "red";
            }
        } else if (sign.textContent === "-") {
            if (this.A >= this.B) {
                if (this.A - this.B === Number(this.$data.value)) {
                    this.anim()
                } else {
                    this.$data.style.backgroundColor = "red";
                }
            } else if (this.A < this.B) {
                if (this.B - this.A === Number(this.$data.value)) {
                    this.anim()
                } else {
                    this.$data.style.backgroundColor = "red";
                }
            }
        }
    }

    refresh (e) {
        this.A = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
        this.B = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
        this.randomNumbers();
        this.$data.style.backgroundColor = "#e5bd10";
        this.$data.value = "";
        this.$circle.forEach(circle => circle.classList.add("rollAll"))
        this.checkClass()
        setTimeout(() => {
            this.circleAnim()
        }, 3500)
    }
}

const playCalc = new Mathematica(0,10);
playCalc.randomNumbers();
playCalc.operations();

document.querySelector(".refresh__button").addEventListener("click", function (event){
    playCalc.refresh(event);
});

document.querySelector(".button-check").addEventListener("click", function (event){
    playCalc.checkResult(event);
});
