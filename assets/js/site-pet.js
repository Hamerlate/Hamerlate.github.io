/* Remielle's original 1536 × 2288 sheet: 8 columns, 11 rows, 192 × 208 per frame. */
(() => {
  "use strict";

  const root = document.getElementById("site-pet");
  if (!root) return;

  const sprite = root.querySelector(".site-pet__sprite");
  const toggle = root.querySelector(".site-pet__toggle");
  const controls = root.querySelector(".site-pet__controls");
  const hearts = root.querySelector(".site-pet__hearts");
  const restore = document.getElementById("site-pet-restore");
  const pauseButton = root.querySelector('[data-pet-action="pause"]');
  const wanderButton = root.querySelector('[data-pet-action="wander"]');
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const storageKey = "remielle-site-pet:v1";
  const animations = {
    idle: { row: 0, frames: 7, speed: 180 },
    right: { row: 1, frames: 8, speed: 95 },
    left: { row: 2, frames: 8, speed: 95 },
    sleepy: { row: 3, frames: 4, speed: 280 },
    dizzy: { row: 5, frames: 8, speed: 140 },
    curious: { row: 6, frames: 6, speed: 200 },
    happy: { row: 7, frames: 6, speed: 150 },
    writing: { row: 8, frames: 6, speed: 180 }
  };

  // Storage is optional: the pet also works with cookies/storage disabled.
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storageKey)) || {}; } catch (_) { /* optional */ }
  let paused = saved.paused === true;
  let tucked = saved.tucked === true;
  // The previous version saved its default-off value as "wander".
  // Start enabled unless the visitor explicitly opts out in this version.
  let wander = saved.wanderEnabled !== false;
  let ready = false;
  let x = 0;
  let y = 0;
  let anchorX = 0;
  let width = 128;
  let height = 139;
  let state = "idle";
  let frame = 0;
  let frameElapsed = 0;
  let stateUntil = Infinity;
  let nextIdle = 0;
  let targetX = null;
  let raf = 0;
  let lastTime = 0;
  let drag = null;
  let hovered = false;
  let ignoreClick = false;
  let heartsTimer = 0;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));
  const canAnimate = () => ready && !tucked && !paused && !reducedMotion.matches && !document.hidden;
  // clientWidth excludes any horizontal overflow from the page content.
  const viewport = () => ({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight });
  const bounds = () => ({ right: viewport().width - width - 12, bottom: viewport().height - height - 12 });

  function save() {
    saved = {
      paused, tucked, wanderEnabled: wander,
      x: x / Math.max(1, viewport().width - width),
      y: y / Math.max(1, viewport().height - height)
    };
    try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch (_) { /* optional */ }
  }

  function placePanel(panel) {
    if (panel.hidden) return;
    const box = panel.getBoundingClientRect();
    const left = clamp(x + width / 2 - box.width / 2, 12, viewport().width - box.width - 12);
    const preferredTop = y >= box.height + 22 ? y - box.height - 10 : y + height + 10;
    const top = clamp(preferredTop, 12, viewport().height - box.height - 12);
    panel.style.left = `${left - x}px`;
    panel.style.top = `${top - y}px`;
  }

  function position() {
    const limit = bounds();
    x = clamp(x, 12, limit.right);
    y = clamp(y, 12, limit.bottom);
    root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    placePanel(controls);
  }

  function draw() {
    const animation = animations[state];
    sprite.style.backgroundPosition = `${frame / 7 * 100}% ${animation.row / 10 * 100}%`;
    root.dataset.state = state;
  }

  function setState(name, duration = 0) {
    state = name;
    frame = 0;
    frameElapsed = 0;
    stateUntil = duration ? performance.now() + duration : Infinity;
    draw();
  }

  function idle() {
    targetX = null;
    setState(hovered && controls.hidden ? "dizzy" : "idle");
    nextIdle = performance.now() + 6500 + Math.random() * 6500;
  }

  function setControls(open, focus = false) {
    controls.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      idle();
      placePanel(controls);
      if (focus) controls.querySelector("button").focus({ preventScroll: true });
    }
  }

  function pet() {
    setControls(false);
    targetX = null;
    setState("happy", 2600);
    if (canAnimate()) {
      clearTimeout(heartsTimer);
      hearts.hidden = true;
      void hearts.offsetWidth;
      hearts.hidden = false;
      heartsTimer = window.setTimeout(() => { hearts.hidden = true; }, 1100);
    }
  }

  function startWalk() {
    if (!canAnimate()) return;
    const radius = viewport().width <= 600 ? 55 : 140;
    const left = clamp(anchorX - radius, 12, bounds().right);
    const right = clamp(anchorX + radius, 12, bounds().right);
    targetX = x > (left + right) / 2 ? left : right;
    if (Math.abs(targetX - x) < 8) { idle(); return; }
    setState(targetX > x ? "right" : "left");
  }

  function tick(time) {
    raf = 0;
    if (!canAnimate()) return;
    const elapsed = lastTime ? Math.min(time - lastTime, 64) : 0;
    lastTime = time;

    if (targetX !== null && !drag && !hovered && controls.hidden) {
      const distance = targetX - x;
      const step = elapsed * 0.035;
      if (Math.abs(distance) <= step) { x = targetX; idle(); }
      else x += Math.sign(distance) * step;
      position();
    }
    if (!drag && time >= stateUntil) idle();
    if (state === "idle" && !drag && !hovered && controls.hidden && time > nextIdle) {
      if (wander) startWalk();
      else {
        const activities = ["curious", "writing", "sleepy", "happy"];
        setState(activities[Math.floor(Math.random() * activities.length)], 3000 + Math.random() * 3000);
      }
    }
    frameElapsed += elapsed;
    if (frameElapsed >= animations[state].speed) {
      frame = (frame + 1) % animations[state].frames;
      frameElapsed %= animations[state].speed;
      draw();
    }
    raf = requestAnimationFrame(tick);
  }

  function syncAnimation() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    lastTime = 0;
    const motionOff = paused || reducedMotion.matches;
    pauseButton.setAttribute("aria-label", reducedMotion.matches ? "Reduced motion is on" : paused ? "Resume animation" : "Pause animation");
    pauseButton.querySelector("[data-pause-icon]").toggleAttribute("hidden", motionOff);
    pauseButton.querySelector("[data-play-icon]").toggleAttribute("hidden", !motionOff);
    pauseButton.setAttribute("aria-pressed", String(motionOff));
    pauseButton.disabled = reducedMotion.matches;
    wanderButton.disabled = motionOff;
    wanderButton.setAttribute("aria-pressed", String(wander));
    if (motionOff) hearts.hidden = true;
    if (canAnimate()) raf = requestAnimationFrame(tick);
  }

  sprite.addEventListener("click", (event) => {
    if (ignoreClick && event.detail !== 0) { ignoreClick = false; return; }
    pet();
  });

  sprite.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    ignoreClick = false;
    drag = { id: event.pointerId, startX: event.clientX, startY: event.clientY, lastX: event.clientX, x, y, moved: false };
    sprite.setPointerCapture(event.pointerId);
    targetX = null;
  });

  sprite.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return;
    if (!drag.moved) {
      drag.moved = true;
      setControls(false);
      setState(dx < 0 ? "left" : "right");
      root.classList.add("is-dragging");
    }
    // Follow the latest horizontal movement, including a reversal in one drag.
    const movementX = event.clientX - drag.lastX;
    if (Math.abs(movementX) >= 1) {
      const direction = movementX < 0 ? "left" : "right";
      if (state !== direction) setState(direction);
      drag.lastX = event.clientX;
    }
    x = drag.x + dx;
    y = drag.y + dy;
    position();
  });

  function endDrag(event) {
    if (!drag || event.pointerId !== drag.id) return;
    const moved = drag.moved;
    drag = null;
    if (sprite.hasPointerCapture(event.pointerId)) sprite.releasePointerCapture(event.pointerId);
    root.classList.remove("is-dragging");
    hovered = event.pointerType === "mouse" && sprite.matches(":hover");
    if (moved) {
      ignoreClick = true;
      anchorX = x;
      idle();
      save();
    } else if (event.type === "pointerup" && event.pointerType === "touch") {
      ignoreClick = true;
      pet();
    }
  }

  sprite.addEventListener("pointerup", endDrag);
  sprite.addEventListener("pointercancel", endDrag);
  sprite.addEventListener("lostpointercapture", endDrag);
  sprite.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse") return;
    hovered = true;
    if (!drag && controls.hidden) {
      targetX = null;
      setState("dizzy");
    }
  });
  sprite.addEventListener("pointerleave", () => {
    hovered = false;
    if (!drag && state === "dizzy") idle();
  });
  sprite.addEventListener("keydown", (event) => {
    const moves = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    if (!moves[event.key]) return;
    event.preventDefault();
    idle();
    const step = event.shiftKey ? 40 : 16;
    x += moves[event.key][0] * step;
    y += moves[event.key][1] * step;
    position();
    anchorX = x;
    save();
  });

  toggle.addEventListener("click", () => setControls(controls.hidden, true));
  controls.addEventListener("click", (event) => {
    const button = event.target.closest("[data-pet-action]");
    if (!button || button.disabled) return;
    const action = button.dataset.petAction;
    if (action === "pause") {
      paused = !paused;
      idle();
      syncAnimation();
      save();
      return;
    }
    setControls(false);
    sprite.focus({ preventScroll: true });
    if (action === "pet") pet();
    if (action === "write") {
      targetX = null;
      setState("writing", 14000);
    }
    if (action === "wander") {
      wander = !wander;
      if (wander) startWalk();
      else idle();
      syncAnimation();
      save();
    }
    if (action === "hide") {
      tucked = true;
      root.hidden = true;
      restore.hidden = false;
      syncAnimation();
      save();
      restore.focus({ preventScroll: true });
    }
  });

  restore.addEventListener("click", () => {
    tucked = false;
    root.hidden = false;
    restore.hidden = true;
    resize();
    idle();
    syncAnimation();
    save();
    sprite.focus({ preventScroll: true });
  });

  // Activate touch controls on release, including after mobile viewport changes.
  // Ignore a later compatibility click so a single tap only acts once.
  [...root.querySelectorAll("button:not(.site-pet__sprite)"), restore].forEach((button) => {
    let touchStart = null;
    let skipClick = false;
    button.addEventListener("pointerdown", (event) => {
      skipClick = false;
      touchStart = event.isPrimary && event.pointerType === "touch" ? { x: event.clientX, y: event.clientY } : null;
    });
    button.addEventListener("pointercancel", () => { touchStart = null; });
    button.addEventListener("pointerup", (event) => {
      if (!touchStart) return;
      const distance = Math.hypot(event.clientX - touchStart.x, event.clientY - touchStart.y);
      touchStart = null;
      if (distance > 10 || button.disabled) return;
      event.preventDefault();
      skipClick = true;
      button.click();
    });
    button.addEventListener("click", (event) => {
      if (skipClick && event.detail !== 0) {
        skipClick = false;
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
  });

  // A touch action can close its panel before the browser synthesizes a click.
  // Cancel that click so it cannot reach a page link underneath the panel.
  [root, restore].forEach((element) => {
    element.addEventListener("touchend", (event) => {
      if (event.target.closest("button")) event.preventDefault();
    }, { passive: false });
  });

  document.addEventListener("pointerdown", (event) => {
    if (!root.contains(event.target)) setControls(false);
  });
  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget)) setControls(false);
  });
  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const wasOpen = !controls.hidden;
      setControls(false);
      if (wasOpen) toggle.focus({ preventScroll: true });
    }
  });

  function resize() {
    if (!ready || tucked) return;
    const relativeX = x / Math.max(1, viewport().width - width);
    const relativeY = y / Math.max(1, viewport().height - height);
    width = root.offsetWidth;
    height = root.offsetHeight;
    // Keep a saved corner/position visible across mobile rotation and desktop resize.
    x = (Number.isFinite(saved.x) ? saved.x : relativeX) * (viewport().width - width);
    y = (Number.isFinite(saved.y) ? saved.y : relativeY) * (viewport().height - height);
    anchorX = x;
    targetX = null;
    position();
    if (state === "left" || state === "right") idle();
  }

  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) idle();
    syncAnimation();
  });
  reducedMotion.addEventListener("change", () => { idle(); syncAnimation(); });

  const sheet = new Image();
  sheet.onload = () => {
    ready = true;
    sprite.style.backgroundImage = `url("${root.dataset.spritesheet}")`;
    root.hidden = false;
    width = root.offsetWidth;
    height = root.offsetHeight;
    x = Number.isFinite(saved.x) ? saved.x * (viewport().width - width) : viewport().width - width - 24;
    y = Number.isFinite(saved.y) ? saved.y * (viewport().height - height) : viewport().height - height - 20;
    position();
    anchorX = x;
    save();
    idle();
    root.hidden = tucked;
    restore.hidden = !tucked;
    syncAnimation();
  };
  // A failed asset request leaves the page and its navigation usable.
  sheet.onerror = () => { root.hidden = true; restore.hidden = true; };
  sheet.src = root.dataset.spritesheet;
})();
