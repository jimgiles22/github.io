$(function(){

    waitForWebfonts(['Merriweather', 'Myriad Pro'], function() {
        if(typeof Reveal !== "undefined"){
            Reveal.initialize({
                width: 1280,
                height: "100%",
                minScale: 1,
                maxScale: 1,
                margin: 0,
                center: false,
                transition: 'none',
                viewDistance: 1,
                slideNumber: true,
                controls: false,
            }); 
            
            Reveal.addEventListener( 'slidechanged', function( event ) {
                initCards();
            });   

            initCards();

        } else {
            initCards();
        }     
    });

});

function initCards(){
    // $(".content p").hover(function(){
    //     var cardID = $(this).attr("id")
    //     $(".card[data-target='"+cardID+"']").children(".card-image").addClass("hover")
    // })

    // $(".card-image").click(function(){
    //      var width = $(this).parent(".card").find(".inner").data("width")
    //     $(".active div.chart div.bar div.inner").css("width", width)
    // })
   

    $('.gutter > .card').each(function(){
        var card = this;
        var cardImage = $(this).find('.card-image');

        setOffset(card);

        cardImage.removeClass('hide');

        cardImage.click(function(){
            $('.card.active, .card-group.active').removeClass('active');
            $(card).addClass('active');
            // $(this).parent(".card").children(".card-content").fadeIn("fast");
            // $(this).parent(".card").children(".card-content").css("-webkit-transform","translate(0,0em)");

        });
    });

    $('.gutter > .card-group').each(function(){

        var cardGroup = this;

        setOffset(cardGroup);

        var cards = $(cardGroup).find('.card');

        $('.card:last-child .card-image').removeClass('hide');
        $('.card:last-child').addClass('selected');

        $(cardGroup).find('.card-image').click(function(){
            $('.card.active, .card-group.active').removeClass('active');
            $(cardGroup).addClass('active');
        });

        $(cardGroup).find('.card-tabs li:last-child').addClass('selected');

        $(cardGroup).find('.card-tabs li').each(function(i){
            $(this).click(function(){
                $(cardGroup).find('.card-tabs li.selected ').removeClass('selected');
                $(this).addClass('selected');
                $(cardGroup).find('.card').removeClass('selected');
                $(cardGroup).find('.card .card-image').addClass('hide');
                $(cardGroup).find('.card:eq(' + i + ')').addClass('selected');
                $(cardGroup).find('.card:eq(' + i + ') .card-image').removeClass('hide');
            });
        });
    });
}

function setOffset(element){
    var target_id = $(element).data('target');
    var offset = $('#'+target_id).offset().top - 15;
    $(element).css("top", offset);
}

function waitForWebfonts(fonts, callback) {
    var loadedFonts = 0;
    for(var i = 0, l = fonts.length; i < l; ++i) {
        (function(font) {
            var node = document.createElement('span');
            // Characters that vary significantly among different fonts
            node.innerHTML = 'giItT1WQy@!-/#';
            // Visible - so we can measure it - but not on the screen
            node.style.position      = 'absolute';
            node.style.left          = '-10000px';
            node.style.top           = '-10000px';
            // Large font size makes even subtle changes obvious
            node.style.fontSize      = '300px';
            // Reset any font properties
            node.style.fontFamily    = 'sans-serif';
            node.style.fontVariant   = 'normal';
            node.style.fontStyle     = 'normal';
            node.style.fontWeight    = 'normal';
            node.style.letterSpacing = '0';
            document.body.appendChild(node);

            // Remember width with no applied web font
            var width = node.offsetWidth;

            node.style.fontFamily = font;

            var interval;
            function checkFont() {
                // Compare current width with original width
                if(node && node.offsetWidth != width) {
                    ++loadedFonts;
                    node.parentNode.removeChild(node);
                    node = null;
                }

                // If all fonts have been loaded
                if(loadedFonts >= fonts.length) {
                    if(interval) {
                        clearInterval(interval);
                    }
                    if(loadedFonts == fonts.length) {
                        callback();
                        return true;
                    }
                }
            };

            if(!checkFont()) {
                interval = setInterval(checkFont, 50);
            }
        })(fonts[i]);
    }
};