let charArray = [];
let wordArray = [];

function createWordsLettersArrays() {
  $(".char").each(function() {
    charArray.push(this);
  });
  $(".word").each(function() {
    wordArray.push(this);
  });
}

for (let container of document.querySelectorAll(".home-intro-link__desktop")) {
  container.addEventListener("mousemove", function (e) {
    container.classList.add("mouseover");
  });
  container.addEventListener("mouseout", function (e) {
    container.classList.remove("mouseover");
  });
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function map(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function findAncestor(el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
}

document.addEventListener("mousemove", function (e) {
  for (let i = 0; i < charArray.length; i++) {
    let char = charArray[i];
    let bounds = char.getBoundingClientRect();
    let dist = distance(
      e.clientX,
      e.clientY,
      bounds.left + bounds.width / 2,
      bounds.top + bounds.height / 2
    );
    let ancestor = findAncestor(char, "home-intro-link__desktop");
    
    // medium line

    if (dist <= 75) {
      char.classList.remove('medium-bn-75-150', 'medium-bn-150-225', 'medium-bn-225-300', 'medium-more-300');
      char.classList.add('medium-less-75');
    } else if (dist > 75 && dist <= 150) {
      char.classList.remove('medium-less-75', 'medium-bn-150-225', 'medium-bn-225-300', 'medium-more-300');
      char.classList.add('medium-bn-75-150');
    } else if (dist > 150 && dist <= 225) {
      char.classList.remove('medium-less-75', 'medium-bn-75-150', 'medium-bn-225-300', 'medium-more-300');
      char.classList.add('medium-bn-150-225');
    } else if (dist > 225 && dist <= 300) {
      char.classList.remove('medium-less-75', 'medium-bn-75-150', 'medium-bn-150-225', 'medium-more-300');
      char.classList.add('medium-bn-225-300');
    } else if (dist > 300) {
      char.classList.remove('medium-less-75', 'medium-bn-75-150', 'medium-bn-150-225', 'medium-bn-225-300');
      char.classList.add('medium-more-300');
    }

  }
});

function allowLinkHoverEffect() {
  $('.reveal-line').addClass('loaded');
}

function init() {
  $(".home-intro-link__desktop").lettering('words').children('span').addClass('word').lettering();
  $(".home-intro-link__desktop .word span").addClass('char');

  createWordsLettersArrays();

  let tl = new TimelineMax({ onComplete: allowLinkHoverEffect });
  tl.staggerFromTo(".reveal-text", 0.25,
    {
      y: "100%",
      autoAlpha: 0,
    }, {
      y: 0,
      autoAlpha: 1,
      ease: "power4.easeOut"
    }, 0.05
  );
}

let timeout;
let delay = 250;

window.addEventListener('resize', function() {
  $('.reveal-line').removeClass('loaded');
  gsap.set(".reveal-text", {autoAlpha: 0});
  clearTimeout(timeout);
  timeout = setTimeout(init, delay);
});

window.addEventListener("load", init);