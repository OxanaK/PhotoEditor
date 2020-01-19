//var mh = Math.max.apply(Math, $('.menu').map(function () {
//    return $(this).height();
//}).get());

$(document).ready(function () {
    $.fn.equivalent = function () {
        //запишем значение jQuery выборки к которой будет применена эта функция в локальную переменную $blocks
        var $blocks = $(this),
            //примем за максимальную высоту - высоту первого блока в выборке и запишем ее в переменную maxH
            maxH = $blocks.eq(0).height();

        //делаем сравнение высоты каждого блока с максимальной
        $blocks.each(function () {
            maxH = ($(this).height() > maxH) ? $(this).height() : maxH;
            /*
            Этот блок можно записать так:
            if ( $(this).height() > maxH ) {
                maxH = $(this).height();
            }
            */
        });

        //устанавливаем найденное максимальное значение высоты для каждого блока jQuery выборки
        $blocks.height(maxH);
    }

    //применяем нашу функцию в элементам jQuery выборки - $('.nav')
    $('.nav').equivalent();
});