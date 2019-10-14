var mypic;

var img = document.getElementById("inpt-img");
var original_img;



var polaroidShot_templet = {
    x: 100,
    y: 100,
    x0: 50,
    y0: 50,
    slope: 0,
    opacity: 1,
    border_width: 2,
    border_bottom_width: 10,
    color: "#ffffff"
}
var state_templet = {
    //%
    basic: {
        contrast: 100, 
        saturate: 100,
        brightness:100,
        sepia: 0,
        blur: 0,
        grayscale: 0,
        invert: 0,
        hue: 0,
        noise: 0,
        night_vision:0
    },
    //+_90deg
    rotate_deg: 0,
    width: "",
    height: "",
    flip:{
        horizontal: -1,
        vertical:-1
    },

    resize: {
        reduce :0,
        increase: 0
    },
    frame: {
        border_width: {
            top: 0,
            right: 0,
            bottom: 0,
            left:0
        },
        border_color:{
            top: "#ffffff",
            right: "#ffffff",
            bottom: "#ffffff",
            left: "#ffffff"
        },
        border_style: {
            top: "solid",
            right: "solid",            bottom: "solid",
            left: "solid"
        },
        border_radius: {
            top_left: 0,
            top_right: 0,
            bottom_left: 0,
            bottom_right: 0
        }
     },
    z_index: 5,

    clipart: {
            top: 100,
            right: 100,
            bottom: 100,
            left: 100,
            data:""
    },
    collage: {
        lineColor: "#ffffff",
        lineSize: 2,
        pattern: ""

    }
     
};

var textarea_templet = {

    font_size: "14",
    font_family: "Arial",
    color: "#ffffff",
    position: "absolute",
    
    font_style: "normal",
    font_weight: "normal",
    text_decoration: "none",
    text_transform: "none",
    width: "100%",
    height:"auto",


    text_align: "start",
    border_size: 1,
    border_style: "dotted",
    border_color: "#ffffff",
    
    top: 1,
    left: 2,
    z_index: 15,
    value: ""

};

function copyObj(src) {
    let target = {};
    for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
            target[prop] = src[prop];
        }
    }
    return target;
}

var list_polaroidShot = [];
var list_textarea = [];
var saveImages = [];


