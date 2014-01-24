(function($) {
    $._fbsticker = {
		instances: {},
		nextState: function(el_id) 
		{
			// Load Params //
			var options = $._fbsticker.instances[el_id]['options'];
			var istate  = $._fbsticker.instances[el_id]['istate'];
			var loops	= $._fbsticker.instances[el_id]['loops'];
			// //
			if(!options.states || options.states.length == 0) return false;
			var x = istate;
			if(x == options.states.length){x=0;istate=0;loops++;} 
			if(loops>0&&loops==options.loops){
				clearInterval( $._fbsticker.instances[el_id]['interval'] );
				$._fbsticker.instances[el_id]['interval'] = false;
				return false;
			}
			var arr = options.states[x]; 
			istate++;
			
			// Save Params //
			$._fbsticker.instances[el_id]['istate'] = istate;
			$._fbsticker.instances[el_id]['loops'] = loops;
			// //
			
			return arr;
            
		},
		nextFrame: function(node)
		{
			var el_id = $(node).attr('id'); //console.log('nextFrame > ' + el_id)
			var state = $._fbsticker.nextState(el_id); 
			if(!state){
				$._fbsticker.instances[el_id]['istate'] = 0;
				$._fbsticker.instances[el_id]['loops'] = 0;
				$._fbsticker.instances[el_id]['isStart'] = false; 
				return false;
			} 
			$(node).css('background-position-x', state[0] + 'px' );
			$(node).css('background-position-y', state[1] + 'px' );
		},
		start: function(node)
		{
			var el_id = $(node).attr('id'); // console.log(el_id);
			if(!$._fbsticker.instances[el_id]){ console.warn('Obejo aun no inicializado');return false;}
			// Load Params //
			var options = $._fbsticker.instances[el_id]['options'];
			var istate  = $._fbsticker.instances[el_id]['istate'];
			var loops	= $._fbsticker.instances[el_id]['loops'];
			// //
			if(!options.states || options.states.length == 0) return false;
			//var scope = parent;
			
			if( !$._fbsticker.instances[el_id]['isStart'] ){ 
				$._fbsticker.instances[el_id]['isStart'] = true; 
				
				$._fbsticker.instances[el_id]['interval'] = setInterval(function(){
					$._fbsticker.nextFrame(node);
				},options.interval)
			}
			
		},
		stop: function(node)
		{ 
			var el_id = $(node).attr('id');
			if(!$._fbsticker.instances[el_id]){ console.warn('Obejo aun no inicializado');return false;}
			$._fbsticker.instances[el_id]['isStart'] = false;
			window.clearInterval( $._fbsticker.instances[el_id]['interval'] );
			$._fbsticker.instances[el_id]['interval'] = false;
		},
		toggle: function(node){
			var el_id = $(node).attr('id');
			if(!$._fbsticker.instances[el_id]){ console.warn('Obejo aun no inicializado');return false;}
			$._fbsticker.instances[el_id]['isStart'] ? $._fbsticker.stop(node) : $._fbsticker.start(node);
		}
	};
	
	jQuery.fn.extend({
		fbsticker: function(options)
		{
			if (!$._fbsticker.instances) { $._fbsticker.instances = {}; }
			var opts = options;
			this.each( function() { // FOR MULTIPLE SELECTOR

			var defaults = {    		
				interval:150
				,backgroundImage: (typeof jQuery(this).data('backgroundImage') != 'undefined')?jQuery(this).data('backgroundImage'):false
				,width: (typeof jQuery(this).data('width') != 'undefined')?jQuery(this).data('width'):false
				,height: (typeof jQuery(this).data('height') != 'undefined')?jQuery(this).data('height'):false
				,backgroundSizeW: (typeof jQuery(this).data('backgroundSizeW') != 'undefined')?jQuery(this).data('backgroundSizeW'):false
				,backgroundSizeH: (typeof jQuery(this).data('backgroundSizeH') != 'undefined')?jQuery(this).data('backgroundSizeH'):false
				,start: (typeof jQuery(this).data('start') != 'undefined')?jQuery(this).data('start'):true
				,states: (typeof jQuery(this).data('states') != 'undefined')?jQuery(this).data('states'):[]
				,loops: (typeof jQuery(this).data('loops') != 'undefined')?jQuery(this).data('loops'):0
			}
			
			var options = $.extend({}, defaults, opts); 
			var istate = 0;
			var now;
			var sint = false;
			var sints = {};
			var loops = 0;
			var isStart = false;
			var parent = this;

			var el_id = $(this).attr('id'); //console.log(this); console.log(el_id);
			
			if( $._fbsticker.instances[el_id] ){
				console.warn('Ya se ha iniciado objeto con id:' + el_id);
				return this;
			}
			$._fbsticker.instances[el_id] = {};
				$._fbsticker.instances[el_id]['options'] = options;
				$._fbsticker.instances[el_id]['istate'] = 0;
				$._fbsticker.instances[el_id]['sint'] = false;
				$._fbsticker.instances[el_id]['loops'] = 0;
				$._fbsticker.instances[el_id]['isStart'] = false;
		
			
			// Draw The Image //
			if(options.height){ jQuery(this).css('height',options.height); }
			if(options.width){ jQuery(this).css('width',options.width); }
			if(options.backgroundImage){ jQuery(this).css('background-image','url(' + options.backgroundImage + ')'); }
			if(options.backgroundSizeW && options.backgroundSizeH){ jQuery(this).css('background-size', options.backgroundSizeW + 'px ' + options.backgroundSizeH + 'px'); }
			if(options.backgroundPositionX){ jQuery(this).css('background-position-x', options.backgroundPositionX + 'px'); }
			if(options.backgroundPositionY){ jQuery(this).css('background-position-y', options.backgroundPositionY + 'px'); }

			if( options.start ){ 
				$._fbsticker.start(this);
			}
			
			}); // END MULTIPLE SELECTOR
			return this;
		},
		fbsticker_start: function(){ $._fbsticker.start(this);return this; },
		fbsticker_stop: function(){ $._fbsticker.stop(this);return this; },
		fbsticker_toggle: function(){ $._fbsticker.toggle(this);return this; }
	});
	
})(jQuery);



