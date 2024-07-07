let currentIndex = 0;
const projects = document.querySelectorAll('.project');

document.getElementById('next').addEventListener('click', () => {
    projects[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % projects.length;
    projects[currentIndex].classList.add('active');
});

document.getElementById('previous').addEventListener('click', () => {
    projects[currentIndex].classList.remove('active');
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    projects[currentIndex].classList.add('active');
});

