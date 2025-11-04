(function(){
	const CONTACT_CONFIG = {
		businessName: 'Prithvi Hearing Systems',
		phoneNumber: '+919846220012',
		mainPhone: '+91921377616',
		whatsAppNumber: '919846220012',
		email: 'prithvihearing@gmail.com',
		branches: [
			{ city: 'Kannur', phone: '98462 20012', address: 'Safa Complex, 1st Floor, Nr. College of Commerce, Old Bus stand, Kannur-1', phones: ['0497 2708750', '98462 20012', '94008 54654'] },
			{ city: 'Thalassery', phone: '79076 56319', address: 'Thalassery Branch - Full address to be updated' }
		],
		analyticsId: '',
		facebook: 'https://facebook.com/prithvihearing',
		instagram: 'https://instagram.com/prithvi.hearing',
		owner: 'Sadheep Sivanandan'
	};

	function phoneHref(){ return 'tel:' + CONTACT_CONFIG.phoneNumber; }
	function waHref(text){
		const t = encodeURIComponent(text || 'Hello, I would like to book a free hearing test.');
		return 'https://wa.me/' + CONTACT_CONFIG.whatsAppNumber + '?text=' + t;
	}

	function renderHeader(){
		const el = document.getElementById('site-header');
		if(!el) return;
		const width = window.innerWidth;
		let brandText = 'PRITHVI HEARING SYSTEMS';
		if(width <= 400) {
			brandText = 'PRITHVI';
		} else if(width <= 900) {
			brandText = 'PRITHVI';
		}
		el.innerHTML = [
			'<div class="header">',
			'<div class="container navbar">',
			'<a class="brand" href="/" aria-label="Prithvi Hearing Systems Home">',
			'<img class="brand-logo" src="/assets/img/logo.png" alt="Prithvi Hearing Systems Logo">',
			'<span>',brandText,'</span>',
			'</a>',
			'<nav class="navlinks" aria-label="Main navigation">',
			'<a href="/services.html">Services</a>',
			'<a href="/about.html">About</a>',
			'<a href="/faq.html">FAQ</a>',
			'<a href="/contact.html" class="cta">Contact</a>',
			'</nav>',
			'<a class="mobile-menu" href="',phoneHref(),'" aria-label="Call us">Call</a>',
			'</div></div>'
		].join('');
	}
	
	// Re-render header on resize for mobile text adjustment
	let resizeTimer;
	window.addEventListener('resize', function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function(){
			renderHeader();
		}, 150);
	});

	function renderFooter(){
		const el = document.getElementById('site-footer');
		if(!el) return;
		el.innerHTML = [
			'<footer class="footer">',
			'<div class="container">',
			'<div class="cols">',
			'<div><h3>Trust & Expertise</h3><p>Kerala\'s first specialized lab for custom ear molds and fast hearing-aid service. 20+ years of experience.</p></div>',
			'<div><h3>Contact</h3><p><strong>Phone:</strong> <a href="',phoneHref(),'">',CONTACT_CONFIG.phoneNumber,'</a><br><strong>WhatsApp:</strong> <a href="',waHref(),'">Chat Now</a><br><strong>Email:</strong> <a href="mailto:',CONTACT_CONFIG.email,'">',CONTACT_CONFIG.email,'</a></p></div>',
			'<div><h3>Follow</h3><p><a href="',CONTACT_CONFIG.facebook,'" target="_blank" rel="noopener">Facebook</a><br><a href="',CONTACT_CONFIG.instagram,'" target="_blank" rel="noopener">Instagram</a></p></div>',
			'</div>',
			'<div class="copy">© ',new Date().getFullYear(),' ',CONTACT_CONFIG.businessName,'. All rights reserved. | <a href="/sitemap.xml">Sitemap</a></div>',
			'</div></footer>'
		].join('');
	}

	function renderFloatingWA(){
		if(document.querySelector('.floating-wa')) return;
		const a = document.createElement('a');
		a.className = 'floating-wa';
		a.href = waHref('Hello! I would like to know more about your services.');
		a.setAttribute('aria-label','Chat on WhatsApp');
		a.setAttribute('target', '_blank');
		a.setAttribute('rel', 'noopener noreferrer');
		a.innerHTML = '<span class="wa-text">WhatsApp</span>';
		document.body.appendChild(a);
	}

	function attachFormHandler(){
		const form = document.querySelector('form[data-contact]');
		if(!form) return;
		form.addEventListener('submit', function(e){
			e.preventDefault();
			const status = form.querySelector('[data-status]');
			const submitBtn = form.querySelector('button[type="submit"]');
			const data = Object.fromEntries(new FormData(form).entries());
			
			const body = encodeURIComponent('Name: '+data.name+'%0APhone: '+data.phone+'%0AMessage: '+data.message);
			window.location.href = 'mailto:'+CONTACT_CONFIG.email+'?subject=Website enquiry&body='+body;
			
			status.textContent = 'Opening email client...';
			status.className = 'success';
			form.reset();
		});
	}

	function analytics(){
		if(!CONTACT_CONFIG.analyticsId) return;
		const script = document.createElement('script');
		script.async = true;
		script.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONTACT_CONFIG.analyticsId;
		document.head.appendChild(script);
		
		window.dataLayer = window.dataLayer || [];
		function gtag(){ dataLayer.push(arguments); }
		gtag('js', new Date());
		gtag('config', CONTACT_CONFIG.analyticsId);
	}

	document.addEventListener('DOMContentLoaded', function(){
		renderHeader();
		renderFooter();
		renderFloatingWA();
		attachFormHandler();
		analytics();
	});
})();

