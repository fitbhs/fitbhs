(function () {
  const IMAGE_BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";
  function exerciseImage(exerciseId, frame) {
    return IMAGE_BASE + exerciseId + "/" + frame + ".jpg";
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

  function muscleBadge(badge) {
    if (!badge) return null;
    return el("span", { class: "muscle-badge", html: muscleBadgeSvg(badge) });
  }

  function section(title, children) {
    return el("section", { class: "print-section" }, [el("h2", { text: title }), ...children]);
  }

  function renderCover(root) {
    root.appendChild(
      el("header", { class: "print-cover" }, [
        el("div", { class: "brand", text: "fitbhs" }),
        el("h1", { text: "Week " + PROGRAM.week + " — Train/Log" }),
        el("p", { class: "subtitle", text: "Training & Nutrition — recomposition program · starts " + PROGRAM.startDate }),
        el("p", { class: "goal", text: "Goal: " + PROGRAM.goal + " Every exercise this week uses " + PROGRAM.defaultProtocol + "." }),
      ])
    );
  }

  function renderOverview(root) {
    const scheduleGrid = el("div", { class: "schedule-grid" });
    PROGRAM.schedule.forEach((d) => {
      scheduleGrid.appendChild(
        el("div", { class: "day-card " + d.type }, [
          el("div", { class: "dow", text: d.day }),
          el("div", { class: "label", text: d.label }),
          el("div", { class: "workout", text: d.workout }),
        ])
      );
    });

    const targetsTable = el("table", { class: "targets-table" }, [
      el("thead", {}, [
        el("tr", {}, [
          el("th", { text: "Day Type" }),
          el("th", { text: "Applies To" }),
          el("th", { text: "Target Kcal" }),
          el("th", { text: "Target Protein" }),
        ]),
      ]),
    ]);
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

    const rhythmTable = el("table", { class: "rhythm-table" }, [
      el("thead", {}, [el("tr", {}, [el("th", { text: "When" }), el("th", { text: "What" })])]),
    ]);
    const rbody = el("tbody");
    PROGRAM.dailyRhythm.forEach((r) => {
      rbody.appendChild(el("tr", {}, [el("td", { text: r.when }), el("td", { text: r.what })]));
    });
    rhythmTable.appendChild(rbody);

    const b = PROGRAM.baseline;
    const baselineGrid = el("div", { class: "baseline-grid" });
    [
      [b.weightKg + " kg", "Weight"],
      [b.heightCm + " cm", "Height"],
      [b.age, "Age"],
      [b.bmi, "BMI"],
    ].forEach(([val, key]) => {
      baselineGrid.appendChild(
        el("div", { class: "baseline-item" }, [el("div", { class: "val", text: String(val) }), el("div", { class: "key", text: key })])
      );
    });

    root.appendChild(
      section("This Week at a Glance", [scheduleGrid])
    );
    root.appendChild(section("Daily Targets", [el("div", { class: "table-wrap" }, [targetsTable])]));
    root.appendChild(section("Daily Rhythm — Water & Supplements", [el("div", { class: "table-wrap" }, [rhythmTable])]));
    root.appendChild(section("Baseline", [baselineGrid]));
  }

  function buildExercisePrint(ex) {
    const card = el("div", { class: "p-exercise" });
    if (ex.thumb) {
      const photoClass = ex.thumb.badgePosition === "left" ? "p-photo badge-left" : "p-photo";
      card.appendChild(
        el("div", { class: "p-photos" }, [
          el("div", { class: photoClass }, [
            el("img", { src: exerciseImage(ex.thumb.exerciseId, 0), alt: ex.name + " start" }),
            muscleBadge(ex.thumb.badge),
            el("span", { class: "p-label", text: "Start" }),
          ]),
          el("div", { class: photoClass }, [
            el("img", { src: exerciseImage(ex.thumb.exerciseId, 1), alt: ex.name + " finish" }),
            muscleBadge(ex.thumb.badge),
            el("span", { class: "p-label", text: "Finish" }),
          ]),
        ])
      );
    }
    const body = el("div", { class: "p-body" }, [
      el("h3", { text: ex.name }),
      el("div", { class: "p-meta" }, [
        el("span", { class: "p-setsreps", text: ex.setsReps }),
        ex.thumb ? el("span", { class: "p-targets", text: ex.thumb.targets }) : null,
      ]),
      ex.guideline ? el("p", { class: "p-guideline", text: ex.guideline }) : null,
      el("a", {
        class: "p-link",
        href: "https://www.youtube.com/results?search_query=" + encodeURIComponent(ex.name + " exercise form tutorial"),
      }, [document.createTextNode("Watch tutorial on YouTube ↗")]),
    ]);
    card.appendChild(body);
    return card;
  }

  function renderWorkouts(root) {
    const sec = el("section", { class: "print-section", id: "p-workouts" });
    PROGRAM.workouts.forEach((day, i) => {
      const dayGroup = el("div", { class: "p-day" }, [
        i === 0 ? el("h2", { text: "Workouts" }) : null,
        el("div", { class: "p-day-header" }, [
          el("span", { class: "p-day-tag", text: day.day }),
          el("h3", { text: day.name }),
          el("span", { class: "p-day-muscles", text: day.muscles }),
          el("span", { class: "p-day-protocol", text: day.protocol }),
        ]),
      ]);
      day.exercises.forEach((ex) => dayGroup.appendChild(buildExercisePrint(ex)));
      sec.appendChild(dayGroup);
    });
    root.appendChild(sec);
  }

  function renderNutrition(root) {
    const sec = el("section", { class: "print-section", id: "p-nutrition" });
    PROGRAM.nutritionDays.forEach((nd, i) => {
      sec.appendChild(
        el("div", { class: "p-nutrition-day" }, [
          i === 0 ? el("h2", { text: "Nutrition" }) : null,
          el("div", { class: "p-nutrition-head" }, [
            el("h3", { text: nd.label }),
            el("span", { text: nd.appliesTo }),
            el("b", { text: nd.kcal + " · " + nd.protein }),
          ]),
          ...nd.meals.map((meal) => {
            const ul = el("ul");
            meal.items.forEach((item) => ul.appendChild(el("li", { text: item })));
            return el("div", { class: "p-meal" }, [
              el("h4", { text: meal.name }),
              ul,
              meal.supplements ? el("div", { class: "p-supp", text: "Supplements — " + meal.supplements }) : null,
            ]);
          }),
          nd.notes ? el("div", { class: "p-notes", text: nd.notes }) : null,
        ])
      );
    });
    root.appendChild(sec);
  }

  function renderFooter(root) {
    root.appendChild(
      el("footer", { class: "print-footer" }, [
        el("div", {
          text: "Structure adapted from an 8-week program, recalibrated to your stats. Exercise photos from the public-domain Free Exercise DB (github.com/yuhonas/free-exercise-db).",
        }),
      ])
    );
  }

  const root = document.getElementById("print-root");
  renderCover(root);
  renderOverview(root);
  renderWorkouts(root);
  renderNutrition(root);
  renderFooter(root);
})();
