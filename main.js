gItems = [];
gCurrentItem = null;

$('.lesson-button').click(async function(e) {
    e.preventDefault();
    lesson = e.target.dataset.lesson;
    $('#menu').hide();
    $('#loader').show();
    gItems = await LoadContent(lesson);
    gItems = shuffle(gItems)

    $('#loader').hide();
    $('#quiz').show();

    NextCard();

    return false;
});

$('#btnNext').click(async function(e) {
    $('#card').removeClass("scale-in").addClass("scale-out")
    await new Promise(resolve => setTimeout(resolve, 300));
    $("#titleHidden").trigger("click");
    NextCard();
    $('#card').removeClass("scale-out").addClass("scale-in");
})

function NextCard() {
    if (gItems.length > 0) {
        gCurrentItem = gItems.pop()
        try {
            $('#title').html(gCurrentItem[1]);
            $('#titleHidden').html(gCurrentItem[1]);
            $('#solution').html(markdown.toHTML(gCurrentItem[2]));
        } catch (error) {
            $('#solution').html("NO DATA YET");
        }
    }
}

async function LoadContent(lesson) {
    const response = await fetch(`http://localhost:8000/data/${lesson}.md`);
    const txt = await response.text();
    var tree = markdown.parse(txt);
    return tree[2].slice(1);
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}