#_raf     = require 'requestanimationframe'
domready = require 'domready'
each     = require 'amp-each'


class ScrollFit
    constructor: (el, options) ->
        @el = el
        @updateBounds()
        @maxFontSize = undefined

        style = window.getComputedStyle( @el )
        @lastFontSize = @initialFontSize = @fontSize = parseInt( style.fontSize )

        console.log
            el: el
            inBounds: @inBounds()
            clientHeight: el.clientHeight
            scrollHeight: el.scrollHeight
            clientWidth: el.clientWidth
            scrollWidth: el.scrollWidth

        if @inBounds() then @grow() else @shrink()


    updateBounds: ->
        @clientHeight = @el.clientHeight
        @scrollHeight = @el.scrollHeight
        @clientWidth = @el.clientWidth
        @scrollWidth = @el.scrollWidth

    inBounds: ->
        return @clientHeight >= @scrollHeight and
            @clientWidth >= @scrollWidth

    grow: ->
        @lastFontSize = @fontSize
        @fontSize++

        if @fontSize >= @maxFontSize then return false

        @el.style.fontSize = @fontSize + 'px'

        @updateBounds()

        if @inBounds()
            @grow()
            # return window.requestAnimationFrame( @grow.bind(@) )
        else
            @maxFontSize = @fontSize
            @shrink()
            #return window.requestAnimationFrame( @shrink.bind(@) )

    shrink: ->
        @lastFontSize = @fontSize
        @fontSize--

        @el.style.fontSize = @fontSize + 'px'

        @updateBounds()

        if @inBounds() then @grow() else @shrink()


        #    window.requestAnimationFrame( @grow.bind(@) )
        #else
        #    window.requestAnimationFrame( @shrink.bind(@) )





domready ->
    els = document.querySelectorAll('[data-hook~=scrollfit]')

    each els, (el) ->
        new ScrollFit(el)
