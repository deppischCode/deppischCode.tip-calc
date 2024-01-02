export default class Reset {
    static input(...elements) {
        for (let element of elements) {
            switch (element.type) {
                case "text":
                    element.value = "";
                    element.classList.remove("error");
                    break;
                case "radio":
                    element.checked = false;
                    break;
            }
        }
    }
    static button(resetElement, ...collection) {
        let active = false;
        for (let element of collection) {
            switch (element.type) {
                case "text":
                    if (element.value.length != 0)
                        active = true;
                    break;
                case "radio":
                    if (element.checked)
                        active = true;
                    break;
            }
        }
        if (active) {
            resetElement.classList.add("active");
            return;
        }
        resetElement.classList.remove("active");
    }
}
