const intersectionObserver = new IntersectionObserver(entries => {
    console.log(entries);
    entries.forEach(entry => {
        const square = entry.target.querySelector('.section-container');
        if(entry.isIntersecting){
            square.classList.add('show');
        }
    });
},{
    threshold: 0.5,
    root: null
});

const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    intersectionObserver.observe(section);
})
