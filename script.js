document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Controle do ícone do menu (abrir/fechar)
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        searchContainer.classList.remove('active');
        menuIcon.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Controle do ícone de pesquisa (abrir/fechar)
    searchIcon.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
        navLinks.classList.remove('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    });

    // Controle dos dropdowns
    dropdowns.forEach(dropdown => {
        const dropdownBtn = dropdown.querySelector('.dropdown-btn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        dropdownBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita o comportamento padrão do link
            const isActive = dropdownContent.classList.contains('active');

            // Fecha todos os dropdowns antes de abrir o atual
            dropdowns.forEach(d => {
                d.querySelector('.dropdown-content').classList.remove('active');
                d.querySelector('.dropdown-btn').setAttribute('aria-expanded', 'false');
            });

            // Se o dropdown não estava ativo, ativa-o agora
            if (!isActive) {
                dropdownContent.classList.add('active');
                dropdownBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Fecha os dropdowns ao clicar fora deles
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuIcon.contains(e.target)) {
            dropdowns.forEach(dropdown => {
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                dropdownContent.classList.remove('active');
                dropdown.querySelector('.dropdown-btn').setAttribute('aria-expanded', 'false');
            });
        }
    });

    // Função de busca
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            const sections = document.querySelectorAll('main section');
            let found = false;

            sections.forEach(section => {
                const sectionText = section.textContent.toLowerCase();
                if (sectionText.includes(searchTerm)) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    found = true;
                    return;
                }
            });

            if (!found) {
                alert('Nenhum resultado encontrado para: ' + searchTerm);
            }
        }
        searchContainer.classList.remove('active');
    }

    // Animação de fade-in para as seções
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Carrossel de livros
   

    // Animação de entrada para os livros
    const books = document.querySelectorAll('.book');
    const bookOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px"
    };

    const animateBooks = new IntersectionObserver((entries, animateBooks) => {
        entries.forEach((entry, index) => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
                animateBooks.unobserve(entry.target);
            }
        });
    }, bookOptions);

    books.forEach(book => {
        animateBooks.observe(book);
    });
});



//PÁGINA SERMÕES
// ... (mantenha as funções gerais existentes) ...
// ... (código existente) ...
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = new Audio();
    let currentSermonIndex = -1;
    let isPlaying = false;
    let isAutoPlay = false;

    const listaSermoes = document.getElementById('lista-sermoes');
    const sermaoAtual = document.getElementById('sermao-atual');
    const autorAtual = document.getElementById('autor-atual');
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const autoPlayBtn = document.getElementById('auto-play');
    const pesquisaInput = document.getElementById('pesquisa-sermao');
    const pesquisaBtn = document.getElementById('btn-pesquisa');
    const progressBar = document.querySelector('.progress');
    const currentTimeDisplay = document.getElementById('current-time');
    const totalTimeDisplay = document.getElementById('total-time');

    const sermoes = Array.from(listaSermoes.children).map(li => ({
        titulo: li.querySelector('.sermon-title').textContent,
        autor: li.dataset.author,
        arquivo: li.dataset.audio,
        elemento: li
    }));

    function formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function loadDurations() {
        sermoes.forEach((sermao, index) => {
            const tempAudio = new Audio(sermao.arquivo);
            tempAudio.addEventListener('loadedmetadata', () => {
                const duration = formatDuration(tempAudio.duration);
                sermao.elemento.querySelector('.sermon-duration').textContent = duration;
            });
        });
    }

    function playSermon(index) {
        if (currentSermonIndex !== index) {
            currentSermonIndex = index;
            const sermon = sermoes[index];
            audioPlayer.src = sermon.arquivo;
            sermaoAtual.textContent = sermon.titulo;
            autorAtual.textContent = sermon.autor;
        }
        audioPlayer.play().then(() => {
            isPlaying = true;
            updatePlayPauseButton();
        }).catch(error => {
            console.error('Erro ao reproduzir áudio:', error);
        });
        highlightCurrentSermon();
        scrollToCurrentSermon();
    }

    function highlightCurrentSermon() {
        Array.from(listaSermoes.children).forEach((li, index) => {
            li.classList.toggle('active', index === currentSermonIndex);
        });
    }

    function scrollToCurrentSermon() {
        const activeSermon = listaSermoes.querySelector('.active');
        if (activeSermon) {
            activeSermon.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function updatePlayPauseButton() {
        playPauseBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    }

    function updateProgressBar() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.setProperty('--progress', `${progress}%`);
        
        currentTimeDisplay.textContent = formatDuration(audioPlayer.currentTime);
        totalTimeDisplay.textContent = formatDuration(audioPlayer.duration);
    }

    listaSermoes.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (li) {
            const index = Array.from(listaSermoes.children).indexOf(li);
            playSermon(index);
        }
    });

    playPauseBtn.addEventListener('click', () => {
        if (currentSermonIndex === -1) {
            playSermon(0);
        } else {
            if (isPlaying) {
                audioPlayer.pause();
            } else {
                audioPlayer.play().catch(error => {
                    console.error('Erro ao reproduzir áudio:', error);
                });
            }
            isPlaying = !isPlaying;
            updatePlayPauseButton();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSermonIndex > 0) {
            playSermon(currentSermonIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSermonIndex < sermoes.length - 1) {
            playSermon(currentSermonIndex + 1);
        }
    });

    autoPlayBtn.addEventListener('click', () => {
        isAutoPlay = !isAutoPlay;
        autoPlayBtn.classList.toggle('active');
    });

    audioPlayer.addEventListener('ended', () => {
        if (isAutoPlay && currentSermonIndex < sermoes.length - 1) {
            playSermon(currentSermonIndex + 1);
        } else {
            isPlaying = false;
            updatePlayPauseButton();
        }
    });

    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayPauseButton();
    });

    audioPlayer.addEventListener('timeupdate', updateProgressBar);

    document.querySelector('.progress-bar').addEventListener('click', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        audioPlayer.currentTime = clickPosition * audioPlayer.duration;
    });

    pesquisaBtn.addEventListener('click', realizarPesquisa);
    pesquisaInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            realizarPesquisa();
        }
    });

    function realizarPesquisa() {
        const termo = pesquisaInput.value.toLowerCase().trim();
        Array.from(listaSermoes.children).forEach(li => {
            const textoSermao = li.textContent.toLowerCase();
            li.style.display = textoSermao.includes(termo) ? '' : 'none';
        });
    }

    loadDurations();
    updatePlayPauseButton();
});


// Função para animar elementos na página Maria José
function animateElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
    slideLeftElements.forEach(el => observer.observe(el));
    slideRightElements.forEach(el => observer.observe(el));
}

// Executar a função quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos em uma página que precisa de animações
    if (document.querySelector('.maria-jose-hero') || document.querySelector('.antonio-elias-hero') || document.querySelector('.historia-casal-hero')) {
        animateElements();
    }

    // Aqui você pode adicionar outras inicializações de script existentes
});


// Código do carrossel de livros
const swiper = new Swiper('.book-carousel', {
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        480: {
            slidesPerView: 4,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: 5,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 6,
            spaceBetween: 25,
        },
    }
});