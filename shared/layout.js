/**
 * Раскладка экрана задач — версия «строки» (чистые функции, без обращений к API часов — проверяются тестами в Node).
 *
 * Экран 432 × 514, фон чёрный. Задачи идут сверху вниз, каждая — карточка (#1C1C1C) на всю ширину с полями по 2 px, между карточками просвет 4 px,
 * список занимает от y = 10 до y = 504. В карточке слева направо: эмодзи вкладки (38 px), текст, и вплотную к правому краю цветная полоска.
 * Текст — обычный, горизонтальный. Не помещается в одну строку — переносится на вторую; больше двух строк нет: что не поместилось, просто отрезается
 * (без «…»). Карточка двухстрочной задачи выше на одну строку, и цветная полоска растягивается на всю её высоту.
 * Полоска: 75 px шириной = три узкие части по 23 px с зазорами 3 px (слева направо — три квадратика с телефона: важность, сложность, срочность).
 */
export const SCREEN_W = 432
export const SCREEN_H = 514
export const CARD_X = 2          // поле слева (и справа)
export const CARD_W = 428
export const LIST_TOP = 10
export const LIST_BOTTOM = 504
export const GAP = 4             // просвет между карточками
export const TEXT_SIZE = 28      // размер шрифта (шрифт — системный шрифт часов)
export const LINE_PITCH = 34     // высота одной строки текста
export const PAD_V = 12          // поле над и под текстом внутри карточки
export const MAX_LINES = 2
export const EMO_SIZE = 38
export const EMO_PAD = 10        // от левого края карточки до эмодзи
export const TEXT_PAD = 8        // от эмодзи до текста и от текста до полоски
export const STRIP_LEN = 75
export const SEG_LEN = 23
export const SEG_GAP = 3

// цвета: фон карточки, текст, три цвета полоски (как цветные квадратики в приложении на телефоне: зелёный, жёлтый, красный)
export const BG = 0x000000
export const CARD = 0x1c1c1c
export const TEXT_COLOR = 0xf0f0f0
export const SEG_COLORS = [0x3fb950, 0xe3b341, 0xf85149]

/** Высота карточки на одну или две строки: 58 и 92. */
export function cardH(lines) { return 2 * PAD_V + LINE_PITCH * lines }

/** Сколько места у списка по высоте. */
export const LIST_H = LIST_BOTTOM - LIST_TOP

export function cardRect(y, lines) { return { x: CARD_X, y: y, w: CARD_W, h: cardH(lines) } }

/** Часть полоски s (0 — левая, 2 — правая), растянута на всю высоту карточки. */
export function segRect(y, lines, s) {
  return { x: CARD_X + CARD_W - STRIP_LEN + s * (SEG_LEN + SEG_GAP), y: y, w: SEG_LEN, h: cardH(lines) }
}

/** Эмодзи — слева, на уровне первой строки текста. */
export function emojiRect(y) {
  return { x: CARD_X + EMO_PAD, y: y + Math.round((cardH(1) - EMO_SIZE) / 2), w: EMO_SIZE, h: EMO_SIZE }
}

/** Строка текста i (0 или 1). */
export function lineRect(y, i) {
  return { x: textX(), y: y + PAD_V + i * LINE_PITCH, w: textWidth(), h: LINE_PITCH }
}

export function textX() { return CARD_X + EMO_PAD + EMO_SIZE + TEXT_PAD }

/** Ширина под текст: от эмодзи до полоски. */
export function textWidth() { return CARD_X + CARD_W - STRIP_LEN - TEXT_PAD - textX() }

/** Цвет сегмента по уровню (0 зелёный, 1 жёлтый, 2 красный); мусор — зелёный. */
export function segColor(level) {
  const l = Math.round(+level)
  return SEG_COLORS[l >= 0 && l <= 2 ? l : 0]
}
