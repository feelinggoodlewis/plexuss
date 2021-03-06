// GetStarted_Step8_Component.jsx
var percentage;

function wasRedirected(){
    return JSON.parse(sessionStorage.getItem('college_id'));
};

function currentPercentage(pct){
    if(pct) percentage = pct;
    return percentage;
};

var PLANS = [
	{
		name: 'Basic',
		plan: 'basic',
		choose_route: '/portal',
		features: [
			{details: 'Research Colleges'},
			{details: 'Connect with Colleges'},
			{details: 'Track which Colleges viewed you'},
			{details: 'Send messages'},
			{details: 'Chat with Colleges'},
		],
	},
	{
		name: 'Premium',
		confirmation_name: 'Plexuss Premium Membership',
		success_msg: 'Plexuss Premium',
		price: 99,
		plan: 'onetime',
		price_details: 'with Plexuss',
		total_savings: 'Total Savings of $325-575',
		choose_route: '/checkout/premium',
		change_plan_route: '/checkout/premium',
		features: [
			{name: 'Apply to 5', details: 'select universities for FREE', savings: 'Savings of $125-375'},
			{name: '1-on-1 meeting', details: 'with a professional advisor', savings: 'Savings of $200'},
			{name: 'Review 20 essays', details: 'from accepted students to top US universities'},
		],
	},
	{
		name: 'Premium Plus',
		confirmation_name: 'Plexuss Premium Plus Membership',
		success_msg: 'Plexuss Premium Plus',
		price: 199,
		plan: 'onetime_plus',
		price_details: 'with Plexuss',
		total_savings: 'Total Savings of $550-950',
		choose_route: '/checkout/premium-plus',
		change_plan_route: '/checkout/premium',
		features: [
			{name: 'Apply to 10', details: 'select universities for FREE', savings: 'Savings of $350-750'},
			{name: '1-on-1 meeting', details: 'with a professional advisor', savings: 'Savings of $200'},
			{name: 'Review 50 essays', details: 'from accepted students to top US universities'},
		],
	},
];

var GetStarted_Step8_Component = React.createClass({displayName: "GetStarted_Step8_Component",
	getInitialState: function(){
		return {
			step_num: null,
			is_sending: false,
			plan_count: 3,
			plans: [],
			plan_ui: []
		};
	},

	componentWillMount: function(){
		// Facebook event tracking
        fbq('track', 'GetStarted_Step8_Membership_Page');

		this._getInitData();
	},

	_getInitData: function(){
		var _this = this;
		$.ajax({
			url: '/get_started/getDataFor/step8',
			type: 'GET',
			headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
		})
		.done(function(data) {
			_this.setState({user: data});
		});
	},

	start: function(){
		this.setState({is_sending: !0});

		$.ajax({
            url: '/get_started/upgradeMembershipStepDone',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: {done: 1},
            type: 'POST'
        }).done(function(data){
			window.location.href = '/portal';
		});
	},

	upgrade: function(e){
		var target = e.target.id, route = '/settings/billing?upgrade=1';

		if( target === 'premium_monthly' ) route = '/settings/billing?upgrade=2';

		this.setState({is_sending: !0});
		
		$.ajax({
            url: '/get_started/upgradeMembershipStepDone',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: {done: 1},
            type: 'POST'
        }).done(function(data){
			window.location.href = route;
		});
	},

	_turnOffCoveted: function(){
		var newState = _.extend({}, this.state),
			newUserState = _.extend({}, newState.user, {scheduled: 1});

		newState.user = newUserState;
		this.setState(newState);
	},

	render: function(){
		var s = this.state;

		return (
			

			


			React.createElement(CovetedScheduler, {turnOffCoveted: this._turnOffCoveted})

			

		);
	}
});

