(function () {
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));

  function youtubeSearchUrl(query) {
    return "https://www.youtube.com/results?search_query=" + encodeURIComponent(query);
  }

  function el(tag, opts, children) {
    const node = document.createElement(tag);
    if (opts) {
      Object.entries(opts).forEach(([k, v]) => {
        if (k === "class") node.className = v;
        else if (k === "html") node.innerHTML = v;
        else if (k === "text") node.textContent = v;
        else node.setAttribute(k, v);
      });
    }
    (children || []).forEach((c) => c && node.appendChild(c));
    return node;
  }

  // ---------- Tabs (top-level) ----------
  function initTabs() {
    $$(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".tab-btn").forEach((b) => b.classList.remove("active"));
        $$(".panel").forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        $("#" + btn.dataset.target).classList.add("active");
      });
    });
  }

  // ---------- Overview ----------
  function renderOverview() {
    $("#week-title").textContent = "Week " + PROGRAM.week + " — Train/Log";
    $("#week-sub").textContent =
      "Training & Nutrition — recomposition program · starts " + PROGRAM.startDate;
    $("#week-goal").textContent =
      "Goal: " + PROGRAM.goal + " Every exercise this week uses " + PROGRAM.defaultProtocol + ".";

    const grid = $("#schedule-grid");
    PROGRAM.schedule.forEach((d) => {
      grid.appendChild(
        el("div", { class: "day-card " + d.type }, [
          el("div", { class: "dow", text: d.day }),
          el("div", { class: "label", text: d.label }),
          el("div", { class: "workout", text: d.workout }),
        ])
      );
    });

    const targetsTable = $("#targets-table");
    targetsTable.appendChild(
      el("thead", {}, [
        el("tr", {}, [
          el("th", { text: "Day Type" }),
          el("th", { text: "Applies To" }),
          el("th", { text: "Target Kcal" }),
          el("th", { text: "Target Protein" }),
        ]),
      ])
    );
    const tbody = el("tbody");
    PROGRAM.nutritionTargets.forEach((t) => {
      tbody.appendChild(
        el("tr", {}, [
          el("td", { text: t.type }),
          el("td", { text: t.appliesTo }),
          el("td", { text: t.kcal }),
          el("td", { text: t.protein }),
        ])
      );
    });
    targetsTable.appendChild(tbody);

    const rhythmTable = $("#rhythm-table");
    rhythmTable.appendChild(
      el("thead", {}, [el("tr", {}, [el("th", { text: "When" }), el("th", { text: "What" })])])
    );
    const rbody = el("tbody");
    PROGRAM.dailyRhythm.forEach((r) => {
      rbody.appendChild(
        el("tr", {}, [el("td", { text: r.when }), el("td", { text: r.what })])
      );
    });
    rhythmTable.appendChild(rbody);

    const baselineGrid = $("#baseline-grid");
    const b = PROGRAM.baseline;
    [
      [b.weightKg + " kg", "Weight"],
      [b.heightCm + " cm", "Height"],
      [b.age, "Age"],
      [b.bmi, "BMI"],
    ].forEach(([val, key]) => {
      baselineGrid.appendChild(
        el("div", { class: "baseline-item" }, [
          el("div", { class: "val", text: String(val) }),
          el("div", { class: "key", text: key }),
        ])
      );
    });
  }

  // ---------- Workouts ----------
  function buildExercise(ex) {
    const wrap = el("div", { class: "exercise" });
    const thumbTitle = ex.thumb
      ? "Targets: " + ex.thumb.muscles.join(", ") + (MOTION_LABELS[ex.thumb.motion] ? " · " + MOTION_LABELS[ex.thumb.motion] : "")
      : "";
    const row = el("button", { class: "exercise-row", type: "button" }, [
      el("span", { class: "thumb", html: muscleMapSvg(ex.thumb), title: thumbTitle }),
      el("span", { class: "info" }, [
        el("span", { class: "name", text: ex.name }),
        el("span", { class: "setsreps", text: ex.setsReps }),
      ]),
      el("span", { class: "chevron", html: "&#9656;" }),
    ]);

    const videoId = PROGRAM.videoOverrides && PROGRAM.videoOverrides[ex.name];
    const panelInner = el("div", { class: "exercise-panel-inner" });

    if (videoId) {
      panelInner.appendChild(
        el("div", { class: "video-embed" }, [
          el("iframe", {
            src: "https://www.youtube.com/embed/" + videoId,
            title: ex.name + " tutorial",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowfullscreen: "true",
            loading: "lazy",
          }),
        ])
      );
    }

    const query = ex.name + " exercise form tutorial";
    panelInner.appendChild(
      el("div", { class: "tutorial-links" }, [
        el(
          "a",
          { href: youtubeSearchUrl(query), target: "_blank", rel: "noopener" },
          [document.createTextNode("▶ " + (videoId ? "More on YouTube" : "Watch tutorial on YouTube") + " ↗")]
        ),
      ])
    );

    const panel = el("div", { class: "exercise-panel" }, [panelInner]);

    row.addEventListener("click", () => {
      wrap.classList.toggle("open");
    });

    wrap.appendChild(row);
    wrap.appendChild(panel);
    return wrap;
  }

  function renderWorkouts() {
    const container = $("#workout-days");
    PROGRAM.workouts.forEach((day) => {
      const block = el("div", { class: "day-block" });
      block.appendChild(
        el("div", { class: "day-block-header" }, [
          el("div", { class: "tag", text: day.day }),
          el("h3", { text: day.name }),
          el("div", { class: "muscles", text: day.muscles }),
          el("div", { class: "protocol", text: day.protocol }),
        ])
      );
      day.exercises.forEach((ex) => block.appendChild(buildExercise(ex)));
      container.appendChild(block);
    });
  }

  // ---------- Nutrition ----------
  function renderNutrition() {
    const tabsEl = $("#nutrition-tabs");
    const daysEl = $("#nutrition-days");

    PROGRAM.nutritionDays.forEach((nd, i) => {
      const tabBtn = el("button", {
        class: "nutrition-tab-btn" + (i === 0 ? " active" : ""),
        type: "button",
        text: nd.label,
      });
      tabBtn.addEventListener("click", () => {
        $$(".nutrition-tab-btn").forEach((b) => b.classList.remove("active"));
        $$(".nutrition-day").forEach((d) => d.classList.remove("active"));
        tabBtn.classList.add("active");
        $("#nutrition-" + nd.id).classList.add("active");
      });
      tabsEl.appendChild(tabBtn);

      const dayEl = el("div", {
        class: "nutrition-day" + (i === 0 ? " active" : ""),
        id: "nutrition-" + nd.id,
      });
      dayEl.appendChild(
        el("div", { class: "nutrition-summary" }, [
          el("div", { class: "stat" }, [el("b", { text: nd.kcal }), document.createTextNode(nd.appliesTo)]),
          el("div", { class: "stat" }, [el("b", { text: nd.protein }), document.createTextNode("protein target")]),
        ])
      );
      nd.meals.forEach((meal) => {
        const card = el("div", { class: "meal-card" }, [el("h4", { text: meal.name })]);
        const ul = el("ul");
        meal.items.forEach((item) => ul.appendChild(el("li", { text: item })));
        card.appendChild(ul);
        if (meal.supplements) {
          card.appendChild(el("div", { class: "supp", text: "Supplements — " + meal.supplements }));
        }
        dayEl.appendChild(card);
      });
      if (nd.notes) {
        dayEl.appendChild(el("div", { class: "day-notes", text: nd.notes }));
      }
      daysEl.appendChild(dayEl);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    renderOverview();
    renderWorkouts();
    renderNutrition();
  });
})();
