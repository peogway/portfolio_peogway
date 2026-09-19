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
	const mobileMenuPanels = root.querySelector('.mobile-menu-panels')
	const mobileMenuBackdrop = root.querySelector('#mobile-menu-backdrop')
	let menuOpen = false

	const setMenuState = (open) => {
		menuOpen = open
		navMenu.classList.toggle('open', open)
		navbar.classList.toggle('menu-open', open)
		mobileMenuPanels.classList.toggle('open', open)
		mobileMenuBackdrop.classList.toggle('open', open)
		navToggle.classList.toggle('active', open)
		navToggle.setAttribute('aria-expanded', String(open))
		document.body.classList.toggle('menu-locked', open)

		if (open) {
			const scrollbarWidth =
				window.innerWidth - document.documentElement.clientWidth
			document.body.style.setProperty(
				'--menu-scrollbar-compensation',
				`${scrollbarWidth}px`,
			)
		} else {
			document.body.style.removeProperty('--menu-scrollbar-compensation')
		}
	}

	const closeMenu = () => {
		setMenuState(false)
	}

	navToggle.addEventListener('click', (event) => {
		event.stopPropagation()

		navbar.classList.remove('nav-hidden')
		setMenuState(!menuOpen)
	})

	mobileMenuBackdrop.addEventListener('click', closeMenu)

	document.addEventListener('click', (event) => {
		if (
			navMenu.classList.contains('open') &&
			!navMenu.contains(event.target) &&
			!navToggle.contains(event.target) &&
			!mobileMenuPanels.contains(event.target) &&
			!mobileMenuBackdrop.contains(event.target)
		) {
			closeMenu()
		}
	})

	root.querySelectorAll('.nav-link, .mobile-nav-link').forEach((link) => {
		link.addEventListener('click', () => {
			closeMenu()
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

		if (menuOpen) {
			navbar.classList.remove('nav-hidden')
			lastScrollY = currentScrollY
			return
		}

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
		? '<svg aria-hidden="true" viewBox="0 0 20 20"><path fill="currentColor" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path></svg>'
		: '<svg aria-hidden="true" viewBox="0 0 20 20"><path fill="currentColor" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>'
}

loadNavbar().catch(console.error)

