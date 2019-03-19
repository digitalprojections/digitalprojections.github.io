/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var language_id = 1;
var languages = [];
var language = "uzbek";
var selected_surah = 1;
var selected_title;

var lang = {
    english: {
        home_title: "Surah List",
        settings: "Settings",
        about: "About",
        main_page: "Select a Surah",
        settings_page: "Settings",
        menu_language: "Menu Language",
        text_settings: "Text Settings",
        comments: "Comments",
        about_page: "From the Author",
        surah_title: "Surah: ",
        loading: "Loading...",
        toast_disabled: "Option disabled",
        greeting: "Assalaamu alaykum",
        gr_text: "Dear brothers and sisters, I have tried to make the application easy to use as much as I could and I am continually working on improving it. <br>My goal is to bring high quality products to spread the truth. <br> Your support in any form is highly appreciated and will surely be rewarded accordingly by Allah Almighty. <br> Please, share and purchase to support the cause."

    },
    uzbek: {
        home_title: "Suralar",
        settings: "Sozlamalar",
        about: "Muallifdan",
        main_page: "Surani Tanlang",
        settings_page: "Dastur Sozlamalari",
        menu_language: "Menyu Tili",
        text_settings: "Matn Sozlamalari",
        comments: "Izohlar",
        about_page: "Muallifdan",
        surah_title: "Sura: ",
        loading: "Yuklash...",
        toast_disabled: "Vaqtinchalik o`chirilgan",
        greeting: "Assalomu alaykum",
        gr_text: "Qadrli muxlislar, men bu dasturni sizga foydalanish qulay bo`lishi uchun baholi qudrat harakat qildim va bunda davom etmoqdaman. Maqsadimiz yuqori sifatli dasturlar taklif qilish va haqiqatni shu yo`l bilan yetkazish. <br> Sababimizni qo`lingizdan kelganicha qo`llab quvvatlang va tanishlaringizga ham ulashing. <br> Olloh Taolo sizdan va bizdan har bir xayrli amalimizni qabul qilsin."

    },
    russian: {
        home_title: "Суры",
        settings: "Установки",
        about: "О программе",
        main_page: "Выберите Суру",
        settings_page: "Установки",
        menu_language: "Язык меню",
        text_settings: "Текстовые установки",
        comments: "Комментарии",
        about_page: "От Автора",
        surah_title: "Сура: ",
        loading: "Загрузка...",
        toast_disabled: "Опция отключена",
        greeting: "Ассаляму аляйкум",
        gr_text: "Дорогие братья и сестры, я постарался чтобы эта программа стала наиболее удобна в пользовании и все еще продолжаю работу. <br>Моя цель расспространить верный путь посредством своей работы. <br>Аллах Субханаху ва Таала вознаградит каждого за вклад обязательно. Присоединитесь же своим.<br>Пожалуйста поделитесь с друзьями и приобретайте, чтобы я мог дальше, лучше и больше писать."

    }
};

ons.ready(function () {
    console.log("Onsen UI is ready!");


    if (Boolean(localStorage.language))
    {
        language = localStorage.menu_language;
    } else {

        localStorage.menu_language = language;
    }

    //get_surah_names();


});

window.fn = {};
window.fn.open = function () {
    var menu = document.getElementById('menu');
    menu.open();
};
window.fn.load = function (page) {
    var content = document.getElementById('content');
    var menu = document.getElementById('menu');
    content
            .load(page)
            .then(menu.close.bind(menu));
};

document.addEventListener('show', function (event) {
    var page = event.target;
    console.log(page.id); // can detect which page
    //
    //resetDate();
    addListeners();
    switch (page.id)
    {
        case "titles":
            console.log("surah title list");
            get_surah_names();
            break;
        case "surah_text":
            console.log("surah text");
            select_surah();
            break;
        case "settings":
            set_settings();
            break;
        case "about":
            set_about_page();
            break;
    }
});

function set_about_page() {

    document.querySelector("#muallifdantitle").innerHTML = lang[language].about_page;
    document.querySelector("#greetingtitle").innerHTML = lang[language].greeting;
    document.querySelector("#greetingtext").innerHTML = lang[language].gr_text;

}

function set_settings()
{
    document.querySelector("#appsettingstitle").innerHTML = lang[language].settings_page;
    document.querySelector("#menulangtitle").innerHTML = lang[language].menu_language;
    document.querySelector("#textsettitle").innerHTML = lang[language].text_settings;
    document.querySelector("#izohlartitle").innerHTML = lang[language].comments;

    document.querySelector("ons-list-item[lang-id='" + language + "']").querySelector("ons-radio").checked = true;

    if (localStorage.izohlar === "true")
    {
        $("#izoh").prop("checked", true);
        //$(".qavs_ichi").hide();
    }

    try {
        languages = JSON.parse(localStorage.language);
    } catch (e)
    {
        localStorage.language = JSON.stringify([120]);
        languages = JSON.parse(localStorage.language);
    }

    menuitems = $(".lang");
    for (i = 0; i < languages.length; i++)
    {
        for (k = 0; k < menuitems.length; k++)
        {
            if (menuitems[k].getAttribute("db_id") == languages[i])
            {
                menuitems[k].checked = true;
            }
        }
    }
}

