// jQuery: Inicializa popups
$(document).ready(function () {
    var
      $popup        = $('[data-content]')
    ;

    $.fn.dropdown.settings.onShow = function() {
      $('body').popup('hide all');
    };

    $popup
      .popup({
        duration : 0,
        delay    : {
          show : 10,
          hide : 0
        },
        variation : 'inverted',
        position  : 'bottom center'
      })
    ;
  $(".popup-trigger").popup();
});

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".ui.tabular.menu .item");
  const tables = document.querySelectorAll("table");
  const input = document.getElementById("filtroInput");

  let activeTableId = "table1";

  function showActiveTable(targetId) {
    activeTableId = targetId;
    tables.forEach((table) => {
      table.style.display = table.id === targetId ? "table" : "none";
    });
  }

  function addMenuListeners() {
    menuItems.forEach((item) => {
      const targetId = item.getAttribute("data-target");

      item.addEventListener("click", () => {
        menuItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        showActiveTable(targetId);
      });
    });
  }

  function addFilterListener() {
    if (!input) return;

    input.addEventListener("keyup", function () {
      const filtro = input.value.toLowerCase();
      const tbody = document
        .getElementById(activeTableId)
        ?.getElementsByTagName("tbody")[0];
      if (!tbody) return;

      const filas = tbody.getElementsByTagName("tr");

      for (let fila of filas) {
        const celdas = fila.getElementsByTagName("td");
        let coincide = false;

        for (let celda of celdas) {
          if (celda.textContent.toLowerCase().includes(filtro)) {
            coincide = true;
            break;
          }
        }

        fila.style.display = coincide ? "" : "none";
      }
    });
  }

  // Inicialización
  showActiveTable(activeTableId);
  addMenuListeners();
  addFilterListener();
});
