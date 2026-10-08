
var dtDirectorSocialShare = {

	dtInit : function() {

		// Social Share Toggle

			jQuery('.wdt-listings-social-share-container').each(function () {

				jQuery(this).find('.wdt-listings-social-share-item-icon').on('click', function(e) {
					jQuery('.wdt-listings-social-share-container').removeClass('active');
					jQuery(this).parents('.wdt-listings-social-share-container').toggleClass('active');
					e.stopPropagation();
				});

			});

			jQuery('body:not(.wdt-listings-social-share-container)').on('click', function() {
				jQuery('.wdt-listings-social-share-container').each(function () {

					if(jQuery(this).length > 0 && jQuery(this).hasClass('active')) {
						jQuery(this).toggleClass('active');
					}

				});
			});


	}

};

jQuery(document).ready(function($) {

    // Check if not in Elementor preview mode
    if (!wdtfrontendobject.elementorPreviewMode) {
        dtDirectorSocialShare.dtInit();
    }

});

(function($) {

    var dtDirectorSocialShareJs = function($scope, $) {
        dtDirectorSocialShare.dtInit();
    };

    // Function to initialize the widget
    var initializeWidget = function() {
        if (wdtfrontendobject.elementorPreviewMode) {
            // Add action to initialize the widget when Elementor is ready
            elementorFrontend.hooks.addAction('frontend/element_ready/wdt-widget-sp-social-share.default', dtDirectorSocialShareJs);
        }
    };

    // Check if Elementor is already initialized
    if (typeof elementorFrontend !== 'undefined' && typeof elementorFrontend.hooks !== 'undefined') {
        initializeWidget();
    } else {
        // If Elementor is not initialized yet, wait for it to be initialized
        $(window).on('elementor/frontend/init', initializeWidget);
    }

})(jQuery);