/**
 * 
 * FloatingClouds jquery plugin
 *
 * Author : Oscar Chinellato @ SickDevelopers
 *
 * Version: 0.1
 *
 * Released under MIT License
 * 
 */
;(function( $ , undefined, window, document) {

	var pluginName = 'floatingClouds',
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function FloatingClouds(  options ) {

        // jQuery has an extend method that merges the 
        // contents of two or more objects, storing the 
        // result in the first object. The first object 
        // is generally empty because we don't want to alter 
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.clouds = [];
        this.init();
    }

    FloatingClouds.prototype.init = function () {

        this.container = $('<div></div>');
        this.container.css({
            width: '100%',
            height: 500,
            position: 'absolute',
            left: 0,
            top: 0,
            overflow: 'hidden',
            zIndex: -1
        });

        $('body').append(this.container);

        this.preload();

    };

    FloatingClouds.prototype.preload = function() {

        var that = this;

        for( var i = 0; i < this.options.images.length; i++ ) {

            var img = new Image();
            img.src = this.options.images[i];
            img.onload = function() {

                var cloud = {
                     img : this,
                    $el : $(this),
                    xpos : Math.random() * $(document).width() / 2 - $(this).width(),
                    ypos :  Math.random() * 100,
                    speed : Math.random() * 10
                };

                setTimeout(function() {
                    that.clouds.push(cloud);
                }, Math.random()*10000);

                that.applyCloud( cloud );
            };
        }
    };

    FloatingClouds.prototype.applyCloud = function( cloud ) {

        cloud.$el.addClass('cloud');
        cloud.$el.css({
            display: 'none',
            top: cloud.ypos,
            left: cloud.xpos
        })
        this.container.append(cloud.$el);
        cloud.$el.fadeIn();

        var that = this;

        var time = 15000 + Math.random()*5000;

        cloud.$el.animate({
            left: this.container.width()
        }, time, function() {
            $(this).fadeOut(function() {
                that.applyCloud(cloud);
            });
        });


    };

    $.extend( {
        floatingClouds : function ( options ) {
            return new FloatingClouds( options );
        }
    });


})( jQuery, undefined, window, document);