function get_surah_names()
{
    var data = {
        action: "names_as_objects",
        language_id: language_id
    };
    ajax(data);


}



function select_surah(event) {

    sn = selected_surah;

    if (localStorage.language)
    {
        db = JSON.parse(localStorage.language);
    } else {
        db = [1];
    }

    if (localStorage.izohlar != "true")
    {
        var data = {
            action: "izohsiz_text",
            surah_id: sn,
            database_id: db
        };
    } else {
        var data = {
            action: "surah_text",
            surah_id: sn,
            database_id: db
        };
    }

    ajax(data);
    $("#sura_title").text(sn + ", " + selected_title);
}

function izohlar(event)
{
    localStorage.izohlar = event.target.checked;
}

function ajax(d)
{
    $.ajax({
        url: "https://ajpage.janjapanweb.com/ajax_quran.php",
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        data: d,
        beforeSend: function (xhr) {
            document.querySelector("#loadingtitle").innerHTML = lang[language].loading;
            document.querySelector('#loading_circle').show();
        },
        success: function (data) {
            document.querySelector('#loading_circle').hide();
            if (data.indexOf("{") > 0)
            {
                var data = JSON.parse(data);
                display_surah_names(data);


            } else if (data.indexOf("<") == 0)
            {
                document.querySelector("#ayah_list").innerHTML = data;

                $("ons-list-item").off().on("click", function () {
                    $(event.currentTarget).find(".qavs_ichi").toggle();
                    $(event.currentTarget).find(".zmdi-comment").toggle();
                });

                setTimeout(function () {
                    $(".qavs_ichi").fadeIn(500).delay(2000).fadeOut(500, function () {
                        now_color();
                    });

                    function now_color() {
                        //$(".qavs_ichi").parent().parent().parent().parent().parent().css("background-color", "rgba(134, 255, 0, 0.35)");
                    }
                }, 2000);
            }

        }
    });
}

function addListeners()
{
    try {
        document.querySelector("#surahlisttitle").innerHTML = lang[language].home_title;
        document.querySelector("#settingstitle").innerHTML = lang[language].settings;
        document.querySelector("#abouttitle").innerHTML = lang[language].about;
    } catch (e)
    {
        language = "english";
        document.querySelector("#surahlisttitle").innerHTML = lang[language].home_title;
        document.querySelector("#settingstitle").innerHTML = lang[language].settings;
        document.querySelector("#abouttitle").innerHTML = lang[language].about;
    }

    document.addEventListener("deviceready", function () {
        window.FirebasePlugin.getToken(function (token) {
            // save this server-side and use it to push notifications to this device
            console.log("Device ready token", token);
        }, function (error) {
            console.error(error);
        });

        // Get notified when a token is refreshed
        window.FirebasePlugin.onTokenRefresh(function (token) {
            // save this server-side and use it to push notifications to this device
            console.log("Refresh to get new token: " + token);
        }, function (error) {
            alert(error);
        });

        // Get notified when the user opens a notification
        window.FirebasePlugin.onNotificationOpen(function (notification) {
            console.log(JSON.stringify(notification));
            ons.notification.alert(notification.body);
        }, function (error) {
            console.error(error);
        });
    }, false);

}

function set_langauge()
{
    if (event.currentTarget.querySelector("ons-radio").disabled)
    {
        ons.notification.toast(lang[language].toast_disabled, {timeout: 500, animation: "fall"});
    } else {
        language = event.currentTarget.getAttribute("lang-id");
        localStorage.menu_language = language;
    }
}

function display_surah_names(data)
{
    document.querySelector("#selectsurahtitle").innerHTML = lang[language].home_title;
    for (i in data)
    {
        data[i] = JSON.parse(data[i]);
        //console.log(data[i]["languageNo"]);
        if (data[i]["languageNo"] == 1)
        {
            var oli = document.createElement("ons-list-item");
            oli.setAttribute("tappable", "true");
            oli.setAttribute("title", data[i].title);
            oli.setAttribute("surahNo", data[i].chapterId);
            oli.setAttribute("onmouseup", "show_surah(event)");
            oli.innerHTML = `<div class="left"><ons-row><ons-col> ${data[i].chapterId} </ons-col></ons-row></div><div class="center arabic"><ons-row><ons-col>${data[i].title }</ons-col></ons-row></div>`;
        } else {
            oli.innerHTML += "<ons-row><ons-col>" + data[i].title + "</ons-col></ons-row>";
            document.getElementById("main_table").appendChild(oli);
        }
    }
}

function show_surah()
{
    selected_surah = event.currentTarget.getAttribute("surahno");
    selected_title = event.currentTarget.getAttribute("title");
    console.log(selected_surah, "selected_surah");
    fn.load("surah.html");
}


function set_languages(event)
{
    var ar = [];
    $(".lang").each(function () {
        if (this.checked)
        {
            console.log(event.target);
            ar.push(this.getAttribute("db_id"));
        }
        localStorage.language = JSON.stringify(ar);
    });
}