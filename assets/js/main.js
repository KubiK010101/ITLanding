// Set fixed elements that need padding-right when locking the scroll
window.paddingRightItems = "#page-header";

// Locking scroll plugin options
var bodyScrollOptions = {
    reserveScrollBarGap: true,
    allowTouchMove: true,
};

function openModal(hrefModal) {
    if ($(hrefModal).length > 0) {
        $(hrefModal).trigger("beforeOpenModal").addClass("active");

        setTimeout(function() {
            $(hrefModal).addClass("fadeIn").trigger("afterOpenModal");
        }, 50);

        bodyScrollLock.clearAllBodyScrollLocks();
        bodyScrollLock.disableBodyScroll(hrefModal, bodyScrollOptions);
    }
}

function closeAllModals() {
    $(".popup-block.active").trigger("beforeCloseModal").removeClass("fadeIn");

    setTimeout(function() {
        $(".popup-block.active")
            .removeClass("active", function() {
                bodyScrollLock.clearAllBodyScrollLocks();
            })
            .trigger("afterCloseModal");

        bodyScrollLock.clearAllBodyScrollLocks();
    }, 200);
}

function closeModal(hrefModal) {
    $(hrefModal).trigger("beforeCloseModal").removeClass("fadeIn");

    setTimeout(function() {
        $(hrefModal)
            .removeClass("active", function() {
                bodyScrollLock.clearAllBodyScrollLocks();
            })
            .trigger("afterCloseModal");

        bodyScrollLock.clearAllBodyScrollLocks();
    }, 200);
}

$(document).keydown(function(event) {
    if (event.keyCode == 27) {
        closeAllModals();
    }
});

// Switch Modal function
$(document.body).on("click", '[data-toggle="switch-modal"]', function(e) {
    e.preventDefault();

    var hrefModal = $(this).attr("data-target");

    $(".popup-block:not(:hidden)").removeClass("fadeIn active");

    $(hrefModal).addClass("active").addClass("fadeIn").scrollTop(0);

    bodyScrollLock.disableBodyScroll($(hrefModal)[0], bodyScrollOptions);
});

// Basic open modal
$(document.body).on("click", '[data-toggle="modal"]', function(e) {
    e.preventDefault();

    var hrefModal = $(this).attr("data-target");

    openModal(hrefModal);
});

// Close modals if clicked on popup overlay
$(document.body).on("click", ".popup-block__overlay", function(e) {
    var closeButton = $(this).children('[data-toggle="modal-dismiss"]');

    if (!(e.target != this)) {
        closeModal($(this).parents(".popup-block")[0]);
    }
});

// Attribute for closing modals
$(document.body).on("click", '[data-toggle="modal-dismiss"]', function(e) {
    e.preventDefault();

    closeModal($(this).parents(".popup-block")[0]);
});

// Disable copy or paste possibility
$(document)
    .off("cut copy paste", ".no-paste")
    .on("cut copy paste", ".no-paste", function(e) {
        e.preventDefault();
    });

// Adding not-empty class if the input/textarea has value
$("input, textarea").each(function(e) {
    if ($(this).val() != "") {
        $(this).addClass("not-empty").parent().addClass("not-empty");
    } else {
        $(this).removeClass("not-empty").parent().removeClass("not-empty");
    }
});

$(document)
    .off("change focusout keydown keypress input", "input, textarea, select")
    .on(
        "change focusout keydown keypress input",
        "input, textarea, select",
        function(e) {
            if ($(this).val() != "") {
                $(this).addClass("not-empty").parent().addClass("not-empty");
            } else {
                $(this).removeClass("not-empty").parent().removeClass("not-empty");
            }
        }
    );

$(document)
    .off("focusin", "input, textarea, select")
    .on("focusin", "input, textarea, select", function(e) {
        $(this).parent().addClass("focused");
    });

$(document)
    .off("focusout", "input, textarea, select")
    .on("focusout", "input, textarea, select", function(e) {
        $(this).parent().removeClass("focused");
    });

$(document)
    .off("keypress keyup blur", ".only-digits")
    .on("keypress keyup blur", ".only-digits", function(event) {
        $(this).val(
            $(this)
            .val()
            .replace(/[^0-9]/g, "")
        );

        if (event.which < 48 || event.which > 57) {
            event.preventDefault();
        }
    });