$(function () {
    var textarea;
    var state;
    var currentPolaroidShot;
    var currentMenu;
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var img_canvas;
    var imgObj;
    var text_move = document.getElementById('textarea');

    function DrawImageOnCanvas(img_canvas) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = img_canvas.naturalWidth;
        canvas.height = img_canvas.naturalHeight;

        //var nimage = new Image(canvas.width, canvas.height);
        //nimage.src = img_canvas.src;


        ctx.drawImage(img_canvas, 0, 0, canvas.width, canvas.height);
        state.width = canvas.width;
        state.height = canvas.height;
        textarea = copyObj(textarea_templet);
        textarea.width = state.width;

        var temp_area_w = this.width - textarea.left - textarea.left;
        textarea.max_width = temp_area_w;

    }

    function revertBackImage() {
        saveImages.pop();
        img_canvas = saveImages[saveImages.length - 1];
        DrawImageOnCanvas(img_canvas);
    }
    function BordureSize1() {
        var w = canvas.width / 3
        var w1 = canvas.width * state.clipart.top / 100;
        var h = canvas.height / 3;
        var data = state.clipart.data;
        var param = (3 * w - w1) / 2;
        var left = param + "px";
        var ww = w1 + "px";
        
        $("#canvas_line1").css("left", left);
        $("#canvas_line1").css("width", ww);
        $("#canvas_line1").css("height", h / 4 + "px");
    }
    function BordureSize2() {

        var w = canvas.width / 3
        var w2 = canvas.height * state.clipart.right / 100;
        var h = canvas.height / 3;
        var data = state.clipart.data;
        var param = (3 * h - w2) / 2;
        var left = 3 * w - w2 / 2 - h / 8 + "px";
        var ww = w2 + "px";
        var top = w2 / 2 - h / 8 + param + "px"
        $("#canvas_line2").css("height", h / 4 + "px");
        $("#canvas_line2").css("width", ww);
        
        $("#canvas_line2").css("left", left);
        $("#canvas_line2").css("top", top);
    }
    function BordureSize3() {
        var w = canvas.width / 3
        var w3 = canvas.width * state.clipart.bottom / 100;
        var h = canvas.height / 3;
        var data = state.clipart.data;
        var param = (3 * w - w3) / 2;
        var left = param + "px";
        var ww = w3 + "px";
        
            $("#canvas_line3").css("width", ww);
            $("#canvas_line3").css("left", left);
            $("#canvas_line3").css("top", 3 * h - h * 1 / 4);
            $("#canvas_line3").css("height", h / 4 + "px");
      }

    function BordureSize4() {
        var w = canvas.width / 3
        var w4 = canvas.height * state.clipart.left / 100;
        var h = canvas.height / 3;
        var data = state.clipart.data;
        var param = (3 * h - w4) / 2;
        var left = -w4 / 2 + h / 8 + "px";
        var ww = w4 + "px";
        var top = w4 / 2 - h / 8 + param + "px";

            $("#canvas_line4").css("height", h / 4 + "px");
            $("#canvas_line4").css("width", ww);
            $("#canvas_line4").css("left", left);
            $("#canvas_line4").css("transform", ' rotate(-90deg)')
            $("#canvas_line4").css("top", top);

       }


    function UnchekeaAll()
    {
        UnchekedllCheckBox($("#bordure_radio1"), $("#canvas_line1"));
        UnchekedllCheckBox($("#bordure_radio2"), $("#canvas_line2"));
        UnchekedllCheckBox($("#bordure_radio3"), $("#canvas_line3"));
        UnchekedllCheckBox($("#bordure_radio4"), $("#canvas_line4"));

        UnchekedllCheckBox($("#corner_radio1"), $("#canvas_corner1"));
        UnchekedllCheckBox($("#corner_radio2"), $("#canvas_corner2"));
        UnchekedllCheckBox($("#corner_radio3"), $("#canvas_corner3"));
        UnchekedllCheckBox($("#corner_radio4"), $("#canvas_corner4"));
    }
    function UnchekedllCheckBox(checkbox, canvas_elem) {
       
        if (checkbox.is(":checked"))
        {          
            checkbox.prop('checked', false);
           if (canvas_elem.hasClass('open'))
            { 
                canvas_elem.removeClass('open');
                canvas_elem.addClass('hidden');
            }         
        }
    }
    function ChangeNewSizeForCanvasElements() {

        BordureSize1();
        BordureSize2();
        BordureSize3();
        BordureSize4();     
        
    }

    img.on("load", function (e) {
        state = copyObj(state_templet)
        canvas.width = img.width;
        canvas.height = img.height;
        state.width = canvas.width;
        state.height = canvas.height;
        ChangeNewSizeForCanvasElements();
        UnchekeaAll();
        saveImages = [];
        original_img = document.getElementById("inpt-img");
        img_canvas = original_img;
        saveImages.push(original_img);
      
        DrawImageOnCanvas(img_canvas);
        //DrawImageOnCanvas();

        //canvas = document.getElementById("myCanvas");
        //ctx = canvas.getContext("2d");

        //img_canvas = saveImages[saveImages.length - 1];

        //canvas.width = this.naturalWidth;
        //canvas.height = this.naturalHeight;
        //ctx.drawImage(img_canvas,0, 0, this.width, this.height);
        //state.width = canvas.width;
        //state.height = canvas.height;
        //textarea =copyObj(textarea_templet);
        //textarea.width = state.width;

        //var temp_area_w = this.width - textarea.left - textarea.left;
        //textarea.max_width= temp_area_w;
        $("#textarea").css('max-width', textarea.max_width);
        $("#text_menu").css('visibility', "hidden");
        $("#polaroidShot_menu").css('visibility', "hidden");
    });


    function col2SizeLikeCol1(where) {
        var v = $("#col_1").height();

        $(where).height(v);
    }

    //*******************************************
    //rotate
    $("#m_2").on("change", function (e) {
        if ($("#m_2").is(":checked")) {
            swapMenu($("#rotate"));
            var where = "#rotate";
            col2SizeLikeCol1(where);
            $("#text_menu").css('visibility', "hidden");
            
            $("#polaroidShot_menu").css('visibility', "hidden");
            changeOpenToHiddenText($("#textarea"));
         
        }
    });

    //basic
    $("#m_1").on("change", function (e) {
        if ($("#m_1").is(":checked")) {
            swapMenu($("#basic"));
            var where = "#basic";
            col2SizeLikeCol1(where);
            $("#text_menu").css('visibility', "hidden");
            $("#polaroidShot_menu").css('visibility', "hidden");
            changeOpenToHiddenText($("#textarea"));
           
        }
    });

    //resize
    $("#m_3").on("change", function (e) {
        if ($("#m_3").is(":checked")) {
            swapMenu($("#resize"));
            var where = "#resize";
            col2SizeLikeCol1(where);
            $("#text_menu").css('visibility', "hidden");
            $("#polaroidShot_menu").css('visibility', "hidden");
            changeOpenToHiddenText($("#textarea"));
           
        }
    });

    //flip
    $("#m_4").on("change", function (e) {
        if ($("#m_4").is(":checked")) {
            swapMenu($("#flip"));
            var where = "#flip";
            col2SizeLikeCol1(where);
            $("#text_menu").css('visibility', "hidden");
            $("#polaroidShot_menu").css('visibility', "hidden");
            changeOpenToHiddenText($("#textarea"));
            
        }
    });

    //clipart
    $("#m_5").on("change", function (e) {
        if ($("#m_5").is(":checked")) {
            swapMenu($("#clipart"));
            var where = "#clipart";
            col2SizeLikeCol1(where);
            $("#text_menu").css('visibility', "hidden");
            $("#polaroidShot_menu").css('visibility', "hidden");
            changeOpenToHiddenText($("#textarea"));
          
        }
    });

    //filters
    $("#m_11").on("change", function (e) {
        if ($("#m_11").is(":checked")) {
            swapMenu($("#filter"));
            var where = "#filter";
            col2SizeLikeCol1(where);
            $("#text_menu").css('visibility', "hidden");
            $("#polaroidShot_menu").css('visibility', "hidden");
            changeOpenToHiddenText($("#textarea"));
         
        }
    });
    //effects
    $("#m_10").on("change", function (e) {
        if ($("#m_10").is(":checked")) {
            swapMenu($("#effects"));
            var where = "#effects";
            col2SizeLikeCol1(where);
            $("#text_menu").css('visibility', "hidden");
            $("#polaroidShot_menu").css('visibility', "hidden");
            changeOpenToHiddenText($("#textarea"));
            
        }
    });
    //frame
    $("#m_6").on("change", function (e) {
        if ($("#m_6").is(":checked")) {
            swapMenu($("#frame"));
            var where = "#frame";
            col2SizeLikeCol1(where);
            $("#text_menu").css('visibility', "hidden");
            $("#polaroidShot_menu").css('visibility', "hidden");
            //OpenToHiddenText($("#textarea"));
           
        }

    });

    //text
    $("#m_7").on("change", function (e) {
        if ($("#m_7").is(":checked")) {
            swapMenu($("#text"));
            var where = "#text";
            col2SizeLikeCol1(where);
            $("#text_menu").css('visibility', "visible");
            $("#polaroidShot_menu").css('visibility', "hidden");
           
        }
    });

    //stickers
    $("#m_8").on("change", function (e) {
        if ($("#m_8").is(":checked")) {
            swapMenu($("#stickers"));
            var where = "#stickers";
            col2SizeLikeCol1(where);
            $("#text_menu").css('visibility', "hidden");
            $("#polaroidShot_menu").css('visibility', "hidden");
            changeOpenToHiddenText($("#textarea"));
            
        }
    });
    //collages
    $("#m_9").on("change", function (e) {
        if ($("#m_9").is(":checked")) {
            swapMenu($("#collages"));
            var where = "#collages";
            col2SizeLikeCol1(where);
            $("#text_menu").css('visibility', "hidden");
            $("#polaroidShot_menu").css('visibility', "visible");
            changeOpenToHiddenText($("#textarea"));
         
        }
    });
    //**************************************************************************

    function changeHiddenToOpen(item) {
        item.removeClass('hidden');
        item.addClass('open');

    }

    function changeOpenToHidden(item) {
        item.removeClass('open');
        item.addClass('hidden');
    }

    function changeHiddenToOpenText(item) {
        item.removeClass('hiddenText');
        item.addClass('openText');
        $("#canva_textarea").append(item);
    }

    function changeOpenToHiddenText(item) {
        item.removeClass('openText');
        item.addClass('hiddenText');
    }

    function swapMenu(newMenu) {
        if (currentMenu !== undefined) {
            currentMenu.removeClass('open');
            currentMenu.addClass('hidden');
        }

        newMenu.removeClass('hidden');
        newMenu.addClass('open');
        currentMenu = newMenu;
    }

    function textareaShow() {
        changeHiddenToOpenText($("#textarea"));
        $("#textarea").css('position', textarea.position);
        $("#textarea").val(textarea.value);
        $("#textarea").css('height', "auto");
        $("#textarea").css('width', textarea.width);

        $("#textarea").css('font-family', textarea.font_family);
        $("#textarea").css('font-size', textarea.font_size + 'px');
        $("#textarea").css('top', textarea.top);
        $("#textarea").css('left', textarea.left);
        $("#textarea").css('padding', 0);
        $("#textarea").css('color', textarea.color);

        $("#textarea").css('border', textarea.border_size + 'px ' + textarea.border_style + ' ' + textarea.border_color);
        $("#textarea").css('z-index', textarea.z_index);

    }

    //choice_smiles_checkbox
    $("#choice_smiles_checkbox").on("change", function (e) {
        swapIndividual("#choice_smiles_checkbox", "#table_smiles");
    });

    //choice_gestures_checkbox
    $("#choice_gestures_checkbox").on("change", function (e) {
        swapIndividual("#choice_gestures_checkbox", "#table_gestures");
    });

    //choice_hearts_checkbox
    $("#choice_hearts_checkbox").on("change", function (e) {
        swapIndividual("#choice_hearts_checkbox", "#table_hearts");
    });

    //choice_animals_checkbox
    $("#choice_animals_checkbox").on("change", function (e) {
        swapIndividual("#choice_animals_checkbox", "#table_animals");
    });

    //choice_flowers_checkbox
    $("#choice_flowers_checkbox").on("change", function (e) {
        swapIndividual("#choice_flowers_checkbox", "#table_flowers");
    });

    //choice_food_checkbox
    $("#choice_food_checkbox").on("change", function (e) {
        swapIndividual("#choice_food_checkbox", "#table_food");
    });

    //choice_shapes_checkbox
    $("#choice_shapes_checkbox").on("change", function (e) {
        swapIndividual("#choice_shapes_checkbox", "#table_shapes");
    });

    $("td, .all_img").hover(function () {
        $(this).toggleClass('highlight');
        $(this).css('cursor', 'pointer');
    });

    var textX = 0;
    var textY = 0;

    text_move.onmousedown = function (e) {

        moveAt(e);

        text_move.style.zIndex = 1000; // над другими элементами

        function moveAt(e) {
            ;
            //textY = e.offsetY;
            var l = state.frame.border_width.left;
            var t = state.frame.border_width.top;
            text_move.style.left = l + 1 + 'px';
            text_move.style.top = e.offsetY + t + 1 + 'px';

            textX = e.offsetX;
            textY = e.offsetY;
            textarea.left = l;
            textarea.top = e.offsetY + t + 1;


        }

        canvas.onmousemove = function (e) {
            moveAt(e);
        };

        text_move.onmouseup = function () {
            canvas.onmousemove = null;
            text_move.onmouseup = null;
        };

    }

    text_move.ondragstart = function () {
        return false;
    };

    function PrintTextToCanvas() {
        var last = list_textarea.length - 1;


        ctx.fillStyle = list_textarea[last].color;

        ctx.font = list_textarea[last].font_style + " " + list_textarea[last].font_weight + " " + list_textarea[last].font_size + 'px ' + list_textarea[last].font_family;
        ctx.textAlign = list_textarea[last].text_align;
        var v = +(list_textarea[last].font_size) / 2;
        var s = wForAline();

        ctx.fillText(list_textarea[last].value, s, list_textarea[last].top + v);
    }
    function wForAline() {
        var last = list_textarea.length - 1;
        var aline = list_textarea[last].text_align;

        if (aline === "start") {
            return 0;
        }
        if (aline === "center") {
            return canvas.width / 2;
        }
        if (aline === "end")
        { return canvas.width; }

    }

    // Start download
    function download(filename) {
        /// create an "off-screen" anchor tag
        var lnk = document.createElement('a'), e;

        /// the key here is to set the download attribute of the a tag
        lnk.download = filename;

        /// convert canvas content to data-uri for link. When download
        /// attribute is set the content pointed to by link will be
        /// pushed as "download" in HTML5 capable browsers
        lnk.href = canvas.toDataURL("image/png;base64");

        /// create a "fake" click-event to trigger the download
        if (document.createEvent) {
            e = document.createEvent("MouseEvents");
            e.initMouseEvent("click", true, true, window,
                             0, 0, 0, 0, 0, false, false, false,
                             false, 0, null);

            lnk.dispatchEvent(e);
        } else if (lnk.fireEvent) {
            lnk.fireEvent("onclick");
        }
    }

    $("#to_save").on("click", function (e) {
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // transform image data
        //imageData = transformMatrix(img_canvas, imageData);

        //imageData = grayscale(imageData);
        //imageData = invert(imageData);
        //imageData = oneColor(imageData, "green");
      //  imageData = emboss(img_canvas, imageData);
        // draw data back
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(imageData, 0, 0);
        download("test_image.png");
    });
    // End download

    // Start Filter implementation

    // filter strength
    var strength = 0.9;
    // shifting matrix
    var matrix = [-2, -1, 0, -1, 1, 1, 0, 1, 2];
    // normalize matrix
    function normalizeMatrix(m) {
        var j = 0;
        for (var i = 0; i < m.length; i++) {
            j += m[i];
        }
        for (var i = 0; i < m.length; i++) {
            m[i] /= j;
        }
        return m;
    }
    // convert x-y coordinates into pixel position
    function convertCoordinates(x, y, w) {
        return x + (y * w);
    }
    // find a specified distance between two colours
    function findColorDiff(dif, dest, src) {
        return dif * dest + (1 - dif) * src;
    }

    function DrawLikeColoredPencil(img, pixels) {
        var data = pixels.data;
        var copyImageData = ctx.createImageData(pixels);
        var bufferedData = copyImageData.data;

        for (var i = 0; i < data.length; ++i) {
            bufferedData[i] = data[i];
        }


        matrix = normalizeMatrix(matrix);
        var mSize = Math.sqrt(matrix.length);

        for (var i = 1; i < img.width - 1; i++) {
            for (var j = 1; j < img.height - 1; j++) {
                var sumR = sumG = sumB = 0;
                for (var h = 0; h < mSize; h++) {
                    for (var w = 0; w < mSize; w++) {
                        var r = convertCoordinates(i + h - 1, j + w - 1, img.width) << 2;
                        // RGB for current pixel
                        var currentPixel = {
                            r: bufferedData[r],
                            g: bufferedData[r + 1],
                            b: bufferedData[r + 2]
                        };
                        sumR += currentPixel.r * matrix[w + h * mSize];
                        sumG += currentPixel.g * matrix[w + h * mSize];
                        sumB += currentPixel.b * matrix[w + h * mSize];
                    }
                }
                var rf = convertCoordinates(i, j, img.width) << 2;
                data[rf] = findColorDiff(strength, sumR, data[rf]);
                data[rf + 1] = findColorDiff(strength, sumG, data[rf + 1]);
                data[rf + 2] = findColorDiff(strength, sumB, data[rf + 2]);
            }
        }

        return pixels;
    }

    function grayscale(pixels) {
        var data = pixels.data;
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue
        }

        return pixels;
    }

    function invert(pixels) {
        var data = pixels.data;
        for (var i = 0; i < data.length; i += 4) {
            //var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = 255 - data[i]; // red
            data[i + 1] = 255 - data[i + 1]; // green
            data[i + 2] = 255 - data[i + 2]; // blue
        }

        return pixels;
    }

    function oneColor(pixels, color, number) {
        var data = pixels.data;
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            if (color == "red") {
                data[i] = avg; // red
                data[i + 1] = 0; // green
                data[i + 2] = 0; // blue
            }
            else if (color == "green") {
                data[i] = 0;
                data[i + 1] = avg; // green
                data[i + 2] = 0; // blue
            }
            else if (color == "blue") {
                data[i] = 0;
                data[i + 1] = 0; // green
                data[i + 2] = avg; // blue
            }
        }

        return pixels;
    }

    function processEmboss() {
        //var canvas = document.createElement('canvas');
        //var ctx = canvas.getContext("2d");

        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // transform image data
        //imageData = transformMatrix(img_canvas, imageData);

        //imageData = grayscale(imageData);
        //imageData = invert(imageData);
        imageData = oneColor(imageData, "green");
        //imageData = emboss(img_canvas, imageData);
        // draw data back
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(imageData, 0, 0);
    }

    $("#save_meme").on("click", function (e) {
        //processEmboss();
    });

    $("#save_filter").on("click", function (e) {
        //processEmboss();
        urlData = canvas.toDataUrl();
        window.location = urlData;
    });

    // End Filter implementation

    //delete textarea
    $("#icon_for_delete").on('click', function (e) {

        textarea = {};
        changeOpenToHiddenText($("#textarea"));
    });

    //save textarea
    $("#icon_for_save").on('click', function (e) {

        list_textarea.push(textarea);
        PrintTextToCanvas();
        changeOpenToHiddenText($("#textarea"));

        $(".all_img").css('background-color', "#F8F8F9");
        $('#select_border_text').val("dotted").change();
        $('#text_font_color').val("black").change();
        $("#text_font_size_rangeInput").val("14").change();
        $('#text_style').val("Arial").change();
        $("#textarea").val().change;
        $("#textarea").css('font-weight', 'normal').css('font-style', 'normal').css('text-align', 'left');

    });

    //new
    $("#icon_for_new").on('click', function (e) {
        textarea = {};

        textarea = copyObj(textarea_templet);
        textarea.width = state.width;
        var l = state.frame.border_width.left;
        var t = state.frame.border_width.top;
        textarea.left = l;
        textarea.top = t;

        $("#canva_textarea").css('position', "relative");

        textareaShow();
    });

    function PolaroidBackGroud() {
        var clipImg = new Image();
       var opacityBackground = 0.3;
        clipImg = original_img;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = opacityBackground;
        ctx.drawImage(clipImg, 0, 0);
    }
    //function PolaroidFrame(x0, y0, x, y) {
    //    var clipImg = new Image();
    //    var color = "#fff";
    //    var size = 3;
    //    var bottomLine = 20;
    //    var opacityBackground = 0.3;
    //    clipImg = original_img;

    //    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //    //ctx.globalAlpha = opacityBackground;
    //    //ctx.drawImage(clipImg, 0, 0);

    //    ctx.globalAlpha = 1;
    //    ctx.fillStyle = "#fff";
    //    ctx.globalCompositeOperation = "destination - out";
    //    ctx.fillRect(x0 - size, y0 - size, x + 2 * size, y + size + bottomLine);

    //    ctx.globalCompositeOperation = "source-over";
    //    ctx.strokeStyle = color;
    //    ctx.lineWidth = size;
    //    ctx.strokeRect(x0, y0, x, y);
    //    ctx.globalAlpha = 1;
    //    ctx.drawImage(clipImg, x0, y0, x, y, x0, y0, x, y);
    //    //ctx.save();


    //}
    function PolaroidFrame(x0, y0, x, y, opacity, color, borderWidth, borderBottomWidth) {

        var clipImg = new Image();
        clipImg = original_img;


        ctx.globalAlpha = 1;
      
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillRect(+(x0-borderWidth), +(y0 - borderWidth), (x + 2 * borderWidth), (y + borderWidth + borderBottomWidth));
        ctx.fillStyle = color;
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        //ctx.strokeStyle = color;
        //ctx.lineWidth = size;
        //ctx.strokeRect(x0, y0, x, y);
        ctx.globalAlpha = opacity;
        ctx.drawImage(clipImg, x0, y0, x, y, x0, y0, x, y);
      
        ctx.save();

    }
    function DisignPolaroid() {
        var w = canvas.width;
        var h = canvas.height;

        var x0 = +currentPolaroidShot.x0;
        var y0 = +currentPolaroidShot.y0;

        var x = +currentPolaroidShot.x;
        var y = +currentPolaroidShot.y;
        var opacity = +currentPolaroidShot.opacity;
        var color = currentPolaroidShot.color;
        var borderWidth = +currentPolaroidShot.border_width;
        var borderBottomWidth =+ currentPolaroidShot.border_bottom_width;
       // PolaroidBackGroud();
        var clipImg = new Image();
        var opacityBackground = 0.3;
        clipImg = original_img;
        ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = opacityBackground;
        ctx.drawImage(clipImg, 0, 0);
        PolaroidFrame(x0, y0, x, y, opacity, color, borderWidth, borderBottomWidth);

        ctx.save();
    }

  

    $("#shot_for_new").on('click', function (e) {
        currentPolaroidShot = {};

        currentPolaroidShot = copyObj(polaroidShot_templet);
        if (original_img != "") {
            DisignPolaroid();
        }
    });

    $("#shot_for_save").on('click', function (e) {

        var cnv2 = document.getElementById('helpCanvas');
        cnv2.width = canvas.width;
        cnv2.height = canvas.height;
        var ctx2 = cnv2.getContext("2d");
        var cssFilter = getComputedStyle(canvas).filter;
        ctx2.filter = cssFilter;
        ctx2.drawImage(canvas, 0, 0);


        var base64URL = cnv2.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');

        // AJAX request
        window.location = base64URL;

        //$("#col_3").width(canvas.width);
        //$("#col_3").height(canvas.height);
        //html2canvas(document.body).then(function(canvas){
        //html2canvas(document.getElementById('myCanvas')).then(function (canvas) {

        //    document.body.appendChild(canvas);

            // Get base64URL
        //    var base64URL = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');

            // AJAX request
        //    window.location = base64URL;
        //});
    });

 
    $("#shot_opacity_range").on('change', function () {

        var v = $("#shot_opacity_range").val();
        currentPolaroidShot.opacity = v;
        DisignPolaroid();
    });
    
    $("#shot_x_size_rangeInput").on('change', function () {

        var v = $("#shot_x_size_rangeInput").val();
        currentPolaroidShot.x = v;
        DisignPolaroid();
    });
    $("#shot_y_size_rangeInput").on('change', function () {

        var v = $("#shot_y_size_rangeInput").val();
        currentPolaroidShot.y =v;
       
        DisignPolaroid();
    });

    $("#shot_x0_size_rangeInput").on('change', function () {

        var v = $("#shot_x0_size_rangeInput").val();
        currentPolaroidShot.x =v;
        DisignPolaroid();
        
    });
    $("#shot_y0_size_rangeInput").on('change', function () {

        var v = $("#shot_y0_size_rangeInput").val();
        currentPolaroidShot.y =v;
        DisignPolaroid();
    });
  
    $("#shot_slope_rangeInputt").on('change', function () {

        var v = $("#shot_slope_rangeInput").val();
        currentPolaroidShot.slope = v;
        DisignPolaroid();
    });

    $("#textarea").on('change', function () {

        var v = $("#textarea").val();
        textarea.value = v;
    });

    $("#collage_size_rangeInput").on('change', function () {

        var v = $("#collage_size_rangeInput").val();
        state.collage.lineSize = +v;
        if(state.collage.pattern!=""){
            ApplyPatternCollage();
         }
    });



