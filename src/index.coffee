_raf     = require 'requestanimationframe'
domready = require 'domready'
defaults = require 'amp-defaults'
each     = require 'amp-each'


class ScrollFit
    constructor: (el, options = {}) ->
        @options = defaults options,
            step: 0.25      # amount of increasing or decreasing the fontsize
            onResize: true  # bind resize handler?

        @el = el
        @maxFontSize = undefined

        style = window.getComputedStyle( @el )
        @lastFontSize = @initialFontSize = @fontSize = parseInt( style.fontSize )

        if @inBounds() then @grow() else @shrink()

        if @options.onResize
            window.addEventListener 'resize', @onResize.bind(@)

    onResize: ->
        if not @ticking
            @ticking = true
            @maxFontSize = undefined


            if @inBounds()
                window.requestAnimationFrame( @grow.bind(@) )
            else
                window.requestAnimationFrame( @shrink.bind(@) )

    inBounds: ->
        return @el.clientHeight + (@fontSize / 8) >= @el.scrollHeight and
               @el.clientWidth  + (@fontSize / 8) >= @el.scrollWidth

    grow: ->
        @lastFontSize = @fontSize
        @fontSize += @options.step

        if @fontSize >= @maxFontSize
            @ticking = false
            return false

        @el.style.fontSize = @fontSize + 'px'

        if @inBounds()
            @grow()
        else
            @maxFontSize = @fontSize
            @shrink()

    shrink: ->
        @lastFontSize = @fontSize
        @fontSize -= @options.step

        @el.style.fontSize = @fontSize + 'px'

        if @inBounds() then @grow() else @shrink()


domready ->
    els = document.querySelectorAll('[data-hook~=scrollfit]')

    each els, (el) ->
        new ScrollFit(el)


module.exports = ScrollFit
