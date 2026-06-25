/* ===================================================================
   You & Me STUDIO — 인터랙션 스크립트
   1) 헤더 스크롤 효과   2) 모바일 햄버거 메뉴
   3) 로그인 모달        4) 폼 제출 (프론트엔드 동작 확인)
   5) 스크롤 등장 애니메이션
   =================================================================== */
(function () {
  "use strict";

  /* ---------- 1. 헤더 스크롤 시 그림자 ---------- */
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 2. 모바일 햄버거 메뉴 ---------- */
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  const toggleMenu = (open) => {
    const willOpen = open ?? !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", willOpen);
    hamburger.classList.toggle("is-open", willOpen);
    hamburger.setAttribute("aria-label", willOpen ? "메뉴 닫기" : "메뉴 열기");
  };

  hamburger.addEventListener("click", () => toggleMenu());
  // 메뉴 항목 클릭 시 닫기
  nav.querySelectorAll(".nav__link").forEach((link) =>
    link.addEventListener("click", () => toggleMenu(false))
  );

  /* ---------- 3. 로그인 모달 ---------- */
  const modal = document.getElementById("login-modal");
  const openBtn = document.getElementById("open-login");

  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", openModal);
  // [data-close] 가 붙은 요소(오버레이, ✕ 버튼) 클릭 시 닫기
  modal.querySelectorAll("[data-close]").forEach((el) =>
    el.addEventListener("click", closeModal)
  );
  // ESC 로 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  /* ---------- 4. 폼 제출 (프론트엔드만 — 알림창으로 확인) ---------- */
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim() || "고객";
    alert(`${name}님, 문의가 정상적으로 접수되었습니다! 🎉\n빠른 시일 내에 연락드리겠습니다.`);
    contactForm.reset();
  });

  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    alert(`${email} 으로 로그인을 시도합니다.\n(데모: 실제 인증은 연결되어 있지 않습니다)`);
  });

  // 소셜 로그인 버튼 (UI 데모)
  modal.querySelectorAll("[data-social]").forEach((btn) =>
    btn.addEventListener("click", () => {
      alert(`${btn.dataset.social} 로그인은 데모 화면입니다. 🙂`);
    })
  );

  /* ---------- 5. 스크롤 등장 애니메이션 ---------- */
  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    // 구형 브라우저 대비: 전부 표시
    reveals.forEach((el) => el.classList.add("is-visible"));
  }
})();