//polaroid

 
    $("#shot_border_color").on('change', function () {

        var v = $("#shot_border_color").val();
        currentPolaroidShot.color = v;
        if (original_img != "") {
            DisignPolaroid();
        }
    });


    $("#collage_color").on('change', function (e) {

        var v = $("#collage_color").val();
        state.collage.lineColor = v;
        if (state.collage.pattern != ""){
            ApplyPatternCollage();
        }
    });
    


    $("#text_font_size_rangeInput").on('change', function () {

        var v = $("#text_font_size_rangeInput").val();
        textarea.font_size = v;
        textarea.height = v;
        $("#textarea").css('font-size', textarea.font_size + 'px');

    });

    $("#text_style").change(function () {
        var v = "";
        $("#text_style option:selected").each(function () {
            v += $(this).text() + " ";
        })
        textarea.font_family = v;
        $("#textarea").css('font-family', textarea.font_family);
    });

    $("#text_font_color").on('change', function () {
        var v = $("#text_font_color").val();
        textarea.color = v;
        $("#textarea").css('color', textarea.color);

    });

    $("#select_border_text").change(function () {
        var v = "";
        $("#select_border_text option:selected").each(function () {
            v += $(this).text() + " ";
        })
        textarea.border_style = v;
        $("#textarea").css('border', textarea.border_size + 'px ' + textarea.border_style + ' ' + textarea.border_color);
    });

    //align
    $("#align_center").on('change', function () {
        if (textarea.text_align !== "center") {

            textarea.text_align = "center";
            $("#textarea").css('text-align', textarea.text_align);
            $("#a_center").css('background-color', "#D1D3D3");

            $("#a_left").css('background-color', "#F8F8F9");
            $("#a_right").css('background-color', "#F8F8F9");
        }

    });
    $("#align_left").on('change', function () {
        if (textarea.text_align !== "start") {

            textarea.text_align = "start";
            $("#textarea").css('text-align', textarea.text_align);
            $("#a_left").css('background-color', "#D1D3D3");

            $("#a_center").css('background-color', "#F8F8F9");
            $("#a_right").css('background-color', "#F8F8F9");
        }

    });

    $("#align_right").on('change', function () {
        if (textarea.text_align !== "end") {

            textarea.text_align = "end";
            $("#textarea").css('text-align', textarea.text_align);
            $("#a_right").css('background-color', "#D1D3D3");

            $("#a_center").css('background-color', "#F8F8F9");
            $("#a_left").css('background-color', "#F8F8F9");
        }
    });

    //bold_choice
    $("#bold_choice").on('change', function () {
        if (textarea.font_weight == "normal") {
            $("#bold").css('background-color', "#D1D3D3");
            textarea.font_weight = "bold";
            $("#textarea").css('font-weight', textarea.font_weight);
        }
        else {
            $("#bold").css('background-color', "#F8F8F9");
            textarea.font_weight = "normal";
            $("#textarea").css('font-weight', textarea.font_weight);
        }
    });

    //italic_choice
    $("#italic_choice").on('change', function () {
        if (textarea.font_style == "normal") {
            $("#italic").css('background-color', "#D1D3D3");
            textarea.font_style = "italic";
            $("#textarea").css('font-style', textarea.font_style);
        }
        else {
            $("#italic").css('background-color', "#F8F8F9");
            textarea.font_style = "normal";
            $("#textarea").css('font-style', textarea.font_style);
        }
    });

    //text-decoration:underline
    $("#underline_choice").on('change', function () {
        if (textarea.text_decoration == "none") {
            $("#underline").css('background-color', "#D1D3D3");
            textarea.text_decoration = "underline";
            $("#textarea").css('text-decoration', textarea.text_decoration);
        }
        else {
            $("#underline").css('background-color', "#F8F8F9");
            textarea.text_decoration = "none";
            $("#textarea").css('text-decoration', textarea.text_decoration);
        }
    });

    //uppercase_choice
    $("#uppercase_choice").on('change', function () {
        if (textarea.text_transform == "none" || textarea.text_transform == "lowercase" || textarea.text_transform == "usual") {
            $("#uppercase").css('background-color', "#D1D3D3");
            textarea.text_transform = "uppercase";

            var s = $("#textarea").val();
            s = s.slice(0).toUpperCase();
            textarea.value = s;
            $("#textarea").val(textarea.value).change();

            $("#lowercase").css('background-color', "#F8F8F9");
            $("#usual").css('background-color', "#F8F8F9");
        }
    });

    //lowercase_choice
    $("#lowercase_choice").on('change', function () {
        if (textarea.text_transform == "none" || textarea.text_transform == "uppercase" || textarea.text_transform == "usual") {
            $("#lowercase").css('background-color', "#D1D3D3");
            textarea.text_transform = "lowercase";

            var s = $("#textarea").val();
            s = s.slice(0).toLowerCase();

            textarea.value = s;
            $("#textarea").val(textarea.value).change();

            $("#uppercase").css('background-color', "#F8F8F9");
            $("#usual").css('background-color', "#F8F8F9");
        }
    });

    //usual_choice
    $("#usual_choice").on('change', function () {
        if (textarea.text_transform == "none" || textarea.text_transform == "uppercase" || textarea.text_transform == "lowercase") {
            $("#usual").css('background-color', "#D1D3D3");
            textarea.text_transform = "usual";

            var s = $("#textarea").val();
            s = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

            textarea.value = s;
            $("#textarea").val(textarea.value).change();

            $("#uppercase").css('background-color', "#F8F8F9");
            $("#lowercase").css('background-color', "#F8F8F9");
        }
    });

    //******************************
    //left_rotate_button
    $("#left_rotate_button").click(function () {
        //var w=canvas.width;
        //var h=canvas.height;
        //if( h>w)       
        //{

        //    ctx.translate(0, h - w);
        //}
        state.rotate_deg = (state.rotate_deg - 90) % 360;
        $("canvas").css('transform', ' rotate(' + state.rotate_deg + 'deg)');
        //alert(state.rotate_deg * Math.PI / 180);
        //ctx.rotate(state.rotate_deg * Math.PI / 180);

    });

    //right_rotate_button
    $("#right_rotate_button").click(function () {

        state.rotate_deg = (state.rotate_deg + 90) % 360;
        $("canvas").css('transform', ' rotate(' + state.rotate_deg + 'deg)');

    });

    //******************************

    //h_flip_button
    $("#h_flip_button").click(function () {

        var v = state.flip.horizontal;
        if (v === -1) {
            state.flip.horizontal = 1
        }
        else {
            state.flip.horizontal = -1
        }
        $("canvas").css('transform', ' scaleY(' + v + ')');
    });

    //v_flip_button
    $("#v_flip_button").click(function () {
        var v = state.flip.vertical;
        if (v === -1) {
            state.flip.vertical = 1
        }
        else {
            state.flip.vertical = -1
        }
        $("canvas").css('transform', ' scaleX(' + v + ')');
    });

    //***************************
    //reduce
    $("#reduce_range").on('change', function () {
        var v = $("#reduce_range").val();

        state.resize.reduce = parseInt(v, 10);
        var c = document.getElementById("myCanvas");
        var can = $("#myCanvas");
        can.width = 600;
        can.height = 600;

        var ctx2 = c.getContext("2d");

        var img_canvas = document.getElementById("inpt-img");

        ctx.drawImage(img_canvas, 0, 0, 600, 600);
        //var ctx2 = c.getContext("2d");
        // $("#myCanvas").css(' transform', ' scale(' + state.resize.reduce + ')');
        //ctx.scale(state.resize.reduce, state.resize.reduce);
        //ctx2.scale(0.5, 0.5);

        //$("canvas").animate({"transform": "scale(" + state.resize.reduce + ")" },"fast");

        //$("#myCanvas").css('transform', 'scale(' + state.resize.reduce + ')');

        var reduce_rangeInput = document.getElementById('reduce_rangeInput');
        reduce_rangeInput.value = v * 100;
    });


    //******************************

    function applyFilters()
    {
     
        $("canvas").css('filter', 'contrast(' + state.basic.contrast + '%) saturate(' + state.basic.saturate + '%) brightness(' + state.basic.brightness + '%) sepia(' + state.basic.sepia + '%) grayscale(' + state.basic.grayscale + '%) blur(' + state.basic.blur + 'px) invert(' + state.basic.invert + ') hue-rotate(' + state.basic.hue + 'deg)');
    }

    //change Hue-rotate
    $("#hue_range").on('change', function () {
        var v = $("#hue_range").val();

        state.basic.hue = v;
        applyFilters();
       // $("canvas").css('filter', ' hue-rotate(' + state.filter.hue + '%)');
      
    });
    //change Sepia
    $("#sepia_range").on('change', function () {
        var v = $("#sepia_range").val();

        state.basic.sepia = +v;
       
        applyFilters();
       //$("canvas").css('filter', ' sepia(' + state.basic.sepia + '%)');
       
      
    });

    // change Blur
    $("#blur_range").on('change', function () {
        var v = $("#blur_range").val();
        state.basic.blur = +v;
        applyFilters();
    });

    //change Brightness
    $("#brightness_range").on('change', function () {
        var v = $("#brightness_range").val();
        state.basic.brightness = +v+100;
       // $("canvas").css('opacity', state.basic.brightness);
        applyFilters();
    });

    //change Contrast
    $("#contrast_range").on('change', function () {
        var v = $("#contrast_range").val();
        state.basic.contrast =+v+100;
        //$("canvas").css('filter', 'contrast(' + state.basic.contrast + '%)');
        applyFilters();
    });

    //change Saturate
    $("#saturate_range").on('change', function () {
        var v = $('#saturate_range').val();
        state.basic.saturate = +v+100;

        //$("canvas").css('filter', 'saturate(' + state.basic.saturate + '%)');
        applyFilters();
    });

    //change Grayscale
    $("#grayscale_range").on('change', function () {
        var v = $("#grayscale_range").val();
        state.basic.grayscale = +v;
        //$("canvas").css('filter', 'grayscale(' + state.basic.grayscale + ')');
        applyFilters();
    });

    //change Invert
    $("#invert_range").on('change', function () {
        var v = $('#invert_range').val();
        state.basic.invert = +v;
      //  $("canvas").css('filter', 'invert(' + state.basic.invert + ')');
        applyFilters();
    });

    //change Noise
    function noise(pixels, factor) {
        var data = pixels.data;
        var noise = (0.5 - Math.random()) * factor;
        for (var i = 0; i < data.length; i += 4) {
            noise = (0.5 - Math.random()) * factor;
            data[i] = data[i] + noise; //red
            data[i + 1] = data[i + 1] + noise; // green
            data[i + 2] = data[i + 2] + noise; // blue  
            data[i + 3] = 255;
        }
        return pixels;
    }

    $("#noise_range").on('change', function () {
        var v = $('#noise_range').val();
        state.filter.noise = v;

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        imageData = noise(imageData, v);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(imageData, 0, 0);

    });

    function greenColor(pixels, v) {
        var data = pixels.data;
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        for (var i = 0; i < data.length; i += 4) {
            data[i] = 0;
            data[i + 1] = data[i + 1] * v; // green
            data[i + 2] = 0; // blue     
        }
        return pixels;
    }

    //change Night_vision
    $("#night_vision_range").on('change', function () {

        var v = +$('#night_vision_range').val();
        state.basic.night_vision = v;
        var data = canvas.toDataURL();

        //var myElement = document.getElementById('myCanvas');

        canvas.style.backgroundImage = 'url(' + data + '), radial-gradient(#0F0, #000), repeating-linear-gradient(transparent 0, rgba(0, 0, 0, 0.1) 2.5px, transparent 5px)';
        canvas.style.backgroundSize = "cover";
        canvas.style.backgroundBlendMode = "overlay";
        canvas.style.backgroundPosition = "center";

        ctx.clearRect(0, 0, canvas.width, canvas.height);

    });


   //**********************
    function ChangeOpenHidden(where)
    {
        if ($(where).hasClass("open")) {
            $(where).removeClass("open");
            $(where).addClass("hidden");
        }
        else {
            $(where).removeClass("hidden");
            $(where).addClass("open");
        }

    }

    //filters
    $("#filter_classic").on('click', function () {
        var where = "#filter_classic_container";
        ChangeOpenHidden(where);
    });
  
    $("#filter_popular").on('click', function () {
        var where="#filter_popular_container";
       ChangeOpenHidden(where);
    });
    //effects
    $("#effects_multi").on('click', function () {
        var where = "#effects_multi_container";
        ChangeOpenHidden(where);
    });
    $("#effects_textures").on('click', function () {
        var where = "#effects_textures_container";
        ChangeOpenHidden(where);
    });
    $("#effects_bokeh").on('click', function () {
        var where = "#effects_bokeh_container";
        ChangeOpenHidden(where);
    });
    $("#effects_drawing").on('click', function () {
        var where = "#effects_drawing_container";
        ChangeOpenHidden(where);
    });

    //clipart
    $("#bw_frames_sq_clipart").on('click', function () {
        var where = "#bw_frames_sq_container";
        ChangeOpenHidden(where);
    });
    $("#colored_sq_frames_clipart").on('click', function () {
        var where = "#colored_sq_frames_container";
        ChangeOpenHidden(where);
    });


    $("#colored_frames_portrait_clipart").on('click', function () {
        var where = "#colored_frames_portrait_container";
        ChangeOpenHidden(where);
    });
    $("#bw_frames_portrait_clipart").on('click', function () {
        var where = "#bw_frames_portrait_container";
        ChangeOpenHidden(where);
    });

    $("#bw_frames_landscape_clipart").on('click', function () {
        var where = "#bw_frames_landscape_container";
        ChangeOpenHidden(where);
    });

    $("#colored_frames_landscape_clipart").on('click', function () {
        var where = "#colored_frames_landscape_container";
        ChangeOpenHidden(where);
    });
    $("#sq_frames_clipart").on('click', function () {
        var where1 = "#bw_frames_sq_clipart";
        ChangeOpenHidden(where1);
        var where2 = "#colored_sq_frames_clipart";
        ChangeOpenHidden(where2);

        var where3 = "#hrSquare";
        ChangeOpenHidden(where3);
 
    });
    $("#corners_clipart").on('click', function () {
        var where = "#corners_clipart_forall_container";
        ChangeOpenHidden(where);

        var where2 = "#hrCorner";
        ChangeOpenHidden(where2);
       
    });
    //collage
    $("#collage_frame").on('click', function () {
        var where = "#collage_frame_container";
        ChangeOpenHidden(where);


    });
    $("#collage_frame_colored").on('click', function () {
        var where = "#collage_frame_colored_container";
        ChangeOpenHidden(where);
    });

    $("#collage_patterns").on('click', function () {
        var where = "#collage_patterns_container";
        ChangeOpenHidden(where);
    });
   
    //collage_polaroid_style
    $("#collage_polaroid_style").on('click', function () {
        var where = "#collage_polaroid_styles_container";
        ChangeOpenHidden(where);
        var where2 = "#col_4";
        ChangeOpenHidden(where2);
        var where3 = "#hrPolaroid1";
        ChangeOpenHidden(where3);
        var where4 = "#hrPolaroid2";
        ChangeOpenHidden(where4);
    });

   

    //param_collage
    $("#collage_patterns").on('click', function () {
        var where = "#param_collage";
        ChangeOpenHidden(where);
    });

    $("#landscape_frames_clipart").on('click', function () {
        var where1 = "#bw_frames_landscape_clipart";
        ChangeOpenHidden(where1);

        var where2 = "#colored_frames_landscape_clipart";
        ChangeOpenHidden(where2);

        var where3 = "#hrLandscape";
        ChangeOpenHidden(where3);
    });


    $("#portrait_frames_clipart").on('click', function () {
        var where1 = "#bw_frames_portrait_clipart";
        ChangeOpenHidden(where1);

        var where2 = "#colored_frames_portrait_clipart";
        ChangeOpenHidden(where2);

        var where3 = "#hrPortrait";
        ChangeOpenHidden(where3);
    });

    
    $("#bordures_clipart").on('click', function () {
        var where = "#bordures_clipart_forall_container";
        ChangeOpenHidden(where);
        var where2 = "#hrBorder";
        ChangeOpenHidden(where2);
      
    });
  
    $("#bordureSize_1").on('change', function () {
        var v = $('#bordureSize_1').val();
        state.clipart.top = v;
        Bordure1();

    });

    $("#bordureSize_2").on('change', function () {
        var v = $('#bordureSize_2').val();
        state.clipart.right = v;
        Bordure2();
    });

    $("#bordureSize_3").on('change', function () {
        var v = $('#bordureSize_3').val();
        state.clipart.bottom = v;
        Bordure3();
    });

    $("#bordureSize_4").on('change', function () {
        var v = $('#bordureSize_4').val();
        state.clipart.left = v;
        Bordure4();
    });
    //**********************

    function DrawEffectOnCanvas(url1, url2, type) {
      
        ctx.clearRect(0, 0, canvas.width, canvas.height);
       
        canvas.style.backgroundImage = url1 + "," + url2;
        canvas.style.backgroundBlendMode = type;
        canvas.style.backgroundSize = "cover";
        canvas.style.backgroundPosition="center";
    }

    function ChangeOpenHidden(where) {
        if ($(where).hasClass("open")) {
            $(where).removeClass("open");
            $(where).addClass("hidden");
        }
        else {
            $(where).removeClass("hidden");
            $(where).addClass("open");
        }

    }



    

    $("#collage_polaroid_styles_container div").on('click', function () {
       
        var pattern = this.getAttribute("data-pattern");

       state.collage.pattern = pattern;
  
        ApplyPatternCollage();
   
    });

    function ApplyPatternCollage()
    {
        var w=canvas.width;
        var h = canvas.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawImageOnCanvas(img_canvas);

        if (state.collage.pattern == "pattern1")
        {
            
            Pattern1(state.collage.lineColor, state.collage.lineSize, h, w);
        }
        if (state.collage.pattern == "pattern2") {
      
            Pattern2(state.collage.lineColor, state.collage.lineSize, h, w);
        }
        if (state.collage.pattern == "pattern3") {

            Pattern3(state.collage.lineColor, state.collage.lineSize, h, w);
        }
        if (state.collage.pattern == "pattern4") {

            Pattern4(state.collage.lineColor, state.collage.lineSize, h, w);
        }
        if (state.collage.pattern == "pattern5") {

            Pattern5(state.collage.lineColor, state.collage.lineSize, h, w);
        }
        if (state.collage.pattern == "pattern6") {

            Pattern6(state.collage.lineColor, state.collage.lineSize, h, w);
        }
        if (state.collage.pattern == "pattern7") {

            Pattern7(state.collage.lineColor, state.collage.lineSize, h, w);
        }
        if (state.collage.pattern == "pattern8") {

            Pattern8(state.collage.lineColor, state.collage.lineSize, h, w);
        }
        if (state.collage.pattern == "pattern9") {

            Pattern9(state.collage.lineColor, state.collage.lineSize, h, w);
        }
        if (state.collage.pattern == "pattern10") {

            Pattern10(state.collage.lineColor, state.collage.lineSize, h, w);
        }
        if (state.collage.pattern == "pattern11") {

            Pattern11(state.collage.lineColor, state.collage.lineSize, h, w);
        }
        if (state.collage.pattern == "pattern12") {

            Pattern12(state.collage.lineColor, state.collage.lineSize, h, w);
        }
        if (state.collage.pattern == "pattern13") {

            Pattern13(state.collage.lineColor, state.collage.lineSize, h, w);
        }
        if (state.collage.pattern == "pattern14") {

            Pattern14(state.collage.lineColor, state.collage.lineSize, h, w);
        }
        if (state.collage.pattern == "pattern15") {

            Pattern15(state.collage.lineColor, state.collage.lineSize, h, w);
        }
        if (state.collage.pattern == "d1") {

            DisignPattern1();
        }
        
    }

    function Line1(lineColor, lineSize,h,w)
    {
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w / 2 - lineSize / 2), 0);
        ctx.lineTo((w / 2 - lineSize / 2), h);
        ctx.closePath();
        ctx.stroke();
    }

    function Line2(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo(0, (2*h/3 - lineSize-lineSize / 2));
        ctx.lineTo((w / 2 - lineSize / 2), (2*h/3 - lineSize-lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line3(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w/ 2 - lineSize / 2), (h/3 -lineSize-lineSize/2));
        ctx.lineTo(w, (h / 3 - lineSize - lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line4(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo(0, (h / 3 - lineSize - lineSize / 2));
        ctx.lineTo((w/ 2 - lineSize / 2), (h / 3 - lineSize - lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line5(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w / 3 - lineSize - lineSize / 2), 0);
        ctx.lineTo((w / 3 - lineSize - lineSize / 2), h);
        ctx.closePath();
        ctx.stroke();
    }
    function Line6(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((2*w / 3 - lineSize - lineSize / 2), 0);
        ctx.lineTo((2 * w / 3 - lineSize - lineSize / 2), (h / 3- lineSize - lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line7(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo(0, (2*h / 3 - lineSize - lineSize / 2));
        ctx.lineTo((w / 3 - lineSize - lineSize / 2), (2*h / 3- lineSize - lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line8(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((2*w / 3 - lineSize - lineSize / 2), 0);
        ctx.lineTo((2*w / 3 - lineSize - lineSize / 2), h);
        ctx.closePath();
        ctx.stroke();
    }
    function Line9(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((2 * w / 3 - lineSize - lineSize / 2), (2 * h / 3 - lineSize - lineSize / 2));
        ctx.lineTo(w , (2 * h / 3 - lineSize - lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line10(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo(0, (h / 3 - lineSize - lineSize / 2));
        ctx.lineTo((w / 3 - lineSize - lineSize / 2), (h / 3 - lineSize - lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line11(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((2 * w / 3 - lineSize - lineSize / 2), (h / 3 - lineSize - lineSize / 2));
        ctx.lineTo(w, (h / 3 - lineSize - lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line12(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w / 2 - lineSize / 2), (h / 2 - lineSize / 2));
        ctx.lineTo(w, (h /2 - lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line13(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w / 3 - lineSize - lineSize / 2), (h / 3 - lineSize - lineSize / 2));
        ctx.lineTo((2*w / 3 - lineSize - lineSize / 2), (h / 3 - lineSize - lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line14(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w / 3 - lineSize - lineSize / 2), (2 * h / 3 - lineSize - lineSize / 2));
        ctx.lineTo((2 * w / 3 - lineSize - lineSize / 2), (2*h / 3 - lineSize - lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line15(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w / 3 - lineSize - lineSize / 2), (h / 3 - lineSize - lineSize / 2));
        ctx.lineTo((w / 3 - lineSize - lineSize / 2), h);
        ctx.closePath();
        ctx.stroke();
    }
    function Line16(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((2*w / 3 - lineSize - lineSize / 2), 0);
        ctx.lineTo((2 * w / 3 - lineSize - lineSize / 2), (2*h / 3 - lineSize - lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line17(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w / 3 - lineSize - lineSize / 2), (2 * h / 3 - lineSize - lineSize / 2));
        ctx.lineTo((2*w / 3 - lineSize - lineSize / 2), (2 * h / 3 - lineSize - lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line18(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo(0, (h / 4 - 2*lineSize));
        ctx.lineTo((w / 3 - lineSize - lineSize / 2), (h / 4 - 2*lineSize));
        ctx.closePath();
        ctx.stroke();
    }
    function Line19(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((2*w / 3 - lineSize - lineSize / 2), (h / 4 - 2*lineSize));
        ctx.lineTo(w , (h / 4 - 2*lineSize ));
        ctx.closePath();
        ctx.stroke();
    }
    function Line20(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo(0, (3*h / 4 - 2*lineSize ));
        ctx.lineTo((w / 3 - lineSize - lineSize / 2), (3*h / 4 - 2*lineSize));
        ctx.closePath();
        ctx.stroke();
    }
    function Line21(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((2 * w / 3 - lineSize - lineSize / 2), (3*h / 4 - 2*lineSize));
        ctx.lineTo(w, (3*h / 4 - 2*lineSize));
        ctx.closePath();
        ctx.stroke();
    }
    function Line22(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w / 3 - lineSize - lineSize / 2), (h / 2- lineSize / 2));
        ctx.lineTo((2*w / 3 - lineSize - lineSize / 2), (h / 2 - lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line23(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((2*w / 3 - lineSize - lineSize / 2), (h / 2 - lineSize / 2));
        ctx.lineTo(w, (h / 2 - lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line24(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w / 2 - lineSize / 2), (h / 3 -lineSize -lineSize / 2));
        ctx.lineTo((w / 2 - lineSize / 2), (2*h / 3-lineSize - lineSize / 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line25(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w / 4 - 2*lineSize),0);
        ctx.lineTo((w / 4 - 2*lineSize ), (h / 4- 2*lineSize ));
        ctx.closePath();
        ctx.stroke();
    }
    function Line26(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((3*w / 4 - lineSize*2), 0);
        ctx.lineTo((3*w / 4 - 2*lineSize), (h / 4 - lineSize * 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line27(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w / 4 - lineSize*2), (3*h / 4- 2*lineSize ));
        ctx.lineTo((w / 4 - lineSize *2), h);
        ctx.closePath();
        ctx.stroke();
    }
    function Line28(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((3 * w / 4 - 2*lineSize), (3 * h / 4 - lineSize*2));
        ctx.lineTo((3 * w / 4 - lineSize *2), h );
        ctx.closePath();
        ctx.stroke();
    }
    function Line29(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo(0, (h / 4 - lineSize*2));
        ctx.lineTo((w / 4 - lineSize*2), (h / 4 - lineSize*2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line30(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((3 * w / 4 -lineSize*2), (h / 4 - lineSize *2));
        ctx.lineTo(w, (h / 4 - lineSize*2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line31(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo(0, (3 * h / 4 - lineSize *2));
        ctx.lineTo((w / 4 - lineSize *2), (3* h / 4 - lineSize*2));
        ctx.closePath();
        ctx.stroke();
    }  
    function Line32(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((3*w / 4 - lineSize * 2), (3 * h / 4 - lineSize*2));
        ctx.lineTo(w, (3* h / 4 - lineSize *2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line33(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo(0, (h / 2 - lineSize *2));
        ctx.lineTo((w / 4 - lineSize *2), (h / 2 - lineSize *2));
        ctx.closePath();
        ctx.stroke();
    }
     function Line34(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((3 * w / 4 -lineSize *2), (h / 2 - lineSize *2));
        ctx.lineTo(w, (h / 2 - lineSize * 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line35(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w / 2 - lineSize *2), 0);
        ctx.lineTo((w / 2 - lineSize *2), (h / 4 - lineSize *2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line36(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w / 2 - lineSize *2), (3*h / 4 - lineSize*2));
        ctx.lineTo((w / 2 - lineSize * 2), h);
        ctx.closePath();
        ctx.stroke();
    }
    function Line37(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w / 4 - lineSize *2), (h / 4 - lineSize * 2));
        ctx.lineTo((w / 4 - lineSize *2), (3*h / 4 - lineSize *2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line38(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((3*w / 4 - lineSize *2), (h / 4 - lineSize *2));
        ctx.lineTo((3*w / 4 - lineSize * 2), (3 * h / 4 - lineSize * 2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line39(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo(( w / 4 - lineSize * 2), (h / 4 - lineSize * 2));
        ctx.lineTo((3 * w / 4 - lineSize *2), (h / 4 - lineSize *2));
        ctx.closePath();
        ctx.stroke();
    }
    function Line40(lineColor, lineSize, h, w) {

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineSize;
        ctx.moveTo((w / 4 - lineSize *2), (3*h / 4 - lineSize *2));
        ctx.lineTo((3 * w / 4 - lineSize *2), (3*h / 4 - lineSize * 2));
        ctx.closePath();
        ctx.stroke();
    }

    function Pattern1(lineColor, lineSize,h,w) {
        Line1(lineColor, lineSize, h, w);
        Line2(lineColor, lineSize, h, w);
        Line3(lineColor, lineSize, h, w); 
    }
    function Pattern2(lineColor, lineSize,h,w) {
        Line1(lineColor, lineSize, h, w);
        Line2(lineColor, lineSize, h, w);
        Line4(lineColor, lineSize, h, w);  
    }
    function Pattern3(lineColor, lineSize, h, w) {
        Line5(lineColor, lineSize, h, w);
        Line3(lineColor, lineSize, h, w);
        Line4(lineColor, lineSize, h, w);
        Line6(lineColor, lineSize, h, w);
        Line7(lineColor, lineSize, h, w);
    }
    function Pattern4(lineColor, lineSize, h, w) {
        Line5(lineColor, lineSize, h, w);
        Line7(lineColor, lineSize, h, w);
        Line10(lineColor, lineSize, h, w);
        Line8(lineColor, lineSize, h, w);
        Line9(lineColor, lineSize, h, w);
        Line11(lineColor, lineSize, h, w);
    }
    function Pattern5(lineColor, lineSize, h, w) {
        Line1(lineColor, lineSize, h, w);
        Line12(lineColor, lineSize, h, w);

    }
    function Pattern6(lineColor, lineSize, h, w) {
        Line5(lineColor, lineSize, h, w);
        Line8(lineColor, lineSize, h, w);
        Line7(lineColor, lineSize, h, w);
        Line10(lineColor, lineSize, h, w);
        Line13(lineColor, lineSize, h, w);
        Line14(lineColor, lineSize, h, w);
    }
    function Pattern7(lineColor, lineSize, h, w) {
        Line10(lineColor, lineSize, h, w);
        Line13(lineColor, lineSize, h, w);
        Line9(lineColor, lineSize, h, w);
        Line15(lineColor, lineSize, h, w);
        Line16(lineColor, lineSize, h, w);
        Line17(lineColor, lineSize, h, w);
        
    }
    function Pattern8(lineColor, lineSize, h, w) {
        Line5(lineColor, lineSize, h, w);
        Line8(lineColor, lineSize, h, w);
        Line18(lineColor, lineSize, h, w);
        Line19(lineColor, lineSize, h, w);
        Line20(lineColor, lineSize, h, w);
        Line21(lineColor, lineSize, h, w);
        Line22(lineColor, lineSize, h, w);
    }
    function Pattern9(lineColor, lineSize, h, w) {
        Line5(lineColor, lineSize, h, w);
        Line8(lineColor, lineSize, h, w);
        Line23(lineColor, lineSize, h, w);
        Line22(lineColor, lineSize, h, w);
    }
    function Pattern10(lineColor, lineSize, h, w) {
        Line3(lineColor, lineSize, h, w);
        Line4(lineColor, lineSize, h, w);
        Line7(lineColor, lineSize, h, w);
        Line14(lineColor, lineSize, h, w);
        Line9(lineColor, lineSize, h, w);
        Line24(lineColor, lineSize, h, w);
    }
    function Pattern11(lineColor, lineSize, h, w) {
        Line29(lineColor, lineSize, h, w);
        Line30(lineColor, lineSize, h, w);
        Line31(lineColor, lineSize, h, w);
        Line32(lineColor, lineSize, h, w);
        Line25(lineColor, lineSize, h, w);
        Line26(lineColor, lineSize, h, w);
        Line27(lineColor, lineSize, h, w);
        Line28(lineColor, lineSize, h, w);
        Line33(lineColor, lineSize, h, w);
        Line34(lineColor, lineSize, h, w);
        Line35(lineColor, lineSize, h, w);
        Line36(lineColor, lineSize, h, w);
        Line37(lineColor, lineSize, h, w);
        Line38(lineColor, lineSize, h, w);
        Line39(lineColor, lineSize, h, w);
        Line40(lineColor, lineSize, h, w);
    }
    function Pattern12(lineColor, lineSize, h, w) {
        Line29(lineColor, lineSize, h, w);
        Line30(lineColor, lineSize, h, w);
        Line31(lineColor, lineSize, h, w);
        Line32(lineColor, lineSize, h, w);
        Line25(lineColor, lineSize, h, w);
        Line26(lineColor, lineSize, h, w);
        Line27(lineColor, lineSize, h, w);
        Line28(lineColor, lineSize, h, w);
        Line37(lineColor, lineSize, h, w);
        Line38(lineColor, lineSize, h, w);
        Line39(lineColor, lineSize, h, w);
        Line40(lineColor, lineSize, h, w);
    }
    function Pattern13(lineColor, lineSize, h, w) {
        Line29(lineColor, lineSize, h, w);
        Line30(lineColor, lineSize, h, w);
        Line31(lineColor, lineSize, h, w);
        Line32(lineColor, lineSize, h, w);
        Line25(lineColor, lineSize, h, w);
        Line26(lineColor, lineSize, h, w);
        Line27(lineColor, lineSize, h, w);
        Line28(lineColor, lineSize, h, w);
    }
    function Pattern14(lineColor, lineSize, h, w) {
        Line1(lineColor, lineSize, h, w);

    }
    function Pattern15(lineColor, lineSize, h, w) {
        
        Line33(lineColor, lineSize, h, w);
        Line34(lineColor, lineSize, h, w);
        Line35(lineColor, lineSize, h, w);
        Line36(lineColor, lineSize, h, w);
        Line37(lineColor, lineSize, h, w);
        Line38(lineColor, lineSize, h, w);
        Line39(lineColor, lineSize, h, w);
        Line40(lineColor, lineSize, h, w);
    }

    function f1()
    {
        var clipImg1 = new Image();

        
        clipImg1 = original_img;
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.3;
        ctx.drawImage(clipImg1, 0, 0);
      
        ctx.globalCompositeOperation = "source-over";

        ctx.strokeStyle = "green";
        ctx.lineWidth = 5;
        ctx.strokeRect(40, 95, 100, 100);
        ctx.globalAlpha = 0.3;
        ctx.drawImage(clipImg1, 40, 95, 100, 100, 40, 95, 100, 100);
        ctx.strokeStyle = "red";
        ctx.globalAlpha = 1;
               
        //ctx.beginPath();
       
        //ctx.arc(275, 175, 90, 0, Math.PI * 2);
        //ctx.stroke();
        //clip();
        //ctx.globalCompositeOperation = "source-in";
    
        ctx.strokeRect(200, 100, 150, 150);
        ctx.drawImage(clipImg1, 200, 100, 150, 150, 200, 100, 150, 150);
        ctx.globalCompositeOperation = "source-over";
        
    }
    
    $("#effects_multi_container div,#bw_frames_sq_container div,#colored_sq_frames_container div,#effects_bokeh_container div,#effects_textures_container div,#colored_frames_portrait_container div,#bw_frames_portrait_container div,#colored_frames_landscape_container div,#bw_frames_landscape_container div,#collage_frame_container div,#collage_frame_colored_container div").on('click', function () {

        DrawImageOnCanvas(img_canvas);

        var url1 = this.getAttribute("data-first");
        if (url1 === "myPhoto")
        {
            var data=canvas.toDataURL();
            url1 = 'url('+data+')';
        }

        var url2 = this.getAttribute("data-second");
        if (url2 === "myPhoto") {
            
            var data = canvas.toDataURL();
            url2 = 'url(' + data + ')';
        }
       
        var type = this.getAttribute("data-background-blend-mode");
        DrawEffectOnCanvas(url1, url2, type);

    });

    $("#filter_popular_container div").on('click', function () {

        DrawImageOnCanvas(img_canvas);

        var data = canvas.toDataURL();
        var url = 'url(' + data + ')';

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var n = this.getAttribute("data-number");

        var f1 = this.getAttribute("data-1");
        var f2 = this.getAttribute("data-2");
        var f3;
        var f4;
        var f5;
        if (n == 2)
        {
            canvas.style.backgroundImage = url;
            canvas.style.filter=f1 + ' ' + f2;
        }
        if (n == 3)
        {
            f3 = this.getAttribute("data-3");
            canvas.style.backgroundImage = url;
            canvas.style.filter=f1 + ' ' + f2 + ' ' + f3;       
        }
        if (n ==4) {
            f3 = this.getAttribute("data-3");
            f4 = this.getAttribute("data-4");
            canvas.style.backgroundImage = url;
            canvas.style.filter = f1 + ' ' + f2 + ' ' + f3 + ' ' + f4;
        }
        if (n == 5) {
            f3 = this.getAttribute("data-3");
            f4 = this.getAttribute("data-4");
            f5 = this.getAttribute("data-5");
            canvas.style.backgroundImage = url;
            canvas.style.filter = f1 + ' ' + f2 + ' ' + f3 + ' ' + f4 + ' ' + f5;
        }
        
    });

    function SizeCorner(canvas){
        var w=canvas.width;
        var h = canvas.height;

        if(w>h)
        {
            change=h/3;
        }
        else{
            change=w/3;
        }   
        return change;
    }



    $('#corner_radio1').on('change', function () {
        var where = $("#canvas_corner1");
        ChangeOpenHidden(where)
    });
    $('#corner_radio2').on('change', function () {
        var where = $("#canvas_corner2");
        ChangeOpenHidden(where)
    });
    $('#corner_radio3').on('change', function () {
        var where = $("#canvas_corner3");
        ChangeOpenHidden(where)
    });
    $('#corner_radio4').on('change', function () {
        var where = $("#canvas_corner4");
        ChangeOpenHidden(where)
    });


    $('#bordure_radio1').on('change', function () {
        var where = $("#canvas_line1");
        ChangeOpenHidden(where)
    });
    $('#bordure_radio2').on('change', function () {
        var where = $("#canvas_line2");
        ChangeOpenHidden(where)
    });
    $('#bordure_radio3').on('change', function () {
        var where = $("#canvas_line3");
        ChangeOpenHidden(where)
    });
    $('#bordure_radio4').on('change', function () {
        var where = $("#canvas_line4");
        ChangeOpenHidden(where)
    });
    function ApplyCorner(data)
    {
        var v = -1;
        $("#canvas_corner1").css("background-image", data);

        $("#canvas_corner2").css("background-image", data);
        $("#canvas_corner2").css("transform", ' scaleX(' + v + ')');

        $("#canvas_corner3").css("background-image", data);
        $("#canvas_corner3").css("transform", 'rotate(-180deg)');

        $("#canvas_corner4").css("background-image", data);
        $("#canvas_corner4").css("transform", ' scaleY(' + v + ')');
    }
 
    $("#corner_container div").on('click', function () {

        var maxSize = SizeCorner(canvas);
        $(".canvas_corner").css('height', maxSize);
        $(".canvas_corner").css('width', maxSize);
        var moveW = canvas.width - maxSize;
        var moveH = canvas.height - maxSize;


        $("#canvas_corner2").css("left",moveW);
        $("#canvas_corner3").css("top", moveH);
        $("#canvas_corner3").css("left",moveW);
        $("#canvas_corner4").css("top", moveH);
        
        var data = this.getAttribute("data-corner_img");

        var good = this.getAttribute("data-goodFor");
        ApplyCorner(data);
                
    });

    function ApplyLine(data) {
        var v = -1;
        $("#canvas_line1").css("background-image", data);

        $("#canvas_line3").css("background-image", data);
        //$("#canvas_corner3").css("transform", ' rotateX(-180deg)');

        $("#canvas_line2").css("background-image", data);
        $("#canvas_line2").css("transform", ' rotate(-90deg)');

      

        $("#canvas_line4").css("background-image", data);
        $("#canvas_line4").css("transform", ' rotate(-90deg)');
    }

    function newSizeW(data) {

        var w = canvas.width / 3;
        var ww = data.width;
        var proportion = ww / w;
    }

    function Bordure1() {
        var w = canvas.width / 3
        var w1 = canvas.width * state.clipart.top / 100;
        var h = canvas.height / 3;
        var data = state.clipart.data;
        var param = (3*w-w1 )/ 2;
        var left =  param+"px";
        var ww = w1 + "px";
        if (data != "") {
            $("#canvas_line1").css("background-image", data);
            $("#canvas_line1").css("background-size", "contain");
            $("#canvas_line1").css("background-position", "center");

            $("#canvas_line1").css("background-repeat", "repeat-x");
            $("#canvas_line1").css("left", left);
            $("#canvas_line1").css("width", ww);
            $("#canvas_line1").css("height", h / 4 + "px");
        }
    }
    function Bordure2() {

        var w = canvas.width / 3
        var w2 = canvas.height * state.clipart.right / 100;
        var h = canvas.height / 3;
        var data = state.clipart.data;
        var param = (3 *h - w2) / 2;
        var left = 3 * w - w2/2-h/8 + "px";
        var ww = w2 + "px";
        var top = w2 / 2 - h / 8 + param + "px";
        if (data != "") {
            $("#canvas_line2").css("height", h / 4 + "px");
            $("#canvas_line2").css("width", ww);
            $("#canvas_line2").css("transform", ' rotate(90deg)');
            $("#canvas_line2").css("background-image", data);
            $("#canvas_line2").css("background-size", "contain");
            $("#canvas_line2").css("background-position", "center");
            $("#canvas_line2").css("background-repeat", "repeat-x");

            $("#canvas_line2").css("left", left);
            $("#canvas_line2").css("top", top);
        }
    }

    function Bordure3() {
        var w = canvas.width / 3
        var w3= canvas.width * state.clipart.bottom / 100;
        var h = canvas.height / 3;
        var data = state.clipart.data;
        var param = (3 * w - w3) / 2;
        var left =  param + "px";
        var ww = w3  + "px";
        if (data != "") {
            $("#canvas_line3").css("width", ww);
            $("#canvas_line3").css("left", left);
            $("#canvas_line3").css("top", 3 * h - h * 1 / 4);
            $("#canvas_line3").css("height", h / 4 + "px");
            $("#canvas_line3").css("background-image", data);
            $("#canvas_line3").css("background-size", "contain");
            $("#canvas_line3").css("background-position", "center");
            $("#canvas_line3").css("background-repeat", "repeat-x");
            $("#canvas_line3").css("transform", ' scale(1, -1) ');
        }

    }

    function Bordure4() {
        var w = canvas.width / 3
        var w4 = canvas.height * state.clipart.left / 100;
        var h = canvas.height / 3;
        var data = state.clipart.data;
        var param = (3 * h - w4) / 2;
        var left = -w4 / 2 +h/8  + "px";
        var ww = w4 + "px";
        var top = w4 / 2 - h / 8 + param + "px";

       
        if (data != "") {

            $("#canvas_line4").css("height", h / 4 + "px");
            $("#canvas_line4").css("width", ww);
            $("#canvas_line4").css("left", left);
            $("#canvas_line4").css("transform", ' rotate(-90deg)');
            $("#canvas_line4").css("top", top);

            $("#canvas_line4").css("background-image", data);
            $("#canvas_line4").css("background-size", "contain");
            $("#canvas_line4").css("background-position", "center");
            $("#canvas_line4").css("background-repeat", "repeat-x");

        }

    }
    $("#bordures_container div").on('click', function () {
        var d = this.getAttribute("data-line_img");
        state.clipart.data = d;
        if (d != "") { 
    
            Bordure1();
            Bordure2();
            Bordure3();
            Bordure4();
        }
    });


 


    //***********************
    //pencil
    function DrawLikePencil(data) {
        
        canvas.style.backgroundImage = 'url(' + data + ')';
       
        canvas.style.backgroundSize = "cover";
        canvas.style.backgroundPosition="50%";

        canvas.style.backgroundImage = 'url(' + data + '), url(' + data+')';
        canvas.style.backgroundBlendMode = "difference";
        canvas.style.backgroundPosition=" calc(50% - 1px) calc(50% - 1px),calc(50% + 1px) calc(50% + 1px)";
        canvas.style.filter ="brightness(2) invert(1) grayscale(1)";
        canvas.style.boxShadow="inset 0 0 0 1px #000";


    }
    
    $("#pancil").on('click', function () {
        DrawImageOnCanvas(img_canvas);
        var data = canvas.toDataURL();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawLikePencil(data);
    });
    //emboss

    function DrawEmboss(data) {

        canvas.style.backgroundImage = 'url(' + data + ')';

        canvas.style.backgroundSize = "cover";
        canvas.style.backgroundPosition = "center";

        canvas.style.backgroundImage = 'url(' + data + '), url(' + data + '), url(' + data + ')';
        canvas.style.backgroundBlendMode = "difference, screen";
        canvas.style.backgroundPosition = " calc(50% - 1px) calc(50% - 1px), calc(50% + 1px) calc(50% + 1px), center";
        canvas.style.filter = "brightness(2) invert(1) grayscale(1)";
    }

    $("#emboss").on('click', function () {
        DrawImageOnCanvas(img_canvas);
        var data = canvas.toDataURL();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawEmboss(data);
    });

    //chalkboard

    function DrawLikeChalkboard(data) {

        canvas.style.backgroundImage = 'url(' + data + ')';

        canvas.style.backgroundSize = "cover";
        canvas.style.backgroundPosition = "center";

        canvas.style.backgroundImage = 'url(' + data + '), url(' + data + ')';
        canvas.style.backgroundBlendMode = "difference";
        canvas.style.backgroundPosition = " calc(50% - 1px) calc(50% - 1px), calc(50% + 1px) calc(50% + 1px)";
        canvas.style.filter = "brightness(1.5) grayscale(1)";
    }

    $("#chaclkbord").on('click', function () {
        DrawImageOnCanvas(img_canvas);
        var data = canvas.toDataURL();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawLikeChalkboard(data);
    });
    

    //chalkboardColored

    function DrawLikeColoredChalkboard(data) {

        canvas.style.backgroundImage = 'url(' + data + ')';

        canvas.style.backgroundSize = "cover";
        canvas.style.backgroundPosition = "center";

        canvas.style.backgroundImage = 'url(' + data + '), url(' + data + '), url(' + data + ')';
        canvas.style.backgroundSize = "cover";
      
        canvas.style.backgroundPosition = " calc(50% - 1px) calc(50% - 1px), calc(50% + 1px) calc(50% + 1px)";
        canvas.style.backgroundBlendMode = " color, difference";
        canvas.style.filter = "brightness(2)";

    }

    $("#colored_chackbord").on('click', function () {
        DrawImageOnCanvas(img_canvas);
        var data = canvas.toDataURL();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawLikeColoredChalkboard(data);
    });

    //emboss(img_canvas, imageData);

    $("#colored_pancil").on('click', function () {
        DrawImageOnCanvas(img_canvas);
       

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
        imageData = DrawLikeColoredPencil(img_canvas, imageData);
     
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(imageData, 0, 0);
       
    });

    //**********************
    //border width
    $("#border_w_range").on('change', function () {
        var v = $("#border_w_range").val();
        var vv = parseInt(v, 10);
        var border_w_rangeInput = document.getElementById('border_w_rangeInput');
        border_w_rangeInput.value = v;

        state.frame.border_width.top = vv;
        state.frame.border_width.left = vv;
        state.frame.border_width.right = vv;
        state.frame.border_width.bottom = vv;


        $("canvas").css('border', state.frame.border_width.top + 'px ' + state.frame.border_style.top + ' ' + state.frame.border_color.top);

        indAreEqual(v, "top_border_w_range");
        changeIndParametr("#top_border_w_range", "top_border_w_rangeInput");

        indAreEqual(v, "right_border_w_range");
        changeIndParametr("#right_border_w_range", "right_border_w_rangeInput");

        indAreEqual(v, "bottom_border_w_range");
        changeIndParametr("#bottom_border_w_range", "bottom_border_w_rangeInput");

        indAreEqual(v, "left_border_w_range");
        changeIndParametr("#left_border_w_range", "left_border_w_rangeInput");

    });

    //border style
    $("#select_border").change(function () {
        var v = "";
        $("#select_border option:selected").each(function () {
            v += $(this).text();
        })
        state.frame.border_style.top = v;
        state.frame.border_style.left = v;
        state.frame.border_style.right = v;
        state.frame.border_style.bottom = v;

        $("canvas").css('border', state.frame.border_width.top + 'px ' + state.frame.border_style.top + ' ' + state.frame.border_color.top);


        $('#top_select_border').val(v).change();
        $('#right_select_border').val(v).change();

        $('#bottom_select_border').val(v).change();
        $('#left_select_border').val(v).change();




    });

    //border_color
    $("#color_border").on('change', function () {
        var v = $("#color_border").val();
        state.frame.border_color.top = v;
        state.frame.border_color.left = v;
        state.frame.border_color.right = v;
        state.frame.border_color.bottom = v;

        $("canvas").css('border', state.frame.border_width.top + 'px ' + state.frame.border_style.top + ' ' + state.frame.border_color.top);

        indAreEqualString(v, "top_color_border");
        indAreEqualString(v, "right_color_border");
        indAreEqualString(v, "bottom_color_border");
        indAreEqualString(v, "left_color_border");
    });

    //ind border_top
    $("#top_border_w_range").on('change', function () {
        var v = $("#top_border_w_range").val();

        state.frame.border_width.top = v;

        $("canvas").css('border-top', state.frame.border_width.top + 'px ' + state.frame.border_style.top + ' ' + state.frame.border_color.top);
        indAreEqual(v, "top_border_w_range");
        changeIndParametr("#top_border_w_range", "top_border_w_rangeInput");
    });

    $("#top_select_border").change(function () {
        var v = "";
        $("#top_select_border option:selected").each(function () {
            v += $(this).text() + " ";
        })
        state.frame.border_style.top = v;
        $("canvas").css('border-top', state.frame.border_width.top + 'px ' + state.frame.border_style.top + ' ' + state.frame.border_color.top);
    });

    $("#top_color_border").on('change', function () {
        var v = $("#top_color_border").val();
        state.frame.border_color.top = v;

        $("canvas").css('border-top', state.frame.border_width.top + 'px ' + state.frame.border_style.top + ' ' + state.frame.border_color.top);

        indAreEqualString(v, "top_color_border");
    });

    //ind border_bottom
    $("#bottom_border_w_range").on('change', function () {
        var v = $("#bottom_border_w_range").val();

        state.frame.border_width.bottom = v;

        $("canvas").css('border-bottom', state.frame.border_width.bottom + 'px ' + state.frame.border_style.bottom + ' ' + state.frame.border_color.bottom);
        indAreEqual(v, "bottom_border_w_range");
        changeIndParametr("#bottom_border_w_range", "bottom_border_w_rangeInput");
    });

    $("#bottom_select_border").change(function () {
        var v = "";
        $("#bottom_select_border option:selected").each(function () {
            v += $(this).text() + " ";
        })
        state.frame.border_style.bottom = v;
        $("canvas").css('border-bottom', state.frame.border_width.bottom + 'px ' + state.frame.border_style.bottom + ' ' + state.frame.border_color.bottom);
    });

    $("#bottom_color_border").on('change', function () {
        var v = $("#bottom_color_border").val();
        state.frame.border_color.bottom = v;

        $("canvas").css('border-bottom', state.frame.border_width.bottom + 'px ' + state.frame.border_style.bottom + ' ' + state.frame.border_color.bottom);

        indAreEqualString(v, "bottom_color_border");
    });

    //ind border_left
    $("#left_border_w_range").on('change', function () {
        var v = $("#left_border_w_range").val();

        state.frame.border_width.left = v;

        $("canvas").css('border-left', state.frame.border_width.left + 'px ' + state.frame.border_style.left + ' ' + state.frame.border_color.left);
        indAreEqual(v, "left_border_w_range");
        changeIndParametr("#left_border_w_range", "left_border_w_rangeInput");
    });

    $("#left_select_border").change(function () {
        var v = "";
        $("#left_select_border option:selected").each(function () {
            v += $(this).text() + " ";
        })
        state.frame.border_style.left = v;
        $("canvas").css('border-left', state.frame.border_width.left + 'px ' + state.frame.border_style.left + ' ' + state.frame.border_color.left);
    });

    $("#left_color_border").on('change', function () {
        var v = $("#left_color_border").val();
        state.frame.border_color.left = v;

        $("canvas").css('border-left', state.frame.border_width.left + 'px ' + state.frame.border_style.left + ' ' + state.frame.border_color.left);

        indAreEqualString(v, "left_color_border");
    });

    //border_right
    $("#right_border_w_range").on('change', function () {
        var v = $("#right_border_w_range").val();

        state.frame.border_width.right = v;

        $("canvas").css('border-right', state.frame.border_width.right + 'px ' + state.frame.border_style.right + ' ' + state.frame.border_color.right);
        indAreEqual(v, "right_border_w_range");
        changeIndParametr("#right_border_w_range", "right_border_w_rangeInput");
    });

    $("#right_select_border").change(function () {
        var v = "";
        $("#right_select_border option:selected").each(function () {
            v += $(this).text() + " ";
        })
        state.frame.border_style.right = v;
        $("canvas").css('border-right', state.frame.border_width.right + 'px ' + state.frame.border_style.right + ' ' + state.frame.border_color.right);
    });

    $("#right_color_border").on('change', function () {
        var v = $("#right_color_border").val();
        state.frame.border_color.right = v;

        $("canvas").css('border-right', state.frame.border_width.right + 'px ' + state.frame.border_style.right + ' ' + state.frame.border_color.right);

        indAreEqualString(v, "right_color_border");
    });

    //ind_radius_change

    function changeIndParametr(range, rangeInput) {
        var v = $(range).val();
        var input = document.getElementById(rangeInput);
        input.value = v;
    }

    function indAreEqual(v, range) {

        var new_range = document.getElementById(range);
        var vv = parseInt(v, 10)
        new_range.value = vv;
        //changeIndParametr(range, rangeInput);
    }

    function indAreEqualString(v, range) {

        var new_range = document.getElementById(range);
        new_range.value = v;

    }

    //border_r_rangeInput
    $("#border_r_range").on('change', function () {
        var v = $("#border_r_range").val();
        var border_w_rangeInput = document.getElementById('border_r_rangeInput');
        border_r_rangeInput.value = v;

        state.frame.border_radius.top_left = v;
        state.frame.border_radius.bottom_left = v;
        state.frame.border_radius.top_right = v;
        state.frame.border_radius.bottom_right = v;

        $("canvas").css('border-radius', ' ' + state.frame.border_radius.top_left + 'px ');
        indAreEqual(v, "border_rtl_range");
        changeIndParametr("#border_rtl_range", "border_rtl_rangeInput");
        indAreEqual(v, "border_rtr_range");
        changeIndParametr("#border_rtr_range", "border_rtr_rangeInput");
        indAreEqual(v, "border_rbl_range");
        changeIndParametr("#border_rbl_range", "border_rbl_rangeInput");
        indAreEqual(v, "border_rbr_range");
        changeIndParametr("#border_rbr_range", "border_rbr_rangeInput");

    });

    function swapIndividual(checkboxIndividual, divIndividual) {

        if ($(checkboxIndividual).is(":checked")) {
            $(divIndividual).removeClass('hidden');
            $(divIndividual).addClass('open');
        }
        else {
            $(divIndividual).removeClass('open');
            $(divIndividual).addClass('hidden');
        }

    }

    //individual_border_checkbox
    $("#individual_border_checkbox").on("change", function (e) {
        swapIndividual("#individual_border_checkbox", "#individual_border_div");
    });

    //individual_radius_checkbox
    $("#individual_radius_checkbox").on("change", function (e) {
        swapIndividual("#individual_radius_checkbox", "#individual_radius_div");
    });


    //top left corner
    $("#border_rtl_range").on('change', function () {
        changeIndParametr("#border_rtl_range", "border_rtl_rangeInput")
        var v = $("#border_rtl_range").val();
        state.frame.border_radius.top_left = v;
        $("#myCanvas").css('border-radius', ' ' + state.frame.border_radius.top_left + 'px ' + state.frame.border_radius.top_right + 'px ' + state.frame.border_radius.bottom_right + 'px ' + state.frame.border_radius.bottom_left + 'px ');
    });

    //top right corner
    $("#border_rtr_range").on('change', function () {
        changeIndParametr("#border_rtr_range", "border_rtr_rangeInput")
        var v = $("#border_rtr_range").val();
        state.frame.border_radius.top_right = v;
        $("#myCanvas").css('border-radius', ' ' + state.frame.border_radius.top_left + 'px ' + state.frame.border_radius.top_right + 'px ' + state.frame.border_radius.bottom_right + 'px ' + state.frame.border_radius.bottom_left + 'px ');
    });

    //buttom right corner
    $("#border_rbr_range").on('change', function () {
        changeIndParametr("#border_rbr_range", "border_rbr_rangeInput")
        var v = $("#border_rbr_range").val();
        state.frame.border_radius.bottom_right = v;
        $("#myCanvas").css('border-radius', ' ' + state.frame.border_radius.top_left + 'px ' + state.frame.border_radius.top_right + 'px ' + state.frame.border_radius.bottom_right + 'px ' + state.frame.border_radius.bottom_left + 'px ');
    });

    //buttom left corner
    $("#border_rbl_range").on('change', function () {
        changeIndParametr("#border_rbl_range", "border_rbl_rangeInput")
        var v = $("#border_rbl_range").val();
        state.frame.border_radius.bottom_left = v;
        $("#myCanvas").css('border-radius', ' ' + state.frame.border_radius.top_left + 'px ' + state.frame.border_radius.top_right + 'px ' + state.frame.border_radius.bottom_right + 'px ' + state.frame.border_radius.bottom_left + 'px ');
    });


    //********************






});
    //image upload
    function handleFiles(files) {
        var reader = new FileReader();

        var file = files[0];
        if (file) {
            reader.readAsDataURL(file);
        } else {
            console.error("Error while reading file");
        }

        reader.onload = function () {
            img.src = reader.result;
        }
    }

    //qs("#filter-grayscale").on("click", function (e) {
    //    qsa(".filters-btn").attr("disabled", "true");
    //    myCanvasUtil.applyFilter("grayscale(100%)");
    //    qsa(".filters-btn").rmattr("disabled", "false");
    //});

    //slider for contrast
    //function CheckRangeContrast() {
    //    var range = document.getElementById('contrast_range');
    //    var contrast_rangeInput = document.getElementById('contrast_rangeInput');

    //    contrast_rangeInput.value = range.value;
    //}



