/**
 * Navbar component
 * Injects the site navigation into #navbar-root and wires up:
 *   - hide-on-scroll-down / show-on-scroll-up behaviour
 *   - mobile hamburger toggle
 *   - dark / light theme toggle (persisted in localStorage)
 */
;(function () {
	const NAV_HTML = `
    <nav class="navbar" id="navbar">
      <div class="nav-container">
        <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>

        <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">🌙</button>

        <div class="nav-menu" id="navMenu">
          <a href="#home" class="nav-link">Home</a>
          <a href="#experience" class="nav-link">Experience</a>
		  <a href="#about" class="nav-link">About</a>
          <a href="#contact" class="nav-link">Contact</a>
        </div>
      </div>
    </nav>
  `

	function mountNavbar() {
		const root = document.getElementById('navbar-root')
		if (!root) return
		root.innerHTML = NAV_HTML

		setupScrollBehavior()
		setupMobileToggle()
		setupThemeToggle()
		closeMenuOnLinkClick()
	}

	/* ---------- Hide navbar on scroll down, show on scroll up ---------- */
	function setupScrollBehavior() {
		const navbar = document.getElementById('navbar')
		let lastScrollY = window.scrollY
		const revealThreshold = 12 // ignore tiny scroll jitters
		const scrolledThreshold = 10 // when to show the bottom border/blur

		window.addEventListener(
			'scroll',
			() => {
				const currentScrollY = window.scrollY

				navbar.classList.toggle(
					'nav-scrolled',
					currentScrollY > scrolledThreshold,
				)

				if (currentScrollY <= scrolledThreshold) {
					navbar.classList.remove('nav-hidden')
					lastScrollY = currentScrollY
					return
				}

				const delta = currentScrollY - lastScrollY

				if (delta > revealThreshold) {
					navbar.classList.add('nav-hidden')
					lastScrollY = currentScrollY
				} else if (delta < -revealThreshold) {
					navbar.classList.remove('nav-hidden')
					lastScrollY = currentScrollY
				}
			},
			{ passive: true },
		)
	}

	/* ---------- Mobile hamburger menu ---------- */
	function setupMobileToggle() {
		const toggle = document.getElementById('navToggle')
		const menu = document.getElementById('navMenu')

		toggle.addEventListener('click', () => {
			const isOpen = menu.classList.toggle('open')
			toggle.classList.toggle('active', isOpen)
			toggle.setAttribute('aria-expanded', String(isOpen))
		})
	}

	function closeMenuOnLinkClick() {
		const menu = document.getElementById('navMenu')
		const toggle = document.getElementById('navToggle')
		menu.querySelectorAll('.nav-link').forEach((link) => {
			link.addEventListener('click', () => {
				menu.classList.remove('open')
				toggle.classList.remove('active')
				toggle.setAttribute('aria-expanded', 'false')
			})
		})
	}

	/* ---------- Dark / light theme toggle ---------- */
	function setupThemeToggle() {
		const themeToggle = document.getElementById('themeToggle')
		const root = document.documentElement

		const stored = localStorage.getItem('theme')
		const prefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches
		const initialTheme = stored || (prefersDark ? 'dark' : 'light')

		applyTheme(initialTheme)

		themeToggle.addEventListener('click', () => {
			const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
			applyTheme(next)
			localStorage.setItem('theme', next)
		})

		function applyTheme(theme) {
			root.setAttribute('data-theme', theme)
			themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙'
		}
	}

	document.addEventListener('DOMContentLoaded', mountNavbar)
})()

