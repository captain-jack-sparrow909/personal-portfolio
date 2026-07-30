"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  MOTION_PREFERENCE_EVENT,
  MOTION_PREFERENCE_KEY,
} from "@/hooks/useReducedMotion";

import styles from "./SystemNavigator.module.css";

type Command = {
  id: string;
  label: string;
  group: string;
  hint: string;
  run: () => void;
};

function getStoredPreference(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storePreference(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // The preference still applies to the current page when storage is blocked.
  }
}

export function SystemNavigator() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      close();
      if (href.startsWith("http") || href.startsWith("mailto:")) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }
      router.push(href);
    },
    [close, router],
  );

  const commands = useMemo<Command[]>(
    () => [
      {
        id: "flagship",
        label: "View flagship project",
        group: "Navigate",
        hint: "RontgenAI",
        run: () => navigate("/work/rontgenai"),
      },
      {
        id: "live-product",
        label: "Open live RontgenAI",
        group: "Proof",
        hint: "External",
        run: () => navigate("https://rontgenai.dev"),
      },
      {
        id: "lab",
        label: "Explore Systems Lab",
        group: "Navigate",
        hint: "03 experiments",
        run: () => navigate("/lab"),
      },
      {
        id: "experience",
        label: "Show AI / ML experience",
        group: "Navigate",
        hint: "Expertise",
        run: () => navigate("/#expertise"),
      },
      {
        id: "github",
        label: "Open GitHub",
        group: "External",
        hint: "Profile",
        run: () => navigate("https://github.com/captain-jack-sparrow909"),
      },
      {
        id: "contact",
        label: "Contact Jabir",
        group: "Navigate",
        hint: "Open channel",
        run: () => navigate("/#contact"),
      },
      {
        id: "motion",
        label: "Toggle reduced motion",
        group: "Display",
        hint: "Preference",
        run: () => {
          const current = getStoredPreference(MOTION_PREFERENCE_KEY);
          const next = current === "reduce" ? "system" : "reduce";
          storePreference(MOTION_PREFERENCE_KEY, next);
          window.dispatchEvent(
            new CustomEvent(MOTION_PREFERENCE_EVENT, { detail: next }),
          );
          close();
        },
      },
      {
        id: "effects",
        label: "Toggle visual effects",
        group: "Display",
        hint: "WebGL",
        run: () => {
          const root = document.documentElement;
          const next = root.dataset.effects === "off" ? "on" : "off";
          root.dataset.effects = next;
          storePreference("portfolio-effects", next);
          close();
        },
      },
    ],
    [close, navigate],
  );

  const filteredCommands = useMemo(
    () =>
      commands.filter((command) => {
        const haystack = `${command.label} ${command.group} ${command.hint}`;
        return haystack.toLowerCase().includes(query.trim().toLowerCase());
      }),
    [commands, query],
  );

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    const savedEffects = getStoredPreference("portfolio-effects");
    if (savedEffects === "off" || savedEffects === "on") {
      document.documentElement.dataset.effects = savedEffects;
    }

    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) =>
          Math.min(current + 1, filteredCommands.length - 1),
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) => Math.max(current - 1, 0));
      }

      if (event.key === "Enter") {
        event.preventDefault();
        filteredCommands[activeIndex]?.run();
      }

      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'input, button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [activeIndex, close, filteredCommands, open]);

  return (
    <>
      <button
        aria-controls="system-navigator"
        aria-expanded={open}
        aria-haspopup="dialog"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        type="button"
      >
        <span>System Navigator</span>
        <kbd>⌘ K</kbd>
      </button>

      {open ? (
        <div
          aria-label="System Navigator"
          aria-modal="true"
          className={styles.overlay}
          id="system-navigator"
          ref={dialogRef}
          role="dialog"
        >
          <button
            aria-label="Close System Navigator"
            className={styles.backdrop}
            onClick={close}
            type="button"
          />
          <div className={styles.dialog}>
            <div className={styles.topline}>
              <span>JK / SYSTEM NAVIGATOR</span>
              <button onClick={close} type="button">
                Close <kbd>Esc</kbd>
              </button>
            </div>
            <label className={styles.search}>
              <span aria-hidden="true">&gt;</span>
              <span className="sr-only">Search commands</span>
              <input
                aria-activedescendant={
                  filteredCommands[activeIndex]
                    ? `command-${filteredCommands[activeIndex].id}`
                    : undefined
                }
                aria-autocomplete="list"
                aria-controls="system-command-list"
                aria-expanded="true"
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Type a command"
                ref={inputRef}
                role="combobox"
                value={query}
              />
            </label>
            <div
              aria-label="Available commands"
              className={styles.commandList}
              id="system-command-list"
              role="listbox"
            >
              {filteredCommands.length ? (
                filteredCommands.map((command, index) => (
                  <button
                    aria-selected={activeIndex === index}
                    id={`command-${command.id}`}
                    key={command.id}
                    onClick={command.run}
                    onMouseEnter={() => setActiveIndex(index)}
                    role="option"
                    type="button"
                  >
                    <small>{command.group}</small>
                    <span>{command.label}</span>
                    <i>{command.hint}</i>
                  </button>
                ))
              ) : (
                <p className={styles.empty}>No command matches that signal.</p>
              )}
            </div>
            <div className={styles.footer}>
              <span>↑↓ Navigate</span>
              <span>Enter Run</span>
              <span>Esc Close</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
