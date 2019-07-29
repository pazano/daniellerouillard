!function(e,o,n){window.HSCW=o,window.HS=n,n.beacon=n.beacon||{};var t=n.beacon;t.userConfig={},t.readyQueue=[],t.config=function(e){this.userConfig=e},t.ready=function(e){this.readyQueue.push(e)},o.config={docs:{enabled:!1,baseUrl:""},contact:{enabled:!0,formId:"2b5be479-3459-11e8-8d65-0ee9bb0328ce"}};var r=e.getElementsByTagName("script")[0],c=e.createElement("script");c.type="text/javascript",c.async=!0,c.src="https://djtflbt20bdde.cloudfront.net/",r.parentNode.insertBefore(c,r)}(document,window.HSCW||{},window.HS||{});

// Beacon Config
HS.beacon.config({
	modal: true,
	color: '#000000',
	icon: 'message',
	poweredBy: false,
	showName: true,
	showSubject: true,
	zIndex: 1000000,
	topArticles: false,
	autoInit: false,
	attachment: true,
	instructions: ' ',
	translation: {
		topicLabel: 'Support Type',
		contactLabel: 'Submit a Ticket',
		sendLabel: 'Submit'
	},
	topics: [
		{ val: 'bug', label: 'Bug' },
		{ val: 'question', label: 'Question' },
		{ val: 'contact-form-issues', label: 'Contact Form Issues' },
		{ val: 'css-customization', label: 'CSS Customization' },
		{ val: 'feature-request', label: 'Feature Request' },
		{ val: 'flohub', label: 'FloHub' },
		{ val: 'floforms', label: 'FloForms' },
		{ val: 'floinstagram', label: 'FloInstagram' },
		{ val: 'font-issues', label: 'Font Issues' },
		{ val: 'image-quality-and-sizing', label: 'Image Quality and Sizing' },
		{ val: 'other', label: 'Other' }
	]
});
