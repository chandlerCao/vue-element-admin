import Vue from 'vue'

let [ul, isContextmenu] = [null, false]
Vue.directive('contextmenu', {
    inserted: (el, { value }) => {
        el.addEventListener('contextmenu', e => {
            e.preventDefault()

            if (!isContextmenu) {
                ul = document.createElement('ul');
                ul.className = 'comp-contextmenu'
                document.body.addEventListener('click', () => {
                    ul.style.display = 'none'
                })
                document.body.appendChild(ul)
                isContextmenu = true
            }
            ul.innerHTML = ''
            ul.style.cssText = `left: ${e.pageX}px; top: ${e.pageY}px;`;
            for (let i = 0; i < value.length; i++) {
                const li = document.createElement('li');
                li.innerText = value[i].text
                li.onclick = value[i].handler.bind(null, el)
                ul.appendChild(li)
            }

        })
    }
})