function isNumberKey(evt) {
    var charCode = evt.which ? evt.which : event.keyCode;
    if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

$(document)
    .off("keypress keyup blur", 'input[type="tel"]')
    .on("keypress keyup blur", 'input[type="tel"]', function(event) {
        $(this).val(
            $(this)
            .val()
            .replace(/[^0-9\+]/g, "")
        );

        if (!isNumberKey(event)) {
            event.preventDefault();
        }
    });

$(document)
    .off("keypress keyup blur", ".only-floats")
    .on("keypress keyup blur", ".only-floats", function(event) {
        $(this).val(
            $(this)
            .val()
            .replace(/[^0-9\,.]/g, "")
        );

        if (
            ($(this).val().indexOf(".") != -1 || $(this).val().indexOf(",") != -1) &&
            (event.which < 48 || event.which > 57)
        ) {
            event.preventDefault();
        }
    });

$(document)
    .off("click", '[data-toggle="clear-input"]')
    .on("click", '[data-toggle="clear-input"]', function(e) {
        e.preventDefault();

        $(this).parent().find("input").val("").trigger("change");
    });

$('[data-toggle="scroll-to-top"]').click(function(e) {
    e.preventDefault();

    $("html,body").animate({
            scrollTop: 0,
        },
        600
    );
});

$('[data-toggle="anchor"]').click(function(e) {
    e.preventDefault();

    var dataTarget = $(this).attr("data-target"),
        targetPos = $(dataTarget).offset().top - 150;

    $("html,body").animate({
            scrollTop: targetPos,
        },
        400
    );
});

$('[data-toggle="tab"]').click(function(e) {
    e.preventDefault();

    var dataTarget = $(this).attr("data-target");

    if ($(this).parent().is("li")) {
        $(this)
            .addClass("active")
            .parent()
            .addClass("active")
            .siblings()
            .removeClass("active")
            .children()
            .removeClass("active");
    } else {
        $(this).addClass("active").siblings().removeClass("active");
    }

    $(dataTarget).addClass("active").siblings().removeClass("active");
});

$('input[type="number"]').on("keydown", function(e) {
    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) ||
        (/65|67|86|88/.test(e.keyCode) &&
            (e.ctrlKey === true || e.metaKey === true) &&
            (!0 === e.ctrlKey || !0 === e.metaKey)) ||
        (35 <= e.keyCode && 40 >= e.keyCode) ||
        ((e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) &&
            (96 > e.keyCode || 105 < e.keyCode) &&
            e.preventDefault());
});

// Form Validation
$.extend($.validator.messages, {
    required: "Это поле обязательное",
    email: "Введите правильный формат E-mail",
    url: "Введите правильный формат URL",
    date: "Введите правильный формат даты",
    number: "Введите цифры",
    digits: "Введите цифры",
    creditcard: "Введите правильную кредитную карточку",
    equalTo: "Поля должны соответствовать",
    maxlength: jQuery.validator.format("Максимальная длина - {0} знаков"),
    minlength: jQuery.validator.format("Минимальная длина - {0} знаков"),
    rangelength: jQuery.validator.format(
        "Длина должна быть между {0} и {1} знаками"
    ),
    range: jQuery.validator.format("Введите цифру между {0} и {1}"),
    max: jQuery.validator.format("Максимальное допустимое значение - {0}."),
    min: jQuery.validator.format("Минимально допустимое значение - {0}."),
});

$.validator.methods.email = function(value, element) {
    return (
        this.optional(element) ||
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
            value
        )
    );
};

$.validator.addMethod(
    "lettersonly",
    function(value, element) {
        return this.optional(element) || /^[a-zа-яё\-\s]+$/i.test(value);
    },
    "Вводить можно только буквы"
);

$.validator.methods.number = function(value, element) {
    return (
        this.optional(element) ||
        /^-?(?:\d+|\d{1,3}(?:[\s\.,]\d{3})+)(?:[\.,]\d+)?$/.test(value)
    );
};

$.validator.methods.range = function(value, element, param) {
    var globalizedValue = value.replace(",", ".");
    return (
        this.optional(element) ||
        (globalizedValue >= param[0] && globalizedValue <= param[1])
    );
};

$.validator.methods.min = function(value, element, param) {
    value = value.replace(",", ".");
    return this.optional(element) || value >= param;
};

