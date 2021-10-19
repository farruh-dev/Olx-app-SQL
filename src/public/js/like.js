const likeButton = document.querySelectorAll('.likeButton')

        likeButton.forEach(btn => {
            btn.addEventListener('click', event => {
                let liekIcon = event.target.children[0]
                console.log(liekIcon);
            if (liekIcon.classList.contains('far')) {
                liekIcon.classList.remove('far')
                liekIcon.classList.add('fas')


            } else {
                liekIcon.classList.remove('fas')
                liekIcon.classList.add('far')
            }
        })
})