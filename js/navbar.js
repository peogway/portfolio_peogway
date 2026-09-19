async function loadNavbar() {
	const root = document.getElementById('navbar-root')

	if (!root) {
		return
	}

	const response = await fetch('components/navbar.html')

	if (!response.ok) {
		throw new Error('Failed to load navbar')
	}

	root.innerHTML = await response.text()

	const navbar = root.querySelector('.navbar')
	const navMenu = root.querySelector('#nav-menu')
	const navToggle = root.querySelector('#nav-toggle')
	const themeToggle = root.querySelector('#theme-toggle')

	navToggle.addEventListener('click', () => {
		const open = navMenu.classList.toggle('open')

		navToggle.classList.toggle('active', open)
		navToggle.setAttribute('aria-expanded', String(open))
	})

	root.querySelectorAll('.nav-link').forEach((link) => {
		link.addEventListener('click', () => {
			navMenu.classList.remove('open')
			navToggle.classList.remove('active')
			navToggle.setAttribute('aria-expanded', 'false')
		})
	})

	const savedTheme = localStorage.getItem('theme')

	if (savedTheme === 'dark') {
		document.documentElement.dataset.theme = 'dark'
	}

	updateThemeIcon(themeToggle)

	themeToggle.addEventListener('click', () => {
		const isDark = document.documentElement.dataset.theme === 'dark'

		if (isDark) {
			delete document.documentElement.dataset.theme
			localStorage.setItem('theme', 'light')
		} else {
			document.documentElement.dataset.theme = 'dark'
			localStorage.setItem('theme', 'dark')
		}

		updateThemeIcon(themeToggle)
	})

	let lastScrollY = window.scrollY

	window.addEventListener('scroll', () => {
		const currentScrollY = window.scrollY

		navbar.classList.toggle('nav-scrolled', currentScrollY > 10)

		if (currentScrollY > lastScrollY && currentScrollY > 120) {
			navbar.classList.add('nav-hidden')
		} else {
			navbar.classList.remove('nav-hidden')
		}

		lastScrollY = currentScrollY
	})
}

function updateThemeIcon(button) {
	const isDark = document.documentElement.dataset.theme === 'dark'

	button.innerHTML = isDark
		? '<i class="fa-solid fa-sun"></i>'
		: '<i class="fa-solid fa-moon"></i>'
}

loadNavbar().catch(console.error)