$.validator.methods.max = function(value, element, param) {
    value = value.replace(",", ".");
    return this.optional(element) || value <= param;
};

$(document).ready(function() {
    $(".form-validate").each(function() {
        $(this).validate({
            validateDelegate: function() {},
            onsubmit: true,
            errorElement: "div",
            errorPlacement: function(error, element) {
                error.addClass("invalid-feedback");

                var elementType = element.prop("type");

                switch (elementType) {
                    case "select-one":
                        error.appendTo(element.parent());
                        break;

                    case "checkbox":
                        error.insertAfter(element.parent());
                        break;

                    case "radio":
                        error.insertAfter(element.parent());

                        break;

                    default:
                        error.insertAfter(element);

                        break;
                }
            },
            highlight: function(element, errorClass, validClass) {
                $(element).addClass("is-invalid").parent().addClass("is-invalid");
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass("is-invalid").parent().removeClass("is-invalid");
            },
            focusInvalid: false,
            invalidHandler: function(form, validator) {
                if (!validator.numberOfInvalids()) return;

                var scrollToElement = $(validator.errorList[0].element);

                if (
                    $(scrollToElement).prop("type") === "select-one" ||
                    $(scrollToElement).prop("type") === "radio" ||
                    $(scrollToElement).prop("type") === "checkbox"
                ) {
                    scrollToElement = $(scrollToElement).parent();
                }

                if ($(scrollToElement).parents(".popup-block").length > 0) {
                    var thisModal = $(this).parents(".popup-block");

                    var scrollTopValue =
                        $(thisModal).scrollTop() + $(scrollToElement).offset().top - 120;

                    $(thisModal).animate({
                            scrollTop: scrollTopValue,
                        },
                        400
                    );
                } else {
                    var scrollTopValue = $(scrollToElement).offset().top - 120;

                    $("html, body").animate({
                            scrollTop: scrollTopValue,
                        },
                        400
                    );
                }
            },
            ignore: ".tab-pane:hidden *, :disabled, .no-validate",
        });

        setTimeout(function() {
            $(this)
                .find(".num-input")
                .each(function() {
                    $(this).rules("add", {
                        required: true,
                        number: true,
                    });
                });

            $(this)
                .find('[type="email"]')
                .each(function() {
                    $(this).rules("add", {
                        required: true,
                        email: true,
                    });
                });
        }, 0);
    });
});

$(window).on("scroll load orientationchange", function() {
    var scrolledHeight = 100;

    if ($(this).scrollTop() > scrolledHeight && !$("body").hasClass("scrolled")) {
        $("body").addClass("scrolled");
    } else if (
        $(this).scrollTop() <= scrolledHeight &&
        $("body").hasClass("scrolled")
    ) {
        $("body").removeClass("scrolled");
    }
});

$(".agree-checkbox").each(function() {
    var thisCheckbox = $(this);
    var thisButton = $(this).parents("form").find('button[type="submit"]');

    $(thisCheckbox).on("change", function() {
        if (!$(thisCheckbox).is(":checked")) {
            $(thisButton).addClass("disabled");
        } else {
            $(thisButton).removeClass("disabled");
        }
    });

    if (!$(thisCheckbox).is(":checked")) {
        $(thisButton).addClass("disabled");
    }
});

// NAV MENU

const burger = document.querySelector('.nav-menu__burger');
const navbar = document.querySelector('.nav-menu__content');
const navLink = document.querySelectorAll('.nav-menu__link');

burger.addEventListener('click', () => {
    navbar.classList.toggle('open');
    burger.classList.toggle('open');
    navLink.forEach(link => {
        link.classList.toggle('open');
    })
    $(document.body).toggleClass('no-scroll');
});

// OWL SIDE

const numericInterpolation = (from, to, percent) => {

    let targetPropInterpolated =
        from +
        (to - from) *
        percent;

    let min = Number.NaN,
        max = Number.NaN;
    if (from > to) {
        min = to;
        max = from;
    } else {
        min = from;
        max = to;
    }

    targetPropInterpolated = Math.min(max, targetPropInterpolated);
    targetPropInterpolated = Math.max(min, targetPropInterpolated);
    return targetPropInterpolated;
}

