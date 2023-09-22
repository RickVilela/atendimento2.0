(function ($) {
  'use strict';

  // Sticky Menu
  $(window).scroll(function () {
    if ($('.navigation').offset().top > 100) {
      $('.navigation').addClass('nav-bg');
    } else {
      $('.navigation').removeClass('nav-bg');
    }
  });

  // team slider
  $('.team-slider').slick({
    dots: false,
    infinite: false,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-arrow-left\'></i></button>',
    nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-arrow-right\'></i></button>',
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // clients logo slider
  $('.client-logo-slider').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // about video popup
  $(document).ready(function () {
    $('.venobox').venobox();
  });

  // animation scroll js
  var html_body = $('html, body');
  $('.page-scroll').on('click', function () { //use page-scroll class in any HTML tag for scrolling
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        html_body.animate({
          scrollTop: target.offset().top - 50
        }, 1500, 'easeInOutExpo');
        return false;
      }
    }
  });

  // easeInOutExpo Declaration
  jQuery.extend(jQuery.easing, {
    easeInOutExpo: function (x, t, b, c, d) {
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1));
      } + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  });

})(jQuery);

//Getting all required elements
const inputField = document.querySelector(".input-field textarea"),
  todoLists = document.querySelector(".todoLists"),
  pendingNum = document.querySelector(".pending-num"),
  clearButton = document.querySelector(".clear-button");

//we will call this function while adding, deleting and checking-unchecking the task
function allTasks() {
  let tasks = document.querySelectorAll(".pending");

  //if tasks' length is 0 then pending num text content will be no, if not then pending num value will be task's length
  // pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;

  if (tasks.length > 1 ){
    pendingNum.innerHTML = tasks.length + " tarefas pendentes"
  }else if(tasks.length == 0 ){
    pendingNum.innerHTML = "Nenhuma tarefa pendente"
  }
  else{
    pendingNum.innerHTML = tasks.length + " tarefa pendente"
  }

  let allLists = document.querySelectorAll(".list");
  if (allLists.length > 0) {
    todoLists.style.marginTop = "20px";
    clearButton.style.pointerEvents = "auto";
    return;
  }
  todoLists.style.marginTop = "0px";
  clearButton.style.pointerEvents = "none";
}

//add task while we put value in text area and press enter
inputField.addEventListener("keyup", (e) => {
  let inputVal = inputField.value.trim(); //trim fuction removes space of front and back of the inputed value

  //if enter button is clicked and inputed value length is greated than 0.
  if (e.key === "Enter" && inputVal.length > 0) {
    let liTag = ` <li class="list pending" onclick="handleStatus(this)">
          <input type="checkbox" />
          <span class="task">${inputVal}</span>
          <i class="uil uil-trash" onclick="deleteTask(this)"></i>
        </li>`;

    todoLists.insertAdjacentHTML("beforeend", liTag); //inserting li tag inside the todolist div
    inputField.value = ""; //removing value from input field
    allTasks();
    progressbar();
  }
});

function progressbar(){
  // get box count
  var count = 0;
  var checked = 0;
  function countBoxes() { 
    count = $("input[type='checkbox']").length;
    console.log(count);
  }
  
  countBoxes();
  $(":checkbox").click(countBoxes);
  
  // count checks
  
  function countChecked() {

    checked = $("input:checked").length;

      var percentage = parseInt(((checked / count) * 100),10);
      $(".progressbar-bar").progressbar({
              value: percentage
          });
      $(".progressbar-label").text(percentage + "%");
  }
  
  countChecked();
  $(":checkbox").click(countChecked);
}

//checking and unchecking the chekbox while we click on the task
function handleStatus(e) {
  const checkbox = e.querySelector("input"); //getting checkbox
  checkbox.checked = checkbox.checked ? false : true;
  e.classList.toggle("pending");
  allTasks();
  progressbar()
}

//deleting task while we click on the delete icon.
function deleteTask(e) {
  e.parentElement.remove(); //getting parent element and remove it
  allTasks();
  var checked = checked - 1;
}

//deleting all the tasks while we click on the clear button.
clearButton.addEventListener("click", () => {
  todoLists.innerHTML = "";
  allTasks();

  $(".progressbar-bar").progressbar({
    value: 0
});
$(".progressbar-label").text(0 + "%");
  
});