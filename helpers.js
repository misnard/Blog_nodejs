var formatDate = function(date_c) {
    var options = {year: "numeric", month: "numeric", day: "numeric"};
    var date_v  = date_c.toLocaleDateString("fr-FR", options);
    var arrayOfDate = date_v.split("-");
    var year = arrayOfDate[0];
    var month = formatMonth(arrayOfDate[1]);
    var day = arrayOfDate[2];
    return day + " " + month + ", " + year;
};

var formatMonth = function(month) {
    if(month == 01) {
        return "Janvier";
    }
    else if(month == 02) {
        return "Fevrier";
    }
    else if(month == 03) {
        return "Mars";
    }
    else if(month == 04) {
        return "Avril";
    }
    else if(month == 05) {
        return "Mai";
    }
    else if(month == 06) {
        return "Juin";
    }
    else if(month == 07) {
        return "Juillet";
    }
    else if(month == 08) {
        return "Août";
    }
    else if(month == 09) {
        return "Septembre";
    }
    else if(month == 10) {
        return "Octobre";
    }
    else if(month == 11) {
        return "Novembre";
    }
    else if(month == 12) {
        return "Décembre";
    }
    else {
        return "Erreur";
    }
};


var max_page = function(page_n) {
  var rest = page_n % 5;
  var page = page_n / 5;
  return rest + Math.floor(page);
};

var pagination = function(current, max) {
    var pagi;

    if(current != 1){
        pagi = "<li><a href='/" + (+current - +1) + "' class='btn'>Précedent</a></li>";
    }
    else {
        pagi = " ";
    }
    for(i = 1; i <= max_page(max); i++)
    {
        if(i == current) {
            pagi = pagi + "<li><strong class='current-page'>" + i + "</strong></li>";
        }
        else {
            pagi = pagi + "<li><a href='/" + i + "'>" + i + "</a></li>";
        }
    }
    if(current != max_page(max)) {
        pagi = pagi + "<li><a href='/" + (+current + +1) + "' class='btn'>Suivant</a></li>";
    }
    return pagi;
};

var sort_tags = function(article) {
    var id;
    var tags;
    var title;

    article.forEach(function(data) {
        id = data.id;
        tags = data.tags;
        title = data.title;
    });

    for(i = 0; i != id.length; i++) {

    }
};

exports.max_page = max_page;
exports.pagination = pagination;
exports.formatDate = formatDate;