const colorInterpolation = (from, to, percent) => {

    const hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    const componentToHex = (c) => {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    const rgbToHex = (r, g, b) => {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }


    let fromRGB = hexToRgb(from);
    let toRGB = hexToRgb(to);
    let resultRGB = {
        r: Number.NaN,
        g: Number.NaN,
        b: Number.NaN,
    }
    resultRGB.r = Math.round(numericInterpolation(fromRGB.r, toRGB.r, percent));
    resultRGB.g = Math.round(numericInterpolation(fromRGB.g, toRGB.g, percent));
    resultRGB.b = Math.round(numericInterpolation(fromRGB.b, toRGB.b, percent));
    return rgbToHex(resultRGB.r, resultRGB.g, resultRGB.b);
}

const bindStyles = ({ events, ...params }) => {

    const bindCallback = () => {
        const source = params.source.element;
        let sourceProperty = source.style[params.source.property];

        params.source.regex.lastIndex = 0;
        sourceProperty = params.source.regex.exec(sourceProperty);
        if (!sourceProperty) {

            return;
        }
        sourceProperty = sourceProperty[1];
        const sourceInterpolationPercent =
            (sourceProperty - params.source.range[0]) /
            (params.source.range[1] - params.source.range[0]);

        for (let i = 0; i < params.targets.length; i++) {
            const target = params.targets[i].element;

            let targetProperty = target;



            let targetPropInterpolated = params.targets[i].defaultValue;


            if (!params.targets[i].valueInterpolation) {
                targetPropInterpolated = numericInterpolation(params.targets[i].range[0], params.targets[i].range[1], sourceInterpolationPercent);
            } else {
                targetPropInterpolated = params.targets[i].valueInterpolation(params.targets[i].range[0], params.targets[i].range[1], sourceInterpolationPercent);
            }


            if (params.targets[i].cancelCallback && params.targets[i].cancelCallback()) {
                targetProperty.style[params.targets[i].property] = params.targets[i].defaultValue;
            } else {
                targetProperty.style[params.targets[i].property] =
                    params.targets[i].beforeModificator +
                    targetPropInterpolated +
                    params.targets[i].afterModificator;
            }

        }
    }

    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(() => bindCallback(params));
    });
    observer.observe(params.source.element, { attributes: true, attributeFilter: ["style"] });
    for (let item of events) {
        item.jqElement.on(item.event, () => {
            bindCallback(params)
        })
    }
    console.log("Bind finished");
};

$(document).ready(function() {
    const owlOverlaps = $('.owl-overlap');
    const owlOverlapSideContents = $('.owl-overlap__side-content');

    console.log(owlOverlaps, owlOverlapSideContents);

    if (owlOverlapSideContents.length === owlOverlaps.length) {
        for (let i = 0; i < owlOverlaps.length; i++) {
            const owl = $(`.owl-overlap[data-owl-overlap-index="${i}"]`);
            console.log('owl', owl);
            owl.owlCarousel({
                loop: false,
                margin: 10,
                dots: false,
                autoWidth: true,
                nav: true,
                onDrag: function(e) {
                    $(".owl-overlap__side-content").addClass("drag");
                },
                onDragged: function(e) {
                    $(".owl-overlap__side-content").removeClass("drag");
                },
                onInitialized: function(e) {
                    $(this)[0].$element.find('.owl-nav').removeClass('disabled');
                    const owlOverlapCarousels = $('.owl-overlap .owl-stage');
                    bindStyles({
                        source: {
                            element: owlOverlapCarousels[i],
                            property: "transform",
                            range: [0, -300],
                            regex: /translate3d\(([-\.\d]+)px, 0px, 0px\)/gm,
                        },
                        targets: [{
                                element: owlOverlapSideContents[i],
                                property: "opacity",
                                range: [1, 0],
                                beforeModificator: "",
                                afterModificator: "",
                                defaultValue: 1,
                                cancelCallback: () => (window.innerWidth < 992),
                            },
                            //  {
                            //     jqElement: $(document.body),
                            //     property: "backgroundColor",
                            //     range: ['#EBEFFF', '#bbcfcc'],
                            //     beforeModificator: "",
                            //     afterModificator: "",
                            //     defaultValue: '#EBEFFF',
                            //     valueInterpolation: colorInterpolation,
                            // }
                        ],
                        events: [{
                            jqElement: $(window),
                            event: 'resize'
                        }]
                    });
                    console.log("Binded");
                },
            });



        }

    }

});