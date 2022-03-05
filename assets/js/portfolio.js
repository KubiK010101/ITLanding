const cardElement = ({
    filter,
    img,
    company,
    title
}) => {
    return $(`
                    <div class="portfolio__grid-item" >
                        <div class="portfolio-card" data-filter="${filter}">
                            <div class="portfolio-card__inner">
                                <div class="portfolio-card__img-wrapper">
                                    <img src="${img}" class="portfolio-card__img">
                                </div>
                                <div class="portfolio-card__content">
                                    <div class="portfolio-card__link-wrapper">
                                        <div class="d-flex justify-content-between w-100 align-items-center">
                                            <a href="#" class="portfolio-card__company">
                                                ${company}
                                            </a>
                                            <a href="#" class="portfolio-card__link" data-card-link="top">
                                                Посмотреть кейс
                                            </a>
                                        </div>
                                    </div>
                                    <h4 class="portfolio-card__title">
                                        ${title}
                                    </h4>
                                    <div class="portfolio-card__link-wrapper">
                                        <a href="#" class="portfolio-card__link" data-card-link="bottom">
                                            Посмотреть кейс
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        `);
}


const cards = [{
    title: "Автоматизация бизнес процессов для ресторанов",
    img: "/img/page-portfolio/portfolio-card-img-1.png",
    company: "GARSON",
    filter: "mobile"
}, {
    title: "Автоматизация бизнес процессов для ресторанов",
    img: "/img/page-portfolio/portfolio-card-img-2.png",
    company: "GARSON",
    filter: "mobile"
}, {
    title: "Автоматизация бизнес процессов для ресторанов",
    img: "/img/page-portfolio/portfolio-card-img-3.png",
    company: "GARSON",
    filter: "web"
}, {
    title: "Автоматизация бизнес процессов для ресторанов",
    img: "/img/page-portfolio/portfolio-card-img-4.png",
    company: "GARSON",
    filter: "branding"
}, {
    title: "Автоматизация бизнес процессов для ресторанов",
    img: "/img/page-portfolio/portfolio-card-img-5.png",
    company: "GARSON",
    filter: "mobile"
}, {
    title: "Автоматизация бизнес процессов для ресторанов",
    img: "/img/page-portfolio/portfolio-card-img-6.png",
    company: "GARSON",
    filter: "design"
}, {
    title: "Автоматизация бизнес процессов для ресторанов",
    img: "/img/page-portfolio/portfolio-card-img-7.png",
    company: "GARSON",
    filter: "branding"
}, {
    title: "Автоматизация бизнес процессов для ресторанов",
    img: "/img/page-portfolio/portfolio-card-img-8.png",
    company: "GARSON",
    filter: "mobile"
}, ]

const setCards = (filter) => {
    $('.portfolio__grid').empty();
    cards.filter(x => x.filter === filter || filter === "all")
        .map(x => {
            return cardElement(x);
        })
        .forEach((x) => {
            console.log(x);
            $('.portfolio__grid').append(x);
        })
}

$(document).ready(function() {
    $('button[data-filter]').on('click', function(e) {
        $('button[data-filter]').removeClass('active');
        $(this).addClass('active');
        setCards($(this).attr('data-filter'));
    })
    setCards("all");
})