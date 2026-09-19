async function loadComponents() {
	const components = document.querySelectorAll('[data-component]')

	for (const element of components) {
		const response = await fetch(element.dataset.component)

		if (!response.ok) {
			throw new Error(`Failed to load ${element.dataset.component}`)
		}

		element.innerHTML = await response.text()
	}
}

function setupReveal() {
	const elements = document.querySelectorAll(
		'.experience-item, .timeline-item, .sidebar-block, .contact-list li',
	)

	elements.forEach((element) => {
		element.classList.add('reveal')
	})

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('in-view')
					observer.unobserve(entry.target)
				}
			})
		},
		{
			threshold: 0.1,
		},
	)

	elements.forEach((element) => observer.observe(element))
}

async function init() {
	await loadComponents()

	const sidebarRoot = document.getElementById('sidebar-root')
	const footerRoot = document.getElementById('footer-root')

	const sidebarResponse = await fetch('components/sidebar.html')
	const footerResponse = await fetch('components/footer.html')

	if (!sidebarResponse.ok || !footerResponse.ok) {
		throw new Error('Failed to load shared components')
	}

	sidebarRoot.innerHTML = await sidebarResponse.text()
	footerRoot.innerHTML = await footerResponse.text()

	setupReveal()
}

init().catch(console.error)