var CovetedScheduler = React.createClass({displayName: "CovetedScheduler",
	componentWillMount: function(){
		var scheduler = $('#coveted_schedular'),
			actionBtns = '<div class="row actionBtns-row" id="coveted_actionbuttns_row">';

		scheduler.show();

		actionBtns += '<div class="column small-12 medium-4 text-center">';
		actionBtns += '<div><u id="coveted_back_btn">Go back</u></div>';
		actionBtns += '</div>';

		actionBtns += '<div class="column small-12 medium-4 text-center">';
		actionBtns += '<div><u id="coveted_skip_btn">Skip</u></div>';
		actionBtns += '</div>';

		actionBtns += '<div class="column small-12 medium-4 text-center">';
		actionBtns += '<button id="coveted_next_action_btn" class="button radius next-action">Next</button>';
		actionBtns += '</div>';

		actionBtns += '</div>';

		$('body').append(actionBtns);

		this._addEventHandlersToActionBtns();
	},

	_addEventHandlersToActionBtns: function(){
		document.getElementById('coveted_next_action_btn').addEventListener('click', this._handleNext);
		document.getElementById('coveted_skip_btn').addEventListener('click', this._handleSkip);
		document.getElementById('coveted_back_btn').addEventListener('click', this._handleBack);
	},

	_handleNext: function(){
		// this.props.turnOffCoveted();
		window.location.href="/checkout/premium";
	},

	_handleSkip: function(){
		// this.props.turnOffCoveted();
		window.location.href="/checkout/premium";
	},

	_handleBack: function(){
		window.location.href='/get_starte/7';
	},

	componentWillUnmount: function(){	
		document.getElementById('coveted_next_action_btn').removeEventListener('click', this._handleNext);
		document.getElementById('coveted_skip_btn').removeEventListener('click', this._handleSkip);
		document.getElementById('coveted_back_btn').removeEventListener('click', this._handleBack);
		$('#coveted_schedular').hide();
		$('#coveted_actionbuttns_row').remove();
	},

	render: function(){
		return (
			React.createElement("div", {className: "row collapse coveted-header"}, 
				React.createElement("div", {className: "column small-12"}, 
					React.createElement("h3", null, 'Congratulations! You have been granted a free college consultation interview.'), 
					React.createElement("div", null, 'Please choose the best time to speak with a representative')
				)
			)
		);
	}
});

var Plan = React.createClass({displayName: "Plan",
	render: function(){
		var plan = this.props.plan;

		return (
			React.createElement("div", {className: "plan "+plan.name}, 

				React.createElement("div", {className: "name "+plan.name},  plan.name), 
				 plan.price && React.createElement("div", {className: "price"}, 
									React.createElement("div", {className: "amt"}, 
										React.createElement("div", {className: "dollar"}, "$"), 
										 plan.price, 
										React.createElement("div", {className: "wp"}, "with Plexuss")
									)
								), 

				 plan.features.map(function(f){ return React.createElement("div", {key:  f.name, className: "feature"}, 
															React.createElement("div", null,  f.name && React.createElement("b", null,  f.name), " ",  f.details), 
															 f.savings && React.createElement("div", {className: "savings"},  f.savings)
														);}), 

				React.createElement("div", {className: "text-center"}, 
					React.createElement("a", {href:  plan.choose_route, className: "choose"}, React.createElement("span", null, "Choose Plan"))
				), 

				 plan.total_savings && React.createElement("div", {className: "savings total"},  plan.total_savings)
				
			)
		);
	}
});

var Feature = React.createClass({displayName: "Feature",
	getInitialState: function(){
		return {
			is_hovering: !1,
		};
	},

	showTip: function(){
		this.setState({is_hovering: !0});
	},

	hideTip: function(){
		this.setState({is_hovering: !1});
	},

	render: function(){
		var item = this.props.item, checkmark = [React.createElement("div", {key: -1}, "✓")];

		return (
			React.createElement("li", {className: "feature-item"}, 

				React.createElement("div", {className: "checkmark"}, checkmark), 
				React.createElement("div", null, item.description), 

				 item.tip ? 

					React.createElement("div", {className: "tip dark", onMouseEnter: this.showTip, onMouseLeave: this.hideTip}, 
						'?', 
						 this.state.is_hovering ? React.createElement(Tip, {direction: "up", title: item.description, tip: item.tip, img: item.img}) : null, 
						 this.state.is_hovering ? React.createElement(Arrow, {direction: "up"}) : null
					)

				: null
					
			)
		);
	}
});

