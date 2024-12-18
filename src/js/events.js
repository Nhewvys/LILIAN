document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector("#nav-button");
    const navLinks = document.querySelector(".nav_links");
    const navLinkItems = navLinks.querySelectorAll("ul li a")
    console.log(navLinkItems);
    
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        header.classList.add("scrolled")
    });
    navLinkItems.forEach(navLinkItem =>{
        navLinkItem.onclick = (event)=>{
            navLinks.classList.remove("show");
        }
    })
});

document.addEventListener("scroll", function () {
    
    if (window.scrollY > 50) { // Ajuste o valor conforme necessário
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Obter altura real do cabeçalho
const header = document.querySelector('header');
const getHeaderHeight = () => header.getBoundingClientRect().height - 20;

// Controle para evitar conflitos entre clique e rolagem
let isClicking = false;

// Adiciona evento de clique nos links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Evita comportamento padrão do link

        // Define como "clicando" para evitar conflitos com o scroll
        isClicking = true;

        // Remove "active" de todos os links e adiciona ao clicado
        navLinks.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');

        // Faz scroll suave até a seção
        const targetId = link.getAttribute('href').substring(1); // Remove o "#" do href
        const targetSection = document.getElementById(targetId);

        const targetPosition = targetSection.offsetTop - getHeaderHeight() + 10;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Aguarda um tempo para liberar o controle
        setTimeout(() => {
            isClicking = false;
        }, 800); // Tempo suficiente para o scroll suave
    });
});

// Atualização dinâmica do estado do menu com base na rolagem
window.onscroll = () => {
    if (isClicking) return; // Evita que o scroll sobrescreva durante o clique

    let scrollPosition = window.scrollY;

    sections.forEach(sec => {
        const offset = sec.offsetTop - getHeaderHeight(); // Compensação precisa do cabeçalho
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        // Verifica se o scroll está na seção atual
        if (scrollPosition >= offset && scrollPosition < offset + height) {
            navLinks.forEach(link => link.classList.remove('active')); // Remove a classe "active" de todos os links
            document.querySelector(`header nav a[href*="${id}"]`).classList.add('active'); // Ativa o link atual
        }
    });
};


document.addEventListener('DOMContentLoaded', () => {
    // Seleciona a seção que contém os contadores
    const sectionCounter = document.querySelector('.section-counter');
    const counters = document.querySelectorAll('.counter span');

    // Função para animar a contagem
    const animateCounter = (element, start, end, duration, prefix = '', suffix = '') => {
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1); // Progresso de 0 a 1
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = `${prefix}${value.toLocaleString()}${suffix}`; // Inclui prefixo e sufixo
            if (progress < 1) {
                window.requestAnimationFrame(step); // Continua a animação
            }
        };

        window.requestAnimationFrame(step);
    };

    // Função para ativar os contadores
    const activateCounters = () => {
        counters.forEach(counter => {
            const text = counter.textContent;
            const targetValue = parseInt(text.replace(/[^\d]/g, '')); // Extrai o número
            const isPercentage = text.includes('%'); // Checa se é porcentagem
            const isPositive = text.includes('+'); // Checa se é número positivo

            const prefix = isPositive ? '+' : ''; // Define o prefixo
            const suffix = isPercentage ? '%' : ''; // Define o sufixo

            // Define a duração proporcional ao valor final
            const duration = Math.max(500, Math.min(3000, targetValue * 10)); // Ajusta de 0.5s a 3s

            // Inicia a animação
            animateCounter(counter, 0, targetValue, duration, prefix, suffix);
        });
    };

    // Configura o Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateCounters();
                observer.disconnect(); // Para de observar após ativar
            }
        });
    }, { threshold: 0.5 }); // 50% da seção visível ativa o efeito

    // Observa a seção dos contadores
    if (sectionCounter) {
        observer.observe(sectionCounter);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const whatsAppButton = document.querySelector(".whatssap-contato");
    const targetSections = [document.querySelector("#main"), document.querySelector("footer")]; // Seções alvo

    if (targetSections.length && whatsAppButton) {
        const observer = new IntersectionObserver((entries) => {
            let shouldHideButton = false;

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    shouldHideButton = true; // Botão deve sumir se qualquer seção estiver visível
                }
            });

            if (shouldHideButton) {
                whatsAppButton.classList.remove("show");
            } else {
                whatsAppButton.classList.add("show");
            }
        }, { threshold: 0.1 }); // Ativa quando 10% da seção estiver visível

        // Observa todas as seções definidas
        targetSections.forEach(section => {
            if (section) observer.observe(section);
        });
    }
});

