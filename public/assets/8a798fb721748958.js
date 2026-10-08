(function ($) {
    const wdtIconBoxWidgetHandler = function($scope) {

    // Template Default - Detail Group Height
    var content_detail_height = $('.wdt-icon-box-holder[class*="template-default"] .wdt-content-item > .wdt-content-detail-group');
    var content_detail_assign_height = $('.wdt-icon-box-holder[class*="template-default"] .wdt-content-item');
    if( content_detail_height.length ) {
        content_detail_height.each(function(){
            var wdt_content_detail = $(this).outerHeight();
            content_detail_assign_height.css('--content-detail-height', wdt_content_detail+'px');
        });
    }

    // Hover On Active Class

    var icon_box_wdt_column = $scope.find('.wdt-icon-box-holder:not([class*="-ico-content-aside"]) .wdt-column-wrapper .wdt-column');
    $scope.find('.wdt-icon-box-holder:not([class*="-ico-content-aside"]) .wdt-column-wrapper .wdt-column:first-child').addClass('wdt-active');
    icon_box_wdt_column.mouseover( function() {
        if( !($(this).hasClass('wdt-active')) ) {
        $scope.find('.wdt-icon-box-holder:not([class*="-ico-content-aside"]) .wdt-column-wrapper .wdt-column').removeClass('wdt-active');
        $(this).addClass('wdt-active');
        }
    } );

    // Template Icon Content Aside - Toggle style (Only Default)

    var icon_wdt_column = $scope.find('.wdt-icon-box-holder[class*="-ico-content-aside"] > .wdt-content-item');
    var column_desc_height = $scope.find('.wdt-icon-box-holder[class*="-ico-content-aside"] > .wdt-content-item > .wdt-content-detail-group').height();
    column_desc_height = column_desc_height+'px';

    $scope.find('.wdt-icon-box-holder[class*="-ico-content-aside"] > .wdt-content-item > .wdt-content-detail-group').css({'--desc-height' : column_desc_height});

    $scope.find('.wdt-icon-box-holder[class*="-ico-content-aside"] > .wdt-content-item:nth-child(2)').addClass('wdt-active');
    icon_wdt_column.click( function() {
      if( !($(this).hasClass('wdt-active')) ) {
        $scope.find('.wdt-icon-box-holder[class*="-ico-content-aside"] > .wdt-content-item').removeClass('wdt-active');
        $(this).addClass('wdt-active');
      }
    } );
};

$(window).on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/wdt-icon-box.default', wdtIconBoxWidgetHandler);
});


})(jQuery);