var Tip = React.createClass({displayName: "Tip",
	render: function(){
		var p = this.props, classes = 'tip-container ' + p.direction,
			bg_img = p.img ? {backgroundImage: 'url('+p.img+')'} : '';

		if( p.img ) classes += ' has-bg';

		return (
			React.createElement("div", {className: classes}, 
				React.createElement("div", null, React.createElement("b", null, p.title, ': ', " "), p.tip), 
				 p.img ? React.createElement("div", {className: "is-bg", style: bg_img}) : null
			)
		);
	}
});

var Arrow = React.createClass({displayName: "Arrow",
	render: function(){
		var classes = 'arrow ' + this.props.direction;
		return (
			React.createElement("div", {className: classes})
		);
	}
});

var Display = React.createClass({displayName: "Display",
	render: function(){
		return (this.props.if) ? React.createElement("div", null, this.props.children) : null;
	}
});

var Loader = React.createClass({displayName: "Loader",
	render: function(){
		return(
			React.createElement("div", {className: "gs-loader"}, 
				React.createElement("svg", {width: "70", height: "20"}, 
                    React.createElement("rect", {width: "20", height: "20", x: "0", y: "0", rx: "3", ry: "3"}, 
                        React.createElement("animate", {attributeName: "width", values: "0;20;20;20;0", dur: "1000ms", repeatCount: "indefinite"}), 
                        React.createElement("animate", {attributeName: "height", values: "0;20;20;20;0", dur: "1000ms", repeatCount: "indefinite"}), 
                        React.createElement("animate", {attributeName: "x", values: "10;0;0;0;10", dur: "1000ms", repeatCount: "indefinite"}), 
                        React.createElement("animate", {attributeName: "y", values: "10;0;0;0;10", dur: "1000ms", repeatCount: "indefinite"})
                    ), 
                    React.createElement("rect", {width: "20", height: "20", x: "25", y: "0", rx: "3", ry: "3"}, 
                        React.createElement("animate", {attributeName: "width", values: "0;20;20;20;0", begin: "200ms", dur: "1000ms", repeatCount: "indefinite"}), 
                        React.createElement("animate", {attributeName: "height", values: "0;20;20;20;0", begin: "200ms", dur: "1000ms", repeatCount: "indefinite"}), 
                        React.createElement("animate", {attributeName: "x", values: "35;25;25;25;35", begin: "200ms", dur: "1000ms", repeatCount: "indefinite"}), 
                        React.createElement("animate", {attributeName: "y", values: "10;0;0;0;10", begin: "200ms", dur: "1000ms", repeatCount: "indefinite"})
                    ), 
                    React.createElement("rect", {width: "20", height: "20", x: "50", y: "0", rx: "3", ry: "3"}, 
                        React.createElement("animate", {attributeName: "width", values: "0;20;20;20;0", begin: "400ms", dur: "1000ms", repeatCount: "indefinite"}), 
                        React.createElement("animate", {attributeName: "height", values: "0;20;20;20;0", begin: "400ms", dur: "1000ms", repeatCount: "indefinite"}), 
                        React.createElement("animate", {attributeName: "x", values: "60;50;50;50;60", begin: "400ms", dur: "1000ms", repeatCount: "indefinite"}), 
                        React.createElement("animate", {attributeName: "y", values: "10;0;0;0;10", begin: "400ms", dur: "1000ms", repeatCount: "indefinite"})
                    )
                )
			)
		);
	}
});

ReactDOM.render( React.createElement(GetStarted_Step8_Component, null), document.getElementById('get_started_step8') );