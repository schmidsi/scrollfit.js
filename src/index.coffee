_raf       = require 'requestanimationframe'

_          = {}
_.defaults = require 'amp-defaults'


DEFAULTS =
    # amount of increasing or decreasing the fontsize
    step: 0.25

    # bind resize handler?
    onResize: true

    # the maximum font size in pixel. set to 'initial', to disable
    # growing over the initial font size
    maxFontSize: 100

    # the maximum font size in pixel. set to 'initial', to disable
    # shrinking over the initial font size
    minFontSize: 1


class ScrollFit
    constructor: (el, options = {}) ->
        if not el then return false

        @options = _.defaults( options, DEFAULTS )

        @el = el

        style = window.getComputedStyle( @el )
        @fontSize = parseInt( style.fontSize )

        if not @fontSize
            throw new Error('scrollfit: cannot determine fontsize of el')

        if options.maxFontSize is 'initial'
            @maxFontSize = @fontSize
        else
            @maxFontSize = options.maxFontSize

        if options.minFontSize is 'initial'
            @minFontSize = @fontSize
        else
            @minFontSize = options.minFontSize

        @update()

        if @options.onResize
            window.addEventListener 'resize', @onResize.bind(@)

    update: ->
        # silently abort if there is no @el
        if not @el then return false

        @candidate = @maxFontSize

        if @inBounds() then @grow() else @shrink()

    onResize: ->
        if not @ticking
            @ticking = true
            @candidate = @maxFontSize

            if @inBounds()
                window.requestAnimationFrame( @grow.bind(@) )
            else
                window.requestAnimationFrame( @shrink.bind(@) )

    inBounds: ->
        return @el.clientHeight + (@fontSize / 8) >= @el.scrollHeight and
               @el.clientWidth  + (@fontSize / 8) >= @el.scrollWidth

    grow: ->
        @fontSize += @options.step

        if @fontSize >= @candidate or @fontSize >= @maxFontSize
            return @ticking = false

        @el.style.fontSize = @fontSize + 'px'

        if @inBounds()
            @grow()
        else
            @candidate = @fontSize
            @shrink()

    shrink: ->
        @fontSize -= @options.step

        if @fontSize <= @minFontSize
            return @ticking = false

        @el.style.fontSize = @fontSize + 'px'

        if @inBounds() then @grow() else @shrink()


module.exports = window.ScrollFit = ScrollFit
